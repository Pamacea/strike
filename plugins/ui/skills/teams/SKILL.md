---
name: teams
description: Teams mode for ui plugin - Parallel multi-agent orchestration with Claude Code Agent Teams
version: 1.1.0
---

# UI Teams Mode v3.0

## Mission

Execute UI generation with multiple specialist agents working in parallel using Claude Code's native Agent Teams.

---

## What is Teams Mode?

Teams mode uses Claude Code's **Agent Teams** feature to spawn multiple specialist agents that work together on UI generation:

- **Orchestrator Agent** — Analyzes prompt, detects anti-patterns, selects constraints
- **Build Agent** — Creates the UI with anti-pattern validation
- **Adversarial Agent** — Challenges decisions and proposes alternatives (optional)
- **Reviewer Agent** — Validates accessibility and quality (optional)

Each agent has its own context and can communicate with others via the team messaging system.

---

## Activation

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

# Teams with explanation
/ui --team --explain "Enterprise dashboard"

# Teams with learning
/ui --team --learn "Complete design system"
```

---

## Team Composition

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
│  │ • Select        │      │ • Anti-patterns     │  │
│  │ • Enrich        │      │ • Metrics           │  │
│  │                 │      │                     │  │
│  └─────────────────┘      └─────────────────────┘  │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### Full Team (4 Agents)

```
┌─────────────────────────────────────────────────────────────────────┐
│  STRIKE FULL TEAM                                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────┐  │
│  │ORCHESTRATOR  │  │BUILD         │  │ADVERSARIAL   │  │REVIEWER │  │
│  │              │  │              │  │              │  │         │  │
│  │• Analysis    │  │• Build       │  │• Challenge   │  │• A11y   │  │
│  │• Anti-pattern│  │• Components  │  │• Alternatives│  │• Quality │  │
│  │• Constraints │  │• Validation  │  │• Stress test │  │• Docs   │  │
│  │              │  │              │  │              │  │         │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └─────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Workflow

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
2. Detects anti-patterns from database
3. Selects creative constraints with scoring
4. Generates enriched specification
5. Writes to `.claude/.strike/enriched-spec.json`

**Build Agent:**
1. Reads enriched specification
2. Loads component registry
3. Plans implementation with constraints
4. Builds UI (react-tailwind or vanilla)
5. Validates against anti-patterns
6. Creates build-result.json

**Adversarial Agent (if enabled):**
1. Reviews constraint selection
2. Proposes alternatives
3. Stress tests decisions
4. Reports findings to orchestrator

**Reviewer Agent (if enabled):**
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

## Task List Structure

The team shares a task list at `~/.claude/tasks/ui-<session-id>/`:

```
~/.claude/tasks/ui-abc123/
├── task-001-analyze.prompt      # Orchestrator: Analyze prompt
├── task-002-detect.patterns      # Orchestrator: Detect anti-patterns
├── task-003-select.constraints   # Orchestrator: Select constraints
├── task-004-enrich.spec          # Orchestrator: Create spec
├── task-005-read.registry        # Build: Load components
├── task-006-plan.ui              # Build: Plan structure
├── task-007.build.ui             # Build: Build
├── task-008.validate.a11y        # Build: Check accessibility
├── task-009-challenge.decision   # Adversarial: Review
├── task-010.review.quality       # Reviewer: Quality check
```

Agents claim tasks as they work, blocking dependent tasks.

---

## Inter-Agent Communication

Agents communicate via the team messaging system:

```markdown
# Orchestrator → Build
@build Spec ready at .claude/.strike/enriched-spec.json
Constraints: paper_ink (score: 35), architectural (score: 78)
Anti-patterns: card_grid, glassmorphism, neon_colors

# Build → Orchestrator
@orchestrator Build complete. Constraint compliance: 100%
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

## Flag Combinations

| Command | Team Size | Features | Speed |
|---------|-----------|----------|-------|
| `/ui --team "..."` | 2 | Orchestrator + Build | 2x |
| `/ui --team --explain "..."` | 2 | With diagrams | 2x |
| `/ui --team --full "..."` | 4 | Everything | 1.5x |

---

## Display Modes

### In-Process (Default)

All teammates appear in the main terminal. Use `Shift+Up/Down` to cycle between agents.

### Split Panes (iTerm2/Tmux)

Each teammate gets its own pane for better visibility.

```bash
# Configure in ~/.claude/config.json
{
  "teams": {
    "display_mode": "split-panes",
    "layout": "2x2"
  }
}
```

---

## Error Handling

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

## Performance

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

## Best Practices

1. **Use for complex prompts** — Multiple features, enterprise scale
2. **Skip for simple prompts** — Single page, minimal UI
3. **Monitor task list** — Check `~/.claude/tasks/ui-*/` for progress
4. **Read agent messages** — Inter-agent communication contains decisions
5. **Review outputs** — Each agent creates documentation
6. **Clean up** — Archive task list after completion

---

## Examples

### Example 1: SaaS Dashboard

```bash
/ui --team "Full SaaS dashboard with user management, billing, analytics"

# Execution:
# [Team] Creating ui-abc123 with 2 agents...
# [orchestrator] Analyzing "SaaS", "dashboard", "billing"...
# [build] Loading component registry...
# [orchestrator] Spec ready: paper_ink, architectural
# [build] Building with Room components...
# [All agents] Complete! Output at ./output/
```

### Example 2: Design System

```bash
/ui --team --full "Complete design system with 20 components"

# Execution:
# [Team] Creating full team (4 agents)...
# [orchestrator] Analyzing design system requirements...
# [build] Planning component structure...
# [adversarial] Challenging: too many components for single file?
# [reviewer] Checking accessibility per-component...
# [All agents] Complete! System documented.
```

---

## Migration from Sequential

**Before (sequential v2.0):**
```bash
/ui "Create dashboard"
# Orchestrator runs (45s)
# Build runs (60s)
# Total: 105s
```

**After (teams v3.0):**
```bash
/ui --team "Create dashboard"
# Orchestrator + Build run together (60s)
# Total: 60s (1.75x faster)
```

---

## Configuration

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
      "tasks": ["analyze", "detect", "select", "enrich"],
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

*UI Teams Mode v3.0 — Parallel multi-agent orchestration*
