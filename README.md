# smiteUI

> **Anti-trend UI generation with contextual orchestration**

Break patterns. Create unique. Build thoughtful interfaces.

## What is smiteUI?

smiteUI is a creative constraint system for Claude Code that prevents generic UI patterns. It works in two phases:

1. **Orchestrator** — Analyzes your prompt, detects anti-patterns, applies creative constraints
2. **Implementer** — Builds the UI from the enriched specification

## Why This Exists

Modern web design has converged on a narrow set of "safe" choices. Glassmorphism, card grids, neon gradients, parallax scrolling — they're not bad, they're everywhere.

When everything looks the same, nothing stands out.

The orchestrator is a guard against the obvious. It doesn't just build what you ask — it builds what you **should have asked for if you wanted something unique.**

## Features

### Orchestrator (`/ui`)

- **Anti-pattern detection** — 40+ patterns to avoid (particles, glitch, neon...)
- **Creative constraints** — 25+ constraint types (monochrome, ASCII, print-first...)
- **Context-aware selection** — Constraints that fit the project, not random
- **Prompt enrichment** — Transforms generic requests into specific briefs

### Implementer (`/build`)

- **Two stacks** — React/Tailwind for production, Vanilla for prototypes
- **Anti-pattern validation** — Checks implementation against blacklist
- **Constraint compliance** — Ensures all creative boundaries are respected
- **Template-driven** — Consistent structure, clean output

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

## Constraint Library

Categories with difficulty levels:

| Category | Constraint Types | Difficulty |
|----------|-----------------|------------|
| Color Restrictions | Monochrome, single accent, warm only, paper & ink, inverted contrast | Easy-Medium |
| Interaction Sources | Architectural, biological, musical, mechanical, textual | Medium-Hard |
| Technical Constraints | CSS only, system fonts only, no images, single file, no animations, ASCII art | Easy-Hard |
| Context Shifts | Print first, screen reader first, outdoor visible, slow connection, low energy | Medium-Hard |

See full library: `plugins/orchestrator/data/constraints.json`

## Usage

### In Claude Code

```bash
# Full UI generation
/ui "Create a modern dashboard"

# Just analyze prompt
/ui --analyze "Sleek portfolio"

# Show constraints to apply
/ui --constraints "Product page"

# Build from enriched spec
/build
```

### Output

After `/ui` runs, it creates in `.smiteUI/`:

| File | Content |
|------|---------|
| `analysis.md` | Prompt risk assessment |
| `anti-patterns.md` | Detected patterns to avoid |
| `constraints.md` | Selected constraints with rationale |
| `enriched-spec.md` | Full brief for implementer |

After `/build` runs, it creates:

| Path | Stack | Content |
|------|-------|---------|
| `./output/` | React/Tailwind | Component-based production app |
| `./output/index.html` | Vanilla | Single-file instant prototype |

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
- Paper & ink (off-white background, dark text)
- Architectural (room-based navigation)
- Print first

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
- ASCII art only
- System fonts only
- Single file
- No images

**Result:** A portfolio that looks like a beautifully formatted README, loads instantly, and actually showcases code thinking rather than hiding behind flashy effects.

## Philosophy

**Why anti-patterns?**
Modern UI has converged on a narrow set of "safe" choices. When everything looks the same, nothing stands out.

**Why constraints?**
Limitations breed creativity. When you can't use gradients, you discover the power of typography. When you can't use images, you learn what CSS can really do. When you design for print, you discover true hierarchy.

**The goal:**
Not to be contrarian for its own sake, but to push past the first obvious solution and find something that actually fits the content, the users, and the context.

## Installation

This is a Claude Code marketplace plugin. Install it via Claude Code's marketplace system:

```bash
# In Claude Code, open the marketplace
# Search for "smiteUI"
# Click install
```

Or manually add to `.claude/plugins/`:

```bash
git clone https://github.com/Pamacea/smiteUI ~/.claude/plugins/smiteUI
```

## Configuration

Settings in `.smiteUI/config.json`:

```json
{
  "orchestrator": {
    "min_constraints": 2,
    "max_constraints": 4,
    "strict_mode": false,
    "always_include": ["color_restrictions"],
    "prefer_categories": ["technical_constraints"],
    "anti_pattern_severity_threshold": "medium"
  }
}
```

## Documentation

- [CLAUDE.md](CLAUDE.md) — Quick reference for users
- [plugins/orchestrator/README.md](plugins/orchestrator/README.md) — Orchestrator documentation
- [plugins/implementer/commands/build.md](plugins/implementer/commands/build.md) — Implementer usage

## License

MIT — See [LICENSE](LICENSE) for details.

---

*Version*: 1.0.0 | *Author*: Pamacea | *Repository*: https://github.com/Pamacea/smiteUI
