# UI Builder Skill v2.0

Build unique, thoughtful interfaces by following the enriched specification from the orchestrator.

**New in v2.0:** Component registry, build metrics, accessibility-first validation, schema-validated output.

---

## Mission

Transform enriched specifications into complete UI implementations that:
- Strictly avoid detected anti-patterns
- Faithfully apply creative constraints
- Choose appropriate technology stack (React/Tailwind or vanilla)
- Validate results against both constraints and anti-patterns
- **NEW:** Generate metrics and validation reports
- **NEW:** Ensure accessibility compliance
- **NEW:** Document all decisions with rationale

---

## Core Principles

- **Constraints guide, don't limit** — Find creative solutions within boundaries
- **Anti-patterns are warnings** — They exist to prevent obvious defaults, not forbid legitimate choices
- **Validate before building** — Plan first, code second
- **Quality over cleverness** — A well-executed simple idea beats a poorly-complex one
- **Accessibility first** — If it's not accessible, it's not done
- **Document decisions** — Explain why you made choices, especially if they push boundaries

---

## Process (Enhanced)

### Phase 1: Analysis

1. **Read enriched spec** from `.claude/.smiteUI/enriched-spec.md` or `.claude/.smiteUI/enriched-spec.json`
2. **Validate spec schema** — Ensure JSON structure is valid
3. **Read anti-pattern blacklist** from the spec
4. **Read constraints** from the spec with their scores
5. **Identify tech stack** (react-tailwind or vanilla)

### Phase 2: Planning (Enhanced)

1. **Map constraints to implementation:**
   - Color constraints → palette generation
   - Technical constraints → technology choices
   - Interaction source → interaction model
   - Context shift → testing strategy

2. **Select components from registry:**
   - Check `component-registry.json` for validated components
   - Verify constraint compatibility
   - Use alternatives when needed

3. **Plan accessibility approach:**
   - Reference `accessibility-checklist.json`
   - Identify constraint-specific a11y requirements
   - Plan semantic structure from start

4. **Validate plan against anti-patterns:**
   - Check each pattern in the blacklist
   - Ensure no accidental "safe" defaults
   - Verify constraints actually push design

### Phase 3: Implementation

**For React/Tailwind:**

1. Create component structure in `src/components/`
2. Use Tailwind for styling (avoid custom CSS when possible)
3. Implement state management (useState, useReducer, or custom hooks)
4. Add any necessary utilities or helpers
5. **NEW:** Include accessibility attributes from start
6. **NEW:** Track component usage from registry

**For Vanilla:**

1. Create single-file HTML with inline CSS/JS
2. Use semantic HTML5
3. CSS in `<style>` block with proper organization
4. JS in `<script>` block, event-driven
5. **NEW:** Include ARIA attributes natively
6. **NEW:** Progressive enhancement approach

### Phase 4: Validation (Enhanced)

1. **Constraint checklist:** All constraints applied?
2. **Anti-pattern checklist:** None violated?
3. **Quality checklist:** Code clean, organized, documented?
4. **Accessibility check:** Run full a11y checklist
5. **Metrics collection:** Gather build metrics
6. **Schema validation:** Output matches result schema

---

## Component Registry (NEW)

Reference `data/component-registry.json` for validated components.

### Registry Structure

```json
{
  "categories": {
    "layout": { "components": [...] },
    "typography": { "components": [...] },
    "actions": { "components": [...] },
    "forms": { "components": [...] },
    "feedback": { "components": [...] }
  },
  "anti_pattern_alternatives": {
    "card_grid": ["Stack", "Room", "Flow", "List"],
    "glassmorphism_cards": ["SolidCard", "BorderCard", "FlatCard"]
  }
}
```

### Component Selection Rules

1. **Check `anti_pattern_safe`** before using
2. **Verify `constraint_compatibility`** with your constraints
3. **Use `alternatives`** when component is unsafe
4. **Document any deviations** in decisions

---

## Anti-Pattern Validation Rules

### Automatic Failures

Do NOT build if:
- Using particles, canvas effects, or motion graphics without constraint permission
- Glassmorphism, neumorphism, or trendy effects from blacklist
- Parallax, scroll reveal, or scroll hijacking
- Neon colors, gradient mesh, or blob morphing from blacklist
- Generic hero section, card grid, bento layout from blacklist

### Contextual Failures

Evaluate in context of constraints:
- Constraint says "CSS only" → Using complex JS animations = fail
- Constraint says "print first" → Hover-dependent info = fail
- Constraint says "ASCII only" → Any graphics = fail
- Constraint says "monochrome" → Multiple colors = fail

### Edge Cases

If a constraint and a pattern conflict:
- **Constraint wins** — The constraint IS the creative direction
- Example: Constraint "musical structure" overrides anti-pattern "card grid"
- Document the conflict and resolution in output

---

## Accessibility Checklist (NEW)

Reference `data/accessibility-checklist.json` for full validation.

### Critical Checks

| Category | Checks | Priority |
|----------|--------|----------|
| Semantic Structure | 4 checks | CRITICAL |
| Keyboard Navigation | 4 checks | CRITICAL |
| ARIA Attributes | 4 checks | HIGH |
| Color Contrast | 4 checks | CRITICAL |
| Forms | 4 checks | CRITICAL |

### Constraint-Specific Overrides

```json
{
  "screen_reader_first": {
    "priority_override": "all_critical",
    "additional_checks": [
      "Test with actual screen reader",
      "Verify all interactions work without mouse"
    ]
  },
  "print_first": {
    "additional_checks": [
      "No hover-dependent information",
      "All content available without interaction"
    ]
  }
}
```

---

## Build Metrics (NEW)

Collect and report these metrics in output.

### Required Metrics

```javascript
{
  build_time: number,           // Seconds
  bundle_size: {
    total: number,              // Bytes
    gzipped: number,
    brotli: number
  },
  component_count: number,
  constraint_compliance: {
    score: number,              // 0-1
    details: [
      { constraint: string, compliant: boolean, notes: string }
    ]
  },
  anti_pattern_violations: [
    { pattern: string, severity: string, context: string }
  ]
}
```

### Quality Metrics

```javascript
{
  accessibility: {
    semantic_html: boolean,
    aria_attributes: boolean,
    keyboard_nav: boolean,
    contrast_aa: boolean,
    screen_reader: boolean
  },
  performance: {
    lazy_load: boolean,
    minimal_deps: boolean,
    optimized_assets: boolean,
    no_memory_leaks: boolean
  },
  quality: {
    code_consistent: boolean,
    naming_clear: boolean,
    no_dead_code: boolean,
    proper_comments: boolean
  }
}
```

---

## Output Structure (Enhanced)

**React/Tailwind Output:**

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
├── build-result.json       ← NEW: Metrics and validation
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

**Vanilla Output:**

```
output/
├── index.html              # Self-contained
├── build-result.json       ← NEW: Metrics and validation
└── README.md
```

---

## Build Result Schema (NEW)

All outputs must include `build-result.json` matching schema:

```json
{
  "version": "2.0.0",
  "spec_ref": "enriched-spec reference",
  "output": {
    "stack": "react-tailwind | vanilla",
    "path": "./output",
    "files": [
      { "path": "string", "type": "component|style|script|markup", "size": number }
    ]
  },
  "metrics": { ... },
  "validation": { ... },
  "decisions": [
    { "aspect": "string", "decision": "string", "rationale": "string" }
  ],
  "timestamp": "ISO 8601"
}
```

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

## Quality Standards

### Code Quality

- Clear, readable code
- Consistent naming conventions
- Proper comments where helpful
- No dead code or debugging leftovers

### Accessibility (ENHANCED)

- Semantic HTML (nav, main, article, etc.)
- Keyboard navigation support
- ARIA attributes where needed
- Focus management for interactions
- Color contrast WCAG AA compliant
- Screen reader tested structure

### Performance

- Minimal dependencies
- Optimized assets
- Efficient event handling
- No memory leaks (listeners cleanup)

---

## Error Handling

If spec is ambiguous:
- Make reasonable assumptions
- Document those assumptions in README
- Prefer constraint over spec ambiguity

If constraints conflict:
- Constraint priority: Context > Technical > Structural > Color
- Document conflict and resolution in README
- Include in build-result decisions

---

## Examples

### Example 1: Warm-Only E-commerce

**Spec:** Product page for headphones, warm colors, one-handed mobile

**Anti-patterns avoided:**
- No blue/tech colors (warm constraint)
- No Apple-style hero (avoid generic)
- No parallax (blacklist)

**Component selection:**
- Container (safe)
- Stack (safe, better than Grid)
- Button (safe)
- Input with static label (avoid floating labels)

**Implementation:**
- Color palette: Burnt orange, cream, deep brown
- Layout: Single column, focused on product
- Mobile: Large touch targets, reachable with thumb
- Structure: Semantic product page, no unnecessary complexity

**Metrics:**
- Constraint compliance: 100%
- A11y score: 95%
- Bundle size: 12KB (gzipped)

### Example 2: Architectural Dashboard

**Spec:** Analytics dashboard, architectural inspiration, print-first

**Anti-patterns avoided:**
- No card grid (architectural constraint → use Room)
- No dark mode (paper/ink constraint)
- No hover-dependent info (print constraint)

**Component selection:**
- Room (architectural, safe alternative to Grid)
- Heading (safe)
- Body (safe)
- StatusMessage with aria-live (for updates)

**Implementation:**
- Structure: "Building rooms" — lobby (overview), office (detailed metrics)
- Style: Off-white like paper, dark like ink
- Typography: Hierarchy driven, not decoration
- Print: Clean, scannable, works on paper

**Metrics:**
- Constraint compliance: 100%
- A11y score: 100%
- Bundle size: 8KB (gzipped)

---

## Integration with Orchestrator

The implementer receives from `/build` command:

- The original user prompt
- Enriched specification (validated JSON)
- Anti-pattern blacklist (what to avoid)
- Constraint requirements (what to include)
- Template selection (react-tailwind or vanilla)
- **NEW:** Constraint scores
- **NEW:** Validation schema reference

And creates:
- Complete UI implementation
- Build result with metrics
- Validation report
- Documentation

---

*UI Builder v2.0 — Build unique, validate thoroughly, measure everything, document decisions*
