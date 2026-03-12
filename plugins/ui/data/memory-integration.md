# Memory Integration for Strike Plugins

This document describes the explicit integration with claude-mem for the Strike UI Plugin.

---

## Configuration

### Memory Categories

| Category | Purpose | Triggers |
|----------|---------|----------|
| **ui-patterns** | Successful UI architectures | After successful build |
| **anti-patterns** | What to avoid | When patterns detected |
| **constraint-combinations** | Proven constraint sets | After constraint selection |
| **design-decisions** | Architectural decisions | User confirms choices |

---

## Workflow

### Before Implementation

```markdown
## Memory Check

When starting a UI generation task:

1. **Search** claude-mem for similar patterns
   - Query: "UI [project_type] [keywords]"
   - Check: Previous constraint combinations
   - Review: What worked and what didn't

2. **Load** relevant memories
   - Successful anti-pattern detections
   - Effective constraint combinations
   - Similar project decisions

3. **Adapt** based on memory
   - Reuse proven patterns
   - Avoid past mistakes
   - Build on successful combinations
```

### After Completion

```markdown
## Memory Save

When UI generation completes successfully:

1. **Extract** key learnings
   - Constraint combination used
   - Anti-patterns detected
   - Final design choices
   - User preferences

2. **Categorize** and tag
   - Project type (dashboard, portfolio, SaaS...)
   - Keywords from prompt
   - Constraints applied
   - Outcome metrics

3. **Save** to claude-mem
   - Pattern: ui-patterns
   - Context: Full spec + result
   - Tags: searchable keywords
   - Success: Yes/No
```

---

## Memory Templates

### Template 1: Successful Constraint Combination

```json
{
  "category": "constraint-combinations",
  "title": "Paper & Ink + Architectural for Analytics Dashboard",
  "context": {
    "project_type": "analytics_dashboard",
    "constraints": ["paper_and_ink", "architectural", "print_first"],
    "anti_patterns_detected": ["card_grid", "glassmorphism", "neon_colors"],
    "creativity_level": 8,
    "outcome": "successful"
  },
  "result": {
    "accessibility_score": 95,
    "user_satisfaction": "high",
    "bundle_size": "12KB gzipped",
    "notes": "Warm tones from paper_and_ink worked well with architectural spatial metaphors"
  },
  "tags": ["analytics", "dashboard", "architectural", "print_first", "warm"],
  "timestamp": "2025-02-24T10:30:00Z"
}
```

### Template 2: Anti-Pattern Discovery

```json
{
  "category": "anti-patterns",
  "title": "Gradient Mesh Overuse in SaaS Products",
  "context": {
    "pattern": "gradient_mesh",
    "detection_rate": "high",
    "affected_projects": ["saas", "landing_pages"],
    "alternative": "solid_colors_with_subtle_depth"
  },
  "result": {
    "avoid": true,
    "reason": "Overused since 2023, creates generic tech aesthetic",
    "replacement": "Use paper_and_ink or warm_only constraints instead"
  },
  "tags": ["gradient", "mesh", "saas", "anti-trend"],
  "timestamp": "2025-02-24T11:00:00Z"
}
```

### Template 3: Design Decision

```json
{
  "category": "design-decisions",
  "title": "Choosing Architectural Over Mechanical for Spatial Applications",
  "context": {
    "decision": "architectural_constraint",
    "alternatives": ["mechanical", "biological"],
    "project_type": "spatial_application",
    "reasoning": "Architectural metaphors map better to spatial relationships"
  },
  "result": {
    "choice": "architectural",
    "rationale": "Users understand 'rooms' and 'spaces' intuitively",
    "outcome": "Improved user comprehension, reduced learning curve"
  },
  "tags": ["architectural", "spatial", "decision", "ux"],
  "timestamp": "2025-02-24T11:15:00Z"
}
```

---

## Integration Points

### In UI Orchestrator Skill

```yaml
# Frontmatter addition
memory:
  read: true    # Search memory before constraint selection
  save: true    # Save successful combinations after selection
  categories:
    - constraint-combinations
    - anti-patterns
    - design-decisions
```

### In UI Builder Skill

```yaml
# Frontmatter addition
memory:
  read: true    # Check for similar implementations
  save: true    # Save successful patterns after build
  categories:
    - ui-patterns
    - component-structures
```

### In UI Step Mode

```yaml
# Frontmatter addition
memory:
  read: false   # Interactive mode, no memory needed
  save: true    # Save user choices for future reference
  categories:
    - user-preferences
    - constraint-combinations
```

---

## Usage Examples

### Example 1: Search Before Implement

```markdown
# User request
/ui "Create analytics dashboard"

# System action (automatic)
Searching claude-mem for: "analytics dashboard constraint combinations"

Found: "Paper & Ink + Architectural for Analytics Dashboard"
- Used constraints: paper_and_ink, architectural, print_first
- Outcome: 95/100 accessibility score
- Bundle: 12KB gzipped

# Recommendation
Consider using same constraint combination for similar results.
```

### Example 2: Save After Completion

```markdown
# After build completes
Saving to claude-mem:

Category: constraint-combinations
Title: "Minimal Monochrome + Typography-First for Blog"
Constraints: ["monochrome_true", "typography_first"]
Tags: ["blog", "minimal", "typography"]

✓ Saved successfully
```

---

## Quality Gates

### Before Saving to Memory

- [ ] Build completed successfully
- [ ] Quality gates passed (a11y, anti-patterns)
- [ ] User confirmed satisfaction (if interactive)
- [ ] Metrics collected (bundle size, a11y score)
- [ ] Context documented (project type, keywords)

### Memory Validation

- [ ] Title is descriptive and searchable
- [ ] Tags include relevant keywords
- [ ] Context has enough detail for reuse
- [ ] Result has actionable information
- [ ] Timestamp is ISO 8601 format

---

## API Reference (for MCP Integration)

### Memory Search

```typescript
interface MemorySearchRequest {
  query: string;
  category?: string;
  limit?: number;
  threshold?: number;
}

interface MemorySearchResponse {
  results: MemoryEntry[];
  total: number;
}
```

### Memory Save

```typescript
interface MemorySaveRequest {
  category: string;
  title: string;
  context: Record<string, any>;
  result: Record<string, any>;
  tags: string[];
}

interface MemorySaveResponse {
  saved: boolean;
  id: string;
  timestamp: string;
}
```

---

*Memory Integration v1.0.0 - claude-mem for Strike UI Plugin*
