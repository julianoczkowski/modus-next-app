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
- Modus Icons (Field Systems)

## 🚨 CRITICAL: Development Workflow & Testing

### MANDATORY: Run Linting Before Changes

```bash
# 🔍 Run all linting checks before any code changes
npm run lint:styles && npm run lint:colors && npm run lint:icons && npm run lint:semantic
```

### Chrome DevTools Testing (Use MCP)

**ALWAYS use Chrome DevTools MCP for testing:**

```bash
# Start dev server first
npm run dev
```

**Then test with MCP:**

- Navigate to `http://localhost:3000`
- Check console for JavaScript errors
- Test all interactive elements (buttons, forms)
- Verify responsive design (mobile/desktop)
- Test theme switching if applicable
- Run accessibility checks

## Essential Development Commands

### Core Development

```bash
npm install              # Install dependencies
npm run dev             # Start development server (Turbopack enabled)
npm run build           # Production build (Turbopack enabled)
npm start               # Start production server
```

### Quality Assurance

```bash
npm run lint            # Run ESLint
npm run type-check      # TypeScript compilation check
npm run lint:colors     # Verify Modus color compliance (CRITICAL)
npm run lint:icons      # Verify Modus icons
npm run lint:semantic   # Verify if app is using semantic HTML
npm run lint:styles     # Verify Modus styles
npm run lint:borders    # Verify border usage is correct
```

### Git Workflow

- Pre-commit hooks automatically run `lint:colors` on staged files
- All color violations must be resolved before commit
- Husky + lint-staged configuration enforces compliance

## Critical Architecture Patterns

### 1. Modus Web Components Integration

**MANDATORY:** Use React 19-compatible package (`@trimble-oss/moduswebcomponents-react@^1.0.0-react19`)

**Setup Pattern:**

```tsx
// app/components/ModusProvider.tsx (Client Component)
"use client";
import "@trimble-oss/moduswebcomponents-react/modus-wc-styles.css";

// Component Usage
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
```

**FORBIDDEN:**

- Manual `defineCustomElements()` calls
- Raw web component tags (`<modus-wc-button>`)
- Direct loader imports

### 2. Event Handling (CRITICAL PATTERN)

**Problem:** React event props don't work reliably with Modus Web Components.

**MANDATORY Solution:**

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

**Rules:**

- Always use component refs for DOM access
- Always include cleanup in useEffect return
- Mark component `"use client"`
- Common events: `itemSelect`, `buttonClick`, `modalClose`, `accordionChange`

### 3. Design System Colors (ENFORCED BY LINTING)

**🎯 CRITICAL: Use Design System Tailwind Classes from globals.css**

**ONLY ALLOWED:** Design system Tailwind classes (mapped from Modus CSS variables in `globals.css`)

```tsx
// ✅ CORRECT - Use design system Tailwind classes
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-success text-success-foreground">
<div className="bg-destructive text-destructive-foreground">
<div className="bg-warning text-warning-foreground">
<div className="bg-muted text-muted-foreground">
<div className="bg-secondary text-secondary-foreground">
```

**Design System Mapping (from globals.css):**

The design system maps Modus CSS variables to Tailwind classes:

```css
/* Base Colors (theme-adaptive) */
--background: var(--modus-wc-color-base-page); /* bg-background */
--foreground: var(--modus-wc-color-base-content); /* text-foreground */
--card: var(--modus-wc-color-base-100); /* bg-card */
--border: var(--modus-wc-color-base-200); /* border-border */
--muted: var(--modus-wc-color-base-200); /* bg-muted */
--secondary: var(--modus-wc-color-base-300); /* bg-secondary */

/* Semantic Colors (theme-consistent) */
--primary: var(--modus-wc-color-info); /* bg-primary */
--destructive: var(--modus-wc-color-error); /* bg-destructive */
--warning: var(--modus-wc-color-warning); /* bg-warning */
--success: var(--modus-wc-color-success); /* bg-success */
```

**Usage Examples:**

```tsx
// ✅ CORRECT - Use design system Tailwind classes
<div className="bg-background text-foreground border-default">
<div className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-muted text-muted-foreground">

// ❌ FORBIDDEN (Will fail lint)
<div style={{ backgroundColor: "var(--modus-wc-color-base-page)" }}>
<div style={{ color: "var(--modus-wc-color-info)" }}>
<div style={{ backgroundColor: "#ffffff" }}>
<div className="bg-blue-500 text-red-400">
```

### 4. Component Architecture

**MANDATORY:** Single configurable component pattern

```tsx
// ✅ CORRECT: One flexible component
interface ModusButtonProps {
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  // All configuration options
}

// ❌ FORBIDDEN: Multiple specific components
// ModusButtonPrimary.tsx
// ModusButtonSecondary.tsx
```

### 5. Styling Standards

**Preferred Approach:** Tailwind utility classes with design system colors

```tsx
<div className="max-w-5xl mx-auto p-8 bg-card rounded-lg border-default">
```

**Critical Border Rule:**

```tsx
// ❌ WRONG - Tailwind border classes don't work in v4
<div className="border border-border">

// ✅ CORRECT - Use our border utility classes with design system colors
<div className="border-default">
<div className="border-dashed">
```

**Avoid:**

- Inline styles (except dynamic values)
- CSS modules
- Semantic HTML elements (`<h1>`, `<section>`) - use `<div>` with Tailwind

**Typography:**

```tsx
// ✅ CORRECT
<div className="text-4xl font-semibold text-foreground">Title</div>

// ❌ WRONG (Browser defaults interfere)
<h1 className="text-4xl font-semibold">Title</h1>
```

## Theme System Implementation

**6 Supported Themes:**

### Standard Modus Themes (4 themes)

- `modus-classic-light`
- `modus-classic-dark`
- `modus-modern-light`
- `modus-modern-dark`

### Trimble Connect Themes (2 themes)

- `connect-light` - For Trimble Connect Web Applications
- `connect-dark` - For Trimble Connect Web Applications

> **Important:** Connect themes should only be used when building Trimble Connect Web Applications. For general applications, use the standard Modus themes.

**Implementation:**

```tsx
// app/contexts/ThemeContext.tsx
document.documentElement.setAttribute("data-theme", theme);
```

**Hydration Safety Pattern (MANDATORY for client components):**

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <div>Loading...</div>;
```

### CSS Architecture

**Import Order (globals.css):**

```css
@import url("modus-icons.css"); /* MUST be first */
@import url("fonts.googleapis.com"); /* Fonts second */
@import "tailwindcss"; /* Tailwind third */
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
<i className="modus-icons mr-2">icon_name</i> /* With Tailwind spacing */
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

## Common Issues & Solutions

### Dropdown Not Closing

```tsx
// ❌ WRONG
event.target.menuVisible = false;

// ✅ CORRECT
dropdownRef.current.menuVisible = false;
```

### Accordion State Management Issues

```tsx
// ❌ WRONG - Don't control state from React
<ModusWcCollapse expanded={isExpanded} options={item.options}>

// ✅ CORRECT - Let Modus components handle their own state
<ModusWcCollapse options={item.options}>
  <div slot="content">Content</div>
</ModusWcCollapse>
```

### Theme Flash on Load

```tsx
// ✅ SOLUTION: Mounted state pattern
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <LoadingSkeleton />;
```

### CSS Import Order Issues

```css
/* ✅ CORRECT ORDER in globals.css */
@import url("modus-icons.css"); /* FIRST */
@import url("fonts.googleapis.com"); /* SECOND */
@import "tailwindcss"; /* THIRD */
```

## 🎯 Key Rules Summary

### Essential Development Rules

1. **🚨 ALWAYS run linting commands before making changes**
2. **🧪 Use Chrome DevTools MCP for testing implementations**
3. **📋 Create implementation guides for major features**
4. **🎨 Use border utility classes (not Tailwind border classes)**
5. **📝 Use div elements (not semantic HTML) for consistent Tailwind styling**
6. **🎛️ Let Modus components handle their own state (don't control from React)**
7. **🔧 Use ref-based event handling for Modus Web Components**

### Final Quality Checklist

- [ ] ✅ All 4 linting commands pass (0 violations)
- [ ] ✅ Chrome DevTools shows no console errors
- [ ] ✅ All interactive elements work correctly
- [ ] ✅ Responsive design tested
- [ ] ✅ Theme compatibility verified (if themes present)

## Resources

- Modus Web Components Storybook: https://trimble-oss.github.io/modus-wc-2.0/main/
- Modus Icons: https://modus-icons.trimble.com/field-systems/
- Project color palette: http://localhost:3000/color-palette
