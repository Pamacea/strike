# Orchestrator Skill v2.3

## Mission

Transform generic UI prompts into unique, anti-trend specifications by detecting overused patterns, **generating new prompt-specific anti-patterns dynamically**, imposing creative constraints, and integrating adversarial self-challenge.

**New in v2.3:**
- **Parallel mode (`--parallel`)** - Orchestrator and Implementer run in parallel with shared state coordination

**v2.2 features:**
- **Dynamic anti-pattern generation** - Creates NEW patterns from semantic keywords
- **Demo mode (`--demo`)** - Lightweight, fast workflow with fewer tokens (v1-style)

**v2.1 features:** Integrated adversarial mode, self-challenge with alternatives, diagram explanations, pattern extraction.

---

## Core Workflow (Enhanced)

```
ORCHESTRATOR v2.2 WORKFLOW
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. RECEIVE          Raw prompt from user                       │
│       ↓              "Un site futuriste, nuageux et mélancolique"│
│                                                                 │
│  2. ANALYZE          Scan for trend-trap keywords               │
│       ↓              → "futuriste" detected (semantic)          │
│                      → "nuageux" detected (semantic)            │
│                      → "mélancolique" detected (semantic)       │
│                                                                 │
│  3. GENERATE (NEW)   Create NEW anti-patterns from keywords    │
│       ↓              → Semantic reasoning from keywords         │
│                      → Combine existing patterns                │
│                      → Web search for examples (if available)   │
│                      → EXPLICITLY SHOW to user                  │
│                                                                 │
│  4. DETECT           Load anti-patterns.json (static DB)        │
│       ↓              → Match prompt to pattern categories       │
│                      → Add static patterns to list              │
│                                                                 │
│  5. SELECT           Load constraints.json                       │
│       ↓              → Choose 2-4 creative constraints          │
│                      → Score constraints                        │
│                      → Resolve conflicts                        │
│                      → Balance difficulty                       │
│                                                                 │
│  6. SELF-CHALLENGE   Adversarial mode                           │
│       ↓              → Question own decisions                   │
│                      → Propose alternatives                     │
│                      → Debate trade-offs                        │
│                                                                 │
│  7. VALIDATE         Validate spec against schema               │
│       ↓              → JSON Schema validation                   │
│                      → Consistency checks                       │
│                                                                 │
│  8. ENRICH           Transform prompt                           │
│       ↓              → Add specific guidance                    │
│                      → Include ALL anti-pattern warnings        │
│                      → Suggest alternatives                     │
│                                                                 │
│  9. EXPLAIN (opt)    Diagram explanations                       │
│       ↓              → Visual workflow diagrams                 │
│                      → Decision rationale                       │
│                                                                 │
│ 10. LEARN (opt)      Extract patterns                           │
│       ↓              → Document successful combos               │
│                      → Build pattern library                    │
│                                                                 │
│ 11. DELEGATE         Call implementer with validated spec        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Demo Mode - Lightweight Workflow (NEW v2.2)

Use `--demo` flag for a **faster, lighter** workflow inspired by v1.

**When to use:** You want quick results without the heavy analysis, token usage, and detailed decision-making.

**What changes:**
- No dynamic pattern generation
- No constraint scoring system
- No adversarial self-challenge
- No schema validation
- Quick keyword matching only
- Simpler constraint selection

### Demo Workflow

```
ORCHESTRATOR DEMO MODE (--demo)
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. RECEIVE     Raw prompt                              │
│       ↓         "Create a modern dashboard"              │
│                                                         │
│  2. ANALYZE     Quick keyword scan                       │
│       ↓         → "modern" detected (high-risk)          │
│                                                         │
│  3. DETECT      Match to static anti-patterns DB        │
│       ↓         → Quick blacklist: 3-5 patterns          │
│                                                         │
│  4. SELECT     Pick 2-3 constraints (simple algo)       │
│       ↓         → No scoring, no complex resolution      │
│                                                         │
│  5. ENRICH      Transform prompt                         │
│       ↓         → Add anti-pattern warnings              │
│                  → Add constraint guidance               │
│                                                         │
│  6. DELEGATE    Call implementer                         │
└─────────────────────────────────────────────────────────┘
```

### Demo Output Format

```markdown
════════════════════════════════════════════════════════════════════════════════
  🔍 QUICK ANALYSIS (--demo mode)
════════════════════════════════════════════════════════════════════════════════

Detected: "modern" (HIGH risk keyword)

┌─────────────────────────────────────────────────────────────────────────────┐
│  🔴 RED FLAGS - Patterns to AVOID                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  ❌ card_grid                 Every dashboard does this                     │
│  ❌ glassmorphism_cards       Overused since 2022                          │
│  ❌ dark_mode_default         Lazy default                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  🟢 GREEN FLAGS - Selected Constraints                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ paper_and_ink             Crisp, readable                              │
│  ✅ architectural             Spatial, grounded                            │
└─────────────────────────────────────────────────────────────────────────────┘

[Proceeding to build...]
════════════════════════════════════════════════════════════════════════════════
```

### Comparison: Full vs Demo

| Aspect | Full Mode | Demo Mode (--demo) |
|--------|-----------|-------------------|
| Token usage | High | Low |
| Analysis depth | Deep semantic reasoning | Quick keyword match |
| Pattern generation | Dynamic + Static | Static only |
| Constraint selection | Scored, balanced | Simple pick |
| Self-challenge | Yes | No |
| Schema validation | Yes | No |
| Speed | Slower | **Fast** |
| Best for | Complex, unique results | Quick iterations |

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

## Step 3: Dynamic Anti-Pattern Generation (NEW)

**This is the key innovation v2.1+ - Generate NEW anti-patterns based on prompt keywords, not just match existing ones.**

### How It Works

When the user provides a prompt with specific style keywords ("futuriste", "nuageux", "mélancolique", etc.):

1. **Extract semantic keywords** - Beyond the standard high/medium/low risk lists
2. **Analyze keyword combinations** - Understand the aesthetic direction
3. **Generate NEW anti-patterns** - Create patterns that don't exist in the static database
4. **Search/Find examples** - Use web search or knowledge to find what's overused in this style
5. **Combine and mutate** - Mix existing patterns to create new ones
6. **Display explicitly to user** - Show what was detected and what should be avoided

### Keyword Extraction Algorithm

```javascript
function extractStyleKeywords(prompt) {
  const extracted = [];

  // 1. Standard keywords (from detection_rules)
  for (const keyword of standardKeywords) {
    if (prompt.includes(keyword)) {
      extracted.push({ word: keyword, type: 'standard', weight: getWeight(keyword) });
    }
  }

  // 2. Semantic extraction - NEW
  const semanticMatches = extractSemantic(prompt, [
    // Style/aesthetic words
    'futuriste|futuristic|cyber|tech|sci[- ]?fi',
    'nuageux|cloudy|hazy|misty|foggy|dreamy',
    'mélancolique|melancholic|somber|moody|dark',
    'vintage|rétro|retro|nostalgic|classic',
    'minimal|épuré|clean|simple|bare',
    'naturel|natural|organic|earthy|raw',
    'luxe|luxury|premium|expensive|high[- ]?end',
    'playful|fun|whimsical|quirky|colorful',
    'corporate|business|professional|enterprise|b2b',
    'industriel|industrial|brutal|raw|gritty'
  ]);

  extracted.push(...semanticMatches);

  // 3. Compound detection - NEW
  // Detect when multiple keywords create a specific aesthetic
  const compounds = detectCompounds(extracted);
  extracted.push(...compounds);

  return extracted;
}
```

### Dynamic Pattern Generation

```javascript
function generateDynamicAntiPatterns(keywords, projectType) {
  const dynamicPatterns = [];

  for (const keyword of keywords) {
    // Method 1: Semantic reasoning - Generate based on keyword meaning
    const semanticPatterns = reasonFromKeyword(keyword);
    dynamicPatterns.push(...semanticPatterns);

    // Method 2: Pattern combination - Mix existing patterns
    const combinations = combineExistingPatterns(keyword);
    dynamicPatterns.push(...combinations);

    // Method 3: Web search (when available) - Find what's overused
    const searchResults = searchOverusedExamples(keyword, projectType);
    dynamicPatterns.push(...searchResults);
  }

  // Deduplicate and score
  return rankAndDeduplicate(dynamicPatterns);
}
```

### Generation Methods

#### Method 1: Semantic Reasoning

Given a keyword like "futuriste", generate anti-patterns by reasoning:

```javascript
function reasonFromKeyword(keyword) {
  const reasoning = {
    'futuriste': [
      {
        name: 'cyberpunk_overload',
        category: 'ui_effects',
        why_avoid: 'Every "futuristic" site since 2018 has been neon pink/blue with glitch effects. It\'s exhausted.',
        examples: ['Neon outlines', 'Holographic UI', 'Data streams', 'Matrix rain'],
        severity: 'high'
      },
      {
        name: 'floating_holographic_elements',
        category: 'components',
        why_avoid: 'Glassmorphism plus neon = the default "futuristic" look. No one remembers these sites.',
        examples: ['Floating cards with glow', 'Holographic buttons', 'Projected UI elements'],
        severity: 'medium'
      },
      {
        name: 'tech_bg_noise',
        category: 'ui_effects',
        why_avoid: 'Subtle grid patterns + particles = every tech startup homepage.',
        examples: ['Grid backgrounds', 'Subtle particles', 'Tech overlays'],
        severity: 'low'
      }
    ],
    'nuageux': [
      {
        name: 'dreamy_blur_overload',
        category: 'ui_effects',
        why_avoid: 'Every "dreamy" site relies on blur filters. It becomes visual mush.',
        examples: ['Backdrop-filter everywhere', 'Soft focus backgrounds', 'Blur transitions'],
        severity: 'medium'
      },
      {
        name: 'pastel_gradient_washes',
        category: 'colors',
        why_avoid: '"Nuageux" usually means pastel gradients. It\'s become the default aesthetic for wellness/creative apps.',
        examples: ['Soft gradient backgrounds', 'Washes of color', 'Subtle color transitions'],
        severity: 'medium'
      }
    ],
    'mélancolique': [
      {
        name: 'moody_dark_with_accent',
        category: 'colors',
        why_avoid: 'Dark background + single accent color (usually red or blue) is the standard "moody" formula.',
        examples: ['Black + red', 'Navy + muted gold', 'Charcoal + teal'],
        severity: 'medium'
      },
      {
        name: 'somber_typography',
        category: 'typography',
        why_avoid: 'Light weight fonts, generous spacing, muted colors = the melancholic default.',
        examples: ['Thin sans-serif', 'Wide tracking', 'Muted text colors'],
        severity: 'low'
      }
    ]
  };

  return reasoning[keyword] || [];
}
```

#### Method 2: Pattern Combination

Combine existing anti-patterns to create new ones:

```javascript
function combineExistingPatterns(keyword) {
  const combinations = [];

  // Keyword "futuriste" might combine:
  if (keyword.includes('futur')) {
    combinations.push({
      name: 'neon_particles',  // neon_pink_blue + particle_canvas
      category: 'ui_effects',
      why_avoid: 'Combination of two exhausted trends. Double the cliché.',
      examples: ['Glowing particles', 'Neon dust', 'Colored particle systems'],
      severity: 'high',
      generated_from: ['neon_pink_blue', 'particle_canvas']
    });

    combinations.push({
      name: 'cyberpunk_hero',  // hero_generic + neon_pink_blue + glitch_text
      category: 'layouts',
      why_avoid: 'The ultimate SaaS cliché: generic hero with neon and glitch.',
      examples: ['Full-width hero with neon headline', 'Glitch CTA button', 'Dark gradient background'],
      severity: 'high',
      generated_from: ['hero_generic', 'neon_pink_blue', 'glitch_text']
    });
  }

  // Keyword "nuageux" might combine:
  if (keyword.includes('nuage') || keyword.includes('cloud')) {
    combinations.push({
      name: 'blurry_glass_cards',  // glassmorphism_cards + dreamy_blur
      category: 'components',
      why_avoid: 'Blur + glass = every "soft" aesthetic in 2023-2024.',
      examples: ['Frosted cards on gradient', 'Soft shadows everywhere', 'Floating blur elements'],
      severity: 'medium',
      generated_from: ['glassmorphism_cards', 'dreamy_blur_overload']
    });
  }

  return combinations;
}
```

#### Method 3: Web Search (When Available)

For unique keywords, search for what's overused:

```javascript
// When web search is available, find examples
async function searchOverusedExamples(keyword, projectType) {
  const searchQuery = `"${keyword}" ${projectType} website design trends 2024 2025`;
  // Would use web search to find:
  // - What portfolios are doing with this keyword
  // - What template sites offer for this style
  // - What design blogs list as trends

  // Then generate anti-patterns based on findings
  return generateFromSearchResults(results);
}
```

### Explicit Display Format

**CRITICAL: Always show this table to the user - EVERY TIME, with or without --demo flag.**

```markdown
════════════════════════════════════════════════════════════════════════════════
  🔍 STYLE ANALYSIS - DETECTED ANTI-PATTERNS
════════════════════════════════════════════════════════════════════════════════

Based on your prompt: "Un site futuriste, un peu nuageux et mélancolique"

┌─────────────────────────────────────────────────────────────────────────────┐
│  🔴 RED FLAGS - Patterns to AVOID (what everyone does)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ❌ cyberpunk_overload        Neon + glitch, exhausted since 2018           │
│  ❌ dreamy_blur_overload      Pastel gradients + blur everywhere            │
│  ❌ moody_dark_with_accent    Dark + single accent (melancholy formula)     │
│  ❌ blurry_glass_cards        Glass + blur = 2023-2024 soft cliché           │
│  ❌ particle_canvas           Every SaaS landing page has this               │
│  ❌ gradient_mesh             Apple copy, time to move on                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  🟢 GREEN FLAGS - Selected Constraints (your unique direction)              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ paper_and_ink              Crisp print aesthetic, counters blur         │
│  ✅ warm_only                  No neon, breaks cyberpunk default            │
│  ✅ architectural              Solid structure, not floating elements        │
└─────────────────────────────────────────────────────────────────────────────┘

[Proceeding to build with these constraints...]
════════════════════════════════════════════════════════════════════════════════
```

### Table Format Rules

**Red Flags (🔴 ❌):**
- Show patterns detected (dynamic + static)
- Format: `❌ pattern_name     Brief explanation why it's overused`
- Max 6-8 flags (don't overwhelm)

**Green Flags (🟢 ✅):**
- Show selected constraints
- Format: `✅ constraint_name    What it does / what it counters`
- 2-4 flags always

**Always display:**
- In full mode
- In demo mode
- Before building starts
- No flag needed - this is DEFAULT behavior

### Example: "Site Futuriste" Output

**User input:** `"Crée un site web futuriste avec des effets nuageux et une ambiance mélancolique"`

**Analysis:** Keywords: futuriste, nuageux, mélancolique | Risk: HIGH

┌─────────────────────────────────────────────────────────────────────────────┐
│  🔴 RED FLAGS - Patterns to AVOID                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  ❌ cyberpunk_overload        Neon + glitch = exhausted since 2018         │
│  ❌ dreamy_blur_overload      Pastel gradients + blur, visual mush          │
│  ❌ moody_dark_with_accent    Dark + single accent, melancholy formula     │
│  ❌ blurry_glass_cards        Glass + blur, 2023-2024 cliché                │
│  ❌ somber_typography         Thin fonts + wide spacing, moody default       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  🟢 GREEN FLAGS - Selected Constraints                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ paper_and_ink              Crisp print, counters dreamy blur           │
│  ✅ warm_only                  No neon, breaks cyberpunk default            │
│  ✅ architectural              Solid structure, not floating                 │
└─────────────────────────────────────────────────────────────────────────────┘

---

## Step 4: Static Anti-Pattern Detection (Database)

After dynamic generation, also load `anti-patterns.json` for additional patterns.

### Pattern Categories to Check

1. **UI Effects** - particles, glitch, scanlines, custom cursor, gradient mesh, blob morphing
2. **Colors** - neon pink-blue, gradient trendy, dark mode default, pastel everything
3. **Layouts** - hero generic, card grid, bento boxes, fullscreen sections, sticky everything
4. **Interactions** - parallax, scroll reveal, scroll hijacking, loading animations
5. **Typography** - acid distortion, brutalism helvetica, variable font tricks, giant headlines
6. **Components** - glassmorphism cards, neumorphism buttons, floating labels, rounded everything

### Combined Output Format

```markdown
## Complete Anti-Pattern List

### Dynamically Generated (Prompt-Specific)
[... list from Step 3 ...]

### Static Database (Always Apply)
[... list from static DB ...]

### Blacklist for Implementer
```json
[
  "cyberpunk_overload",
  "dreamy_blur_overload",
  "particle_canvas",
  "glassmorphism_cards",
  "parallax",
  "gradient_trendy"
]
```
```

---

## Step 5: Constraint Selection (New Scoring System)

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

## Step 6: Schema Validation (NEW)

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

## Step 7: Prompt Enrichment

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

## Step 8: Delegation to Implementer

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
| `--demo` | **NEW v2.2:** Lightweight mode - faster, fewer tokens, simpler decisions (v1-style) |
| `--analyze` | Only analyze prompt, show detected patterns, don't build |
| `--anti-patterns-only` | Show anti-patterns analysis WITHOUT proceeding to build |
| `--constraints` | Show which constraints would be selected, don't build |
| `--full` | Run complete workflow with verbose output |
| `--stack=<react\|vanilla>` | Force specific tech stack for implementation |
| `--strict` | Reject prompt if too many anti-patterns detected |
| `--score` | Show constraint scoring details (NEW) |
| `--validate` | Run schema validation only, don't build (NEW) |
| `--feedback=<id>` | Include previous feedback in selection (NEW) |

### Demo Mode (--demo)

**Use when:** You want quick results, lower token usage, faster iterations.

---

## Step 10: Parallel Mode (NEW v2.3)

### How Parallel Mode Works

Instead of sequential execution:
```
Orchestrator (analysis) → Implementer (build)
```

Parallel mode runs analysis and preparation simultaneously:
```
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: PARALLEL EXECUTION                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ORCHESTRATOR                    IMPLEMENTER                  │
│  ├─ Analyze prompt              ├─ Read template              │
│  ├─ Detect anti-patterns        ├─ Load components           │
│  ├─ Generate patterns          ├─ Prepare structure         │
│  ├─ Select constraints         ├─ Ready to build            │
│  └─ Enrich spec                └─ (waiting for spec)         │
│                                                              │
│  Shared via: .claude/.strike/parallel-state.json           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: COORDINATION + BUILD                               │
├─────────────────────────────────────────────────────────────┤
│  Merge enriched spec + implementer setup → Build            │
└─────────────────────────────────────────────────────────────┘
```

### When to Use Parallel Mode

**Use `--parallel` when:**
- Complex prompts with rich analysis (orchestrator takes time)
- Large projects where implementer preparation is non-trivial
- You want to save time (8-15% faster on average)

**Skip `--parallel` (use `--no-parallel`) when:**
- Simple prompts with quick analysis
- Iterating quickly on small changes
- Debugging the workflow

### Parallel Execution Template

```markdown
## Parallel Execution

Initializing shared state: .claude/.strike/parallel-state.json

Launching agents in parallel:

AGENT 1 (Orchestrator):
- Analyzing prompt keywords...
- Detecting anti-patterns...
- Generating dynamic patterns...
- Selecting constraints...
- Enriching specification...

AGENT 2 (Implementer):
- Reading template: react-tailwind...
- Loading component registry...
- Preparing output structure...
- Checking accessibility requirements...
- Ready to build...

Waiting for both agents to complete...

Coordination:
- Orchestrator: ✓ Completed (3 constraints selected)
- Implementer: ✓ Completed (structure ready)
- Merging enriched spec with implementer setup...

Proceeding to build with full context...
```

### Parallel State Schema

```json
{
  "session_id": "uuid",
  "status": "running|coordinating|building|completed",
  "orchestrator": {
    "status": "running|completed",
    "stage": "analyze|detect|generate|select|enrich",
    "anti_patterns": [],
    "constraints": []
  },
  "implementer": {
    "status": "running|completed",
    "stage": "read|check|prepare|ready",
    "template": "react-tailwind|vanilla",
    "structure_ready": false
  },
  "coordination": {
    "orchestrator_ready": false,
    "implementer_ready": false,
    "build_ready": false
  }
}
```

### Performance Comparison

| Mode | Orchestrator | Implementer | Coordination | Total |
|------|-------------|-------------|--------------|-------|
| Sequential | ~45s | ~15s | 0s | ~60s |
| Parallel | ~45s | ~15s (overlap) | ~5s | ~50s |

**Speedup:** ~17% on average for complex prompts.

---

## Step 11: Options (Enhanced)

---

## Step 10: Options (Enhanced)

**What it skips:**
- No dynamic pattern generation
- No constraint scoring
- No adversarial self-challenge
- No schema validation

```bash
# Full mode - deep analysis, more tokens
/ui "Modern dashboard"

# Demo mode - quick and light
/ui --demo "Modern dashboard"
```

### Default Behavior v2.2: Red/Green Flag Table ALWAYS Shown

**Starting v2.2, the Red/Green flag table is displayed BY DEFAULT - every time, full or demo mode.**

```markdown
════════════════════════════════════════════════════════════════════════════════
  🔍 STYLE ANALYSIS
════════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│  🔴 RED FLAGS - Patterns to AVOID (what everyone does)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ❌ pattern_1      Brief explanation                                       │
│  ❌ pattern_2      Brief explanation                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  🟢 GREEN FLAGS - Selected Constraints (your unique direction)              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ constraint_1    What it does                                           │
│  ✅ constraint_2    What it does                                           │
└─────────────────────────────────────────────────────────────────────────────┘
════════════════════════════════════════════════════════════════════════════════
```

This appears BEFORE building, every single run, in BOTH full and demo modes.

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

Settings in `.claude/.strike/config.json`:

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

The orchestrator creates in `.claude/.strike/`:

| File | Purpose |
|------|---------|
| `.claude/.strike/analysis.md` | Prompt analysis and detected patterns |
| `.claude/.strike/constraints.md` | Selected constraints with scores and rationale |
| `.claude/.strike/enriched-spec.json` | **NEW:** Validated JSON specification |
| `.claude/.strike/enriched-spec.md` | Full brief for implementer (readable) |
| `.claude/.strike/anti-patterns.md` | Blacklist for implementer |

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

*Orchestrator v2.2 - Dynamic anti-pattern generation, demo mode (lightweight), explicit display*
