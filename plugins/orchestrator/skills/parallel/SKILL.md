---
name: orchestrator-parallel
description: Parallel orchestration workflow - Orchestrator analysis runs in parallel with Implementer preparation
version: 1.0.0
---

# Orchestrator Parallel Workflow v1.0

## Mission

Execute Orchestrator analysis and Implementer preparation in parallel for faster UI generation.

---

## Parallel Strategy

Instead of sequential:
```
Orchestrator (analyze → detect → select → enrich) → Implementer (build)
```

We run in parallel:
```
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: PARALLEL EXECUTION                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐      ┌──────────────────────────┐     │
│  │ ORCHESTRATOR     │      │ IMPLEMENTER             │     │
│  │                 │      │                          │     │
│  │ 1. Analyze      │      │ 1. Read template        │     │
│  │ 2. Detect       │      │ 2. Check components     │     │
│  │ 3. Generate     │      │ 3. Prepare structure    │     │
│  │ 4. Select       │      │ 4. Ready to build       │     │
│  │                 │      │                          │     │
│  └─────────────────┘      └──────────────────────────┘     │
│                                                              │
│  Shared State: .claude/.strike/parallel-state.json          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: COORDINATION                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Wait for Orchestrator to complete analysis             │
│  2. Wait for Implementer to complete preparation            │
│  3. Merge: Orchestrator enriched spec + Implementer setup   │
│  4. Proceed to build with full context                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Shared State Protocol

### State File
```
.claude/.strike/parallel-state.json
```

### State Schema
```json
{
  "session_id": "uuid",
  "timestamp": "ISO8601",
  "status": "initializing|running|coordinating|building|completed|failed",
  "orchestrator": {
    "status": "pending|running|completed|failed",
    "stage": "analyze|detect|generate|select|enrich",
    "output_files": [],
    "anti_patterns": [],
    "constraints": []
  },
  "implementer": {
    "status": "pending|running|completed|failed",
    "stage": "read|check|prepare|ready",
    "template": "react-tailwind|vanilla",
    "components_loaded": [],
    "structure_ready": false
  },
  "coordination": {
    "orchestrator_ready": false,
    "implementer_ready": false,
    "merged_spec": null,
    "build_ready": false
  }
}
```

---

## Execution Flow

### Step 1: Initialize Parallel State

```markdown
## Parallel Session Initialization

Creating shared state for parallel execution...

Session ID: ${uuid}
Mode: parallel-ui
Target: ${user_prompt}

**Agents launching:**
1. Orchestrator - Analysis and constraint selection
2. Implementer - Template preparation and component loading

Shared state: .claude/.strike/parallel-state.json
```

### Step 2: Launch in Parallel

```markdown
## Launching Agents in Parallel

### Agent 1: Orchestrator
Task: Analyze prompt, detect anti-patterns, select constraints
Output: .claude/.strike/analysis.md, constraints.md

### Agent 2: Implementer
Task: Read template, load component registry, prepare build structure
Output: .claude/.strike/build-prep.md

Both agents now running...
```

### Step 3: Wait and Poll

```markdown
## Waiting for Agents...

Polling .claude/.strike/parallel-state.json every 5s:

[=====>     ] Orchestrator: 50% (select)
[=======>   ] Implementer: 75% (structure ready)

Both agents completed!
```

### Step 4: Coordinate and Merge

```markdown
## Coordination Phase

Orchestrator outputs:
- analysis.md: Keywords detected, risk assessment
- constraints.md: 3 constraints selected (paper_ink, architectural, print_first)
- enriched-spec.md: Full specification

Implementer outputs:
- build-prep.md: Template loaded, components ready
- structure.md: Output directory prepared

Merging into build specification...
```

### Step 5: Build

```markdown
## Build Phase

All preparations complete, proceeding to build with:
- Enriched specification from Orchestrator
- Prepared structure from Implementer
- Full anti-pattern blacklist
- Constraint requirements

Running: /build --from-spec=...
```

---

## Flag: --parallel

Enable parallel mode:

```bash
# Default (sequential)
/ui "Create a dashboard"

# Parallel mode
/ui --parallel "Create a dashboard"

# Parallel with verbose output
/ui --parallel --verbose "Create a dashboard"
```

---

## Error Handling

### Orchestrator Fails

```markdown
If Orchestrator fails:
1. Implementer stops preparation
2. Report error to user
3. Offer fallback: Run without constraints
```

### Implementer Fails

```markdown
If Implementer fails:
1. Orchestrator completes analysis (can be reused)
2. Report error to user
3. Offer fallback: Run with different template
```

### Both Fail

```markdown
If both fail:
1. Archive state for debugging
2. Report both errors
3. Suggest: Try again with --no-parallel flag
```

---

## Configuration

### Parallel Settings
```json
{
  "parallel": {
    "enabled": true,
    "poll_interval_ms": 1000,
    "timeout_per_agent_seconds": 300,
    "merge_strategy": "orchestrator-first"
  }
}
```

### Timeout Handling
```json
{
  "timeouts": {
    "orchestrator": 180,
    "implementer": 60,
    "coordination": 30
  }
}
```

---

## Performance

### Sequential (Baseline)
```
Orchestrator: ~45 seconds
Implementer prep: ~15 seconds
Build: ~60 seconds
Total: ~120 seconds
```

### Parallel (Optimized)
```
Orchestrator + Implementer: ~45 seconds (parallel)
Coordination: ~5 seconds
Build: ~60 seconds
Total: ~110 seconds (8% faster)
```

**Note:** Speedup increases with more complex prompts where Orchestrator takes longer.

---

## Best Practices

1. **Use for complex prompts** - Parallel mode shines when analysis is heavy
2. **Skip for simple prompts** - Use `--no-parallel` for quick iterations
3. **Monitor state file** - Check `.claude/.strike/parallel-state.json` for progress
4. **Handle timeouts** - Set reasonable timeouts per agent
5. **Clean up** - Archive state after completion

---

## Examples

### Example 1: Dashboard (Parallel)

```bash
/ui --parallel "Modern analytics dashboard with real-time charts"

# Execution:
# [Parallel] Orchestrator: Analyzing "modern", "dashboard" keywords...
# [Parallel] Implementer: Loading react-tailwind template...
# [Parallel] Both agents running...
# [Coordination] Merging outputs...
# [Build] Building with enriched spec...
```

### Example 2: Portfolio (Sequential)

```bash
/ui --no-parallel "Simple portfolio website"

# Execution:
# [Sequential] Orchestrator completes (15s)
# [Sequential] Implementer prepares (5s)
# [Build] Building...
```

---

## Migration Guide

### From Sequential

**Before (v2.0):**
```bash
/ui "Create dashboard"
# Orchestrator runs
# Implementer runs
# Build runs
```

**After (v2.1 with --parallel):**
```bash
/ui --parallel "Create dashboard"
# Orchestrator + Implementer run together
# Coordination merges
# Build runs
```

---

*Orchestrator Parallel Workflow v1.0 - Parallel execution with shared state*
