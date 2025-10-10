# Modus Next.js Copilot Instructions

This is a Next.js 15 application demonstrating Trimble's Modus 2 Web Components design system with React 19, featuring strict design system compliance enforced by automated linting.

## Architecture Overview

**Core Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS 4 + Modus 2 Web Components React package (`@trimble-oss/moduswebcomponents-react@1.0.0-react19`)

**Key Files:**

- `app/layout.tsx` - Root layout with global header/footer
- `app/components/ModusProvider.tsx` - Client component that imports Modus styles
- `app/contexts/ThemeContext.tsx` - 4-theme system management
- `app/globals.css` - Design system color mappings to CSS variables

## Critical Development Patterns

### 1. Modus Component Integration (MANDATORY)

Use React wrapper components, never raw web component tags:

```tsx
// ✅ CORRECT
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

// ❌ WRONG
<modus-wc-button>
```

### 2. Event Handling Pattern (CRITICAL)

React event props don't work reliably. Use refs + DOM event listeners:

```tsx
"use client";
import { useRef, useEffect } from "react";

const componentRef = useRef<any>(null);

useEffect(() => {
  const component = componentRef.current;
  if (component) {
    const handleEvent = (event: CustomEvent) => {
      // Use componentRef.current, NEVER event.target
      component.someProperty = newValue;
    };

    component.addEventListener("eventName", handleEvent);
    return () => component.removeEventListener("eventName", handleEvent);
  }
}, []);

return <ModusWcComponent ref={componentRef} />;
```

### 3. Design System Colors (ENFORCED BY LINTING)

Only use these 9 Modus CSS variables - hardcoded colors/Tailwind color classes are forbidden:

```css
/* Base colors (theme-adaptive) */
var(--modus-wc-color-base-page)      /* Backgrounds */
var(--modus-wc-color-base-100)       /* Cards */
var(--modus-wc-color-base-200)       /* Borders */
var(--modus-wc-color-base-300)       /* Secondary UI */
var(--modus-wc-color-base-content)   /* Text */

/* Semantic colors */
var(--modus-wc-color-info)           /* Primary */
var(--modus-wc-color-success)        /* Success */
var(--modus-wc-color-error)          /* Error */
var(--modus-wc-color-warning)        /* Warning */
```

Use mapped Tailwind classes instead: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, etc.

### 4. Component Architecture

Create single configurable components rather than multiple specific variants:

```tsx
interface ModusButtonProps {
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  // All configuration options in one component
}
```

## Development Workflow

### Essential Commands

```bash
npm run dev              # Start development (Turbopack enabled)
npm run lint:colors      # CRITICAL - Must pass before commit
npm run type-check       # TypeScript validation
npm run build           # Production build
```

### Pre-commit Enforcement

Husky runs `lint:colors` on staged files - all violations must be resolved before commit.

### Theme System

4 themes via `data-theme` attribute: `modus-classic-light|dark`, `modus-modern-light|dark`

### Hydration Safety Pattern

For client components accessing themes:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <div>Loading...</div>;
```

## File Patterns

- `app/components/Modus[Component].tsx` - Configurable wrapper components
- `app/[feature]-demo/page.tsx` - Component demonstration pages
- `scripts/*.js` - Custom linting scripts for design system compliance
- `.cursor/rules/*.mdc` - IDE-specific development patterns

## Common Issues & Solutions

**Events not firing:** Add `"use client"` directive and use ref-based event listeners
**Colors failing lint:** Use only the 9 approved Modus CSS variables via Tailwind classes
**Theme flash:** Implement mounted state pattern for client components
**Component not found:** Ensure using React wrapper from `@trimble-oss/moduswebcomponents-react`

Always run `npm run lint:colors` before committing - design system compliance is strictly enforced.
