/**
 * Strike Workflow Execution Engine
 *
 * Executes DOT-based workflow graphs with checkpoint support,
 * event emission, and node handler dispatch.
 */

const { DOTParser } = require('./dot-parser.js');
const { CheckpointService } = require('./checkpoint-service.js');
const { createEmitter } = require('./event-helpers.js');

class WorkflowEngine {
  constructor(config = {}) {
    this.config = {
      checkpointDir: config.checkpointDir || '.claude/.strike',
      enableEvents: config.enableEvents !== false,
      enableCheckpoints: config.enableCheckpoints !== false,
      maxRetries: config.maxRetries || 50
    };
    this.handlers = new Map();
    this.graph = null;
    this.sessionId = null;
    this.emitter = null;
    this.checkpointService = null;
    this.context = {};
    this.completedNodes = [];
    this.nodeRetries = {};
  }

  /**
   * Register a node handler
   * @param {string} type - Handler type
   * @param {object} handler - Handler object with execute method
   */
  registerHandler(type, handler) {
    this.handlers.set(type, handler);
  }

  /**
   * Load workflow from DOT source
   * @param {string} dotSource - DOT syntax
   * @returns {object} Parsed graph
   */
  loadWorkflow(dotSource) {
    const parser = new DOTParser();
    this.graph = parser.parse(dotSource);
    return this.graph;
  }

  /**
   * Execute the workflow
   * @param {string} sessionId - Session UUID
   * @param {object} options - Options
   * @returns {object} Execution result
   */
  async execute(sessionId, options = {}) {
    const {
      resume = false,
      startAt = null,
      input = {}
    } = options;

    this.sessionId = sessionId;
    this.context = { ...input };
    this.completedNodes = [];
    this.nodeRetries = {};

    // Setup emitter
    if (this.config.enableEvents) {
      this.emitter = createEmitter(sessionId);
      this.emitter.emit('SESSION_START', {
        mode: 'workflow',
        graph_id: this.graph.id,
        goal: this.graph.goal
      });
    }

    // Setup checkpoint service
    if (this.config.enableCheckpoints) {
      this.checkpointService = new CheckpointService({
        checkpointDir: this.config.checkpointDir
      });

      // Try to resume
      if (resume) {
        const resumed = this._tryResume();
        if (resumed) {
          return resumed;
        }
      }
    }

    // Find start node
    const startNodeId = startAt || this._findStartNode();
    let currentNodeId = startNodeId;

    // Main execution loop
    while (currentNodeId) {
      const node = this.graph.nodes[currentNodeId];

      if (!node) {
        throw new Error(`Node not found: ${currentNodeId}`);
      }

      // Check if terminal node
      if (this._isTerminal(node)) {
        // Check goal gates
        if (!this._checkGoalGates()) {
          const retryTarget = this._getRetryTargetForFailedGates();
          if (retryTarget) {
            currentNodeId = retryTarget;
            continue;
          }
        }
        break;
      }

      // Execute node
      const result = await this._executeNode(node);

      // Update context
      if (result.context_updates) {
        Object.assign(this.context, result.context_updates);
      }

      // Mark completed
      this.completedNodes.push(currentNodeId);

      // Save checkpoint
      if (this.checkpointService) {
        this._saveCheckpoint(currentNodeId);
      }

      // Select next edge
      const nextEdge = this._selectNextEdge(node, result);

      if (!nextEdge) {
        break;
      }

      currentNodeId = nextEdge.to;
    }

    // Session end
    const finalResult = {
      success: true,
      completed_nodes: this.completedNodes,
      context: this.context,
      session_id: this.sessionId
    };

    if (this.emitter) {
      this.emitter.emit('SESSION_END', finalResult);
    }

    return finalResult;
  }

  /**
   * Execute a single node
   * @private
   */
  async _executeNode(node) {
    const startTime = Date.now();

    if (this.emitter) {
      this.emitter.emit('PHASE_START', {
        phase: node.id,
        node_type: node.type || node.shape || 'box'
      });
    }

    try {
      // Resolve handler type
      const handlerType = this._resolveHandlerType(node);
      const handler = this.handlers.get(handlerType);

      if (!handler) {
        throw new Error(`No handler registered for type: ${handlerType}`);
      }

      // Execute with retry policy
      const result = await this._executeWithRetry(node, handler);

      const duration = Date.now() - startTime;

      if (this.emitter) {
        this.emitter.emit('PHASE_END', {
          phase: node.id,
          duration_ms: duration,
          success: true
        });
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      if (this.emitter) {
        this.emitter.emit('ERROR', {
          phase: node.id,
          error_type: error.constructor.name,
          message: error.message,
          recoverable: true
        });
      }

      throw error;
    }
  }

  /**
   * Execute node with retry policy
   * @private
   */
  async _executeWithRetry(node, handler) {
    const maxAttempts = (node.max_retries || 0) + 1;
    const attemptKey = node.id;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const result = await handler.execute(node, this.context, this.graph);

        // Reset retry counter on success
        this.nodeRetries[attemptKey] = 0;

        return result;
      } catch (error) {
        this.nodeRetries[attemptKey] = attempt;

        if (attempt >= maxAttempts) {
          throw error;
        }

        // Check if we should retry
        if (!this._shouldRetry(error)) {
          throw error;
        }

        // Backoff
        await this._backoff(attempt);
      }
    }
  }

  /**
   * Select next edge based on outcome
   * @private
   */
  _selectNextEdge(node, outcome) {
    const edges = this.graph.edges.filter(e => e.from === node.id);

    if (edges.length === 0) {
      return null;
    }

    // Step 1: Condition matching
    const conditionMatch = this._findMatchingCondition(edges, outcome);
    if (conditionMatch) {
      return conditionMatch;
    }

    // Step 2: Preferred label
    if (outcome.preferred_label) {
      const labelMatch = edges.find(e =>
        this._normalizeLabel(e.label) === this._normalizeLabel(outcome.preferred_label)
      );
      if (labelMatch) {
        return labelMatch;
      }
    }

    // Step 3: Suggested next IDs
    if (outcome.suggested_next_ids && outcome.suggested_next_ids.length > 0) {
      for (const suggestedId of outcome.suggested_next_ids) {
        const match = edges.find(e => e.to === suggestedId);
        if (match) {
          return match;
        }
      }
    }

    // Step 4 & 5: Weight with lexical tiebreak
    return this._bestByWeightThenLexical(edges);
  }

  /**
   * Find edge with matching condition
   * @private
   */
  _findMatchingCondition(edges, outcome) {
    const matched = [];

    for (const edge of edges) {
      if (edge.condition && this._evaluateCondition(edge.condition, outcome)) {
        matched.push(edge);
      }
    }

    return this._bestByWeightThenLexical(matched);
  }

  /**
   * Evaluate condition expression
   * @private
   */
  _evaluateCondition(condition, outcome) {
    // Simple implementation: outcome=success, context.key=value
    const clauses = condition.split('&&').map(c => c.trim());

    return clauses.every(clause => {
      if (clause.includes('=')) {
        const [key, value] = clause.split('=').map(s => s.trim());

        if (key === 'outcome') {
          return outcome.status === value;
        }

        if (key.startsWith('context.')) {
          const contextKey = key.substring(8);
          return String(this.context[contextKey]) === value;
        }

        return String(this.context[key]) === value;
      }

      // Bare key - check if truthy
      return Boolean(this.context[clause]);
    });
  }

  /**
   * Get best edge by weight then lexical
   * @private
   */
  _bestByWeightThenLexical(edges) {
    if (edges.length === 0) return null;

    return edges.sort((a, b) => {
      const weightA = a.weight || 0;
      const weightB = b.weight || 0;

      if (weightA !== weightB) {
        return weightB - weightA; // Higher weight first
      }

      return a.to.localeCompare(b.to); // Lexical tiebreak
    })[0];
  }

  /**
   * Normalize edge label for comparison
   * @private
   */
  _normalizeLabel(label) {
    if (!label) return '';

    return label
      .toLowerCase()
      .trim()
      .replace(/^\[[A-Z0-9]+\]\s*/, '') // Remove accelerator prefix
      .replace(/^[A-Z0-9]+\)\s*/, '')
      .replace(/^[A-Z0-9]+\s*-\s*/, '');
  }

  /**
   * Resolve handler type from node
   * @private
   */
  _resolveHandlerType(node) {
    // Explicit type takes precedence
    if (node.type) {
      return node.type;
    }

    // Shape-based mapping
    const shapeMap = {
      'Mdiamond': 'start',
      'Msquare': 'exit',
      'box': 'codergen',
      'hexagon': 'wait.human',
      'diamond': 'conditional',
      'component': 'parallel',
      'tripleoctagon': 'parallel.fan_in',
      'parallelogram': 'tool'
    };

    return shapeMap[node.shape] || 'codergen';
  }

  /**
   * Find start node
   * @private
   */
  _findStartNode() {
    const startNodes = Object.values(this.graph.nodes).filter(
      n => n.shape === 'Mdiamond' || n.id === 'start'
    );

    if (startNodes.length !== 1) {
      throw new Error('Graph must have exactly one start node');
    }

    return startNodes[0].id;
  }

  /**
   * Check if node is terminal
   * @private
   */
  _isTerminal(node) {
    return node.shape === 'Msquare' || node.id === 'exit';
  }

  /**
   * Check all goal gates
   * @private
   */
  _checkGoalGates() {
    const goalGateNodes = Object.entries(this.graph.nodes).filter(
      ([id, node]) => node.goal_gate
    );

    for (const [nodeId, node] of goalGateNodes) {
      if (!this.completedNodes.includes(nodeId)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get retry target for failed goal gates
   * @private
   */
  _getRetryTargetForFailedGates() {
    const failedGate = Object.entries(this.graph.nodes).find(
      ([id, node]) => node.goal_gate && !this.completedNodes.includes(id)
    );

    if (!failedGate) return null;

    const [nodeId, node] = failedGate;
    return node.retry_target || node.fallback_retry_target || this.graph.retry_target || this.graph.fallback_retry_target;
  }

  /**
   * Try to resume from checkpoint
   * @private
   */
  _tryResume() {
    if (!this.checkpointService.exists()) {
      return null;
    }

    const checkpoint = this.checkpointService.load();

    // Restore state
    this.completedNodes = checkpoint.completed_nodes || [];
    this.nodeRetries = checkpoint.node_retries || {};
    this.context = checkpoint.context_values || {};
    this.sessionId = checkpoint.session_id;

    if (this.emitter) {
      this.emitter.emit('CHECKPOINT_LOADED', {
        checkpoint_file: this.checkpointService.config.mainCheckpointFile,
        resumed_from_node: checkpoint.current_node
      });
    }

    // Find next node
    const nextNodeId = this._findNextNodeAfter(checkpoint.current_node);

    // Continue execution
    return this.execute(this.sessionId, {
      startAt: nextNodeId,
      resume: false
    });
  }

  /**
   * Find next node after given node
   * @private
   */
  _findNextNodeAfter(nodeId) {
    const edges = this.graph.edges.filter(e => e.from === nodeId);
    return edges.length > 0 ? edges[0].to : null;
  }

  /**
   * Save checkpoint
   * @private
   */
  _saveCheckpoint(currentNodeId) {
    const checkpoint = this.checkpointService.createCheckpoint(
      this.sessionId,
      currentNodeId,
      this.completedNodes,
      this.context,
      [], // logs
      this.emitter,
      {}, // node states
      {}  // metadata
    );

    this.checkpointService.save(checkpoint);

    if (this.emitter) {
      this.emitter.emit('CHECKPOINT_SAVED', {
        node_id: currentNodeId,
        checkpoint_file: this.checkpointService.config.mainCheckpointFile
      });
    }
  }

  /**
   * Check if error is retryable
   * @private
   */
  _shouldRetry(error) {
    // Network errors, rate limits, server errors = retryable
    // Auth errors, validation errors = not retryable
    const retryablePatterns = [
      /ECONNREFUSED/i,
      /ETIMEDOUT/i,
      /429/i, // Rate limit
      /50[0-3]/ // Server errors
    ];

    return retryablePatterns.some(pattern =>
      pattern.test(error.message) || pattern.test(error.code)
    );
  }

  /**
   * Backoff delay
   * @private
   */
  async _backoff(attempt) {
    const delay = Math.min(200 * Math.pow(2, attempt - 1), 60000);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WorkflowEngine };
}
