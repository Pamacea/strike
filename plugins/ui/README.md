---
name: ui
description: "Generate unique UI by applying anti-patterns and creative constraints - Break the trends, create the unexpected"
argument-hint: "[--build|--team|--step|--analyze|--constraints|--full|--score|--validate|--challenge|--explain|--learn|--demo|--stack=<react|vanilla>] '<prompt>'"
version: 3.1.0
---

# /ui - Anti-Trend UI Orchestrator v1.1

Transform generic UI prompts into unique, thoughtful interfaces by detecting anti-patterns and imposing creative constraints.

**New in v1.1: Interactive Step Mode**
- Pause at each phase for user review and adjustment
- Full control with continue, adjust, add, remove, replace commands
- State tracking preserves all your decisions

**New in v3.0: Teams Mode & Build Mode**
- `--team` for parallel multi-agent orchestration
- `--build` for direct implementation from spec
- Unified plugin (orchestrator + builder)

---

## What This Does

When you say `/ui "make me a modern dashboard"`, this command:

1. **Analyzes your prompt** for trend-trap keywords ("modern", "sleek", "minimal")
2. **Detects anti-patterns** you might fall into (glassmorphism, card grids, gradients)
3. **Selects creative constraints** to push you in unexpected directions
4. **Validates the specification** against JSON Schema
5. **Builds the UI** with anti-pattern validation

---

## Usage

```bash
# Full workflow (default)
/ui "Create a dashboard for analytics"

# Interactive step mode - pause at each phase (NEW v1.1)
/ui --step "Create a dashboard for analytics"

# Teams mode - parallel multi-agent execution (NEW v3.0)
/ui --team "Full SaaS dashboard with billing and analytics"

# Build from existing spec (NEW v3.0)
/ui --build

# Demo mode - lightweight, fast, fewer tokens
/ui --demo "Quick portfolio"

# Just analyze prompt (don't build yet)
/ui --analyze "A modern SaaS landing page"

# See which constraints would be selected
/ui --constraints "Sleek portfolio website"

# Full build with all steps
/ui --full "E-commerce product page"

# Show constraint scoring details
/ui --score "Minimal blog layout"

# Validate only, don't build
/ui --validate "Portfolio site"

# Include explanation diagram
/ui --explain "Complex application"

# Learn from this session
/ui --learn "Design system"
```

---

## Step Mode (NEW v1.1)

Step mode transforms `/ui` from an automated pipeline into an **interactive workshop**:

### How It Works

```
PHASE 1: Analysis → PAUSED → Review & Adjust → Continue
PHASE 2: Anti-patterns → PAUSED → Add/Remove → Continue
PHASE 3: Constraints → PAUSED → Accept/Replace → Continue
PHASE 4: Spec → PAUSED → Review → Build
PHASE 5: Build → Complete!
```

### Commands

| Command | Action |
|---------|--------|
| `continue` | Proceed to next phase |
| `adjust <instruction>` | Modify current phase output |
| `add <item>` | Add item to current phase |
| `remove <item>` | Remove item from current phase |
| `replace <old> with <new>` | Replace item |
| `show` | Display current phase output again |
| `skip` | Jump to build phase |
| `cancel` | Cancel workflow |

### When to Use

**Perfect for:**
- Learning how the system works
- Stakeholder-driven projects
- Complex requirements
- First-time users

**Skip when:**
- Quick iterations
- Simple projects
- Trusted patterns

---

## Teams Mode (NEW v3.0)

Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`:

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"

# Teams mode for parallel execution
/ui --team "Complex multi-feature application"

# Teams with step mode
/ui --step --team "Enterprise dashboard"
```

### Team Composition

- **Orchestrator Agent** — Analyzes prompt, detects anti-patterns, selects constraints
- **Build Agent** — Creates the UI with anti-pattern validation
- **Adversarial Agent** (optional) — Challenges decisions and proposes alternatives
- **Reviewer Agent** (optional) — Validates accessibility and quality

---

## How It Works

### Step 1: Prompt Analysis

The orchestrator scans your prompt for:

**High-risk keywords** (triggers strong anti-pattern detection):
- "modern", "trendy", "sleek", "futuristic", "stunning", "beautiful"

**Medium-risk keywords** (moderate detection):
- "clean", "professional", "elegant", "smooth", "polished"

**Context-dependent** (analyzed in context):
- "simple", "minimalist", "bold", "unique"

### Step 2: Anti-Pattern Detection

Based on your prompt, orchestrator identifies patterns to avoid:

- **UI Effects**: Particles, glitch text, custom cursors, blob morphing
- **Colors**: Neon pink-blue, trendy gradients, dark-mode-by-default
- **Layouts**: Generic heroes, card grids, fullscreen sections
- **Interactions**: Parallax, scroll reveal, scroll hijacking
- **Typography**: Acid distortions, giant headlines, gradient text
- **Components**: Glassmorphism, neumorphism, rounded everything

### Step 3: Constraint Selection

The orchestrator selects 2-4 creative constraints using a scoring system:

```
constraintScore = {
  creativity: 0-30,      // How unusual is this?
  difficulty: 0-25,      // How hard to implement?
  impact: 0-25,          // How much does it change the result?
  synergy: 0-20         // How well does it work with other constraints?
}
```

**Color Restrictions:**
- Single color challenge
- True monochrome
- Paper & ink aesthetic

**Interaction Sources:**
- Architectural inspiration
- Biological systems
- Musical structure
- Mechanical metaphors

**Technical Constraints:**
- CSS only
- System fonts only
- No images

**Context Shifts:**
- Must work printed
- Screen reader first
- Outdoor visibility

### Step 4: Schema Validation

Your specification is validated against JSON Schema before building:

- All required fields present
- Data types match schema
- Enum values valid
- Numeric ranges within bounds

### Step 5: Build

The enriched specification is used to build the UI:

- Anti-pattern validation against blacklist
- Constraint compliance checking
- Component registry for validated patterns
- Accessibility checklist (WCAG AA)
- Build metrics (bundle size, timing, scores)

---

## Options

| Flag | Description |
|------|-------------|
| `--step` | Interactive workflow - pause at each phase for user review (NEW v1.1) |
| `--build` | Build from enriched specification (skip orchestration if spec exists) (NEW v3.0) |
| `--team` | Teams mode for parallel multi-agent execution (NEW v3.0) |
| `--demo` | Lightweight mode - faster, fewer tokens, simpler decisions |
| `--analyze` | Only analyze prompt, show detected patterns, don't build |
| `--constraints` | Show which constraints would be selected, don't build |
| `--full` | Run complete workflow with verbose output |
| `--stack=<react\|vanilla>` | Force specific tech stack for implementation |
| `--strict` | Reject prompt if too many anti-patterns detected |
| `--score` | Show constraint scoring details |
| `--validate` | Run schema validation only, don't build |
| `--explain` | Generate explanation diagram after constraint selection |
| `--learn` | Extract patterns from this session for future improvement |
| `--no-challenge` | Skip adversarial challenge step (use with caution) |

---

## Output

The orchestrator creates in `.claude/.strike/`:

| File | Purpose |
|------|---------|
| `.claude/.strike/analysis.md` | Prompt analysis and detected patterns |
| `.claude/.strike/constraints.md` | Selected constraints with scores and rationale |
| `.claude/.strike/enriched-spec.json` | Validated JSON specification |
| `.claude/.strike/enriched-spec.md` | Full brief for build (readable) |
| `.claude/.strike/anti-patterns.md` | Blacklist for build |
| `.claude/.strike/step-state.json` | Step mode state (if --step used) |

The builder creates in `./output/`:

| Path | Stack | Purpose |
|------|-------|---------|
| `./output/react-tailwind/` | React/Tailwind | Component-based production app |
| `./output/vanilla/` | Vanilla | Single-file instant prototype |
| `./output/build-result.json` | Both | Metrics and validation |

---

## Philosophy

**Why anti-patterns?**
Modern UI has converged on a narrow set of "safe" choices. Glassmorphism, card grids, neon gradients — they're not bad, they're everywhere. When everything looks the same, nothing stands out.

**Why constraints?**
Limitations breed creativity. When you can't use gradients, you discover the power of typography. When you can't use images, you learn what CSS can really do. When you design for print, you discover true hierarchy.

**The goal:**
Not to be contrarian for its own sake, but to push past the first obvious solution and find something that actually fits the content, the users, and the context.

---

## Configuration

Settings in `.claude/.strike/config.json`:

```json
{
  "ui": {
    "min_constraints": 2,
    "max_constraints": 4,
    "strict_mode": false,
    "always_include": ["color_restrictions"],
    "prefer_categories": ["technical_constraints"],
    "anti_pattern_severity_threshold": "medium",
    "scoring_weights": {
      "creativity": 0.3,
      "difficulty": 0.25,
      "impact": 0.25,
      "synergy": 0.2
    },
    "feedback_learning": true
  }
}
```

---

## Best Practices

1. **Be honest about your prompt** — Don't game the system by avoiding trigger words
2. **Embrace constraints** — They're not limitations, they're liberation
3. **Trust the process** — The weird ideas often become the best ideas
4. **Use step mode to learn** — Interactive workflow teaches you the system
5. **Use teams for complex projects** — Enable teams mode for 2-3x speedup
6. **Iterate** — If the first result isn't right, run again with different constraints

---

## Technical Notes

### Schema Validation

All specs are validated against `schemas/spec.schema.json`:
- Enables autocomplete and validation
- Catches errors before delegation
- Provides clear error messages

### Feedback Loop

Build results feed back into constraint selection:
- High compliance → increase constraint score
- Violations → suggest different alternatives
- User feedback → adjust weights

---

*UI Orchestrator v1.1 - Interactive step mode, teams orchestration, unified plugin*
