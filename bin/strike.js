#!/usr/bin/env node
/**
 * strike CLI - Marketplace management tool
 * Part of Strike Plugin v1.7.0
 *
 * Usage:
 *   strike list                    List available marketplace items
 *   strike search <query>           Search marketplace items
 *   strike info <item>              Show detailed information
 *   strike install <item>           Install a marketplace item
 *   strike validate                 Validate marketplace files
 */

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const program = new Command();

// Configuration
const STRIKE_ROOT = process.env.STRIKE_ROOT || path.resolve();
const MARKETPLACE_FILE = path.join(STRIKE_ROOT, '.claude-plugin/marketplace.json');
const REGISTRY_DIR = path.join(STRIKE_ROOT, 'registry');
const PLUGINS_DIR = path.join(STRIKE_ROOT, 'plugins');

// Colors
const colors = {
  primary: chalk.cyan,
  success: chalk.green,
  warning: chalk.yellow,
  error: chalk.red,
  dim: chalk.gray,
  muted: chalk.hex('#888')
};

// Utility functions
function readJSON(filePath) {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return null;
}

function formatItem(item) {
  const categoryColor = {
    'ui-patterns': colors.primary,
    'constraints': colors.warning,
    'workflows': colors.success
  }[item.category] || colors.dim;

  return `${categoryColor(item.category.padEnd(15))} ${colors.primary(item.id.padEnd(25))} ${colors.muted(item.name)}`;
}

// Commands
program
  .name('strike')
  .description('Strike - Creative constraint marketplace CLI')
  .version('1.7.0');

// strike list
program
  .command('list')
  .description('List available marketplace items')
  .option('-t, --type <type>', 'Filter by type (ui-patterns|constraints|workflows)')
  .option('-c, --category <category>', 'Filter by category')
  .action((options) => {
    console.log(colors.primary('\n📦 Strike Marketplace - Available Items\n'));

    const types = options.type ? [options.type] : ['ui-patterns', 'constraints', 'workflows'];
    let total = 0;

    types.forEach(type => {
      const registryFile = path.join(REGISTRY_DIR, `${type}.json`);
      const registry = readJSON(registryFile);

      if (registry && registry.items) {
        const filtered = options.category
          ? registry.items.filter(item => item.category === options.category)
          : registry.items;

        if (filtered.length > 0) {
          console.log(colors.dim(`\n${type.toUpperCase()}\n${'─'.repeat(50)}`));
          filtered.forEach(item => {
            console.log(formatItem(item));
          });
          total += filtered.length;
        }
      }
    });

    console.log(colors.dim(`\n${'─'.repeat(50)}`));
    console.log(`Total: ${colors.primary(total.toString())} items\n`);
  });

// strike search
program
  .command('search <query>')
  .description('Search marketplace items')
  .action((query) => {
    console.log(colors.primary(`\n🔍 Searching for: ${colors.success(query)}\n`));

    const types = ['ui-patterns', 'constraints', 'workflows'];
    const results = [];

    types.forEach(type => {
      const registryFile = path.join(REGISTRY_DIR, `${type}.json`);
      const registry = readJSON(registryFile);

      if (registry && registry.items) {
        registry.items.forEach(item => {
          const searchText = `${item.id} ${item.name} ${item.description} ${item.tags?.join(' ') || ''}`.toLowerCase();
          if (searchText.includes(query.toLowerCase())) {
            results.push({ ...item, registry: type });
          }
        });
      }
    });

    if (results.length > 0) {
      results.forEach(item => {
        console.log(formatItem(item));
        console.log(colors.dim(`    ${item.description.substring(0, 60)}...\n`));
      });
      console.log(`Found: ${colors.primary(results.length.toString())} results\n`);
    } else {
      console.log(colors.warning('No results found\n'));
    }
  });

// strike info
program
  .command('info <item>')
  .description('Show detailed information about an item')
  .action((item) => {
    console.log(colors.primary(`\n📋 Item: ${colors.success(item)}\n`));

    const types = ['ui-patterns', 'constraints', 'workflows'];
    let found = false;

    types.forEach(type => {
      const registryFile = path.join(REGISTRY_DIR, `${type}.json`);
      const registry = readJSON(registryFile);

      if (registry && registry.items) {
        const foundItem = registry.items.find(i => i.id === item);

        if (foundItem) {
          found = true;
          console.log(colors.dim('─'.repeat(50)));
          console.log(`${colors.primary('ID:')}           ${foundItem.id}`);
          console.log(`${colors.primary('Name:')}         ${foundItem.name}`);
          console.log(`${colors.primary('Category:')}     ${foundItem.category}`);
          console.log(`${colors.primary('Description:')} ${foundItem.description}`);

          if (foundItem.tags) {
            console.log(`${colors.primary('Tags:')}        ${foundItem.tags.join(', ')}`);
          }

          if (foundItem.examples) {
            console.log(`${colors.primary('Examples:')}     ${foundItem.examples.length} available`);
          }

          if (foundItem.constraints) {
            console.log(`${colors.primary('Constraints:')}  ${foundItem.constraints.join(', ')}`);
          }

          console.log(colors.dim('─'.repeat(50)));
        }
      }
    });

    if (!found) {
      console.log(colors.warning(`Item "${item}" not found\n`));
    } else {
      console.log('');
    }
  });

// strike install
program
  .command('install <item>')
  .description('Install a marketplace item (copy to project)')
  .option('-o, --output <path>', 'Output path (default: current directory)')
  .action((item, options) => {
    console.log(colors.primary(`\n📦 Installing: ${colors.success(item)}\n`));

    const types = ['ui-patterns', 'constraints', 'workflows'];
    let found = false;

    types.forEach(type => {
      const registryFile = path.join(REGISTRY_DIR, `${type}.json`);
      const registry = readJSON(registryFile);

      if (registry && registry.items) {
        const foundItem = registry.items.find(i => i.id === item);

        if (foundItem) {
          found = true;
          const outputPath = options.output || process.cwd();

          console.log(colors.dim('Item details:'));
          console.log(`  Name:     ${foundItem.name}`);
          console.log(`  Category: ${foundItem.category}`);
          console.log(`  Source:   ${type}.json`);
          console.log(colors.dim('\nNote: Items are referenced from registry, not copied.'));
          console.log(colors.dim('Use the item ID in your /ui command to apply it.\n'));
          console.log(colors.success(`✓ Item "${item}" is available for use\n`));
        }
      }
    });

    if (!found) {
      console.log(colors.warning(`Item "${item}" not found\n`));
      console.log(colors.dim('Use "strike list" to see available items\n'));
    }
  });

// strike validate
program
  .command('validate')
  .description('Validate marketplace and registry JSON files')
  .action(async () => {
    console.log(colors.primary('\n🔍 Validating Strike Marketplace...\n'));

    const validateScript = path.join(PLUGINS_DIR, 'ui/scripts/validate-marketplace.sh');

    if (fs.existsSync(validateScript)) {
      const { exec } = require('child_process');
      exec(`bash "${validateScript}"`, (error, stdout, stderr) => {
        if (error) {
          console.log(colors.error('Validation failed:'));
          console.log(colors.dim(stderr));
        } else {
          console.log(colors.success(stdout));
        }
      });
    } else {
      console.log(colors.warning('Validation script not found'));
      console.log(colors.dim(`Expected: ${validateScript}\n`));
    }
  });

// strike stats
program
  .command('stats')
  .description('Show marketplace statistics')
  .action(() => {
    console.log(colors.primary('\n📊 Marketplace Statistics\n'));

    const marketplace = readJSON(MARKETPLACE_FILE);
    const types = ['ui-patterns', 'constraints', 'workflows'];
    let total = 0;

    console.log(colors.dim('Plugins:'));
    if (marketplace && marketplace.plugins) {
      marketplace.plugins.forEach(plugin => {
        console.log(`  ${colors.success('✓')} ${plugin.name} v${plugin.version}`);
      });
    }

    console.log(colors.dim('\nRegistry Items:'));
    types.forEach(type => {
      const registryFile = path.join(REGISTRY_DIR, `${type}.json`);
      const registry = readJSON(registryFile);

      if (registry && registry.items) {
        const count = registry.items.length;
        total += count;
        console.log(`  ${colors.primary(type)}: ${count} items`);
      }
    });

    console.log(colors.dim(`\n${'─'.repeat(30)}`));
    console.log(`  Total: ${colors.success(total.toString())} items\n`);
  });

// Parse and execute
program.parse();

// Show help if no arguments
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
