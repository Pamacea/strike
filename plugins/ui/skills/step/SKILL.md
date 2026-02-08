---
name: step
description: Interactive step mode for ui plugin - Pause at each phase for user review and adjustment
version: 1.1.0
---

# UI Step Mode v3.1

## Mission

Transform the automated workflow into an interactive experience where the user controls each phase, reviews outputs, and makes adjustments before proceeding.

---

## What is Step Mode?

Step mode transforms `/ui` from an automated pipeline into an **interactive workshop**:

- **Phase-by-phase execution** - Each phase completes and pauses for your review
- **User approval required** - Nothing proceeds without your consent
- **Full adjustment capability** - Modify keywords, patterns, constraints at any point
- **State preservation** - All your adjustments are tracked and preserved
- **Learning-friendly** - See how each decision affects the final result

---

## When to Use Step Mode

### Perfect For:
- **First-time users** - Learn how the anti-pattern system works
- **Stakeholder-driven projects** - Get approval at each stage
- **Complex requirements** - Fine-tune constraints based on specific needs
- **Exploration** - Experiment with different combinations
- **Teaching** - Demonstrate the workflow to others

### Skip When:
- **Quick iterations** - You know what you want
- **Simple projects** - Straightforward requirements
- **Trusted patterns** - Reusing proven constraint combinations

---

## Phase Workflow

```
STEP MODE PHASES
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  PHASE 1: ANALYSIS                                         │
│  • Detected keywords from prompt                            │
│  • Risk assessment score                                     │
│  • Project type detection                                   │
│  • >>> PAUSED - Review? <<<                                 │
│                                                             │
│       ↓ [user: continue/adjust/add/remove]                   │
│                                                             │
│  PHASE 2: ANTI-PATTERNS                                     │
│  • Dynamically generated patterns                            │
│  • Static database patterns                                 │
│  • Combined blacklist                                       │
│  • >>> PAUSED - Add/remove patterns? <<<                    │
│                                                             │
│       ↓ [user: continue/add/remove/done]                     │
│                                                             │
│  PHASE 3: CONSTRAINTS                                      │
│  • Selected constraints with scores                          │
│  • Compatibility check                                      │
│  • Difficulty balance                                       │
│  • >>> PAUSED - Accept/replace? <<<                         │
│                                                             │
│       ↓ [user: accept/replace/show/done]                     │
│                                                             │
│  PHASE 4: ENRICHED SPEC                                     │
│  • Validated specification                                   │
│  • Complete brief                                           │
│  • All anti-pattern warnings                                │
│  • >>> PAUSED - Review before build? <<<                     │
│                                                             │
│       ↓ [user: build/edit/show/done]                         │
│                                                             │
│  PHASE 5: BUILD                                            │
│  • Execute build                                            │
│  • Validate results                                         │
│  • Generate metrics                                         │
│  • >>> COMPLETE <<<                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## User Commands

At each pause, you can use these commands:

| Command | Alias | Action |
|---------|-------|--------|
| `continue` | `accept`, `next`, `proceed` | Proceed to next phase with current state |
| `adjust <instruction>` | `modify`, `change` | Modify current phase output |
| `add <item>` | `insert`, `include` | Add item to current phase |
| `remove <item>` | `delete`, `exclude` | Remove item from current phase |
| `replace <old> with <new>` | `swap`, `substitute` | Replace item with another |
| `show` | `display`, `view` | Display current phase output again |
| `skip` | `jump` | Skip to build phase (use current spec) |
| `cancel` | `abort`, `stop` | Cancel the entire workflow |
| `help` | `?` | Show available commands |
| `status` | `state` | Show current workflow state |

---

## Phase 1: Analysis

### Output Format

```markdown
════════════════════════════════════════════════════════════════════
  PHASE 1: ANALYSIS - PAUSED FOR REVIEW
════════════════════════════════════════════════════════════════════

📝 Original Prompt:
"Create a modern SaaS dashboard for analytics"

🔍 Detected Keywords:
  • HIGH RISK: "modern" (position: 8, weight: 0.9)
  • MEDIUM RISK: "SaaS" (position: 16, weight: 0.7)

📊 Risk Assessment:
  • Trend-trap score: 7/10
  • Pattern convergence risk: HIGH
  • Recommendation: APPLY STRONG CONSTRAINTS
  • Confidence: 85%

🏷️ Project Type Detection:
  • Type: Dashboard
  • Industry: Analytics/SaaS
  • Typical patterns: Cards, charts, dark theme
  • Suggested constraints: architectural, print_first

─────────────────────────────────────────────────────────────────
Available Commands:
  continue  | Proceed to anti-patterns detection
  adjust    | Modify the analysis (e.g., "change SaaS to B2B")
  add       | Add keyword to consider (e.g., "add minimalist")
  remove    | Remove keyword (e.g., "remove modern")
  show      | Display this analysis again
  skip      | Jump to build phase
  cancel    | Cancel workflow
─────────────────────────────────────────────────────────────────
```

### User Adjustments

```bash
# Change a keyword
> adjust Change "SaaS" to "enterprise analytics platform"

# Remove a keyword
> remove modern

# Add consideration
> add Consider this is for financial services

# Accept and continue
> continue
```

---

## Phase 2: Anti-Patterns

### Output Format

```markdown
════════════════════════════════════════════════════════════════════
  PHASE 2: ANTI-PATTERNS - PAUSED FOR REVIEW
════════════════════════════════════════════════════════════════════

🔴 RED FLAGS - Patterns to AVOID:

Dynamically Generated:
  ❌ saas_generic           Every SaaS uses the same hero + cards formula
  ❌ dashboard_cards        Grid of metric cards is the analytics default

Static Database:
  ❌ card_grid             Generic card layout
  ❌ glassmorphism_cards   Overused since 2022
  ❌ dark_mode_default      Lazy default for dashboards
  ❌ neon_colors           Tech dashboards love neon accents

Total: 5 patterns to avoid

─────────────────────────────────────────────────────────────────
Available Commands:
  continue  | Proceed to constraint selection
  add       | Add pattern to blacklist (e.g., "add hero_generic")
  remove    | Remove pattern from blacklist
  show      | Display patterns again
  skip      | Jump to build phase
  cancel    | Cancel workflow
─────────────────────────────────────────────────────────────────
```

### User Adjustments

```bash
# Add a pattern you want to avoid
> add gradient_overkill

# Remove a pattern (if you actually want it)
> remove dark_mode_default

# Accept and continue
> continue
```

---

## Phase 3: Constraints

### Output Format

```markdown
════════════════════════════════════════════════════════════════════
  PHASE 3: CONSTRAINTS - PAUSED FOR REVIEW
════════════════════════════════════════════════════════════════════

🟢 GREEN FLAGS - Selected Constraints:

1. **paper_and_ink** (color_restrictions)
   • Description: Off-white background, dark text, minimal accent
   • Difficulty: LOW (score: 35)
   • Creativity: 15/30 | Impact: 18/25 | Synergy: 12/20

2. **architectural** (interaction_sources)
   • Description: Interactions inspired by physical buildings/spaces
   • Difficulty: HIGH (score: 78)
   • Creativity: 27/30 | Impact: 23/25 | Synergy: 8/20

3. **print_first** (technical_constraints)
   • Description: Design for print, then adapt for screen
   • Difficulty: HIGH (score: 72)
   • Creativity: 22/30 | Impact: 20/25 | Synergy: 15/20

✅ All constraints compatible
✅ Difficulty balance: 1 LOW, 2 HIGH
✅ Category coverage: 3/5 categories
✅ Total synergy score: 35/60

─────────────────────────────────────────────────────────────────
Available Commands:
  accept    | Accept these constraints and proceed
  replace  | Replace a constraint (e.g., "replace architectural with musical")
  add       | Add another constraint
  remove    | Remove a constraint
  show      | Display constraints again
  skip      | Jump to build phase
  cancel    | Cancel workflow
─────────────────────────────────────────────────────────────────
```

### User Adjustments

```bash
# Replace a constraint
> replace architectural with mechanical

# Accept and continue
> accept

# Add another constraint
> add no_animations
```

---

## Phase 4: Enriched Spec

### Output Format

```markdown
════════════════════════════════════════════════════════════════════
  PHASE 4: ENRICHED SPEC - PAUSED FOR FINAL REVIEW
════════════════════════════════════════════════════════════════════

📋 Specification Summary:

Project Type: Dashboard
Stack: react-tailwind (default)

Avoid These Patterns:
  ❌ saas_generic, dashboard_cards, card_grid
  ❌ glassmorphism_cards, dark_mode_default, neon_colors

Apply These Constraints:
  ✅ paper_and_ink (score: 35)
  ✅ mechanical (score: 68) - REPLACED
  ✅ print_first (score: 72)

📄 Full spec saved to: .claude/.strike/enriched-spec.json

─────────────────────────────────────────────────────────────────
Available Commands:
  build     | Proceed to build with this spec
  edit      | Modify the spec directly
  show      | Display full spec
  skip      | Jump to build (same as build)
  cancel    | Cancel workflow
─────────────────────────────────────────────────────────────────
```

---

## Phase 5: Build

### Output Format

```markdown
════════════════════════════════════════════════════════════════════
  PHASE 5: BUILD - IN PROGRESS
════════════════════════════════════════════════════════════════════

🔨 Building with react-tailwind stack...

[████████████████████████████████] 100%

✅ Build complete!

Output: ./output/react-tailwind/
Metrics: Bundle: 8KB gzipped | A11y: WCAG AA compliant
Results: .claude/.strike/build-result.json

════════════════════════════════════════════════════════════════════
```

---

## State Management

Step mode preserves all user adjustments in `.claude/.strike/step-state.json`:

```json
{
  "session_id": "uuid-v4",
  "prompt": "Create a modern SaaS dashboard",
  "current_phase": "constraints",
  "completed_phases": ["analysis", "anti-patterns"],
  "user_adjustments": {
    "analysis": {
      "keywords_added": [],
      "keywords_removed": ["modern"],
      "keywords_modified": ["SaaS → enterprise analytics platform"]
    },
    "anti_patterns": {
      "patterns_added": ["gradient_overkill"],
      "patterns_removed": []
    },
    "constraints": {
      "constraints_added": [],
      "constraints_removed": [],
      "constraints_replaced": ["architectural → mechanical"]
    }
  },
  "phase_outputs": {
    "analysis": { ... },
    "anti_patterns": { ... },
    "constraints": { ... }
  }
}
```

---

## Step Mode with Teams

Step mode can be combined with teams mode:

```bash
/ui --step --team "Complex dashboard"
```

In teams + step mode:
- Each phase is executed by the appropriate agent
- The team lead (you) reviews and approves before proceeding
- Agents pause and wait for your input

---

## Best Practices

1. **Review each phase carefully** - Don't rush through
2. **Use `show` command** - Redisplay output if needed
3. **Experiment with adjustments** - Step mode is perfect for learning
4. **Save interesting combinations** - Note constraint combos that work well
5. **Provide feedback** - The system learns from your choices

---

*UI Step Mode v3.1 - Interactive workflow for user-controlled UI generation*
