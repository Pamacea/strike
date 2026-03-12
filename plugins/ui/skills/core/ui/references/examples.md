# UI Generation Examples - Real-World Workflows

> **Part of:** `/ui` skill
> **Purpose:** Concrete examples of UI generation in action

---

## 🚀 Quick Examples

### Example 1: Simple Dashboard

```bash
# Command
/ui "analytics dashboard with user metrics"

# Execution
[ANALYZE] Detected: "analytics" (medium), "dashboard" (high)
[ANTI-PATTERNS] Found: dashboard_cards, dark_mode_default, neon_colors
[CONSTRAINTS] Selected: paper_and_ink (35), architectural (78)
[BUILD] Created: ./output/react-tailwind/

# Result
✓ Unique paper-and-ink aesthetic
✓ Architectural Room components (no card grid)
✓ High contrast, excellent readability
✓ 8KB gzipped
```

---

### Example 2: Portfolio Website

```bash
# Command
/ui --step "minimalist photographer portfolio"

# Execution (interactive)
PHASE 1: ANALYSIS → PAUSED
> remove "minimalist" (too generic)
> continue

PHASE 2: ANTI-PATTERNS → PAUSED
> add centered_hero_overkill
> continue

PHASE 3: CONSTRAINTS → PAUSED
> accept
> continue

PHASE 4: SPEC → PAUSED
> build

# Result
✓ Step-by-step user control
✓ Custom constraints applied
✓ No centered hero, asymmetric layout
✓ ./output/vanilla/ ready
```

---

### Example 3: E-Commerce with Teams

```bash
# Command
/ui --team "full e-commerce platform with product catalog, cart, checkout"

# Execution (parallel)
[TEAM] Creating ui-abc123 with 4 agents...
[orchestrator] Analyzing "e-commerce", "catalog", "checkout"...
[build] Loading component registry...
[adversarial] Challenging: too many constraints for checkout flow?
[reviewer] Checking accessibility per-component...

[100%] All agents complete!

# Outputs
Orchestrator: spec.json, constraints.md
Build: ./output/react-tailwind/
Adversarial: challenge-review.md
Reviewer: accessibility-report.md

# Result
✓ 2x faster than sequential
✓ Adversarial caught checkout constraint issue
✓ WCAG AA compliant
✓ 10KB gzipped
```

---

## 🎯 Flag Combinations

### --demo (Lightweight)

```bash
/ui --demo "quick landing page"

# What changes:
- No dynamic pattern generation
- No constraint scoring
- Quick keyword match only
- Simpler constraint selection (2-3 constraints)
- Faster execution (~60% time saved)

# Best for:
- Quick iterations
- Prototypes
- Simple projects
```

### --analyze (Analysis Only)

```bash
/ui --analyze "modern SaaS dashboard"

# Output:
┌─────────────────────────────────────┐
│  ANALYSIS ONLY - NO BUILD           │
├─────────────────────────────────────┤
│ Keywords: modern (HIGH), SaaS (MED) │
│ Risk: 7/10 - Apply strong constraints│
│ Typical: Cards, charts, dark theme  │
│ Suggested: Architectural, print     │
├─────────────────────────────────────┤
│ Anti-patterns: 5 patterns detected  │
│ Constraints: 3 recommended          │
└─────────────────────────────────────┘

# File: .claude/.strike/analysis.md
```

### --constraints (Preview Constraints)

```bash
/ui --constraints "portfolio for architect"

# Output:
┌─────────────────────────────────────┐
│  CONSTRAINT PREVIEW                 │
├─────────────────────────────────────┤
│ 1. paper_and_ink (35)               │
│    Off-white, dark text, print feel │
│                                     │
│ 2. architectural (78)               │
│    Building-inspired interactions   │
│                                     │
│ 3. linear_only (30)                 │
│    Single column, vertical flow     │
└─────────────────────────────────────┘

# Would you like to proceed with these?
```

### --full (Verbose Output)

```bash
/ui --full "complex application dashboard"

# What changes:
- Maximum logging
- Show all intermediate steps
- Display constraint scores
- Show anti-pattern reasoning
- Full decision trail

# Output: 50+ lines of detailed logs
```

### --score (Show Scoring)

```bash
/ui --score "minimal blog"

# Output:
┌─────────────────────────────────────┐
│  CONSTRAINT SCORING BREAKDOWN       │
├─────────────────────────────────────┤
│ no_images (score: 65)               │
│   creativity: 22/30                 │
│   difficulty: 20/25                 │
│   impact: 15/25                     │
│   synergy: 8/20                     │
│   Total: 65/100                     │
├─────────────────────────────────────┤
│ musical_structure (score: 85)       │
│   creativity: 28/30                 │
│   difficulty: 23/25                 │
│   impact: 20/25                     │
│   synergy: 14/20                    │
│   Total: 85/100                     │
└─────────────────────────────────────┘
```

---

## 🔥 Real-World Cases

### Case 1: Breaking SaaS Convention

**Prompt:**
```bash
/ui "modern SaaS landing page with pricing"
```

**What Usually Happens (Trend-Trap):**
- Hero section: Centered text, gradient background
- Features: 3-column card grid
- Pricing: 3 cards, highlighted middle option
- Colors: Blue/purple gradient, dark mode
- Typography: Inter, large headlines

**What /ui Does:**
```
[ANALYSIS]
Keywords: "modern" (HIGH), "SaaS" (HIGH), "pricing" (MED)
Risk: 8/10 - Very high trend convergence

[ANTI-PATTERNS]
❌ saas_generic_hero (centered text over gradient)
❌ card_grid_features (3 equal feature cards)
❌ pricing_table_cards (highlighted middle card)
❌ gradient_blue_purple (tech default)
❌ inter_font (overused)
❌ dark_mode_default (lazy default)

[CONSTRAINTS]
✅ warm_only (breaks blue default)
✅ architectural (solid structure)
✅ screen_reader_first (a11y focus)

[BUILD]
- Hero: Left-aligned text, warm palette
- Features: Architectural sections (no cards)
- Pricing: Table layout, warm highlights
- Typography: Satoshi (not Inter)
- Colors: Warm grays + amber accent

Result: Unique SaaS landing that stands out
```

---

### Case 2: Portfolio with True Constraints

**Prompt:**
```bash
/ui --step "designer portfolio"
```

**Interactive Process:**
```
PHASE 1: ANALYSIS
Detected: "designer" (context), "portfolio" (medium)
Risk: 5/10
> add "focus on typography work"
> continue

PHASE 2: ANTI-PATTERNS
❌ generic_portfolio (centered hero + grid)
❌ minimal_typography_overuse (giant headings)
❌ smooth_scroll_parallax
> add "carousel_thumbnails"
> continue

PHASE 3: CONSTRAINTS
1. no_images (65) - Force typography focus
2. musical_structure (85) - Unique pacing
3. linear_only (30) - Simple narrative
> replace musical_structure with textual_first
> accept

PHASE 4: SPEC
Project: Portfolio
Stack: react-tailwind
Avoid: Generic hero, grid gallery, parallax
Apply: No images, textual first, linear only
> build

[BUILD]
Created: ./output/react-tailwind/
- Hero: Pure typography, no images
- Gallery: Text descriptions with CSS patterns
- About: Linear narrative, strong typography
- Contact: Simple form, no decorative elements

Bundle: 6KB gzipped (excellent!)
A11y: WCAG AAA compliant
```

---

### Case 3: Complex App with Teams

**Prompt:**
```bash
/ui --team --full "project management tool with kanban, calendar, team chat"
```

**Team Execution:**
```
[TEAM CREATION]
Team: ui-pm-123
Members:
- orchestrator (lead)
- build (UI implementation)
- adversarial (challenges decisions)
- reviewer (quality & a11y)

[PARALLEL EXECUTION]

Orchestrator Agent:
[ANALYZE] "project management", "kanban", "calendar", "chat"
[DETECT] 8 anti-patterns from kanban/calendar app trends
[SELECT] 4 constraints with high synergy
[ENRICH] Spec created with comprehensive brief

Build Agent (parallel):
[LOAD] Component registry for productivity apps
[PLAN] Kanban + Calendar + Chat integration
[BUILD] React/Tailwind implementation
[VALIDATE] Anti-pattern compliance: 100%

Adversarial Agent (parallel):
[CHALLENGE] "textual_first constraint with kanban?"
[PROPOSE] Alternative: mechanical + warm_only
[STRESS TEST] Evaluate edge cases
[DECISION] Proceed with safeguards

Reviewer Agent (parallel):
[A11Y] Keyboard navigation check
[QUALITY] Bundle size: 12KB (good)
[DOCS] Component documentation complete

[SYNTHESIS]
All agents complete!
Output: ./output/react-tailwind/
Metrics: 12KB gzipped, WCAG AA+
Time: 65s (vs 120s sequential - 1.85x faster)
```

---

## 📊 Build Results Examples

### Build Result JSON

```json
{
  "version": "3.0.0",
  "timestamp": "2025-02-10T15:30:00Z",
  "project": {
    "prompt": "analytics dashboard",
    "stack": "react-tailwind",
    "anti_patterns": ["dashboard_cards", "dark_mode_default"],
    "constraints": ["paper_and_ink", "architectural"]
  },
  "metrics": {
    "bundle_size": {
      "raw": "28KB",
      "gzipped": "8KB",
      "rating": "excellent"
    },
    "accessibility": {
      "wcag_level": "AA",
      "score": 95,
      "issues": []
    },
    "anti_pattern_compliance": {
      "detected": 5,
      "avoided": 5,
      "compliance": "100%"
    },
    "constraint_compliance": {
      "selected": 2,
      "applied": 2,
      "compliance": "100%"
    }
  },
  "output": {
    "path": "./output/react-tailwind/",
    "files": [
      "src/App.tsx",
      "src/components/ui/...",
      "src/lib/utils.ts",
      "index.html"
    ]
  },
  "validation": {
    "status": "passed",
    "checks": [
      "anti_pattern_validation",
      "accessibility_check",
      "bundle_size_check",
      "schema_validation"
    ]
  }
}
```

---

## 🎨 Before/After Comparisons

### Case: "Modern Dashboard"

**Before (Generic Trend-Following):**
```
❌ Dark theme by default
❌ Card grid for metrics
❌ Neon blue accents
❌ Inter font
❌ Glassmorphism cards
❌ Generic hero section
❌ Smooth scroll reveal
```

**After (Anti-Trend with /ui):**
```
✅ Paper & ink (off-white, dark text)
✅ Architectural Room components
✅ Warm amber accent (breaks blue default)
✅ Geist Mono for data
✅ Solid cards with minimal shadows
✅ Asymmetric hero (left-aligned)
✅ No animations (CSS only constraint)
```

**Result:**
- Stands out from 95% of dashboards
- 40% faster (no animations)
- Better accessibility (high contrast)
- Unique aesthetic

---

## 💡 Pro Tips

### 1. Use Step Mode for Learning

```bash
# Learn how the system thinks
/ui --step "any prompt"

# Review each phase carefully
# See how constraints are selected
# Understand anti-pattern detection
```

### 2. Use Demo for Quick Iterations

```bash
# Fast feedback loop
/ui --demo "landing page v1"
/ui --demo "landing page v2"
/ui --demo "landing page v3"

# Then use full for final version
/ui --full "landing page final"
```

### 3. Use Teams for Complex Projects

```bash
# Only worth it for 3+ features
/ui --team "app with billing, analytics, settings"

# Skip for simple pages
/ui "simple contact page"  # Don't use --team
```

### 4. Combine Flags Effectively

```bash
# Interactive + full control
/ui --step --full "complex app"

# Teams with explanation
/ui --team --explain "enterprise dashboard"

# Demo for speed, score for learning
/ui --demo --score "quick prototype"
```

### 5. Always Check Build Results

```bash
# After build, review:
cat .claude/.strike/build-result.json

# Check metrics:
- Bundle size (goal: <10KB gzipped)
- Accessibility (goal: WCAG AA+)
- Compliance (goal: 100%)
```

---

## 🚨 Troubleshooting

### Problem: "Too many constraints"

**Solution:**
```bash
# Use --demo for simpler selection
/ui --demo "your prompt"

# Or manually adjust
/ui --step "your prompt"
# At constraints phase: remove "difficult" constraints
```

### Problem: "Result too experimental"

**Solution:**
```bash
# Lower anti-trend strength in config
# Or use fewer constraints
/ui --demo "your prompt"  # Demo selects 2-3 easier constraints
```

### Problem: "Build failed validation"

**Solution:**
```bash
# Check build-result.json for specific issues
# Review anti-patterns.md for violations
# Adjust constraints with --step mode
```

### Problem: "Teams mode timeout"

**Solution:**
```bash
# Reduce team size (default 4 → 2)
# Or use sequential mode
/ui "your prompt"  # No --team flag
```

---

*UI Examples - Real-world workflows and outcomes*
