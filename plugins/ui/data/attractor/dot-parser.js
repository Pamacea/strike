/**
 * Strike DOT Parser
 *
 * Parses Graphviz DOT syntax into executable workflow graphs.
 * Supports the strict subset defined in dot-grammar.md.
 */

class DOTParser {
  constructor() {
    this.graph = {
      id: null,
      goal: '',
      label: '',
      model_stylesheet: '',
      default_max_retry: 50,
      retry_target: '',
      fallback_retry_target: '',
      default_fidelity: '',
      nodes: {},
      edges: [],
      subgraphs: []
    };
  }

  /**
   * Parse DOT source string
   * @param {string} source - DOT source code
   * @returns {object} Parsed graph
   */
  parse(source) {
    // Remove comments
    source = this._stripComments(source);

    // Extract digraph declaration
    const digraphMatch = source.match(/digraph\s+(\w+)\s*\{/);
    if (!digraphMatch) {
      throw new Error('DOT must start with digraph Identifier {');
    }

    this.graph.id = digraphMatch[1];

    // Extract body
    const bodyMatch = source.match(/digraph\s+\w+\s*\{(.*)\}/s);
    if (!bodyMatch) {
      throw new Error('Invalid DOT syntax');
    }

    const body = bodyMatch[1];

    // Parse statements
    this._parseBody(body);

    // Validate graph
    this._validateGraph();

    return this.graph;
  }

  /**
   * Parse graph body
   * @private
   */
  _parseBody(body) {
    // Split by semicolons, but handle nested braces
    const statements = this._splitStatements(body);

    for (const stmt of statements) {
      this._parseStatement(stmt.trim());
    }
  }

  /**
   * Split statements respecting nested braces
   * @private
   */
  _splitStatements(body) {
    const statements = [];
    let current = '';
    let depth = 0;

    for (let i = 0; i < body.length; i++) {
      const char = body[i];

      if (char === '{') {
        depth++;
        current += char;
      } else if (char === '}') {
        depth--;
        current += char;
      } else if (char === ';' && depth === 0) {
        statements.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      statements.push(current.trim());
    }

    return statements.filter(s => s.length > 0);
  }

  /**
   * Parse single statement
   * @private
   */
  _parseStatement(stmt) {
    if (!stmt || stmt.length === 0) return;

    // Graph attribute statement: graph [ ... ]
    if (stmt.startsWith('graph')) {
      const attrs = this._extractAttrBlock(stmt);
      this._applyGraphAttrs(attrs);
      return;
    }

    // Node defaults: node [ ... ]
    if (stmt.startsWith('node')) {
      // Store default node attributes
      this.graph.defaultNodeAttrs = this._extractAttrBlock(stmt);
      return;
    }

    // Edge defaults: edge [ ... ]
    if (stmt.startsWith('edge')) {
      this.graph.defaultEdgeAttrs = this._extractAttrBlock(stmt);
      return;
    }

    // Graph attribute declaration: key = value
    if (stmt.includes('=') && !stmt.includes('->')) {
      const parts = stmt.split('=').map(s => s.trim());
      if (parts.length === 2) {
        this.graph[parts[0]] = this._parseValue(parts[1]);
      }
      return;
    }

    // Subgraph
    if (stmt.startsWith('subgraph')) {
      this._parseSubgraph(stmt);
      return;
    }

    // Edge statement: A -> B -> C [ ... ]
    if (stmt.includes('->')) {
      this._parseEdgeStatement(stmt);
      return;
    }

    // Node statement: nodeId [ ... ]
    this._parseNodeStatement(stmt);
  }

  /**
   * Parse node statement
   * @private
   */
  _parseNodeStatement(stmt) {
    const match = stmt.match(/^(\w+)(\s*\[.*?\])?$/);
    if (!match) return;

    const nodeId = match[1];
    const attrBlock = match[2] || '';

    const attrs = this._extractAttrBlock(attrBlock);

    // Apply default node attrs first
    const nodeAttrs = { ...(this.graph.defaultNodeAttrs || {}), ...attrs };

    this.graph.nodes[nodeId] = {
      id: nodeId,
      ...nodeAttrs
    };
  }

  /**
   * Parse edge statement
   * @private
   */
  _parseEdgeStatement(stmt) {
    // Split by -> to get edge chain
    const parts = stmt.split('->').map(s => s.trim());

    // Extract attr block from last part
    const lastPart = parts[parts.length - 1];
    const attrBlock = this._extractAttrBlock(lastPart);
    const cleanLastPart = lastPart.replace(/\s*\[.*?\]\s*$/, '').trim();

    parts[parts.length - 1] = cleanLastPart;

    // Apply default edge attrs
    const edgeAttrs = { ...(this.graph.defaultEdgeAttrs || {}), ...attrBlock };

    // Create edges for chain
    for (let i = 0; i < parts.length - 1; i++) {
      const from = parts[i];
      const to = parts[i + 1];

      this.graph.edges.push({
        from,
        to,
        ...edgeAttrs
      });
    }
  }

  /**
   * Parse subgraph
   * @private
   */
  _parseSubgraph(stmt) {
    const match = stmt.match(/subgraph\s+(\w+)?\s*\{(.*)\}/s);
    if (!match) return;

    const subgraphId = match[1] || `cluster_${this.graph.subgraphs.length}`;
    const body = match[2];

    // Extract attributes from body
    const attrs = {};
    const subgraphNodes = [];

    const subgraphStatements = this._splitStatements(body);
    for (const subStmt of subgraphStatements) {
      const trimmed = subStmt.trim();

      if (trimmed.includes('=') && !trimmed.includes('->')) {
        // Attribute declaration
        const parts = trimmed.split('=').map(s => s.trim());
        if (parts.length === 2) {
          attrs[parts[0]] = this._parseValue(parts[1]);
        }
      } else if (!trimmed.includes('->')) {
        // Node reference
        const nodeId = trimmed.replace(/\s*\[.*?\]\s*$/, '').trim();
        if (nodeId) {
          subgraphNodes.push(nodeId);
          // Apply subgraph attributes to node
          if (this.graph.nodes[nodeId]) {
            this.graph.nodes[nodeId].subgraph = subgraphId;
            // Apply class derived from label if present
            if (attrs.label) {
              const className = attrs.label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const existingClasses = this.graph.nodes[nodeId].class || '';
              this.graph.nodes[nodeId].class = existingClasses ? `${existingClasses},${className}` : className;
            }
          }
        }
      }
    }

    this.graph.subgraphs.push({
      id: subgraphId,
      attrs,
      nodes: subgraphNodes
    });
  }

  /**
   * Extract attribute block from statement
   * @private
   */
  _extractAttrBlock(stmt) {
    const attrs = {};

    const match = stmt.match(/\[(.*?)\]/s);
    if (!match) return attrs;

    const attrString = match[1];

    // Split by comma
    const pairs = attrString.split(',').map(s => s.trim());

    for (const pair of pairs) {
      if (!pair) continue;

      const parts = pair.split('=').map(s => s.trim());
      if (parts.length === 2) {
        attrs[parts[0]] = this._parseValue(parts[1]);
      }
    }

    return attrs;
  }

  /**
   * Apply graph-level attributes
   * @private
   */
  _applyGraphAttrs(attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (key in this.graph) {
        this.graph[key] = value;
      }
    }
  }

  /**
   * Parse value (string, number, boolean, duration)
   * @private
   */
  _parseValue(value) {
    value = value.trim();

    // String
    if (value.startsWith('"')) {
      // Remove quotes and unescape
      return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    }

    // Boolean
    if (value === 'true') return true;
    if (value === 'false') return false;

    // Duration
    if (/\d+(ms|s|m|h|d)$/.test(value)) {
      return value;
    }

    // Integer
    if (/^-?\d+$/.test(value)) {
      return parseInt(value, 10);
    }

    // Float
    if (/^-?\d+\.\d+$/.test(value)) {
      return parseFloat(value);
    }

    return value;
  }

  /**
   * Strip comments from source
   * @private
   */
  _stripComments(source) {
    // Remove block comments first
    source = source.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove line comments
    source = source.replace(/\/\/.*$/gm, '');
    return source;
  }

  /**
   * Validate parsed graph
   * @private
   */
  _validateGraph() {
    // Must have exactly one start node
    const startNodes = Object.values(this.graph.nodes).filter(n => n.shape === 'Mdiamond' || n.id === 'start');
    if (startNodes.length !== 1) {
      throw new Error('Graph must have exactly one start node (shape=Mdiamond or id="start")');
    }

    // Must have at least one exit node
    const exitNodes = Object.values(this.graph.nodes).filter(n => n.shape === 'Msquare' || n.id === 'exit');
    if (exitNodes.length === 0) {
      throw new Error('Graph must have at least one exit node (shape=Msquare or id="exit")');
    }

    // Validate edge targets exist
    for (const edge of this.graph.edges) {
      if (!this.graph.nodes[edge.from]) {
        throw new Error(`Edge references unknown node: ${edge.from}`);
      }
      if (!this.graph.nodes[edge.to]) {
        throw new Error(`Edge references unknown node: ${edge.to}`);
      }
    }

    // All nodes must be reachable from start
    const startNodeId = startNodes[0].id;
    const reachable = this._getReachableNodes(startNodeId);
    const unreachable = Object.keys(this.graph.nodes).filter(id => !reachable.has(id));
    if (unreachable.length > 0) {
      throw new Error(`Unreachable nodes detected: ${unreachable.join(', ')}`);
    }
  }

  /**
   * Get all nodes reachable from given node
   * @private
   */
  _getReachableNodes(startNodeId) {
    const reachable = new Set();
    const queue = [startNodeId];

    while (queue.length > 0) {
      const nodeId = queue.shift();
      if (reachable.has(nodeId)) continue;

      reachable.add(nodeId);

      // Find outgoing edges
      const outgoing = this.graph.edges.filter(e => e.from === nodeId);
      for (const edge of outgoing) {
        if (!reachable.has(edge.to)) {
          queue.push(edge.to);
        }
      }
    }

    return reachable;
  }
}

/**
 * Convenience function to parse DOT source
 */
function parseDOT(source) {
  const parser = new DOTParser();
  return parser.parse(source);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DOTParser,
    parseDOT
  };
}
