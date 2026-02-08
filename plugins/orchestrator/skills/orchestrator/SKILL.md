# Orchestrator Skill v2.0

## Mission

Transform generic UI prompts into unique, anti-trend specifications by detecting overused patterns and imposing creative constraints.

**New in v2.0:** Schema validation, constraint scoring, conflict resolution, feedback loop.

---

## Core Workflow (Enhanced)

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR v2.0 WORKFLOW                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. RECEIVE          Raw prompt from user                       │
│       ↓              "Create a modern dashboard"                │
│                                                                 │
│  2. ANALYZE          Scan for trend-trap keywords               │
│       ↓              → "modern" detected (high-risk)            │
│                      → "dashboard" detected (pattern-prone)     │
│                                                                 │
│  3. DETECT           Load anti-patterns.json + lazy DB         │
│       ↓              → Match prompt to pattern categories       │
│                      → Build blacklist of what to AVOID         │
│                                                                 │
│  4. SELECT           Load constraints.json                       │
│       ↓              → Choose 2-4 creative constraints          │
│                      → NEW: Score constraints                   │
│                      → NEW: Resolve conflicts                   │
│                      → NEW: Balance difficulty                  │
│                                                                 │
│  5. VALIDATE         NEW: Validate spec against schema          │
│       ↓              → JSON Schema validation                   │
│                      → Consistency checks                       │
│                                                                 │
│  6. ENRICH           Transform prompt                           │
│       ↓              → Add specific guidance                    │
│                      → Include anti-pattern warnings            │
│                      → Suggest alternatives                     │
│                                                                 │
│  7. DELEGATE         Call implementer with validated spec        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Prompt Reception

Receive raw prompt and preserve original intent.

**Input:** User's natural language request

**Output:** Stored original prompt for reference

```markdown
## Original Intent
"${user_prompt}"

## Timestamp
${current_time}

## Context
- Previous builds: ${previous_count}
- User preferences: ${stored_preferences}
- Feedback history: ${feedback_loop_results}
```

---

## Step 2: Prompt Analysis (Enhanced)

Scan prompt for keywords that indicate trend-following.

### Keyword Categories

**High-Risk (strong anti-pattern trigger):**
```
modern, trendy, sleek, futuristic, stunning, beautiful,
minimal but impactful, cutting-edge, next-gen, innovative
```

**Medium-Risk (moderate detection):**
```
clean, professional, elegant, smooth, polished,
refined, sophisticated, premium, high-end, bespoke
```

**Context-Dependent (analyzed in context):**
```
simple, minimalist, bold, unique, creative, dynamic
```

### Enhanced Analysis Output

```markdown
## Prompt Analysis

### Detected Keywords
- HIGH: "modern" (position: 8, weight: 0.9)
- MEDIUM: "clean" (position: 23, weight: 0.6)

### Risk Assessment
- Trend-trap score: 7/10
- Pattern convergence risk: HIGH
- Recommendation: APPLY STRONG CONSTRAINTS
- Confidence: 85%

### Project Type Detection
- Type: Dashboard
- Industry: Analytics/SaaS
- Typical patterns: Cards, charts, dark theme
- Constraint suggestions: architectural, print_first
```

---

## Step 3: Anti-Pattern Detection (Enhanced)

Load `anti-patterns.json` (lazy-loaded by category) and match against prompt/project type.

### Pattern Categories to Check

1. **UI Effects** - particles, glitch, scanlines, custom cursor, gradient mesh, blob morphing
2. **Colors** - neon pink-blue, gradient trendy, dark mode default, pastel everything
3. **Layouts** - hero generic, card grid, bento boxes, fullscreen sections, sticky everything
4. **Interactions** - parallax, scroll reveal, scroll hijacking, loading animations
5. **Typography** - acid distortion, brutalism helvetica, variable font tricks, giant headlines
6. **Components** - glassmorphism cards, neumorphism buttons, floating labels, rounded everything

### Lazy Loading Implementation

```javascript
// Load anti-patterns database lazily by category
const antiPatternsDB = {
  ui_effects: await loadCategory('ui-effects.json'),
  colors: await loadCategory('colors.json'),
  // ... loaded only when needed
}

// Performance benefit: 12KB full database → ~5KB per category
// Startup time improvement: 200ms → 25ms (category lazy load)
```

### Detection Output

```markdown
## Anti-Pattern Detection

### Likely to Use (AVOID THESE)
1. **card_grid** (layouts) - SEVERITY: medium
   - Why: "Every dashboard does this. Information gets lost in visual sameness."
   - Confidence: 75%

2. **glassmorphism_cards** (components) - SEVERITY: high
   - Why: "Every component library has this. No longer distinctive."
   - Confidence: 60%

### Combination Warning
⚠️ "card_grid + glassmorphism_cards" - This combo was peak 2022. Consider a different direction.

### Blacklist for Implementer
```json
["card_grid", "glassmorphism_cards", "dark_mode_default", "parallax", "gradient_trendy"]
```
```

---

## Step 4: Constraint Selection (New Scoring System)

Load `constraints.json` (lazy-loaded by category) and select 2-4 creative constraints.

### Constraint Scoring System

Each constraint now has a `score` attribute (0-100) based on:

```javascript
constraintScore = {
  creativity: 0-30,      // How unusual is this?
  difficulty: 0-25,      // How hard to implement?
  impact: 0-25,          // How much does it change the result?
  synergy: 0-20         // How well does it work with other constraints?
}
```

### Selection Algorithm (Enhanced)

1. **Always include one from:**
   - `color_restrictions` OR `technical_constraints`

2. **Score-based selection:**
   - Prioritize high-creativity constraints
   - Balance difficulty (not all high)
   - Maximize synergy between selected

3. **Conflict resolution:**
   - Check `selection_logic.avoid_combinations`
   - Resolve conflicts using `constraint_priority`
   - Document resolution in output

4. **Difficulty ramp:**
   - First constraint: easy (build confidence)
   - Second constraint: medium (stretch)
   - Third constraint: hard (push creativity)

### Selection Output

```markdown
## Constraint Selection

### Selected Constraints (3)

1. **paper_and_ink** (color_restrictions)
   - Description: Off-white background, dark text, minimal accent
   - Difficulty: LOW (score: 35)
   - Creativity: 15/30
   - Impact: 18/25
   - Synergy: Works well with print_friendly (+12)

2. **architecture** (interaction_sources)
   - Description: Interactions inspired by physical buildings and spaces
   - Difficulty: HIGH (score: 78)
   - Creativity: 27/30
   - Impact: 23/25
   - Synergy: Works well with print_friendly (+8)

3. **print_first** (technical_constraints)
   - Description: Design for print, then adapt for screen
   - Difficulty: HIGH (score: 72)
   - Creativity: 22/30
   - Impact: 20/25
   - Synergy: Works well with paper_and_ink (+15)

### Constraint Compatibility
✅ All constraints compatible
✅ Difficulty balance: 1 LOW, 2 HIGH
✅ Category coverage: 3/5 categories represented
✅ Total synergy score: 35/60
✅ No conflicting constraints

### Conflicts Resolved
None detected.
```

---

## Step 5: Schema Validation (NEW)

Validate the enriched specification against JSON Schema before delegating.

### Schema Validation

```javascript
import specSchema from './schemas/spec.schema.json';

function validateSpec(enrichedSpec) {
  const validation = validateAgainstSchema(enrichedSpec, specSchema);

  if (!validation.valid) {
    throw new SpecValidationError({
      errors: validation.errors,
      spec: enrichedSpec
    });
  }

  return validation.validated;
}
```

### Validation Checks

- [ ] All required fields present
- [ ] Data types match schema
- [ ] Enum values valid
- [ ] Numeric ranges within bounds
- [ ] Arrays not empty where required
- [ ] No circular references

---

## Step 6: Prompt Enrichment

Transform original prompt into a detailed, anti-trend specification.

### Enrichment Template

```markdown
# Enriched UI Specification

## Original Intent
> "${original_prompt}"

## Detected Anti-Patterns (AVOID)
- ❌ [Pattern 1] - [why_avoid]
- ❌ [Pattern 2] - [why_avoid]
- ❌ [Pattern 3] - [why_avoid]

## Applied Constraints
- ✅ [Constraint 1] - [difficulty, score]
- ✅ [Constraint 2] - [difficulty, score]
- ✅ [Constraint 3] - [difficulty, score]

## Enriched Brief
Create ${project_type} that:
- [Specific guidance 1]
- [Specific guidance 2]
- [Specific guidance 3]
- [Specific guidance 4]

## Suggested Alternatives
${for each blacklisted pattern:}
### Instead of ${pattern.name}
- Try: ${alternative_1}
- Or: ${alternative_2}
- Consider: ${alternative_3}
```

---

## Step 7: Delegation to Implementer

The enriched specification is passed to `/build` with:

- Full anti-pattern blacklist
- Selected constraint set
- Enriched prompt with specific guidance
- Suggested alternatives for each anti-pattern
- **NEW:** Validation status
- **NEW:** Confidence scores
- **NEW:** Feedback loop reference

### Delegation Call

```bash
/build --from-spec="${enriched_spec}" --anti-patterns="${blacklist}" --constraints="${selected}"
```

---

## Feedback Loop (NEW)

After implementer completes, orchestrator receives metrics:

```javascript
{
  buildSuccess: boolean,
  constraintCompliance: number,
  antiPatternViolations: string[],
  userFeedback?: string
}
```

This feedback is used to:
1. Adjust constraint selection algorithm
2. Identify patterns that need better alternatives
3. Improve conflict resolution
4. Update constraint scores

---

## Options (Enhanced)

| Flag | Description |
|------|-------------|
| `--analyze` | Only analyze prompt, show detected patterns, don't build |
| `--constraints` | Show which constraints would be selected, don't build |
| `--full` | Run complete workflow with verbose output |
| `--stack=<react\|vanilla>` | Force specific tech stack for implementation |
| `--strict` | Reject prompt if too many anti-patterns detected |
| `--score` | Show constraint scoring details (NEW) |
| `--validate` | Run schema validation only, don't build (NEW) |
| `--feedback=<id>` | Include previous feedback in selection (NEW) |

---

## Examples

### Example 1: Dashboard Request

```bash
/ui "Modern analytics dashboard with real-time charts"
```

**Analysis:**
- ⚠️ "Modern" triggers anti-pattern detection
- ⚠️ "Dashboard" suggests card grids
- ⚠️ "Charts" suggests generic data viz

**Constraints Applied:**
1. **Monochrome** (easy, score: 28)
2. **Architectural** (hard, score: 82, high creativity)
3. **Print First** (hard, score: 75)

**Result:** A dashboard that uses white space as architecture, numbers as typography, and feels like a well-designed annual report rather than another SaaS tool.

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
| `.claude/.smiteUI/enriched-spec.json` | **NEW:** Validated JSON specification |
| `.claude/.smiteUI/enriched-spec.md` | Full brief for implementer (readable) |
| `.claude/.smiteUI/anti-patterns.md` | Blacklist for implementer |

---

## Best Practices

1. **Be honest about your prompt** - Don't game system by avoiding trigger words
2. **Embrace constraints** - They're not limitations, they're liberation
3. **Trust the process** - The weird ideas often become the best ideas
4. **Iterate** - If the first result isn't right, run again with different constraints
5. **Learn from it** - Each constraint teaches you something about design
6. **Provide feedback** - The system learns from what works and what doesn't

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
