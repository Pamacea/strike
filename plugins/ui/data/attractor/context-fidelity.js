/**
 * Strike Context Fidelity Management
 *
 * Controls how much conversation history carries between nodes.
 */

class FidelityManager {
  constructor() {
    this.modes = ['full', 'truncate', 'compact', 'summary:low', 'summary:medium', 'summary:high'];
    this.threads = new Map(); // thread_id → conversation history
  }

  resolve(node, edge, graph) {
    // Resolution precedence: edge > node > graph > default
    if (edge?.fidelity) return edge.fidelity;
    if (node?.fidelity) return node.fidelity;
    if (graph?.default_fidelity) return graph.default_fidelity;
    return 'compact';
  }

  resolveThreadId(node, edge, graph, subgraph) {
    // For full fidelity, determine thread key
    if (node?.thread_id) return node.thread_id;
    if (edge?.thread_id) return edge.thread_id;
    if (graph?.thread_id) return graph.thread_id;
    if (subgraph) return subgraph.id;
    return node.id; // Fallback
  }

  getConversation(threadId, fidelity) {
    if (fidelity === 'full') {
      return this.threads.get(threadId) || [];
    }

    // For non-full modes, return summary/compact representation
    return this._generateSummary(threadId, fidelity);
  }

  updateThread(threadId, messages) {
    this.threads.set(threadId, messages);
  }

  _generateSummary(threadId, fidelity) {
    const history = this.threads.get(threadId);
    if (!history) return [];

    switch (fidelity) {
      case 'truncate':
        return []; // Minimal: only graph goal

      case 'compact':
        return this._compactSummary(history);

      case 'summary:low':
        return this._lowSummary(history);

      case 'summary:medium':
        return this._mediumSummary(history);

      case 'summary:high':
        return this._highSummary(history);

      default:
        return [];
    }
  }

  _compactSummary(history) {
    // Structured bullet-point summary
    return [{
      role: 'system',
      content: `Completed stages: ${history.length}. Recent outcomes: ${JSON.stringify(history.slice(-3))}`
    }];
  }

  _lowSummary(history) {
    // ~600 tokens
    return [{
      role: 'system',
      content: `Session progress: ${history.length} turns completed. Last action: ${history[history.length - 1]?.content || 'None'}`
    }];
  }

  _mediumSummary(history) {
    // ~1500 tokens
    const recent = history.slice(-5);
    return [{
      role: 'system',
      content: `Recent activity (${recent.length} turns): ${recent.map(t => `- ${t.role}: ${t.content?.substring(0, 50)}...`).join('\n')}`
    }];
  }

  _highSummary(history) {
    // ~3000 tokens - comprehensive
    return [{
      role: 'system',
      content: `Full session summary: ${JSON.stringify(history, null, 2)}`
    }];
  }

  estimateTokenCount(messages) {
    // Rough estimate: 1 token ≈ 4 characters
    const totalChars = messages.reduce((sum, m) => sum + (m.content?.length || 0), 0);
    return Math.ceil(totalChars / 4);
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FidelityManager };
}
