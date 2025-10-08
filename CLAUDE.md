# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built with React 19, integrating Trimble's Modus Web Components design system. The project demonstrates modern web development patterns with server-side rendering, client-side interactivity, and comprehensive theme support.

**Tech Stack:**
- Next.js 15 with App Router and Turbopack
- React 19
- TypeScript 5
- Tailwind CSS 4
- Modus Web Components React package
- Modus Icons

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build production bundle with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler without emit
npm run lint:colors  # Verify Modus color usage compliance
```

### Git Hooks
The project uses Husky for pre-commit hooks that automatically run `lint:colors` on staged files to enforce Modus design system color usage.

## Architecture

### Modus Web Components Integration

**Critical Pattern:** This project uses the React 19-compatible Modus package (`@trimble-oss/moduswebcomponents-react@^1.0.0-react19`). Components are registered automatically by the package - DO NOT use `defineCustomElements` or manual loader imports.

**Provider Setup:**
- `app/components/ModusProvider.tsx` - Client component that imports Modus styles
- Wrapped around the entire app in `app/layout.tsx`
- Imports `@trimble-oss/moduswebcomponents-react/modus-wc-styles.css`

**Component Usage:**
- Import from `@trimble-oss/moduswebcomponents-react` (e.g., `ModusWcButton`)
- Use React wrapper components, NOT raw web component tags
- All interactive Modus components require `"use client"` directive

### Event Handling Pattern (CRITICAL)

**Problem:** React event props don't work reliably with Modus Web Components.

**Solution:** Use direct DOM event listeners with refs:

```tsx
"use client";
import { useRef, useEffect } from "react";

const dropdownRef = useRef<any>(null);

useEffect(() => {
  const dropdown = dropdownRef.current;
  if (dropdown) {
    const handleItemSelect = (event: CustomEvent) => {
      const selectedValue = event.detail?.value;
      // Handle event
      dropdown.menuVisible = false; // Use ref, NOT event.target
    };

    dropdown.addEventListener("itemSelect", handleItemSelect);
    return () => dropdown.removeEventListener("itemSelect", handleItemSelect);
  }
}, []);
```

**Key Rules:**
- Always use component refs for DOM access, never `event.target`
- Always include cleanup in useEffect return
- Component must be marked `"use client"`
- Common events: `itemSelect`, `buttonClick`, `modalClose`, `accordionChange`

### Design System & Colors

**CRITICAL:** Only use the 9 approved Modus CSS variables. Hardcoded hex, RGB, or Tailwind color classes are forbidden and will be caught by pre-commit hooks.

**Approved Colors:**
```css
/* Base (5 colors - theme-adaptive) */
var(--modus-wc-color-base-page)      /* Background */
var(--modus-wc-color-base-100)       /* Card backgrounds */
var(--modus-wc-color-base-200)       /* Borders, subtle elements */
var(--modus-wc-color-base-300)       /* Secondary UI */
var(--modus-wc-color-base-content)   /* Text */

/* Semantic (4 colors - same in all themes) */
var(--modus-wc-color-info)           /* Primary/info */
var(--modus-wc-color-success)        /* Success states */
var(--modus-wc-color-error)          /* Error/danger */
var(--modus-wc-color-warning)        /* Warning states */
```

**Design System Mapping (globals.css):**
Modus colors are mapped to design system tokens for Tailwind usage:
- `bg-background` → `var(--modus-wc-color-base-page)`
- `text-foreground` → `var(--modus-wc-color-base-content)`
- `bg-card` → `var(--modus-wc-color-base-100)`
- `border-border` → `var(--modus-wc-color-base-200)`
- `bg-primary` → `var(--modus-wc-color-info)`
- `bg-destructive` → `var(--modus-wc-color-error)`

**Styling Approach:**
- **Preferred:** Tailwind utility classes with design system colors
- **Avoid:** Inline styles (use only for dynamic values)
- **Avoid:** CSS modules (legacy approach)
- **Never:** Hardcoded hex, RGB, or Tailwind color classes (e.g., `bg-blue-500`)

### Theme System

**Implementation:**
- `app/contexts/ThemeContext.tsx` - Theme provider with 4 Modus themes
- Themes: `modus-classic-light`, `modus-classic-dark`, `modus-modern-light`, `modus-modern-dark`
- Theme state persisted to localStorage
- Applied via data attribute: `document.documentElement.setAttribute("data-theme", theme)`

**Hydration Safety:**
All client components that depend on theme or localStorage must use the mounted pattern:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <LoadingSkeleton />;
return <ActualComponent />;
```

### CSS Architecture

**Import Order (globals.css):**
```css
@import url("modus-icons.css");        /* MUST be first */
@import url("fonts.googleapis.com");   /* Fonts second */
@import "tailwindcss";                 /* Tailwind third */
```

**Typography:**
- Default font: Open Sans
- Semantic HTML headings reset to inherit (styled with Tailwind classes)
- Typography scale defined in CSS variables (`--text-xs` through `--text-6xl`)
- Use `<div>` with Tailwind classes instead of `<h1>`, `<h2>` to avoid browser defaults

### Component Patterns

**Single Configurable Component (NOT Multiple Variants):**
```tsx
// ✅ CORRECT
interface ModusButtonProps {
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  // ... all options
}

// ❌ WRONG - Don't create separate files
// ModusButtonPrimary.tsx
// ModusButtonSecondary.tsx
```

**Layout Pattern:**
- Global layout (`app/layout.tsx`) includes AppHeader, AppFooter
- Pages should NOT include header/footer - already in layout
- Main content wrapped in `<main className="flex-1">` for sticky footer

### Icon Usage

**Setup:**
Icons imported via CDN in `globals.css`:
```css
@import url("https://cdn.jsdelivr.net/npm/@trimble-oss/modus-icons@1.17.0/dist/field-systems/fonts/modus-icons.css");
```

**Usage Pattern:**
```tsx
<i className="modus-icons mr-2">icon_name</i>  /* With Tailwind spacing */
```

**Icon Catalog:**
Field Systems icon set (623 icons) - see https://modus-icons.trimble.com/field-systems/

### Color Linting (scripts/check-modus-colors.js)

**Purpose:** Enforces Modus design system compliance by detecting:
- Hardcoded Modus hex values
- Tailwind color classes (e.g., `bg-red-500`)
- RGB/RGBA color values
- Non-Modus CSS variables

**Runs automatically:** Pre-commit via Husky + lint-staged

**File Patterns Checked:**
- `app/**/*.{tsx,ts,js,css,scss}`
- `components/**/*.{tsx,ts,js,css,scss}`
- `src/**/*.{tsx,ts,js,css,scss}`
- `styles/**/*.{css,scss}`

## File Structure

```
app/
├── layout.tsx                    # Root layout with providers
├── page.tsx                      # Homepage
├── globals.css                   # Design system + Tailwind config
├── components/
│   ├── ModusProvider.tsx         # Modus setup (client component)
│   ├── AppHeader.tsx             # Global header
│   ├── AppFooter.tsx             # Global footer
│   ├── ModusButton.tsx           # Example configurable component
│   └── ModusAccordion.tsx        # Example complex component
├── contexts/
│   └── ThemeContext.tsx          # Theme management
└── [feature]-demo/               # Demo pages for components
    └── page.tsx

scripts/
└── check-modus-colors.js         # Color linting script

.cursor/rules/                    # Cursor IDE rules (reference for patterns)
├── modus-nextjs-integration.mdc
├── modus-nextjs-best-practices.mdc
├── modus-color-usage-nextjs.mdc
└── modus-dropdown-event-handling.mdc
```

## Key Constraints

### What to AVOID
1. ❌ Multiple component files for variants (create one configurable component)
2. ❌ CSS modules for pages/components (use Tailwind classes)
3. ❌ Hardcoded colors (hex, RGB, Tailwind colors)
4. ❌ Semantic HTML for styled content (`<h1>`, `<section>`) - use `<div>` with Tailwind
5. ❌ Inline styles except for dynamic values
6. ❌ React event props as primary approach for Modus components
7. ❌ Using `event.target` for DOM manipulation (use refs)
8. ❌ Manual component registration with `defineCustomElements`

### What to DO
1. ✅ Use Tailwind classes with design system colors
2. ✅ Create single, configurable components with comprehensive props
3. ✅ Use direct DOM event listeners with refs for Modus components
4. ✅ Always include cleanup in useEffect for event listeners
5. ✅ Use hydration-safe patterns for client components
6. ✅ Test all 4 themes when adding UI
7. ✅ Include `"use client"` for interactive Modus components
8. ✅ Run `npm run lint:colors` before committing

## TypeScript Configuration

**Important Paths:**
- `@/*` maps to project root
- Type declarations in `types/**/*.d.ts` (included in tsconfig)
- Strict mode enabled
- Target: ES2017

## Development Tips

**When adding new Modus components:**
1. Check if wrapper component exists (avoid duplicates)
2. Mark as `"use client"` if interactive
3. Use refs + addEventListener for events
4. Test with all 4 themes
5. Verify color compliance with `npm run lint:colors`

**When debugging event handlers:**
1. Add console.log in event handler to verify it fires
2. Check ref is properly attached
3. Verify event name matches Modus docs
4. Ensure cleanup function exists
5. Check component is client-side

**Color Reference:**
Visit `/color-palette` page to see all design system colors with visual swatches and usage examples.

## Common Pitfalls

1. **Dropdown not closing:** Use `dropdownRef.current.menuVisible = false`, NOT `event.target`
2. **Events not firing:** Use addEventListener on ref, not React event props
3. **Theme flash on load:** Use mounted state pattern for client components
4. **CSS import order:** Icons must be imported before Tailwind
5. **Color violations:** Check `npm run lint:colors` output for suggested Modus variables
6. **Heading styles not applying:** Use `<div>` with Tailwind classes, not `<h1>`, `<h2>` tags

## Resources

- Modus Web Components Storybook: https://trimble-oss.github.io/modus-wc-2.0/main/
- Modus Icons: https://modus-icons.trimble.com/field-systems/
- Project color palette: http://localhost:3000/color-palette
