---
applyTo: "**"
---

# Modus Theme System Guide

This document provides comprehensive guidance on implementing and using the Modus Design System theme system in this Next.js application with proper SSR compatibility, theme persistence, and accessibility.

## 🚨 CRITICAL: Theme Architecture Overview

### Available Themes

This application supports **6 themes** total:

#### Standard Modus Themes (4 themes)

```typescript
export type Theme =
  | "modus-classic-light" // Traditional light theme (default)
  | "modus-classic-dark" // Traditional dark theme
  | "modus-modern-light" // Contemporary light theme
  | "modus-modern-dark" // Contemporary dark theme
  | "connect-light" // Trimble Connect light theme
  | "connect-dark"; // Trimble Connect dark theme
```

#### Trimble Connect Themes (2 themes)

- `connect-light` - For Trimble Connect Web Applications
- `connect-dark` - For Trimble Connect Web Applications

> **Important:** Connect themes should only be used when building Trimble Connect Web Applications. For general applications, use the standard Modus themes.

### Theme Characteristics

- **Classic Themes**: Traditional Modus design with established patterns
- **Modern Themes**: Contemporary design with updated styling (11px border radius vs 4px)
- **Connect Themes**: Specialized themes for Trimble Connect Web Applications
- **Light/Dark Modes**: Automatic color scheme adaptation via CSS variables
- **Consistent Colors**: All themes use the same 9 Modus CSS variables with different values

## 🏗️ Theme System Architecture

### 1. Theme Context (State Management)

**File:** `app/contexts/ThemeContext.tsx`

```tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Theme =
  | "modus-classic-light"
  | "modus-classic-dark"
  | "modus-modern-light"
  | "modus-modern-dark"
  | "connect-light"
  | "connect-dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isModern: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("modus-classic-light");
  const [mounted, setMounted] = useState(false);

  // Derived state for convenience
  const isDark = theme.includes("dark");
  const isModern = theme.includes("modern");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("preferred-theme") as Theme;
    if (
      savedTheme &&
      [
        "modus-classic-light",
        "modus-classic-dark",
        "modus-modern-light",
        "modus-modern-dark",
        "connect-light",
        "connect-dark",
      ].includes(savedTheme)
    ) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  // Apply theme to document when it changes
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;

    // Set theme attributes
    html.setAttribute("data-theme", theme);
    html.setAttribute("data-mode", isDark ? "dark" : "light");
    html.className = isDark ? "dark" : "light";

    // Save to localStorage
    localStorage.setItem("preferred-theme", theme);
  }, [theme, isDark, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, isModern }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**Critical Implementation Notes:**

- ✅ **Client Component**: MUST have `"use client"` directive
- ✅ **Hydration Safety**: Uses `mounted` state to prevent SSR mismatches
- ✅ **localStorage**: Persists user theme preference across sessions
- ✅ **Document Attributes**: Sets `data-theme`, `data-mode`, and `className`
- ✅ **Derived State**: `isDark` and `isModern` for conditional logic
- ✅ **TypeScript**: Full type safety with Theme type

### 2. Layout Integration

**File:** `app/layout.tsx`

```tsx
import { ThemeProvider } from "./contexts/ThemeContext";
import ModusProvider from "./components/ModusProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ModusProvider>{children}</ModusProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Provider Hierarchy (CRITICAL ORDER):**

1. **ThemeProvider** - Theme state management (outer)
2. **ModusProvider** - Modus Web Components setup (middle)
3. **children** - App content (inner)

### 3. Theme Switcher Component

**File:** `app/components/ThemeSwitcher.tsx`

```tsx
"use client";

import { useTheme, type Theme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";

interface ThemeSwitcherProps {
  className?: string;
  showLabels?: boolean;
}

function ThemeSwitcherContent({
  className = "",
  showLabels = false,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string; description: string }[] = [
    {
      value: "modus-classic-light",
      label: "Classic Light",
      description: "Traditional light theme",
    },
    {
      value: "modus-classic-dark",
      label: "Classic Dark",
      description: "Traditional dark theme",
    },
    {
      value: "modus-modern-light",
      label: "Modern Light",
      description: "Contemporary light theme",
    },
    {
      value: "modus-modern-dark",
      label: "Modern Dark",
      description: "Contemporary dark theme",
    },
    {
      value: "connect-light",
      label: "Connect Light",
      description: "Trimble Connect light theme",
    },
    {
      value: "connect-dark",
      label: "Connect Dark",
      description: "Trimble Connect dark theme",
    },
  ];

  return (
    <div className={`theme-switcher ${className}`}>
      {showLabels && (
        <div className="mb-4">
          <div className="text-lg font-semibold mb-2 text-foreground">
            Theme Switcher
          </div>
          <div className="text-sm text-foreground/80">
            Choose your preferred theme from the 6 available themes (4 Modus + 2
            Connect)
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {themes.map((themeOption) => (
          <div
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className="p-3 rounded-lg transition-all duration-200 text-left cursor-pointer"
            style={{
              backgroundColor:
                theme === themeOption.value
                  ? "var(--card)"
                  : "var(--background)",
              border:
                theme === themeOption.value
                  ? "2px solid var(--primary)"
                  : "2px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: themeOption.value.includes("dark")
                    ? "var(--foreground)"
                    : "var(--muted)",
                }}
              />
              <div className="font-medium text-sm text-foreground">
                {themeOption.label}
              </div>
            </div>
            <div className="text-xs text-foreground/70">
              {themeOption.description}
            </div>
          </div>
        ))}
      </div>

      {/* Current Theme Display */}
      <div
        className="mt-4 p-3 rounded-lg bg-card"
        style={{
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <i className="modus-icons text-primary text-base">palette</i>
          <div className="text-sm font-medium text-foreground">
            Current Theme: {themes.find((t) => t.value === theme)?.label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemeSwitcher(props: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`theme-switcher ${props.className || ""}`}>
        <div className="animate-pulse">
          <div className="h-4 rounded mb-2 bg-muted" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <ThemeSwitcherContent {...props} />;
}
```

**Key Features:**

- ✅ **Hydration Safe**: Wrapper component prevents SSR mismatches
- ✅ **Visual Feedback**: Selected theme clearly highlighted with primary border
- ✅ **Current Theme Display**: Shows active theme with palette icon
- ✅ **Modus Colors**: Uses only approved Modus CSS variables
- ✅ **Responsive Design**: Grid layout adapts to screen size
- ✅ **Loading Skeleton**: Shows skeleton UI during hydration

## 🎨 Using Themes in Components

### Pattern 1: Accessing Theme Context

```tsx
"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function MyComponent() {
  const { theme, setTheme, isDark, isModern } = useTheme();

  return (
    <div className="bg-background text-foreground">
      <div className="text-lg font-semibold">Theme Information</div>
      <div className="text-sm text-muted-foreground">
        Current theme: {theme}
      </div>
      <div className="text-sm text-muted-foreground">
        Dark mode: {isDark ? "Yes" : "No"}
      </div>
      <div className="text-sm text-muted-foreground">
        Modern theme: {isModern ? "Yes" : "No"}
      </div>
    </div>
  );
}
```

### Pattern 2: Conditional Styling Based on Theme

```tsx
"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function ThemedComponent() {
  const { isDark, isModern } = useTheme();

  return (
    <div
      className="bg-card text-card-foreground p-6"
      style={{
        // Modern themes use 11px border radius, classic uses 4px
        borderRadius: isModern ? "11px" : "4px",
        border: isModern
          ? "1px solid var(--primary)"
          : "1px solid var(--border)",
      }}
    >
      <div className="text-xl font-semibold mb-2">Theme-Aware Component</div>
      <div className="text-foreground/80">
        This component adapts its border radius and styling based on the current
        theme ({isModern ? "Modern" : "Classic"}).
      </div>
    </div>
  );
}
```

### Pattern 3: Theme-Specific Content

```tsx
"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function ThemeContent() {
  const { theme, isDark, isModern } = useTheme();

  const getThemeMessage = () => {
    if (isModern && isDark) return "Modern Dark - Sleek and contemporary";
    if (isModern && !isDark) return "Modern Light - Clean and bright";
    if (!isModern && isDark) return "Classic Dark - Traditional and elegant";
    return "Classic Light - Familiar and comfortable";
  };

  return (
    <div
      className="bg-card rounded-lg p-6"
      style={{ border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <i className="modus-icons text-primary text-2xl">palette</i>
        <div className="text-xl font-semibold text-foreground">
          Active Theme
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-foreground">{getThemeMessage()}</div>
        <div className="text-sm text-muted-foreground">Theme: {theme}</div>
        <div className="text-sm text-muted-foreground">
          Style: {isModern ? "Modern" : "Classic"}
        </div>
        <div className="text-sm text-muted-foreground">
          Mode: {isDark ? "Dark" : "Light"}
        </div>
      </div>
    </div>
  );
}
```

### Pattern 4: Programmatic Theme Switching

```tsx
"use client";

import { useTheme } from "../contexts/ThemeContext";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function ThemeControls() {
  const { theme, setTheme, isDark } = useTheme();

  const toggleDarkMode = () => {
    if (theme === "modus-classic-light") {
      setTheme("modus-classic-dark");
    } else if (theme === "modus-classic-dark") {
      setTheme("modus-classic-light");
    } else if (theme === "modus-modern-light") {
      setTheme("modus-modern-dark");
    } else {
      setTheme("modus-modern-light");
    }
  };

  return (
    <div className="flex gap-3">
      <ModusWcButton color="primary" onButtonClick={toggleDarkMode}>
        <i className="modus-icons mr-2">
          {isDark ? "brightness" : "brightness"}
        </i>
        Toggle {isDark ? "Light" : "Dark"} Mode
      </ModusWcButton>

      <ModusWcButton
        color="secondary"
        onButtonClick={() =>
          setTheme(
            theme.includes("classic")
              ? (theme.replace("classic", "modern") as any)
              : (theme.replace("modern", "classic") as any)
          )
        }
      >
        <i className="modus-icons mr-2">palette</i>
        Switch Style
      </ModusWcButton>
    </div>
  );
}
```

## 🎯 Modus Color System with Themes

### Base Colors (Theme-Adaptive)

These 5 colors change based on the current theme:

```css
/* Light Themes → Dark Themes */
var(--modus-wc-color-base-page)     /* #ffffff → #000000 */
var(--modus-wc-color-base-100)      /* #f1f1f6 → #252a2e */
var(--modus-wc-color-base-200)      /* #cbcdd6 → #464b52 */
var(--modus-wc-color-base-300)      /* #b7b9c3 → #353a40 */
var(--modus-wc-color-base-content)  /* #171c1e → #cbcdd6 */
```

**Tailwind Mappings:**

```tsx
// These automatically adapt to theme changes
<div className="bg-background">      // Uses base-page
<div className="text-foreground">    // Uses base-content
<div className="bg-card">             // Uses base-100
<div className="bg-muted">            // Uses base-200
<div className="bg-secondary">        // Uses base-300
```

### Semantic Colors (Theme-Consistent)

These 4 colors stay the same across all themes:

```css
/* Same in Light and Dark Themes */
var(--modus-wc-color-info)      /* #0063a3 - Blue */
var(--modus-wc-color-success)   /* #1e8a44 - Green */
var(--modus-wc-color-error)     /* #da212c - Red */
var(--modus-wc-color-warning)   /* #fbad26 - Orange */
```

**Tailwind Mappings:**

```tsx
// These stay consistent across themes
<div className="bg-primary">         // Uses info (blue)
<div className="bg-success">         // Uses success (green)
<div className="bg-destructive">     // Uses error (red)
<div className="bg-warning">         // Uses warning (orange)
```

## 🚫 Common Pitfalls & Solutions

### Violation 1: Using Theme Context in Server Components

```tsx
// ❌ WRONG - Server Component trying to use theme
export default function ServerPage() {
  const { theme } = useTheme(); // Error: useTheme must be used within ThemeProvider
  return <div>Theme: {theme}</div>;
}

// ✅ CORRECT - Client Component using theme
("use client");
export default function ClientPage() {
  const { theme } = useTheme(); // Works!
  return <div className="text-foreground">Theme: {theme}</div>;
}
```

### Violation 2: Conditional Hook Calls

```tsx
// ❌ WRONG - Hook called conditionally
function BadComponent() {
  const [mounted, setMounted] = useState(false);

  if (!mounted) return <div>Loading...</div>;

  const { theme } = useTheme(); // Error: Hook called conditionally!
  return <div>{theme}</div>;
}

// ✅ CORRECT - Wrapper pattern
function GoodComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="animate-pulse bg-muted h-8 rounded" />;
  }

  return <ThemedContent />;
}

function ThemedContent() {
  const { theme } = useTheme(); // Always called
  return <div className="text-foreground">{theme}</div>;
}
```

### Violation 3: Hardcoded Theme-Specific Colors

```tsx
// ❌ WRONG - Hardcoded colors that don't adapt
<div style={{ backgroundColor: "#ffffff", color: "#000000" }}>
  This won't adapt to dark mode!
</div>

// ❌ WRONG - Conditional hardcoded colors
const { isDark } = useTheme();
<div style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}>
  Don't hardcode theme-specific values!
</div>

// ✅ CORRECT - Use Modus CSS variables
<div className="bg-background text-foreground">
  This automatically adapts to all themes!
</div>
```

### Violation 4: Missing Hydration Safety

```tsx
// ❌ WRONG - No hydration protection
"use client";
export default function ThemeDisplay() {
  const { theme } = useTheme();
  return <div>{theme}</div>; // Hydration mismatch!
}

// ✅ CORRECT - Protected with mounted state
("use client");
export default function ThemeDisplay() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-32 bg-muted animate-pulse rounded" />;
  }

  return <div className="text-foreground">{theme}</div>;
}
```

### Violation 5: Theme Not Persisting

```tsx
// ❌ WRONG - No localStorage integration
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("modus-classic-light");

  // Missing localStorage load/save logic!

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ CORRECT - Full localStorage integration
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("modus-classic-light");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("preferred-theme") as Theme;
    if (savedTheme && validThemes.includes(savedTheme)) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  // Save to localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("preferred-theme", theme);
  }, [theme, mounted]);

  // Rest of implementation...
}
```

## 📋 Complete Implementation Example

### Theme-Aware Card Component

```tsx
"use client";

import { useTheme } from "../contexts/ThemeContext";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import { useState, useEffect } from "react";

interface ThemeCardProps {
  title: string;
  description: string;
  icon?: string;
}

export default function ThemeCard({
  title,
  description,
  icon = "info",
}: ThemeCardProps) {
  const { theme, isDark, isModern } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-muted rounded-lg" />
      </div>
    );
  }

  return (
    <div
      className="bg-card text-card-foreground p-6 transition-all duration-200"
      style={{
        border: "1px solid var(--border)",
        borderRadius: isModern ? "11px" : "4px",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <i className="modus-icons text-primary" style={{ fontSize: "24px" }}>
          {icon}
        </i>
        <div className="text-xl font-semibold text-foreground">{title}</div>
      </div>

      {/* Description */}
      <div className="text-foreground/80 mb-6">{description}</div>

      {/* Theme Info */}
      <div
        className="bg-muted rounded p-3 mb-4"
        style={{
          border: "1px solid var(--border)",
        }}
      >
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Theme: {theme}</div>
          <div>Style: {isModern ? "Modern (11px)" : "Classic (4px)"}</div>
          <div>Mode: {isDark ? "Dark" : "Light"}</div>
        </div>
      </div>

      {/* Action Button */}
      <ModusWcButton color="primary" size="sm">
        <i className="modus-icons mr-2">launch</i>
        Learn More
      </ModusWcButton>
    </div>
  );
}
```

## 🧪 Testing Theme Implementation

### Manual Testing Checklist

- [ ] ✅ **All 6 Themes Work**: Test Classic Light, Classic Dark, Modern Light, Modern Dark, Connect Light, Connect Dark
- [ ] ✅ **Theme Persistence**: Theme choice persists across page refreshes
- [ ] ✅ **Visual Consistency**: All components adapt properly to theme changes
- [ ] ✅ **No Console Errors**: No React hooks, hydration, or undefined errors
- [ ] ✅ **Instant Switching**: Theme changes happen immediately without flicker
- [ ] ✅ **Modus Components**: All Modus Web Components work in all themes
- [ ] ✅ **Color Compliance**: Only Modus CSS variables used (no hardcoded colors)
- [ ] ✅ **Border Radius**: Modern themes use 11px, Classic themes use 4px
- [ ] ✅ **Connect Themes**: Test Connect themes if building Trimble Connect Web Applications
- [ ] ✅ **Responsive Design**: Theme switcher works on mobile and desktop
- [ ] ✅ **Accessibility**: Proper ARIA labels and keyboard navigation

## 🎯 Best Practices

### DO ✅

1. **Use ThemeContext** for all theme-related state
2. **Protect with mounted state** to prevent hydration mismatches
3. **Use Modus CSS variables** for all colors (never hardcode)
4. **Add `"use client"`** to all components using useTheme
5. **Test all 4 themes** before considering implementation complete
6. **Persist to localStorage** to remember user preferences
7. **Use derived state** (isDark, isModern) for conditional logic
8. **Provide loading skeletons** during hydration

### DON'T ❌

1. **Don't use theme hooks in Server Components**
2. **Don't call hooks conditionally** (causes React errors)
3. **Don't hardcode theme-specific colors** (breaks theme switching)
4. **Don't skip hydration protection** (causes mismatches)
5. **Don't forget localStorage integration** (themes won't persist)
6. **Don't create custom theme logic** (use ThemeContext)
7. **Don't use semantic HTML** (use div with Tailwind)
8. **Don't test with only one theme** (test all 6)

## 📖 Related Documentation

- **Color Usage Guide:** `modus-colors.instructions.md`
- **Tailwind Usage Guide:** `modus-tailwind-usage.instructions.md`
- **Border Styling Guide:** `modus-borders.instructions.md`
- **Development Workflow:** `development_workflow.instructions.md`
- **Modus Web Components:** https://trimble-oss.github.io/modus-wc-2.0/main/

## 🎯 Quick Reference

```tsx
// Import and use theme
"use client";
import { useTheme } from "../contexts/ThemeContext";

const { theme, setTheme, isDark, isModern } = useTheme();

// Set theme programmatically
setTheme("modus-modern-dark");

// Conditional styling
<div style={{
  borderRadius: isModern ? "11px" : "4px",
  border: "1px solid var(--border)"
}}>

// Theme-adaptive colors (automatic)
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">

// Theme-consistent colors (same in all themes)
<div className="bg-primary text-primary-foreground">
<div className="bg-success text-success-foreground">

// Hydration protection pattern
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <LoadingSkeleton />;
```

---

**Remember:** The Modus theme system provides 6 distinct themes (4 Modus + 2 Connect) with automatic color adaptation. Always use the ThemeContext, protect against hydration mismatches, and test with all 6 themes to ensure consistent user experience. Connect themes should only be used for Trimble Connect Web Applications.
