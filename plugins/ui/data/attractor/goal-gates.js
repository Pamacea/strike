/**
 * Strike Goal Gate Enforcement
 *
 * Ensures critical stages must succeed before pipeline exit.
 */

class GoalGateManager {
  constructor(graph) {
    this.graph = graph;
  }

  checkGoalGates(nodeOutcomes) {
    const goalGateNodes = Object.entries(this.graph.nodes).filter(
      ([id, node]) => node.goal_gate
    );

    for (const [nodeId, node] of goalGateNodes) {
      const outcome = nodeOutcomes[nodeId];

      if (!outcome || outcome.status !== 'SUCCESS') {
        return { satisfied: false, failedGate: nodeId };
      }
    }

    return { satisfied: true, failedGate: null };
  }

  getRetryTargetForFailedGate(failedGateId) {
    const node = this.graph.nodes[failedGateId];

    return (
      node?.retry_target ||
      node?.fallback_retry_target ||
      this.graph.retry_target ||
      this.graph.fallback_retry_target
    );
  }

  getAllGoalGates() {
    return Object.entries(this.graph.nodes)
      .filter(([id, node]) => node.goal_gate)
      .map(([id, node]) => ({ id, ...node }));
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GoalGateManager };
}
