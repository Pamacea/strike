---
name: search
description: "Search the strike marketplace for patterns, constraints, workflows, or plugins"
argument-hint: "<type> <query>"
version: 1.0.0
---

# strike search - Search Marketplace

Search for items in the strike marketplace by name, description, or tags.

## Usage

```bash
strike search <type> <query>
```

## Examples

**Search for typography patterns:**
```bash
strike search patterns typography
```

Output:
```
Searching for "typography" in patterns...

Found 2 results:

typography-hierarchy        Typography-Only Hierarchy
  Using only typography size, weight, and spacing to create
  visual hierarchy without decorative elements.

  Score: 70/100  Difficulty: medium  Category: layout

vertical-rhythm             Strict Vertical Rhythm
  All spacing follows a baseline grid for consistent
  vertical spacing and harmony.

  Score: 49/100  Difficulty: medium  Category: layout
```

**Search for print constraints:**
```bash
strike search constraints print
```

**Search for interactive workflows:**
```bash
strike search workflows approval
```

**Search for animation plugins:**
```bash
strike search plugins animation
```

## Search Scope

Search checks:
- Item ID
- Item name
- Description
- Tags
- Category

## Advanced Search

**Multiple terms:**
```bash
strike search patterns typography minimal
```

**Exact phrase:**
```bash
strike search constraints "paper & ink"
```

**Tag-only search:**
```bash
strike search patterns tag:accessibility
```

## See Also

- `strike list` - Browse by category
- `strike info` - Get detailed information
- `strike install` - Install found items
