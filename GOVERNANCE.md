# Strike Marketplace Governance

Guidelines for maintaining quality, consistency, and community standards in the Strike marketplace.

## Table of Contents

- [Quality Standards](#quality-standards)
- [Review Process](#review-process)
- [Acceptance Criteria](#acceptance-criteria)
- [Maintenance Policy](#maintenance-policy)
- [Community Guidelines](#community-guidelines)
- [Dispute Resolution](#dispute-resolution)

## Quality Standards

### UI Patterns

**Must Have:**
- Clear, concise description
- Proper scoring (creativity, difficulty, impact, synergy)
- At least 2 examples
- Compatibility information
- Category assignment

**Should Have:**
- Visual preview images
- Code examples
- Accessibility rating
- Real-world usage examples

**Must Not Have:**
- Generic, trendy patterns
- Overused designs (card grids, glassmorphism, etc.)
- Inadequate descriptions

### Constraints

**Must Have:**
- Clear description of what's restricted
- Proper scoring metadata
- Examples of usage
- Category assignment
- Compatibility information

**Should Have:**
- Inspiration/rationale documented
- Comparison to similar constraints
- Implementation tips

**Must Not Have:**
- Overly restrictive constraints (useless)
- Overly vague constraints (unclear)
- Duplicate functionality

### Workflows

**Must Have:**
- Valid DOT syntax
- Clear purpose description
- Estimated execution time
- Use case examples

**Should Have:**
- Visual diagram
- Step-by-step explanation
- Performance characteristics

**Must Not Have:**
- Invalid DOT syntax
- Overly complex logic
- Incomplete paths

## Review Process

### Automated Checks

All submissions must pass:

1. **Schema Validation** - JSON structure validation
2. **Format Check** - Prettier formatting
3. **Linting** - Shell scripts linted
4. **PR Title** - Conventional commit format

### Community Review

1. **Submission** - PR created with appropriate prefix (`pattern:`, `constraint:`, `workflow:`, `plugin:`)
2. **Automated Validation** - CI/CD checks run
3. **Community Feedback** - 7-day feedback period
4. **Maintainer Review** - Maintainer evaluates submission
5. **Approval** - Approved and merged or feedback provided

### Review Timeline

| Phase | Duration |
|-------|----------|
| Automated validation | ~5 minutes |
| Community feedback | 7 days |
| Maintainer review | 48 hours |
| Total | ~9-10 days |

### Fast-Track Criteria

Some submissions may be fast-tracked:

- Bug fixes
- Documentation improvements
- Minor scoring adjustments
- Typos/corrections

Fast-tracked PRs: ~24-48 hours total

## Acceptance Criteria

### Patterns

✅ **Accept if:**
- Novel, non-generic approach
- Clear use cases defined
- Proper scoring (40-100 total)
- Valid JSON schema
- Examples provided
- Compatible with 2+ frameworks

❌ **Reject if:**
- Generic/trendy pattern
- Inadequate description
- Invalid JSON
- No examples
- Missing metadata

### Constraints

✅ **Accept if:**
- Unique constraint (not duplicate)
- Clear boundaries defined
- Implementable guidance
- Proper scoring (30-100 total)
- Real-world applicability

❌ **Reject if:**
- Duplicate of existing constraint
- Too vague or unclear
- Overly restrictive (unusable)
- Invalid JSON
- Missing metadata

### Workflows

✅ **Accept if:**
- Valid DOT syntax
- Clear purpose
- Complete logic paths
- Estimated time provided
- Tested successfully

❌ **Reject if:**
- Invalid DOT syntax
- Incomplete paths
- Unclear purpose
- Untested

## Maintenance Policy

### Deprecation

Items may be deprecated if:

- No longer relevant (outdated patterns)
- Superseded by better alternatives
- Rarely used (low download count)
- Quality issues discovered

### Deprecation Process

1. **Notice** - 30-day deprecation notice
2. **Feedback Period** - Community can object
3. **Removal** - Removed if no objections
4. **Archive** - Moved to `registry/deprecated/`

### Updating

Items may be updated for:

- Bug fixes
- Improved scoring
- Better examples
- Compatibility additions
- Metadata enhancements

Minor updates (scoring, examples) - Direct commit
Major updates (structure, metadata) - PR required

## Community Guidelines

### Code of Conduct

1. **Be Respectful** - Constructive feedback only
2. **Be Inclusive** - Welcome all contributors
3. **Be Collaborative** - Work together on improvements
4. **Be Professional** - Maintain professional discourse

### Contribution Recognition

Contributors are recognized through:

- GitHub contributor stats
- Release notes
- Marketplace author attribution
- Annual contributor highlights

### Disagreements

Healthy disagreement is encouraged. Guidelines:

- Critique ideas, not people
- Provide reasoning for objections
- Offer alternatives when rejecting
- Seek consensus when possible

## Dispute Resolution

### Escalation Path

1. **Author + Maintainer** - Direct discussion
2. **Community Input** - GitHub discussion
3. **Maintainer Vote** - Final decision

### Appeals

If contribution is rejected:

1. **Clarification Request** - Ask for specific feedback
2. **Revision** - Address feedback and resubmit
3. **Appeal** - Request re-review with new information

### Blocking Issues

If contribution is blocked:

- Clear reason provided
- Specific requirements listed
- Path forward outlined

## Quality Metrics

### Success Indicators

**Marketplace Health:**
- 100+ patterns by month 6
- 50+ constraints by month 6
- 20+ workflows by month 6
- <5% rejection rate

**Community Engagement:**
- 5+ contributors by month 3
- 20+ contributors by month 6
- 100+ GitHub stars by month 6
- Active discussions

**Quality Standards:**
- 100% validation pass rate
- 95%+ accessibility compliance
- <24h response to issues
- <48h PR review time

## Maintainer Responsibilities

### Code Review

- Timely reviews (<48 hours)
- Clear, constructive feedback
- Explain rejection reasons
- Suggest improvements

### Quality Assurance

- Validate all submissions
- Test marketplace items
- Monitor quality metrics
- Address deprecation candidates

### Community Building

- Welcome new contributors
- Recognize contributions
- Facilitate discussions
- Host periodic reviews

### Documentation

- Keep CONTRIBUTING.md current
- Update quality standards
- Document governance changes
- Maintain changelog

## Versioning

### Marketplace Version

Marketplace version follows SemVer:

- **MAJOR** - Breaking changes to schema/structure
- **MINOR** - New items, backward-compatible changes
- **PATCH** - Bug fixes, scoring updates

Current version: **2.0.0**

### Item Version

Individual items have independent versions:

- **1.0.0** - Initial release
- **1.1.0** - Examples added, scoring refined
- **2.0.0** - Structure changed, breaking changes

## Future Improvements

Planned governance enhancements:

- [ ] Automated accessibility testing
- [ ] Visual regression testing
- [ ] Community voting system
- [ ] Contributor leaderboard
- [ ] Quality badges for items
- [ ] Automatic deprecation warnings

---

**Last Updated:** 2025-02-19
**Version:** 1.0.0
