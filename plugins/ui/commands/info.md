---
name: info
description: "Get detailed information about a marketplace item"
argument-hint: "<type> <id>"
version: 1.0.0
---

# strike info - Get Detailed Information

Display complete details about a pattern, constraint, workflow, or plugin.

## Usage

```bash
strike info <type> <id>
```

## Examples

**Get pattern information:**
```bash
strike info pattern typography-hierarchy
```

Output:
```
typography-hierarchy: Typography-Only Hierarchy

Description:
  Using only typography size, weight, and spacing to create visual
  hierarchy without decorative elements, borders, or backgrounds.

Category:     layout
Difficulty:   medium
Author:       Pamacea
Version:      1.0.0
License:      MIT

Scoring:
  Creativity:  22/30
  Difficulty:  15/25
  Impact:      18/25
  Synergy:     15/20
  ─────────────────
  Total:       70/100

Tags:
  typography, minimal, accessibility, readability

Compatibility:
  ✓ react-tailwind  ✓ vanilla  ✓ nextjs  ✓ remix  ✓ vite

Examples:
  • Long-form Article - Article layout with clear heading hierarchy
  • Documentation Site - Technical documentation using only typography
```

**Get constraint information:**
```bash
strike info constraint paper-ink
```

**Get workflow information:**
```bash
strike info workflow with-approval
```

## See Also

- `strike list` - List marketplace items
- `strike search` - Search marketplace
- `strike install` - Install items
