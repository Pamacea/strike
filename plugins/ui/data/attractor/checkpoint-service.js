/**
 * Strike Checkpoint Service
 *
 * Handles saving and loading of workflow state checkpoints.
 * Enables crash recovery and resume functionality.
 */

const fs = require('fs');
const path = require('path');

class CheckpointService {
  constructor(config = {}) {
    this.config = {
      checkpointDir: config.checkpointDir || '.claude/.strike/checkpoints',
      mainCheckpointFile: config.mainCheckpointFile || '.claude/.strike/checkpoint.json',
      backupOnSave: config.backupOnSave !== false,
      maxBackups: config.maxBackups || 10,
      compressBackups: config.compressBackups || false
    };
  }

  /**
   * Create a new checkpoint
   * @param {string} sessionId - Session UUID
   * @param {string} currentNode - Current node ID
   * @param {string[]} completedNodes - List of completed node IDs
   * @param {object} contextValues - Context key-value store
   * @param {string[]} logs - Log entries
   * @param {object} eventLog - Event log from emitter
   * @param {object} nodeStates - Per-node state snapshots
   * @param {object} metadata - Additional metadata
   * @returns {object} Checkpoint object
   */
  createCheckpoint(sessionId, currentNode, completedNodes, contextValues, logs, eventLog, nodeStates, metadata) {
    const checkpoint = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      session_id: sessionId,
      current_node: currentNode,
      completed_nodes: completedNodes || [],
      node_retries: this._extractRetryCounts(nodeStates),
      context_values: this._sanitizeContext(contextValues),
      logs: logs || [],
      events: this._extractRecentEvents(eventLog, 100),
      metadata: metadata || {},
      node_states: nodeStates || {}
    };

    return checkpoint;
  }

  /**
   * Save checkpoint to disk
   * @param {object} checkpoint - Checkpoint object
   * @returns {string} Path to saved checkpoint
   */
  save(checkpoint) {
    try {
      // Ensure directory exists
      const dir = path.dirname(this.config.mainCheckpointFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Create backup if main checkpoint exists
      if (this.config.backupOnSave && fs.existsSync(this.config.mainCheckpointFile)) {
        this._createBackup();
      }

      // Write checkpoint
      const checkpointJson = JSON.stringify(checkpoint, null, 2);
      fs.writeFileSync(this.config.mainCheckpointFile, checkpointJson, 'utf8');

      // Also write node-specific checkpoint
      const nodeCheckpointPath = path.join(
        this.config.checkpointDir,
        `${checkpoint.current_node}.json`
      );
      if (!fs.existsSync(this.config.checkpointDir)) {
        fs.mkdirSync(this.config.checkpointDir, { recursive: true });
      }
      fs.writeFileSync(nodeCheckpointPath, checkpointJson, 'utf8');

      return this.config.mainCheckpointFile;
    } catch (error) {
      throw new Error(`Failed to save checkpoint: ${error.message}`);
    }
  }

  /**
   * Load checkpoint from disk
   * @param {string} checkpointPath - Optional custom path
   * @returns {object} Checkpoint object
   */
  load(checkpointPath = null) {
    const pathToLoad = checkpointPath || this.config.mainCheckpointFile;

    try {
      if (!fs.existsSync(pathToLoad)) {
        throw new Error(`Checkpoint file not found: ${pathToLoad}`);
      }

      const checkpointJson = fs.readFileSync(pathToLoad, 'utf8');
      const checkpoint = JSON.parse(checkpointJson);

      // Validate checkpoint version
      if (!this._isValidCheckpoint(checkpoint)) {
        throw new Error('Invalid checkpoint format or version');
      }

      return checkpoint;
    } catch (error) {
      throw new Error(`Failed to load checkpoint: ${error.message}`);
    }
  }

  /**
   * Check if a checkpoint exists
   * @param {string} checkpointPath - Optional custom path
   * @returns {boolean}
   */
  exists(checkpointPath = null) {
    const pathToCheck = checkpointPath || this.config.mainCheckpointFile;
    return fs.existsSync(pathToCheck);
  }

  /**
   * Get next node to execute after resume
   * @param {object} checkpoint - Loaded checkpoint
   * @param {object} workflowGraph - Workflow graph definition
   * @returns {string|null} Next node ID or null if at end
   */
  getNextNode(checkpoint, workflowGraph) {
    const currentNode = checkpoint.current_node;

    // Find outgoing edges from current node
    const edges = workflowGraph.edges.filter(e => e.from === currentNode);

    if (edges.length === 0) {
      // No outgoing edges - we're at the end
      return null;
    }

    // Simple heuristic: return first edge's target
    // In full implementation, this would use the edge selection algorithm
    return edges[0].to;
  }

  /**
   * Resume session from checkpoint
   * @param {object} checkpoint - Loaded checkpoint
   * @param {object} workflowGraph - Workflow graph
   * @returns {object} Resume state
   */
  resume(checkpoint, workflowGraph) {
    const nextNode = this.getNextNode(checkpoint, workflowGraph);
    const lastNodeState = checkpoint.node_states[checkpoint.current_node];

    // Determine fidelity degradation if needed
    let fidelityMode = checkpoint.context_values.fidelity_mode || 'compact';
    if (lastNodeState && lastNodeState.data && lastNodeState.data.fidelity === 'full') {
      fidelityMode = 'summary:high';
    }

    return {
      session_id: checkpoint.session_id,
      resumed_from: checkpoint.current_node,
      next_node: nextNode,
      completed_nodes: checkpoint.completed_nodes,
      context: checkpoint.context_values,
      node_states: checkpoint.node_states,
      node_retries: checkpoint.node_retries,
      fidelity_mode: fidelityMode,
      metadata: checkpoint.metadata
    };
  }

  /**
   * Delete checkpoint file
   * @param {string} checkpointPath - Optional custom path
   */
  delete(checkpointPath = null) {
    const pathToDelete = checkpointPath || this.config.mainCheckpointFile;

    try {
      if (fs.existsSync(pathToDelete)) {
        fs.unlinkSync(pathToDelete);
      }
    } catch (error) {
      console.error(`Failed to delete checkpoint: ${error.message}`);
    }
  }

  /**
   * List all backup checkpoints
   * @returns {Array} Array of backup file paths
   */
  listBackups() {
    const dir = this.config.checkpointDir;

    if (!fs.existsSync(dir)) {
      return [];
    }

    const files = fs.readdirSync(dir)
      .filter(f => f.startsWith('checkpoint-') && f.endsWith('.json'))
      .map(f => path.join(dir, f))
      .sort()
      .reverse(); // Newest first

    return files;
  }

  /**
   * Clean up old backups
   */
  cleanupOldBackups() {
    const backups = this.listBackups();

    if (backups.length > this.config.maxBackups) {
      const toDelete = backups.slice(this.config.maxBackups);
      toDelete.forEach(backup => {
        try {
          fs.unlinkSync(backup);
        } catch (error) {
          console.error(`Failed to delete backup ${backup}: ${error.message}`);
        }
      });
    }
  }

  /**
   * Create backup of current checkpoint
   * @private
   */
  _createBackup() {
    const timestamp = Date.now();
    const backupPath = path.join(
      this.config.checkpointDir,
      `checkpoint-${timestamp}.json`
    );

    try {
      if (!fs.existsSync(this.config.checkpointDir)) {
        fs.mkdirSync(this.config.checkpointDir, { recursive: true });
      }

      fs.copyFileSync(this.config.mainCheckpointFile, backupPath);
      this.cleanupOldBackups();
    } catch (error) {
      console.error(`Failed to create backup: ${error.message}`);
    }
  }

  /**
   * Extract retry counts from node states
   * @private
   */
  _extractRetryCounts(nodeStates) {
    const retries = {};

    if (nodeStates) {
      Object.entries(nodeStates).forEach(([nodeId, state]) => {
        if (state.retries) {
          retries[nodeId] = state.retries;
        }
      });
    }

    return retries;
  }

  /**
   * Sanitize context values for JSON serialization
   * @private
   */
  _sanitizeContext(context) {
    const sanitized = {};

    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        // Skip non-serializable values
        if (value === null ||
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            Array.isArray(value) ||
            (typeof value === 'object' && this._isSerializable(value))) {
          sanitized[key] = value;
        }
      });
    }

    return sanitized;
  }

  /**
   * Check if object is JSON-serializable
   * @private
   */
  _isSerializable(obj) {
    try {
      JSON.stringify(obj);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Extract recent events from event log
   * @private
   */
  _extractRecentEvents(eventLog, count) {
    if (!eventLog || !Array.isArray(eventLog.eventLog)) {
      return [];
    }

    return eventLog.eventLog.slice(-count);
  }

  /**
   * Validate checkpoint structure
   * @private
   */
  _isValidCheckpoint(checkpoint) {
    return (
      checkpoint &&
      typeof checkpoint === 'object' &&
      checkpoint.version &&
      checkpoint.timestamp &&
      checkpoint.session_id &&
      typeof checkpoint.current_node === 'string' &&
      Array.isArray(checkpoint.completed_nodes)
    );
  }
}

/**
 * Convenience function to create checkpoint with auto-save
 */
function saveCheckpoint(sessionId, currentNode, completedNodes, context, logs, eventLog, nodeStates, metadata, config) {
  const service = new CheckpointService(config);
  const checkpoint = service.createCheckpoint(
    sessionId,
    currentNode,
    completedNodes,
    context,
    logs,
    eventLog,
    nodeStates,
    metadata
  );
  service.save(checkpoint);
  return checkpoint;
}

/**
 * Convenience function to load and resume from checkpoint
 */
function loadAndResume(workflowGraph, config) {
  const service = new CheckpointService(config);

  if (!service.exists()) {
    return null;
  }

  const checkpoint = service.load();
  return service.resume(checkpoint, workflowGraph);
}

// Export for use in Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CheckpointService,
    saveCheckpoint,
    loadAndResume
  };
}
