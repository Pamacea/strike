---
name: list
description: "List available patterns, constraints, workflows, or plugins in the strike marketplace"
argument-hint: "<type> [--filter=<category>]"
version: 1.0.0
---

# strike list - Browse Marketplace

Browse and filter items in the strike marketplace.

## Usage

```bash
strike list <type> [--filter=<category>]
```

## Types

```bash
strike list patterns          # List all UI patterns
strike list constraints       # List all constraints
strike list workflows         # List all workflows
strike list plugins           # List all plugins
```

## Filtering

Filter by category, difficulty, or tags:

```bash
# Filter by category
strike list patterns --filter=layout
strike list constraints --filter=color-restrictions

# Filter by difficulty
strike list constraints --filter=easy
strike list constraints --filter=hard

# Filter by tag
strike list patterns --filter=typography
strike list constraints --filter=print
```

## Output Format

```
UI Patterns (10 items)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

typography-hierarchy        Typography-Only Hierarchy
  Category: layout
  Difficulty: medium
  Creativity: 22/30
  Tags: typography, minimal, accessibility

single-column-focus         Single Column Focus
  Category: layout
  Difficulty: easy
  Creativity: 15/30
  Tags: minimal, readability, focus

brutalist-grid             Brutalist Grid
  Category: layout
  Difficulty: medium
  Creativity: 25/30
  Tags: brutalist, grid, technical
```

## Examples

**List all patterns:**
```bash
strike list patterns
```

**List layout patterns only:**
```bash
strike list patterns --filter=layout
```

**List easy constraints:**
```bash
strike list constraints --filter=easy
```

**List color restrictions:**
```bash
strike list constraints --filter=color-restrictions
```

**List all workflows:**
```bash
strike list workflows
```

## Categories

### Pattern Categories
- `layout` - Layout structures
- `color` - Color schemes
- `components` - Component patterns
- `approach` - Design approaches
- `technical` - Technical constraints

### Constraint Categories
- `color-restrictions` - Color limitations
- `interaction-sources` - Design metaphors
- `technical-constraints` - Technical limitations
- `context-shifts` - Context changes
- `structural-constraints` - Structure limitations

### Workflow Categories
- `simple` - Straight-through workflows
- `interactive` - Approval gates
- `parallel` - Parallel execution
- `adaptive` - Retry logic
- `educational` - Teaching mode

## See Also

- `strike search` - Search marketplace
- `strike info` - Get detailed information
- `strike install` - Install items
