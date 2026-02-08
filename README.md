# Strike v2.3

> **Anti-trend UI generation with parallel orchestration, dynamic pattern detection, demo mode, and visual flag feedback**

Break patterns. Create unique. Build thoughtful interfaces. Fast iterations when needed.

---

## What is strike?

strike is a creative constraint system for Claude Code that prevents generic UI patterns. It works in **two phases** with **optional parallel execution**:

1. **Orchestrator** — Analyzes prompts, detects anti-patterns (dynamic + static), applies creative constraints, displays Red/Green flag table
2. **Implementer** — Builds the UI from the enriched specification

**New in v2.3:**
- **Parallel mode (`--parallel`)** — Orchestrator analysis and Implementer preparation run simultaneously (8-17% faster)

**v2.2 features:**
- **Dynamic anti-pattern generation** — Creates NEW patterns from semantic keywords (futuriste, nuageux, mélancolique...)
- **Demo mode (`--demo`)** — Lightweight v1-style workflow for fast iterations, fewer tokens
- **Red/Green flag table** — Visual feedback showing patterns to avoid (🔴) and constraints applied (🟢)

**v2.1 features:** Adversarial challenge, teaching explanations, auto-learning.

---

## Why This Exists

Modern web design has converged on a narrow set of "safe" choices. Glassmorphism, card grids, neon gradients, parallax scrolling — they're not bad, they're everywhere.

When everything looks the same, nothing stands out.

The orchestrator is a guard against the obvious. It doesn't just build what you ask — it builds what you **should have asked for if you wanted something unique.**

---

## Features

### Orchestrator (`/ui` - Enhanced in v2.1)

- **Anti-pattern detection** — 40+ patterns to avoid (particles, glitch, neon...)
- **Creative constraints** — 25+ constraint types (monochrome, ASCII, print-first...)
- **Context-aware selection** — Constraints that fit the project, not random
- **Prompt enrichment** — Transforms generic requests into specific briefs
- **Schema validation** — JSON Schema validation for specifications
- **Constraint scoring** — Creativity, difficulty, impact, synergy scores
- **Adversarial mode** — Always-active challenge of its own decisions (NEW)
- **Teaching mode** — Generates diagrams and explanations (NEW)
- **Auto-learning** — Extracts patterns from sessions (NEW)

### Implementer (`/build`)

- **Two stacks** — React/Tailwind for production, Vanilla for prototypes
- **Anti-pattern validation** — Checks implementation against blacklist
- **Constraint compliance** — Ensures all creative boundaries are respected
- **Template-driven** — Consistent structure, clean output
- **Component registry** — Validated components with alternatives
- **Build metrics** — Bundle size, compliance scores, timing
- **Accessibility-first** — WCAG compliance, semantic HTML, keyboard navigation

---

## What's New in v2.3

| Feature | Description |
|---------|-------------|
| **Parallel Mode** | `--parallel` flag runs Orchestrator + Implementer simultaneously (8-17% faster) |
| **Shared State Protocol** | `.claude/.strike/parallel-state.json` for agent coordination |
| **Coordination Phase** | Merges orchestrator output with implementer preparation |

## What's New in v2.2

| Feature | Description |
|---------|-------------|
| **Dynamic Anti-Patterns** | Generates NEW patterns from semantic keywords, not just static DB |
| **Demo Mode** | `--demo` flag for lightweight v1-style workflow (faster, fewer tokens) |
| **Red/Green Flag Table** | Visual feedback displayed by default (🔴 avoid, 🟢 apply) |
| **Subfolder Output** | `output/react-tailwind/` and `output/vanilla/` for cleaner builds |
| **No README in Output** | Documentation in `.claude/.strike/` and `build-result.json` only |

## What's New in v2.1

| Feature | Description |
|---------|-------------|
| **Integrated Adversarial** | Always-active challenge mode debates and stress-tests decisions |
| **Integrated Teaching** | `--explain` flag generates diagrams and explanations |
| **Integrated Learning** | `--learn` flag extracts patterns from sessions |
| **Boris Cherny Patterns** | Multi-agent workflow within single orchestrator |
| **No Separate Plugins** | All features unified into orchestrator/implementer |

## What's New in v2.0

| Feature | Description |
|---------|-------------|
| **Schema Validation** | JSON schemas for specs and build results |
| **Constraint Scoring** | Creativity, difficulty, impact, synergy (0-100) |
| **Component Registry** | Validated components with anti-pattern alternatives |
| **Accessibility Checklist** | 30+ checks across 8 categories |
| **Build Metrics** | Bundle size, compliance scores, timing |

---

## Usage

### In Claude Code

```bash
# ===== ORCHESTRATOR =====
# Full UI generation with deep analysis
/ui "Create a modern dashboard"

# Parallel mode - Orchestrator + Implementer run together (NEW v2.3)
/ui --parallel "Create a modern dashboard"

# Demo mode - lightweight, fast, fewer tokens
/ui --demo "Quick portfolio"

# Just analyze prompt
/ui --analyze "Sleek portfolio"

# Show constraints to apply
/ui --constraints "Product page"

# ===== IMPLEMENTER =====
# Build from enriched spec
/build
```

**Red/Green Flag Table** (shown by default in all modes):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🔴 RED FLAGS - Patterns to AVOID                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  ❌ card_grid                 Every dashboard does this                     │
│  ❌ glassmorphism_cards       Overused since 2022                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  🟢 GREEN FLAGS - Selected Constraints                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ paper_and_ink             Crisp print aesthetic                        │
│  ✅ architectural             Spatial, grounded structure                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Output Files

After `/ui` runs, it creates in `.claude/.strike/`:

| File | Content |
|------|---------|
| `analysis.md` | Prompt risk assessment |
| `anti-patterns.md` | Detected patterns to avoid |
| `constraints.md` | Selected constraints with scores |
| `enriched-spec.md` | Full brief for implementer |
| `enriched-spec.json` | Validated JSON specification |

After `/build` runs, it creates in `./output/`:

| Path | Stack | Content |
|------|-------|---------|
| `./output/react-tailwind/` | React/Tailwind | Component-based production app |
| `./output/vanilla/` | Vanilla | Single-file instant prototype |
| `./output/build-result.json` | Both | Metrics and validation |

**Note:** No README in output/ - documentation stays in `.claude/.strike/`. Images folder created only if needed.

---

## Anti-Patterns Database

Categories with severity levels:

| Category | Patterns | Severity |
|----------|----------|----------|
| UI Effects | Particles, glitch, scanlines, custom cursor, gradient mesh, blob morphing | High |
| Colors | Neon pink-blue, trendy gradients, dark-mode default, pastel everything | Medium |
| Layouts | Generic hero, card grids, bento boxes, fullscreen sections, sticky everything | High |
| Interactions | Parallax, scroll reveal, scroll hijack, loading animations | High |
| Typography | Acid distortion, brutalism helvetica, variable font tricks, giant headlines | Medium |
| Components | Glassmorphism, neumorphism, floating labels, rounded everything, icon overload | High |

See full database: `plugins/orchestrator/data/anti-patterns.json`

---

## Constraint Library

Categories with difficulty levels:

| Category | Constraint Types | Difficulty |
|----------|-----------------|------------|
| Color Restrictions | Monochrome, single accent, warm only, paper & ink, inverted contrast | Easy-Medium |
| Interaction Sources | Architectural, biological, musical, mechanical, textual | Medium-Hard |
| Technical Constraints | CSS only, system fonts only, no images, single file, no animations, ASCII art | Easy-Hard |
| Context Shifts | Print first, screen reader first, outdoor visible, slow connection, low energy | Medium-Hard |
| Structural Constraints | Linear only, no headings, infinite scroll, component isolation, max width extreme | Easy-Hard |

See full library: `plugins/orchestrator/data/constraints.json`

---

## Examples

### Example 1: "Modern analytics dashboard"

**Analysis:**
- "Modern" → High risk (trendy colors, glassmorphism)
- "Dashboard" → High risk (card grids, generic hero)
- "Analytics" → Medium risk (charts, data viz)

**Detected Anti-Patterns:**
- Card grid layout
- Glassmorphism cards
- Dark theme with neon accents
- Hover animations everywhere

**Applied Constraints:**
- Paper & ink (off-white background, dark text) — score: 35
- Architectural (room-based navigation) — score: 78
- Print first — score: 72

**Result:** A dashboard that uses white space as architecture, numbers as typography, and feels like a well-designed annual report rather than another SaaS tool.

### Example 2: "Sleek portfolio"

**Analysis:**
- "Sleek" → High risk (gradients, dark mode, smooth animations)
- "Portfolio" → Medium risk (parallax, gallery grid, large images)

**Detected Anti-Patterns:**
- Parallax scrolling
- Hero section with large image
- Smooth scroll hijacking
- Gradient mesh backgrounds

**Applied Constraints:**
- ASCII art only — score: 65
- System fonts only — score: 22
- Single file — score: 18

**Result:** A portfolio that looks like a beautifully formatted README, loads instantly, and actually showcases code thinking rather than hiding behind flashy effects.

---

## Philosophy

**Why anti-patterns?**
Modern UI has converged on a narrow set of "safe" choices. When everything looks the same, nothing stands out.

**Why constraints?**
Limitations breed creativity. When you can't use gradients, you discover the power of typography. When you can't use images, you learn what CSS can really do. When you design for print, you discover true hierarchy.

**The goal:**
Not to be contrarian for its own sake, but to push past the first obvious solution and find something that actually fits the content, the users, and the context.

---

## Configuration

Settings in `.claude/.strike/config.json`:

```json
{
  "orchestrator": {
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

## Documentation

- [CLAUDE.md](CLAUDE.md) — Quick reference for users
- [plugins/orchestrator/README.md](plugins/orchestrator/README.md) — Orchestrator documentation
- [plugins/implementer/README.md](plugins/implementer/README.md) — Implementer documentation
- [plugins/orchestrator/data/schemas/](plugins/orchestrator/data/schemas/) — JSON schemas
- [plugins/implementer/data/component-registry.json](plugins/implementer/data/component-registry.json) — Component registry
- [plugins/implementer/data/accessibility-checklist.json](plugins/implementer/data/accessibility-checklist.json) — A11y checklist

---

## Installation

This is a Claude Code marketplace plugin. Install it via Claude Code's marketplace system:

```bash
# In Claude Code, open the marketplace
# Search for "strike"
# Click install
```

Or manually add to `.claude/plugins/`:

```bash
git clone https://github.com/Pamacea/strike ~/.claude/plugins/strike
```

---

## License

MIT — See [LICENSE](LICENSE) for details.

---

*Version*: 2.3.0 | *Author*: Pamacea | *Repository*: https://github.com/Pamacea/strike
