# UI Anti-Patterns - The 100 Forbidden Patterns

> **Part of:** `/ui` skill
> **Purpose:** Comprehensive blacklist of overused UI patterns

---

## 🚫 Visual & CSS Anti-Patterns (15)

### 1. NO Neon/Outer Glows
**Problem:** Default box-shadow glows look cheap and dated
**Fix:** Use inner borders or subtle tinted shadows
**When banned:** Always - unless specifically requested for "cyberpunk" theme

### 2. NO Pure Black
**Problem:** #000000 is too harsh, creates eye strain
**Fix:** Use off-black, zinc-950, or charcoal (#0a0a0a, #1a1a1a)
**When banned:** Always - pure black has no place in modern UI

### 3. NO Oversaturated Accents
**Problem:** Neon colors don't blend with neutrals
**Fix:** Desaturate accents to <80% saturation
**When banned:** Always - except for specific branding requirements

### 4. NO Excessive Gradient Text
**Problem:** text-fill gradients on large headers
**Fix:** Use solid colors with weight/color for hierarchy
**When banned:** On body text, long-form content

### 5. NO Custom Mouse Cursors
**Problem:** Outdated trend, ruins accessibility
**Fix:** Use system cursor, CSS cursor property only
**When banned:** Always - custom cursors are 2015-era trend

### 6. NO Gradient Mesh Backgrounds
**Problem:** Lava-lamp blobs everywhere since 2021
**Fix:** Solid colors, subtle patterns, or photographic backgrounds
**When banned:** On SaaS/app interfaces (acceptable for portfolios)

### 7. NO Glassmorphism Overuse
**Problem:** backdrop-blur on every surface
**Fix:** Use glass sparingly, only where elevation matters
**When banned:** On dashboards, data-heavy interfaces

### 8. NO Blob Morphing
**Problem:** Organic shape animations are distracting
**Fix:** Static geometric shapes or no shapes at all
**When banned:** On professional interfaces

### 9. NO Scanlines
**Problem:** Retro effect that reduces readability
**Fix:** Clean backgrounds without artificial texture
**When banned:** Always except specific retro aesthetic requests

### 10. NO Glitch Text Effects
**Problem:** Hard to read, accessibility nightmare
**Fix:** Clean, readable typography
**When banned:** On body text, UI labels

### 11. NO Particle Canvas Backgrounds
**Problem:** Every SaaS landing page has this
**Fix:** Static background or subtle gradient
**When banned:** On product interfaces

### 12. NO Chrome Reflections
**Problem:** Fake glossy highlights on everything
**Fix:** Flat design or subtle shadows
**When banned:** Always - 2010-era trend

### 13. NO Drop Shadows Everywhere
**Problem:** Elevation inflation
**Fix:** Use borders, spacing, or minimal shadows
**When banned:** On dense interfaces

### 14. NO Animated Gradients
**Problem:** Constant motion is distracting
**Fix:** Static gradients or solid colors
**When banned:** On work-focused interfaces

### 15. NO Noise Textures Over Everything
**Problem:** Reduces readability, looks dirty
**Fix:** Clean surfaces or subtle texture only
**When banned:** On text-heavy interfaces

---

## 🚫 Typography Anti-Patterns (10)

### 16. NO Inter Font
**Problem:** Overused default, lacks character
**Fix:** Use Geist, Outfit, Cabinet Grotesk, or Satoshi
**When banned:** On "premium" or "creative" interfaces

### 17. NO Oversized H1s
**Problem:** Giant headlines = cheap impact
**Fix:** Control hierarchy with weight and color, not just scale
**When banned:** On mobile, constrained layouts

### 18. NO Serif Fonts on Dashboards
**Problem:** Inappropriate for data/UI
**Fix:** Use high-end sans-serif pairings (Geist + Geist Mono)
**When banned:** Always on software/dashboard interfaces

### 19. NO Variable Font Tricks
**Problem:** Stretching fonts for effect
**Fix:** Use font as designed, proper weights
**When banned:** On body text

### 20. NO Acid Distortion Effects
**Problem:** Text that's warped beyond recognition
**Fix:** Clean, readable typography
**When banned:** Always except artistic headers

### 21. NO Brutalist Helvetica
**Problem:** Raw, unstyled Helvetica as a "style"
**Fix:** Considered font choice with proper styling
**When banned:** On consumer-facing products

### 22. NO Mixed Font Families
**Problem:** 3+ font families on one page
**Fix:** Max 2 font families (display + body)
**When banned:** Always

### 23. NO Tight Letter Spacing on Headlines
**Problem:** Cramped heading text
**Fix:** Use tracking-tight or tracking-wide appropriately
**When banned:** On large headlines

### 24. NO All Caps Body Text
**Problem:** Hard to read, accessibility issue
**Fix:** Sentence case for body, caps for short labels only
**When banned:** On body text, long-form content

### 25. NO Font Size Under 14px
**Problem:** Too small for most users
**Fix:** Minimum 16px for body, 14px absolute minimum
**When banned:** Always - accessibility requirement

---

## 🚫 Layout & Spacing Anti-Patterns (15)

### 26. NO Generic Hero Sections
**Problem:** Centered text over dark image with CTA
**Fix:** Asymmetric layouts, left-aligned text, creative compositions
**When banned:** On SaaS, startup landing pages

### 27. NO 3-Column Card Layouts
**Problem:** Generic feature row with 3 equal cards
**Fix:** 2-column zigzag, asymmetric grid, horizontal scroll
**When banned:** On product features, service offerings

### 28. NO Bento Box Overuse
**Problem:** Every dashboard is a bento grid now
**Fix:** Consider lists, tables, or custom layouts
**When banned:** When it doesn't fit the content

### 29. NO Fullscreen Sections
**Problem:** 100vh sections with sticky scrolling
**Fix:** Content-driven section heights
**When banned:** On content-heavy pages

### 30. NO Sticky Everything
**Problem:** Nav, header, sidebar all sticky
**Fix:** Only sticky what's necessary
**When banned:** On mobile (performance issues)

### 31. NO Card Grids
**Problem:** Generic grid of cards for everything
**Fix:** Lists, tables, masonry, or custom layouts
**When banned:** On dashboards, data displays

### 32. NO Centered Content Exclusively
**Problem:** Everything centered = boring
**Fix:** Mix centered, left-aligned, asymmetric
**When banned:** When DESIGN_VARIANCE > 4

### 33. NO Infinite White Space
**Problem:** Max-width constraints too extreme
**Fix:** Reasonable max-width with content proportion
**When banned:** On text-heavy pages (use ~65ch)

### 34. NO Equal Padding Everywhere
**Problem:** Mathematical spacing lacks rhythm
**Fix:** Varied padding for hierarchy
**When banned:** On visual-focused layouts

### 35. NO Horizontal Symmetry
**Problem:** Left-right balanced layouts feel static
**Fix:** Asymmetric balance, visual weight distribution
**When banned:** When DESIGN_VARIANCE > 4

### 36. NO 12-Column Grid Always
**Problem:** Over-reliance on standard grid
**Fix:** 8-column, 6-column, or no grid
**When banned:** On simple layouts

### 37. NO Z-Index Spam
**Problem:** z-50, z-100 everywhere
**Fix:** Planned layering system
**When banned:** Always - use z-index deliberately

### 38. NO Floating Elements Without Context
**Problem:** Elements floating in whitespace
**Fix:** Anchor to layout edges
**When banned:** On structured layouts

### 39. NO Masonry for Everything
**Problem:** Pinterest copycat trend
**Fix:** Consider when masonry actually helps
**When banned:** On structured content

### 40. NO Split Screen 50/50 Default
**Problem:** Lazy split-screen layouts
**Fix:** Consider 60/40, 70/30, or creative splits
**When banned:** On unique designs

---

## 🚫 Content & Data Anti-Patterns (20)

### 41. NO Generic Names
**Problem:** "John Doe", "Sarah Chan", "Jack Su"
**Fix:** Use creative, realistic-sounding names
**When banned:** Always - kills credibility

### 42. NO Fake Perfect Data
**Problem:** 99.99%, 50%, perfect metrics
**Fix:** Organic, messy data (47.2%, +1 (312) 847-1928)
**When banned:** Always - realistic data builds trust

### 43. NO Startup Slop Names
**Problem:** "Acme", "Nexus", "SmartFlow", "TechCorp"
**Fix:** Invent premium, contextual brand names
**When banned:** Always

### 44. NO Filler Words
**Problem:** "Elevate", "Seamless", "Unleash", "Next-Gen"
**Fix:** Concrete verbs, specific benefits
**When banned:** Always - say what you mean

### 45. NO Lorem Ipsum
**Problem:** Placeholder text reduces credibility
**Fix:** Write real copy or use realistic placeholder content
**When banned:** On client-facing mockups

### 46. NO Stock Photo Models
**Problem:** Obvious stock photos
**Fix:** Custom illustrations or authentic photography
**When banned:** Always - stock photos look generic

### 47. NO Generic Testimonials
**Problem:** "Great product!" - John D.
**Fix:** Specific, detailed testimonials with names
**When banned:** Always - testimonials should be specific

### 48. NO Fake avatars
**Problem:** SVG eggs, Lucide user icons
**Fix:** Use creative photo placeholders or specific styling
**When banned:** On product interfaces

### 49. NO "Lorem Ipsum Dolor" Variations
**Problem:** Any variation of fake Latin
**Fix:** Real content or realistic placeholder
**When banned:** Always

### 50. NO Placeholder Phone Numbers
**Problem:** 123-456-7890, 555-0199
**Fix:** Realistic numbers with area codes
**When banned:** Always

### 51. NO Perfect Round Numbers
**Problem:** 1000, 50000, 1000000
**Fix**: Organic numbers (1,247, 48,392, 1.2M)
**When banned:** On statistics, metrics

### 52. NO Generic Email Addresses
**Problem:** user@example.com, test@test.com
**Fix:** Realistic emails (john.doe@company.co)
**When banned:** On mockups

### 53. NO "Contact Us" Only
**Problem:** Single generic CTA
**Fix:** Specific, action-oriented CTAs
**When banned:** On landing pages

### 54. NO "Coming Soon" Without Details
**Problem:** Vague future promises
**Fix:** Specific timeline or don't mention
**When banned:** Always

### 55. NO "Sign Up" Without Context
**Problem:** Generic CTA without benefit
**Fix:** "Get your free analysis" not "Sign up"
**When banned:** Always - specific is better

### 56. NO Fake Company Descriptions
**Problem:** "We do X and Y and Z"
**Fix:** Specific positioning and differentiation
**When banned:** Always

### 57. NO Generic Feature Names
**Problem:** "Feature 1", "Feature 2"
**Fix:** Descriptive, creative names
**When banned:** Always

### 58. NO "World's Leading" Claims
**Problem:** Unsubstantiated superlatives
**Fix:** Specific, provable claims
**When banned:** Always - builds distrust

### 59. NO "Revolutionary" Without Proof
**Problem:** Overused buzzword
**Fix:** Show, don't tell with specifics
**When banned:** Always

### 60. NO Fake Social Proof
**Problem:** "Trusted by 10,000+ companies" (unverified)
**Fix:** Real logos, real numbers, or don't include
**When banned:** Always - credibility matters

---

## 🚫 Component Anti-Patterns (20)

### 61. NO Glassmorphism Cards
**Problem:** Overused since 2022
**Fix:** Solid cards or alternative elevation
**When banned:** On dashboards, SaaS interfaces

### 62. NO Neumorphism Buttons
**Problem:** Dated 2020 trend, accessibility issues
**Fix:** Clear buttons with proper contrast
**When banned:** Always

### 63. NO Floating Labels
**Problem:** Labels that float on input
**Fix:** Static labels above inputs
**When banned:** Always - accessibility requirement

### 64. NO Rounded Everything
**Problem:** border-radius: 9999px on everything
**Fix:** Varied radii for hierarchy
**When banned:** On serious/professional interfaces

### 65. NO Default shadcn/ui Without Customization
**Problem:** Generic component library look
**Fix:** MUST customize radii, colors, shadows
**When banned:** Always - default = boring

### 66. NO Modals Without Escape
**Problem:** No way to close modal
**Fix:** Always provide escape, backdrop click, X button
**When banned:** Always - accessibility requirement

### 67. NO Toasts That Auto-Disappear Too Fast
**Problem:** User can't read message
**Fix:** Minimum 5 seconds, or manual dismiss
**When banned:** Always - usability issue

### 68. NO Loading Spinners Everywhere
**Problem:** Generic circular spinners
**Fix:** Skeleton loaders matching layout
**When banned:** On data-heavy pages

### 69. NO Toggle Switches for Everything
**Problem:** Toggle used instead of radio/checkbox
**Fix:** Use appropriate input type
**When banned:** On forms with >2 options

### 70. NO Dropdowns for 2-3 Options
**Problem:** Dropdown adds unnecessary clicks
**Fix:** Radio buttons or button group
**When banned:** When options are visible

### 71. NO Autocomplete Without Confirmation
**Problem:** Values change without user action
**Fix:** Require user selection
**When banned:** Always - user control issue

### 72. NO Infinite Scroll Without Pagination
**Problem:** Can't reach footer, lost position
**Fix:** Pagination or load more button
**When banned:** On content-heavy pages

### 73. NO Carousels for Single Item
**Problem:** Carousel with 1-2 items
**Fix:** Static display
**When banned:** Always - carousel overkill

### 74. NO Tooltip on Hover Only
**Problem:** No mobile tooltip access
**Fix:** Tooltips on tap too, or use different pattern
**When banned:** On mobile-responsive designs

### 75. NO Disabled Buttons Without Explanation
**Problem:** Button disabled but user doesn't know why
**Fix:** Show explanation or enable with feedback
**When banned:** Always - usability issue

### 76. NO Password Masking Without Toggle
**Problem:** Can't verify password input
**Fix:** Show/hide password toggle
**When banned:** Always - usability requirement

### 77. NO Required Field Indicators Only
**Problem:** Only showing asterisk for required
**Fix:** Mark optional fields instead (fewer)
**When banned:** On long forms

### 78. NO Placeholders as Labels
**Problem:** Label disappears on input
**Fix:** Static labels above inputs
**When banned:** Always - accessibility issue

### 79. NO Default Selected Options Without Clear Indication
**Problem:** User doesn't see what's selected
**Fix:** Clear selection state
**When banned:** On radio/checkbox groups

### 80. NO Mixed Case for Acronyms
**Problem:** "Api" instead of "API"
**Fix:** Proper casing for acronyms
**When banned:** Always - professionalism

---

## 🚫 Interaction Anti-Patterns (10)

### 81. NO Parallax Scrolling
**Problem:** Performance killer, motion sickness
**Fix:** Static backgrounds or subtle scroll-linked motion
**When banned:** On mobile, performance-critical pages

### 82. NO Scroll Reveal Animations
**Problem:** Elements fade in as you scroll (everywhere)
**Fix:** Static display or subtle transitions
**When banned:** On content-heavy pages

### 83. NO Scroll Hijacking
**Problem:** Custom scroll behavior
**Fix:** Native scrolling
**When banned:** Always - accessibility issue

### 84. NO Hover Effects Only
**Problem:** Mobile can't hover
**Fix**: Hover + focus states, or tap effects
**When banned:** On mobile-responsive designs

### 85. NO Loading Screens Without Progress
**Problem:** No indication of wait time
**Fix:** Progress bar or percentage
**When banned:** On >3 second loads

### 86. NO Auto-Playing Videos
**Problem:** Unexpected audio/motion
**Fix:** User-initiated playback
**When banned:** Always - accessibility issue

### 87. NO Mouse-Following Effects
**Problem:** Elements follow cursor
**Fix:** Static layout or interactive elements
**When banned:** On professional interfaces

### 88. NO Page Transitions Without Skip
**Problem:** Can't skip animation
**Fix:** Skip button or fast transition
**When banned:** On repeated visits

### 89. NO Drag Without Clear Indication
**Problem:** User doesn't know they can drag
**Fix:** Drag handles, cursor change, hint
**When banned:** Always - discoverability issue

### 90. NO Gestures Without Visual Cues
**Problem:** Hidden gestures
**Fix:** Visual hints or tutorial
**When banned:** On first-time users

---

## 🚫 External Resource Anti-Patterns (10)

### 91. NO Broken Unsplash Links
**Problem:** Unsplash images that don't load
**Fix:** Use reliable placeholders (picsum.photos, UI Avatars)
**When banned:** Always

### 92. NO Generic Stock Photos
**Problem:** Obvious stock photography
**Fix:** Custom illustrations or authentic photos
**When banned:** On brand pages

### 93. NO Placeholder Images Without Alt Text
**Problem:** Inaccessible images
**Fix:** Always include alt text
**When banned:** Always - accessibility requirement

### 94. NO External Font Loading Without Fallback
**Problem:** FOUT or FOIT
**Fix:** System font fallback
**When banned:** Always - performance issue

### 95. NO Large External Scripts
**Problem:** Heavy third-party scripts
**Fix:** Minimal dependencies, lazy loading
**When banned:** On performance-critical pages

### 96. NO CDN Links Without Subresource Integrity
**Problem:** Security risk
**Fix:** SRI hashes for external scripts
**When banned:** On production

### 97. NO Google Fonts Without Display Swap
**Problem:** Flash of unstyled text or invisible text
**Fix:** font-display: swap
**When banned:** Always

### 98. NO Icons from Multiple Libraries
**Problem:** Inconsistent icon styles
**Fix:** Single icon library (Phosphor or Radix)
**When banned:** Always - consistency issue

### 99. NO Emoji in Code/Markup
**Problem:** Unprofessional, rendering issues
**Fix:** Use icons or SVG
**When banned:** Always (design-taste-frontend principle)

### 100. NO Abusing Emojis in UI Text
**Problem:** Unprofessional tone
**Fix:** Use professional language
**When banned:** On professional/enterprise interfaces

---

*100 UI Anti-Patterns - Comprehensive blacklist for unique interfaces*
