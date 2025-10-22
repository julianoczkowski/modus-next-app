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
    status: "demo",
  },
  {
    name: "Alert",
    description:
      "Notifications and messages with different variants and dismissible options",
    url: "/alert-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Autocomplete",
    description: "Input field with suggestions and multi-select capabilities",
    url: "/autocomplete-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Avatar",
    description: "User profile images with different sizes and shapes",
    url: "/avatar-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Badge",
    description: "Labels and counters for status indicators and notifications",
    url: "/badge-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Breadcrumbs",
    description: "Navigation breadcrumb trails for hierarchical navigation",
    url: "/breadcrumbs-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Card",
    description: "Content containers with headers, content, and action areas",
    url: "/card-demo",
    category: "Layout",
    status: "demo",
  },
  {
    name: "Checkbox",
    description: "Form controls for multiple selections and boolean inputs",
    url: "/checkbox-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Chip",
    description: "Compact elements for tags, filters, and removable items",
    url: "/chip-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Date",
    description: "Date input controls with validation and formatting",
    url: "/date-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Dropdown Menu",
    description: "Contextual menus with various placement and sizing options",
    url: "/dropdown-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Divider",
    description:
      "Dividers for separating content with optional labels and horizontal or vertical orientation",
    url: "/divider-demo",
    category: "Layout",
    status: "demo",
  },

  {
    name: "Icon",
    description:
      "Icon component with various sizes, accessibility options, and styling",
    url: "/icon-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Input Feedback",
    description:
      "Contextual feedback for form fields with error, success, warning, and info messages",
    url: "/input-feedback-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Input Label",
    description:
      "Labels for form controls with sub-labels, required indicators, and custom content",
    url: "/input-label-demo",
    category: "Forms",
    status: "demo",
  },

  {
    name: "Loader",
    description:
      "Visual loading indicators with 6 animation variants, 4 sizes, and 8 colors",
    url: "/loader-demo",
    category: "Feedback",
    status: "demo",
  },

  {
    name: "Menu",
    description:
      "Integrated menu system with container and menu items for navigation and toolbars",
    url: "/menu-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Modal",
    description:
      "Blocking dialog overlays for forms, confirmations, and detailed content",
    url: "/modal-demo",
    category: "Overlays",
    status: "demo",
  },
  {
    name: "Navbar",
    description:
      "Full-width application bar with navigation menus, search, notifications, apps launcher, AI button and user profile controls",
    url: "/navbar-demo",
    category: "Navigation",
    status: "demo",
  },

  {
    name: "Number Input",
    description:
      "Numeric input controls with validation, currency support, range sliders, and comprehensive form integration",
    url: "/number-input-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Pagination",
    description:
      "Page navigation control with first, previous, number, next, and last actions plus accessibility customization",
    url: "/pagination-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Progress",
    description:
      "Linear and radial progress indicators for task completion and live updates",
    url: "/progress-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Radio",
    description:
      "Exclusive choice control with multiple sizes, required state, and layout customization",
    url: "/radio-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Rating",
    description:
      "Star, smiley, heart, and thumb ratings with events, half-steps, and accessibility helpers",
    url: "/rating-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Select",
    description:
      "Single-select dropdown with dynamic options arrays, validation feedback, and async loading patterns",
    url: "/select-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Side Navigation",
    description:
      "Collapsible left navigation with controlled expansion and Modus navbar integration",
    url: "/side-navigation-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Skeleton",
    description:
      "Animated loading placeholders for typography, cards, and dashboards",
    url: "/skeleton-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Slider",
    description:
      "Interactive range input with min/max bounds, step control, and live feedback",
    url: "/slider-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Stepper",
    description:
      "Progress indicator for multi-step workflows with horizontal and vertical orientations",
    url: "/stepper-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Switch",
    description:
      "Binary toggle control with required, disabled, and indeterminate states",
    url: "/switch-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Tabs",
    description:
      "Tab navigation with icons, disabled states, and multiple visual styles",
    url: "/tabs-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Textarea",
    description:
      "Multi-line text field with helper messages, validation, and clearable controls",
    url: "/textarea-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Text Input",
    description:
      "Single-line text fields with various types, validation, and interactive features",
    url: "/text-input-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Theme Switcher",
    description:
      "Toggle between light and dark Modus themes with persisted preferences",
    url: "/theme-switcher-demo",
    category: "Appearance",
    status: "demo",
  },
  {
    name: "Time Input",
    description:
      "Single-field time picker with min/max limits, seconds support, and datalist suggestions",
    url: "/time-input-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Toolbar",
    description:
      "Three-slot layout container for building application headers and action bars",
    url: "/toolbar-demo",
    category: "Layout",
    status: "demo",
  },
  {
    name: "Toast",
    description:
      "Transient notifications that stack by position and pair with alerts for content",
    url: "/toast-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Tooltip",
    description:
      "Contextual helper messages that appear on hover or focus around any trigger",
    url: "/tooltip-demo",
    category: "Feedback",
    status: "demo",
  },

  {
    name: "Table",
    description: "Data tables with sorting, pagination, and selection",
    url: "/table-demo",
    category: "Data",
    status: "demo",
  },
  {
    name: "Utility Panel",
    description:
      "Collapsible side panel for contextual filters, tools, and secondary content with optional push layout",
    url: "/utility-panel-demo",
    category: "Layout",
    status: "demo",
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
  { name: "Appearance", value: "appearance" },
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
        <div className="text-lg leading-relaxed text-foreground text-center">
          Explore all available Modus Web Components with interactive demos and
          examples.
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-12 p-8 bg-card rounded-lg border-default">
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
            className="bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-200 border-default"
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
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    component.status === "ready"
                      ? "bg-success text-success-foreground"
                      : "bg-warning text-warning-foreground"
                  }`}
                >
                  {component.status === "ready" ? "Ready" : "Demo"}
                </div>
              </div>
            </div>

            <div className="text-foreground mb-4 text-sm leading-relaxed">
              {component.description}
            </div>

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
