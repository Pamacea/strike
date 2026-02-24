# Strike v1.7.0

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/v/release/Pamacea/strike)](https://github.com/Pamacea/strike/releases/latest)
[![CI](https://github.com/Pamacea/strike/actions/workflows/ci.yml/badge.svg)](https://github.com/Pamacea/strike/actions)
[![Attractor](https://img.shields.io/badge/Powered%20By-Attractor-blue.svg)](https://github.com/strongdm/attractor)
[![Quality Gates](https://img.shields.io/badge/Quality-Skill%20Check%20Integrated-green.svg)](https://github.com/spm1001/claude-suite)

> **Creative Constraint Marketplace, UI Generation & Session Content Generation - Anti-trend UI with patterns, constraints, workflows, and automatic content extraction**

Break patterns. Create unique. Build thoughtful interfaces. Iterate instantly. Document everything.

---

## What is Strike?

**Strike** is a creative constraint system for Claude Code that prevents generic UI patterns and automatically generates session content. It combines:

1. **Marketplace** — Browse and install UI patterns, constraints, and workflows
2. **Orchestrator** — Analyzes prompts, detects anti-patterns, applies creative constraints
3. **Implementer** — Builds the UI from enriched specification
4. **EXG Plugin** — Generates conversation summaries, script theater, and social posts at session end
5. **Attractor Engine** — DOT-based workflow orchestration with events, checkpoints, and resilience

**New in v1.7.0 - EXG Plugin (Session Content Generation):**
- 📝 **Automatic Content Generation** - Session-end hook creates 3 outputs
- 🎭 **Script Theater** - Dialogue format for video content creation
- 📱 **Social Posts** - Platform-ready posts (LinkedIn, Twitter, blog)
- 🎨 **4 Style Profiles** - Technical, storytelling, educational, opinion
- 🚫 **40+ Anti-Patterns** - Content quality validation
- ✅ **Quality Gates** - Comprehensive validation before output

**New in v1.6.0 - Quality Skills Upgrade:**
- 🎯 **skill-check Integration** - MANDATORY/BEFORE language, specific triggers
- 📊 **Baseline Configuration** - 4 dials per skill (strength 7, creativity 8, difficulty 6, a11y 9)
- 🚫 **100 Anti-Patterns** - Comprehensive forbidden patterns database
- ✅ **Quality Gates** - Pre-flight checklists for validation
- 📚 **Modular Docs** - Token-efficient references/ structure

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

### Quality Framework (v1.6.0+)

- **skill-check Integration** - MANDATORY gates, trigger phrases, method preview
- **100 Anti-Patterns** - Comprehensive forbidden patterns (Visual, Typography, Layout, Content, Components, Interactions, Resources)
- **Baseline Dials** - Configurable strength, creativity, difficulty, accessibility
- **Quality Gates** - Pre-flight validation, anti-pattern compliance, WCAG AA+
- **Step Mode** - Interactive workshop (USER_CONTROL: 9, LEARNING_MODE: 8)
- **Teams Mode** - Parallel execution (TEAM_SIZE: 4, 1.6x-1.85x faster)

### Marketplace (v1.5.0+)

- **10+ UI Patterns** — Typography hierarchy, brutalist grid, asymmetric rhythm, print-first, etc.
- **15+ Constraints** — Paper & ink, architectural, biological, CSS only, ASCII art, etc.
- **5+ Workflows** — Quick sequential, with approval, parallel exploration, adaptive retry, teaching mode
- **CLI Tools** — `strike install`, `strike list`, `strike search`, `strike info`
- **Schema Validation** — JSON Schema validation for all items

### Orchestrator (`/ui`)

- **Anti-pattern detection** — 100 static patterns + dynamic generation
- **Creative constraints** — 15+ constraints with scoring (creativity 30%, difficulty 25%, impact 25%, synergy 20%)
- **DOT workflows** — Pre-built or custom workflows
- **Checkpoint & resume** — Crash recovery
- **Teams mode** — Parallel multi-agent execution (1.6x-1.85x faster)

### Implementer (`/build`)

- **Two stacks** — React/Tailwind (production) or Vanilla (prototype)
- **Anti-pattern validation** — Checks implementation against blacklist
- **Accessibility-first** — WCAG AA compliance
- **Build metrics** — Bundle size, compliance scores, timing

---

## Usage

### Quality Mode (v1.6.0+)

```bash
# Interactive workshop (learning, stakeholder approval)
/ui --step "Complex dashboard"
# → USER_CONTROL: 9, LEARNING_MODE: 8, pauses at each phase

# Parallel execution (complex, large projects)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"
/ui --team "Enterprise SaaS platform"
# → TEAM_SIZE: 4, 1.85x faster than sequential

# Full quality with dials customization
ANTI_TREND_STRENGTH=9 CREATIVITY_TARGET=8 /ui "Bold experimental design"
```

### Marketplace Commands (v1.5.0+)

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
# Full workflow with 100 anti-patterns + quality gates
/ui "Create a modern SaaS dashboard"

# Demo mode (fast)
/ui --demo "Quick portfolio site"

# Resume from checkpoint
/ui --resume

# Use pre-built workflow
/ui --workflow=quick-sequential "Create a button"
/ui --workflow=with-approval "Create a dashboard"
/ui --workflow=parallel-exploration "Create a landing page"
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

- [CLAUDE.md](CLAUDE.md) — Quick reference (v1.6.0)
- [CHANGELOG.md](CHANGELOG.md) — Version history
- [CONTRIBUTING.md](CONTRIBUTING.md) — Contribution guidelines
- [GOVERNANCE.md](GOVERNANCE.md) — Quality standards (v1.6.0)
- [plugins/ui/skills/ui/SKILL.md](plugins/ui/skills/ui/SKILL.md) — Core orchestrator (v4.1)
- [plugins/ui/skills/step/SKILL.md](plugins/ui/skills/step/SKILL.md) — Step mode (v4.1)
- [plugins/ui/skills/teams/SKILL.md](plugins/ui/skills/teams/SKILL.md) — Teams mode (v4.1)
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

*Version*: 1.6.0 | *Author*: Pamacea | *Repository*: https://github.com/Pamacea/strike

**Powered by [Attractor](https://github.com/strongdm/attractor)**
