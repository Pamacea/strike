---
name: exg
description: MANDATORY gate for generating session content - conversation summaries, script theater for video content, and platform-ready social posts (LinkedIn, Twitter, blog) based on style profiles. Use when ending a session or requesting specific content: "generate this as a technical deep-dive" or "create storytelling posts from our session" or "turn this session into video script and social posts". Outputs created in .ex-g-se/ directory. (user)
---

# EXG - Session Content Generation v2.0

**Core Principle:** Every session contains valuable content - conversations become knowledge, struggles become stories, and decisions become insights.

---

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

---

## 📋 Usage Guidelines - When This Excels

### Optimal Session Characteristics

**DO invoke EXG when:**
- Session has 10+ message turns (substantial content)
- At least one file was modified or created
- A problem was solved (even partially)
- Technical decisions were made with rationale
- Dead ends or failures occurred (valuable learning!)
- User expressed satisfaction or "aha!" moments
- Session lasted 15+ minutes

**WAIT for completion when:**
- Session is still in progress (context incomplete)
- Work is exploratory with no clear outcome
- User is still debugging or iterating

**SECURITY CHECK before generating:**
- Scan for API keys, passwords, tokens
- Verify no sensitive user data in conversation
- Check for proprietary information
- Confirm project is public-shareable

**CREATE content when:**
- Session has a clear narrative arc (problem → exploration → solution)
- Technical insights were discovered
- Decisions with trade-offs were made
- Failures led to learning moments

---

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

---

## 🎯 Style Profile Selection

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

---

## ✅ Positive Directives - Excellence Standards

| DO This | Why It Works | How to Apply |
|---------|--------------|--------------|
| **Include specific file references** | Future-you can find exact context | Use format `file.ext:line` consistently |
| **Show dead ends and failures** | Builds trust, educational value | Document attempts that didn't work |
| **Quote human's exact words** | Authenticity, captures real thinking | Copy directly from conversation |
| **Start posts with compelling hooks** | Captures attention in crowded feeds | Use bold statement, question, or surprise |
| **Include metrics when possible** | Credibility, concrete outcomes | "Reduced bundle by 47%" not "made it faster" |
| **Show evolution of understanding** | Relatable, mirrors viewer's journey | Include "wait, let me reconsider" moments |
| **Match style profile to content** | Right tone for right audience | Technical→devs, Storytelling→everyone |
| **Add emotional context** | Human connection, memorable | Note frustration, excitement, relief |
| **Validate all sections before writing** | Prevents incomplete outputs | Use Quality Gates checklist |
| **Include code snippets** | Practical value, shareable | Show before/after or key changes |
| **Explain the "why" behind decisions** | Transferable knowledge | Not just what, but reasoning |
| **Add call-to-action in posts** | Engagement, conversation starter | Ask question or invite comment |
| **Respect platform constraints** | Professional, native feel | LinkedIn formatting, Twitter threading |
| **Write for future reference** | Creates knowledge base | You'll thank yourself later |

---

## 🔄 Content Enhancement Patterns

### Pattern: The Struggle-to-Breakthrough Arc

**Apply when:** Session involved debugging, multiple attempts, frustration

**Structure:**
```
1. Initial confidence → First attempt fails
2. Confusion → Second attempt, different angle
3. Realization moment → "Wait, what if..."
4. Solution implementation → Step-by-step fix
5. Verification → Evidence it worked
6. Reflection → What made this tricky
```

**Key phrases to include:**
- "That didn't work as expected"
- "Let me try a different approach"
- "Ah, I see the issue now"
- "The problem was actually..."

### Pattern: The Decision Rationale

**Apply when:** Architectural choices, tech stack decisions, trade-offs

**Structure:**
```
1. Problem statement
2. Options considered (3+ alternatives)
3. Evaluation criteria (performance, maintainability, etc.)
4. Chosen solution with rationale
5. Acknowledged trade-offs
6. Rejected alternatives with reasons
```

**Key phrases to include:**
- "We could use X, but Y has the advantage of..."
- "The trade-off here is..."
- "I considered [alternative], but decided against it because..."

### Pattern: The Teaching Moment

**Apply when:** Explaining concepts, step-by-step guidance, "how do I" queries

**Structure:**
```
1. Question posed by learner
2. Concept explanation (with analogy)
3. Step-by-step implementation
4. Common pitfalls to avoid
5. Verification / testing
6. Next steps / further learning
```

**Key phrases to include:**
- "Here's the key concept"
- "Think of it like..."
- "A common mistake is..."
- "You can verify this by..."

### Pattern: The Hot Take

**Apply when:** Strong opinions, controversial stances, debate-worthy content

**Structure:**
```
1. Bold claim (the hot take)
2. Context / setup
3. Evidence and reasoning
4. Acknowledge counterarguments
5. Reaffirm stance
6. Invite discussion
```

**Key phrases to include:**
- "Here's a controversial opinion"
- "Most people do X, but I believe..."
- "The evidence suggests..."
- "Yes, [counterargument], but..."
```

---

## 🔗 Integration with Other Skills

**Requires:**
- **exg plugin hook** - Automatic invocation at session end

**Complements:**
- **skill-check** - Validate this skill's quality before deployment
- **pattern-capture** - Save successful content patterns for reuse

**Related:**
- **documentation-generation** - For technical docs (vs. social content)

---

## 📋 Quick Reference

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

## 🎯 Success Criteria

This skill works when:

- Every substantial session produces reusable content
- Conversation summaries save time for future reference
- Script theater translates into engaging video content
- Social posts perform well (engagement, shares, saves)
- Style profiles match content and audience appropriately
- Quality gates catch incomplete outputs before writing
- Users can request specific styles or profiles

**The test:** If you can hand the script.md to a video creator and they can produce a high-quality video without asking questions, the skill succeeded.

---

## 🏆 Positive Prompting Manifesto

This skill embodies the **Positive Prompting** philosophy:

1. **Affirmative Direction**: Tell WHAT to include, not what to avoid
2. **Pattern Recognition**: Match session type to appropriate narrative structure
3. **Specific Excellence**: Clear quality gates that ensure professional output
4. **Authentic Content**: Real quotes, real struggles, real learning

**Result**: Content that feels genuine, teaches effectively, and performs well on social platforms.
