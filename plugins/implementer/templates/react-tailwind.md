# React + Tailwind Template

**Modern, component-based UI development with Tailwind CSS**

## When to Use

- Building production applications
- Need component reusability
- Want modern tooling (build step, HMR)
- Accessible via Node.js ecosystem

## Project Structure

```
src/
├── components/
│   ├── ui/               # Atomic, reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   └── ...
│   └── features/          # Feature-specific components
│       ├── Dashboard.tsx
│       ├── Form.tsx
│       └── ...
├── hooks/                 # Custom React hooks
│   ├── useWindowSize.ts
│   ├── useScrollPosition.ts
│   └── ...
├── utils/                 # Utility functions
│   ├── cn.ts              # Classname utility (clsx + tailwind-merge)
│   ├── formatDate.ts
│   └── ...
├── App.tsx                # Root component
├── index.css               # Tailwind directives
└── index.tsx               # Entry point
```

## Component Patterns

### Atomic Components (`components/ui/`)

```tsx
// Button.tsx
import { cn } from '@/utils/cn'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button', // Default to button to prevent form submission issues
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'text-gray-700 hover:bg-gray-100': variant === 'ghost',
        },
        {
          'px-3 py-1.5 text-sm min-h-[44px]': size === 'sm', // WCAG 2.5.5 touch target
          'px-4 py-2 min-h-[44px]': size === 'md',
          'px-6 py-3 text-lg min-h-[48px]': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Layout Components (`components/layout/`)

```tsx
// Container.tsx
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl', className)}>
      {children}
    </div>
  )
}
```

## Custom Hooks

```tsx
// hooks/useWindowSize.ts
import { useState, useEffect, useCallback } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  const updateSize = useCallback(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize])

  return size
}
```

## Utility Functions

```tsx
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Tailwind Configuration

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Constraint-based palettes can go here
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
      },
      animation: {
        // Constraint-based animations if allowed
      },
    },
  },
  plugins: [
    // Add plugins as needed, but minimize
  ],
}
```

## State Management

For simple apps, use React's built-in `useState` and `useReducer`.

For complex apps, consider:
- **Zustand** — Simple, no boilerplate
- **Jotai** — Atomic, TypeScript-first
- **React Query** — Server state, caching

Example with useReducer:

```tsx
type State = {
  count: number
  status: 'idle' | 'loading' | 'success' | 'error'
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_STATUS'; payload: State['status'] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 }
    case 'DECREMENT': return { ...state, count: state.count - 1 }
    case 'SET_STATUS': return { ...state, status: action.payload }
    default: return state
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, status: 'idle' })
  
  return (
    <div className="flex gap-4">
      <span>Count: {state.count}</span>
      <Button onClick={() => dispatch({ type: 'INCREMENT' })}>+</Button>
      <Button onClick={() => dispatch({ type: 'DECREMENT' })}>-</Button>
    </div>
  )
}
```

## Accessibility Guidelines

- Use semantic HTML elements
- Keyboard navigation support
- ARIA attributes where needed
- Focus management for modals/overlays

```tsx
// Example: Accessible Button
<button
  type="button"
  className="..."
  aria-label={ariaLabel}
  disabled={disabled}
>
  {children}
</button>
```

## Performance Tips

- Use `React.memo` for expensive components
- Lazy load routes with `React.lazy()`
- Code splitting with dynamic imports
- Debounce/throttle scroll/resize handlers

```tsx
// Lazy loading
const Dashboard = React.lazy(() => import('./components/Dashboard'))

// In render - accessible loading state
<Suspense fallback={<div role="status" aria-live="polite" aria-busy="true">Loading...</div>}>
  <Dashboard />
</Suspense>
```

## Package.json Template

```json
{
  "name": "ui-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.4.5",
    "vite": "^5.1.0",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  }
}
```

## Setup Instructions

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Constraint Adaptation

When following constraints from orchestrator:

**Color constraints:**
- Define custom Tailwind palette in `tailwind.config.js`
- Use those colors exclusively in components

**Technical constraints:**
- CSS-only: Limit JS to state and forms
- System fonts: Don't import any font files
- No images: Use CSS patterns, SVG inline, or emojis

**Context constraints:**
- Print-first: Ensure layout works without hover
- Screen reader: Test with NVDA/JAWS if possible

---

*React + Tailwind Template — Build modern, component-based UIs*
