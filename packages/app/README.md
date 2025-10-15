# Modus Next.js Boilerplate

A production-ready Next.js 15 boilerplate with Modus 2 Web Components integration, featuring React 19, TypeScript support, and modern development practices.

## Quick Start

### Prerequisites

- Node.js 20+ (required for Next.js 15 compatibility)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## What's Included

This boilerplate provides a complete foundation for building Next.js applications with Modus Web Components:

- ✅ **Next.js 15 + React 19** - Modern framework with App Router and full type safety
- ✅ **Modus 2 Web Components** - Complete integration with the latest Modus design system
- ✅ **40+ Pre-built Components** - Ready-to-use Modus wrapper components
- ✅ **Theme Support** - All 4 Modus themes (Classic/Modern, Light/Dark)
- ✅ **TypeScript** - Full type safety with Modus component definitions
- ✅ **Tailwind CSS 4** - Design system integration with Modus colors
- ✅ **Development Tools** - ESLint, linting scripts, and quality enforcement
- ✅ **Production Ready** - Optimized build configuration

## Component Library

This boilerplate includes 40+ pre-built Modus components ready to use:

### Form Components

- **ModusButton** - All variants, colors, sizes, and shapes
- **ModusTextInput** - Single-line text fields with validation
- **ModusTextarea** - Multi-line text fields with helper messages
- **ModusNumberInput** - Numeric input with currency support
- **ModusSelect** - Single-select dropdown with dynamic options
- **ModusCheckbox** - Multiple selection controls
- **ModusRadio** - Exclusive choice controls
- **ModusSwitch** - Binary toggle controls
- **ModusSlider** - Interactive range inputs
- **ModusDate** - Date input with validation
- **ModusTimeInput** - Time picker with min/max limits
- **ModusRating** - Star, smiley, heart, and thumb ratings
- **ModusAutocomplete** - Input with suggestions and multi-select

### Layout Components

- **ModusCard** - Content containers with headers and actions
- **ModusAccordion** - Collapsible content sections
- **ModusDivider** - Content separators with labels
- **ModusUtilityPanel** - Collapsible side panels
- **ModusToolbar** - Three-slot layout containers
- **ModusSkeleton** - Animated loading placeholders

### Navigation Components

- **ModusNavbar** - Full-width application bars
- **ModusSideNavigation** - Collapsible left navigation
- **ModusBreadcrumbs** - Hierarchical navigation trails
- **ModusTabs** - Tab navigation with icons
- **ModusMenu** - Integrated menu systems
- **ModusDropdownMenu** - Contextual menus
- **ModusPagination** - Page navigation controls
- **ModusStepper** - Multi-step workflow indicators

### Display Components

- **ModusIcon** - Icon system with 500+ validated icons
- **ModusAvatar** - User profile images
- **ModusBadge** - Status indicators and counters
- **ModusChip** - Compact tags and filters
- **ModusTable** - Data tables with sorting and selection
- **ModusProgress** - Linear and radial progress indicators

### Feedback Components

- **ModusAlert** - Success, warning, error, and info messages
- **ModusToast** - Transient notifications
- **ModusTooltip** - Contextual helper messages
- **ModusLoader** - Visual loading indicators
- **ModusInputFeedback** - Form field feedback
- **ModusInputLabel** - Form control labels

### Overlay Components

- **ModusModal** - Blocking dialog overlays
- **ModusThemeSwitcher** - Theme toggle controls

## Usage Examples

### Basic Component Usage

```tsx
import ModusButton from "./components/ModusButton";
import ModusIcon from "./components/ModusIcon";

export default function MyComponent() {
  return (
    <div>
      <ModusButton color="primary" size="lg">
        <ModusIcon name="save_disk" size="sm" />
        Save Changes
      </ModusButton>
    </div>
  );
}
```

### Theme Switching

```tsx
import { useTheme } from "./contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ModusButton onClick={() => setTheme("modus-classic-dark")}>
      Switch to Dark Theme
    </ModusButton>
  );
}
```

## Development Scripts

```bash
# Development server with Turbopack
npm run dev

# Type checking
npm run type-check

# Production build with Turbopack
npm run build

# Start production server
npm start

# Linting (runs from root workspace)
npm run lint:colors
npm run lint:icons
npm run lint:styles
npm run lint:semantic
npm run lint:borders
```

## Design System Integration

### Modus Colors (9 colors only)

**Base Colors (theme-adaptive):**

- `var(--modus-wc-color-base-page)` - Background
- `var(--modus-wc-color-base-100)` - Cards
- `var(--modus-wc-color-base-200)` - Borders
- `var(--modus-wc-color-base-300)` - Secondary UI
- `var(--modus-wc-color-base-content)` - Text

**Semantic Colors (theme-consistent):**

- `var(--modus-wc-color-info)` - Primary
- `var(--modus-wc-color-success)` - Success
- `var(--modus-wc-color-error)` - Error
- `var(--modus-wc-color-warning)` - Warning

### Tailwind Integration

```tsx
// Use Tailwind classes with design system colors
<div className="bg-background text-foreground">
  <div className="bg-card text-card-foreground p-4 rounded-lg">
    <div className="text-primary">Primary text</div>
    <div className="text-muted-foreground">Muted text</div>
  </div>
</div>
```

### Borders (Important!)

Due to Tailwind v4 limitations, use inline styles for borders:

```tsx
// ❌ WRONG - Tailwind border classes don't work
<div className="border border-border">

// ✅ CORRECT - Use inline styles for borders
<div style={{ border: "1px solid var(--border)" }}>
```

## Icon System

Icons are loaded from the Modus CDN and use the standard pattern:

```tsx
// Basic icon usage
<i className="modus-icons">settings</i>

// With ModusIcon wrapper
<ModusIcon name="settings" size="lg" decorative={false} ariaLabel="Settings" />
```

## Customization

### Adding New Components

1. Create new components in `app/components/`
2. Follow the established patterns for Modus Web Components
3. Use ref-based event handling for interactive components
4. Mark as `"use client"` if needed

### Custom Styling

Use Modus CSS custom properties for consistent theming:

```css
.custom-component {
  background-color: var(--modus-wc-color-base-100);
  color: var(--modus-wc-color-base-content);
  border: 1px solid var(--modus-wc-color-base-200);
}
```

## Deployment

This boilerplate is ready for deployment to various platforms:

### Static Hosting (Netlify, Vercel, GitHub Pages)

```bash
npm run build
# Deploy the .next/ folder
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Common Issues

1. **Icons not displaying**: Ensure Modus icons CSS is imported in `globals.css`
2. **Components not rendering**: Check that Modus Web Components are properly imported
3. **Theme issues**: Verify `data-theme` attribute is set on `<html>` element
4. **Border styling**: Use inline styles instead of Tailwind border classes

### Getting Help

- [Modus Web Components Documentation](https://trimble-oss.github.io/modus-wc-2.0/main/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)

## License

MIT License - see LICENSE file for details.

---

## Want to See Component Examples?

Install the demos workspace to explore interactive examples and implementation patterns:

```bash
cd ../demos
npm install
npm run dev
```

The demos workspace runs on port 3001 and provides comprehensive examples of all Modus components.
