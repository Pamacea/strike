# Constraint Selection - Deep Dive

> **Part of:** `/ui` skill
> **Purpose:** How constraints are selected, scored, and applied

---

## 🎯 Constraint Scoring System

Each constraint has a `score` attribute (0-100) based on four dimensions:

```javascript
constraintScore = {
  creativity: 0-30,      // How unusual is this constraint?
  difficulty: 0-25,      // How hard is it to implement?
  impact: 0-25,          // How much does it change the result?
  synergy: 0-20         // How well does it work with other constraints?
}
```

### Score Interpretation

| Score Range | Difficulty | Creativity | When to Use |
|-------------|-----------|------------|------------|
| **0-40** | Easy | Low | Quick iterations, learning |
| **41-60** | Medium | Medium | Standard projects |
| **61-80** | Hard | High | Challenging, unique results |
| **81-100** | Very Hard | Very High | Experimental, boundary-pushing |

---

## 📋 Constraint Categories

### 1. Color Restrictions

#### monochrome_true
- **Description:** Single color from gray scale
- **Difficulty:** LOW (score: 25)
- **Creativity:** 18/30
- **Impact:** 15/25
- **Synergy:** 12/20
- **Best for:** Minimalist interfaces, serious applications

#### single_accent
- **Description:** One accent color only, saturation <80%
- **Difficulty:** LOW (score: 30)
- **Creativity:** 20/30
- **Impact:** 18/25
- **Synergy:** 15/20
- **Best for:** Professional tools, dashboards

#### warm_only
- **Description:** No cool colors (blues, greens), only warm
- **Difficulty:** MEDIUM (score: 50)
- **Creativity:** 22/30
- **Impact:** 20/25
- **Synergy:** 10/20
- **Best for:** Breaking tech defaults

#### paper_and_ink
- **Description:** Off-white background, dark text, minimal accent
- **Difficulty:** LOW (score: 35)
- **Creativity:** 15/30
- **Impact:** 18/25
- **Synergy:** 12/20
- **Best for:** Editorial, print-inspired designs

#### inverted_high_contrast
- **Description:** Light text on dark, or reverse
- **Difficulty:** MEDIUM (score: 45)
- **Creativity:** 18/30
- **Impact:** 22/25
- **Synergy:** 15/20
- **Best for:** Breaking light-mode defaults

---

### 2. Interaction Sources

#### architectural
- **Description:** Interactions inspired by physical buildings/spaces
- **Difficulty:** HIGH (score: 78)
- **Creativity:** 27/30
- **Impact:** 23/25
- **Synergy:** 8/20
- **Best for:** Solid, structured interfaces

#### biological
- **Description:** Patterns from nature (growth, movement, organization)
- **Difficulty:** HIGH (score: 72)
- **Creativity:** 25/30
- **Impact:** 20/25
- **Synergy:** 12/20
- **Best for:** Organic, living interfaces

#### musical_structure
- **Description:** Rhythm, harmony, composition from music theory
- **Difficulty:** VERY HIGH (score: 85)
- **Creativity:** 28/30
- **Impact:** 22/25
- **Synergy:** 10/20
- **Best for:** Experimental, artistic interfaces

#### mechanical
- **Description:** Metaphors from machines, physics, engineering
- **Difficulty:** MEDIUM (score: 68)
- **Creativity:** 24/30
- **Impact:** 20/25
- **Synergy:** 14/20
- **Best for:** Tangible, tactile interfaces

#### textual_first
- **Description:** Typography and text structure drive interaction
- **Difficulty:** MEDIUM (score: 55)
- **Creativity:** 20/30
- **Impact:** 18/25
- **Synergy:** 18/20
- **Best for:** Content-heavy interfaces

---

### 3. Technical Constraints

#### css_only
- **Description:** No JavaScript, pure CSS interactivity
- **Difficulty:** MEDIUM (score: 60)
- **Creativity:** 18/30
- **Impact:** 15/25
- **Synergy:** 20/20
- **Best for:** Performance, progressive enhancement

#### system_fonts_only
- **Description:** No web fonts, system font stack only
- **Difficulty:** LOW (score: 20)
- **Creativity:** 12/30
- **Impact:** 10/25
- **Synergy:** 15/20
- **Best for:** Performance, native feel

#### no_images
- **Description:** No photographic images, CSS/typography only
- **Difficulty:** MEDIUM (score: 65)
- **Creativity:** 22/30
- **Impact:** 20/25
- **Synergy:** 12/20
- **Best for:** Pure CSS art, typography-focused

#### single_file
- **Description:** Everything in one HTML file
- **Difficulty:** HIGH (score: 70)
- **Creativity:** 15/30
- **Impact:** 12/25
- **Synergy:** 5/20
- **Best for:** Prototypes, demos, constraints

#### no_animations
- **Description:** Zero CSS animations or transitions
- **Difficulty:** LOW (score: 15)
- **Creativity:** 10/30
- **Impact:** 8/25
- **Synergy:** 20/20
- **Best for:** Performance, accessibility focus

#### ascii_art_only
- **Description:** ASCII art for all graphics
- **Difficulty:** VERY HIGH (score: 95)
- **Creativity:** 30/30
- **Impact:** 25/25
- **Synergy:** 0/20
- **Best for:** Extreme constraints, experimentation

---

### 4. Context Shifts

#### print_first
- **Description:** Design for print, then adapt for screen
- **Difficulty:** HIGH (score: 72)
- **Creativity:** 22/30
- **Impact:** 20/25
- **Synergy:** 15/20
- **Best for:** Editorial, content-focused

#### screen_reader_first
- **Description:** Optimize for screen readers, visual secondary
- **Difficulty:** MEDIUM (score: 58)
- **Creativity:** 18/30
- **Impact:** 22/25
- **Synergy:** 18/20
- **Best for:** Accessibility-first design

#### outdoor_visible
- **Description:** High contrast, readable in sunlight
- **Difficulty:** MEDIUM (score: 52)
- **Creativity:** 15/30
- **Impact:** 18/25
- **Synergy:** 20/20
- **Best for:** Utility, outdoor apps

#### slow_connection
- **Description:** Design for 3G, no lazy loading assumptions
- **Difficulty:** MEDIUM (score: 48)
- **Creativity:** 12/30
- **Impact:** 15/25
- **Synergy:** 18/20
- **Best for:** Global accessibility, performance

#### low_energy
- **Description:** Dark mode, reduced motion, minimal GPU
- **Difficulty:** LOW (score: 40)
- **Creativity:** 14/30
- **Impact:** 16/25
- **Synergy:** 18/20
- **Best for:** Battery life, accessibility

---

### 5. Structural Constraints (NEW)

#### linear_only
- **Description:** Single column, vertical layout only
- **Difficulty:** LOW (score: 30)
- **Creativity:** 10/30
- **Impact:** 12/25
- **Synergy:** 15/20
- **Best for:** Mobile-first, simplicity

#### no_headings
- **Description:** No h1-h6, size/weight only for hierarchy
- **Difficulty:** MEDIUM (score: 55)
- **Creativity:** 20/30
- **Impact:** 18/25
- **Synergy:** 10/20
- **Best for:** Challenging conventions

#### infinite_scroll
- **Description:** No pagination, continuous feed
- **Difficulty:** MEDIUM (score: 45)
- **Creativity:** 12/30
- **Impact:** 10/25
- **Synergy:** 15/20
- **Best for:** Content streams (but overused)

#### component_isolation
- **Description:** Each component is self-contained page
- **Difficulty:** HIGH (score: 68)
- **Creativity:** 22/30
- **Impact:** 18/25
- **Synergy:** 8/20
- **Best for:** Modularity, micro-frontends

#### max_width_extreme
- **Description:** Either 320px OR 1920px, nothing in between
- **Difficulty:** MEDIUM (score: 50)
- **Creativity:** 18/30
- **Impact:** 15/25
- **Synergy:** 12/20
- **Best for:** Challenging assumptions

---

## 🎲 Selection Algorithm

### Step 1: Filter by Compatibility

```javascript
function filterCompatible(selected, available) {
  return available.filter(constraint => {
    // Check conflicts with already selected
    for (let s of selected) {
      if (conflicts(s, constraint)) return false;
    }
    return true;
  });
}
```

### Step 2: Score by Context

```javascript
function scoreByContext(constraint, context) {
  let score = constraint.baseScore;

  // Boost if matches prompt keywords
  if (context.keywords.includes(constraint.category)) {
    score += 10;
  }

  // Boost if matches project type
  if (constraint.bestFor.includes(context.projectType)) {
    score += 15;
  }

  // Reduce if too difficult for timeline
  if (constraint.difficulty > context.maxDifficulty) {
    score -= 20;
  }

  return score;
}
```

### Step 3: Balance Difficulty

```javascript
function balanceDifficulty(selected, candidate, config) {
  const avgDifficulty = selected.reduce((sum, c) => sum + c.difficulty, 0) / selected.length;

  // If we have too many hard constraints, prefer easy
  if (avgDifficulty > config.maxAvgDifficulty && candidate.difficulty > 60) {
    return false;
  }

  // If we have too many easy constraints, prefer hard
  if (avgDifficulty < config.minAvgDifficulty && candidate.difficulty < 40) {
    return false;
  }

  return true;
}
```

### Step 4: Maximize Synergy

```javascript
function calculateSynergy(selected, candidate) {
  let totalSynergy = 0;

  for (let s of selected) {
    totalSynergy += getSynergy(s, candidate);
  }

  return totalSynergy / selected.length;
}
```

### Step 5: Select Top N

```javascript
function selectConstraints(available, min, max) {
  const sorted = available.sort((a, b) => b.finalScore - a.finalScore);
  const count = randomBetween(min, max);
  return sorted.slice(0, count);
}
```

---

## 📊 Selection Examples

### Example 1: "Modern SaaS Dashboard"

**Prompt Analysis:**
- Keywords: "modern", "SaaS", "dashboard"
- Risk: HIGH (7/10)
- Typical patterns: Cards, charts, dark theme

**Selected Constraints:**
1. **paper_and_ink** (score: 35) - Counters dark mode default
2. **architectural** (score: 78) - Breaks card grid pattern
3. **screen_reader_first** (score: 58) - Ensures accessibility

**Rationale:**
- Paper & ink prevents generic dark dashboards
- Architectural encourages structure over floating cards
- Screen reader first ensures inclusive design

---

### Example 2: "Minimal Portfolio Website"

**Prompt Analysis:**
- Keywords: "minimal", "portfolio"
- Risk: MEDIUM (5/10)
- Typical patterns: Centered text, grid gallery, smooth scroll

**Selected Constraints:**
1. **no_images** (score: 65) - Forces creative typography
2. **musical_structure** (score: 85) - Unique rhythm and flow
3. **linear_only** (score: 30) - Simple, focused narrative

**Rationale:**
- No images + minimal = pure typography showcase
- Musical structure gives unique pacing
- Linear only keeps focus on content

---

### Example 3: "E-commerce Product Page"

**Prompt Analysis:**
- Keywords: "e-commerce", "product"
- Risk: MEDIUM (6/10)
- Typical patterns: Card grids, carousels, sticky CTA

**Selected Constraints:**
1. **warm_only** (score: 50) - Breaks blue tech default
2. **mechanical** (score: 68) - Tangible product feel
3. **outdoor_visible** (score: 52) - High contrast, readable

**Rationale:**
- Warm colors create inviting atmosphere
- Mechanical gives physical product feel
- Outdoor visible ensures product is clear

---

## 🎯 Constraint Combinations

### High Synergy Combos

| Combo 1 | Combo 2 | Combo 3 | Synergy |
|---------|---------|---------|---------|
| paper_and_ink | architectural | print_first | 18/20 |
| system_fonts | css_only | no_animations | 20/20 |
| screen_reader_first | outdoor_visible | low_energy | 19/20 |
| no_images | ascii_art_only | textual_first | 15/20 |
| warm_only | mechanical | single_accent | 16/20 |

### Low Synergy Combos (Avoid)

| Combo 1 | Combo 2 | Synergy | Why Avoid |
|---------|---------|---------|-----------|
| infinite_scroll | component_isolation | 5/20 | Conflicting architectures |
| musical_structure | no_animations | 8/20 | Rhythm needs motion |
| max_width_extreme | outdoor_visible | 10/20 | Extreme width hurts visibility |

---

## 🔧 Configuration

```json
{
  "ui": {
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
    "difficulty_balance": {
      "min_avg": 40,
      "max_avg": 70
    },
    "feedback_learning": true
  }
}
```

---

*Constraint Selection Guide - How constraints are scored and selected*
