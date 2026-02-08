---
description: "Build unique UI from enriched specifications with anti-pattern validation"
---

# /build - UI Implementer v2.1

Implement unique interfaces by following the enriched specification from the orchestrator.

**New in v2.1:** Integrated adversarial feedback, pattern extraction, improved learning loop, brotli typo fix.

---

## What You Receive

From the orchestrator, you'll receive:

1. **Original user prompt** — What they asked for
2. **Enriched specification** — Validated JSON with full brief
3. **Anti-pattern blacklist** — What to avoid
4. **Constraint requirements** — What you MUST include
5. **Template selection** — `react-tailwind` or `vanilla`
6. **Constraint scores** — Difficulty and creativity ratings (NEW)
7. **Validation schema** — Output requirements (NEW)

---

## Your Process

### Step 1: Read and Understand

Read the enriched spec from `.claude/.strike/enriched-spec.md` or `.claude/.strike/enriched-spec.json`. Understand:
- The core intent behind the original request
- The constraints you must follow (with their scores)
- The anti-patterns you must avoid
- Any specific guidance provided
- **NEW:** Schema requirements for output

### Step 2: Choose Template

Based on the `--stack` flag (default: react-tailwind), select:
- **react-tailwind**: Modern, component-based, use Tailwind CSS
- **vanilla**: Plain HTML/CSS/JS, single file, no build step

### Step 3: Plan with Registry (NEW)

Reference `data/component-registry.json`:

1. **Check `anti_pattern_safe`** before using components
2. **Verify `constraint_compatibility`** with your constraints
3. **Use `alternatives`** when component is unsafe
4. **Document any deviations** in decisions

Example:
- Need a grid? Check registry — Grid has anti-pattern risk
- Alternative: Use `Stack` or `Room` for architectural constraint
- Document decision in build-result

### Step 4: Validate Against Anti-Patterns

Before coding, check your plan:
- [ ] Does this use any pattern from the blacklist?
- [ ] Am I defaulting to a "safe" solution?
- [ ] Do the constraints actually force me in a different direction?

If yes → revise. The constraint is working if you feel uncomfortable.

### Step 5: Plan Accessibility (NEW)

Reference `data/accessibility-checklist.json`:

1. **Critical checks:** Semantic structure, keyboard nav, ARIA, contrast
2. **Constraint-specific:** Screen reader first, print first, CSS only
3. **Plan from start:** Don't add a11y as afterthought

### Step 6: Implement

Build the UI following:
1. The enriched specification
2. The selected constraints
3. The component registry (safe components only)
4. The anti-pattern blacklist (what NOT to do)
5. **NEW:** Accessibility requirements
6. **NEW:** Progressive enhancement

### Step 7: Collect Metrics (NEW)

Gather build metrics for output:

```javascript
{
  build_time: 42,                    // seconds
  bundle_size: {
    total: 45000,
    gzipped: 12000,
    brotli: 9800  // Fixed: was "brotil" in earlier versions
  },
  component_count: 8,
  constraint_compliance: {
    score: 1.0,                      // 100%
    details: [
      { constraint: "paper_ink", compliant: true, notes: "Off-white #FAF9F6, dark text" },
      { constraint: "architectural", compliant: true, notes: "Room-based navigation" }
    ]
  },
  anti_pattern_violations: []
}
```

### Step 8: Self-Check (Enhanced)

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

**Accessibility check (NEW):**
- [ ] Semantic HTML (nav, main, article, etc.)
- [ ] Keyboard navigation works
- [ ] ARIA attributes present
- [ ] Color contrast meets WCAG AA
- [ ] Focus visible on all interactive
- [ ] Screen reader friendly

**Quality check:**
- [ ] Code is clean and organized
- [ ] Components are properly structured (if React)
- [ ] Tailwind classes follow best practices (if using Tailwind)
- [ ] No unnecessary dependencies or bloat

---

## Output

Create the implementation in the target directory (default: `./output/`).

For React/Tailwind:
```
output/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   └── [other components]
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── build-result.json       ← NEW: Required
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

For Vanilla:
```
output/
├── index.html              # Self-contained
├── build-result.json       ← NEW: Required
└── README.md
```

---

## Build Result Format (NEW)

All outputs must include `build-result.json`:

```json
{
  "version": "2.0.0",
  "spec_ref": "enriched-spec-20250202-123456",
  "output": {
    "stack": "react-tailwind",
    "path": "./output",
    "files": [
      { "path": "src/App.tsx", "type": "component", "size": 1234 },
      { "path": "src/index.css", "type": "style", "size": 567 }
    ]
  },
  "metrics": {
    "build_time": 42,
    "bundle_size": { "total": 45000, "gzipped": 12000 },
    "component_count": 8,
    "constraint_compliance": {
      "score": 1.0,
      "details": [...]
    },
    "anti_pattern_violations": []
  },
  "validation": {
    "accessibility": {
      "semantic_html": true,
      "aria_attributes": true,
      "keyboard_nav": true,
      "contrast_aa": true,
      "screen_reader": true
    },
    "performance": { ... },
    "quality": { ... }
  },
  "decisions": [
    {
      "aspect": "Layout",
      "decision": "Used Room components instead of Grid",
      "rationale": "Architectural constraint requires spatial metaphor, Grid is anti-pattern risk"
    }
  ],
  "timestamp": "2025-02-02T12:34:56Z"
}
```

---

## Component Registry (NEW)

### Safe Components

| Component | Safe For | Notes |
|-----------|----------|-------|
| Container | All | Responsive container with max-width |
| Stack | All | Vertical stack with gap |
| Room | Architectural | Spatial section metaphor |
| Heading | All | Semantic heading with hierarchy |
| Body | All | Body text with readable line height |
| Button | All | Standard button with proper states |
| Input | All | Text input with static label |
| Label | All | Static label (not floating) |

### Use With Caution

| Component | Risk | Alternative |
|-----------|------|-------------|
| Grid | card_grid | Stack, Room, Flow |
| DisplayHeading | giant_headlines | Heading with size |
| Card | glassmorphism_cards | SolidCard, Section |

---

## Accessibility Checklist (NEW)

### Critical Checks

1. **Semantic Structure**
   - [ ] Proper heading hierarchy (one h1, in order)
   - [ ] Landmark elements (nav, main, article, section)
   - [ ] Lists use ul/ol/dl (not divs)
   - [ ] Buttons are `<button>`, links are `<a href>`

2. **Keyboard Navigation**
   - [ ] Logical tab order
   - [ ] Visible focus indicator
   - [ ] No keyboard traps
   - [ ] All interactive focusable

3. **ARIA Attributes**
   - [ ] Icon buttons have aria-label
   - [ ] Status updates use aria-live
   - [ ] aria-hidden only on decorative
   - [ ] Collapsible has aria-expanded

4. **Color Contrast**
   - [ ] Normal text: 4.5:1 minimum
   - [ ] Large text: 3:1 minimum
   - [ ] UI components: 3:1 minimum
   - [ ] Not color-only for meaning

5. **Forms**
   - [ ] Labels associated (for/id)
   - [ ] Required indicated programmatically
   - [ ] Errors announced to screen readers
   - [ ] Instructions available before input

---

## Anti-Pattern Validation

If you catch yourself doing something generic, STOP and ask:
1. Why did I choose this pattern?
2. Is there a constraint I'm ignoring?
3. What would be a truly unexpected alternative?

Check the component registry for validated alternatives.

---

## Examples

### Example 1: Paper & Ink Dashboard

**Constraints:** paper_ink, architectural, print_first

**What NOT to do:**
- Dark mode (violates paper)
- Neon accents (violates ink)
- Card grid (violates architectural)
- Hover-dependent info (violates print_first)

**What TO do:**
- Off-white background like paper
- Dark typography like ink
- Room-based sections (lobby, data room, reports hall)
- Information readable without interaction

**Components:**
- Container (safe)
- Room (safe for architectural)
- Heading (safe)
- Body (safe)
- Button (safe)

**Metrics:**
- Constraint compliance: 100%
- A11y score: 100%
- Bundle size: 8KB (gzipped)

### Example 2: ASCII Art Portfolio

**Constraints:** ascii_art_only, system_fonts_only, single_file

**What NOT to do:**
- Any images or graphics (violates ascii)
- Web fonts (violates system)
- Multiple files (violates single_file)

**What TO do:**
- Visual elements made from text characters
- System monospace font
- Everything in one HTML file
- Fast load, no external requests

**Metrics:**
- Constraint compliance: 100%
- A11y score: 95%
- Bundle size: 2KB

---

## Documentation Requirements

Create a README that explains:

1. **Constraints applied** — What limitations guided the design
2. **Anti-patterns avoided** — What clichés were consciously rejected
3. **Design decisions** — Why specific choices were made
4. **Accessibility compliance** — A11y features included
5. **Build metrics** — Performance and quality scores
6. **How to use** — Clear setup/run instructions
7. **What makes it unique** — The core differentiator

---

*Implementer v2.1 — Build unique, avoid the obvious, measure everything, document decisions, learn from feedback*
