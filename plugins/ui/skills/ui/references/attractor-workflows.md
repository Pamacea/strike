# Attractor Workflows - DOT Orchestration Guide

> **Part of:** `/ui` skill
> **Purpose:** Complete guide to DOT workflow definitions in Graphviz syntax

---

## 🎯 What is Attractor Mode?

Attractor mode is a powerful workflow orchestration system powered by the [Attractor engine](https://github.com/strongdm/attractor). It enables:

- **Declarative workflows** - Define pipelines in DOT syntax
- **Checkpoint & resume** - Recover from crashes and interruptions
- **Event observability** - Track every phase with typed events
- **Human-in-the-loop** - Approval gates and interactive workflows
- **Parallel execution** - Concurrent branch processing
- **Conditional routing** - Smart branching based on outcomes

---

## 📝 DOT Workflow Basics

### Minimal Workflow

```dot
digraph SimpleWorkflow {
  graph [goal="Generate unique UI"]

  start [shape=Mdiamond]
  analyze [shape=box, prompt="Analyze prompt for trends"]
  build [shape=box, prompt="Build UI"]
  exit [shape=Msquare]

  start -> analyze -> build -> exit
}
```

### Workflow with Approval

```dot
digraph WithApproval {
  start [shape=Mdiamond]
  plan [shape=box, prompt="Create plan"]
  review [shape=hexagon, label="Approve Plan?"]
  execute [shape=box, prompt="Execute plan"]
  exit [shape=Msquare]

  start -> plan -> review
  review -> execute [label="[A] Approve"]
  review -> plan [label="[M] Modify"]
  execute -> exit
}
```

### Parallel Exploration

```dot
digraph ParallelExploration {
  graph [goal="Explore multiple design directions"]

  start [shape=Mdiamond]
  split [shape=component]

  # Create parallel branches
  option_a [shape=box, class="creative", prompt="Explore bold direction"]
  option_b [shape=box, prompt="Explore conservative direction"]
  option_c [shape=box, prompt="Explore experimental direction"]

  merge [shape=tripleoctagon]
  select [shape=box, prompt="Select best approach"]
  exit [shape=Msquare]

  start -> split
  split -> option_a
  split -> option_b
  split -> option_c

  # Fan-in
  option_a -> merge
  option_b -> merge
  option_c -> merge

  merge -> select -> exit
}
```

---

## 🎨 Node Shapes and Their Meanings

| Shape | Syntax | Meaning |
|-------|--------|---------|
| Diamond | `shape=Mdiamond` | Start/End point |
| Square | `shape=box` | Standard action/phase |
| Hexagon | `shape=hexagon` | Approval gate (human-in-the-loop) |
| Triple Octagon | `shape=tripleoctagon` | Merge/Fan-in point |
| Diamond | `shape=diamond` | Conditional branch |
| Circle | `shape=circle` | Checkpoint/Validation |
| Double Circle | `shape=doublecircle` | Goal gate (must succeed) |

---

## 🔀 Edge Routing and Labels

### Conditional Edges

```dot
digraph ConditionalFlow {
  validate [shape=box]
  gate [shape=diamond]
  deploy [shape=box]
  fix [shape=box]

  validate -> gate
  gate -> deploy [condition="outcome=success && tests_passed=true"]
  gate -> fix [condition="outcome!=success"]
  fix -> validate
}
```

### Labeled Edges (User Choices)

```dot
digraph UserChoice {
  plan [shape=box]
  ask [shape=hexagon, label="Which direction?"]
  creative [shape=box]
  conservative [shape=box]

  plan -> ask
  ask -> creative [label="[Bold] Push boundaries"]
  ask -> conservative [label="[Safe] Stay conventional"]
}
```

---

## 🎯 Real UI Generation Workflows

### Full Anti-Trend Workflow

```dot
digraph AntiTrendWorkflow {
  graph [
    goal="Generate unique anti-trend UI"
    checkpoint=true
    events=true
  ]

  # Start
  start [shape=Mdiamond]

  # Phase 1: Analysis
  analyze [shape=box,
    prompt="Analyze prompt for trend-trap keywords",
    checkpoint=true]

  # Phase 2: Anti-patterns
  patterns [shape=box,
    prompt="Detect and generate anti-patterns",
    checkpoint=true]

  # Phase 3: Constraints
  constraints [shape=box,
    prompt="Select creative constraints with scoring",
    checkpoint=true]

  # Approval gate
  approve [shape=hexagon,
    label="Approve constraints?"]

  # Phase 4: Specification
  spec [shape=box,
    prompt="Create enriched specification",
    checkpoint=true,
    goal_gate=true]

  # Phase 5: Build
  build [shape=box,
    prompt="Build UI with anti-pattern validation",
    checkpoint=true]

  # Validation
  validate [shape=circle,
    prompt="Validate accessibility and quality"]

  # End
  exit [shape=Msquare]

  # Workflow
  start -> analyze -> patterns -> constraints -> approve

  # User choice
  approve -> spec [label="[A] Accept"]
  approve -> constraints [label="[R] Reject & retry"]

  # Build pipeline
  spec -> build -> validate -> exit

  # Conditional retry
  validate -> constraints [condition="validation_failed=true"]
}
```

### Step Mode Workflow

```dot
digraph StepModeWorkflow {
  graph [goal="Interactive user-controlled workflow"]

  start [shape=Mdiamond]

  # Phase 1: Analysis
  analyze [shape=box,
    prompt="Analyze prompt",
    checkpoint=true,
    wait_for_user=true]

  # Phase 2: Anti-patterns
  patterns [shape=box,
    prompt="Detect anti-patterns",
    checkpoint=true,
    wait_for_user=true]

  # Phase 3: Constraints
  constraints [shape=box,
    prompt="Select constraints",
    checkpoint=true,
    wait_for_user=true]

  # Phase 4: Spec
  spec [shape=box,
    prompt="Create specification",
    checkpoint=true,
    wait_for_user=true]

  # Phase 5: Build
  build [shape=box,
    prompt="Build UI",
    checkpoint=true]

  exit [shape=Msquare]

  # Linear flow with pauses
  start -> analyze
  analyze -> patterns
  patterns -> constraints
  constraints -> spec
  spec -> build
  build -> exit
}
```

### Teams Mode Workflow

```dot
digraph TeamsModeWorkflow {
  graph [goal="Parallel multi-agent execution"]

  start [shape=Mdiamond]

  # Split into parallel tracks
  split [shape=component]

  # Track 1: Orchestrator
  orchestrator [shape=box,
    agent="orchestrator",
    prompt="Analyze, detect patterns, select constraints"]

  # Track 2: Research (parallel)
  research [shape=box,
    agent="researcher",
    prompt="Research trends and alternatives"]

  # Merge point
  merge [shape=tripleoctagon]

  # Build phase
  build [shape=box,
    agent="builder",
    prompt="Build UI from spec"]

  # Review phase (parallel with build)
  review [shape=box,
    agent="reviewer",
    prompt="Review accessibility and quality"]

  # Final merge
  final [shape=tripleoctagon]

  exit [shape=Msquare]

  # Fan-out
  start -> split
  split -> orchestrator
  split -> research

  # Fan-in
  orchestrator -> merge
  research -> merge

  # Parallel build + review
  merge -> build
  merge -> review

  # Final merge
  build -> final
  review -> final

  final -> exit
}
```

---

## 💾 Checkpoint Configuration

### Enable Checkpoints

```dot
digraph WithCheckpoints {
  graph [
    goal="Workflow with checkpoints"
    checkpoint=true        # Enable checkpointing
    checkpoint_dir=".claude/.strike/checkpoints"
  ]

  phase1 [shape=box, checkpoint=true]
  phase2 [shape=box, checkpoint=true]

  start -> phase1 -> phase2 -> exit
}
```

### Checkpoint Schema

```json
{
  "version": "1.0.0",
  "timestamp": "2025-02-10T14:30:45.123Z",
  "session_id": "uuid-v4",
  "current_node": "build",
  "completed_nodes": ["analyze", "patterns", "constraints", "spec"],
  "context_values": {
    "user_prompt": "...",
    "detected_keywords": ["modern"],
    "selected_constraints": ["paper_ink"]
  },
  "node_states": {
    "analyze": {
      "status": "completed",
      "duration_ms": 4234,
      "output_files": [".claude/.strike/analysis.md"]
    },
    "build": {
      "status": "in_progress",
      "started_at": "2025-02-10T14:30:50.000Z"
    }
  }
}
```

---

## 📊 Event System

### Event Types

```javascript
// Session lifecycle
SESSION_START
SESSION_END

// Phase execution
PHASE_START
PHASE_END
PHASE_ERROR

// UI-specific events
ANALYSIS_START
ANALYSIS_END
ANTI_PATTERNS_DETECTED
CONSTRAINTS_SELECTED
SPEC_CREATED
BUILD_START
BUILD_END
ACCESSIBILITY_CHECK
QUALITY_CHECK

// Checkpoint events
CHECKPOINT_SAVED
CHECKPOINT_LOADED
CHECKPOINT_FAILED

// User interaction
USER_APPROVAL_REQUESTED
USER_APPROVAL_GRANTED
USER_APPROVAL_DENIED
USER_ADJUSTMENT
```

### Event Schema

```json
{
  "kind": "CONSTRAINTS_SELECTED",
  "timestamp": "2025-02-10T14:30:45.123Z",
  "session_id": "uuid-v4",
  "data": {
    "constraints": [
      {"name": "paper_and_ink", "score": 35},
      {"name": "architectural", "score": 78}
    ],
    "rationale": "Selected to counter dark mode defaults"
  }
}
```

---

## 🎨 Model Stylesheet

Optimize LLM usage with CSS-like configuration:

```dot
digraph ModelStylesheet {
  graph [
    goal="Show model stylesheet usage"
    model_stylesheet="
      * { llm_model: claude-sonnet-4-5; }
      .creative { llm_model: claude-opus-4-6; reasoning_effort: high; }
      #critical_review { llm_model: claude-opus-4-6; }
      .quick { llm_model: claude-haiku-4-5; }
    "
  ]

  quick_phase [shape=box, class="quick"]
  creative_phase [shape=box, class="creative"]
  critical [shape=box, id="critical_review"]

  start -> quick_phase -> creative_phase -> critical -> exit
}
```

### Selector Specificity

- `*` - Universal (all nodes) - specificity 0
- `.classname` - Class selector - specificity 1
- `#nodeid` - ID selector - specificity 2

Higher specificity overrides lower.

---

## 🔧 Advanced Features

### Goal Gates

Nodes that MUST succeed before exit:

```dot
digraph WithGoalGates {
  critical [shape=box, goal_gate=true]
  optional [shape=box]

  start -> critical
  start -> optional
  critical -> exit
  optional -> exit

  # Exit waits for critical even if optional fails
}
```

### Steering

Mid-task redirection:

```javascript
// In workflow execution
if (user_feedback === "too_conservative") {
  steer(current_node, "explore_creative");
}
```

### Context Fidelity

How conversation history is managed:

```dot
digraph ContextModes {
  graph [
    context_fidelity="full"  // full | condensed | minimal
  ]

  # full: All history included
  # condensed: Key points only
  # minimal: Current task only
}
```

---

## 📖 DOT Grammar Reference

### Graph Attributes

```dot
digraph GraphName {
  // Graph-level settings
  graph [
    goal="Workflow purpose"
    checkpoint=true
    events=true
    checkpoint_dir="/path/to/checkpoints"
    auto_resume=true
    max_parallel_branches=4
    context_fidelity="full"
    model_stylesheet="..."
  ]
}
```

### Node Attributes

```dot
node_name [shape=box,
  prompt="What this node does",
  checkpoint=true,
  goal_gate=true,
  wait_for_user=true,
  class="classname",
  id="unique_id",
  agent="agent_name",
  condition="expression",
  timeout_ms=30000
]
```

### Edge Attributes

```dot
from -> to [
  label="[A] Approve",
  condition="outcome=success",
  weight=1.0
]
```

---

## 🚀 Best Practices

1. **Keep workflows simple** - Complex DOT is hard to debug
2. **Use checkpoints** - Enable on long-running workflows
3. **Label user choices** - Clear labels like "[A] Approve"
4. **Set goal gates** - Mark critical success points
5. **Monitor events** - Track progress in real-time
6. **Optimize costs** - Use stylesheets for smart LLM selection
7. **Test workflows** - Validate DOT syntax before production
8. **Document decisions** - Explain why certain patterns were chosen

---

## 🔗 References

- **Full Attractor docs:** `plugins/ui/data/attractor/ATTRACTOR-INTEGRATION.md`
- **DOT grammar:** `plugins/ui/data/attractor/dot-grammar.md`
- **Event types:** `plugins/ui/data/attractor/event-types.json`
- **Checkpoint schema:** `plugins/ui/data/attractor/checkpoint-schema.json`

---

*Attractor Workflows Guide - DOT orchestration for UI generation*
