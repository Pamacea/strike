---
description: "Generate unique UI by applying anti-patterns and creative constraints - Break the trends, create the unexpected"
argument-hint: "[--analyze|--constraints|--full] '<prompt>'"
---

# /ui - Anti-Trend UI Orchestrator

Transform generic UI prompts into unique, thoughtful interfaces by detecting anti-patterns and imposing creative constraints.

## 🎯 What This Does

When you say `/ui "make me a modern dashboard"`, this command:

1. **Analyzes your prompt** for trend-trap keywords ("modern", "sleek", "minimal")
2. **Detects anti-patterns** you might fall into (glassmorphism, card grids, gradients)
3. **Selects creative constraints** to push you in unexpected directions
4. **Enriches your prompt** with specific, anti-trend guidance
5. **Delegates to implementer** with the enriched specification

## Usage

```bash
# Full workflow (default)
/ui "Create a dashboard for analytics"

# Just analyze prompt (don't build yet)
/ui --analyze "A modern SaaS landing page"

# See which constraints would be applied
/ui --constraints "Sleek portfolio website"

# Full build with all steps
/ui --full "E-commerce product page"
```

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

Based on your prompt, the orchestrator identifies patterns to avoid:

- **UI Effects**: Particles, glitch text, custom cursors, blob morphing
- **Colors**: Neon pink-blue, trendy gradients, dark-mode-by-default
- **Layouts**: Generic heroes, card grids, fullscreen sections
- **Interactions**: Parallax, scroll reveal, scroll hijacking
- **Typography**: Acid distortions, giant headlines, gradient text
- **Components**: Glassmorphism, neumorphism, rounded everything

### Step 3: Constraint Selection

The orchestrator selects 2-4 creative constraints:

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

### Step 4: Prompt Enrichment

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
- ✅ Paper & Ink: Off-white background, dark text, minimal accent
- ✅ Architectural: Navigation inspired by building circulation
- ✅ Print First: Must be readable when printed

## Enriched Brief
Create an analytics dashboard that:
- Uses a warm off-white (#FAF9F6) as primary background
- Employs a single accent color (choose one: burnt sienna, forest green, or deep navy)
- Organizes data in a "room" metaphor - main hall for overview, corridors to details
- Prioritizes information hierarchy so it's scannable in 5 seconds
- Works beautifully as a printed report (no hover-dependent information)
- Uses system fonts only for fastest load
- Avoids cards in favor of clear sections with generous whitespace
```

### Step 5: Delegation to Implementer

The enriched specification is passed to `/build` with:

- Full anti-pattern blacklist
- Selected constraint set
- Enriched prompt with specific guidance
- Suggested alternatives for each anti-pattern

---

## Options

| Flag | Description |
|------|-------------|
| `--analyze` | Only analyze prompt, show detected patterns, don't build |
| `--constraints` | Show which constraints would be selected, don't build |
| `--full` | Run complete workflow with verbose output |
| `--stack=<react\|vanilla>` | Force specific tech stack for implementation |
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
3. **Print First**: Must work on paper

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

### Example 3: E-commerce Request

```bash
/ui "Product page for premium headphones"
```

**Analysis:**
- ⚠️ "Premium" suggests dark mode + gradients
- ⚠️ "Headphones" suggests Apple-style hero
- ⚠️ "Product page" suggests parallax scrolling

**Constraints Applied:**
1. **Warm Only**: No blues, greens, or purples
2. **Photography Principles**: Rule of thirds, depth of field
3. **One-Handed Mobile**: Reachable with one thumb

**Result:** A product page with earth tones, compositional balance, and an interaction model that feels intimate rather than performative.

---

## Integration with Implementer

After enrichment, the orchestrator calls:

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

## Philosophy

**Why anti-patterns?**
Modern UI has converged on a narrow set of "safe" choices. Glassmorphism, card grids, neon gradients - they're not bad, they're just everywhere. When everything looks the same, nothing stands out.

**Why constraints?**
Limitations breed creativity. When you can't use gradients, you discover the power of typography. When you can't use images, you learn what CSS can really do. When you design for print, you discover true hierarchy.

**The goal:**
Not to be contrarian for its own sake, but to push past the first obvious solution and find something that actually fits the content, the users, and the context.

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

The orchestrator creates:

| File | Purpose |
|------|---------|
| `.smiteUI/analysis.md` | Prompt analysis and detected patterns |
| `.smiteUI/constraints.md` | Selected constraints with rationale |
| `.smiteUI/enriched-spec.md` | Full enriched specification |
| `.smiteUI/anti-patterns.md` | Blacklist for implementer |

---

## Best Practices

1. **Be honest about your prompt** - Don't game the system by avoiding trigger words
2. **Embrace the constraints** - They're not limitations, they're liberation
3. **Trust the process** - The weird ideas often become the best ideas
4. **Iterate** - If the first result isn't right, run again with different constraints
5. **Learn from it** - Each constraint teaches you something about design

---

*smiteUI Orchestrator v1.0.0 - Break the patterns, create the unexpected*
