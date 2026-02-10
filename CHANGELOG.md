# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[1.0.0]: https://github.com/Pamacea/strike/releases/tag/v1.0.0
