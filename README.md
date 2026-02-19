# Strike v1.5.0

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/v/release/Pamacea/strike)](https://github.com/Pamacea/strike/releases/latest)
[![CI](https://github.com/Pamacea/strike/actions/workflows/ci.yml/badge.svg)](https://github.com/Pamacea/strike/actions)
[![Attractor](https://img.shields.io/badge/Powered%20By-Attractor-blue.svg)](https://github.com/strongdm/attractor)

> **Creative Constraint Marketplace & UI Generation - Anti-trend UI with patterns, constraints, and workflows**

Break patterns. Create unique. Build thoughtful interfaces. Iterate instantly.

---

## What is Strike?

**Strike** is a creative constraint system for Claude Code that prevents generic UI patterns. It combines:

1. **Marketplace** — Browse and install UI patterns, constraints, and workflows
2. **Orchestrator** — Analyzes prompts, detects anti-patterns, applies creative constraints
3. **Implementer** — Builds the UI from enriched specification
4. **Attractor Engine** — DOT-based workflow orchestration with events, checkpoints, and resilience

**New in v1.5.0 - Marketplace Edition:**
- 🛒 **Marketplace** — 10+ patterns, 15+ constraints, 5+ workflows
- 🔍 **CLI Tools** — Browse, search, and install marketplace items
- 📊 **Validation** — Schema validation for all marketplace items
- 🤝 **Community** — Contribution guidelines and quality gates

---

## Why Strike Exists?

Modern web design has converged on a narrow set of "safe" choices. Glassmorphism, card grids, neon gradients, parallax scrolling — they're not bad, they're **everywhere**.

**Strike is the guard against the obvious.** It doesn't just build what you ask — it builds what you **should have asked for** if you wanted something unique.

---

## 🚀 Key Features

### Marketplace

- **10+ UI Patterns** — Typography hierarchy, brutalist grid, asymmetric rhythm, print-first, etc.
- **15+ Constraints** — Paper & ink, architectural, biological, CSS only, ASCII art, etc.
- **5+ Workflows** — Quick sequential, with approval, parallel exploration, adaptive retry, teaching mode
- **CLI Tools** — `strike install`, `strike list`, `strike search`, `strike info`
- **Schema Validation** — JSON Schema validation for all items

### Orchestrator (`/ui`)

- **Anti-pattern detection** — 40+ static patterns detected
- **Creative constraints** — 15+ constraints with scoring (creativity, difficulty, impact, synergy)
- **DOT workflows** — Pre-built or custom workflows
- **Checkpoint & resume** — Crash recovery
- **Teams mode** — Parallel multi-agent execution (2-3x faster)

### Implementer (`/build`)

- **Two stacks** — React/Tailwind (production) or Vanilla (prototype)
- **Anti-pattern validation** — Checks implementation against blacklist
- **Accessibility-first** — WCAG AA compliance
- **Build metrics** — Bundle size, compliance scores, timing

---

## Usage

### Marketplace Commands

```bash
# List all items
/ui --list patterns
/ui --list constraints
/ui --list workflows

# Search
/ui --search patterns typography
/ui --search constraints print

# Get details
/ui --info pattern typography-hierarchy

# Install and use
/ui "Create a dashboard with typography-hierarchy pattern"
```

### Basic UI Generation

```bash
# Full workflow
/ui "Create a modern SaaS dashboard"

# Demo mode (fast)
/ui --demo "Quick portfolio site"

# Teams mode (2-3x faster)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"
/ui --team "E-commerce platform"
```

### Workflow Mode

```bash
# Resume from checkpoint
/ui --resume

# Use pre-built workflow
/ui --workflow=quick-sequential "Create a button"
/ui --workflow=with-approval "Create a dashboard"
/ui --workflow=parallel-exploration "Create a landing page"

# Interactive with approval
/ui --step "Complex application"
```

---

## Marketplace Items

### UI Patterns (10 items)

| Pattern | Score | Description |
|---------|-------|-------------|
| `typography-hierarchy` | 70/100 | Typography-only visual hierarchy |
| `single-column-focus` | 45/100 | Strict single-column, max-width |
| `brutalist-grid` | 79/100 | Visible grid lines, raw borders |
| `asymmetric-rhythm` | 91/100 | Asymmetric layouts |
| `vertical-rhythm` | 49/100 | Strict baseline grid |
| `monochrome-complex` | 64/100 | Single hue with variations |
| `system-symbols` | 54/100 | Unicode only, no icons |
| `print-first` | 74/100 | Design for print output |
| `raw-html` | 56/100 | Semantic HTML only |
| `micro-interactions-only` | 41/100 | Essential feedback only |

### Constraints (15 items)

| Constraint | Score | Description |
|------------|-------|-------------|
| `paper-ink` | 43/100 | Off-white with dark text |
| `monochrome-true` | 60/100 | Single hue only |
| `architectural` | 85/100 | UI as physical space |
| `biological` | 94/100 | Growth patterns, organic |
| `musical-structure` | 90/100 | Rhythm and harmony |
| `mechanical` | 78/100 | Switches, levers, dials |
| `css-only` | 62/100 | No JavaScript for UI |
| `system-fonts-only` | 33/100 | System font stack |
| `no-images` | 75/100 | CSS shapes and text |
| `single-file` | 46/100 | One HTML file |
| `ascii-art-only` | 82/100 | Text characters only |
| `screen-reader-first` | 67/100 | A11y as primary |
| `outdoor-visible` | 48/100 | High contrast |
| `linear-only` | 51/100 | No branching |
| `max-width-extreme` | 68/100 | Extreme width limits |

### Workflows (5 items)

| Workflow | Time | Description |
|----------|------|-------------|
| `quick-sequential` | 5-10 min | Fast, no approval |
| `with-approval` | 15-20 min | Interactive workshop |
| `parallel-exploration` | 20-30 min | Multiple directions |
| `adaptive-retry` | 15-25 min | Quality with retry |
| `teaching-mode` | 20-30 min | Educational |

---

## Installation

Via Claude Code marketplace:

```bash
# Search for "strike" and click install
```

Manual installation:

```bash
git clone https://github.com/Pamacea/strike ~/.claude/plugins/strike
```

---

## Documentation

- [CLAUDE.md](CLAUDE.md) — Quick reference
- [CHANGELOG.md](CHANGELOG.md) — Version history
- [CONTRIBUTING.md](CONTRIBUTING.md) — Contribution guidelines
- [plugins/ui/data/attractor/ATTRACTOR-INTEGRATION.md](plugins/ui/data/attractor/ATTRACTOR-INTEGRATION.md) — Attractor API guide

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md).

**What we accept:**
- New UI patterns with scoring
- Creative constraints
- Pre-built DOT workflows
- Bug fixes and documentation

---

## License

MIT — See [LICENSE](LICENSE) for details.

---

*Version*: 1.5.0 | *Author*: Pamacea | *Repository*: https://github.com/Pamacea/strike

**Powered by [Attractor](https://github.com/strongdm/attractor)**
