/**
 * Strike Event Emitter
 *
 * Event-driven observability system for strike plugin.
 * Emits typed events for all phases and actions.
 *
 * Usage:
 *   const emitter = new StrikeEventEmitter(session_id);
 *   emitter.emit('PHASE_START', { phase: 'analysis', ... });
 *   for await (const event of emitter.events()) { ... }
 */

class StrikeEventEmitter {
  constructor(sessionId, config = {}) {
    this.sessionId = sessionId;
    this.listeners = new Map();
    this.eventLog = [];
    this.config = {
      enableFileLogging: config.enableFileLogging !== false,
      logPath: config.logPath || '.claude/.strike/events.jsonl',
      maxInMemoryEvents: config.maxInMemoryEvents || 1000
    };
    this.startTime = new Date().toISOString();
  }

  /**
   * Emit an event
   * @param {string} kind - Event kind (from event-types.json)
   * @param {object} data - Event data
   */
  emit(kind, data = {}) {
    const event = {
      kind,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      data
    };

    // Add to in-memory log
    this.eventLog.push(event);

    // Trim if needed
    if (this.eventLog.length > this.config.maxInMemoryEvents) {
      this.eventLog = this.eventLog.slice(-this.config.maxInMemoryEvents);
    }

    // Notify listeners
    const listeners = this.listeners.get(kind) || [];
    listeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error(`Error in event listener for ${kind}:`, error);
      }
    });

    // Also notify wildcard listeners
    const wildcardListeners = this.listeners.get('*') || [];
    wildcardListeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error(`Error in wildcard listener:`, error);
      }
    });

    // Write to file if enabled
    if (this.config.enableFileLogging) {
      this._writeToFile(event);
    }

    return event;
  }

  /**
   * Register an event listener
   * @param {string} kind - Event kind or '*' for all events
   * @param {function} callback - Callback function
   */
  on(kind, callback) {
    if (!this.listeners.has(kind)) {
      this.listeners.set(kind, []);
    }
    this.listeners.get(kind).push(callback);
  }

  /**
   * Remove an event listener
   * @param {string} kind - Event kind
   * @param {function} callback - Callback function to remove
   */
  off(kind, callback) {
    const listeners = this.listeners.get(kind);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Get all events (optionally filtered by kind)
   * @param {string} kind - Optional event kind filter
   * @returns {Array} Array of events
   */
  getEvents(kind = null) {
    if (kind) {
      return this.eventLog.filter(e => e.kind === kind);
    }
    return [...this.eventLog];
  }

  /**
   * Get events since a specific timestamp
   * @param {string} timestamp - ISO timestamp
   * @returns {Array} Array of events
   */
  getEventsSince(timestamp) {
    return this.eventLog.filter(e => e.timestamp > timestamp);
  }

  /**
   * Get event statistics
   * @returns {object} Statistics about events
   */
  getStats() {
    const stats = {
      total: this.eventLog.length,
      byKind: {},
      session_id: this.sessionId,
      start_time: this.startTime,
      end_time: new Date().toISOString(),
      duration_ms: null
    };

    // Count by kind
    this.eventLog.forEach(event => {
      stats.byKind[event.kind] = (stats.byKind[event.kind] || 0) + 1;
    });

    // Calculate duration
    if (this.startTime) {
      stats.duration_ms = new Date() - new Date(this.startTime);
    }

    return stats;
  }

  /**
   * Async iterator for events (streaming)
   * @returns {AsyncIterator} Event iterator
   */
  async *events() {
    let index = 0;
    while (true) {
      if (index < this.eventLog.length) {
        yield this.eventLog[index++];
      } else {
        // Wait a bit for new events
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  /**
   * Write event to file (JSONL format)
   * @private
   */
  _writeToFile(event) {
    // This would be implemented in the actual environment
    // For now, just log to console
    const line = JSON.stringify(event);
    console.log(`[EVENT] ${line}`);
  }

  /**
   * Clear all events and listeners
   */
  clear() {
    this.eventLog = [];
    this.listeners.clear();
  }

  /**
   * Export events as JSON
   * @returns {string} JSON string
   */
  exportJSON() {
    return JSON.stringify({
      session_id: this.sessionId,
      start_time: this.startTime,
      stats: this.getStats(),
      events: this.eventLog
    }, null, 2);
  }

  /**
   * Import events from JSON
   * @param {string} json - JSON string
   */
  importJSON(json) {
    const data = JSON.parse(json);
    this.sessionId = data.session_id;
    this.startTime = data.start_time;
    this.eventLog = data.events || [];
  }
}

// Export for use in Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StrikeEventEmitter };
}
