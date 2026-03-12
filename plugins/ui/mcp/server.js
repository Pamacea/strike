#!/usr/bin/env node
/**
 * Strike MCP Server
 * Model Context Protocol server for Strike UI Plugin
 * Provides cached access to anti-patterns, constraints, and UI patterns
 *
 * Part of Strike Plugin v1.7.0
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const STRIKE_ROOT = process.env.STRIKE_ROOT || path.resolve(__dirname, '../../..');
const DATA_DIR = path.join(STRIKE_ROOT, 'plugins/ui/data');

// Cache configuration
const CACHE_TTL = 60000; // 1 minute
const cache = new Map();

// Create server
const server = new Server({
  name: 'strike-mcp-server',
  version: '1.7.0'
}, {
  capabilities: {
    tools: {},
    resources: {}
  }
});

// Cache helper functions
function getCacheKey(key) {
  return `strike:${key}`;
}

function getCached(key) {
  const cached = cache.get(getCacheKey(key));
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCache(key, data) {
  cache.set(getCacheKey(key), {
    data,
    timestamp: Date.now()
  });
}

// Load data files
function loadDataFile(filename) {
  const filePath = path.join(DATA_DIR, filename);

  // Check cache first
  const cached = getCached(filename);
  if (cached) {
    return cached;
  }

  // Load from disk
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    setCache(filename, data);
    return data;
  }

  return null;
}

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_anti_patterns',
        description: 'Get the list of UI anti-patterns (100+ forbidden patterns)',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by category (visual, typography, layout, components, interactions, external)',
              enum: ['visual', 'typography', 'layout', 'components', 'interactions', 'external', 'all']
            }
          }
        }
      },
      {
        name: 'get_constraints',
        description: 'Get available creative constraints with scoring information',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by constraint category',
              enum: ['color_restrictions', 'interaction_sources', 'technical_constraints', 'context_shifts', 'structural', 'all']
            },
            max_results: {
              type: 'number',
              description: 'Maximum number of constraints to return (default: all)',
              default: 50
            }
          }
        }
      },
      {
        name: 'score_constraints',
        description: 'Score constraint combinations for compatibility and creativity',
        inputSchema: {
          type: 'object',
          properties: {
            constraints: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of constraint IDs to score together'
            }
          },
          required: ['constraints']
        }
      },
      {
        name: 'search_patterns',
        description: 'Search for patterns by keyword or tag',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query'
            },
            type: {
              type: 'string',
              description: 'Search in anti-patterns or constraints',
              enum: ['anti-patterns', 'constraints', 'all']
            }
          },
          required: ['query']
        }
      },
      {
        name: 'validate_spec',
        description: 'Validate a UI specification against anti-patterns and constraints',
        inputSchema: {
          type: 'object',
          properties: {
            spec: {
              type: 'object',
              description: 'UI specification to validate'
            }
          },
          required: ['spec']
        }
      },
      {
        name: 'get_component_registry',
        description: 'Get the component registry with safe, caution, and forbidden components',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  };
});

// Register resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'strike://anti-patterns',
        name: 'UI Anti-Patterns Database',
        description: '100+ forbidden UI patterns to avoid',
        mimeType: 'application/json'
      },
      {
        uri: 'strike://constraints',
        name: 'Creative Constraints Registry',
        description: 'Available creative constraints with scoring',
        mimeType: 'application/json'
      },
      {
        uri: 'strike://component-registry',
        name: 'Component Registry',
        description: 'Safe, caution, and forbidden component list',
        mimeType: 'application/json'
      },
      {
        uri: 'strike://accessibility-checklist',
        name: 'Accessibility Checklist',
        description: 'WCAG AA+ accessibility requirements',
        mimeType: 'application/json'
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_anti_patterns': {
        const data = loadDataFile('core/anti-patterns.json');
        const category = args.category;

        if (category && category !== 'all') {
          const filtered = data.anti_patterns.filter(p => p.category === category);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(filtered, null, 2)
            }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(data.anti_patterns, null, 2)
          }]
        };
      }

      case 'get_constraints': {
        const data = loadDataFile('core/constraints.json');
        const category = args.category;
        const maxResults = args.max_results || 50;

        let constraints = data.constraints || [];

        if (category && category !== 'all') {
          constraints = constraints.filter(c => c.category === category);
        }

        // Limit results
        const results = constraints.slice(0, maxResults);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(results, null, 2)
          }]
        };
      }

      case 'score_constraints': {
        const constraintsData = loadDataFile('core/constraints.json');
        const selectedConstraints = args.constraints;

        // Find the selected constraints
        const found = constraintsData.constraints.filter(c =>
          selectedConstraints.includes(c.id)
        );

        // Calculate scores
        const weights = { creativity: 0.3, difficulty: 0.25, impact: 0.25, synergy: 0.2 };

        let totalScore = 0;
        const breakdown = found.map(c => {
          const score = (
            (c.score?.creativity || 0) * weights.creativity +
            (c.score?.difficulty || 0) * weights.difficulty +
            (c.score?.impact || 0) * weights.impact
          );
          return {
            id: c.id,
            name: c.name,
            score: Math.round(score),
            breakdown: c.score
          };
        });

        // Check for conflicts
        const conflicts = [];
        const categories = found.map(c => c.category);
        const uniqueCategories = [...new Set(categories)];

        if (uniqueCategories.length < found.length) {
          // Same category applied twice - might be redundant
          conflicts.push({
            type: 'redundancy',
            message: 'Multiple constraints from same category'
          });
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              constraints: breakdown,
              total_score: Math.round(totalScore),
              conflicts: conflicts,
              recommendation: conflicts.length === 0 ? 'Compatible' : 'Review recommended'
            }, null, 2)
          }]
        };
      }

      case 'search_patterns': {
        const query = args.query.toLowerCase();
        const type = args.type || 'all';

        let results = [];

        if (type === 'anti-patterns' || type === 'all') {
          const antiPatterns = loadDataFile('core/anti-patterns.json');
          const matched = antiPatterns.anti_patterns.filter(p =>
            p.name?.toLowerCase().includes(query) ||
            p.description?.toLowerCase().includes(query) ||
            p.tags?.some(t => t.toLowerCase().includes(query))
          );
          results.push(...matched.map(p => ({ ...p, type: 'anti-pattern' })));
        }

        if (type === 'constraints' || type === 'all') {
          const constraints = loadDataFile('core/constraints.json');
          const matched = constraints.constraints.filter(c =>
            c.id?.toLowerCase().includes(query) ||
            c.name?.toLowerCase().includes(query) ||
            c.description?.toLowerCase().includes(query) ||
            c.tags?.some(t => t.toLowerCase().includes(query))
          );
          results.push(...matched.map(c => ({ ...c, type: 'constraint' })));
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(results, null, 2)
          }]
        };
      }

      case 'validate_spec': {
        const spec = args.spec;
        const antiPatterns = loadDataFile('core/anti-patterns.json');
        const componentRegistry = loadDataFile('core/component-registry.json');

        const violations = [];
        const warnings = [];

        // Check for anti-patterns in spec keywords
        if (spec.keywords) {
          spec.keywords.forEach(keyword => {
            const found = antiPatterns.anti_patterns.filter(p =>
              p.triggers?.some(t => keyword.toLowerCase().includes(t))
            );
            violations.push(...found);
          });
        }

        // Check constraints compatibility
        if (spec.constraints) {
          const constraintsData = loadDataFile('core/constraints.json');
          const uniqueCategories = [...new Set(spec.constraints.map(c => {
            const constraint = constraintsData.constraints.find(x => x.id === c);
            return constraint?.category;
          }))];

          if (uniqueCategories.length < spec.constraints.length) {
            warnings.push('Multiple constraints from same category detected');
          }
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              valid: violations.length === 0,
              violations: violations.map(v => v.name || v.id),
              warnings: warnings,
              score: Math.max(0, 100 - violations.length * 10)
            }, null, 2)
          }]
        };
      }

      case 'get_component_registry': {
        const data = loadDataFile('core/component-registry.json');

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(data, null, 2)
          }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: error.message,
          tool: name
        }, null, 2)
      }],
      isError: true
    };
  }
});

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    let data;
    let filename;

    switch (uri) {
      case 'strike://anti-patterns':
        filename = 'core/anti-patterns.json';
        break;
      case 'strike://constraints':
        filename = 'core/constraints.json';
        break;
      case 'strike://component-registry':
        filename = 'core/component-registry.json';
        break;
      case 'strike://accessibility-checklist':
        filename = 'core/accessibility-checklist.json';
        break;
      default:
        throw new Error(`Unknown resource: ${uri}`);
    }

    data = loadDataFile(filename);

    return {
      contents: [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(data, null, 2)
      }]
    };
  } catch (error) {
    return {
      contents: [{
        uri,
        mimeType: 'text/plain',
        text: JSON.stringify({ error: error.message })
      }]
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Strike MCP Server running on stdio');
}

main().catch(console.error);
