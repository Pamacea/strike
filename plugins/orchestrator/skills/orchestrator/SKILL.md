# Orchestrator Skill

## Mission

Transform generic UI prompts into unique, anti-trend specifications by detecting overused patterns and imposing creative constraints.

---

## Core Workflow

```
┌─────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR WORKFLOW                        │
├─────────────────────────────────────────────────────────┤
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
│                      → Ensure compatibility                     │
│                      → Balance difficulty                      │
│                                                                 │
│  5. ENRICH           Transform prompt                           │
│       ↓              → Add specific guidance                  │
│                      → Include anti-pattern warnings            │
│                      → Suggest alternatives                     │
│                                                                 │
│  6. DELEGATE         Call implementer with enriched spec          │
└─────────────────────────────────────────────────────────┘
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
```

---

## Step 2: Prompt Analysis

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
simple, minimalist, bold, unique, creative, dynamic, modern
```

### Analysis Output

```markdown
## Prompt Analysis

### Detected Keywords
- HIGH: "modern" (position: 8)
- MEDIUM: "clean" (position: 23)

### Risk Assessment
- Trend-trap score: 7/10
- Pattern convergence risk: HIGH
- Recommendation: APPLY STRONG CONSTRAINTS

### Project Type Detection
- Type: Dashboard
- Industry: Analytics/SaaS
- Typical patterns: Cards, charts, dark theme
```

---

## Step 3: Anti-Pattern Detection

Load `anti-patterns.json` (lazy-loaded by category) and match against prompt/project type.

### Pattern Categories to Check

1. **UI Effects**
   - `particle_canvas`, `glitch_text`, `scanlines`, `custom_cursor`, `gradient_mesh`, `blob_morphing`

2. **Colors**
   - `neon_pink_blue`, `gradient_trendy`, `dark_mode_default`, `pastel_everything`

3. **Layouts**
   - `hero_generic`, `card_grid`, `bento_boxes`, `fullscreen_sections`, `sticky_everything`

4. **Interactions**
   - `parallax`, `scroll_reveal`, `scroll_hijacking`, `hover_effects_classic`, `loading_animations`

5. **Typography**
   - `distortion_acid`, `brutalism_helvetica`, `variable_font_tricks`, `giant_headlines`, `gradient_text`

6. **Components**
   - `glassmorphism_cards`, `neumorphism_buttons`, `floating_labels`, `rounded_everything`, `icon_overload`

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

This prevents loading the full 12KB database on every command, keeping startup fast.

### Detection Logic

```javascript
function detectAntiPatterns(prompt, projectType) {
  const detected = [];
  
  // Direct keyword matching
  for (const [category, patterns] of Object.entries(antiPatternsDB.categories)) {
    for (const pattern of patterns.patterns) {
      if (isLikelyToUse(prompt, projectType, pattern)) {
        detected.push({
          pattern: pattern.name,
          category: category,
          severity: pattern.severity,
          reason: pattern.why_avoid
        });
      }
    }
  }
  
  return { patterns: detected, warnings: combos };
}
```

### Detection Output

```markdown
## Anti-Pattern Detection

### Likely to Use (AVOID THESE)
1. **card_grid** (layouts) - SEVERITY: medium
   - Why: "Every dashboard does this. Information gets lost in visual sameness."
   
2. **glassmorphism_cards** (components) - SEVERITY: high
   - Why: "Every component library has this. No longer distinctive."

### Combination Warning
⚠️ "card_grid + glassmorphism_cards" - This combo was peak 2022. Consider a different direction.

### Blacklist for Implementer
```json
["card_grid", "glassmorphism_cards", "dark_mode_default", "parallax", "gradient_trendy"]
```

---

## Step 4: Constraint Selection

Load `constraints.json` (lazy-loaded by category) and select 2-4 creative constraints.

### Selection Algorithm

1. **Always include one from:**
   - `color_restrictions` OR `technical_constraints`

2. **Consider based on project type:**
   - Dashboard → `interaction_sources.architecture`
   - Portfolio → `technical_constraints.ascii_art`
   - E-commerce → `context_shifts.one_hand_mobile`

3. **Check compatibility:**
   - No conflicting constraints
   - Balance difficulty (not all high)

4. **Surprise factor:**
   - Include at least one unexpected constraint

### Selection Output

```markdown
## Constraint Selection

### Selected Constraints (3)

1. **paper_and_ink** (color_restrictions)
   - Description: Off-white background, dark text, minimal accent
   - Difficulty: LOW
   - Impact: Focuses attention on content
   - Synergy: Works well with print_friendly

2. **architecture** (interaction_sources)
   - Description: Interactions inspired by physical buildings and spaces
   - Difficulty: HIGH
   - Impact: Creates spatial, grounded interactions
   - Synergy: Works well with print_friendly

3. **print_first** (technical_constraints)
   - Description: Design for print, then adapt for screen
   - Difficulty: HIGH
   - Impact: Creates content-focused, portable designs
   - Synergy: Works well with paper_and_ink

### Constraint Compatibility
✅ All constraints compatible
✅ Difficulty balance: 1 LOW, 1 HIGH, 1 HIGH
✅ Category coverage: 3/5 categories represented
✅ No conflicting constraints
```

---

## Step 5: Prompt Enrichment

Transform original prompt into a detailed, anti-trend specification.

### Enrichment Template

```markdown
# Enriched UI Specification

## Original Intent
> "${original_prompt}"

## Detected Anti-Patterns (AVOID)
- ❌ [Pattern 1]
- ❌ [Pattern 2]
- ❌ [Pattern 3]

## Applied Constraints
- ✅ [Constraint 1]
- ✅ [Constraint 2]
- ✅ [Constraint 3]

## Enriched Brief
Create ${project_type} that:
- [Specific guidance 1]
- [Specific guidance 2]
- [Specific guidance 3]

## Suggested Alternatives
${for each blacklisted pattern:}
### Instead of ${pattern.name}
- Try: ${alternative_1}
- Or: ${alternative_2}
- Consider: ${alternative_3}
```

---

## Step 4: Constraint Selection

Load `constraints.json` (lazy-loaded by category) and select 2-4 creative constraints.

### Selection Algorithm

1. **Always include one from:**
   - `color_restrictions` OR `technical_constraints`

2. **Consider based on project type:**
   - Dashboard → `interaction_sources.architecture`
   - Portfolio → `technical_constraints.ascii_art`
   - E-commerce → `context_shifts.one_handed_mobile`

3. **Check compatibility:**
   - No conflicting constraints
   - Balance difficulty (not all high)

4. **Surprise factor:**
   - Include at least one unexpected constraint

### Selection Output

```markdown
## Constraint Selection

### Selected Constraints (3)

1. **paper_and_ink** (color_restrictions)
   - Description: Off-white background, dark text, minimal accent
   - Difficulty: LOW
   - Impact: Focuses attention on content
   - Synergy: Works well with print_friendly

2. **architecture** (interaction_sources)
   - Description: Interactions inspired by physical buildings and spaces
   - Difficulty: HIGH
   - Impact: Creates spatial, grounded interactions
   - Synergy: Works well with paper_and_ink

3. **print_first** (technical_constraints)
   - Description: Design for print, then adapt for screen
   - Difficulty: HIGH
   - Impact: Creates content-focused, portable designs
   - Synergy: Works well with paper_and_ink

### Constraint Compatibility
✅ All constraints compatible
✅ Difficulty balance: 1 LOW, 1 HIGH, 1 HIGH
✅ Category coverage: 3/5 categories represented
✅ No conflicting constraints
```

---

## Step 5: Prompt Enrichment

Transform original prompt into a detailed, anti-trend specification.

### Enrichment Template

```markdown
# Enriched UI Specification

## Original Intent
> "${original_prompt}"

## Detected Anti-Patterns (AVOID)
- ❌ [Pattern 1]
- ❌ [Pattern 2]
- ❌ [Pattern 3]

## Applied Constraints
- ✅ [Constraint 1]
- ✅ [Constraint 2]
- ✅ [Constraint 3]

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

## Step 6: Delegation to Implementer

The enriched specification is passed to `/build` with:

- Full anti-pattern blacklist
- Selected constraint set
- Enriched prompt with specific guidance
- Suggested alternatives for each anti-pattern

### Delegation Call

```bash
/build --from-spec="${enriched_spec}" --anti-patterns="${blacklist}" --constraints="${selected}"
```

The implementer receives:
- The original prompt
- Enriched specification
- Anti-pattern blacklist (what to avoid)
- Constraint requirements (what to include)
- Template selection (react-tailwind or vanilla)

---

## Options

| Flag | Description |
|------|-------------|
| `--analyze` | Only analyze prompt, show detected patterns, don't build |
| `--constraints` | Show which constraints would be selected, don't build |
| `--full` | Run complete workflow with verbose output |
| `--stack=<react|vanilla>` | Force specific tech stack for implementation |
| `--strict` | Reject prompt if too many anti-patterns detected |

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
1. **Monochrome**: Black, white, one gray only
2. **Architectural**: Room-based navigation
3. **Print First**: Must be readable when printed

**Result:** A dashboard that uses white space as architecture, numbers as typography, and feels like a well-designed annual report rather than another SaaS tool.

### Example 2: Portfolio Request

```bash
/ui "Sleek portfolio for a creative developer"
```

**Analysis:**
- 🚨 "Sleek" is high-risk trend bait
- ⚠️ "Portfolio" suggests parallax galleries
- ⚠️ "Creative developer" suggests glitch effects

**Constraints Applied:**
1. **ASCII Art**: Use only text characters
2. **System Fonts**: No web fonts
3. **Single File**: Everything in one HTML

**Result:** A portfolio that looks like a beautifully formatted README, loads instantly, and actually showcases code thinking rather than hiding behind flashy effects.

---

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

---

## Output

The orchestrator creates in `.smiteUI/`:

| File | Purpose |
|------|---------|
| `.smiteUI/analysis.md` | Prompt analysis and detected patterns |
| `.smiteUI/constraints.md` | Selected constraints with rationale |
| `.smiteUI/enriched-spec.md` | Full brief for implementer |
| `.smiteUI/anti-patterns.md` | Blacklist for implementer |

---

## Lazy Pattern Loading

For performance, anti-patterns are loaded lazily by category:

```javascript
const antiPatternsDB = {
  ui_effects: await loadCategory('ui-effects.json'),
  colors: await loadCategory('colors.json'),
  // ... loaded only when needed
}
```

This prevents loading full 12KB database on every command, keeping startup fast.

---

## Best Practices

1. **Be honest about your prompt** - Don't game system by avoiding trigger words
2. **Embrace constraints** - They're not limitations, they're liberation
3. **Trust the process** - The weird ideas often become the best ideas
4. **Iterate** - If the first result isn't right, run again with different constraints
5. **Learn from it** - Each constraint teaches you something about design

---

*Orchestrator v1.1.0 - Break patterns, create unexpected*
