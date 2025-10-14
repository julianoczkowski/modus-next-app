---
applyTo: "**"
---

# Modus Color System Guide

This document provides comprehensive guidance on color usage when working with Modus Web Components and the design system in this Next.js project.

## 🚨 CRITICAL: Color Usage Rules

### The Golden Rule

**ONLY use design system colors. NEVER use:**

- ❌ Tailwind color classes (`bg-blue-500`, `text-red-400`)
- ❌ Hardcoded hex values (`#ffffff`, `#000000`)
- ❌ RGB/RGBA values (`rgb(255, 255, 255)`)
- ❌ Raw Modus CSS variables (`var(--modus-wc-color-base-page)`)

## ✅ Design System Colors

### Complete Color Palette

This project uses 9 Modus CSS variables mapped to semantic Tailwind classes:

#### Base Colors (Theme-Adaptive)

```tsx
// Background colors
className="bg-background"        // Page backgrounds (white/black)
className="bg-card"              // Card backgrounds (light/dark gray)
className="bg-muted"             // Muted backgrounds (medium gray)
className="bg-secondary"         // Secondary UI elements (gray)

// Text colors
className="text-foreground"      // Primary text (black/light gray)
className="text-card-foreground" // Text on cards
className="text-muted-foreground" // Muted text
className="text-secondary-foreground" // Secondary text

// Border color (inline styles only)
style={{ border: "1px solid var(--border)" }}
```

#### Semantic Colors (Theme-Consistent)

```tsx
// Primary (blue)
className = "bg-primary"; // Primary backgrounds
className = "text-primary"; // Primary text/icons
className = "text-primary-foreground"; // Text on primary backgrounds

// Success (green)
className = "bg-success"; // Success backgrounds
className = "text-success"; // Success text/icons
className = "text-success-foreground"; // Text on success backgrounds

// Destructive/Error (red)
className = "bg-destructive"; // Error backgrounds
className = "text-destructive"; // Error text/icons
className = "text-destructive-foreground"; // Text on error backgrounds

// Warning (orange)
className = "bg-warning"; // Warning backgrounds
className = "text-warning"; // Warning text/icons
className = "text-warning-foreground"; // Text on warning backgrounds
```

## 🎨 Usage Patterns

### Pattern 1: Custom UI Components

Use Tailwind classes with design system colors:

```tsx
// ✅ CORRECT - Page layout
<div className="min-h-screen bg-background text-foreground">
  <main className="container mx-auto p-8">
    <div className="text-4xl font-bold text-foreground mb-6">
      Page Title
    </div>
    <div className="text-lg text-muted-foreground">
      Description text
    </div>
  </main>
</div>

// ✅ CORRECT - Card component
<div
  className="bg-card text-card-foreground rounded-lg p-6 shadow-sm"
  style={{ border: "1px solid var(--border)" }}
>
  <div className="text-xl font-semibold mb-2">Card Title</div>
  <div className="text-muted-foreground">Card content</div>
</div>

// ✅ CORRECT - Button using Modus component
<ModusWcButton color="primary">
  Click me
</ModusWcButton>
```

### Pattern 2: Modus Web Components

Use built-in color props (NOT Tailwind classes):

```tsx
// ✅ CORRECT - Button colors
<ModusWcButton color="primary">Primary Action</ModusWcButton>
<ModusWcButton color="secondary">Secondary Action</ModusWcButton>
<ModusWcButton color="tertiary">Tertiary Action</ModusWcButton>
<ModusWcButton color="danger">Delete</ModusWcButton>
<ModusWcButton color="warning">Warning Action</ModusWcButton>

// ✅ CORRECT - Alert colors
<ModusWcAlert type="success">Success message</ModusWcAlert>
<ModusWcAlert type="error">Error message</ModusWcAlert>
<ModusWcAlert type="warning">Warning message</ModusWcAlert>
<ModusWcAlert type="info">Info message</ModusWcAlert>

// ✅ CORRECT - Badge colors
<ModusWcBadge color="primary">Primary</ModusWcBadge>
<ModusWcBadge color="success">Success</ModusWcBadge>
<ModusWcBadge color="danger">Error</ModusWcBadge>
<ModusWcBadge color="warning">Warning</ModusWcBadge>
```

## 📋 Complete Real-World Examples

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

      {/* Main content - Use div, not main */}
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

### Example 2: Form with Validation

```tsx
export default function ContactForm() {
  const [error, setError] = useState("");

  return (
    <form className="space-y-4">
      {/* Success message */}
      <div
        className="bg-success/10 text-success rounded-lg p-4"
        style={{ border: "1px solid var(--success)" }}
      >
        <div className="flex items-center gap-2">
          <i className="modus-icons">check_circle</i>
          <div className="font-medium">Form submitted successfully!</div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          className="bg-destructive/10 text-destructive rounded-lg p-4"
          style={{ border: "1px solid var(--destructive)" }}
        >
          <div className="flex items-center gap-2">
            <i className="modus-icons">warning</i>
            <div className="font-medium">{error}</div>
          </div>
        </div>
      )}

      {/* Input field - Use Modus component, not input */}
      <ModusWcTextInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
      />

      {/* Submit button */}
      <ModusWcButton color="primary" type="submit">
        Submit Form
      </ModusWcButton>
    </form>
  );
}
```

### Example 3: Status Indicators

```tsx
export default function StatusList({ items }: { items: any[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-card rounded-lg p-4 flex items-center justify-between"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-foreground">{item.name}</div>

          {/* Status badge */}
          {item.status === "active" && (
            <div className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
              Active
            </div>
          )}
          {item.status === "error" && (
            <div className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium">
              Error
            </div>
          )}
          {item.status === "warning" && (
            <div className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
              Warning
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Example 4: Navigation Menu

```tsx
export default function NavigationMenu() {
  return (
    <div
      className="bg-background"
      style={{ borderRight: "1px solid var(--border)" }}
    >
      <div className="p-4 space-y-2">
        {/* Active link */}
        <a
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-md"
          style={{ borderLeft: "3px solid var(--primary)" }}
        >
          <i className="modus-icons">dashboard</i>
          <div className="font-medium">Dashboard</div>
        </a>

        {/* Inactive link */}
        <a
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-md"
        >
          <i className="modus-icons">settings</i>
          <div>Settings</div>
        </a>

        {/* Danger link */}
        <a
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md"
        >
          <i className="modus-icons">sign_out</i>
          <div>Logout</div>
        </a>
      </div>
    </div>
  );
}
```

## 🚫 Common Violations

### Violation 1: Tailwind Color Classes

```tsx
// ❌ WRONG - Tailwind color classes
<div className="bg-blue-500 text-white">
<div className="bg-red-400 text-gray-900">
<div className="text-green-600">

// ✅ CORRECT - Design system colors
<div className="bg-primary text-primary-foreground">
<div className="bg-destructive text-destructive-foreground">
<div className="text-success">
```

### Violation 2: Hardcoded Hex Values

```tsx
// ❌ WRONG - Hardcoded colors
<div style={{ backgroundColor: "#ffffff" }}>
<div style={{ color: "#000000" }}>
<div style={{ borderColor: "#e5e7eb" }}>

// ✅ CORRECT - Design system variables
<div className="bg-background">
<div className="text-foreground">
<div style={{ border: "1px solid var(--border)" }}>
```

### Violation 3: RGB/RGBA Values

```tsx
// ❌ WRONG - RGB colors
<div style={{ backgroundColor: "rgb(255, 255, 255)" }}>
<div style={{ color: "rgba(0, 0, 0, 0.8)" }}>

// ✅ CORRECT - Design system with opacity
<div className="bg-background">
<div className="text-foreground/80">
```

### Violation 4: Raw Modus Variables

```tsx
// ❌ WRONG - Raw Modus CSS variables
<div style={{ backgroundColor: "var(--modus-wc-color-base-page)" }}>
<div style={{ color: "var(--modus-wc-color-base-content)" }}>

// ✅ CORRECT - Mapped Tailwind classes
<div className="bg-background">
<div className="text-foreground">
```

## 🎨 Theme Compatibility

### Automatic Theme Adaptation

All design system colors automatically adapt to the current theme:

```tsx
// Same code works in all 4 themes
<div className="bg-background text-foreground">
  {/* Light themes: white background, dark text */}
  {/* Dark themes: dark background, light text */}
</div>
```

### Available Themes

- `modus-classic-light` (default)
- `modus-classic-dark`
- `modus-modern-light`
- `modus-modern-dark`

### Testing Theme Compatibility

Always test your components with all 4 themes to ensure proper contrast and readability.

## 🔧 Linting & Validation

### Automated Color Checking

This project includes a linting script that enforces color compliance:

```bash
# Check for color violations
npm run lint:colors
```

**Common violations caught:**

```tsx
// ❌ Flagged by linter
className="bg-blue-500"
style={{ backgroundColor: "#ffffff" }}
style={{ color: "rgb(0, 0, 0)" }}
style={{ backgroundColor: "var(--modus-wc-color-base-page)" }}
```

### Pre-Commit Hook

Color linting runs automatically on commit via Husky to prevent violations from being merged.

## 🎯 Best Practices

### DO ✅

1. **Use Tailwind classes** for custom UI (`bg-background`, `text-foreground`)
2. **Use color props** for Modus Web Components (`color="primary"`)
3. **Use opacity modifiers** for transparency (`text-foreground/80`, `bg-primary/10`)
4. **Test all themes** to ensure proper contrast
5. **Use semantic colors** for meaning (success, error, warning)

### DON'T ❌

1. **Don't use Tailwind color classes** (`bg-blue-500`, `text-red-400`)
2. **Don't hardcode colors** (`#ffffff`, `rgb(255, 255, 255)`)
3. **Don't use raw Modus variables** in components
4. **Don't create custom color variables** outside design system
5. **Don't assume colors** - always use design system

## 📖 Color Reference Table

| Use Case        | Tailwind Class          | CSS Variable         | Hex (Light) | Hex (Dark) |
| --------------- | ----------------------- | -------------------- | ----------- | ---------- |
| Page background | `bg-background`         | `--background`       | `#ffffff`   | `#000000`  |
| Card background | `bg-card`               | `--card`             | `#f1f1f6`   | `#252a2e`  |
| Primary text    | `text-foreground`       | `--foreground`       | `#171c1e`   | `#cbcdd6`  |
| Muted text      | `text-muted-foreground` | `--muted-foreground` | `#6d6e71`   | `#90939b`  |
| Border          | `var(--border)`         | `--border`           | `#cbcdd6`   | `#464b52`  |
| Primary action  | `bg-primary`            | `--primary`          | `#0063a3`   | `#0063a3`  |
| Success state   | `bg-success`            | `--success`          | `#1e8a44`   | `#1e8a44`  |
| Error state     | `bg-destructive`        | `--destructive`      | `#da212c`   | `#da212c`  |
| Warning state   | `bg-warning`            | `--warning`          | `#fbad26`   | `#fbad26`  |

## 📖 Related Documentation

- **Border Styling Guide:** `modus-borders.instructions.md`
- **Tailwind Usage Guide:** `modus-tailwind-usage.instructions.md`
- **Development Workflow:** `development_workflow.instructions.md`
- **Design System:** `app/globals.css` (color mappings)

## 🎯 Quick Reference

```tsx
// Custom UI - Use Tailwind classes
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-primary text-primary-foreground">
<div className="text-muted-foreground">

// Modus Components - Use color props
<ModusWcButton color="primary">Button</ModusWcButton>
<ModusWcButton color="danger">Delete</ModusWcButton>
<ModusWcAlert type="success">Success</ModusWcAlert>

// Borders - Use inline styles
style={{ border: "1px solid var(--border)" }}

// Opacity - Use Tailwind modifiers
className="bg-primary/10 text-primary"
className="text-foreground/80"
```

---

**Remember:** Strict color compliance is enforced by automated linting. Only use the 9 approved Modus design system colors mapped to Tailwind classes. All violations will be caught before commit.
