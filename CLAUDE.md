# 🚀 SMITEUI v2.0 — Quick Reference

## 🎯 I'm here to...

- **Generate unique UIs**: `/ui "prompt"` — Orchestrator applies constraints, then implements
- **Build from specs**: `/build` — Takes enriched spec and creates UI
- **Validate specs**: `/ui --validate "prompt"` — Schema validation only (NEW)
- **Score constraints**: `/ui --score "prompt"` — See constraint scoring details (NEW)

---

## 🔍 Core Workflow

**CRITICAL: ALWAYS run through orchestrator first.**

1. **ALWAYS** use `/ui "prompt"` for new UI requests
2. **NEVER** jump straight to implementation without constraint analysis
3. **Anti-patterns are automatically detected** and enforced
4. **Constraints are scored** by creativity, difficulty, impact, synergy (NEW)
5. **Specs are schema-validated** before implementation (NEW)

**Why?** Direct implementation → generic, trend-following UIs. Orchestrator → unique, thoughtful interfaces.

---

## 🛠️ Quick Commands

| Command | Purpose | When to use |
|---------|---------|-------------|
| `/ui "prompt"` | Full UI generation with anti-pattern analysis | New UI projects, landing pages, dashboards |
| `/ui --analyze "prompt"` | Just analyze, don't build | Understanding what would be detected |
| `/ui --constraints "prompt"` | Show constraints to apply | Review before building |
| `/ui --score "prompt"` | Show constraint scoring details | See creativity/difficulty scores (NEW) |
| `/ui --validate "prompt"` | Validate spec only, don't build | Schema validation check (NEW) |
| `/ui --feedback=<id> "prompt"` | Include previous build feedback | Iterative improvements (NEW) |
| `/build` | Implement from enriched spec | After orchestrator runs |

---

## 📚 Documentation

- **Marketplace**: `.claude-plugin/marketplace.json`
- **Orchestrator**: `plugins/orchestrator/README.md`
- **Implementer**: `plugins/implementer/README.md`
- **Schemas**: `plugins/orchestrator/data/schemas/` (NEW)
- **Component Registry**: `plugins/implementer/data/component-registry.json` (NEW)
- **A11y Checklist**: `plugins/implementer/data/accessibility-checklist.json` (NEW)

---

## 🛡️ Anti-Patterns Library

The orchestrator has a comprehensive database of patterns to avoid:

### UI Effects
- ❌ Particles canvas
- ❌ Glitch text
- ❌ Scanlines
- ❌ Custom cursor
- ❌ Gradient mesh
- ❌ Blob morphing

### Colors
- ❌ Neon pink-blue
- ❌ Trendy gradients
- ❌ Dark-mode-by-default
- ❌ Pastel everything

### Layouts
- ❌ Generic hero sections
- ❌ Card grids
- ❌ Bento boxes
- ❌ Fullscreen sections
- ❌ Sticky everything

### Interactions
- ❌ Parallax scrolling
- ❌ Scroll reveal
- ❌ Hover effects classic
- ❌ Scroll hijacking
- ❌ Loading animations

### Typography
- ❌ Acid distortion
- ❌ Brutalism helvetica
- ❌ Variable font tricks
- ❌ Giant headlines
- ❌ Gradient text

### Components
- ❌ Glassmorphism cards
- ❌ Neumorphism buttons
- ❌ Floating labels
- ❌ Rounded everything
- ❌ Icon overload

See full database: `plugins/orchestrator/data/anti-patterns.json`

---

## 🎭 Constraint Library

The orchestrator selects from creative constraint categories:

### Color Restrictions
- Monochrome true
- Single accent
- Warm only
- Paper & ink
- Inverted high contrast

### Interaction Sources
- Architectural
- Biological
- Musical structure
- Mechanical
- Textual first

### Technical Constraints
- CSS only
- System fonts only
- No images
- Single file
- No animations
- ASCII art only

### Context Shifts
- Print first
- Screen reader first
- Outdoor visible
- Slow connection
- Low energy

### Structural Constraints (NEW)
- Linear only
- No headings
- Infinite scroll
- Component isolation
- Max width extreme

See full library: `plugins/orchestrator/data/constraints.json`

---

## 📊 Constraint Scoring (NEW v2.0)

Each constraint is scored (0-100) on:

```
constraintScore = {
  creativity: 0-30,      // How unusual is this?
  difficulty: 0-25,      // How hard to implement?
  impact: 0-25,          // How much does it change the result?
  synergy: 0-20         // How well does it work with other constraints?
}
```

Example scores:
- Paper & ink: 35 (easy, low creativity)
- Architectural: 78 (hard, high creativity)
- ASCII art: 65 (medium, medium creativity)

---

## 📂 Generated Output

When you run `/ui`, it creates in `.claude/.smiteUI/`:

| File | Purpose |
|------|---------|
| `analysis.md` | Prompt analysis with risk assessment |
| `anti-patterns.md` | Detected patterns to avoid |
| `constraints.md` | Selected constraints with scores (NEW) |
| `enriched-spec.md` | Full specification for implementer |
| `enriched-spec.json` | Validated JSON specification (NEW) |

Then `/build` creates:

| Output | Stack | Purpose |
|--------|-------|---------|
| `./output/` | React/Tailwind | Component-based production app |
| `./output/index.html` | Vanilla | Single-file instant prototype |
| `./output/build-result.json` | Both | Metrics and validation (NEW) |

---

## 🧩 Component Registry (NEW v2.0)

Reference `plugins/implementer/data/component-registry.json` for validated components.

### Safe Components (All Constraints)
- Container — Responsive container
- Stack — Vertical stack with gap
- Room — Architectural spatial sections
- Heading — Semantic heading
- Body — Body text
- Button — Standard button
- Input — Text input with static label
- Label — Static label (not floating)

### Use With Caution (Has Anti-Pattern Risk)
- Grid → Use Stack or Room instead
- DisplayHeading → Use Heading with size instead
- Card → Use SolidCard or Section instead

---

## ♿ Accessibility (NEW v2.0)

All builds must pass the accessibility checklist:

### Critical Checks
- [ ] Semantic HTML (nav, main, article, section)
- [ ] Keyboard navigation (tab order, focus visible)
- [ ] ARIA attributes (labels, live regions)
- [ ] Color contrast (WCAG AA: 4.5:1 for text)
- [ ] Forms (labels associated, errors announced)

See full checklist: `plugins/implementer/data/accessibility-checklist.json`

---

## 🎯 Key Principles

- **Anti-trend first**: Generic is the enemy
- **Constraints guide, don't limit**: Find creative solutions within boundaries
- **Accessibility first**: If it's not accessible, it's not done (NEW)
- **Schema-validated communication**: Specs validated before delegation (NEW)
- **Metrics-driven**: Measure compliance, bundle size, a11y scores (NEW)
- **Context matters**: A constraint that works for one project may fail for another
- **Document decisions**: Explain why you made choices, especially constraint violations

---

## 🏗️ Project Standards

### React/Tailwind
```
src/
├── components/
│   ├── ui/           # Atomic components (Button, Input, Card...)
│   ├── layout/        # Layout (Header, Footer, Container...)
│   └── features/      # Feature-specific components
├── hooks/             # Custom React hooks
├── utils/             # Utilities (cn helper, formatDate...)
├── App.tsx            # Root component
└── index.tsx           # Entry point
```

### Vanilla
```
index.html              # Self-contained, all CSS/JS inline
```

---

## 🔧 Configuration

Settings in `.claude/.smiteUI/config.json`:

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

## 💡 Best Practices

1. **Use `/ui` for new requests** — Always go through orchestrator
2. **Read the enriched spec** — Don't skip constraint analysis
3. **Check component registry** — Use validated components (NEW)
4. **Validate your plan** — Check against anti-pattern blacklist
5. **Plan accessibility from start** — Not an afterthought (NEW)
6. **Choose the right template** — React/Tailwind for apps, Vanilla for demos
7. **Document your choices** — README should explain constraints and decisions
8. **Include build metrics** — build-result.json required (NEW)

---

## 🚫 What Not To Do

- ❌ Don't skip orchestrator for "faster" results — You'll get generic UI
- ❌ Don't ignore constraints — They're not optional guidelines
- ❌ Don't use "trendy" templates from the internet — Orchestrator detects them as anti-patterns
- ❌ Don't assume constraints are "too limiting" — They're liberation, not restriction
- ❌ Don't skip accessibility — It's mandatory in v2.0 (NEW)
- ❌ Don't skip metrics — build-result.json is required (NEW)

---

## 🆕 What's New in v2.0

| Feature | Description |
|---------|-------------|
| **Schema Validation** | JSON schemas for specs and build results |
| **Constraint Scoring** | Creativity, difficulty, impact, synergy (0-100) |
| **Conflict Resolution** | Automatic resolution of conflicting constraints |
| **Component Registry** | Validated components with anti-pattern alternatives |
| **Accessibility Checklist** | 30+ checks across 8 categories |
| **Build Metrics** | Time, bundle size, compliance, validation scores |
| **Feedback Loop** | System learns from previous builds |
| **New Flags** | `--score`, `--validate`, `--feedback=<id>` |

---

**Version**: 2.0.0 | **Last updated**: 2025-02-02 | **Docs**: `plugins/orchestrator/README.md`
