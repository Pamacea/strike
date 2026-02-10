/**
 * Strike Edge-Based Routing with Conditions
 *
 * Advanced edge selection algorithm with 5-step priority:
 * 1. Condition match → 2. Preferred label → 3. Suggested IDs → 4. Weight → 5. Lexical
 */

class EdgeRouter {
  constructor(graph) {
    this.graph = graph;
  }

  select(node, outcome, context) {
    const edges = this.graph.edges.filter(e => e.from === node.id);

    if (edges.length === 0) {
      return null;
    }

    // Step 1: Condition matching
    const conditionMatch = this._findByCondition(edges, outcome, context);
    if (conditionMatch) {
      return conditionMatch;
    }

    // Step 2: Preferred label
    if (outcome.preferred_label) {
      const labelMatch = this._findByLabel(edges, outcome.preferred_label);
      if (labelMatch) {
        return labelMatch;
      }
    }

    // Step 3: Suggested next IDs
    if (outcome.suggested_next_ids?.length > 0) {
      const idMatch = this._findById(edges, outcome.suggested_next_ids);
      if (idMatch) {
        return idMatch;
      }
    }

    // Step 4 & 5: Weight with lexical tiebreak (unconditional edges)
    return this._bestByWeightThenLexical(edges.filter(e => !e.condition));
  }

  _findByCondition(edges, outcome, context) {
    const matched = [];

    for (const edge of edges) {
      if (edge.condition && this._evaluateCondition(edge.condition, outcome, context)) {
        matched.push(edge);
      }
    }

    return this._bestByWeightThenLexical(matched);
  }

  _evaluateCondition(condition, outcome, context) {
    const clauses = condition.split('&&').map(c => c.trim());

    return clauses.every(clause => {
      if (clause.includes('!=')) {
        const [key, value] = clause.split('!=').map(s => s.trim());
        return this._resolveKey(key, outcome, context) !== value;
      }

      if (clause.includes('=')) {
        const [key, value] = clause.split('=').map(s => s.trim());
        return this._resolveKey(key, outcome, context) === value;
      }

      // Bare key
      return Boolean(this._resolveKey(clause, outcome, context));
    });
  }

  _resolveKey(key, outcome, context) {
    if (key === 'outcome') {
      return outcome.status || 'success';
    }

    if (key === 'preferred_label') {
      return outcome.preferred_label || '';
    }

    if (key.startsWith('context.')) {
      const contextKey = key.substring(8);
      return context[contextKey] || '';
    }

    return context[key] || '';
  }

  _findByLabel(edges, label) {
    const normalized = this._normalizeLabel(label);

    return edges.find(e => this._normalizeLabel(e.label) === normalized);
  }

  _findById(edges, ids) {
    for (const id of ids) {
      const match = edges.find(e => e.to === id);
      if (match) return match;
    }
    return null;
  }

  _bestByWeightThenLexical(edges) {
    if (edges.length === 0) return null;

    return edges.sort((a, b) => {
      const weightA = a.weight || 0;
      const weightB = b.weight || 0;

      if (weightA !== weightB) {
        return weightB - weightA;
      }

      return a.to.localeCompare(b.to);
    })[0];
  }

  _normalizeLabel(label) {
    if (!label) return '';

    return label
      .toLowerCase()
      .trim()
      .replace(/^\[[A-Z0-9]+\]\s*/, '')
      .replace(/^[A-Z0-9]+\)\s*/, '')
      .replace(/^[A-Z0-9]+\s*-\s*/, '');
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EdgeRouter };
}
