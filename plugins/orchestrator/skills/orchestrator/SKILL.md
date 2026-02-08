# Orchestrator Skill

## Mission

Transform generic UI prompts into unique, anti-trend specifications by detecting overused patterns, applying creative constraints, and generating enriched briefs for the implementer.

## Core Philosophy

**The problem:** Modern UI has converged on a narrow set of "safe" choices. Every dashboard has cards. Every landing page has a hero. Every portfolio has parallax. When everything looks the same, nothing communicates.

**The solution:** Systematic pattern detection + creative constraint imposition = unique, thoughtful interfaces that actually fit their context.

---

## Core Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR WORKFLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. RECEIVE          Raw prompt from user                       │
│       ↓              "Create a modern dashboard"                │
│                                                                 │
│  2. ANALYZE          Scan for trend-trap keywords               │
│       ↓              → "modern" detected (high-risk)            │
│                      → "dashboard" detected (pattern-prone)     │
│                                                                 │
│  3. DETECT           Load anti-patterns.json                    │
│       ↓              → Match prompt to pattern categories       │
│                      → Build blacklist of what to AVOID         │
│                                                                 │
│  4. SELECT           Load constraints.json                      │
│       ↓              → Choose 2-4 creative constraints          │
│                      → Ensure compatibility                     │
│                      → Balance difficulty                       │
│                                                                 │
│  5. ENRICH           Transform prompt                           │
│       ↓              → Add specific guidance                    │
│                      → Include anti-pattern warnings            │
│                      → Suggest alternatives                     │
│                                                                 │
│  6. DELEGATE         Call implementer with enriched spec        │
│                      → Pass blacklist                           │
│                      → Pass constraints                         │
│                      → Pass template selection                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Prompt Reception

Receive the raw prompt and preserve original intent.

**Input:** User's natural language request
**Output:** Stored original prompt for reference

```markdown
## Original Request
"${user_prompt}"

## Timestamp
${current_time}

## Context
- Previous builds: ${previous_count}
- User preferences: ${stored_preferences}
```

---

## Step 2: Prompt Analysis

Scan the prompt for keywords that indicate trend-following.

### Keyword Categories

**High-Risk (strong anti-pattern trigger):**
```
modern, trendy, sleek, futuristic, stunning, beautiful, 
minimal but impactful, cutting-edge, next-gen, innovative
```

**Medium-Risk (moderate trigger):**
```
clean, professional, elegant, smooth, polished, 
refined, sophisticated, premium
```

**Context-Dependent (analyze surrounding words):**
```
simple, minimalist, bold, unique, creative, dynamic
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

Load `data/anti-patterns.json` and match against prompt/project type.

### Pattern Categories to Check

1. **UI Effects**
   - particle_canvas, glitch_text, scanlines
   - custom_cursor, gradient_mesh, blob_morphing

2. **Colors**
   - neon_pink_blue, gradient_trendy
   - dark_mode_default, pastel_everything

3. **Layouts**
   - hero_generic, card_grid, bento_boxes
   - fullscreen_sections, sticky_everything

4. **Interactions**
   - parallax, scroll_reveal, hover_effects_classic
   - scroll_hijacking, loading_animations

5. **Typography**
   - distortion_acid, brutalism_helvetica
   - variable_font_tricks, giant_headlines, gradient_text

6. **Components**
   - glassmorphism_cards, neumorphism_buttons
   - floating_labels, rounded_everything, icon_overload

### Detection Logic

```javascript
function detectAntiPatterns(prompt, projectType) {
  const detected = [];
  
  // Direct keyword matching
  for (const [category, patterns] of Object.entries(antiPatterns.categories)) {
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
  
  // Combination warnings
  const combos = checkCombinations(detected);
  
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
   
3. **dark_mode_default** (colors) - SEVERITY: low
   - Why: "Dark mode is fine, but it's become the lazy default."

### Combination Warning
⚠️ "card_grid + glassmorphism_cards" - This combo was peak 2022. Consider a different direction.

### Blacklist for Implementer
```json
["card_grid", "glassmorphism_cards", "dark_mode_default", "parallax", "gradient_trendy"]
```
```

---

## Step 4: Constraint Selection

Load `data/constraints.json` and select 2-4 constraints.

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
   - Prefer less-common combinations

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
   - Metaphors: thresholds, circulation, sight lines, materials
   - Difficulty: HIGH
   - Impact: Creates spatial, grounded interactions

3. **print_first** (technical_constraints)
   - Description: Design for print, then adapt for screen
   - Difficulty: HIGH
   - Impact: Creates content-focused, portable designs

### Constraint Compatibility
✅ All constraints compatible
✅ Difficulty balance: 1 LOW, 0 MEDIUM, 2 HIGH
✅ Category coverage: 3/5 categories represented
```

---

## Step 5: Prompt Enrichment

Transform the original prompt into a detailed, anti-trend specification.

### Enrichment Template

```markdown
# Enriched UI Specification

## Original Intent
> "${original_prompt}"

## Anti-Pattern Blacklist

### ❌ NEVER USE
${for each detected pattern:}
- **${pattern.name}**: ${pattern.why_avoid}
${end for}

### ⚠️ USE WITH CAUTION
${lower severity patterns}

## Creative Constraints

### Applied Constraints
${for each constraint:}
#### ${constraint.name}
- **What:** ${constraint.description}
- **Why:** Forces ${constraint.impact}
- **How:** ${specific_implementation_guidance}
${end for}

## Enriched Brief

Create ${project_type} that:

### Visual Direction
${based on color_restrictions constraint}
- Use ${specific_colors}
- Avoid ${blacklisted_color_patterns}
- Emphasize ${what_color_constraint_prioritizes}

### Interaction Model
${based on interaction_sources constraint}
- Navigation feels like ${metaphor}
- Transitions inspired by ${metaphor}
- Feedback echoes ${metaphor}

### Technical Approach
${based on technical_constraints}
- ${specific_technical_requirements}
- ${performance_targets}
- ${accessibility_requirements}

### Context Considerations
${based on context_shifts if any}
- Must work in ${context}
- Prioritize ${context_requirements}

## Suggested Alternatives

${for each blacklisted pattern:}
### Instead of ${pattern.name}
- Try: ${alternative_1}
- Or: ${alternative_2}
- Consider: ${alternative_3}
${end for}

## Success Criteria
- [ ] No blacklisted patterns used
- [ ] All constraints satisfied
- [ ] Passes 5-second clarity test
- [ ] Works in all specified contexts
- [ ] Feels intentional, not trendy
```

---

## Step 6: Delegation to Implementer

Pass the enriched specification to `/build`.

### Delegation Call

```bash
/build --from-spec="${spec_path}" \
       --anti-patterns="${blacklist}" \
       --constraints="${constraints}" \
       --template="${react-tailwind|vanilla}"
```

### Passed Data

```json
{
  "original_prompt": "Create a modern dashboard",
  "enriched_spec_path": ".smiteUI/enriched-spec.md",
  "anti_patterns": {
    "blacklist": ["card_grid", "glassmorphism_cards", ...],
    "severity_map": {...}
  },
  "constraints": {
    "selected": ["paper_and_ink", "architecture", "print_first"],
    "details": {...}
  },
  "template": "react-tailwind",
  "validation_rules": {
    "reject_if_uses": [...],
    "require_features": [...]
  }
}
```

---

## Data Files

### data/anti-patterns.json
- 6 categories of patterns to avoid
- ~40 specific patterns with severity ratings
- Detection rules and combination warnings

### data/constraints.json
- 5 constraint types
- ~30 specific constraints
- Selection rules and compatibility matrix

---

## Integration Points

### Reads From
- User prompt (input)
- `data/anti-patterns.json`
- `data/constraints.json`

### Writes To
- `.smiteUI/analysis.md`
- `.smiteUI/constraints.md`
- `.smiteUI/enriched-spec.md`

### Calls
- `implementer:/build` with enriched specification

---

## Error Handling

### Prompt Too Vague
```
⚠️ Prompt too vague for meaningful analysis.
Add context: What is this for? Who uses it? What should it do?
```

### Maximum Anti-Patterns
```
🚨 Prompt triggers all major anti-patterns.
This describes 80% of websites. Be more specific about what makes your project unique.
```

### Constraint Conflict
```
⚠️ Selected constraints are incompatible.
Swapping ${constraint_a} for ${constraint_b} to maintain coherence.
```

---

## Configuration

Settings can override defaults in `.smiteUI/config.json`:

```json
{
  "orchestrator": {
    "min_constraints": 2,
    "max_constraints": 4,
    "strict_mode": false,
    "always_include": ["color_restrictions"],
    "never_include": [],
    "anti_pattern_severity_threshold": "medium",
    "surprise_factor": 0.3
  }
}
```

---

## Best Practices

1. **Don't fight the constraints** - They're not obstacles, they're creative fuel
2. **Read the "why_avoid"** - Understanding why helps find better alternatives
3. **Combine unexpected constraints** - Architectural + ASCII creates unique results
4. **Document your reasoning** - Note why you chose to break (or follow) a constraint
5. **Iterate** - First constraint set not working? Generate a new one

---

*Orchestrator Skill v1.0.0 - The trend-detector and constraint-imposer*
