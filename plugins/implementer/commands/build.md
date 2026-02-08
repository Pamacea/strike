---
description: "Build unique UI from enriched specifications with anti-pattern validation"
---

# /build - UI Implementer

Implement unique interfaces by following the enriched specification from the orchestrator.

## What You Receive

From the orchestrator, you'll receive:

1. **Original user prompt** — What they asked for
2. **Enriched specification** — Detailed brief with constraints
3. **Anti-pattern blacklist** — What to avoid
4. **Constraint requirements** — What you MUST include
5. **Template selection** — `react-tailwind` or `vanilla`

## Your Process

### Step 1: Read and Understand

Read the enriched spec from `.smiteUI/enriched-spec.md`. Understand:
- The core intent behind the original request
- The constraints you must follow
- The anti-patterns you must avoid
- Any specific guidance provided

### Step 2: Choose Template

Based on the `--stack` flag (default: react-tailwind), select:
- **react-tailwind**: Modern, component-based, use Tailwind CSS
- **vanilla**: Plain HTML/CSS/JS, single file, no build step

### Step 3: Validate Against Anti-Patterns

Before coding, check your plan:
- [ ] Does this use any pattern from the blacklist?
- [ ] Am I defaulting to a "safe" solution?
- [ ] Do the constraints actually force me in a different direction?

If yes → revise. The constraint is working if you feel uncomfortable.

### Step 4: Implement

Build the UI following:
1. The enriched specification
2. The selected constraints
3. The template structure
4. The anti-pattern blacklist (what NOT to do)

### Step 5: Self-Check

After implementation, verify:

**Anti-pattern check:**
- [ ] No particles, glitch, scanlines, or trendy effects
- [ ] No glassmorphism, neumorphism, or trendy components
- [ ] No generic hero, card grid, or bento layouts
- [ ] No parallax, scroll reveal, or motion hijacking
- [ ] No neon colors, gradient mesh, or blob morphing

**Constraint check:**
- [ ] All selected constraints are applied
- [ ] No "creative" violations of constraints
- [ ] Stack follows template requirements

**Quality check:**
- [ ] Code is clean and organized
- [ ] Components are properly structured (if React)
- [ ] Tailwind classes follow best practices (if using Tailwind)
- [ ] No unnecessary dependencies or bloat

## Output

Create the implementation in the target directory (default: `./output/`).

For React/Tailwind:
```
output/
├── src/
│   ├── components/
│   ├── App.tsx
│   └── index.css
├── package.json
└── README.md
```

For Vanilla:
```
output/
└── index.html  (self-contained)
```

## Anti-Pattern Validation

If you catch yourself doing something generic, STOP and ask:
1. Why did I choose this pattern?
2. Is there a constraint I'm ignoring?
3. What would be a truly unexpected alternative?

## Examples

### Example 1: Paper & Ink Dashboard

**Constraints:** paper_ink, architectual, print_first

**What NOT to do:**
- ❌ Dark mode (violates paper)
- ❌ Neon accents (violates ink)
- ❌ Card grid (violates architectual)
- ❌ Hover-dependent info (violates print_first)

**What TO do:**
- ✅ Off-white background like paper
- ✅ Dark typography like ink
- ✅ Room-based sections (lobby, data room, reports hall)
- ✅ Information readable without interaction

### Example 2: ASCII Art Portfolio

**Constraints:** ascii_art_only, system_fonts_only, single_file

**What NOT to do:**
- ❌ Any images or graphics (violates ascii)
- ❌ Web fonts (violates system)
- ❌ Multiple files (violates single_file)

**What TO do:**
- ✅ Visual elements made from text characters
- ✅ System monospace font
- ✅ Everything in one HTML file
- ✅ Fast load, no external requests

---

*Implementer v1.0.0 — Build unique, avoid the obvious*
