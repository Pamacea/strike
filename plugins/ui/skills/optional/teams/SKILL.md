---
name: teams
description: MANDATORY parallel execution gate BEFORE building large/complex UI projects. Orchestrates multi-agent teamwork with 2-4 specialist agents working concurrently. Specific phrases: 'parallel agents', 'team build', 'multi-agent UI', 'split work', 'concurrent UI generation', 'agent team for design'. Auto-activates with --team flag or large/complex prompts (>3 features, multi-domain). Team composition: Orchestrator (analyze/detect/select/enrich), Build (build/validate/metrics), Adversarial (challenge/stress-test), Reviewer (a11y/quality/docs). Parallel execution: 1.85x faster than sequential (4 agents), 1.6x faster (2 agents). Inter-agent communication via team messaging system. Shared task list at ~/.claude/tasks/ui-<session-id>/. Error handling: Orchestrator fails → stop build, Build fails → spec reusable, Communication fails → 30s timeout + restart. Integrates with ui orchestrator and step mode.
version: 5.0.0-positive

# Lazy Loading Configuration
disable-model-invocation: true  # Prevent auto-loading, only load when explicitly invoked
user-invocable: true            # Visible in / menu
context: fork                   # Each agent runs in isolated context
model: inherit                  # Inherit from parent for team coordination

# Team Configuration
team:
  min_size: 2                   # Minimum agents for teams mode
  max_size: 4                   # Maximum agents (orchestrator, build, adversarial, reviewer)
  default_agents:
    - orchestrator
    - build
  optional_agents:
    - adversarial
    - reviewer

# Memory Integration
memory:
  read: true                    # Check memory for similar team configurations
  save: true                    # Save successful team patterns

# Tool Permissions
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - TaskCreate
  - TaskUpdate
---

# UI Teams Mode v5.0 - Positive Edition

## Mission

Execute UI generation with **multiple specialist agents working in parallel** using Claude Code's native Agent Teams feature for maximum speed and quality on large, complex projects.

**Core Philosophy**: Parallel excellence through coordinated collaboration - each agent contributes their expertise while maintaining clear communication channels.

---

## ⚙️ Active Baseline Configuration

**Team Dials (adapted from ui parent):**

| Dial | Default | Range | Purpose |
|------|---------|-------|---------|
| `TEAM_SIZE` | 4 | 1-4 | Number of parallel agents |
| `PARALLEL_STRATEGY` | 8 | 1-10 | 1=Sequential, 10=Maximum parallelism |
| `COMMUNICATION_FREQ` | 7 | 1-10 | 1=Minimal, 10=Chatty |
| `QUALITY_OVERSIGHT` | 9 | 1-10 | 1=Fast, 10=Thorough review |

**AI Instruction:**
- Adapt team size based on project complexity (simple→2, complex→4)
- High parallel strategy for time-critical projects
- Communication freq 7: Balanced updates (not spammy, not silent)
- Quality oversight 9: Full adversarial + reviewer for production

**Justification:**
- Team size 4: Maximum parallelism without coordination overhead
- Parallel 8: Aggressive parallelization for speed
- Communication 7: Keep team informed without overwhelming
- Quality 9: Always validate for production (non-negotiable)

---

## What is Teams Mode?

Teams mode uses Claude Code's **Agent Teams** feature to spawn multiple specialist agents that work together on UI generation:

- **Orchestrator Agent** — Analyzes prompt, selects paradigms, chooses constraints
- **Build Agent** — Creates the UI with paradigm validation
- **Adversarial Agent** — Challenges decisions and proposes alternatives
- **Reviewer Agent** — Validates accessibility and quality

Each agent has its own context and can communicate with others via the team messaging system.

---

## 🎯 When to Use Teams Mode

### Optimal Use Cases

**USE Teams Mode when:**
- ✅ Large/complex projects (3+ features, multi-domain)
- ✅ Time-critical deadlines (need 1.5-2x speedup)
- ✅ Enterprise scale (full systems, design platforms)
- ✅ Multi-domain work (frontend + backend + docs)

### Sequential Mode Preferred When:

**Sequential mode (without --team) works best when:**
- ✅ Simple interfaces (single page, minimal UI)
- ✅ Quick prototypes (faster to do sequentially)
- ✅ Learning mode (step mode better for teaching)
- ✅ Resource constraints (teams use more tokens)

### Specific Trigger Phrases

```
'parallel agents for UI' → ACTIVATE
'team build interface' → ACTIVATE
'multi-agent UI generation' → ACTIVATE
'split UI work' → ACTIVATE
'concurrent UI design' → ACTIVATE
'agent team for design system' → ACTIVATE
'full SaaS platform' → ACTIVATE (complex)
```

---

## 🔧 Activation

### Enable Agent Teams

```bash
# Enable experiment flag
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"
```

### Use Teams Mode

```bash
# Auto-detect (large/complex prompts)
/ui "Full SaaS dashboard with user management, billing, and real-time analytics"

# Explicit teams mode
/ui --team "Multi-feature application"

# Teams with step mode
/ui --step --team "Enterprise dashboard"

# Teams with explanation
/ui --team --explain "Complex design system"
```

---

## 👥 Team Composition

### Default Team (2 Agents)

```
┌─────────────────────────────────────────────────────┐
│  STRIKE TEAM                                         │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────┐      ┌─────────────────────┐  │
│  │ ORCHESTRATOR     │      │ BUILD               │  │
│  │                 │      │                     │  │
│  │ • Analyze       │      │ • Build UI          │  │
│  │ • Detect        │      │ • Validate a11y     │  │
│  │ • Select        │      │ • Paradigm compliance│  │
│  │ • Enrich        │      │ • Metrics           │  │
│  │                 │      │                     │  │
│  └─────────────────┘      └─────────────────────┘  │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### Full Team (4 Agents)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  STRIKE FULL TEAM                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────┐  │
│  │ORCHESTRATOR  │  │BUILD         │  │ADVERSARIAL   │  │REVIEWER │  │
│  │              │  │              │  │              │  │         │  │
│  │• Analysis    │  │• Build       │  │• Challenge   │  │• A11y   │  │
│  │• Paradigms   │  │• Components  │  │• Alternatives│  │• Quality │  │
│  │• Constraints │  │• Validation  │  │• Stress test │  │• Docs   │  │
│  │              │  │              │  │              │  │         │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └─────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Workflow

### Phase 1: Team Creation

```markdown
## Team Initialization

Creating ui team for: "<user_prompt>"

Team: ui-<session-id>
Members:
1. orchestrator — Prompt analysis and constraint selection
2. build — UI building and validation
3. adversarial — Decision challenge (optional)
4. reviewer — Quality and accessibility review (optional)

Shared task list: ~/.claude/tasks/ui-<session-id>/
```

### Phase 2: Parallel Execution

**Orchestrator Agent:**
1. Analyzes prompt for trend keywords
2. Applies PIVOT MATRIX for paradigm mapping
3. Selects creative constraints with scoring
4. Generates enriched specification
5. Writes to `.claude/.strike/enriched-spec.json`

**Build Agent (parallel):**
1. Reads enriched specification
2. Loads component registry
3. Plans implementation with constraints
4. Builds UI (react-tailwind or vanilla)
5. Validates against paradigms
6. Creates build-result.json

**Adversarial Agent (parallel):**
1. Reviews constraint selection
2. Proposes alternatives
3. Stress tests decisions
4. Reports findings to orchestrator

**Reviewer Agent (parallel):**
1. Runs accessibility checklist
2. Validates bundle size
3. Checks code quality
4. Documents findings

### Phase 3: Coordination

```markdown
## Team Coordination

Waiting for all agents to complete...

[========] Orchestrator: 100% (spec ready)
[========] Build: 100% (build complete)
[====] Adversarial: 50% (reviewing constraints)
[==] Reviewer: 25% (a11y check)

All agents complete! Synthesizing results...
```

### Phase 4: Synthesis

```markdown
## Team Results

Orchestrator delivered:
- analysis.md: Keywords and risk assessment
- constraints.md: 3 constraints selected
- enriched-spec.json: Validated specification

Build delivered:
- output/react-tailwind/: Complete UI
- build-result.json: Metrics and validation

Adversarial delivered:
- challenge-review.md: Alternative options considered
- Final decision: APPROVED with safeguards

Reviewer delivered:
- accessibility-report.md: WCAG AA compliant
- quality-report.md: Code quality: 95%

**Output ready at ./output/**
```

---

## 📋 Task List Structure

The team shares a task list at `~/.claude/tasks/ui-<session-id>/`:

```
~/.claude/tasks/ui-abc123/
├── task-001-analyze.prompt      # Orchestrator: Analyze prompt
├── task-002-apply-pivot         # Orchestrator: Apply PIVOT MATRIX
├── task-003-select-paradigms   # Orchestrator: Select paradigms
├── task-004-select.constraints  # Orchestrator: Select constraints
├── task-005-enrich.spec         # Orchestrator: Create spec
├── task-006-read.registry       # Build: Load components
├── task-007-plan.ui             # Build: Plan structure
├── task-008-build.ui            # Build: Build
├── task-009-validate.a11y       # Build: Check accessibility
├── task-010-challenge.decision  # Adversarial: Review
├── task-011.review.quality      # Reviewer: Quality check
```

Agents claim tasks as they work, blocking dependent tasks.

---

## 💬 Inter-Agent Communication

Agents communicate via the team messaging system:

```markdown
# Orchestrator → Build
@build Spec ready at .claude/.strike/enriched-spec.json
Paradigms: Warm Brutalism, List Narrative
Constraints: paper_ink (score: 35), architectural (score: 78)

# Build → Orchestrator
@orchestrator Build complete. Paradigm compliance: 100%
Used Room components instead of Grid (architectural constraint)
Output: ./output/react-tailwind/

# Adversarial → Orchestrator
@orchestrator Challenge: architectural constraint has edge cases
Alternative: warm_only + mechanical (score: 68)
Recommendation: Proceed with safeguards

# Reviewer → All
@team Accessibility: PASS (WCAG AA compliant)
Quality: 95/100 (minor: add more comments)
Bundle: 8KB gzipped (excellent)
```

---

## 🚀 Flag Combinations

| Command | Team Size | Features | Speed |
|---------|-----------|----------|-------|
| `/ui --team "..."` | 2 | Orchestrator + Build | 1.6x faster |
| `/ui --team --explain "..."` | 2 | With diagrams | 1.6x faster |
| `/ui --team --full "..."` | 4 | Everything | 1.85x faster |

---

## 📊 Performance

### Sequential vs Teams

```
Sequential (baseline):
Orchestrator: 45s → Build: 60s → Review: 15s = 120s

Teams (parallel):
Orchestrator + Build: 60s → Review: 15s = 75s (1.6x faster)
```

### Full Team Speedup

```
Sequential: 120s
Full Team (4 agents, parallel): 65s (1.85x faster)
```

---

## ✅ Teams Mode Quality Gates

Before claiming team build complete:

### Team Coordination
- [ ] All agents completed successfully
- [ ] Inter-agent communication working
- [ ] No agent failures or timeouts
- [ ] Task list properly synchronized

### Output Quality
- [ ] All deliverables created
- [ ] Orchestrator spec valid
- [ ] Build paradigm-compliant
- [ ] Adversarial challenges addressed
- [ ] Reviewer checks passed

### State Preservation
- [ ] Task list archived
- [ ] Communication logs saved
- [ ] Results synthesized
- [ ] Session reproducible

---

## 🚨 Error Handling

### Orchestrator Fails

```markdown
If Orchestrator fails:
1. Build stops (waiting for spec)
2. Adversarial reports error
3. Team lead (you) decides: retry or fallback

Fallback: Run without constraints using /ui --build directly
```

### Build Fails

```markdown
If Build fails:
1. Orchestrator completes (spec reusable)
2. Reviewer logs the failure
3. Team lead decides: retry with different stack or debug

Debug: Check build log in .claude/.strike/build.log
```

### Communication Failure

```markdown
If an agent stops responding:
1. Wait 30 seconds for timeout
2. Check agent status in task list
3. Restart failed agent if needed
4. Resume from last completed task
```

---

## 🔗 Integration with Other Modes

### Step + Teams

```bash
/ui --step --team "Complex dashboard"
```

In step + teams mode:
- Each phase executed by appropriate agent
- Team lead (you) reviews and approves
- Agents pause and wait for input
- Parallel work within phases, sequential between phases

### Demo + Teams

```bash
/ui --demo --team "Large app"
```

In demo + teams mode:
- Simplified agent outputs (less verbose)
- Faster phase execution
- Still parallel, still faster
- Good for large but simple projects

---

## 🎯 Best Practices

1. **Use for complex prompts** — Multiple features, enterprise scale
2. **Direct mode for simple prompts** — Single page, minimal UI
3. **Monitor task list** — Check `~/.claude/tasks/ui-*/` for progress
4. **Read agent messages** — Inter-agent communication contains decisions
5. **Review outputs** — Each agent creates documentation
6. **Clean up** — Archive task list after completion

---

## 🔧 Configuration

### Team Settings

```json
{
  "ui": {
    "teams": {
      "enabled": true,
      "default_size": 2,
      "max_agents": 4,
      "display_mode": "in-process",
      "timeout_seconds": 300
    }
  }
}
```

### Agent Roles

```json
{
  "agents": {
    "orchestrator": {
      "tasks": ["analyze", "pivot", "paradigms", "constraints", "enrich"],
      "skills": ["ui"],
      "dependencies": []
    },
    "build": {
      "tasks": ["build", "validate", "metrics"],
      "skills": ["build"],
      "dependencies": ["orchestrator"]
    },
    "adversarial": {
      "tasks": ["challenge", "stress-test"],
      "dependencies": ["orchestrator"],
      "optional": true
    },
    "reviewer": {
      "tasks": ["a11y", "quality", "docs"],
      "dependencies": ["build"],
      "optional": true
    }
  }
}
```

---

## 🔗 Integration with Other Skills

**Requires:**
- **ui** (parent orchestrator) - Teams mode is a ui sub-skill

**Complements:**
- **step** - Step mode can be combined with teams mode
- **verification-before-completion** - Final verification before done

---

## 📋 Quick Reference

### Team Activation
```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"
/ui --team "complex project"
```

### Team Composition
```
2 agents: Orchestrator + Build (default)
4 agents: + Adversarial + Reviewer (full)
```

### Speedup
```
2 agents: 1.6x faster
4 agents: 1.85x faster
```

### Task List
```
~/.claude/tasks/ui-<session-id>/
```

---

## 📊 Migration from Sequential

**Before (sequential v3.0):**
```bash
/ui "Create dashboard"
# Orchestrator runs (45s)
# Build runs (60s)
# Total: 105s
```

**After (teams v5.0):**
```bash
/ui --team "Create dashboard"
# Orchestrator + Build run together (60s)
# Total: 60s (1.75x faster)
```

---

*UI Teams Mode v5.0 - Positive Edition: Parallel multi-agent orchestration for complex UI projects*
