# EXG Plugin - Session End Content Generator

**Version:** 1.0.0 | **Category:** Content Generation

## What is EXG?

EXG (EXtract & Generate) automatically transforms your coding sessions into reusable content:

- **Conversation Summary** - Complete session overview for future reference
- **Script Theater** - Dramatized dialogue for video content creation
- **Social Posts** - Platform-ready posts for LinkedIn, Twitter, blogs

## How It Works

### Automatic Generation (via Hook)

When you end a session (`exit` or `clear`), the EXG hook triggers and generates content:

```
Session ends
    ↓
EXG hook fires
    ↓
exg skill invoked
    ↓
Three outputs created in .ex-g-se/:
├── conversation.md     # Session summary
├── script.md          # Script theater
└── posts.md           # Social posts
```

### Manual Invocation

Request specific content styles during or after a session:

```
"Generate a technical deep-dive from this session"
"Create LinkedIn posts in storytelling style"
"Turn this into a contrapoints-style video script"
"Write educational posts about our debugging session"
```

## Style Profiles

EXG includes 4 pre-built style profiles in `data/content-reference.json`:

| Profile | Best For | Tone | Output |
|---------|----------|------|--------|
| **Technical** | Code-heavy sessions, debugging, optimization | Professional, detailed | Code snippets, metrics, file references |
| **Storytelling** | Sessions with struggles, dead ends | Engaging, narrative | Problem → struggle → breakthrough arc |
| **Educational** | Teaching moments, explanations | Clear, step-by-step | Beginner-friendly, examples, analogies |
| **Opinion** | Architectural decisions, debates | Bold, thought-provoking | Clear stance with reasoning |

## Quick Start

### Installation

EXG is part of the strike plugin suite. Install strike:

```bash
npx skills add https://github.com/Pamacea/strike
```

### Enable EXG Hook

The hook is automatically enabled when strike is installed. Verify:

```bash
# Check installed plugins
npx skills list

# Should show:
# - strike/exg (Session End Content Generator)
```

### Use EXG

**Automatic (recommended):**
```bash
# Work on your project normally
cd /path/to/project

# When done, exit the session
exit

# EXG automatically generates content in .ex-g-se/
```

**Manual (specific style):**
```bash
# During or after session
"Generate this as a technical deep-dive"
"Create storytelling posts about our debugging session"
```

## Output Structure

```
project/
└── .ex-g-se/
    ├── conversation.md     # Session summary (what we did, why, how)
    ├── script.md          # Script theater (dialogue for video)
    ├── posts.md           # Social posts (LinkedIn, Twitter, blog)
    └── metadata.json      # Generation metadata and quality checks
```

### Conversation Summary

```markdown
# Session Summary - 2025-02-24

**Metadata:**
- Duration: 45 minutes
- Files Modified: 5
- Tools Used: Read, Edit, Bash, Task
- Outcome: success

## Objective
Fix authentication bug in user login flow

## Approach
1. Identified root cause in auth.service.ts
2. Added proper error handling
3. Added regression test

## Key Decisions
| Decision | Rationale | Alternative |
|----------|-----------|-------------|
| Use Zod validation | Type-safe error handling | Manual validation |
| Add test first | TDD approach, ensure fix | Test after fix |

## Outcome
✅ Bug fixed, test added, no regressions
```

### Script Theater

```markdown
# Script Theater: Fixing the Auth Bug

**Style:** Technical Deep-Dive
**Duration:** ~7 minutes

---

## Scene 1: The Problem

**Human:** "Users are getting logged out randomly"

**Assistant:** Let me check the auth service...

*📄 auth.service.ts:45 - Reading token validation*

**Assistant:** Ah! The token expiry check is wrong...

---

## Scene 2: The Fix

**Assistant:** The issue is we're comparing seconds to milliseconds.

*📄 auth.service.ts:45 - Fixing the comparison*

**Assistant:** Changed `token.expiresAt < now` to `token.expiresAt * 1000 < now`

**Human:** "That makes sense - let's test it"

...
```

### Social Posts

```markdown
# LinkedIn Post

🚀 **Spent 3 hours debugging a "random logout" issue**

Here's what I wish I knew starting out:

The bug wasn't in the auth logic. It was in the token expiry check.

We were comparing:
❌ token.expiresAt (seconds) < now (milliseconds)
✅ token.expiresAt * 1000 < now (both in ms)

Simple fix, but finding it required:
1. Reading the token service code
2. Adding console.log timestamps
3. Realizing the unit mismatch

**Lesson:** Always check your units when comparing timestamps!

#Developer #Debugging #TypeScript

---

# Twitter Thread

1/ Spent 3 hours chasing a "random logout" bug.

The fix? One character: `* 1000`

A thread 🧵👇

2/ Users were getting logged out unexpectedly.

I checked:
- Auth logic ✓
- Token generation ✓
- Session storage ✓

All looked fine...

[continues...]
```

## Style Profile Reference

### Technical Profile

**Use when:** Deep code work, optimization, debugging

**Includes:**
- Code snippets with syntax highlighting
- File references (file.ext:line)
- Performance metrics
- Technical rationale

**Platforms:** LinkedIn (long-form), Blog posts

### Storytelling Profile

**Use when:** Sessions with struggles, dead ends, learning

**Includes:**
- Emotional context (frustration, excitement)
- Dead ends and wrong turns
- Breakthrough moments
- Personal takeaways

**Platforms:** LinkedIn (narrative), Twitter (thread)

### Educational Profile

**Use when:** Teaching, explaining concepts

**Includes:**
- Step-by-step breakdown
- Analogies and metaphors
- Common pitfalls
- Prerequisites clearly stated

**Platforms:** LinkedIn (tutorial), Blog posts, Twitter (thread)

### Opinion Profile

**Use when:** Architectural decisions, debates

**Includes:**
- Clear stance on issue
- Evidence and reasoning
- Counterarguments acknowledged
- Respectful disagreement

**Platforms:** LinkedIn (thought leadership), Twitter (hot take)

## Configuration

### Customize Style Profiles

Edit `plugins/exg/data/content-reference.json`:

```json
{
  "styleProfiles": {
    "myCustomProfile": {
      "name": "My Style",
      "tone": "professional, witty",
      "audience": "tech community",
      "patterns": ["pattern1", "pattern2"],
      "antiPatterns": ["avoid1", "avoid2"],
      "postTemplates": {
        "linkedin": "Template with {variables}",
        "twitter": "Thread template",
        "blog": "Blog post template"
      }
    }
  }
}
```

### Disable EXG Hook

If you don't want automatic generation:

```bash
# Disable the hook
npx skills disable strike/exg

# Re-enable later
npx skills enable strike/exg
```

## Examples

### Example 1: Technical Deep-Dive

```
"Generate a technical deep-dive from this debugging session"
```

**Output:**
- Conversation summary with file references
- Script showing code exploration
- LinkedIn post with code snippet
- Blog post with full explanation

### Example 2: Storytelling Posts

```
"Create storytelling LinkedIn posts about our refactoring"
```

**Output:**
- Narrative arc: struggle → breakthrough
- Emotional context included
- Engaging hook for LinkedIn
- Twitter thread format

### Example 3: Educational Tutorial

```
"Turn this into an educational tutorial on authentication"
```

**Output:**
- Step-by-step breakdown
- Beginner-friendly explanations
- Prerequisites listed
- Common pitfalls section

## File Reference

| File | Purpose |
|------|---------|
| `plugins/exg/.claude-plugin/plugin.json` | Plugin configuration |
| `plugins/exg/hooks/session-end.js` | Hook trigger |
| `plugins/exg/skills/exg/SKILL.md` | Core skill logic |
| `plugins/exg/data/content-reference.json` | Style profiles and templates |

## Quality Gates

EXG validates outputs before writing:

**Conversation Summary:**
- ✅ All sections present and filled
- ✅ Specific file references included
- ✅ Dead ends documented (not just successes)

**Script Theater:**
- ✅ Authentic dialogue (real quotes)
- ✅ Shows evolution of understanding
- ✅ Includes failures and wrong turns

**Social Posts:**
- ✅ Follows platform constraints
- ✅ Strong opening hook
- ✅ Clear value for reader
- ✅ Call-to-action included

## Anti-Patterns

| ❌ Don't | ✅ Do |
|---------|-------|
| Generic summaries | Specific details with file refs |
| Show instant success | Include dead ends and struggles |
| "I built X" posts | Explain the challenge and approach |
| Ignore failures | Document what didn't work and why |
| Skip quality checks | Validate all sections before writing |

## Contributing

Want to add a new style profile? Edit `content-reference.json`:

```json
{
  "styleProfiles": {
    "yourProfile": {
      "name": "Your Profile Name",
      "tone": "description",
      "audience": "who it's for",
      "patterns": ["what works"],
      "antiPatterns": ["what to avoid"],
      "postTemplates": {
        "linkedin": "{template} with {variables}",
        "twitter": "{thread template}",
        "blog": "{blog template}"
      }
    }
  }
}
```

## License

MIT - Part of the strike plugin suite

---

**Version:** 1.0.0 | **Last updated:** 2025-02-24 | **Plugin:** strike/exg
