---
applyTo: "**"
---

# Semantic HTML Usage Guide

This document provides comprehensive guidance on HTML element usage in this Modus Next.js project, explaining why we avoid semantic HTML and use div elements with Tailwind classes instead.

## 🚨 CRITICAL: The Div-First Approach

### The Core Principle

**ALWAYS use `<div>` elements with Tailwind classes instead of semantic HTML elements.**

```tsx
// ✅ CORRECT - Use div with Tailwind classes
<div className="text-4xl font-semibold text-foreground">Title</div>
<div className="text-lg text-foreground/80">Description</div>
<div className="mb-8 p-4 bg-card rounded-lg">Content</div>

// ❌ WRONG - Semantic elements interfere with Tailwind
<h1 className="text-4xl font-semibold text-foreground">Title</h1>
<p className="text-lg text-foreground/80">Description</p>
<section className="mb-8 p-4 bg-card rounded-lg">Content</section>
```

## 🎯 Why Avoid Semantic HTML?

### Problem 1: Browser Default Styles

Semantic HTML elements come with built-in browser styles that override or conflict with Tailwind utility classes:

```tsx
// ❌ WRONG - Browser defaults interfere
<h1 className="text-4xl font-semibold">Title</h1>
// Browser adds: font-size, font-weight, margin

<p className="text-lg">Paragraph</p>
// Browser adds: margin-top, margin-bottom

<section className="mb-8">Content</section>
// Browser adds: display: block, margin
```

### Problem 2: CSS Specificity Conflicts

Browser default styles have varying specificity that can conflict with Tailwind utilities:

```tsx
// ❌ WRONG - Unpredictable styling
<h1 className="mt-0">Title</h1>  // Browser default margin may still show
<p className="my-4">Text</p>  // Browser defaults may override

// ✅ CORRECT - Predictable styling
<div className="text-2xl mt-0">Title</div>  // Works as expected
<div className="my-4">Text</div>  // Works as expected
```

### Problem 3: Cross-Browser Inconsistency

Different browsers apply different default styles to semantic elements:

```tsx
// ❌ WRONG - Inconsistent across browsers
<h1>Title</h1>  // Chrome: 2em, Firefox: 2em, Safari: slightly different
<p>Text</p>  // Different margins in different browsers

// ✅ CORRECT - Consistent across browsers
<div className="text-2xl">Title</div>  // Same in all browsers
<div>Text</div>  // Same in all browsers
```

### Problem 4: Maintenance Complexity

Semantic elements make it harder to predict how styles will be applied:

```tsx
// ❌ WRONG - Hard to debug
<h2 className="text-xl font-normal">Why isn't this working?</h2>
// Is it Tailwind? Browser defaults? Something else?

// ✅ CORRECT - Easy to debug
<div className="text-xl font-normal">This works perfectly</div>
// Only Tailwind classes apply
```

## ✅ Correct HTML Element Usage

### Use Div for Everything (Except Icons)

```tsx
// ✅ CORRECT - Titles and headings
<div className="text-4xl font-bold text-foreground">Page Title</div>
<div className="text-3xl font-semibold text-foreground mt-8">Section Title</div>
<div className="text-2xl font-semibold text-foreground mt-6">Subsection</div>
<div className="text-xl font-semibold text-foreground mt-4">Card Title</div>

// ✅ CORRECT - Body text
<div className="text-base text-foreground">Regular paragraph text</div>
<div className="text-sm text-muted-foreground">Small descriptive text</div>
<div className="text-xs text-muted-foreground">Caption or label</div>

// ✅ CORRECT - Layout sections
<div className="mb-8 p-6 bg-card rounded-lg">Card content</div>
<div className="flex items-center justify-between">Header bar</div>
<div className="grid grid-cols-3 gap-4">Grid layout</div>

// ✅ CORRECT - Links (use <a> but sparingly)
<a href="/page" className="text-primary hover:underline">Link text</a>
```

### The Only Exception: Icons

```tsx
// ✅ CORRECT - Icons must use <i> element
<i className="modus-icons mr-2">save_disk</i>

// ❌ WRONG - Don't use div for icons
<div className="modus-icons mr-2">save_disk</div>
```

## 📋 Semantic HTML Elements to Avoid

### Headings (h1-h6)

```tsx
// ❌ WRONG
<h1 className="text-4xl font-bold">Main Title</h1>
<h2 className="text-3xl font-semibold">Section Title</h2>
<h3 className="text-2xl">Subsection</h3>

// ✅ CORRECT
<div className="text-4xl font-bold text-foreground">Main Title</div>
<div className="text-3xl font-semibold text-foreground">Section Title</div>
<div className="text-2xl text-foreground">Subsection</div>
```

### Paragraphs (p)

```tsx
// ❌ WRONG
<p className="text-lg">This is a paragraph of text.</p>
<p className="mb-4">Another paragraph.</p>

// ✅ CORRECT
<div className="text-lg text-foreground">This is a paragraph of text.</div>
<div className="mb-4 text-foreground">Another paragraph.</div>
```

### Sections (section, article, aside)

```tsx
// ❌ WRONG
<section className="mb-8 p-4">
  <article className="bg-card p-6">
    <aside className="text-sm">Sidebar</aside>
  </article>
</section>

// ✅ CORRECT
<div className="mb-8 p-4">
  <div className="bg-card p-6 rounded-lg" style={{ border: "1px solid var(--border)" }}>
    <div className="text-sm text-muted-foreground">Sidebar</div>
  </div>
</div>
```

### Headers and Footers (header, footer)

```tsx
// ❌ WRONG
<header className="bg-background">
  <nav className="flex gap-4">
    <a href="/">Home</a>
  </nav>
</header>
<footer className="mt-8">Footer content</footer>

// ✅ CORRECT
<div className="bg-background" style={{ borderBottom: "1px solid var(--border)" }}>
  <div className="flex gap-4">
    <a href="/">Home</a>
  </div>
</div>
<div className="mt-8 text-muted-foreground">Footer content</div>
```

### Spans (span)

```tsx
// ❌ WRONG
<span className="text-sm text-muted">Small text</span>

// ✅ CORRECT
<div className="text-sm text-muted-foreground">Small text</div>
```

### Lists (ul, ol, li)

```tsx
// ❌ WRONG
<ul className="space-y-2">
  <li className="flex items-center">Item 1</li>
  <li className="flex items-center">Item 2</li>
</ul>

// ✅ CORRECT
<div className="space-y-2">
  <div className="flex items-center">Item 1</div>
  <div className="flex items-center">Item 2</div>
</div>
```

## 📋 Real-World Examples

### Example 1: Page Layout

```tsx
export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - NOT <header> */}
      <div
        className="bg-background text-foreground px-6 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-bold">My Application</div>
      </div>

      {/* Main content - NOT <main> */}
      <div className="container mx-auto p-6">
        {/* Page title - NOT <h1> */}
        <div className="text-4xl font-bold text-foreground mb-6">Dashboard</div>

        {/* Description - NOT <p> */}
        <div className="text-lg text-muted-foreground mb-8">
          Welcome to your dashboard. Here's an overview of your account.
        </div>

        {/* Content section - NOT <section> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card - NOT <article> */}
          <div
            className="bg-card rounded-lg p-6"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-xl font-semibold text-foreground mb-2">
              Total Users
            </div>
            <div className="text-3xl font-bold text-foreground">1,234</div>
          </div>
        </div>
      </div>

      {/* Footer - NOT <footer> */}
      <div
        className="bg-background text-muted-foreground px-6 py-4 mt-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="text-sm">© 2025 My Application</div>
      </div>
    </div>
  );
}
```

### Example 2: Article/Blog Post

```tsx
export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title - NOT <h1> */}
      <div className="text-4xl font-bold text-foreground mb-4">
        How to Build Modern Web Applications
      </div>

      {/* Meta info - NOT <p> */}
      <div className="text-sm text-muted-foreground mb-8">
        Published on October 14, 2025 by John Doe
      </div>

      {/* Content - NOT <article> or <p> */}
      <div className="space-y-4">
        <div className="text-lg text-foreground">
          Modern web development requires understanding multiple technologies
          and patterns.
        </div>

        {/* Subheading - NOT <h2> */}
        <div className="text-2xl font-semibold text-foreground mt-8 mb-4">
          Getting Started
        </div>

        <div className="text-base text-foreground">
          The first step is to choose the right framework for your project.
        </div>

        {/* Quote - NOT <blockquote> */}
        <div
          className="bg-muted rounded-lg p-4 my-6"
          style={{ borderLeft: "3px solid var(--primary)" }}
        >
          <div className="text-lg italic text-foreground">
            "The best code is no code at all."
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            — Anonymous Developer
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Example 3: Navigation Menu

```tsx
export default function Navigation() {
  return (
    <div
      className="bg-background"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="container mx-auto px-6 py-4">
        {/* Logo - NOT <header> */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-foreground">Logo</div>

          {/* Nav links - NOT <nav>, <ul>, <li> */}
          <div className="flex items-center gap-6">
            <a href="/home" className="text-foreground hover:text-primary">
              Home
            </a>
            <a href="/about" className="text-foreground hover:text-primary">
              About
            </a>
            <a href="/contact" className="text-foreground hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Example 4: Feature List

```tsx
export default function FeatureList() {
  const features = [
    {
      icon: "check_circle",
      title: "Fast Performance",
      description: "Lightning-fast loading times",
    },
    { icon: "lock", title: "Secure", description: "Enterprise-grade security" },
    {
      icon: "people_group",
      title: "Collaborative",
      description: "Work together seamlessly",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-card rounded-lg p-6"
          style={{ border: "1px solid var(--border)" }}
        >
          {/* Icon */}
          <i className="modus-icons text-primary text-3xl mb-4">
            {feature.icon}
          </i>

          {/* Title - NOT <h3> */}
          <div className="text-xl font-semibold text-foreground mb-2">
            {feature.title}
          </div>

          {/* Description - NOT <p> */}
          <div className="text-foreground/80">{feature.description}</div>
        </div>
      ))}
    </div>
  );
}
```

## 🚫 Common Violations

### Violation 1: Using Headings

```tsx
// ❌ WRONG
<h1 className="text-4xl">Title</h1>
<h2 className="text-3xl">Subtitle</h2>
<h3 className="text-2xl">Section</h3>

// ✅ CORRECT
<div className="text-4xl font-bold text-foreground">Title</div>
<div className="text-3xl font-semibold text-foreground">Subtitle</div>
<div className="text-2xl font-semibold text-foreground">Section</div>
```

### Violation 2: Using Paragraphs

```tsx
// ❌ WRONG
<p className="text-lg mb-4">Paragraph text</p>

// ✅ CORRECT
<div className="text-lg text-foreground mb-4">Paragraph text</div>
```

### Violation 3: Using Semantic Layout Elements

```tsx
// ❌ WRONG
<header className="bg-background">
  <nav className="flex gap-4">
    <section className="p-4">
      <article className="bg-card">
        <aside className="text-sm">
```

// ✅ CORRECT

<div className="bg-background" style={{ borderBottom: "1px solid var(--border)" }}>
  <div className="flex gap-4">
    <div className="p-4">
      <div className="bg-card rounded-lg p-6" style={{ border: "1px solid var(--border)" }}>
        <div className="text-sm text-muted-foreground">
```

### Violation 4: Using Spans

```tsx
// ❌ WRONG
<span className="text-sm">Text</span>

// ✅ CORRECT
<div className="text-sm text-foreground">Text</div>
```

## 🎯 Typography Scale with Div

```tsx
// Display/Hero text
<div className="text-6xl font-bold text-foreground">Hero Title</div>

// Page titles (h1 equivalent)
<div className="text-4xl font-bold text-foreground">Page Title</div>

// Section titles (h2 equivalent)
<div className="text-3xl font-semibold text-foreground">Section Title</div>

// Subsection titles (h3 equivalent)
<div className="text-2xl font-semibold text-foreground">Subsection Title</div>

// Card/Component titles (h4 equivalent)
<div className="text-xl font-semibold text-foreground">Card Title</div>

// Small titles (h5 equivalent)
<div className="text-lg font-semibold text-foreground">Small Title</div>

// Body text
<div className="text-base text-foreground">Regular body text</div>

// Small text
<div className="text-sm text-muted-foreground">Small descriptive text</div>

// Captions/labels
<div className="text-xs text-muted-foreground">Caption or label</div>
```

## ♿ Accessibility Considerations

### Semantic HTML Is Important for Accessibility

**Note:** While we avoid semantic HTML for styling reasons, we must still maintain accessibility:

```tsx
// Use ARIA roles when semantic HTML would be appropriate
<div role="main" className="container mx-auto">
  <div role="navigation" className="flex gap-4">
    <div role="article" className="bg-card p-6 rounded-lg">
```

### Heading Hierarchy

Even though we use `<div>`, we should maintain logical heading hierarchy with aria-level:

```tsx
<div className="text-4xl font-bold text-foreground" role="heading" aria-level="1">
  Page Title
</div>

<div className="text-2xl font-semibold text-foreground mt-6" role="heading" aria-level="2">
  Section Title
</div>
```

### Interactive Elements

For buttons and links, use Modus components and semantic link elements:

```tsx
// ✅ CORRECT - Use ModusWcButton for buttons
<ModusWcButton color="primary">
  Click Me
</ModusWcButton>

// ✅ CORRECT - Use <a> for links
<a href="/page" className="text-primary hover:underline">
  Link Text
</a>
```

## 🔧 Linting & Validation

### Automated Semantic HTML Checking

```bash
# Check for semantic HTML usage
npm run lint:semantic
```

**Common violations caught:**

```tsx
// ❌ Flagged by linter
<h1 className="text-4xl">Title</h1>
<p className="text-lg">Text</p>
<section className="mb-8">Content</section>
<header className="bg-background">Header</header>
```

## 🎯 Best Practices

### DO ✅

1. **Use `<div>` for all text content** (titles, paragraphs, descriptions)
2. **Use `<div>` for layout elements** (sections, containers, wrappers)
3. **Use Tailwind classes** for all styling (text size, font weight, colors)
4. **Use `<i>` for icons** (only exception)
5. **Use ModusWcButton for buttons** (interactive elements)
6. **Use `<a>` for links** (navigation elements)
7. **Add ARIA roles** where semantic meaning is important

### DON'T ❌

1. **Don't use heading elements** (`<h1>` through `<h6>`)
2. **Don't use paragraph elements** (`<p>`)
3. **Don't use semantic layout elements** (`<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`, `<nav>`)
4. **Don't use `<span>`** (use `<div>` instead)
5. **Don't use list elements** (`<ul>`, `<ol>`, `<li>`)
6. **Don't rely on browser defaults** (always use Tailwind)

## 📖 Related Documentation

- **Color Usage Guide:** `modus-colors.instructions.md`
- **Border Styling Guide:** `modus-borders.instructions.md`
- **Icon Usage Guide:** `modus-icons.instructions.md`
- **Tailwind Usage Guide:** `modus-tailwind-usage.instructions.md`
- **Development Workflow:** `development_workflow.instructions.md`

## 🎯 Quick Reference

```tsx
// ✅ CORRECT - Use div with Tailwind
<div className="text-4xl font-bold text-foreground">Title</div>
<div className="text-lg text-foreground/80">Description</div>
<div className="mb-8 p-4 bg-card rounded-lg">Content</div>

// ❌ WRONG - Semantic HTML
<h1 className="text-4xl font-bold">Title</h1>
<p className="text-lg">Description</p>
<section className="mb-8 p-4">Content</section>

// ✅ Exception: Icons use <i>
<i className="modus-icons mr-2">save_disk</i>

// ✅ Exception: Interactive elements
<ModusWcButton color="primary">Button</ModusWcButton>
<a href="/page" className="text-primary">Link</a>
```

---

**Remember:** Use `<div>` for everything except `<i>` for icons, ModusWcButton for buttons, and `<a>` for links. This ensures consistent Tailwind styling without browser default interference across all themes and browsers.
