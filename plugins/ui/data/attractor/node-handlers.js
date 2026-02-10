/**
 * Strike Node Handlers
 *
 * Default handlers for DOT workflow nodes.
 */

class NodeHandler {
  async execute(node, context, graph) {
    throw new Error('execute() must be implemented by subclass');
  }
}

class StartHandler extends NodeHandler {
  async execute(node, context, graph) {
    return { status: 'SUCCESS', notes: 'Pipeline started' };
  }
}

class ExitHandler extends NodeHandler {
  async execute(node, context, graph) {
    return { status: 'SUCCESS', notes: 'Pipeline completed' };
  }
}

class CodergenHandler extends NodeHandler {
  constructor(llmClient) {
    super();
    this.llmClient = llmClient;
  }

  async execute(node, context, graph) {
    const prompt = node.prompt || node.label || '';

    // Expand variables
    const expandedPrompt = prompt.replace(/\$goal/g, graph.goal || '');

    // In real implementation, call LLM here
    const response = `Executed: ${expandedPrompt}`;

    return {
      status: 'SUCCESS',
      context_updates: {
        last_stage: node.id,
        last_response: response.substring(0, 200)
      },
      notes: `Stage completed: ${node.id}`
    };
  }
}

class ConditionalHandler extends NodeHandler {
  async execute(node, context, graph) {
    // Conditional routing is handled by edge selection
    return {
      status: 'SUCCESS',
      notes: `Conditional node evaluated: ${node.id}`
    };
  }
}

class WaitForHumanHandler extends NodeHandler {
  constructor(interviewer) {
    super();
    this.interviewer = interviewer;
  }

  async execute(node, context, graph) {
    const edges = graph.edges.filter(e => e.from === node.id);

    if (edges.length === 0) {
      return { status: 'FAIL', failure_reason: 'No outgoing edges for human gate' };
    }

    const choices = edges.map(e => ({
      key: this._extractKey(e.label),
      label: e.label || e.to,
      to: e.to
    }));

    const question = {
      text: node.label || 'Select an option:',
      type: 'MULTIPLE_CHOICE',
      options: choices,
      stage: node.id
    };

    // Ask interviewer
    const answer = await this.interviewer.ask(question);

    const selected = choices.find(c => c.key === answer.value) || choices[0];

    return {
      status: 'SUCCESS',
      suggested_next_ids: [selected.to],
      context_updates: {
        'human.gate.selected': selected.key,
        'human.gate.label': selected.label
      }
    };
  }

  _extractKey(label) {
    if (!label) return '1';

    // Extract accelerator key
    const match = label.match(/^\[([A-Z0-9])\]/);
    if (match) return match[1];

    return label[0].toUpperCase();
  }
}

class ParallelHandler extends NodeHandler {
  async execute(node, context, graph) {
    const edges = graph.edges.filter(e => e.from === node.id);
    const joinPolicy = node.join_policy || 'wait_all';
    const errorPolicy = node.error_policy || 'continue';
    const maxParallel = parseInt(node.max_parallel || '4', 10);

    // Execute branches (simplified - in real implementation would be concurrent)
    const results = [];

    for (const edge of edges) {
      // In real implementation, execute subgraph starting at edge.to
      results.push({ branch: edge.to, status: 'SUCCESS' });
    }

    // Evaluate join policy
    const successCount = results.filter(r => r.status === 'SUCCESS').length;
    const failCount = results.filter(r => r.status === 'FAIL').length;

    if (joinPolicy === 'wait_all') {
      return {
        status: failCount === 0 ? 'SUCCESS' : 'PARTIAL_SUCCESS',
        context_updates: {
          'parallel.results': JSON.stringify(results),
          'parallel.success_count': successCount,
          'parallel.failure_count': failCount
        }
      };
    }

    if (joinPolicy === 'first_success') {
      return {
        status: successCount > 0 ? 'SUCCESS' : 'FAIL',
        context_updates: {
          'parallel.results': JSON.stringify(results)
        }
      };
    }

    return { status: 'SUCCESS', context_updates: { 'parallel.results': JSON.stringify(results) } };
  }
}

class FanInHandler extends NodeHandler {
  async execute(node, context, graph) {
    const results = JSON.parse(context['parallel.results'] || '[]');

    if (results.length === 0) {
      return { status: 'FAIL', failure_reason: 'No parallel results to evaluate' };
    }

    // Select best candidate
    const best = results[0]; // Simplified

    return {
      status: 'SUCCESS',
      context_updates: {
        'parallel.fan_in.best_id': best.branch,
        'parallel.fan_in.best_outcome': best.status
      },
      notes: `Selected best candidate: ${best.branch}`
    };
  }
}

class ToolHandler extends NodeHandler {
  async execute(node, context, graph) {
    const command = node.tool_command || '';

    if (!command) {
      return { status: 'FAIL', failure_reason: 'No tool_command specified' };
    }

    // In real implementation, execute shell command here
    return {
      status: 'SUCCESS',
      context_updates: { 'tool.output': `Executed: ${command}` },
      notes: `Tool completed: ${command}`
    };
  }
}

class HandlerRegistry {
  constructor() {
    this.handlers = new Map();
    this.defaultHandler = null;

    // Register default handlers
    this.register('start', new StartHandler());
    this.register('exit', new ExitHandler());
    this.register('codergen', new CodergenHandler(null)); // LLM client injected later
    this.register('conditional', new ConditionalHandler());
    this.register('wait.human', new WaitForHumanHandler(null)); // Interviewer injected later
    this.register('parallel', new ParallelHandler());
    this.register('parallel.fan_in', new FanInHandler());
    this.register('tool', new ToolHandler());
  }

  register(type, handler) {
    this.handlers.set(type, handler);
  }

  resolve(node) {
    // Explicit type
    if (node.type && this.handlers.has(node.type)) {
      return this.handlers.get(node.type);
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

    const handlerType = shapeMap[node.shape] || 'codergen';
    return this.handlers.get(handlerType) || this.defaultHandler;
  }

  setDefaultHandler(handler) {
    this.defaultHandler = handler;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NodeHandler,
    StartHandler,
    ExitHandler,
    CodergenHandler,
    ConditionalHandler,
    WaitForHumanHandler,
    ParallelHandler,
    FanInHandler,
    ToolHandler,
    HandlerRegistry
  };
}
