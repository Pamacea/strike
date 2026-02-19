# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.5.0] - 2025-02-19

### Added - Marketplace Edition

#### Marketplace
- **UI Patterns Registry** - 10 validated design patterns with scoring (typography-hierarchy, single-column-focus, brutalist-grid, asymmetric-rhythm, vertical-rhythm, monochrome-complex, system-symbols, print-first, raw-html, micro-interactions-only)
- **Constraints Registry** - 15 creative constraints (paper-ink, monochrome-true, architectural, biological, musical-structure, mechanical, css-only, system-fonts-only, no-images, single-file, ascii-art-only, screen-reader-first, outdoor-visible, linear-only, max-width-extreme)
- **Workflows Registry** - 5 pre-built DOT workflows (quick-sequential, with-approval, parallel-exploration, adaptive-retry, teaching-mode)
- **Marketplace Schema** - JSON Schema validation for marketplace, registries, and all items
- **Registry Schema** - Unified schema for patterns, constraints, and workflows

#### Plugin Ecosystem
- **strike-core** - Essential engine plugin (orchestrator, validator, checkpoint, event systems)
- **strike-patterns** - UI pattern library with 10+ validated patterns
- **strike-constraints** - Creative constraint library with 15+ constraints
- **strike-animations** - Non-generic motion design patterns
- **strike-accessibility** - WCAG 2.1 AA compliance checking
- **strike-workflows** - Pre-built DOT workflows library
- **strike-teams** - Multi-agent orchestration (2-3x faster)

#### CLI Tools
- **strike install** - Install patterns, constraints, workflows, or plugins
- **strike list** - Browse marketplace items by type with filtering
- **strike search** - Search marketplace by name, description, or tags
- **strike info** - Get detailed information about marketplace items
- **strike validate** - Validate installed items and marketplace

#### Validation & Quality
- **Schema Validation** - Automated JSON Schema validation for all marketplace files
- **Validation Scripts** - `validate-marketplace.sh` for marketplace integrity checking
- **Quality Gates** - CI/CD pipeline with automated validation
- **PR Validation** - Conventional commit enforcement for PR titles
- **Statistics Reporting** - Automatic marketplace statistics in PR comments

#### Community & Governance
- **CONTRIBUTING.md** - Comprehensive contribution guidelines
  - Pattern submission guide with scoring criteria
  - Constraint submission guide with categories
  - Workflow creation guide with DOT syntax
  - Plugin development guide
  - Development setup instructions
  - Pull request process
  - Style guide
- **GOVERNANCE.md** - Quality standards and review process
  - Quality standards for patterns, constraints, workflows
  - Community review process (7-day feedback period)
  - Acceptance criteria for each item type
  - Maintenance policy and deprecation process
  - Community guidelines and code of conduct
  - Dispute resolution process
  - Quality metrics and success indicators
- **Issue Templates** - `pattern_request.md` and `constraint_request.md`
- **PR Template** - Standardized pull request template

#### Documentation
- **Plugin READMEs** - Comprehensive documentation for each plugin
- **Marketplace Documentation** - Usage guides for CLI commands
- **Schema Documentation** - Complete JSON Schema references
- **Installation Guides** - Plugin installation instructions

#### Configuration
- **marketplace.json v2** - Enhanced marketplace manifest with plugins and registries sections
- **Plugin Metadata** - Enhanced plugin.json with category, tags, keywords, marketplace stats
- **Registry Structure** - Unified registry/ directory with JSON files

### Enhanced

#### Core Features
- **Constraint Scoring** - Enhanced scoring system (creativity: 0-30, difficulty: 0-25, impact: 0-25, synergy: 0-20, total: 0-100)
- **Pattern Metadata** - Enhanced pattern metadata with difficulty, accessibility, bundle size
- **Compatibility** - Multi-framework compatibility tracking (react-tailwind, vanilla, nextjs, remix, vite)
- **Examples** - Rich examples for all marketplace items with titles and descriptions

#### Developer Experience
- **Progressive Disclosure** - Three-level documentation (metadata → core docs → references)
- **CLI Help** - Comprehensive help text for all CLI commands
- **Error Messages** - Clear, actionable error messages
- **Validation Feedback** - Specific validation errors with file and line information

### Performance

- **Schema Validation** - AJV-based validation with sub-second performance
- **Parallel Plugin Loading** - Concurrent plugin initialization
- **Lazy Registry Loading** - On-demand registry item loading

### Security

- **Schema Validation** - Input validation for all marketplace items
- **Dependency Tracking** - Explicit dependency declarations for plugins
- **License Tracking** - License information for all marketplace items

### Breaking Changes

- **marketplace.json format** - Added `registries` section, updated to v2 schema
- **Registry location** - Moved from `plugins/ui/data/core/` to `registry/`
- **Plugin structure** - New modular plugin ecosystem replaces monolithic UI plugin

### Migration Guide

#### From v1.1.0 to v1.5.0

1. **Update marketplace.json** - Add `registries` section if you have custom registries
2. **Move custom items** - Move items from `plugins/ui/data/core/` to `registry/`
3. **Update imports** - Update any direct imports to use new registry paths
4. **Run validation** - Run `./plugins/ui/scripts/validate-marketplace.sh` to verify

### Deprecated

- Legacy monolithic UI plugin structure (still supported in v1.5.0, will be removed in v2.0.0)

### Removed

None in this release

### Security

- Added schema validation to prevent malformed marketplace items
- Added license tracking for all marketplace items
- Added dependency validation for plugins

### Fixed

- Schema validation now properly validates nested arrays
- Registry items now properly validate metadata fields
- CLI tools now provide better error messages for invalid inputs

### Contributors

This release was built with insights from:
- Claude Code repository analysis
- shadcn/ui marketplace patterns
- 21st.dev marketplace features
- OriginUI registry architecture

## [1.1.0] - 2025-02-10

### Added - Attractor Workflow Orchestration

- **DOT Workflow Engine** - Define workflows in Graphviz DOT syntax with complete node/edge support
- **Event System** - 30+ typed event kinds for complete pipeline observability (SESSION_START, PHASE_START/END, CHECKPOINT_SAVED/LOADED, etc.)
- **Checkpoint & Resume** - Crash recovery with state persistence to `.claude/.strike/checkpoint.json`
- **Human-in-the-Loop** - Approval gates with WaitForHuman nodes and 5 interviewer implementations (Console, Callback, Queue, AutoApprove, Recording)
- **Parallel Execution** - Concurrent branch processing with fan-out/fan-in and multiple join policies (ANY, ALL, QUORUM)
- **Conditional Routing** - Smart workflow branching based on outcomes with 5-step edge selection algorithm
- **Model Stylesheet** - CSS-like LLM configuration with universal/class/ID selectors and specificity rules
- **Context Fidelity** - 6 modes for conversation history management (full, truncate, compact, summary:low/medium/high)
- **Steering** - Mid-task message injection for dynamic redirection
- **Goal Gates** - Critical nodes that must succeed before pipeline exit

### Enhanced

- **WorkflowEngine** - Core execution engine with graph traversal, retry logic, and event emission
- **DOTParser** - Complete Graphviz DOT syntax parser with BNF grammar support
- **HandlerRegistry** - 9 node handlers (Start, Exit, Codergen, Conditional, WaitForHuman, Parallel, FanIn, Tool)
- **EdgeRouter** - Priority-based edge selection with condition → label → ID → weight → lexical ordering
- **CheckpointService** - Automatic state persistence with backup/restore capabilities
- **StrikeEventEmitter** - Async event iteration with listener management and statistics
- **Interviewer** - Base class with 5 implementations for human approval workflows
- **FidelityManager** - Context compression with configurable summary levels
- **SteeringManager** - Dynamic message injection with history rewriting
- **GoalGateManager** - Enforcement of critical node completion
- **ModelStylesheet** - CSS-like parser with selector matching and specificity calculation

### Documentation

- **ATTRACTOR-INTEGRATION.md** - Complete integration guide with quick start and examples
- **ATTRACTOR-IMPLEMENTATION.md** - Implementation summary with file structure and metrics
- **DOT-GRAMMAR.md** - Complete DOT syntax reference with BNF grammar
- **CHECKPOINT-SCHEMA.json** - Checkpoint structure definition
- **EVENT-TYPES.json** - 30+ event kind definitions with schemas

### Reorganized

- **plugins/ui/data/core/** - Core data files (anti-patterns, constraints, component-registry, accessibility-checklist, parallel-state)
- **plugins/ui/data/attractor/** - Attractor-specific modules (event-system, checkpoint-system, dot-workflow, advanced-features)

### New CLI Flags

- `--resume` - Resume from checkpoint (auto-detects interruption)
- `--workflow=<path>` - Use custom DOT workflow file
- `--step` - Interactive workflow with human approval gates

### Configuration

- Added `attractor` section to config.json with event/checkpoint/auto_resume settings
- Event logging to `.claude/.strike/events.jsonl`
- Checkpoint interval supports "auto" mode (after each phase)
- Max parallel branches configurable (default: 4)

## [1.0.0] - 2025-02-09

### Added

- Initial release of strike - anti-trend UI generation plugin for Claude Code
- Orchestrator for prompt analysis and creative constraint application
- Implementer for building validated UI components
- Anti-pattern detection database with 40+ patterns to avoid
- Creative constraint library with 25+ constraint types
- Dynamic anti-pattern generation from semantic keywords
- Demo mode for lightweight fast iterations
- Red/Green flag table for visual feedback
- Parallel mode with shared state protocol (8-17% faster)
- Schema validation for specifications and build results
- Constraint scoring system (creativity, difficulty, impact, synergy)
- Component registry with validated components
- Accessibility-first approach with WCAG compliance
- Build metrics (bundle size, compliance scores, timing)
- Two stack support: React/Tailwind for production, Vanilla for prototypes

### Documentation

- Comprehensive README with usage examples
- CLAUDE.md quick reference guide
- Orchestrator documentation
- Implementer documentation
- JSON schemas for validation
- Component registry reference
- Accessibility checklist
- Configuration guide

### Philosophy

- Anti-trend approach to prevent generic UI patterns
- Constraint-based creativity system
- Accessibility-first design principles
- Schema-validated communication between agents

[1.5.0]: https://github.com/Pamacea/strike/releases/tag/v1.5.0
[1.1.0]: https://github.com/Pamacea/strike/releases/tag/v1.1.0
[1.0.0]: https://github.com/Pamacea/strike/releases/tag/v1.0.0
