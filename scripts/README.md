# Modus Color Linting for Next.js

This directory contains scripts for enforcing Modus Design System color usage in the Next.js codebase.

## check-modus-colors.js

A comprehensive linting script that detects non-Modus color patterns and suggests proper alternatives.

### What it detects:

- Tailwind color classes (`red-400`, `blue-500`, etc.)
- Hardcoded hex colors (`#ff0000`, `#ffffff`, etc.)
- Basic RGB/RGBA values
- Background, text, and border color violations

### What it suggests:

- Proper Modus CSS custom properties
- Design system compliant alternatives
- Links to official documentation

### Usage:

```bash
# Manual check
npm run lint:colors

# Automatic check on commit (pre-commit hook)
git commit -m "your changes"
```

The script runs automatically before each commit to ensure design system consistency.

## Modus Color System (9 Colors Only)

### Base Colors (5 total):

1. **Base Page**: `var(--modus-wc-color-base-page)` - #fff (light) / #000 (dark)
2. **Base 100**: `var(--modus-wc-color-base-100)` - #f1f1f6 (light) / #252a2e (dark)
3. **Base 200**: `var(--modus-wc-color-base-200)` - #cbcdd6 (light) / #464b52 (dark)
4. **Base 300**: `var(--modus-wc-color-base-300)` - #b7b9c3 (light) / #353a40 (dark)
5. **Base Content**: `var(--modus-wc-color-base-content)` - #171c1e (light) / #cbcdd6 (dark)

### Semantic Colors (4 total - same in both themes):

6. **Info**: `var(--modus-wc-color-info)` - #0063a3
7. **Success**: `var(--modus-wc-color-success)` - #1e8a44
8. **Error**: `var(--modus-wc-color-error)` - #da212c
9. **Warning**: `var(--modus-wc-color-warning)` - #fbad26

### Component Props:

- **Buttons**: `primary`, `secondary`, `tertiary`, `warning`, `danger`
- **Alerts**: `info`, `success`, `warning`, `error`

**Note**: `primary`, `secondary`, `tertiary`, and `danger` are component-specific color props that map to the CSS variables internally.
