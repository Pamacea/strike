---
name: ui
description: Frontend UI Orchestrator Skill - Parallel multi-agent orchestration with Claude Code Agent Teams
version: 1.1.0
---

# UI Orchestrator Skill v3.0

## Mission

Transform generic UI prompts into unique, anti-trend specifications by detecting overused patterns, **generating new prompt-specific anti-patterns dynamically**, imposing creative constraints, and integrating adversarial self-challenge.

**New in v3.0:**
- **Unified plugin** - Orchestrator and Builder in one
- **Teams mode (`--team`)** - Parallel multi-agent execution with Claude Code Agent Teams
- **Build flag (`--build`)** - Direct implementation from existing spec

**v2.3 features:**
- **Dynamic anti-pattern generation** - Creates NEW patterns from semantic keywords
- **Demo mode (`--demo`)** - Lightweight, fast workflow with fewer tokens (v1-style)

**v2.1 features:** Integrated adversarial mode, self-challenge with alternatives, diagram explanations, pattern extraction.

---

## Core Workflow

```
UI ORCHESTRATOR v3.0 WORKFLOW
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. RECEIVE          Raw prompt from user                       │
│       ↓              "Un site futuriste, nuageux et mélancolique"│
│                                                                 │
│  2. ANALYZE          Scan for trend-trap keywords               │
│       ↓              → "futuriste" detected (semantic)          │
│                      → "nuageux" detected (semantic)            │
│                      → "mélancolique" detected (semantic)       │
│                                                                 │
│  3. GENERATE         Create NEW anti-patterns from keywords    │
│       ↓              → Semantic reasoning from keywords         │
│                      → Combine existing patterns                │
│                      → Web search for examples (if available)   │
│                      → EXPLICITLY SHOW to user                  │
│                                                                 │
│  4. DETECT           Load anti-patterns.json (static DB)        │
│       ↓              → Match prompt to pattern categories       │
│                      → Add static patterns to list              │
│                                                                 │
│  5. SELECT           Load constraints.json                       │
│       ↓              → Choose 2-4 creative constraints          │
│                      → Score constraints                        │
│                      → Resolve conflicts                        │
│                      → Balance difficulty                       │
│                                                                 │
│  6. SELF-CHALLENGE   Adversarial mode                           │
│       ↓              → Question own decisions                   │
│                      → Propose alternatives                     │
│                      → Debate trade-offs                        │
│                                                                 │
│  7. VALIDATE         Validate spec against schema               │
│       ↓              → JSON Schema validation                   │
│                      → Consistency checks                       │
│                                                                 │
│  8. ENRICH           Transform prompt                           │
│       ↓              → Add specific guidance                    │
│                      → Include ALL anti-pattern warnings        │
│                      → Suggest alternatives                     │
│                                                                 │
│  9. BUILD            Execute build (or delegate to build agent)  │
│       ↓              → React/Tailwind or Vanilla                 │
│                      → Anti-pattern validation                   │
│                      → Accessibility checks                     │
│                                                                 │
│ 10. EXPLAIN (opt)    Diagram explanations                       │
│       ↓              → Visual workflow diagrams                 │
│                      → Decision rationale                       │
│                                                                 │
│ 11. LEARN (opt)      Extract patterns                           │
│                      → Document successful combos               │
│                      → Build pattern library                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Demo Mode - Lightweight Workflow

Use `--demo` flag for a **faster, lighter** workflow inspired by v1.

**When to use:** You want quick results without the heavy analysis, token usage, and detailed decision-making.

**What changes:**
- No dynamic pattern generation
- No constraint scoring system
- No adversarial self-challenge
- No schema validation
- Quick keyword matching only
- Simpler constraint selection

### Demo Workflow

```
UI ORCHESTRATOR DEMO MODE (--demo)
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. RECEIVE     Raw prompt                              │
│       ↓         "Create a modern dashboard"              │
│                                                         │
│  2. ANALYZE     Quick keyword scan                       │
│       ↓         → "modern" detected (high-risk)          │
│                                                         │
│  3. DETECT      Match to static anti-patterns DB        │
│       ↓         → Quick blacklist: 3-5 patterns          │
│                                                         │
│  4. SELECT     Pick 2-3 constraints (simple algo)       │
│       ↓         → No scoring, no complex resolution      │
│                                                         │
│  5. BUILD      Execute build                             │
│                  → Anti-pattern validation                │
│                  → Accessibility checks                   │
└─────────────────────────────────────────────────────────┘
```

### Comparison: Full vs Demo

| Aspect | Full Mode | Demo Mode (--demo) |
|--------|-----------|-------------------|
| Token usage | High | Low |
| Analysis depth | Deep semantic reasoning | Quick keyword match |
| Pattern generation | Dynamic + Static | Static only |
| Constraint selection | Scored, balanced | Simple pick |
| Self-challenge | Yes | No |
| Schema validation | Yes | No |
| Speed | Slower | **Fast** |
| Best for | Complex, unique results | Quick iterations |

---

## Step 1: Prompt Reception

Receive raw prompt and preserve original intent.

**Input:** User's natural language request

**Output:** Stored original prompt for reference

```markdown
## Original Intent
"${user_prompt}"

## Timestamp
${current_time}

## Context
- Previous builds: ${previous_count}
- User preferences: ${stored_preferences}
- Feedback history: ${feedback_loop_results}
```

---

## Step 2: Prompt Analysis

Scan prompt for keywords that indicate trend-following.

### Keyword Categories

**High-Risk (strong anti-pattern trigger):**
```
modern, trendy, sleek, futuristic, stunning, beautiful,
minimal but impactful, cutting-edge, next-gen, innovative
```

**Medium-Risk (moderate detection):**
```
clean, professional, elegant, smooth, polished,
refined, sophisticated, premium, high-end, bespoke
```

**Context-Dependent (analyzed in context):**
```
simple, minimalist, bold, unique, creative, dynamic
```

### Enhanced Analysis Output

```markdown
## Prompt Analysis

### Detected Keywords
- HIGH: "modern" (position: 8, weight: 0.9)
- MEDIUM: "clean" (position: 23, weight: 0.6)

### Risk Assessment
- Trend-trap score: 7/10
- Pattern convergence risk: HIGH
- Recommendation: APPLY STRONG CONSTRAINTS
- Confidence: 85%

### Project Type Detection
- Type: Dashboard
- Industry: Analytics/SaaS
- Typical patterns: Cards, charts, dark theme
- Constraint suggestions: architectural, print_first
```

---

## Step 3: Dynamic Anti-Pattern Generation

**Generate NEW anti-patterns based on prompt keywords, not just match existing ones.**

### How It Works

1. **Extract semantic keywords** - Beyond the standard high/medium/low risk lists
2. **Analyze keyword combinations** - Understand the aesthetic direction
3. **Generate NEW anti-patterns** - Create patterns that don't exist in the static database
4. **Search/Find examples** - Use web search or knowledge to find what's overused in this style
5. **Combine and mutate** - Mix existing patterns to create new ones
6. **Display explicitly to user** - Show what was detected and what should be avoided

### Explicit Display Format

**CRITICAL: Always show this table to the user - EVERY TIME.**

```markdown
════════════════════════════════════════════════════════════════════════════════
  🔍 STYLE ANALYSIS - DETECTED ANTI-PATTERNS
════════════════════════════════════════════════════════════════════════════════

Based on your prompt: "Un site futuriste, un peu nuageux et mélancolique"

┌─────────────────────────────────────────────────────────────────────────────┐
│  🔴 RED FLAGS - Patterns to AVOID (what everyone does)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ❌ cyberpunk_overload        Neon + glitch, exhausted since 2018           │
│  ❌ dreamy_blur_overload      Pastel gradients + blur everywhere            │
│  ❌ moody_dark_with_accent    Dark + single accent (melancholy formula)     │
│  ❌ blurry_glass_cards        Glass + blur = 2023-2024 soft cliché           │
│  ❌ particle_canvas           Every SaaS landing page has this               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  🟢 GREEN FLAGS - Selected Constraints (your unique direction)              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ paper_and_ink              Crisp print aesthetic, counters blur         │
│  ✅ warm_only                  No neon, breaks cyberpunk default            │
│  ✅ architectural              Solid structure, not floating elements        │
└─────────────────────────────────────────────────────────────────────────────┘

[Proceeding to build with these constraints...]
════════════════════════════════════════════════════════════════════════════════
```

---

## Step 4: Static Anti-Pattern Detection

After dynamic generation, also load `anti-patterns.json` for additional patterns.

### Pattern Categories to Check

1. **UI Effects** - particles, glitch, scanlines, custom cursor, gradient mesh, blob morphing
2. **Colors** - neon pink-blue, gradient trendy, dark mode default, pastel everything
3. **Layouts** - hero generic, card grid, bento boxes, fullscreen sections, sticky everything
4. **Interactions** - parallax, scroll reveal, scroll hijacking, loading animations
5. **Typography** - acid distortion, brutalism helvetica, variable font tricks, giant headlines
6. **Components** - glassmorphism cards, neumorphism buttons, floating labels, rounded everything

---

## Step 5: Constraint Selection

Load `constraints.json` and select 2-4 creative constraints.

### Constraint Scoring System

Each constraint has a `score` attribute (0-100) based on:

```javascript
constraintScore = {
  creativity: 0-30,      // How unusual is this?
  difficulty: 0-25,      // How hard to implement?
  impact: 0-25,          // How much does it change the result?
  synergy: 0-20         // How well does it work with other constraints?
}
```

---

## Step 6: Schema Validation

Validate the enriched specification against JSON Schema before building.

### Validation Checks

- [ ] All required fields present
- [ ] Data types match schema
- [ ] Enum values valid
- [ ] Numeric ranges within bounds
- [ ] Arrays not empty where required
- [ ] No circular references

---

## Step 7: Teams Mode (NEW v3.0)

Teams mode uses Claude Code's **Agent Teams** for parallel multi-agent execution.

### Activation

```bash
# Enable experiment flag
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"

# Use teams mode
/ui --team "Full SaaS dashboard with billing and analytics"
```

### Team Composition

- **Orchestrator Agent** — Analyzes prompt, detects anti-patterns, selects constraints
- **Build Agent** — Creates the UI with anti-pattern validation
- **Adversarial Agent** (optional) — Challenges decisions and proposes alternatives
- **Reviewer Agent** (optional) — Validates accessibility and quality

### Benefits

- 2-3x faster than sequential execution
- Parallel work on different aspects
- Shared task list for coordination
- Direct inter-agent messaging

---

## Step 8: Build Mode

Use `--build` flag to skip orchestration and build directly from existing spec.

```bash
/ui --build "Rebuild from existing spec"
```

**When to use:**
- Enriched spec already exists in `.claude/.strike/`
- Rebuilding with different stack
- Iterating on constraints without re-analysis

---

## Options

| Flag | Description |
|------|-------------|
| `--step` | **NEW v3.1:** Interactive workflow - pause at each phase for user review |
| `--build` | Build from existing spec (skip orchestration) |
| `--team` | Teams mode for parallel multi-agent execution |
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
| `--feedback=<id>` | Include previous feedback in selection |
| `--no-challenge` | Skip adversarial challenge step (use with caution) |

---

## Step Mode Integration

When `--step` flag is used, the orchestrator:

1. **Pauses after each phase** - Analysis, Anti-patterns, Constraints, Spec
2. **Displays phase output** - Clear, formatted results
3. **Waits for user input** - Commands: continue, adjust, add, remove, replace, show, skip, cancel
4. **Tracks all adjustments** - Preserved in step-state.json
5. **Proceeds only on approval** - User types `continue` or `accept` to move forward

### Step Mode Commands

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

See `skills/step/SKILL.md` for complete step mode documentation.

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

---

## Best Practices

1. **Be honest about your prompt** - Don't game system by avoiding trigger words
2. **Embrace constraints** - They're not limitations, they're liberation
3. **Trust the process** - The weird ideas often become the best ideas
4. **Use teams for complex projects** - Enable teams mode for 2-3x speedup
5. **Iterate** - If the first result isn't right, run again with different constraints
6. **Learn from it** - Each constraint teaches you something about design

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

*UI Orchestrator v3.0 - Dynamic anti-pattern generation, teams mode, unified plugin*
