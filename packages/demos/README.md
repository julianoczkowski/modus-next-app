# Modus Components Demo

Interactive examples and implementation patterns for all Modus Web Components. This workspace provides comprehensive demos to help you understand how to use Modus components in your applications.

## Purpose

This demo workspace is designed to:

- **Showcase Components** - Interactive examples of all 40+ Modus components
- **Implementation Patterns** - Best practices for using Modus Web Components
- **Event Handling** - Examples of proper event handling with refs
- **Theme Integration** - How to implement theme switching
- **Accessibility** - Proper ARIA usage and keyboard navigation

## Installation

### Prerequisites

- The main app workspace must be installed first
- Node.js 20+ (required for Next.js 15 compatibility)

### Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the demo server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3001](http://localhost:3001)

## Demo Categories

### Form Components

- **Buttons** - All variants, colors, sizes, and interactive examples
- **Text Input** - Single-line fields with validation patterns
- **Select** - Dropdown menus with dynamic options
- **Checkbox** - Multiple selection controls
- **Radio** - Exclusive choice controls
- **Switch** - Binary toggle controls
- **Slider** - Interactive range inputs
- **Date** - Date picker with validation
- **Time** - Time picker with constraints
- **Number** - Numeric input with formatting
- **Textarea** - Multi-line text fields
- **Autocomplete** - Input with suggestions
- **Rating** - Star and emoji rating systems

### Layout Components

- **Cards** - Content containers with headers and actions
- **Accordion** - Collapsible content sections
- **Divider** - Content separators with labels
- **Utility Panel** - Collapsible side panels
- **Toolbar** - Three-slot layout containers
- **Skeleton** - Animated loading placeholders

### Navigation Components

- **Navbar** - Full-width application bars
- **Side Navigation** - Collapsible left navigation
- **Breadcrumbs** - Hierarchical navigation trails
- **Tabs** - Tab navigation with icons
- **Menu** - Integrated menu systems
- **Dropdown** - Contextual menus
- **Pagination** - Page navigation controls
- **Stepper** - Multi-step workflow indicators

### Display Components

- **Icons** - Complete icon system with 500+ icons
- **Avatars** - User profile images
- **Badges** - Status indicators and counters
- **Chips** - Compact tags and filters
- **Table** - Data tables with sorting and selection
- **Progress** - Linear and radial progress indicators

### Feedback Components

- **Alerts** - Success, warning, error, and info messages
- **Toast** - Transient notifications
- **Tooltip** - Contextual helper messages
- **Loader** - Visual loading indicators
- **Input Feedback** - Form field feedback
- **Input Label** - Form control labels

### Overlay Components

- **Modal** - Blocking dialog overlays
- **Theme Switcher** - Theme toggle controls

### Utilities & Testing

- **All Components** - Comprehensive component showcase
- **Color Palette** - Design system color reference
- **Typography** - Text styling and hierarchy examples

## Development Workflow

### Running Demos

```bash
# Start demo server (port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Component Development

When developing new components or examples:

1. **Follow Patterns** - Use the established patterns from existing demos
2. **Event Handling** - Use ref-based event handling for Modus Web Components
3. **Accessibility** - Include proper ARIA labels and keyboard navigation
4. **Theme Support** - Ensure components work with all 4 Modus themes
5. **Responsive Design** - Test on mobile and desktop viewports

### Adding New Demos

1. Create a new directory in `app/` (e.g., `my-component-demo/`)
2. Add a `page.tsx` file with your demo
3. Import components from the main app workspace:
   ```tsx
   import ModusButton from "modus-next-app/app/components/ModusButton";
   ```
4. Follow the established demo patterns
5. Add navigation links in the main demos page

## Key Implementation Patterns

### Event Handling

```tsx
"use client";
import { useRef, useEffect } from "react";

export default function MyDemo() {
  const componentRef = useRef<any>(null);

  useEffect(() => {
    const component = componentRef.current;
    if (component) {
      const handleEvent = (event: CustomEvent) => {
        console.log("Event received:", event.detail);
      };

      component.addEventListener("eventName", handleEvent);
      return () => component.removeEventListener("eventName", handleEvent);
    }
  }, []);

  return <ModusWcComponent ref={componentRef} />;
}
```

### Theme Integration

```tsx
import { useTheme } from "modus-next-app/app/contexts/ThemeContext";

export default function ThemeDemo() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div>Current theme: {theme}</div>
      <ModusButton onClick={() => setTheme("modus-classic-dark")}>
        Switch Theme
      </ModusButton>
    </div>
  );
}
```

### Component Props

```tsx
import ModusButton from "modus-next-app/app/components/ModusButton";

export default function ButtonDemo() {
  return (
    <ModusButton
      color="primary"
      variant="filled"
      size="lg"
      disabled={false}
      onButtonClick={() => console.log("Clicked!")}
    >
      Click Me
    </ModusButton>
  );
}
```

## Linting and Quality

The demos workspace inherits linting rules from the main app:

```bash
# Run from root workspace
npm run lint:colors
npm run lint:icons
npm run lint:styles
npm run lint:semantic
npm run lint:borders
```

## Browser Support

- **Modern browsers** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile support** - iOS Safari 14+, Chrome Mobile 90+
- **Accessibility** - Screen readers and assistive technologies
- **High contrast** - Windows high contrast mode support

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure the main app workspace is properly installed
2. **Component not rendering**: Check that Modus Web Components are imported
3. **Event handlers not working**: Use ref-based event handling patterns
4. **Theme not switching**: Verify theme context is properly set up

### Development Tips

1. **Use Chrome DevTools** - Test components in different themes and viewports
2. **Check Console** - Look for JavaScript errors and warnings
3. **Test Accessibility** - Use screen readers and keyboard navigation
4. **Validate HTML** - Ensure proper semantic structure

## Contributing

When adding new demos or improving existing ones:

1. **Follow Patterns** - Use established demo patterns
2. **Test Thoroughly** - Test in all themes and viewports
3. **Document Examples** - Include clear usage examples
4. **Accessibility First** - Ensure proper ARIA usage
5. **Performance** - Keep demos lightweight and fast

## Resources

- [Modus Web Components Documentation](https://trimble-oss.github.io/modus-wc-2.0/main/)
- [Modus Icons Catalog](https://modus-icons.trimble.com/field-systems/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)

## License

MIT License - see LICENSE file for details.

---

**Note**: This demo workspace is optional and not required for production use. It's designed to help developers understand and implement Modus Web Components effectively.
