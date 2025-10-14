---
applyTo: "**"
---

# Tailwind CSS Usage Guide for Modus Next.js

This document provides comprehensive guidance on using Tailwind CSS 4 in this Next.js project with Modus Design System integration.

## 🚨 CRITICAL: Tailwind-First Approach

### The Golden Rule

**ALWAYS use Tailwind utility classes inline. NEVER create custom CSS classes for styling.**

```tsx
// ✅ CORRECT - Pure Tailwind with design system colors
<div className="flex items-center gap-4 p-6 bg-background text-foreground rounded-lg">
  <div className="text-xl font-semibold">Title</div>
  <div className="text-sm text-muted-foreground">Description</div>
</div>

// ❌ FORBIDDEN - Custom CSS classes
// Don't create .app-header, .nav-link, .custom-button in CSS files
```

## ✅ Correct Tailwind Usage

### Pattern 1: Layout & Spacing

```tsx
// Flexbox layouts
<div className="flex items-center justify-between gap-4">
<div className="flex flex-col space-y-4">
<div className="grid grid-cols-3 gap-6">

// Spacing
<div className="p-6 mx-auto">           // Padding 24px, centered
<div className="mt-8 mb-4">              // Margin top 32px, bottom 16px
<div className="px-4 py-2">              // Padding horizontal 16px, vertical 8px

// Sizing
<div className="w-full h-screen">       // Full width, full viewport height
<div className="max-w-5xl mx-auto">     // Max width 1024px, centered
<div className="min-h-[200px]">         // Minimum height 200px
```

### Pattern 2: Typography

```tsx
// Text sizes (use div, not semantic HTML)
<div className="text-6xl font-bold text-foreground">Hero Title</div>
<div className="text-4xl font-bold text-foreground">Page Title</div>
<div className="text-2xl font-semibold text-foreground">Section Title</div>
<div className="text-xl font-semibold text-foreground">Card Title</div>
<div className="text-base text-foreground">Body text</div>
<div className="text-sm text-muted-foreground">Small text</div>

// Text alignment & decoration
<div className="text-center">Centered text</div>
<div className="font-semibold">Semi-bold text</div>
<div className="italic">Italic text</div>
<div className="underline">Underlined text</div>
```

### Pattern 3: Colors (Design System)

```tsx
// Background colors
<div className="bg-background">      // Page background
<div className="bg-card">             // Card background
<div className="bg-muted">            // Muted background
<div className="bg-primary">          // Primary action background
<div className="bg-success">          // Success background
<div className="bg-destructive">      // Error background
<div className="bg-warning">          // Warning background

// Text colors
<div className="text-foreground">           // Primary text
<div className="text-muted-foreground">     // Muted text
<div className="text-primary">              // Primary text
<div className="text-success">              // Success text
<div className="text-destructive">          // Error text

// With opacity
<div className="bg-primary/10">             // Primary with 10% opacity
<div className="text-foreground/80">        // Text with 80% opacity
```

### Pattern 4: Borders (CRITICAL EXCEPTION)

**⚠️ Tailwind v4 Issue:** The `border` utility class sets `border-width: 0px`, making borders invisible.

```tsx
// ❌ WRONG - Border is invisible (0px width)
<div className="border border-border">
  No visible border!
</div>

// ❌ WRONG - Common violation pattern
<div className="bg-card border border-border rounded-lg">
  Still no border!
</div>

// ✅ CORRECT - Use inline styles for borders
<div style={{ border: "1px solid var(--border)" }}>
  Visible border!
</div>

// ✅ CORRECT - Combine Tailwind with inline border
<div className="bg-card rounded-lg p-6" style={{ border: "1px solid var(--border)" }}>
  Card with visible border
</div>

// ✅ CORRECT - Individual side borders
<div style={{ borderBottom: "1px solid var(--border)" }}>
<div style={{ borderTop: "2px solid var(--border)" }}>
<div style={{ borderLeft: "3px solid var(--primary)" }}>
```

### Pattern 5: Responsive Design

```tsx
// Mobile-first responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="p-4 md:p-6 lg:p-8">
<div className="text-sm md:text-base lg:text-lg">

// Hide/show at breakpoints
<div className="hidden md:block">          // Hidden on mobile, visible on tablet+
<div className="block md:hidden">          // Visible on mobile, hidden on tablet+

// Responsive spacing
<div className="gap-2 md:gap-4 lg:gap-6">
<div className="mb-4 md:mb-6 lg:mb-8">
```

### Pattern 6: Interactive States

```tsx
// Hover states
<div className="hover:bg-muted cursor-pointer">
<a className="text-primary hover:underline">
<ModusWcButton className="hover:opacity-90">

// Focus states
<input className="focus:ring-2 focus:ring-primary">
<div className="focus:outline-none focus:ring-2">

// Active states
<div className="active:scale-95 transition-transform">

// Disabled states
<div className="disabled:opacity-50 disabled:cursor-not-allowed">
```

### Pattern 7: Transitions & Animations

```tsx
// Transitions
<div className="transition-colors duration-200">
<div className="transition-all duration-300 ease-in-out">
<div className="transition-transform hover:scale-105">

// Built-in animations
<div className="animate-pulse">
<div className="animate-bounce">
<div className="animate-spin">
```

## 🚫 Common Violations

### Violation 1: Creating Custom CSS Classes

```css
/* ❌ FORBIDDEN - Don't create custom classes */
.app-header {
  background-color: var(--background);
  padding: 1rem;
  border-bottom: 1px solid var(--border);
}

.nav-link {
  color: var(--foreground);
}

.nav-link:hover {
  background-color: var(--card);
}

.custom-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
```

```tsx
// ✅ CORRECT - Use Tailwind inline
<div className="bg-background p-4" style={{ borderBottom: "1px solid var(--border)" }}>
<a className="text-foreground hover:bg-card">
<ModusWcButton>Button</ModusWcButton>
```

### Violation 2: Using Tailwind Border Classes

```tsx
// ❌ WRONG - These don't work in Tailwind v4
<div className="border border-border">
<div className="border-2 border-primary">
<div className="border-t border-b">

// ✅ CORRECT - Use inline styles
<div style={{ border: "1px solid var(--border)" }}>
<div style={{ border: "2px solid var(--primary)" }}>
<div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
```

### Violation 3: Hardcoded Colors

```tsx
// ❌ WRONG - Hardcoded colors
<div className="bg-white text-black">
<div style={{ backgroundColor: "#ffffff" }}>
<div style={{ color: "rgb(0, 0, 0)" }}>

// ✅ CORRECT - Design system colors
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
```

### Violation 4: Using Semantic HTML Instead of Div

```tsx
// ❌ WRONG - Semantic HTML interferes with Tailwind
<h1 className="text-4xl font-bold">Title</h1>
<p className="text-lg">Paragraph</p>
<section className="mb-8">Content</section>

// ✅ CORRECT - Use div with Tailwind
<div className="text-4xl font-bold text-foreground">Title</div>
<div className="text-lg text-foreground">Paragraph</div>
<div className="mb-8">Content</div>
```

## ✅ Only 2 Valid Custom CSS Cases

### Case 1: Theme-Based Logo Switching

```css
/* ✅ ALLOWED - Can't be done with Tailwind */
.logo-light {
  display: block;
}
.logo-dark {
  display: none;
}

[data-theme*="dark"] .logo-light {
  display: none;
}
[data-theme*="dark"] .logo-dark {
  display: block;
}
```

### Case 2: Complex Keyframe Animations

```css
/* ✅ ALLOWED - Complex animations need @keyframes */
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideInFromLeft 0.5s ease-out;
}
```

**Note:** Simple animations should use Tailwind:

```tsx
// ✅ PREFERRED - Use Tailwind for simple animations
<div className="transition-transform hover:translate-x-2">
<div className="animate-pulse">
```

## 📋 Real-World Examples

### Example 1: Dashboard Layout

```tsx
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Use div, not header */}
      <div
        className="bg-background text-foreground px-6 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-bold">Dashboard</div>
      </div>

      {/* Main content */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat card */}
          <div
            className="bg-card text-card-foreground rounded-lg p-6"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm text-muted-foreground mb-2">
              Total Users
            </div>
            <div className="text-3xl font-bold text-foreground">1,234</div>
            <div className="text-sm text-success mt-2">
              +12% from last month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Example 2: Responsive Navigation

```tsx
export default function Navigation() {
  return (
    <div
      className="bg-background"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-foreground">Logo</div>

          {/* Desktop nav - hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <a className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile menu button - visible on mobile only */}
          <ModusWcButton
            button-style="borderless"
            className="md:hidden"
            aria-label="Menu"
          >
            <i className="modus-icons">menu</i>
          </ModusWcButton>
        </div>
      </div>
    </div>
  );
}
```

### Example 3: Interactive Card

```tsx
export default function InteractiveCard() {
  return (
    <div
      className="bg-card rounded-lg p-6 cursor-pointer hover:bg-muted transition-colors"
      style={{ border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-4 mb-4">
        <i className="modus-icons text-primary text-2xl">check_circle</i>
        <div className="text-xl font-semibold text-foreground">
          Task Completed
        </div>
      </div>

      <div className="text-foreground/80 mb-4">
        Your task has been successfully completed and marked as done.
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">2 hours ago</div>
        <ModusWcButton size="sm" color="primary">
          View Details
        </ModusWcButton>
      </div>
    </div>
  );
}
```

### Example 4: Form with Validation States

```tsx
export default function Form() {
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-2xl font-bold text-foreground mb-6">
        Contact Form
      </div>

      {/* Success message */}
      <div
        className="bg-success/10 text-success rounded-lg p-4 mb-4"
        style={{ border: "1px solid var(--success)" }}
      >
        <div className="flex items-center gap-2">
          <i className="modus-icons">check_circle</i>
          <div className="font-medium">Form submitted successfully!</div>
        </div>
      </div>

      {/* Error message */}
      <div
        className="bg-destructive/10 text-destructive rounded-lg p-4 mb-4"
        style={{ border: "1px solid var(--destructive)" }}
      >
        <div className="flex items-center gap-2">
          <i className="modus-icons">warning</i>
          <div className="font-medium">Please fix the errors below</div>
        </div>
      </div>

      {/* Form fields - Use Modus components */}
      <div className="space-y-4">
        <ModusWcTextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <ModusWcButton color="primary" className="w-full">
          Submit Form
        </ModusWcButton>
      </div>
    </div>
  );
}
```

## 🎯 Best Practices

### DO ✅

1. **Use Tailwind classes inline** for all styling
2. **Use design system colors** (`bg-background`, `text-foreground`)
3. **Use inline styles for borders** (Tailwind v4 workaround)
4. **Use div elements** instead of semantic HTML
5. **Use responsive classes** (`md:`, `lg:`) for mobile-first design
6. **Use hover/focus states** inline (`hover:bg-muted`)
7. **Combine classes logically** (layout → spacing → colors → typography)
8. **Use opacity modifiers** (`bg-primary/10`, `text-foreground/80`)

### DON'T ❌

1. **Don't create custom CSS classes** for styling
2. **Don't use Tailwind border classes** (`border`, `border-2`)
3. **Don't use hardcoded colors** (hex, RGB, Tailwind colors)
4. **Don't use semantic HTML** (`<h1>`, `<p>`, `<section>`)
5. **Don't create CSS modules** for components
6. **Don't use inline styles** except for borders and dynamic values
7. **Don't forget responsive design** (test mobile, tablet, desktop)
8. **Don't mix CSS files with Tailwind** (keep it pure Tailwind)

## 🔧 Tailwind Configuration

### Current Setup

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system color mappings
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        // ... more colors
      },
    },
  },
  plugins: [],
};
```

### Available Breakpoints

```tsx
// Default Tailwind breakpoints
sm: '640px'   // @media (min-width: 640px)
md: '768px'   // @media (min-width: 768px)
lg: '1024px'  // @media (min-width: 1024px)
xl: '1280px'  // @media (min-width: 1280px)
2xl: '1536px' // @media (min-width: 1536px)
```

## 📖 Related Documentation

- **Color Usage Guide:** `modus-colors.instructions.md`
- **Border Styling Guide:** `modus-borders.instructions.md`
- **Semantic HTML Guide:** `modus-semantic-html.instructions.md`
- **Development Workflow:** `development_workflow.instructions.md`
- **Tailwind CSS Docs:** https://tailwindcss.com/docs

## 🎯 Quick Reference

```tsx
// Layout
<div className="flex items-center justify-between gap-4">
<div className="grid grid-cols-3 gap-6">

// Spacing
<div className="p-6 m-4">              // Padding 24px, margin 16px
<div className="px-4 py-2">             // Padding X 16px, Y 8px

// Typography
<div className="text-4xl font-bold text-foreground">
<div className="text-base text-muted-foreground">

// Colors
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-primary text-primary-foreground">

// Borders (inline style required)
<div style={{ border: "1px solid var(--border)" }}>

// Responsive
<div className="hidden md:block">       // Hidden mobile, visible tablet+
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Interactive
<div className="hover:bg-muted cursor-pointer transition-colors">
```

---

**Remember:** Maximize Tailwind utility classes inline. Never create custom CSS classes for styling. Use inline styles ONLY for borders (Tailwind v4 limitation) and dynamic values. Keep all styling self-documenting and visible in the component.
