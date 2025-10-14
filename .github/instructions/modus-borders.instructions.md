---
applyTo: "**"
---

# Modus Border Styling Guide

This document provides comprehensive guidance on border styling when working with Modus Web Components and Tailwind CSS 4 in this Next.js project.

## 🚨 CRITICAL: Tailwind v4 Border Issue

### The Problem

Tailwind CSS v4 has a critical limitation where the `border` utility class sets `border-width: 0px` by default, making borders invisible even when you specify `border-border`.

```tsx
// ❌ WRONG - Border is invisible (0px width)
<div className="border border-border">
  No visible border!
</div>

// ❌ WRONG - Common violation pattern
<div className="bg-card border border-border rounded-lg">
  Still no border!
</div>
```

### The Solution

**ALWAYS use inline styles for borders** with the design system `--border` variable:

```tsx
// ✅ CORRECT - Visible border
<div style={{ border: "1px solid var(--border)" }}>
  Visible border!
</div>

// ✅ CORRECT - Combine Tailwind classes with inline border
<div className="bg-card rounded-lg p-4" style={{ border: "1px solid var(--border)" }}>
  Card with visible border
</div>
```

## 🎯 Standard Border Patterns

### 1. Basic Borders

```tsx
// Standard 1px solid border
<div style={{ border: "1px solid var(--border)" }}>
  Content
</div>

// Thick 2px border
<div style={{ border: "2px solid var(--border)" }}>
  Content
</div>

// Dashed border
<div style={{ border: "1px dashed var(--border)" }}>
  Content
</div>

// Dotted border
<div style={{ border: "2px dotted var(--border)" }}>
  Content
</div>
```

### 2. Individual Side Borders

```tsx
// Top border only
<div style={{ borderTop: "1px solid var(--border)" }}>
  Content with top border
</div>

// Bottom border only
<div style={{ borderBottom: "2px solid var(--border)" }}>
  Content with bottom border
</div>

// Left border only (accent pattern)
<div style={{ borderLeft: "3px solid var(--border)" }}>
  Content with left accent
</div>

// Right border only
<div style={{ borderRight: "1px solid var(--border)" }}>
  Content with right border
</div>

// Multiple sides
<div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
  Top and bottom borders
</div>
```

### 3. Border with Tailwind Classes

```tsx
// ✅ CORRECT - Combine Tailwind with inline border
<div
  className="bg-card rounded-lg p-6 shadow-sm"
  style={{ border: "1px solid var(--border)" }}
>
  Card with all styling
</div>

// ✅ CORRECT - Responsive padding with border
<div
  className="p-4 md:p-6 lg:p-8 bg-background"
  style={{ border: "2px solid var(--border)" }}
>
  Responsive content
</div>

// ✅ CORRECT - Header with bottom border (use div, not header)
<div
  className="w-full bg-background text-foreground px-4 py-3"
  style={{ borderBottom: "1px solid var(--border)" }}
>
  Header content
</div>
```

## 📋 Complete Real-World Examples

### Example 1: Card Component

```tsx
export default function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-card rounded-lg p-6 shadow-sm"
      style={{ border: "1px solid var(--border)" }}
    >
      <div className="text-xl font-semibold text-foreground mb-4">{title}</div>
      <div className="text-foreground/80">{children}</div>
    </div>
  );
}
```

### Example 2: Input Field with Border

```tsx
export default function CustomInput({ label, ...props }: InputProps) {
  return (
    <div className="mb-4">
      {/* Use Modus component instead of input */}
      <ModusWcTextInput label={label} {...props} />
    </div>
  );
}
```

### Example 3: Section Divider

```tsx
export default function SectionDivider() {
  return (
    <div className="my-8" style={{ borderTop: "1px solid var(--border)" }} />
  );
}
```

## 🚫 Common Violations

### Violation 1: Using Tailwind Border Classes

```tsx
// ❌ WRONG - No visible border
<div className="border border-border rounded-lg">
  Content
</div>

// ❌ WRONG - Multiple border utilities don't work
<div className="border-2 border-border">
  Content
</div>

// ❌ WRONG - Border color utilities don't work
<div className="border border-primary">
  Content
</div>

// ✅ CORRECT
<div
  className="rounded-lg"
  style={{ border: "1px solid var(--border)" }}
>
  Content
</div>
```

### Violation 2: Mixing Tailwind with Hardcoded Colors

```tsx
// ❌ WRONG - Hardcoded color
<div style={{ border: "1px solid #e5e7eb" }}>
  Content
</div>

// ❌ WRONG - RGB color
<div style={{ border: "1px solid rgb(229, 231, 235)" }}>
  Content
</div>

// ✅ CORRECT - Design system variable
<div style={{ border: "1px solid var(--border)" }}>
  Content
</div>
```

### Violation 3: Inconsistent Border Widths

```tsx
// ❌ AVOID - Inconsistent widths across project
<div style={{ border: "3px solid var(--border)" }}>
<div style={{ border: "5px solid var(--border)" }}>

// ✅ PREFERRED - Standard 1px or 2px
<div style={{ border: "1px solid var(--border)" }}>
<div style={{ border: "2px solid var(--border)" }}>
```

## 🎨 Design System Integration

### Border Color Variable

The `--border` variable automatically adapts to the current theme:

```css
/* Defined in globals.css */
--border: var(--modus-wc-color-base-200);

/* Theme-adaptive values */
/* Light themes: #cbcdd6 (medium gray) */
/* Dark themes: #464b52 (lighter gray) */
```

### Semantic Border Colors

For special cases where you need semantic colors:

```tsx
// Success border
<div style={{ border: "2px solid var(--success)" }}>
  Success content
</div>

// Error border
<div style={{ border: "2px solid var(--destructive)" }}>
  Error content
</div>

// Warning border
<div style={{ border: "2px solid var(--warning)" }}>
  Warning content
</div>

// Primary border (accent)
<div style={{ border: "3px solid var(--primary)" }}>
  Primary content
</div>
```

## 🎯 Best Practices

### DO ✅

1. **Always use inline styles** for all border properties
2. **Use `var(--border)`** for standard borders
3. **Use semantic colors** (`var(--primary)`, `var(--destructive)`) for accent borders
4. **Combine with Tailwind** for other styling (padding, background, etc.)
5. **Standard widths**: Use 1px or 2px for consistency
6. **Border radius**: Use Tailwind classes (`rounded-lg`, `rounded-md`)

### DON'T ❌

1. **Don't use Tailwind border classes** (`border`, `border-2`, `border-border`)
2. **Don't hardcode colors** (`#e5e7eb`, `rgb(229, 231, 235)`)
3. **Don't use inconsistent widths** (stick to 1px or 2px)
4. **Don't forget theme compatibility** (always use CSS variables)

## 🔧 Linting & Validation

### Automated Border Checking

This project includes a linting script that checks for Tailwind border class violations:

```bash
# Check for incorrect border usage
npm run lint:borders
```

**Common violations caught:**

```tsx
// ❌ Flagged by linter
className = "border border-border";
className = "border-2 border-primary";
className = "border-t border-b";
```

### Pre-Commit Hook

The border linting runs automatically on commit to prevent violations from being merged.

## 📖 Related Documentation

- **Color Usage Guide:** `modus-colors.instructions.md`
- **Tailwind Usage Guide:** `modus-tailwind-usage.instructions.md`
- **Development Workflow:** `development_workflow.instructions.md`
- **Design System:** `app/globals.css` (color variables)

## 🎯 Quick Reference

```tsx
// Standard border
style={{ border: "1px solid var(--border)" }}

// Thick border
style={{ border: "2px solid var(--border)" }}

// Dashed border
style={{ border: "1px dashed var(--border)" }}

// Top border only
style={{ borderTop: "1px solid var(--border)" }}

// Bottom border only
style={{ borderBottom: "2px solid var(--border)" }}

// Left accent border
style={{ borderLeft: "3px solid var(--primary)" }}

// Full card example
<div
  className="bg-card rounded-lg p-6"
  style={{ border: "1px solid var(--border)" }}
>
  Content
</div>
```

---

**Remember:** Borders are the ONLY exception to the "maximize Tailwind classes" rule due to Tailwind v4 limitations. Always use inline styles with design system variables.
