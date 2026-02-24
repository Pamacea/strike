---
name: exg
description: MANDATORY gate for generating session content - conversation summaries, script theater for video content, and platform-ready social posts (LinkedIn, Twitter, blog) based on style profiles. Use when ending a session or requesting specific content: "generate this as a technical deep-dive" or "create storytelling posts from our session" or "turn this session into video script and social posts". Outputs created in .ex-g-se/ directory. (user)
---

# EXG - Session Content Generation

**Core Principle:** Every session contains valuable content - conversations become knowledge, struggles become stories, and decisions become insights.

## When to Use

**Session End (recommended):**
- After completing work on a feature or bug fix
- Before ending a productive session
- When you want to document what was accomplished
- "Generate session content as technical deep-dive"
- "Create conversation summary and posts from this session"

**Manual Invocation (specific requests):**
- "Generate a technical deep-dive from this session"
- "Create LinkedIn posts in storytelling style about what we built"
- "Turn this into a contrapoints-style video script"
- "Make an educational tutorial from our debugging session"
- "Write opinion pieces about our architectural decisions"

**Style Selection Examples:**
```
"Generate this as a technical deep-dive" → Uses technical profile
"Make this storytelling with the struggle" → Uses storytelling profile
"Create an educational tutorial" → Uses educational profile
"Write a hot take about this" → Uses opinion profile
"Use the [profile-name] style" → Uses specified profile
```

## When NOT to Use

- **During active session** - Wait for session completion (context incomplete)
- **For one-off answers** - Only for multi-turn sessions with substantial content
- **Without session context** - Requires full conversation history
- **For private/sensitive work** - Check for secrets before generating public posts
- **When nothing was accomplished** - Not every session yields valuable content

## Workflow

### Phase 1: Collect Session Context (MANDATORY)

**Required Information:**
```
1. Session metadata:
   - Start/end timestamps
   - Duration
   - Total messages/turns

2. Session scope:
   - Primary objective (what we tried to do)
   - Tools used (Read, Edit, Bash, Task, etc.)
   - Files modified (with paths and line counts)
   - Technologies discussed

3. Session arc:
   - Initial problem/question
   - Exploration steps (what we tried)
   - Dead ends and failures (important!)
   - Breakthrough moments
   - Final outcome

4. Key decisions:
   - Technical choices with rationale
   - Rejected alternatives and why
   - Compromises made

5. Human interactions:
   - User's explicit requests/feedback
   - Points of confusion or clarification
   - "Aha!" moments (user or assistant)
```

**Sources:**
- Conversation history (full message log)
- File modifications (git diff or file list)
- Tool usage (tool call results)
- User's explicit requests (quoted directly)

### Phase 2: Generate Conversation Summary

**Structure (from content-reference.json):**
```markdown
# Session Summary - [Date]

**Metadata:**
- Duration: {X minutes}
- Files Modified: {count}
- Tools Used: {list}
- Outcome: {success/failure/partial}

## Objective
{What we tried to accomplish}

## Approach
{How we tackled it - step by step}

## Key Decisions
| Decision | Rationale | Alternative Considered |
|----------|-----------|----------------------|
| {decision 1} | {why} | {alternative} |
| {decision 2} | {why} | {alternative} |

## Challenges Encountered
{Obstacles, dead ends, bugs}

## Outcome
{Final result with metrics if applicable}

## Learnings
{Knowledge gained, patterns discovered}
```

**Quality Gates:**
- ✅ All sections filled (no placeholders)
- ✅ Specific file references (file.ext:line)
- ✅ Concrete outcomes (not "we did stuff")
- ✅ Dead ends documented (not just successes)
- ✅ Human's original words quoted where relevant

### Phase 3: Generate Script Theater

**Purpose:** Create content for video production (YouTube, tutorials, demos)

**Format:**
```markdown
# Script Theater: [Title]

**Style:** [Selected profile from content-reference.json]
**Estimated Duration:** {X minutes}

---

## Scene 1: The Problem [0:00-1:30]

**Human:** {Initial request - quoted directly}

**Assistant:** (Thoughtful pause) Let me understand what we're working with...

*Assistant opens file, reads context*

**Assistant:** {Initial assessment, uncertainty shown}

**Human:** {Clarification or correction}

**Assistant:** {Refined approach}

*📄 file.ext:42 - Reading the configuration*

**Assistant:** Ah, I see - this is actually about {realization}

---

## Scene 2: The Exploration [1:30-4:00]

**Assistant:** Let me try {approach}

*📄 file.ext:100 - Attempting first solution*

**Assistant:** {Result - showing the attempt}

**Human:** {Feedback - this didn't work}

**Assistant:** (Self-correction) Right, the issue is {insight}

*📄 file.ext:150 - Trying different angle*

**Assistant:** {Second attempt, showing evolution}

**Human:** {Still not quite right}

**Assistant:** {Third attempt, closer but...}

*📄 file.ext:200 - Dead end*

**Assistant:** Hmm, this path isn't working. Let me reconsider.

---

## Scene 3: The Breakthrough [4:00-6:00]

**Assistant:** Wait - I think I've been approaching this wrong.

*💡 Realization moment*

**Assistant:** The real issue is {insight}. Let me try {solution}.

*📄 file.ext:250 - Implementing actual fix*

**Assistant:** {Explanation of what changed and why}

**Human:** {Verification - did it work?}

**Assistant:** {Confirmation with evidence}

*✅ Success confirmed*

---

## Scene 4: The Reflection [6:00-7:00]

**Assistant:** What made this tricky was {lesson}.

**Human:** {Takeaway or follow-up question}

**Assistant:** {Broader insight, pattern for future}

**Human:** {Final thanks or acknowledgment}

**Assistant:** {Closing, tie back to beginning}

---

**Post-Production Notes:**
- Key visual moments: {suggestions for B-roll}
- Code snippets to highlight: {specific examples}
- Tone shifts: {where to change pacing}
- Call-outs: {key insights for graphics}
```

**Quality Gates:**
- ✅ Authentic dialogue (real quotes from session)
- ✅ Includes failures and dead ends (not just success)
- ✅ Shows evolution of understanding
- ✅ File references with actions
- ✅ Internal thoughts shown (in parentheses)
- ✅ Emotional context (frustration, excitement)

### Phase 4: Generate Social Posts

**Load style profile from content-reference.json:**

```javascript
// Pseudocode for profile selection
const profiles = loadReference('content-reference.json').styleProfiles;

// User can specify profile directly, or we auto-detect
const selectedProfile = userSpecified
  ? profiles[userSpecified]  // "technical", "storytelling", "educational", "opinion"
  : detectBestProfile(session); // Auto-detect based on content
```

**Template Filling (for each platform):**

```markdown
# LinkedIn Post

**Profile:** {selectedProfile.name}
**Template:** From content-reference.json → profiles.{profile}.postTemplates.linkedin

**Variables to Fill:**
- title: {Compelling headline}
- challenge: {What was hard}
- keyInsight: {Main learning}
- codeExample: {Brief snippet if applicable}
- outcome: {Result}
- techStack: {Relevant hashtags}
- storyHook: {Opening for narrative}
- timeSpent: {Duration}
- struggle: {What went wrong}
- breakthrough: {What worked}
- lesson: {Key takeaway}
- cta: {Call to action}

**Generated Post:**
{Fill template with session-specific content}

---

# Twitter Thread

**Profile:** {selectedProfile.name}
**Template:** From content-reference.json → profiles.{profile}.postTemplates.twitter

**Structure:**
- Tweet 1: Hook + main point
- Tweet 2-3: Elaboration with example
- Tweet 4: Key insight
- Tweet 5: Call to action or question

**Generated Thread:**
{Fill template with session-specific content}

---

# Blog Post (Optional)

**Profile:** {selectedProfile.name}
**Template:** From content-reference.json → profiles.{profile}.postTemplates.blog

**Generated Post:**
{Fill template with session-specific content}
```

**Quality Gates:**
- ✅ Follows platform constraints (char limits, formatting)
- ✅ Uses profile-specified tone and structure
- ✅ Includes specific details from session (not generic)
- ✅ Has clear value proposition for reader
- ✅ Includes relevant hashtags (from profile or auto-generated)
- ✅ Call-to-action or engagement prompt

### Phase 5: Write Outputs

**Output Directory:** `{projectRoot}/.ex-g-se/`

**Files Created:**
```
.ex-g-se/
├── conversation.md          # Session summary (Phase 2)
├── script.md               # Script theater (Phase 3)
├── posts.md                # Social posts (Phase 4)
└── metadata.json           # Generation metadata
```

**metadata.json Structure:**
```json
{
  "generatedAt": "2025-02-24T10:30:00Z",
  "sessionId": "session-uuid",
  "profile": "technical",
  "outputs": {
    "conversation": "conversation.md",
    "script": "script.md",
    "posts": "posts.md"
  },
  "sessionMetrics": {
    "duration": "45 minutes",
    "filesModified": 5,
    "toolsUsed": ["Read", "Edit", "Bash", "Task"],
    "outcome": "success"
  },
  "qualityChecks": {
    "conversationSummary": "passed",
    "scriptTheater": "passed",
    "socialPosts": "passed"
  }
}
```

## Style Profile Selection

**User-Specified Profiles:**
```
"Generate this as a [technical deep-dive]"
"Make it [storytelling] style"
"Create an [educational] tutorial"
"Write an [opinion] piece"
"Use the [profile-name] profile"
```

**Auto-Detection (when not specified):**

| Session Pattern | Detected Profile | Rationale |
|-----------------|------------------|-----------|
| Heavy code, debugging, optimization | `technical` | Focus on implementation details |
| Multiple dead ends, "why is this happening", frustration | `storytelling` | Clear narrative arc with struggle |
| Explaining concepts, step-by-step, "how do I" | `educational` | Teaching moment |
| Debating choices, "why not X", architectural decisions | `opinion` | Stance-taking with reasoning |
| Mixed signals | Default to `storytelling` | Most universally engaging |

**Custom Profile Requests:**
```
"Generate posts in the style of [specific creator/style]"
"Make it sound like [reference]"
"Use a tone that's [adjective] and [adjective]"
```

→ Create ad-hoc profile by remixing content-reference.json patterns

## Anti-Patterns

| Anti-Pattern | Why It's Wrong | Fix |
|--------------|----------------|-----|
| Generic summary without specifics | Not valuable for future reference | Include file paths, line numbers, exact outcomes |
| Script that shows instant success | Unrealistic, loses audience trust | Show dead ends, wrong turns, evolution |
| Posts that say "I built X" without details | No value for readers | Explain the challenge, the approach, the learning |
| Using wrong style profile | Content doesn't match audience | Match profile to session content or user request |
| Ignoring dead ends and failures | Misses educational value | Document what didn't work and why |
| Writing posts without hooks | No one will read them | Start with compelling opening line |
| Skipping quality gates | Outputs may be incomplete | Validate all sections before writing |

## Integration with Other Skills

**Requires:**
- **exg plugin hook** - Automatic invocation at session end

**Complements:**
- **skill-check** - Validate this skill's quality before deployment
- **pattern-capture** - Save successful content patterns for reuse

**Related:**
- **documentation-generation** - For technical docs (vs. social content)

## Quick Reference

**Automatic Invocation:**
- Triggered by exg plugin hook at session end
- Outputs: `.ex-g-se/conversation.md`, `.ex-g-se/script.md`, `.ex-g-se/posts.md`

**Manual Invocation:**
```
"Generate [style] posts from this session"
"Create a technical deep-dive summary"
"Turn this into a storytelling script"
"Write educational content about what we did"
```

**Style Profiles:**
- `technical` - Code-focused, detailed metrics
- `storytelling` - Narrative arc, struggle → breakthrough
- `educational` - Step-by-step, beginner-friendly
- `opinion` - Bold stance, reasoned argument

**Quality Checklist:**
- ✅ All outputs generated (conversation, script, posts)
- ✅ Specific details included (files, tools, outcomes)
- ✅ Failures documented (not just successes)
- ✅ Platform constraints respected (char limits, formatting)
- ✅ Style profile applied consistently

**Files Reference:**
- Style templates: `plugins/exg/data/content-reference.json`
- Hook trigger: `plugins/exg/hooks/session-end.js`

---

## Success Criteria

This skill works when:

- Every substantial session produces reusable content
- Conversation summaries save time for future reference
- Script theater translates into engaging video content
- Social posts perform well (engagement, shares, saves)
- Style profiles match content and audience appropriately
- Quality gates catch incomplete outputs before writing
- Users can request specific styles or profiles

**The test:** If you can hand the script.md to a video creator and they can produce a high-quality video without asking questions, the skill succeeded.
