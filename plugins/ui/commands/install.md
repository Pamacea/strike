---
name: install
description: "Install UI patterns, constraints, or workflows from the strike marketplace"
argument-hint: "<type> <name> [--save]"
version: 1.0.0
---

# strike install - Marketplace Installation

Install patterns, constraints, workflows, or plugins from the strike marketplace.

## Usage

```bash
strike install <type> <name> [--save]
```

## Types

### pattern
Install a UI pattern from the marketplace.

```bash
strike install pattern typography-hierarchy
strike install pattern single-column-focus
```

### constraint
Install a creative constraint from the marketplace.

```bash
strike install constraint paper-ink
strike install constraint architectural
```

### workflow
Install a pre-built DOT workflow.

```bash
strike install workflow with-approval
strike install workflow parallel-exploration
```

### plugin
Install a strike plugin from the marketplace.

```bash
strike install plugin strike-animations
strike install plugin strike-accessibility
```

## Options

- `--save` - Save to your project's configuration (`.claude/.strike/config.json`)

## Examples

**Install a single pattern:**
```bash
strike install pattern typography-hierarchy
```

**Install multiple constraints:**
```bash
strike install constraint paper-ink
strike install constraint system-fonts
```

**Install and save workflow:**
```bash
strike install workflow with-approval --save
```

**Install plugin:**
```bash
strike install plugin strike-animations
```

## What Gets Installed

### Patterns
- Pattern documentation added to `.claude/.strike/patterns/`
- Pattern metadata saved to config
- Examples available for reference

### Constraints
- Constraint added to your constraint library
- Scoring calculated and saved
- Compatibility checked

### Workflows
- DOT file saved to `.claude/.strike/workflows/`
- Available for use with `/ui --workflow=<path>`

### Plugins
- Plugin installed to `plugins/` directory
- Dependencies resolved
- Activated in configuration

## Listing Available Items

To browse the marketplace before installing:

```bash
# List all patterns
strike list patterns

# List all constraints
strike list constraints

# List all workflows
strike list workflows

# List all plugins
strike list plugins

# Search for patterns
strike search patterns typography

# Get details about an item
strike info pattern typography-hierarchy
```

## Updating Installed Items

```bash
# Update a specific item
strike update pattern typography-hierarchy

# Update all installed items
strike update all
```

## Removing Items

```bash
# Remove a pattern
strike remove pattern typography-hierarchy

# Remove a constraint
strike remove constraint paper-ink
```

## Configuration

Installed items are tracked in `.claude/.strike/config.json`:

```json
{
  "installed": {
    "patterns": ["typography-hierarchy", "single-column-focus"],
    "constraints": ["paper-ink", "system-fonts"],
    "workflows": ["with-approval"],
    "plugins": ["strike-animations"]
  }
}
```

## Marketplace URL

Default marketplace: `https://github.com/Pamacea/strike`

Custom marketplace:
```bash
strike config marketplace https://your-marketplace.com
```

## See Also

- `strike list` - Browse marketplace items
- `strike info` - Get detailed information
- `strike validate` - Validate installed items
