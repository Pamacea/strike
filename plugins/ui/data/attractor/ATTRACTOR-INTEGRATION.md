# Strike Attractor Integration Guide

Complete guide for using Attractor features in strike v3.0+.

---

## 🎯 Quick Start

### Basic Event-Driven Workflow

```javascript
const { createEmitter, emitPhaseStart, emitPhaseEnd } = require('./data/event-helpers.js');

// Create emitter for session
const emitter = createEmitter(session_id);

// Emit events throughout workflow
emitPhaseStart(emitter, 'analysis');
// ... do work ...
emitPhaseEnd(emitter, 'analysis', duration, true, outputFiles);

// Get event statistics
const stats = emitter.getStats();
console.log(`Total events: ${stats.total}`);
```

### Checkpoint & Resume

```javascript
const { CheckpointService } = require('./data/checkpoint-service.js');

// Create checkpoint service
const checkpoints = new CheckpointService();

// Save checkpoint after phase
const checkpoint = checkpoints.createCheckpoint(
  session_id,
  current_node,
  completed_nodes,
  context_values,
  logs,
  event_log,
  node_states,
  metadata
);
checkpoints.save(checkpoint);

// Resume from checkpoint
if (checkpoints.exists()) {
  const loaded = checkpoints.load();
  const resumeState = checkpoints.resume(loaded, workflowGraph);
  // Continue from resumeState.next_node
}
```

### DOT Workflow Execution

```javascript
const { WorkflowEngine } = require('./data/workflow-engine.js');
const { HandlerRegistry } = require('./data/node-handlers.js');

// Define workflow in DOT syntax
const dotSource = `
digraph UIGeneration {
  graph [goal="Generate unique anti-trend UI"]

  start [shape=Mdiamond]
  analyze [shape=box, prompt="Analyze prompt for trends"]
  select [shape=box, prompt="Select creative constraints"]
  build [shape=box, prompt="Build the UI", goal_gate=true]
  exit [shape=Msquare]

  start -> analyze -> select -> build -> exit
}
`;

// Create engine and load workflow
const engine = new WorkflowEngine();
const registry = new HandlerRegistry();

// Register handlers (or use defaults)
engine.registerHandler('codergen', new CodergenHandler(llmClient));

// Load and execute
engine.loadWorkflow(dotSource);
const result = await engine.execute(session_id);
```

---

## 🔧 Advanced Features

### Human-in-the-Loop Gates

```javascript
const { WaitForHumanHandler, ConsoleInterviewer } = require('./data/interviewer-systems.js');

// Create human gate node
const humanNode = {
  id: 'approve',
  shape: 'hexagon',
  label: 'Approve Constraints?'
};

// Create interviewer
const interviewer = new ConsoleInterviewer();
const handler = new WaitForHumanHandler(interviewer);

// Register handler
engine.registerHandler('wait.human', handler);
```

### Model Stylesheet

```javascript
const { ModelStylesheet } = require('./data/model-stylesheet.js');

// Define stylesheet
const stylesheet = new ModelStylesheet();
stylesheet.load(`
  * { llm_model: claude-sonnet-4-5; }
  .creative { llm_model: claude-opus-4-6; reasoning_effort: high; }
  #critical_review { llm_model: gpt-5.2; }
`);

// Apply to node
const config = stylesheet.apply(node);
console.log(config.llm_model); // claude-opus-4-6 if node has class="creative"
```

### Edge-Based Routing with Conditions

```javascript
// Define edges with conditions
const dotWithConditions = `
digraph ConditionalFlow {
  validate [shape=box]
  gate [shape=diamond]

  validate -> gate
  gate -> deploy [condition="outcome=success && context.tests_passed=true"]
  gate -> fix [condition="outcome!=success"]
  gate -> manual_review
}
`;
```

### Context Fidelity Management

```javascript
const { FidelityManager } = require('./data/context-fidelity.js');

const fidelity = new FidelityManager();

// Resolve fidelity mode
const mode = fidelity.resolve(node, edge, graph);

// Get appropriate conversation
const conversation = fidelity.getConversation(threadId, mode);

// Update thread for full fidelity
fidelity.updateThread(threadId, newMessages);
```

### Steering (Mid-Task Injection)

```javascript
const { SteeringManager } = require('./data/steering.js');

const steering = new SteeringManager();

// Inject steering message
steering.steer('Actually, use a warmer color palette');

// Drain before next LLM call
if (steering.hasPendingSteering()) {
  steering.injectIntoHistory(history);
}
```

### Goal Gates

```javascript
const { GoalGateManager } = require('./data/goal-gates.js');

const goalGates = new GoalGateManager(graph);

// Check before exit
const check = goalGates.checkGoalGates(nodeOutcomes);
if (!check.satisfied) {
  const retryTarget = goalGates.getRetryTargetForFailedGate(check.failedGate);
  // Jump to retry target
}
```

---

## 📊 Complete Example

```javascript
// Complete workflow with all features

const { WorkflowEngine } = require('./data/workflow-engine.js');
const { HandlerRegistry, WaitForHumanHandler } = require('./data/node-handlers.js');
const { ConsoleInterviewer } = require('./data/interviewer-systems.js');
const { createEmitter } = require('./data/event-helpers.js');
const { CheckpointService } = require('./data/checkpoint-service.js');
const { ModelStylesheet } = require('./data/model-stylesheet.js');
const { SteeringManager } = require('./data/steering.js');

// Setup
const sessionId = uuidv4();
const emitter = createEmitter(sessionId);
const checkpoints = new CheckpointService();
const steering = new SteeringManager();

const stylesheet = new ModelStylesheet();
stylesheet.load(`
  * { llm_model: claude-sonnet-4-5; }
  .analysis { llm_model: claude-opus-4-6; reasoning_effort: high; }
`);

// Define workflow
const dotSource = `
digraph StrikeWorkflow {
  graph [goal="Generate unique UI"]

  start [shape=Mdiamond]
  analyze [shape=box, class="analysis", prompt="Analyze for trends"]
  constraints [shape=box, prompt="Select constraints"]
  approve [shape=hexagon, label="Approve?"]
  build [shape=box, prompt="Build UI", goal_gate=true]
  exit [shape=Msquare]

  start -> analyze -> constraints -> approve
  approve -> build [label="[A] Approve"]
  approve -> constraints [label="[M] Modify"]
  build -> exit
}
`;

// Create engine
const engine = new WorkflowEngine({
  enableEvents: true,
  enableCheckpoints: true
});

// Setup handlers
const registry = new HandlerRegistry();
engine.registerHandler('wait.human', new WaitForHumanHandler(new ConsoleInterviewer()));

// Load and execute
engine.loadWorkflow(dotSource);

// Execute with resume support
const result = await engine.execute(sessionId, {
  resume: checkpoints.exists()
});

console.log('Workflow completed:', result);
```

---

## 🎨 DOT Workflow Examples

### Simple Linear Pipeline

```
digraph Simple {
  start [shape=Mdiamond]
  step1 [shape=box]
  step2 [shape=box]
  exit [shape=Msquare]

  start -> step1 -> step2 -> exit
}
```

### Conditional Branching

```
digraph Branching {
  start [shape=Mdiamond]
  process [shape=box]
  check [shape=diamond]
  success [shape=box]
  retry [shape=box]
  exit [shape=Msquare]

  start -> process -> check
  check -> success [condition="outcome=success"]
  check -> retry [condition="outcome!=success"]
  success -> exit
  retry -> process
}
```

### Parallel Execution

```
digraph Parallel {
  start [shape=Mdiamond]
  split [shape=component]
  option_a [shape=box]
  option_b [shape=box]
  option_c [shape=box]
  merge [shape=tripleoctagon]
  exit [shape=Msquare]

  start -> split
  split -> option_a
  split -> option_b
  split -> option_c
  option_a -> merge
  option_b -> merge
  option_c -> merge
  merge -> exit
}
```

### Human-in-the-Loop

```
digraph WithHumanGates {
  start [shape=Mdiamond]
  plan [shape=box]
  review [shape=hexagon, label="Review Plan?"]
  execute [shape=box]
  exit [shape=Msquare]

  start -> plan -> review
  review -> execute [label="[A] Approve"]
  review -> plan [label="[R] Revise"]
  execute -> exit
}
```

---

## 📋 File Structure

```
plugins/ui/data/
├── event-types.json           # Event type definitions
├── event-emitter.js           # EventEmitter class
├── event-helpers.js           # Helper functions
├── checkpoint-schema.json     # Checkpoint structure
├── checkpoint-service.js      # Checkpoint save/load
├── checkpoint-integration.js # Integration examples
├── dot-grammar.md             # DOT syntax reference
├── dot-parser.js              # DOT parser
├── workflow-engine.js         # Execution engine
├── node-handlers.js           # Node handlers
├── interviewer-systems.js     # Human interaction
├── model-stylesheet.js        # CSS-like config
├── edge-routing.js            # Edge selection
├── context-fidelity.js        # Context management
├── steering.js                # Mid-task injection
└── goal-gates.js              # Goal enforcement
```

---

## ✅ Implementation Checklist

All Attractor features have been implemented:

- [x] Event System with Observability
- [x] Checkpoint & Resume System
- [x] DOT Workflow Engine
- [x] Human-in-the-Loop (Interviewer Pattern)
- [x] Goal Gate Enforcement
- [x] Edge-Based Routing with Conditions
- [x] Model Stylesheet System
- [x] Context Fidelity Management
- [x] Steering (Mid-Task Injection)
- [x] Parallel Execution and Fan-In/Fan-Out

---

## 🚀 Next Steps

1. **Update existing skills** to use new event system
2. **Add DOT workflow definitions** for common patterns
3. **Create example workflows** demonstrating features
4. **Write tests** for all components
5. **Document migration path** from v3.0 to v4.0

---

## 📖 API Reference

See individual files for complete API documentation:
- `event-types.json` - All event kinds and data structures
- `dot-grammar.md` - DOT syntax reference
- `checkpoint-schema.json` - Checkpoint structure
