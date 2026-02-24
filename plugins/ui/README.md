---
name: ui
description: MANDATORY UI generation gate BEFORE creating interfaces. Orchestrates anti-trend methodology with Attractor-powered workflow orchestration (DOT graphs, checkpoints, events, parallel execution). Auto-detects trend-trap keywords → generates dynamic anti-patterns → selects creative constraints with scoring (creativity 30%, difficulty 25%, impact 25%, synergy 20%). Specific phrases: 'create UI', 'build interface', 'design dashboard', 'make website', 'generate layout'. 12+ flags: --step (interactive), --team (parallel agents), --build (from spec), --demo (lightweight), --analyze (preview), --constraints (preview), --full (verbose), --score (show scoring), --validate (schema only), --explain (diagrams), --learn (extract patterns). Integrates with design-taste-frontend patterns (100 forbidden patterns, accessibility-first, baseline dials: strength 7, creativity 8, difficulty 6, a11y 9).
argument-hint: "[--build|--team|--step|--analyze|--constraints|--full|--score|--validate|--explain|--learn|--demo|--stack=<react|vanilla>] '<prompt>'"
version: 4.1.0-1.6.0
---

# /ui - Anti-Trend UI Orchestrator v4.1

Transform generic UI prompts into unique, thoughtful interfaces by detecting **100 anti-patterns**, imposing **creative constraints** with scoring, and executing with **Attractor-powered workflow orchestration**.

**New in v4.1 (Quality Upgrade):**
- 🎯 **skill-check Integration** - MANDATORY/BEFORE language, specific triggers, method preview
- 🚫 **100 Anti-Patterns** - Comprehensive forbidden patterns database
- ⚙️ **Baseline Dials** - Configurable strength (7), creativity (8), difficulty (6), a11y (9)
- ✅ **Quality Gates** - Pre-flight checklist for validation
- 📚 **Modular Docs** - Skills split into references/ for token efficiency (+36%)

**New in v4.0:**
- 🎯 **DOT Workflow Orchestration** - Define workflows in Graphviz DOT syntax
- 💾 **Checkpoint & Resume** - Crash recovery and state persistence
- 📊 **Event Observability** - Track everything with typed events
- 👤 **Human-in-the-Loop** - Approval gates and interactive workflows
- 🚀 **Parallel Execution** - Concurrent branch processing with fan-in/fan-out

---

## ⚙️ Active Baseline Configuration

**Default Dials (adapt based on flags/context):**

| Dial | Default | Range | Purpose |
|------|---------|-------|---------|
| `ANTI_TREND_STRENGTH` | 7 | 1-10 | 1=Safe/Conventional, 10=Radical/Experimental |
| `CREATIVITY_TARGET` | 8 | 1-10 | 1=Follow trends, 10=Break all patterns |
| `CONSTRAINT_DIFFICULTY` | 6 | 1-10 | 1=Easy/Common, 10=Hard/Challenging |
| `ACCESSIBILITY_PRIORITY` | 9 | 1-10 | 1=Nice-to-have, 10=Mandatory/WCAG AA+ |

**Justification:**
- Strength 7: Balanced (not too safe, not too experimental)
- Creativity 8: Push boundaries while remaining usable
- Difficulty 6: Challenging but achievable
- A11y 9: Accessibility is non-negotiable

---

## 🚀 Quick Start

```bash
# Auto-detected (no flags)
/ui "create analytics dashboard"

# With specific flags
/ui --step "portfolio"           # Interactive workflow
/ui --team "SaaS platform"        # Parallel agent teams
/ui --build                        # Build from existing spec
/ui --demo "landing page"         # Lightweight mode
```

---

## 📖 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  1. ANALYZE       Scan for trend-trap keywords             │
│  2. GENERATE      Create NEW anti-patterns dynamically     │
│  3. DETECT        Load static anti-patterns database       │
│  4. SELECT        Score and choose 2-4 creative constraints│
│  5. VALIDATE      Schema validation (JSON)                │
│  6. BUILD         Anti-pattern validation during build    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚫 The 100 UI Anti-Patterns

**Visual & CSS (15):** NO Neon Glows, Pure Black, Oversaturated Accents, Gradient Text, Custom Cursors, Gradient Mesh, Glassmorphism Overuse, Blob Morphing, Scanlines, Glitch Text, Particle Canvas, Chrome Reflections, Drop Shadows Everywhere, Animated Gradients, Noise Textures

**Typography (10):** NO Inter Font, Oversized H1s, Serif on Dashboards, Variable Font Tricks, Acid Distortion, Brutalist Helvetica, Mixed Fonts, Tight Spacing, All Caps Body, Font <14px

**Layout & Spacing (15):** NO Generic Heroes, 3-Column Cards, Bento Overuse, Fullscreen Sections, Sticky Everything, Card Grids, Centered Only, Infinite White Space, Equal Padding, Horizontal Symmetry, 12-Column Always, Z-Index Spam, Floating Elements, Masonry Everywhere, 50/50 Default

**Content & Data (20):** NO Generic Names ("John Doe"), Fake Perfect Data, Startup Slop Names, Filler Words, Lorem Ipsum, Stock Models, Fake Avatars, Generic Testimonials, Placeholder Phones, Perfect Round Numbers, Generic Emails, "Contact Us" Only, "Coming Soon", Fake Signups, Fake Company Descriptions, Generic Features, "World's Leading", "Revolutionary", Fake Social Proof

**Components (20):** NO Glassmorphism Cards, Neumorphism Buttons, Floating Labels, Rounded Everything, Default shadcn/ui, Modals Without Escape, Toasts Too Fast, Loading Spinners, Toggle Overuse, Dropdowns for 2-3 Options, Autocomplete Without Confirm, Infinite Scroll, Carousel Single Item, Tooltip Hover Only, Disabled Without Reason, Password Without Toggle, Required Only, Placeholders as Labels, Mixed Case Acronyms, Default Selected

**Interactions (10):** NO Parallax Scrolling, Scroll Reveal, Scroll Hijacking, Hover Only, Loading Without Progress, Auto-Playing Videos, Mouse-Following, Page Transitions Without Skip, Drag Without Cue, Hidden Gestures

**External Resources (10):** NO Broken Unsplash, Generic Stock Photos, Images Without Alt, External Fonts Without Fallback, Large External Scripts, Multiple Icon Libraries, Subresource Integrity Missing, Google Fonts Without Display Swap, Emoji in Code, Emojis in UI Text

**See `skills/ui/references/anti-patterns-guide.md` for complete list.**

---

## 🎯 Flag System

| Flag | Effect | Use When |
|------|--------|----------|
| `--step` | Interactive human-in-the-loop | Learning, stakeholder approval |
| `--team` | Parallel multi-agent execution | Large, complex projects |
| `--build` | Build from existing spec | Rebuild, iterate |
| `--demo` | Lightweight mode | Quick iterations |
| `--analyze` | Preview analysis only | Understand detection |
| `--constraints` | Preview constraints only | Understand selection |
| `--full` | Verbose output | Maximum detail |
| `--score` | Show scoring breakdown | Learn selection logic |
| `--validate` | Schema validation only | Verify spec |
| `--explain` | Generate diagrams | Document decisions |
| `--learn` | Extract patterns | Build pattern library |
| `--stack=<react\|vanilla>` | Force tech stack | Override default |
| `--strict` | Enforce quality gates | Production-ready |
| `--resume` | Resume from checkpoint | Recover from crash |

---

## 📊 Decision Guide

```
Need to create UI?
├─ Simple interface? → /ui (no flags)
├─ Learning mode? → /ui --step
├─ Complex/large? → /ui --team
├─ Quick iteration? → /ui --demo
├─ From existing spec? → /ui --build
├─ Understand trends? → /ui --analyze
├─ See constraints? → /ui --constraints
├─ Maximum detail? → /ui --full
├─ Production quality? → /ui --strict
└─ Not sure? → /ui (auto-detect)
```

---

## ✅ Quality Gates

Before claiming "done":

### Universal
- [ ] Anti-patterns validated (100% compliance)
- [ ] Constraints applied (2-4 constraints)
- [ ] Accessibility passed (WCAG AA+)
- [ ] Build metrics generated

### Design
- [ ] No trend-trap patterns
- [ ] Unique aesthetic
- [ ] Consistent design language
- [ ] Proper visual hierarchy

### Code
- [ ] Clean semantic HTML
- [ ] No inline styles
- [ ] Proper component structure
- [ ] Performance optimized

---

## 🔗 Integration

**Requires:**
- **design-taste-frontend** - Senior UI/UX engineering patterns
- **skill-check** - Validate skill quality

**Complements:**
- **studio:build** - Implementation with quality gates
- **verification-before-completion** - Verify UI before done

---

## 📚 Extended Documentation

**Skills:**
- `skills/ui/SKILL.md` - Core orchestrator skill (450 lines)
- `skills/ui/references/attractor-workflows.md` - DOT orchestration guide
- `skills/ui/references/anti-patterns-guide.md` - 100 forbidden patterns
- `skills/ui/references/constraint-selection.md` - Constraint scoring guide
- `skills/ui/references/examples.md` - Real-world examples

**Sub-skills:**
- `skills/step/SKILL.md` - Interactive step mode
- `skills/teams/SKILL.md` - Parallel teams mode

---

## 🎯 Best Practices

1. **Use Step Mode to Learn** - `--step` teaches you the system
2. **Embrace Constraints** - They're liberation, not limitation
3. **Trust the Process** - Weird ideas become best ideas
4. **Use Teams for Complexity** - 2-3x speedup with `--team`
5. **Check Build Results** - Always review build-result.json
6. **Iterate with Checkpoints** - Resume with `--resume`
7. **Monitor Events** - Track progress in events.jsonl
8. **Optimize Costs** - Use `--demo` for quick iterations

---

## 📋 Output Structure

```
.claude/.strike/
├── analysis.md           # Keyword analysis
├── anti-patterns.md       # Patterns to avoid
├── constraints.md         # Selected constraints
├── enriched-spec.json    # Validated specification
├── enriched-spec.md       # Human-readable spec
├── step-state.json       # Step mode state
├── checkpoint.json        # Latest checkpoint
└── events.jsonl           # Event log

./output/
├── react-tailwind/        # React components
├── vanilla/               # Single-file HTML
└── build-result.json     # Metrics & validation
```

---

## 💡 Philosophy

**Why anti-patterns?**
Modern UI has converged on a narrow set of "safe" choices. When everything looks the same, nothing stands out.

**Why constraints?**
Limitations breed creativity. When you can't use gradients, you discover typography. When you design for print, you discover hierarchy.

**The goal:**
Push past the first obvious solution and find something that actually fits the content, users, and context.

---

## 🔧 Configuration

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
  },
  "attractor": {
    "enable_events": true,
    "enable_checkpoints": true,
    "auto_resume": true,
    "max_parallel_branches": 4
  }
}
```

---

*UI Orchestrator v4.1 - Quality-first with skill-check integration, 100 anti-patterns, baseline dials, comprehensive quality gates*
