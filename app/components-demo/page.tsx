"use client";

import { useState } from "react";
import Link from "next/link";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface ComponentDemo {
  name: string;
  description: string;
  url: string;
  category: string;
  status: "ready" | "demo";
}

const componentDemos: ComponentDemo[] = [
  {
    name: "Accordion",
    description:
      "Collapsible content sections with expand/collapse functionality",
    url: "/accordion-demo",
    category: "Layout",
    status: "ready",
  },
  {
    name: "Alert",
    description:
      "Notifications and messages with different variants and dismissible options",
    url: "/alert-demo",
    category: "Feedback",
    status: "ready",
  },
  {
    name: "Autocomplete",
    description: "Input field with suggestions and multi-select capabilities",
    url: "/autocomplete-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Avatar",
    description: "User profile images with different sizes and shapes",
    url: "/avatar-demo",
    category: "Display",
    status: "ready",
  },
  {
    name: "Badge",
    description: "Labels and counters for status indicators and notifications",
    url: "/badge-demo",
    category: "Display",
    status: "ready",
  },
  {
    name: "Breadcrumbs",
    description: "Navigation breadcrumb trails for hierarchical navigation",
    url: "/breadcrumbs-demo",
    category: "Navigation",
    status: "ready",
  },
  {
    name: "Card",
    description: "Content containers with headers, content, and action areas",
    url: "/card-demo",
    category: "Layout",
    status: "ready",
  },
  {
    name: "Checkbox",
    description: "Form controls for multiple selections and boolean inputs",
    url: "/checkbox-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Chip",
    description: "Compact elements for tags, filters, and removable items",
    url: "/chip-demo",
    category: "Display",
    status: "ready",
  },
  {
    name: "Date",
    description: "Date input controls with validation and formatting",
    url: "/date-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Dropdown Menu",
    description: "Contextual menus with various placement and sizing options",
    url: "/dropdown-demo",
    category: "Navigation",
    status: "ready",
  },
  {
    name: "Icon",
    description:
      "Icon component with various sizes, accessibility options, and styling",
    url: "/icon-demo",
    category: "Display",
    status: "ready",
  },
  {
    name: "Input Feedback",
    description:
      "Contextual feedback for form fields with error, success, warning, and info messages",
    url: "/input-feedback-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Input Label",
    description:
      "Labels for form controls with sub-labels, required indicators, and custom content",
    url: "/input-label-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Text Input",
    description:
      "Single-line text fields with various types, validation, and interactive features",
    url: "/text-input-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Loader",
    description:
      "Visual loading indicators with 6 animation variants, 4 sizes, and 8 colors",
    url: "/loader-demo",
    category: "Feedback",
    status: "ready",
  },
  {
    name: "Progress",
    description:
      "Linear and radial progress indicators for task completion and live updates",
    url: "/progress-demo",
    category: "Feedback",
    status: "ready",
  },
  {
    name: "Menu",
    description:
      "Integrated menu system with container and menu items for navigation and toolbars",
    url: "/menu-demo",
    category: "Navigation",
    status: "ready",
  },
  {
    name: "Navbar",
    description:
      "Full-width application bar with navigation menus, search, notifications, apps launcher, AI button and user profile controls",
    url: "/navbar-demo",
    category: "Navigation",
    status: "ready",
  },
  {
    name: "Modal",
    description:
      "Blocking dialog overlays for forms, confirmations, and detailed content",
    url: "/modal-demo",
    category: "Overlays",
    status: "ready",
  },
  {
    name: "Number Input",
    description:
      "Numeric input controls with validation, currency support, range sliders, and comprehensive form integration",
    url: "/number-input-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Radio",
    description:
      "Exclusive choice control with multiple sizes, required state, and layout customization",
    url: "/radio-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Rating",
    description:
      "Star, smiley, heart, and thumb ratings with events, half-steps, and accessibility helpers",
    url: "/rating-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Select",
    description:
      "Single-select dropdown with dynamic options arrays, validation feedback, and async loading patterns",
    url: "/select-demo",
    category: "Forms",
    status: "ready",
  },
  {
    name: "Side Navigation",
    description:
      "Collapsible left navigation with controlled expansion and Modus navbar integration",
    url: "/side-navigation-demo",
    category: "Navigation",
    status: "ready",
  },
  {
    name: "Pagination",
    description:
      "Page navigation control with first, previous, number, next, and last actions plus accessibility customization",
    url: "/pagination-demo",
    category: "Navigation",
    status: "ready",
  },
  {
    name: "Table",
    description: "Data tables with sorting, pagination, and selection",
    url: "/table-demo",
    category: "Data",
    status: "ready",
  },
];

const categories = [
  { name: "All", value: "all" },
  { name: "Forms", value: "forms" },
  { name: "Layout", value: "layout" },
  { name: "Navigation", value: "navigation" },
  { name: "Display", value: "display" },
  { name: "Feedback", value: "feedback" },
  { name: "Overlays", value: "overlays" },
  { name: "Data", value: "data" },
];

export default function ComponentsDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredComponents =
    selectedCategory === "all"
      ? componentDemos
      : componentDemos.filter(
          (component) => component.category.toLowerCase() === selectedCategory
        );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Web Components Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore all available Modus Web Components with interactive demos and
          examples.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Filter by Category
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <ModusWcButton
              key={category.value}
              color={
                selectedCategory === category.value ? "primary" : "secondary"
              }
              variant={
                selectedCategory === category.value ? "filled" : "outlined"
              }
              size="sm"
              onButtonClick={() => setSelectedCategory(category.value)}
            >
              {category.name}
            </ModusWcButton>
          ))}
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <div
            key={component.url}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xl font-semibold text-foreground mb-2">
                  {component.name}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {component.category}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    component.status === "ready"
                      ? "bg-success text-success-foreground"
                      : "bg-warning text-warning-foreground"
                  }`}
                >
                  {component.status === "ready" ? "Ready" : "Demo"}
                </span>
              </div>
            </div>

            <p className="text-foreground mb-4 text-sm leading-relaxed">
              {component.description}
            </p>

            <div className="flex gap-2">
              <Link href={component.url} className="flex-1">
                <ModusWcButton
                  color="primary"
                  variant="filled"
                  size="sm"
                  fullWidth
                >
                  <i className="modus-icons mr-2">visibility</i>
                  View Demo
                </ModusWcButton>
              </Link>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                size="sm"
                onButtonClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}${component.url}`
                  );
                }}
              >
                <i className="modus-icons">link</i>
              </ModusWcButton>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Component Statistics
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">
              {componentDemos.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Components
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">
              {componentDemos.filter((c) => c.status === "ready").length}
            </div>
            <div className="text-sm text-muted-foreground">Ready</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">
              {categories.length - 1}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">
              Modus Design System
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Getting Started
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Installation
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`npm install @trimble-oss/moduswebcomponents-react`}
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Basic Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`import { ModusWcButton } from '@trimble-oss/moduswebcomponents-react';

<ModusWcButton color="primary">
  Click me
</ModusWcButton>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
