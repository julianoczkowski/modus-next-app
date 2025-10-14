---
applyTo: "**"
---

# Modus Next.js Development Workflow & Quality Assurance

This document provides comprehensive development workflow guidelines for AI coding assistants working with this Modus Web Components + Next.js project.

## 🚨 CRITICAL: Pre-Development Requirements

### MANDATORY: Run Linting Before ANY Code Changes

**ALWAYS run these commands before suggesting or making code changes:**

```bash
# 🔍 Run all linting checks at once
npm run lint:styles && npm run lint:colors && npm run lint:icons && npm run lint:semantic
```

**Individual linting commands:**

```bash
npm run lint:styles      # Check for inline styles (should use Tailwind)
npm run lint:colors      # Check for non-Modus colors (hex, RGB, Tailwind colors)
npm run lint:icons       # Check for non-Modus icons (Font Awesome, Material Icons)
npm run lint:semantic    # Check for semantic HTML (h1, section, header, etc.)
```

## 🔄 Standard Development Workflow

**Follow this workflow for EVERY code change:**

1. **📋 Run linting commands** to understand current violations
2. **✏️ Make your changes** to components/pages
3. **🔍 Run linting again** to catch new violations
4. **🔧 Fix all violations** before considering work complete
5. **🧪 Test with Chrome DevTools** to validate functionality
6. **✅ Verify all quality gates pass**

## 🚨 Common Violations & How to Fix Them

### 1. Inline Styles (lint:styles)

**❌ VIOLATIONS:**

```tsx
// Don't use inline styles for things Tailwind can handle
style={{ backgroundColor: "var(--modus-wc-color-base-page)" }}
style={{ marginRight: "8px" }}
style={{ color: "var(--modus-wc-color-base-content)" }}
style={{ padding: "16px" }}
```

**✅ CORRECT:**

```tsx
// Use Tailwind utility classes
className = "bg-background mr-2 text-foreground p-4";
```

**⚠️ EXCEPTION - Borders Only:**

```tsx
// Borders MUST use inline styles (Tailwind v4 border classes don't work)
style={{ border: "1px solid var(--border)" }}
style={{ borderBottom: "2px solid var(--border)" }}
```

### 2. Color Usage (lint:colors)

**❌ VIOLATIONS:**

```tsx
// Don't use hex colors
style={{ backgroundColor: "#ffffff" }}
style={{ color: "#000000" }}

// Don't use Tailwind color classes
className="bg-blue-500 text-red-400"

// Don't use RGB/RGBA
style={{ backgroundColor: "rgb(255, 255, 255)" }}
```

**✅ CORRECT - Use Modus Design System Colors:**

```tsx
// Base Colors (theme-adaptive)
className="bg-background"        // var(--modus-wc-color-base-page)
className="text-foreground"      // var(--modus-wc-color-base-content)
className="bg-card"              // var(--modus-wc-color-base-100)
className="bg-muted"             // var(--modus-wc-color-base-200)
className="bg-secondary"         // var(--modus-wc-color-base-300)

// Semantic Colors (theme-consistent)
className="bg-primary"           // var(--modus-wc-color-info)
className="bg-success"           // var(--modus-wc-color-success)
className="bg-destructive"       // var(--modus-wc-color-error)
className="bg-warning"           // var(--modus-wc-color-warning)

// For borders (inline style required)
style={{ border: "1px solid var(--border)" }}
```

### 3. Icon Usage (lint:icons)

**❌ VIOLATIONS:**

```tsx
// Don't use Font Awesome
import { FaHome } from "react-icons/fa";
<i className="fa fa-home"></i>;

// Don't use Material Icons
import HomeIcon from "@mui/icons-material/Home";
<i className="material-icons">home</i>;
```

**✅ CORRECT - Use Modus Icons:**

```tsx
// Modus Icons from Field Systems
<i className="modus-icons">home</i>
<i className="modus-icons mr-2">search</i>
<i className="modus-icons text-primary">check_circle</i>

// Reference: https://modus-icons.trimble.com/field-systems/
```

### 4. Semantic HTML (lint:semantic)

**❌ VIOLATIONS:**

```tsx
// Don't use semantic HTML elements
<h1 className="text-4xl font-bold">Title</h1>
<section className="mb-8 p-4">Content</section>
<header className="bg-background">Header</header>
<footer className="mt-8">Footer</footer>
<article className="p-4">Article</article>
```

**✅ CORRECT - Use div with Tailwind:**

```tsx
// Use div elements with Tailwind classes
<div className="text-4xl font-bold">Title</div>
<div className="mb-8 p-4">Content</div>
<div className="bg-background">Header</div>
<div className="mt-8">Footer</div>
<div className="p-4">Article</div>
```

**Why:** Browser default styles for semantic HTML interfere with consistent Tailwind styling.

## 🧪 Chrome DevTools Testing (MANDATORY)

**ALWAYS test implementations with Chrome DevTools MCP:**

```bash
# 1. Start development server
npm run dev
```

**2. Test with Chrome DevTools:**

- ✅ Navigate to `http://localhost:3000`
- ✅ Check console for JavaScript errors
- ✅ Test all interactive elements (buttons, forms, dropdowns)
- ✅ Verify responsive design (mobile/desktop views)
- ✅ Test theme switching functionality (if applicable)
- ✅ Run accessibility checks
- ✅ Verify event handlers work correctly

## 🎯 Quality Gates (ALL Must Pass)

**Before considering any work complete:**

- [ ] ✅ `npm run lint:styles` passes (0 violations)
- [ ] ✅ `npm run lint:colors` passes (0 violations)
- [ ] ✅ `npm run lint:icons` passes (0 violations)
- [ ] ✅ `npm run lint:semantic` passes (0 violations)
- [ ] ✅ Chrome DevTools shows no console errors
- [ ] ✅ All interactive elements function correctly
- [ ] ✅ Responsive design verified (mobile/desktop)
- [ ] ✅ Theme compatibility tested (all 4 Modus themes)
- [ ] ✅ TypeScript compilation passes (`npm run type-check`)

## 🏗️ Component Architecture Standards

### Single Configurable Component Pattern

**✅ CORRECT:**

```tsx
// Create ONE flexible component with props
interface ModusButtonProps {
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
}

export function ModusButton({
  color,
  variant,
  size,
  disabled,
  children,
}: ModusButtonProps) {
  return (
    <ModusWcButton
      color={color}
      button-style={variant}
      size={size}
      disabled={disabled}
    >
      {children}
    </ModusWcButton>
  );
}
```

**❌ WRONG:**

```tsx
// Don't create multiple specific components
// ModusButtonPrimary.tsx
// ModusButtonSecondary.tsx
// ModusButtonDanger.tsx
```

### Event Handling Pattern (CRITICAL)

**✅ CORRECT - Use Refs:**

```tsx
"use client";
import { useRef, useEffect } from "react";

export function ModusDropdown() {
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      const handleItemSelect = (event: CustomEvent) => {
        // Use dropdownRef.current, NEVER event.target
        dropdown.menuVisible = false;
      };

      dropdown.addEventListener("itemSelect", handleItemSelect);
      return () => dropdown.removeEventListener("itemSelect", handleItemSelect);
    }
  }, []);

  return <ModusWcDropdownMenu ref={dropdownRef} />;
}
```

**❌ WRONG:**

```tsx
// Don't use event.target or React event props
<ModusWcDropdownMenu onItemSelect={(e) => (e.target.menuVisible = false)} />
```

## 🎨 Styling Standards

### Preferred Approach: Tailwind Utility Classes

```tsx
<div
  className="max-w-5xl mx-auto p-8 bg-card rounded-lg"
  style={{ border: "1px solid var(--border)" }}
>
  <div className="text-4xl font-semibold text-foreground mb-4">Title</div>
  <div className="text-foreground mb-8">Content</div>
</div>
```

### Critical Rules:

1. **Use Tailwind classes** for spacing, typography, colors
2. **Use inline styles** for borders only
3. **Avoid semantic HTML** (`<h1>`, `<section>`) - use `<div>` instead
4. **Use Modus colors** only (no hex, RGB, or Tailwind color classes)
5. **Use Modus icons** only (no Font Awesome, Material Icons)

## 🎨 Design System Color Reference

**Complete Modus Color System:**

```tsx
// Base Colors (adapt to themes)
bg-background        // Page backgrounds
text-foreground      // Primary text
bg-card              // Card backgrounds
bg-muted             // Muted backgrounds
bg-secondary         // Secondary UI elements

// Semantic Colors (consistent across themes)
bg-primary           // Primary actions
text-primary         // Primary text/icons
bg-success           // Success states
text-success         // Success text/icons
bg-destructive       // Error/danger states
text-destructive     // Error text/icons
bg-warning           // Warning states
text-warning         // Warning text/icons

// Borders (inline style only)
style={{ border: "1px solid var(--border)" }}
```

## 📋 Pre-Commit Checklist

**Before committing code:**

1. ✅ Run all linting commands
2. ✅ Fix all violations (0 violations required)
3. ✅ Test with Chrome DevTools
4. ✅ Verify TypeScript compilation
5. ✅ Test all 4 Modus themes
6. ✅ Verify responsive design
7. ✅ Check console for errors
8. ✅ Test interactive functionality

## 🛠️ Quick Fix Reference

```bash
# Inline styles → Tailwind classes
style={{ padding: "16px" }} → className="p-4"
style={{ marginTop: "32px" }} → className="mt-8"
style={{ display: "flex" }} → className="flex"

# Non-Modus colors → Modus colors
style={{ color: "#000000" }} → className="text-foreground"
className="bg-blue-500" → className="bg-primary"

# Non-Modus icons → Modus icons
<i className="fa fa-home"></i> → <i className="modus-icons">home</i>

# Semantic HTML → div + Tailwind
<h1 className="text-4xl">Title</h1> → <div className="text-4xl">Title</div>

# Tailwind borders → Inline styles
className="border border-border" → style={{ border: "1px solid var(--border)" }}
```

## 🎯 AI Assistant Guidelines

**When working on this project:**

1. **ALWAYS run linting commands first** before suggesting changes
2. **ALWAYS use Chrome DevTools MCP** for testing implementations
3. **NEVER suggest hex colors, RGB, or Tailwind color classes**
4. **NEVER suggest Font Awesome or Material Icons**
5. **NEVER suggest semantic HTML elements**
6. **ALWAYS use ref-based event handling** for Modus Web Components
7. **ALWAYS use single configurable component pattern**
8. **ALWAYS test with all 4 Modus themes**
9. **ALWAYS verify responsive design**
10. **ALWAYS ensure 0 linting violations before completing work**

## 📚 Additional Resources

- **Modus Web Components:** https://trimble-oss.github.io/modus-wc-2.0/main/
- **Modus Icons:** https://modus-icons.trimble.com/field-systems/
- **Color Palette:** http://localhost:3000/color-palette
- **Project Documentation:** See AGENTS.md, CLAUDE.md, README.md

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start development server (Turbopack)
npm run build           # Production build

# Quality Assurance
npm run lint:styles     # Check inline styles
npm run lint:colors     # Check color usage (CRITICAL)
npm run lint:icons      # Check icon usage
npm run lint:semantic   # Check semantic HTML
npm run lint           # ESLint validation
npm run type-check     # TypeScript compilation

# Testing
# Use Chrome DevTools MCP for all testing
```

---

**Remember:** This project enforces strict design system compliance. All linting commands must pass with 0 violations before any code is considered complete. Quality gates are non-negotiable.
