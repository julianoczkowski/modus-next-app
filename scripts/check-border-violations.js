#!/usr/bin/env node

/**
 * Border Violations Linting Script for Next.js
 *
 * This script checks for usage of incorrect border patterns that violate
 * Tailwind v4 + Modus design system rules.
 *
 * It flags the common "border border-border" violation and suggests
 * proper inline style alternatives.
 */

import fs from "fs";
import { glob } from "glob";

// Border violation patterns to detect
const BORDER_VIOLATION_PATTERNS = [
  // Common border-border violation
  /className="[^"]*border\s+border-border[^"]*"/g,

  // Border alone without width (Tailwind v4 issue)
  /className="[^"]*border\s+border-[^"]*"/g,

  // Border-2, border-4 classes (don't work in Tailwind v4)
  /className="[^"]*border-[2-9][^"]*"/g,

  // Border with Tailwind color classes
  /className="[^"]*border\s+border-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(\d{2,3}|50)[^"]*"/g,
];

// Correct border patterns (for suggestions)
const CORRECT_BORDER_PATTERNS = {
  "border border-border": 'style={{ border: "1px solid var(--border)" }}',
  "border-2 border-border": 'style={{ border: "2px solid var(--border)" }}',
  "border-4 border-border": 'style={{ border: "4px solid var(--border)" }}',
  "border-t border-border": 'style={{ borderTop: "1px solid var(--border)" }}',
  "border-b border-border":
    'style={{ borderBottom: "1px solid var(--border)" }}',
  "border-l border-border": 'style={{ borderLeft: "1px solid var(--border)" }}',
  "border-r border-border":
    'style={{ borderRight: "1px solid var(--border)" }}',
};

// Get workspace paths from command line arguments or use defaults
const WORKSPACE_PATHS =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : ["packages/app", "packages/demos"];

// Files to check (will be prefixed with workspace paths)
const FILE_PATTERNS = ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"];

// Files to exclude
const EXCLUDE_PATTERNS = [
  "**/node_modules/**",
  "**/.next/**",
  "**/dist/**",
  "**/build/**",
  "**/*.d.ts",
  "scripts/**",
];

async function findBorderViolations() {
  console.log("🎨 Checking for border violations in Next.js app...\n");

  let totalViolations = 0;
  const violations = [];

  try {
    // Get all files to check across workspaces
    const allFiles = [];
    for (const workspacePath of WORKSPACE_PATHS) {
      const workspaceFiles = await glob(
        FILE_PATTERNS.map((pattern) => `${workspacePath}/${pattern}`),
        {
          ignore: EXCLUDE_PATTERNS,
          absolute: true,
        }
      );
      allFiles.push(...workspaceFiles);
    }

    // Remove duplicates
    const uniqueFiles = [...new Set(allFiles)];

    console.log(
      `🔍 Scanning ${uniqueFiles.length} files for border violations...\n`
    );

    for (const filePath of uniqueFiles) {
      if (!fs.existsSync(filePath)) continue;

      const content = fs.readFileSync(filePath, "utf8");
      const fileViolations = [];

      // Check for border violations
      for (const pattern of BORDER_VIOLATION_PATTERNS) {
        const matches = content.match(pattern);
        if (matches) {
          for (const match of matches) {
            const lines = content
              .substring(0, content.indexOf(match))
              .split("\n");
            const lineNumber = lines.length;
            const columnNumber = lines[lines.length - 1].length + 1;

            fileViolations.push({
              line: lineNumber,
              column: columnNumber,
              match: match,
              suggestion: getSuggestion(match),
            });
          }
        }
      }

      if (fileViolations.length > 0) {
        violations.push({
          file: filePath,
          violations: fileViolations,
        });
        totalViolations += fileViolations.length;
      }
    }

    if (totalViolations === 0) {
      console.log("✅ All files are using correct border patterns!");
      console.log(
        "📝 Note: Border violations are avoided to prevent Tailwind v4 conflicts"
      );
      return;
    }

    // Report violations
    console.log(`❌ Found ${totalViolations} border violation(s):\n`);

    for (const { file, violations: fileViolations } of violations) {
      console.log(`📄 ${file}:`);
      for (const violation of fileViolations) {
        console.log(
          `  ${violation.line}:${violation.column} - ${violation.match}`
        );
        console.log(`  💡 Suggestion: ${violation.suggestion}\n`);
      }
    }

    console.log("🔧 Border Violation Resolution Tips:");
    console.log(
      "  • Replace 'border border-border' with 'style={{ border: \"1px solid var(--border)\" }}'"
    );
    console.log(
      "  • Use 'style={{ border: \"2px solid var(--border)\" }}' for thicker borders"
    );
    console.log(
      "  • Use 'style={{ borderTop: \"1px solid var(--border)\" }}' for specific sides"
    );
    console.log(
      "  • Use design system colors: var(--border), var(--input), var(--ring)"
    );
    console.log("  • Avoid Tailwind border classes due to v4 limitations");
    console.log("  📖 Documentation: @modus-borders-short.mdc");

    process.exit(1);
  } catch (error) {
    console.error("❌ Error checking border violations:", error.message);
    process.exit(1);
  }
}

function getSuggestion(violation) {
  // Extract the problematic pattern
  const match = violation.match(/border[^"]*/);
  if (match) {
    const pattern = match[0];
    return (
      CORRECT_BORDER_PATTERNS[pattern] ||
      'style={{ border: "1px solid var(--border)" }}'
    );
  }
  return 'style={{ border: "1px solid var(--border)" }}';
}

// Run the check
findBorderViolations();
