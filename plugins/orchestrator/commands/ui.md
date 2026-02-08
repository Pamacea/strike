---
description: "Generate unique UI by applying anti-patterns and creative constraints - Break trends, create the unexpected"
argument-hint: "[--analyze|--constraints|--full|--score|--validate] '<prompt>'"
---

# /ui - Anti-Trend UI Orchestrator v2.0

Transform generic UI prompts into unique, thoughtful interfaces by detecting anti-patterns and imposing creative constraints.

**New in v2.0:** Schema validation, constraint scoring, conflict resolution, feedback loop.

---

## What This Does

When you say `/ui "make me a modern dashboard"`, this command:

1. **Analyzes your prompt** for trend-trap keywords ("modern", "sleek", "minimal")
2. **Detects anti-patterns** you might fall into (glassmorphism, card grids, gradients)
3. **Selects creative constraints** with scoring system to push in unexpected directions
4. **Validates the specification** against JSON Schema
5. **Enriches your prompt** with specific, anti-trend guidance
6. **Delegates to implementer** with the validated specification

---

## Usage

```bash
# Full workflow (default)
/ui "Create a dashboard for analytics"

# Just analyze prompt (don't build yet)
/ui --analyze "A modern SaaS landing page"

# See which constraints would be selected
/ui --constraints "Sleek portfolio website"

# Full build with all steps
/ui --full "E-commerce product page"

# Show constraint scoring details (NEW)
/ui --score "Minimal blog layout"

# Validate only, don't build (NEW)
/ui --validate "Portfolio site"

# Include previous feedback (NEW)
/ui --feedback=build-123 "Redesign my dashboard"

# Force tech stack
/ui --stack=vanilla "Simple landing page"
```

---

## How It Works

### Step 1: Prompt Analysis

The orchestrator scans your prompt for:

**High-risk keywords** (triggers strong anti-pattern detection):
- "modern", "trendy", "sleek", "futuristic", "stunning", "beautiful"

**Medium-risk keywords** (moderate detection):
- "clean", "professional", "elegant", "smooth", "polished"

**Context-dependent** (analyzed in context):
- "simple", "minimalist", "bold", "unique"

### Step 2: Anti-Pattern Detection

Based on your prompt, orchestrator identifies patterns to avoid:

- **UI Effects**: Particles, glitch text, custom cursors, blob morphing
- **Colors**: Neon pink-blue, trendy gradients, dark-mode-by-default
- **Layouts**: Generic heroes, card grids, fullscreen sections
- **Interactions**: Parallax, scroll reveal, scroll hijacking
- **Typography**: Acid distortions, giant headlines, gradient text
- **Components**: Glassmorphism, neumorphism, rounded everything

### Step 3: Constraint Selection (NEW Scoring)

The orchestrator selects 2-4 creative constraints using a scoring system:

```
constraintScore = {
  creativity: 0-30,      // How unusual is this?
  difficulty: 0-25,      // How hard to implement?
  impact: 0-25,          // How much does it change the result?
  synergy: 0-20         // How well does it work with other constraints?
}
```

**Color Restrictions:**
- Single color challenge
- True monochrome
- Paper & ink aesthetic

**Interaction Sources:**
- Architectural inspiration
- Biological systems
- Musical structure
- Mechanical metaphors

**Technical Constraints:**
- CSS only
- System fonts only
- No images

**Context Shifts:**
- Must work printed
- Screen reader first
- Outdoor visibility

### Step 4: Schema Validation (NEW)

Your specification is validated against JSON Schema before delegation:

- All required fields present
- Data types match schema
- Enum values valid
- Numeric ranges within bounds

### Step 5: Prompt Enrichment

Your prompt is transformed into a detailed specification:

```markdown
## Original Intent
"Create a dashboard for analytics"

## Detected Anti-Patterns (AVOID)
- ❌ Card grid layout (every dashboard does this)
- ❌ Glassmorphism cards (2022 called, they want their blur back)
- ❌ Dark theme with neon accents (you're not a crypto bro)
- ❌ Hover animations on everything (motion sensitivity exists)

## Applied Constraints
- ✅ Paper & Ink: Off-white background, dark text, minimal accent (score: 35)
- ✅ Architectural: Navigation inspired by building circulation (score: 78)
- ✅ Print First: Must be readable when printed (score: 72)

## Enriched Brief
Create an analytics dashboard that:
- Uses a warm off-white (#FAF9F6) as primary background
- Employs a single accent color (burnt sienna, forest green, or deep navy)
- Organizes data in a "room" metaphor - main hall for overview, corridors to details
- Prioritizes information hierarchy scannable in 5 seconds
- Works beautifully as a printed report (no hover-dependent information)
- Uses system fonts only for fastest load
- Avoids cards in favor of clear sections with generous whitespace
```

### Step 6: Delegation to Implementer

The enriched specification is passed to `/build` with:

- Full anti-pattern blacklist
- Selected constraint set with scores
- Enriched prompt with specific guidance
- Suggested alternatives for each anti-pattern
- Validation status
- Feedback loop reference

---

## Options

| Flag | Description |
|------|-------------|
| `--analyze` | Only analyze prompt, show detected patterns, don't build |
| `--constraints` | Show which constraints would be selected, don't build |
| `--full` | Run complete workflow with verbose output |
| `--stack=<react\|vanilla>` | Force specific tech stack for implementation |
| `--strict` | Reject prompt if too many anti-patterns detected |
| `--score` | Show constraint scoring details (NEW in v2.0) |
| `--validate` | Run schema validation only, don't build (NEW in v2.0) |
| `--feedback=<id>` | Include previous feedback in selection (NEW in v2.0) |

---

## Examples

### Example 1: Dashboard Request

```bash
/ui "Modern analytics dashboard with real-time charts"
```

**Analysis:**
- "Modern" triggers anti-pattern detection (risk: 8/10)
- "Dashboard" suggests card grids
- "Charts" suggests generic data viz

**Constraints Applied:**
1. **Monochrome** (easy, score: 28, creativity: 12/30)
2. **Architectural** (hard, score: 82, creativity: 27/30)
3. **Print First** (hard, score: 75, creativity: 22/30)

**Result:** A dashboard that uses white space as architecture, numbers as typography, and feels like a well-designed annual report rather than another SaaS tool.

### Example 2: Portfolio Request

```bash
/ui "Sleek portfolio for a creative developer"
```

**Analysis:**
- "Sleek" is high-risk trend bait
- "Portfolio" suggests parallax galleries
- "Creative developer" suggests glitch effects

**Constraints Applied:**
1. **ASCII Art**: Use only text characters (medium, score: 65)
2. **System Fonts**: No web fonts (easy, score: 22)
3. **Single File**: Everything in one HTML (easy, score: 18)

**Result:** A portfolio that looks like a beautifully formatted README, loads instantly, and actually showcases code thinking rather than hiding behind flashy effects.

### Example 3: E-commerce Request

```bash
/ui "Product page for premium headphones"
```

**Analysis:**
- "Premium" suggests dark mode + gradients
- "Headphones" suggests Apple-style hero
- "Product page" suggests parallax scrolling

**Constraints Applied:**
1. **Warm Only**: No blues, greens, or purples (medium, score: 45)
2. **Architectural**: Spatial, grounded interactions (hard, score: 78)
3. **One-Handed Mobile**: Reachable with one thumb (medium, score: 52)

**Result:** A product page with earth tones, compositional balance, and an interaction model that feels intimate rather than performative.

---

## Integration with Implementer

After enrichment, orchestrator calls:

```bash
/build --from-spec="${enriched_spec}" --anti-patterns="${blacklist}" --constraints="${selected}"
```

The implementer receives:
- The original prompt
- Enriched specification (validated JSON)
- Anti-pattern blacklist (what to avoid)
- Constraint requirements (what to include)
- Template selection (react-tailwind or vanilla)

---

## Philosophy

**Why anti-patterns?**
Modern UI has converged on a narrow set of "safe" choices. Glassmorphism, card grids, neon gradients — they're not bad, they're everywhere. When everything looks the same, nothing stands out.

**Why constraints?**
Limitations breed creativity. When you can't use gradients, you discover the power of typography. When you can't use images, you learn what CSS can really do. When you design for print, you discover true hierarchy.

**The goal:**
Not to be contrarian for its own sake, but to push past the first obvious solution and find something that actually fits the content, the users, and the context.

---

## Configuration

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

## Output

The orchestrator creates in `.claude/.smiteUI/`:

| File | Purpose |
|------|---------|
| `.claude/.smiteUI/analysis.md` | Prompt analysis and detected patterns |
| `.claude/.smiteUI/constraints.md` | Selected constraints with scores and rationale |
| `.claude/.smiteUI/enriched-spec.json` | Validated JSON specification (NEW) |
| `.claude/.smiteUI/enriched-spec.md` | Full brief for implementer (readable) |
| `.claude/.smiteUI/anti-patterns.md` | Blacklist for implementer |

---

## Best Practices

1. **Be honest about your prompt** — Don't game the system by avoiding trigger words
2. **Embrace constraints** — They're not limitations, they're liberation
3. **Trust the process** — The weird ideas often become the best ideas
4. **Iterate** — If the first result isn't right, run again with different constraints
5. **Learn from it** — Each constraint teaches you something about design
6. **Provide feedback** — The system learns from what works and what doesn't

---

## Technical Notes

### Schema Validation

All specs are validated against `schemas/spec.schema.json`:
- Enables autocomplete and validation
- Catches errors before delegation
- Provides clear error messages

### Lazy Pattern Loading

For performance, anti-patterns are loaded lazily by category:
```javascript
const antiPatternsDB = {
  ui_effects: await loadCategory('ui-effects.json'),
  colors: await loadCategory('colors.json'),
  // ... loaded only when needed
}
```

### Feedback Loop

Build results feed back into constraint selection:
- High compliance → increase constraint score
- Violations → suggest different alternatives
- User feedback → adjust weights

---

*Orchestrator v2.0 - Break patterns, create unexpected, learn from results*
