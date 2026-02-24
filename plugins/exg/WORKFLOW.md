# EXG Plugin - Workflow Diagram

## Visual Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     SESSION START                                │
│  User begins working: coding, debugging, learning, building     │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ACTIVE SESSION                               │
│  • Messages exchanged                                          │
│  • Tools used (Read, Edit, Bash, Task...)                      │
│  • Files modified                                              │
│  • Decisions made                                              │
│  • Struggles and breakthroughs                                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SESSION END                                  │
│  User types: exit or clear                                     │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              EXG HOOK TRIGGERED                                 │
│  session-end.js detects session termination                    │
│  → Captures session metadata                                   │
│  → Invokes exg skill                    │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         PHASE 1: COLLECT SESSION CONTEXT                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Session Metadata:                                       │   │
│  │ • Start/end timestamps                                 │   │
│  │ • Duration                                             │   │
│  │ • Total messages/turns                                 │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Session Scope:                                          │   │
│  │ • Primary objective                                     │   │
│  │ • Tools used                                            │   │
│  │ • Files modified                                        │   │
│  │ • Technologies discussed                                │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Session Arc:                                            │   │
│  │ • Initial problem/question                              │   │
│  │ • Exploration steps                                     │   │
│  │ • Dead ends and failures                                │   │
│  │ • Breakthrough moments                                  │   │
│  │ • Final outcome                                         │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Key Decisions:                                          │   │
│  │ • Technical choices with rationale                      │   │
│  │ • Rejected alternatives                                 │   │
│  │ • Compromises made                                      │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Human Interactions:                                     │   │
│  │ • User's explicit requests                              │   │
│  │ • Points of confusion                                   │   │
│  │ • "Aha!" moments                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         PHASE 2: GENERATE CONVERSATION SUMMARY                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ # Session Summary - [Date]                             │   │
│  │                                                         │   │
│  │ **Metadata:** duration, files, tools, outcome          │   │
│  │                                                         │   │
│  │ ## Objective (what we tried to do)                     │   │
│  │ ## Approach (how we tackled it)                         │   │
│  │ ## Key Decisions (table with rationale)                │   │
│  │ ## Challenges Encountered (dead ends)                   │   │
│  │ ## Outcome (final result with metrics)                  │   │
│  │ ## Learnings (knowledge gained)                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                              │
│  Quality Gates:                                              │
│  ✅ All sections filled                                      │
│  ✅ Specific file references                                 │
│  ✅ Dead ends documented                                     │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         PHASE 3: GENERATE SCRIPT THEATER                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ # Script Theater: [Title]                              │   │
│  │                                                         │   │
│  │ **Style:** [selected profile]                           │   │
│  │ **Duration:** [X minutes]                               │   │
│  │                                                         │   │
│  │ ## Scene 1: The Problem [0:00-1:30]                    │   │
│  │ **Human:** {quote}                                      │   │
│  │ **Assistant:** (thought) {response}                     │   │
│  │ *📄 file.ext:line - action*                             │   │
│  │                                                         │   │
│  │ ## Scene 2: The Exploration [1:30-4:00]                │   │
│  │ [Dialogue with failures and dead ends]                 │   │
│  │                                                         │   │
│  │ ## Scene 3: The Breakthrough [4:00-6:00]               │   │
│  │ [The "aha!" moment and solution]                       │   │
│  │                                                         │   │
│  │ ## Scene 4: The Reflection [6:00-7:00]                 │   │
│  │ [Lessons learned and takeaways]                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                              │
│  Quality Gates:                                              │
│  ✅ Authentic dialogue (real quotes)                         │
│  ✅ Includes failures and dead ends                          │
│  ✅ Shows evolution of understanding                         │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         PHASE 4: GENERATE SOCIAL POSTS                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ SELECT STYLE PROFILE:                                   │   │
│  │ • technical (code-focused, detailed)                    │   │
│  │ • storytelling (narrative arc, struggle)                │   │
│  │ • educational (step-by-step, beginner-friendly)         │   │
│  │ • opinion (bold stance, reasoned)                       │   │
│  │                                                         │   │
│  │ OR: Auto-detect based on session content                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ # LinkedIn Post                                         │   │
│  │ 🚀 **[Compelling Hook]**                                │   │
│  │                                                         │   │
│  │ [Story or explanation]                                 │   │
│  │                                                         │   │
│  │ [Code snippet or example]                              │   │
│  │                                                         │   │
│  │ [Key takeaway]                                         │   │
│  │                                                         │   │
│  │ #RelevantTags                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ # Twitter Thread                                        │   │
│  │ 1/ [Hook in < 280 chars]                               │   │
│  │                                                         │   │
│  │ 2/ [Elaboration with example]                          │   │
│  │                                                         │   │
│  │ 3/ [Key insight]                                       │   │
│  │                                                         │   │
│  │ 4/ [Call to action or question]                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ # Blog Post (Optional)                                  │   │
│  │ # [Title]                                              │   │
│  │                                                         │   │
│  │ [Full long-form content]                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                              │
│  Quality Gates:                                              │
│  ✅ Platform constraints respected (char limits)             │
│  ✅ Strong opening hook                                       │
│  ✅ Clear value for reader                                    │
│  ✅ Call-to-action included                                   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         PHASE 5: WRITE OUTPUTS                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Output Directory: .ex-g-se/                             │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ conversation.md          ← Session summary             │   │
│  │ script.md               ← Script theater               │   │
│  │ posts.md                ← Social posts                 │   │
│  │ metadata.json           ← Generation metadata          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CONTENT READY!                               │
│  • conversation.md → Future reference, documentation            │
│  • script.md → Video content creation                          │
│  • posts.md → Social media publishing                          │
│                                                                 │
│  Session complete! 🎉                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Manual Invocation Flow

```
USER REQUESTS CONTENT
(Optionally during or after session)
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│ "Generate [style] posts from this session"                  │
│                                                             │
│ Examples:                                                   │
│ • "Generate a technical deep-dive from this session"       │
│ • "Create storytelling LinkedIn posts"                      │
│ • "Turn this into a contrapoints-style video script"        │
│ • "Write educational posts about our debugging"             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ PARSE REQUEST                                               │
│                                                             │
│ 1. Detect style profile:                                    │
│    • "technical deep-dive" → technical profile              │
│    • "storytelling" → storytelling profile                  │
│    • "educational" → educational profile                    │
│    • "opinion" → opinion profile                            │
│                                                             │
│ 2. Detect platforms:                                        │
│    • "LinkedIn posts" → LinkedIn                            │
│    • "Twitter thread" → Twitter                             │
│    • "video script" → Script theater                        │
│    • "blog post" → Blog                                     │
│                                                             │
│ 3. Override auto-detection if specified                     │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │ PROCEED WITH PHASES 1-5      │
              │ (Using specified style)       │
              └───────────────────────────────┘
```

---

## Style Profile Selection

```
                    USER SPECIFIES STYLE?
                            │
              ┌─────────────┴─────────────┐
              │ YES                        │ NO
              ▼                            ▼
     ┌──────────────────┐        ┌──────────────────┐
     │ USE SPECIFIED    │        │ AUTO-DETECT      │
     │ STYLE PROFILE    │        │ BEST PROFILE     │
     └──────────────────┘        └──────────────────┘
              │                            │
              └─────────────┬──────────────┘
                            ▼
              ┌───────────────────────────────┐
              │ SESSION CONTENT ANALYSIS       │
              ├───────────────────────────────┤
               │ Heavy code, debugging  │
               │ Multiple dead ends      │
               │ Explaining concepts     │
               │ Debating choices        │
               └───────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                            ▼
     ┌──────────────────┐        ┌──────────────────┐
     │ TECHNICAL        │        │ STORYTELLING     │
     │ • Code snippets  │        │ • Narrative arc  │
     │ • File refs      │        │ • Struggles      │
     │ • Metrics        │        │ • Breakthroughs  │
     └──────────────────┘        └──────────────────┘

     ┌──────────────────┐        ┌──────────────────┐
     │ EDUCATIONAL      │        │ OPINION          │
     │ • Step-by-step   │        │ • Bold stance    │
     │ • Analogies      │        │ • Reasoning      │
     │ • Prerequisites  │        │ • Evidence       │
     └──────────────────┘        └──────────────────┘
```

---

## Quality Gates Flow

```
                    GENERATE CONTENT
                            │
                            ▼
              ┌───────────────────────────────┐
              │ VALIDATE CONVERSATION SUMMARY │
              ├───────────────────────────────┤
              │ ✅ All sections present?      │
              │ ✅ Specific file references?  │
              │ ✅ Dead ends documented?      │
              └─────────────┬─────────────────┘
                            │
                 ┌───────────┴───────────┐
                 │ PASS?                 │ FAIL
                 ▼                       ▼
         ┌───────────────┐       ┌───────────────┐
         │ CONTINUE      │       │ REGENERATE    │
         └───────────────┘       └───────────────┘
                 │
                 ▼
              ┌───────────────────────────────┐
              │ VALIDATE SCRIPT THEATER       │
              ├───────────────────────────────┤
              │ ✅ Authentic dialogue?        │
              │ ✅ Shows evolution?           │
              │ ✅ Includes failures?         │
              └─────────────┬─────────────────┘
                            │
                 ┌───────────┴───────────┐
                 │ PASS?                 │ FAIL
                 ▼                       ▼
         ┌───────────────┐       ┌───────────────┐
         │ CONTINUE      │       │ REGENERATE    │
         └───────────────┘       └───────────────┘
                 │
                 ▼
              ┌───────────────────────────────┐
              │ VALIDATE SOCIAL POSTS         │
              ├───────────────────────────────┤
              │ ✅ Platform constraints?      │
              │ ✅ Strong hook?               │
              │ ✅ Clear value?               │
              │ ✅ Call-to-action?            │
              └─────────────┬─────────────────┘
                            │
                 ┌───────────┴───────────┐
                 │ PASS?                 │ FAIL
                 ▼                       ▼
         ┌───────────────┐       ┌───────────────┐
         │ WRITE OUTPUTS │       │ REGENERATE    │
         └───────────────┘       └───────────────┘
                 │
                 ▼
         ┌───────────────┐
         │ CONTENT READY │
         └───────────────┘
```

---

## Output Examples

### Conversation Summary Structure

```
.ex-g-se/conversation.md
├── Metadata (duration, files, tools, outcome)
├── Objective (what we tried to do)
├── Approach (step-by-step)
├── Key Decisions (table with rationale)
├── Challenges (dead ends and failures)
├── Outcome (final result with metrics)
└── Learnings (knowledge gained)
```

### Script Theater Structure

```
.ex-g-se/script.md
├── Title and metadata
├── Scene 1: The Problem (0:00-1:30)
│   ├── Dialogue (Human/Assistant)
│   ├── Actions (*italic*)
│   ├── File references (📄 file.ext:line)
│   └── Thoughts ((parentheses))
├── Scene 2: The Exploration (1:30-4:00)
├── Scene 3: The Breakthrough (4:00-6:00)
├── Scene 4: The Reflection (6:00-7:00)
└── Post-Production Notes
```

### Social Posts Structure

```
.ex-g-se/posts.md
├── LinkedIn Post
│   ├── Hook (bold)
│   ├── Story/explanation
│   ├── Code/example
│   ├── Takeaway
│   └── Hashtags
├── Twitter Thread
│   ├── Tweet 1: Hook
│   ├── Tweet 2-3: Elaboration
│   ├── Tweet 4: Insight
│   └── Tweet 5: CTA
└── Blog Post (optional)
    ├── Title
    ├── Content
    └── Summary
```

---

**Workflow Version:** 1.0.0
**Last Updated:** 2025-02-24
