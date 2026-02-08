# Vanilla JS Template

**Plain HTML/CSS/JS — single file, no build step, instant load**

## When to Use

- Quick prototypes and demos
- Need to run in browser without setup
- Want to understand fundamentals
- Maximum performance (zero dependencies)
- Constraint: "single file" or "no build step"

## File Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <style>
    /* All CSS goes here */
  </style>
</head>
<body>
  <!-- HTML content -->
  <script>
    /* All JS goes here */
  </script>
</body>
</html>
```

## CSS Organization

Even in a single file, keep CSS organized:

```css
/* === 1. Custom Properties (Variables) === */
:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-bg: #f8fafc;
  --spacing-unit: 0.25rem;
  --transition-fast: 150ms;
  --transition-medium: 300ms;
}

/* === 2. Reset & Base === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: var(--color-primary);
  background: var(--color-bg);
}

/* === 3. Layout === */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.grid {
  display: grid;
  gap: var(--spacing-unit);
}

/* === 4. Components === */
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-unit);
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.button:active {
  transform: translateY(0);
}

/* === 5. Utilities === */
.text-center { text-align: center; }
.hidden { display: none !important; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* === 6. Responsive === */
@media (min-width: 768px) {
  .container {
    padding: 4rem;
  }
}
```

## JavaScript Patterns

### DOM Selection

```js
// Cache selections when used multiple times
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const button = $('.button')
const buttons = $$('.button')
```

### Event Handling

```js
// Event delegation for dynamic content
document.addEventListener('click', (e) => {
  const button = e.target.closest('.button')
  if (button) {
    handleButtonClick(button)
  }
})

// Debounce for scroll/resize
function debounce(fn, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

window.addEventListener('resize', debounce(() => {
  handleResize()
}, 250))
```

### State Management

```js
// Simple state store
const createStore = (initialState) => {
  let state = initialState
  const listeners = new Set()
  
  return {
    get: () => state,
    set: (newState) => {
      state = typeof newState === 'function' ? newState(state) : newState
      listeners.forEach(fn => fn(state))
    },
    subscribe: (fn) => {
      listeners.add(fn)
      fn(state)
      return () => listeners.delete(fn)
    }
  }
}

// Usage
const store = createStore({ count: 0, status: 'idle' })

store.subscribe((state) => {
  console.log('State changed:', state)
})

store.set((state) => ({ ...state, count: state.count + 1 }))
```

### Animations

```js
// RequestAnimationFrame for smooth animations
function animate(element, keyframes, duration) {
  const start = performance.now()
  
  function frame(currentTime) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    
    // Apply animation frame
    const currentFrame = keyframes(progress)
    Object.assign(element.style, currentFrame)
    
    if (progress < 1) {
      requestAnimationFrame(frame)
    }
  }
  
  requestAnimationFrame(frame)
}

// Example: fade out
animate(
  element, 
  (progress) => ({ opacity: 1 - progress }), 
  300
)
```

## Accessibility

### Semantic HTML

```html
<!-- Good: Semantic -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Bad: Unsemantic -->
<div class="nav">
  <div class="link" data-href="/">Home</div>
  <div class="link" data-href="/about">About</div>
</div>
```

### Keyboard Navigation

```js
// Handle keyboard events
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModals()
  }
  
  if (e.key === 'Tab') {
    trapFocus(modal)
  }
})

// Focus management
function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )
  
  const first = focusableElements[0]
  const last = focusableElements[focusableElements.length - 1]
  
  first?.focus()
  
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
  })
}
```

### Screen Reader Announcements

```js
// Create live region
const createAnnouncer = () => {
  const announcer = document.createElement('div')
  announcer.setAttribute('aria-live', 'polite')
  announcer.setAttribute('aria-atomic', 'true')
  announcer.className = 'sr-only'
  document.body.appendChild(announcer)
  return announcer
}

const announcer = createAnnouncer()

// Announce changes
announcer.textContent = 'Form submitted successfully'
```

## Performance Tips

```js
// Debounce expensive operations
function debounce(fn, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle resize events
function throttle(fn, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        observer.unobserve(img)
      }
    })
  })
  
  images.forEach(img => observer.observe(img))
}
```

## Constraint Adaptation

**Color constraints:**
- Use CSS custom properties for palettes
- Never use hardcoded values beyond constraint

```css
:root {
  /* Constraint: single_accent with neutral base */
  --color-neutral-50: #fafafa;
  --color-neutral-900: #0a0a0a;
  --color-accent: #ea580c; /* Burnt orange */
}
```

**Technical constraints:**
- CSS-only: No `<script>` except absolute essentials
- System fonts: Use `system-ui, -apple-system, sans-serif`
- No images: Use CSS patterns or SVG inline

**Context constraints:**
- Print-first: No hover-dependent info, ensure readable on paper
- Screen reader: Test with NVDA/JAWS, proper ARIA

## Setup Instructions

```bash
# Just open in browser
open index.html

# Or serve with local server
python3 -m http.server 8000
# or
npx serve .
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanilla Template</title>
  <style>
    :root {
      --color-primary: #2563eb;
      --color-bg: #f8fafc;
      --transition: 200ms;
    }
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: system-ui, sans-serif;
      line-height: 1.6;
      color: var(--color-primary);
      background: var(--color-bg);
      min-height: 100vh;
      display: grid;
      place-items: center;
    }
    
    .counter {
      text-align: center;
    }
    
    .count {
      font-size: 4rem;
      font-weight: bold;
      margin: 1rem 0;
    }
    
    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    
    .button {
      padding: 0.75rem 1.5rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: transform var(--transition);
    }
    
    .button:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="counter">
    <div class="count" id="count">0</div>
    <div class="buttons">
      <button class="button" id="increment">+</button>
      <button class="button" id="decrement">-</button>
      <button class="button" id="reset">Reset</button>
    </div>
  </div>
  
  <script>
    const $ = (s) => document.querySelector(s)
    const countEl = $('#count')
    const incrementBtn = $('#increment')
    const decrementBtn = $('#decrement')
    const resetBtn = $('#reset')
    
    let count = 0
    
    function updateDisplay() {
      countEl.textContent = count
    }
    
    incrementBtn.addEventListener('click', () => {
      count++
      updateDisplay()
    })
    
    decrementBtn.addEventListener('click', () => {
      count--
      updateDisplay()
    })
    
    resetBtn.addEventListener('click', () => {
      count = 0
      updateDisplay()
    })
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        count++
        updateDisplay()
      } else if (e.key === 'ArrowDown') {
        count--
        updateDisplay()
      }
    })
  </script>
</body>
</html>
```

---

*Vanilla JS Template — Fast, simple, constraint-friendly*
