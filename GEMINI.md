# Project Overview

This is a Next.js 15 boilerplate/starter template for building web applications with Modus 2 Web Components. It features React 19, TypeScript support, comprehensive component examples, and modern development practices.

**Main Technologies:**

*   Next.js 15
*   React 19
*   TypeScript
*   Modus Web Components
*   Tailwind CSS 4

**Architecture:**

The project follows the Next.js App Router architecture. The main application code is located in the `app` directory. Reusable React components are in `app/components`, and global styles are in `app/globals.css`. The `ThemeContext` in `app/contexts/ThemeContext.tsx` manages theme switching.

# Building and Running

**Installation:**

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

**Development:**

To run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

**Building for Production:**

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

**Testing:**

The project includes several linting scripts to ensure code quality:

*   `npm run lint`: Runs ESLint.
*   `npm run type-check`: Checks for TypeScript errors.
*   `npm run lint:colors`: Checks for non-Modus color usage.
*   `npm run lint:icons`: Checks for invalid Modus icon names.
*   `npm run lint:styles`: Checks for inline styles.
*   `npm run lint:semantic`: Checks for semantic HTML issues.

# Development Conventions

*   **Coding Style:** The project uses ESLint to enforce a consistent coding style.
*   **Testing:** The project has a suite of linting and type-checking scripts to be run before committing.
*   **Contribution Guidelines:** The `CONTRIBUTING.md` file provides guidelines for contributing to the project.
*   **Color Usage:** Enforces the 9 approved Modus colors and prevents hardcoded values.
*   **Modus Web Components:** Guidelines for proper component implementation with MCP documentation.
*   **React Component Creation:** Best practices for React 19 component architecture and CSS patterns.
