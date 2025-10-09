# AGENT.md

This file provides comprehensive guidance for AI coding agents working with this Modus Web Components + Next.js project. It complements the README.md and CLAUDE.md by focusing on automated development workflows, coding standards, and agent-specific instructions.

## Project Overview

**Purpose:** Next.js 15 application demonstrating Trimble's Modus Web Components design system integration with modern React patterns.

**Architecture:** Server-side rendering with client-side interactivity, comprehensive theme support, and strict design system compliance.

**Key Technologies:**

- Next.js 15 (App Router + Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Modus Web Components React package
- Modus Icons (Field Systems)

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

**ONLY ALLOWED:** 9 Modus CSS variables

```css
/* Base Colors (theme-adaptive) */
var(--modus-wc-color-base-page)      /* Backgrounds */
var(--modus-wc-color-base-100)       /* Cards */
var(--modus-wc-color-base-200)       /* Borders */
var(--modus-wc-color-base-300)       /* Secondary UI */
var(--modus-wc-color-base-content)   /* Text */

/* Semantic Colors (theme-consistent) */
var(--modus-wc-color-info)           /* Primary */
var(--modus-wc-color-success)        /* Success */
var(--modus-wc-color-error)          /* Error */
var(--modus-wc-color-warning)        /* Warning */
```

**Design System Mapping (Use Tailwind Classes):**

```tsx
// ✅ CORRECT
<div className="bg-background text-foreground border-border">
<button className="bg-primary text-primary-foreground">

// ❌ FORBIDDEN (Will fail lint)
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
<div className="max-w-5xl mx-auto p-8 bg-card border border-border rounded-lg">
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

**4 Supported Themes:**

- `modus-classic-light`
- `modus-classic-dark`
- `modus-modern-light`
- `modus-modern-dark`

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

## File Structure Standards

```
app/
├── layout.tsx                    # Global layout (header/footer included)
├── page.tsx                      # Homepage
├── globals.css                   # Design system + Tailwind
├── components/
│   ├── ModusProvider.tsx         # Modus setup (client)
│   ├── AppHeader.tsx             # Global header
│   ├── AppFooter.tsx             # Global footer
│   └── Modus[Component].tsx      # Configurable components
├── contexts/
│   └── ThemeContext.tsx          # Theme management
└── [feature]-demo/               # Component demos
    └── page.tsx
```

**Layout Rules:**

- Global header/footer in `app/layout.tsx`
- Pages should NOT include header/footer
- Main content: `<main className="flex-1">`

## Testing & Quality Standards

### Pre-Commit Requirements

- [ ] `npm run lint:colors` passes
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] All 4 themes tested
- [ ] Component accessibility verified

### Component Testing Checklist

- [ ] Interactive functionality works
- [ ] Event handlers properly implemented
- [ ] Ref-based DOM access used
- [ ] Cleanup functions included
- [ ] Client directive added if needed
- [ ] Design system colors only
- [ ] Responsive design verified

### Color Compliance Verification

```bash
# Run before every commit
npm run lint:colors

# Common violations detected:
# - Hardcoded hex values (#ffffff)
# - Tailwind color classes (bg-blue-500)
# - RGB/RGBA values
# - Non-Modus CSS variables
```

## Icon Usage Standards

**Setup:** CDN import in `globals.css`

```css
@import url("https://cdn.jsdelivr.net/npm/@trimble-oss/modus-icons@1.17.0/dist/field-systems/fonts/modus-icons.css");
```

**Usage Pattern:**

```tsx
<i className="modus-icons mr-2">icon_name</i>
```

**Icon Set:** Field Systems (623 icons)
**Reference:** https://modus-icons.trimble.com/field-systems/

## Common Issues & Solutions

### Event Handlers Not Working

```tsx
// ❌ WRONG
<ModusWcDropdown onItemSelect={handler} />;

// ✅ CORRECT
const dropdownRef = useRef<any>(null);
useEffect(() => {
  const dropdown = dropdownRef.current;
  if (dropdown) {
    dropdown.addEventListener("itemSelect", handler);
    return () => dropdown.removeEventListener("itemSelect", handler);
  }
}, []);
```

### Dropdown Not Closing

```tsx
// ❌ WRONG
event.target.menuVisible = false;

// ✅ CORRECT
dropdownRef.current.menuVisible = false;
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

## Security Considerations

### Dependency Management

- Use exact versions for Modus packages
- Regular security audits with `npm audit`
- Husky pre-commit hooks prevent non-compliant code

### Color System Security

- Automated linting prevents hardcoded colors
- Design system variables ensure theme consistency
- Pre-commit validation enforces compliance

### Client-Side Safety

- Hydration-safe patterns for all client components
- Proper cleanup of event listeners
- Type-safe component interfaces

## Development Workflow

### Adding New Components

1. Check existing components for reusability
2. Create single configurable component
3. Use ref-based event handling if interactive
4. Mark `"use client"` if needed
5. Test all 4 themes
6. Verify color compliance
7. Add to appropriate demo page

### Debugging Checklist

1. Check console for event handler logs
2. Verify ref attachment
3. Confirm event name matches Modus docs
4. Ensure cleanup function exists
5. Validate client-side directive

### Code Review Standards

- [ ] Single component pattern followed
- [ ] Proper event handling implemented
- [ ] Design system colors only
- [ ] Tailwind classes used appropriately
- [ ] TypeScript interfaces defined
- [ ] Accessibility considerations met
- [ ] Theme compatibility verified

## Resources & References

### Documentation

- [Modus Web Components Storybook](https://trimble-oss.github.io/modus-wc-2.0/main/)
- [Modus Icons Catalog](https://modus-icons.trimble.com/field-systems/)
- [Project Color Palette](http://localhost:3000/color-palette)

### Internal References

- `CLAUDE.md` - Detailed technical patterns
- `README.md` - Basic setup instructions
- `.cursor/rules/` - IDE-specific guidelines

### Quick Commands Reference

```bash
# Development
npm run dev              # Start with Turbopack
npm run build           # Production build

# Quality
npm run lint:colors     # CRITICAL - Run before commit
npm run type-check      # TypeScript validation
npm run lint           # ESLint validation

# Debugging
npm run dev -- --port 3001  # Alternative port
npm run build -- --debug    # Debug build issues
```

---

**Note for AI Agents:** This project enforces strict design system compliance through automated linting. Always run `npm run lint:colors` before suggesting code changes. Focus on creating reusable, configurable components rather than multiple specific variants. Use the ref-based event handling pattern for all Modus Web Components interactions.
