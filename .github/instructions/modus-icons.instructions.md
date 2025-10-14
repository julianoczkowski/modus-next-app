---
applyTo: "**"
---

# Modus Icons System Guide

This document provides comprehensive guidance on using Modus Icons in this Next.js project with proper implementation patterns and accessibility practices.

## 🚨 CRITICAL: Icon Usage Patterns

### Two Valid Patterns

This project supports **two ways** to use Modus Icons, each for different use cases:

#### Pattern 1: Standard `<i>` Element (Most Common) ✅

**Use for:** Simple icon display with Tailwind styling

```tsx
// Basic usage
<i className="modus-icons">save_disk</i>

// With Tailwind classes for spacing and colors
<i className="modus-icons mr-2">download</i>
<i className="modus-icons text-primary text-lg">home</i>
<i className="modus-icons text-success">check_circle</i>
```

#### Pattern 2: ModusIcon Component (Advanced) ✅

**Use for:** When you need prop-based configuration, programmatic control, or complex accessibility

```tsx
import ModusIcon from "@/app/components/ModusIcon";

// With size prop
<ModusIcon name="settings" size="lg" />

// With color and accessibility
<ModusIcon name="search" color="var(--primary)" decorative={false} ariaLabel="Search" />

// With custom class
<ModusIcon name="check" customClass="animate-pulse" />
```

### ModusIcon Component Interface

```typescript
interface ModusIconProps {
  name: string; // Icon name from Modus catalog
  size?: "xs" | "sm" | "md" | "lg"; // Default: "md"
  decorative?: boolean; // Default: true
  customClass?: string; // Additional CSS classes
  ariaLabel?: string; // Required if decorative={false}
  color?: string; // CSS color value (e.g., "var(--primary)")
}
```

### When to Use Each Pattern

| Use Case                    | Pattern     | Example                                                             |
| --------------------------- | ----------- | ------------------------------------------------------------------- |
| Simple icon in text/button  | `<i>`       | `<i className="modus-icons mr-2">save_disk</i>`                     |
| Icon with Tailwind styling  | `<i>`       | `<i className="modus-icons text-primary text-xl">star</i>`          |
| Icon needing size prop      | `ModusIcon` | `<ModusIcon name="home" size="lg" />`                               |
| Icon with custom color prop | `ModusIcon` | `<ModusIcon name="check" color="var(--success)" />`                 |
| Icon needing accessibility  | `ModusIcon` | `<ModusIcon name="search" decorative={false} ariaLabel="Search" />` |

## ✅ Correct Icon Usage

### Using `<i>` Element (Standard Pattern)

```tsx
// Icon with text (left)
<ModusWcButton color="primary">
  <i className="modus-icons mr-2">save_disk</i>
  Save File
</ModusWcButton>

<div className="flex items-center gap-2">
  <i className="modus-icons">download</i>
  <div>Download Report</div>
</div>

// Icon with text (right)
<ModusWcButton>
  <div>Next Step</div>
  <i className="modus-icons ml-2">arrow_right</i>
</ModusWcButton>

// Icon only
<ModusWcButton button-style="borderless" aria-label="Settings">
  <i className="modus-icons">settings</i>
</ModusWcButton>

// Icon with Tailwind styling
<i className="modus-icons text-primary text-lg">home</i>
<i className="modus-icons text-success">check</i>
<i className="modus-icons text-destructive">warning</i>
```

### Using ModusIcon Component (Advanced Pattern)

```tsx
import ModusIcon from "@/app/components/ModusIcon";

// With size prop
<ModusIcon name="home" size="lg" />
<ModusIcon name="check" size="sm" />

// With color prop
<ModusIcon name="check" color="var(--success)" />
<ModusIcon name="warning" color="var(--destructive)" />

// With accessibility
<ModusWcButton button-style="borderless" aria-label="Settings">
  <ModusIcon name="settings" decorative={false} ariaLabel="Settings" />
</ModusWcButton>

// With custom class
<ModusIcon name="check" customClass="animate-pulse" />
```

## 📋 Complete Icon Categories

### Actions (Common Operations)

```tsx
// File operations
<ModusIcon name="save_disk" />
<ModusIcon name="download" />
<ModusIcon name="upload" />
<ModusIcon name="copy_content" />

// Edit operations
<ModusIcon name="edit_combination" />
<ModusIcon name="delete" />
<ModusIcon name="add" />
<ModusIcon name="remove" />

// State changes
<ModusIcon name="refresh" />
<ModusIcon name="sync" />
<ModusIcon name="undo" />
<ModusIcon name="redo" />
```

### Navigation (Movement & Direction)

```tsx
// Arrows
<ModusIcon name="arrow_left" />
<ModusIcon name="arrow_right" />
<ModusIcon name="arrow_up" />
<ModusIcon name="arrow_down" />

// Chevrons
<ModusIcon name="chevron_left" />
<ModusIcon name="chevron_right" />
<ModusIcon name="expand_more" />
<ModusIcon name="expand_less" />

// Navigation
<ModusIcon name="home" />
<ModusIcon name="dashboard" />
<ModusIcon name="menu" />
<ModusIcon name="close" />
```

### Interface (UI Elements)

```tsx
// Common UI
<ModusIcon name="search" />
<ModusIcon name="filter" />
<ModusIcon name="settings" />
<ModusIcon name="launch" />

// Views & layouts
<ModusIcon name="view_grid" />
<ModusIcon name="view_list" />
<ModusIcon name="view_column" />
<ModusIcon name="sort" />

// More actions
<ModusIcon name="more_horizontal" />
<ModusIcon name="more_vertical" />
```

### Status (States & Feedback)

```tsx
// Success
<ModusIcon name="check" color="var(--success)" />
<ModusIcon name="check_circle" color="var(--success)" />

// Error/Warning
<ModusIcon name="warning" color="var(--destructive)" />
<ModusIcon name="cancel_circle" color="var(--destructive)" />

// Info/Help
<ModusIcon name="info" color="var(--primary)" />
<ModusIcon name="help" color="var(--primary)" />

// Alert
<ModusIcon name="alert" color="var(--warning)" />
```

### Content (Files & Documents)

```tsx
// Files
<ModusIcon name="file" />
<ModusIcon name="folder_open" />
<ModusIcon name="folder_closed" />
<ModusIcon name="document" />

// Media
<ModusIcon name="image" />
<ModusIcon name="video" />
<ModusIcon name="camera" />
<ModusIcon name="photo" />
```

### User (People & Accounts)

```tsx
// User management
<ModusIcon name="person" />
<ModusIcon name="people_group" />
<ModusIcon name="user_account" />

// Authentication
<ModusIcon name="sign_in" />
<ModusIcon name="sign_out" />
<ModusIcon name="lock" />
<ModusIcon name="lock_open" />
```

### Communication

```tsx
// Messaging
<ModusIcon name="email" />
<ModusIcon name="phone" />
<ModusIcon name="chat" />
<ModusIcon name="comment" />

// Notifications
<ModusIcon name="notifications" />
<ModusIcon name="notifications_off" />
```

### UI Controls

```tsx
// Visibility
<ModusIcon name="visibility_on" />
<ModusIcon name="visibility_off" />

// Toggles
<ModusIcon name="toggle_on" />
<ModusIcon name="toggle_off" />

// Theme
<ModusIcon name="palette" />
<ModusIcon name="brightness" />
```

## 📋 Real-World Examples

### Example 1: Action Buttons

```tsx
import ModusIcon from "@/app/components/ModusIcon";

export default function ActionButtons() {
  return (
    <div className="flex gap-2">
      <ModusWcButton color="primary" className="flex items-center gap-2">
        <ModusIcon name="save_disk" size="sm" />
        <div>Save</div>
      </ModusWcButton>

      <ModusWcButton color="secondary" className="flex items-center gap-2">
        <ModusIcon name="download" size="sm" />
        <div>Download</div>
      </ModusWcButton>

      <ModusWcButton color="danger" className="flex items-center gap-2">
        <ModusIcon name="delete" size="sm" />
        <div>Delete</div>
      </ModusWcButton>
    </div>
  );
}
```

### Example 2: Navigation Menu

```tsx
import ModusIcon from "@/app/components/ModusIcon";

export default function NavigationMenu() {
  return (
    <div className="space-y-2">
      <a className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md">
        <ModusIcon name="dashboard" />
        <div>Dashboard</div>
      </a>

      <a className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md">
        <ModusIcon name="settings" />
        <div>Settings</div>
      </a>

      <a className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md text-destructive">
        <ModusIcon name="sign_out" />
        <div>Logout</div>
      </a>
    </div>
  );
}
```

### Example 3: Status Messages

```tsx
import ModusIcon from "@/app/components/ModusIcon";

export default function StatusMessages() {
  return (
    <div className="space-y-3">
      {/* Success */}
      <div className="flex items-center gap-2 text-success">
        <ModusIcon name="check_circle" color="var(--success)" />
        <div>Operation completed successfully</div>
      </div>

      {/* Error */}
      <div className="flex items-center gap-2 text-destructive">
        <ModusIcon name="warning" color="var(--destructive)" />
        <div>An error occurred</div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-2 text-primary">
        <ModusIcon name="info" color="var(--primary)" />
        <div>Additional information available</div>
      </div>

      {/* Warning */}
      <div className="flex items-center gap-2 text-warning">
        <ModusIcon name="alert" color="var(--warning)" />
        <div>Please review before proceeding</div>
      </div>
    </div>
  );
}
```

### Example 4: Icon Buttons

```tsx
import ModusIcon from "@/app/components/ModusIcon";

export default function IconButtons() {
  return (
    <div className="flex gap-2">
      {/* Icon-only buttons - Use ModusWcButton for interactive elements */}
      <ModusWcButton button-style="borderless" size="sm" aria-label="Search">
        <ModusIcon name="search" decorative={false} ariaLabel="Search" />
      </ModusWcButton>

      <ModusWcButton button-style="borderless" size="sm" aria-label="Filter">
        <ModusIcon name="filter" decorative={false} ariaLabel="Filter" />
      </ModusWcButton>

      <ModusWcButton button-style="borderless" size="sm" aria-label="Settings">
        <ModusIcon name="settings" decorative={false} ariaLabel="Settings" />
      </ModusWcButton>

      <ModusWcButton
        button-style="borderless"
        size="sm"
        color="danger"
        aria-label="Delete"
      >
        <ModusIcon name="delete" decorative={false} ariaLabel="Delete" />
      </ModusWcButton>
    </div>
  );
}
```

### Example 5: File List with Icons

```tsx
import ModusIcon from "@/app/components/ModusIcon";

export default function FileList({ files }: { files: any[] }) {
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-3 p-3 hover:bg-muted rounded-md cursor-pointer"
        >
          {/* File type icon */}
          {file.type === "folder" && (
            <ModusIcon name="folder_closed" color="var(--primary)" />
          )}
          {file.type === "image" && (
            <ModusIcon name="image" color="var(--success)" />
          )}
          {file.type === "document" && <ModusIcon name="document" />}

          {/* File name */}
          <div className="flex-1">{file.name}</div>

          {/* Actions */}
          <ModusWcButton
            button-style="borderless"
            size="xs"
            aria-label="Download"
          >
            <ModusIcon
              name="download"
              size="sm"
              decorative={false}
              ariaLabel="Download"
            />
          </ModusWcButton>
          <ModusWcButton
            button-style="borderless"
            size="xs"
            color="danger"
            aria-label="Delete"
          >
            <ModusIcon
              name="delete"
              size="sm"
              color="var(--destructive)"
              decorative={false}
              ariaLabel="Delete"
            />
          </ModusWcButton>
        </div>
      ))}
    </div>
  );
}
```

## 🚫 Common Violations

### Violation 1: Missing or Wrong Class Name

```tsx
// ❌ WRONG - Missing modus-icons class
<i>save_disk</i>

// ❌ WRONG - Incorrect class name
<i className="modus-icon">save_disk</i>

// ✅ CORRECT - Both patterns are valid
<i className="modus-icons">save_disk</i>
<ModusIcon name="save_disk" />
```

### Violation 2: Using Non-Modus Icons

```tsx
// ❌ WRONG - Font Awesome
<i className="fa fa-save"></i>
<i className="fas fa-download"></i>

// ❌ WRONG - Material Icons
<i className="material-icons">home</i>
<span className="material-icons-outlined">settings</span>

// ✅ CORRECT - Modus Icons (both patterns work)
<i className="modus-icons">save_disk</i>
<ModusIcon name="save_disk" />
```

### Violation 3: Using Wrong HTML Element

```tsx
// ❌ WRONG - Using div or span with modus-icons
<div className="modus-icons">home</div>
<span className="modus-icons">settings</span>

// ✅ CORRECT - Use <i> or ModusIcon component
<i className="modus-icons">home</i>
<ModusIcon name="settings" />
```

### Violation 4: Missing Accessibility for Icon-Only Buttons

```tsx
// ❌ WRONG - Icon-only button without aria-label
<ModusWcButton button-style="borderless">
  <i className="modus-icons">search</i>
</ModusWcButton>

// ✅ CORRECT - Always include aria-label
<ModusWcButton button-style="borderless" aria-label="Search">
  <i className="modus-icons">search</i>
</ModusWcButton>
```

## ♿ Accessibility Best Practices

### Icon-Only Buttons

```tsx
// ✅ CORRECT - Always include aria-label with ModusWcButton
<ModusWcButton button-style="borderless" aria-label="Search">
  <ModusIcon name="search" decorative={false} ariaLabel="Search" />
</ModusWcButton>

<ModusWcButton button-style="borderless" color="danger" aria-label="Delete item">
  <ModusIcon name="delete" decorative={false} ariaLabel="Delete item" />
</ModusWcButton>
```

### Decorative Icons

```tsx
// ✅ CORRECT - Decorative icons default to decorative={true}
<div className="flex items-center gap-2">
  <ModusIcon name="check" />
  <div>Task completed</div>
</div>
```

### Status Icons with Text

```tsx
// ✅ CORRECT - Icon + visible text
<div className="flex items-center gap-2 text-success">
  <ModusIcon name="check_circle" color="var(--success)" />
  <div>Success: Operation completed</div>
</div>
```

## 🔧 Icon Sizes

### Using Size Prop

```tsx
// Extra small
<ModusIcon name="home" size="xs" />

// Small
<ModusIcon name="home" size="sm" />

// Medium (default)
<ModusIcon name="home" size="md" />
<ModusIcon name="home" />  // Same as md

// Large
<ModusIcon name="home" size="lg" />
```

## 🎨 Icon Colors

### Using Design System Colors

```tsx
// Semantic colors
<ModusIcon name="info" color="var(--primary)" />
<ModusIcon name="check_circle" color="var(--success)" />
<ModusIcon name="warning" color="var(--destructive)" />
<ModusIcon name="alert" color="var(--warning)" />

// Text colors
<ModusIcon name="home" color="var(--foreground)" />
<ModusIcon name="settings" color="var(--muted-foreground)" />

// On colored backgrounds
<div className="bg-primary p-4">
  <ModusIcon name="check" color="var(--primary-foreground)" />
</div>
```

## 📖 Icon Reference

**Complete icon catalog:** https://modus-icons.trimble.com/field-systems/

**Total available:** 500+ official Modus icons

**Icon set:** Field Systems (recommended for enterprise applications)

## 🔧 Linting & Validation

### Automated Icon Checking

```bash
# Check for non-Modus icon usage
npm run lint:icons
```

**Common violations caught:**

```tsx
// ❌ Flagged by linter
<i className="fa fa-save"></i>
<i className="material-icons">home</i>
```

## 🎯 Best Practices

### DO ✅

1. **Always use ModusIcon component** from `/app/components/ModusIcon.tsx`
2. **Use component props** for sizing (`size="sm"`) and colors (`color="var(--primary)"`)
3. **Set decorative={false}** for icon-only buttons with proper `ariaLabel`
4. **Use design system colors** (`var(--primary)`, `var(--success)`, etc.)
5. **Check icon catalog** for correct icon names
6. **Use `aria-hidden="true"`** for decorative icons

### DON'T ❌

1. **Don't use other icon libraries** (Font Awesome, Material Icons)
2. **Don't use wrong HTML element** (`<div>` or `<span>` for icons)
3. **Don't forget modus-icons class** when using `<i>` elements
4. **Don't forget accessibility** (aria-label for icon-only buttons)

## 📖 Related Documentation

- **Color Usage Guide:** `modus-colors.instructions.md`
- **Border Styling Guide:** `modus-borders.instructions.md`
- **Development Workflow:** `development_workflow.instructions.md`
- **Icon Catalog:** https://modus-icons.trimble.com/field-systems/

## 🎯 Quick Reference

```tsx
// Standard `<i>` element pattern (most common)
<i className="modus-icons">save_disk</i>
<i className="modus-icons mr-2">download</i>
<i className="modus-icons text-primary text-lg">star</i>

// ModusIcon component (for prop-based config)
<ModusIcon name="settings" size="lg" />
<ModusIcon name="check" color="var(--success)" />

// With layout
<div className="flex items-center gap-2">
  <i className="modus-icons">download</i>
  <div>Download</div>
</div>

// Accessibility (icon-only buttons)
<ModusWcButton button-style="borderless" aria-label="Search">
  <i className="modus-icons">search</i>
</ModusWcButton>
```

---

**Remember:** You can use either pattern - `<i className="modus-icons">icon_name</i>` for simple cases with Tailwind styling, or `<ModusIcon>` component when you need prop-based configuration (size, color, accessibility). Both are valid approaches.
