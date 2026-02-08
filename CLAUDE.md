# 🚀 SMITEUI — Quick Reference

## 🎯 I'm here to...

- **Generate unique UIs**: `/ui "prompt"` — Orchestrator applies constraints, then implements
- **Build from specs**: `/build` — Takes enriched spec and creates UI

## 🔍 Core Workflow

**CRITICAL: ALWAYS run through orchestrator first.**

1. **ALWAYS** use `/ui "prompt"` for new UI requests
2. **NEVER** jump straight to implementation without constraint analysis
3. **Anti-patterns are automatically detected** and enforced
4. **Constraints push creativity** in unexpected directions

**Why?** Direct implementation → generic, trend-following UIs. Orchestrator → unique, thoughtful interfaces.

## 🛠️ Quick Commands

| Command | Purpose | When to use |
|---------|---------|-------------|
| `/ui "prompt"` | Full UI generation with anti-pattern analysis | New UI projects, landing pages, dashboards |
| `/ui --analyze "prompt"` | Just analyze, don't build | Understanding what would be detected |
| `/ui --constraints "prompt"` | Show constraints to apply | Review before building |
| `/build` | Implement from enriched spec | After orchestrator runs |

## 📚 Documentation

- **Marketplace**: `.claude-plugin/marketplace.json`
- **Orchestrator**: `plugins/orchestrator/README.md`
- **Implementer**: `plugins/implementer/commands/build.md`
- **Data sources**: `plugins/orchestrator/data/`

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

See full library: `plugins/orchestrator/data/constraints.json`

## 📂 Generated Output

When you run `/ui`, it creates in `.smiteUI/`:

| File | Purpose |
|------|---------|
| `analysis.md` | Prompt analysis with risk assessment |
| `anti-patterns.md` | Detected patterns to avoid |
| `constraints.md` | Selected constraints with rationale |
| `enriched-spec.md` | Full specification for implementer |

Then `/build` creates:

| Output | Stack | Purpose |
|--------|-------|---------|
| `./output/` | React/Tailwind | Component-based production app |
| `./output/index.html` | Vanilla | Single-file instant prototype |

## 🎯 Key Principles

- **Anti-trend first**: Generic is the enemy
- **Constraints guide, don't limit**: Find creative solutions within boundaries
- **Context matters**: A constraint that works for one project may fail for another
- **Validate before building**: Plan first, code second
- **Document decisions**: Explain why you made choices, especially constraint violations

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

## 🔧 Configuration

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

## 💡 Best Practices

1. **Use `/ui` for new requests** — Always go through orchestrator
2. **Read the enriched spec** — Don't skip constraint analysis
3. **Validate your plan** — Check against anti-pattern blacklist
4. **Choose the right template** — React/Tailwind for apps, Vanilla for demos
5. **Document your choices** — README should explain constraints and decisions
6. **Test edge cases** — Constraints are working if they actually force creativity

## 🚫 What Not To Do

- ❌ Don't skip orchestrator for "faster" results — You'll get generic UI
- ❌ Don't ignore constraints — They're not optional guidelines
- ❌ Don't use "trendy" templates from the internet — Orchestrator detects them as anti-patterns
- ❌ Don't assume constraints are "too limiting" — They're liberation, not restriction

---

**Version**: 1.0.0 | **Last updated**: 2026-02-01 | **Docs**: `plugins/orchestrator/README.md`
