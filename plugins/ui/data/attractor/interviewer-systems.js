/**
 * Strike Human-in-the-Loop Interviewer Implementations
 *
 * Multiple interviewer implementations for human interaction gates.
 */

class Interviewer {
  async ask(question) {
    throw new Error('ask() must be implemented');
  }
}

class ConsoleInterviewer extends Interviewer {
  async ask(question) {
    console.log(`[?] ${question.text}`);

    if (question.type === 'MULTIPLE_CHOICE' && question.options) {
      for (const option of question.options) {
        console.log(`  [${option.key}] ${option.label}`);
      }
    }

    // Simulate user input (in real implementation, read from stdin)
    const response = question.options ? question.options[0].key : 'Y';

    return {
      value: response,
      selected_option: question.options?.find(o => o.key === response)
    };
  }
}

class CallbackInterviewer extends Interviewer {
  constructor(callback) {
    super();
    this.callback = callback;
  }

  async ask(question) {
    return await this.callback(question);
  }
}

class QueueInterviewer extends Interviewer {
  constructor(answers) {
    super();
    this.queue = answers || [];
  }

  async ask(question) {
    if (this.queue.length > 0) {
      return this.queue.shift();
    }

    return { value: 'SKIPPED' };
  }
}

class AutoApproveInterviewer extends Interviewer {
  async ask(question) {
    if (question.type === 'YES_NO' || question.type === 'CONFIRMATION') {
      return { value: 'YES' };
    }

    if (question.type === 'MULTIPLE_CHOICE' && question.options?.length > 0) {
      const option = question.options[0];
      return {
        value: option.key,
        selected_option: option
      };
    }

    return { value: 'auto-approved' };
  }
}

class RecordingInterviewer extends Interviewer {
  constructor(inner) {
    super();
    this.inner = inner;
    this.recordings = [];
  }

  async ask(question) {
    const answer = await this.inner.ask(question);
    this.recordings.push({ question, answer });
    return answer;
  }

  getRecordings() {
    return this.recordings;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Interviewer,
    ConsoleInterviewer,
    CallbackInterviewer,
    QueueInterviewer,
    AutoApproveInterviewer,
    RecordingInterviewer
  };
}
