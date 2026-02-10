/**
 * Strike Steering (Mid-Task Injection)
 *
 * Allows injecting messages between tool rounds to redirect agent.
 */

class SteeringManager {
  constructor() {
    this.steeringQueue = [];
    this.followupQueue = [];
  }

  steer(message) {
    this.steeringQueue.push(message);
  }

  followUp(message) {
    this.followupQueue.push(message);
  }

  drainSteering() {
    const messages = [...this.steeringQueue];
    this.steeringQueue = [];
    return messages;
  }

  drainFollowup() {
    const messages = [...this.followupQueue];
    this.followupQueue = [];
    return messages;
  }

  hasPendingSteering() {
    return this.steeringQueue.length > 0;
  }

  hasPendingFollowup() {
    return this.followupQueue.length > 0;
  }

  injectIntoHistory(history) {
    const messages = this.drainSteering();

    for (const msg of messages) {
      history.push({
        role: 'user',
        content: msg,
        timestamp: new Date().toISOString(),
        type: 'steering'
      });
    }
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SteeringManager };
}
