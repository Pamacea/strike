/**
 * Strike Phase Execution with Checkpoint Integration
 *
 * This module demonstrates how to execute phases with automatic
 * checkpoint saving and resume capability.
 */

const { CheckpointService } = require('./checkpoint-service.js');
const {
  createEmitter,
  emitPhaseStart,
  emitPhaseEnd,
  emitCheckpointSaved,
  emitCheckpointLoaded
} = require('./event-helpers.js');

/**
 * Execute a phase with checkpoint support
 *
 * @param {string} phaseName - Name of the phase
 * @param {string} sessionId - Session UUID
 * @param {Function} phaseFn - Async function to execute
 * @param {object} options - Options
 * @returns {object} Phase result
 */
async function executePhase(phaseName, sessionId, phaseFn, options = {}) {
  const {
    emitter = null,
    checkpointService = null,
    workflowGraph = null,
    nodeStates = null,
    metadata = null
  } = options;

  // Create emitter if not provided
  const eventEmitter = emitter || createEmitter(sessionId);

  // Create checkpoint service if not provided
  const checkpoints = checkpointService || new CheckpointService();

  // Get or initialize node states
  const states = nodeStates || {};

  // Mark phase as in progress
  states[phaseName] = {
    status: 'in_progress',
    start_time: new Date().toISOString(),
    retries: (states[phaseName]?.retries || 0)
  };

  const startTime = Date.now();

  try {
    emitPhaseStart(eventEmitter, phaseName);

    // Execute phase function
    const result = await phaseFn({
      emitter: eventEmitter,
      checkpointService: checkpoints,
      nodeStates: states,
      sessionId
    });

    const duration = Date.now() - startTime;

    // Mark phase as completed
    states[phaseName] = {
      status: 'completed',
      start_time: states[phaseName].start_time,
      end_time: new Date().toISOString(),
      duration_ms: duration,
      output_files: result.output_files || [],
      data: result.data || {}
    };

    // Save checkpoint after phase completion
    const checkpoint = checkpoints.createCheckpoint(
      sessionId,
      phaseName,
      [...(metadata?.completed_nodes || []), phaseName],
      result.context || {},
      result.logs || [],
      eventEmitter,
      states,
      metadata
    );

    checkpoints.save(checkpoint);
    emitCheckpointSaved(eventEmitter, phaseName, checkpoints.config.mainCheckpointFile);

    emitPhaseEnd(eventEmitter, phaseName, duration, true, result.output_files);

    return {
      success: true,
      phase: phaseName,
      result,
      checkpoint,
      nodeStates: states
    };
  } catch (error) {
    const duration = Date.now() - startTime;

    // Mark phase as failed
    states[phaseName] = {
      status: 'failed',
      start_time: states[phaseName].start_time,
      end_time: new Date().toISOString(),
      duration_ms: duration,
      error: error.message
    };

    emitPhaseEnd(eventEmitter, phaseName, duration, false);

    throw error;
  }
}

/**
 * Execute entire workflow with checkpoint support
 *
 * @param {string} sessionId - Session UUID
 * @param {object} workflow - Workflow definition with phases
 * @param {object} options - Options
 * @returns {object} Workflow result
 */
async function executeWorkflow(sessionId, workflow, options = {}) {
  const {
    emitter = null,
    checkpointService = null,
    resume = false,
    metadata = null
  } = options;

  const eventEmitter = emitter || createEmitter(sessionId);
  const checkpoints = checkpointService || new CheckpointService();

  // Try to resume if requested
  if (resume && checkpoints.exists()) {
    try {
      const checkpoint = checkpoints.load();
      const resumeState = checkpoints.resume(checkpoint, workflow.graph);

      emitCheckpointLoaded(eventEmitter, checkpoints.config.mainCheckpointFile, resumeState.resumed_from);

      // Continue from next node
      const completedNodes = new Set(resumeState.completed_nodes);
      const nodeStates = resumeState.node_states;
      const context = resumeState.context;

      // Execute remaining phases
      for (const phase of workflow.phases) {
        if (!completedNodes.has(phase.id)) {
          await executePhase(phase.id, sessionId, phase.handler, {
            emitter: eventEmitter,
            checkpointService: checkpoints,
            workflowGraph: workflow.graph,
            nodeStates,
            metadata: {
              ...metadata,
              completed_nodes: [...completedNodes]
            }
          });
          completedNodes.add(phase.id);
        }
      }

      return { success: true, resumed: true };
    } catch (error) {
      console.error('Resume failed, starting fresh:', error.message);
      // Fall through to fresh execution
    }
  }

  // Fresh execution
  const completedNodes = [];
  const nodeStates = {};

  for (const phase of workflow.phases) {
    const result = await executePhase(phase.id, sessionId, phase.handler, {
      emitter: eventEmitter,
      checkpointService: checkpoints,
      workflowGraph: workflow.graph,
      nodeStates,
      metadata: {
        ...metadata,
        completed_nodes
      }
    });

    completedNodes.push(phase.id);
  }

  return { success: true, resumed: false };
}

/**
 * Example workflow definition
 */
const exampleWorkflow = {
  graph: {
    nodes: [
      { id: 'receive', type: 'start' },
      { id: 'analyze', type: 'codergen' },
      { id: 'detect_patterns', type: 'codergen' },
      { id: 'select_constraints', type: 'codergen' },
      { id: 'enrich', type: 'codergen' },
      { id: 'build', type: 'codergen' },
      { id: 'exit', type: 'exit' }
    ],
    edges: [
      { from: 'receive', to: 'analyze' },
      { from: 'analyze', to: 'detect_patterns' },
      { from: 'detect_patterns', to: 'select_constraints' },
      { from: 'select_constraints', to: 'enrich' },
      { from: 'enrich', to: 'build' },
      { from: 'build', to: 'exit' }
    ]
  },
  phases: [
    {
      id: 'analyze',
      handler: async ({ emitter, sessionId }) => {
        // Phase implementation
        return {
          output_files: ['.claude/.strike/analysis.md'],
          context: { detected_keywords: ['modern'] },
          data: { risk_score: 7 }
        };
      }
    },
    {
      id: 'detect_patterns',
      handler: async ({ emitter, sessionId }) => {
        // Phase implementation
        return {
          context: { anti_patterns: ['generic_hero'] }
        };
      }
    },
    {
      id: 'select_constraints',
      handler: async ({ emitter, sessionId }) => {
        // Phase implementation
        return {
          output_files: ['.claude/.strike/constraints.md'],
          context: { constraints: ['monochrome'] }
        };
      }
    },
    {
      id: 'enrich',
      handler: async ({ emitter, sessionId }) => {
        // Phase implementation
        return {
          output_files: ['.claude/.strike/enriched-spec.json'],
          context: { spec_validated: true }
        };
      }
    },
    {
      id: 'build',
      handler: async ({ emitter, sessionId }) => {
        // Phase implementation
        return {
          output_files: ['./output/react-tailwind/'],
          context: { build_complete: true }
        };
      }
    }
  ]
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    executePhase,
    executeWorkflow,
    exampleWorkflow
  };
}
