# Orchestrator - Contextual UI Orchestration Agent

**Anti-trend UI generation through prompt analysis, anti-pattern detection, and creative constraint enforcement.**

---

## Mission

The orchestrator prevents generic, trend-following UI by:
1. **Analyzing user prompts** for trend-trap keywords and cliché requests
2. **Detecting likely anti-patterns** the user might fall into
3. **Applying creative constraints** to force unexpected solutions
4. **Enriching the prompt** with specific, anti-trend guidance
5. **Delegating to implementer** with a detailed, constraint-driven specification

## Why This Exists

Modern web design has converged on a narrow set of "safe" choices. Glassmorphism, card grids, neon gradients, parallax scrolling — they're not bad, they're everywhere. When everything looks the same, nothing stands out.

The orchestrator is a guard against the obvious. It doesn't just build what you ask — it builds what you **should have asked for if you wanted something unique.**

## Key Principles

- **Trend is the enemy of distinction**
- **Constraints breed creativity** — limitations are liberation
- **Context matters** — a constraint that works for one project may fail for another
- **Anti-pattern ≠ bad** — some are cliché, others are just overused
- **The goal isn't contrarian** — it's thoughtful

## Workflow

### 1. Prompt Analysis

The orchestrator scans your prompt for risk levels:

**High-risk keywords** (triggers strong anti-pattern detection):
- "modern", "trendy", "sleek", "futuristic", "stunning", "beautiful"

**Medium-risk keywords** (moderate detection):
- "clean", "professional", "elegant", "smooth", "polished"

**Context-dependent** (analyzed in context):
- "simple", "minimalist", "bold", "unique"

### 2. Anti-Pattern Detection

Based on your prompt, the orchestrator identifies patterns to avoid from **anti-patterns.json**:

- **UI Effects**: Particles, glitch text, custom cursors, blob morphing
- **Colors**: Neon pink-blue, trendy gradients, dark-mode-by-default
- **Layouts**: Generic heroes, card grids, fullscreen sections
- **Interactions**: Parallax, scroll reveal, scroll hijacking
- **Typography**: Acid distortions, giant headlines, gradient text
- **Components**: Glassmorphism, neumorphism, rounded everything

Each pattern includes:
- What it is
- Why it's a problem
- Severity (low/medium/high)
- Better alternatives

### 3. Constraint Selection

The orchestrator selects 2-4 creative constraints from **constraints.json**:

**Color Restrictions:**
- Single color challenge
- True monochrome
- Paper & ink aesthetic

**Interaction Sources:**
- Architectural inspiration
- Biological systems
- Musical structure
- Paper craft

**Technical Constraints:**
- CSS only
- System fonts only
- No images

**Context Shifts:**
- Must work printed
- Screen reader first
- Outdoor visibility

### 4. Prompt Enrichment

Your prompt is transformed into a detailed specification:

```markdown
## Original Intent
[Your prompt]

## Detected Anti-Patterns (AVOID)
- ❌ [Pattern 1]
- ❌ [Pattern 2]
- ❌ [Pattern 3]

## Applied Constraints
- ✅ [Constraint 1]
- ✅ [Constraint 2]
- ✅ [Constraint 3]

## Enriched Brief
[Detailed, constraint-driven brief]
```

### 5. Delegation

The enriched specification is passed to `/build` with:

- Full anti-pattern blacklist
- Selected constraint set
- Enriched prompt with specific guidance
- Suggested alternatives for each anti-pattern

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

## Data Sources

- **anti-patterns.json** — Patterns to actively avoid with detection rules
- **constraints.json** — Creative constraints organized by category

## Integration

- **Calls**: `/build` in implementer plugin
- **Receives**: Original prompt, enriched spec, anti-pattern blacklist, constraints
- **Returns**: Completed UI implementation

## Output Files

The orchestrator creates in `.smiteUI/`:

| File | Purpose |
|------|---------|
| `analysis.md` | Prompt analysis with risk assessment |
| `anti-patterns.md` | Detected patterns to avoid |
| `constraints.md` | Selected constraints with rationale |
| `enriched-spec.md` | Full specification for implementer |

## Best Practices

1. **Be honest about your prompt** — Don't game the system by avoiding trigger words
2. **Embrace constraints** — They're not limitations, they're liberation
3. **Trust the process** — The weird ideas often become the best ideas
4. **Iterate** — If first result isn't right, run again with different constraints
5. **Learn from it** — Each constraint teaches something about design

## Examples

### Example: "Modern analytics dashboard"

**Analysis:**
- "Modern" = high risk (trendy colors, glassmorphism)
- "Dashboard" = high risk (card grids, generic hero)
- "Analytics" = medium risk (charts, data viz)

**Detected Anti-Patterns:**
- Card grid layout
- Glassmorphism cards
- Dark theme with neon accents
- Hover animations everywhere

**Applied Constraints:**
- Paper & ink (off-white, dark text)
- Architectural (room-based navigation)
- Print first

**Result:** A dashboard that uses white space as architecture, numbers as typography, and feels like a well-designed annual report rather than another SaaS tool.

### Example: "Sleek portfolio"

**Analysis:**
- "Sleek" = high risk (gradients, dark mode, smooth animations)
- "Portfolio" = medium risk (parallax, gallery grid, large images)

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
Modern UI has converged on a narrow set of "safe" choices. Glassmorphism, card grids, neon gradients — they're not bad, they're just everywhere. When everything looks the same, nothing stands out.

**Why constraints?**
Limitations breed creativity. When you can't use gradients, you discover the power of typography. When you can't use images, you learn what CSS can really do. When you design for print, you discover true hierarchy.

**The goal:**
Not to be contrarian for its own sake, but to push past the first obvious solution and find something that actually fits the content, the users, and the context.

---

*Orchestrator v1.0.0 — Break patterns, create unexpected*
