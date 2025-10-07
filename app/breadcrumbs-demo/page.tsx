"use client";

import { useState, useCallback } from "react";
import ModusBreadcrumbs, {
  BreadcrumbItem,
} from "../components/ModusBreadcrumbs";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface EventLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function BreadcrumbsDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([
    "Home",
    "Products",
    "Electronics",
    "Laptops",
  ]);

  const logEvent = useCallback(
    (message: string, type: EventLog["type"] = "info") => {
      const timestamp = new Date().toLocaleTimeString();
      setEventLogs((prev) => {
        const newLogs = [{ timestamp, message, type }, ...prev];
        return newLogs.slice(0, 20); // Keep last 20 events
      });
    },
    []
  );

  const clearLogs = () => {
    setEventLogs([]);
  };

  // Sample breadcrumb data
  const breadcrumbExamples: Record<string, BreadcrumbItem[]> = {
    basic: [
      { label: "Home", url: "/" },
      { label: "Products", url: "/products" },
      { label: "Electronics", url: "/products/electronics" },
      { label: "Laptops" }, // Current page, no URL
    ],
    ecommerce: [
      { label: "Store", url: "/store" },
      { label: "Electronics", url: "/store/electronics" },
      { label: "Computers", url: "/store/electronics/computers" },
      { label: "Laptops", url: "/store/electronics/computers/laptops" },
      { label: "MacBook Pro" }, // Current page
    ],
    admin: [
      { label: "Dashboard", url: "/admin" },
      { label: "Users", url: "/admin/users" },
      { label: "User Management", url: "/admin/users/management" },
      { label: "Edit User" }, // Current page
    ],
    documentation: [
      { label: "Docs", url: "/docs" },
      { label: "API Reference", url: "/docs/api" },
      { label: "Components", url: "/docs/api/components" },
      { label: "Breadcrumbs" }, // Current page
    ],
    deep: [
      { label: "Home", url: "/" },
      { label: "Projects", url: "/projects" },
      { label: "Project Alpha", url: "/projects/alpha" },
      { label: "Tasks", url: "/projects/alpha/tasks" },
      { label: "Task 123", url: "/projects/alpha/tasks/123" },
      { label: "Comments", url: "/projects/alpha/tasks/123/comments" },
      { label: "Comment #5" }, // Current page
    ],
  };

  const sizes: Array<{
    value: "sm" | "md" | "lg";
    label: string;
    description: string;
  }> = [
    { value: "sm", label: "Small", description: "Compact navigation" },
    { value: "md", label: "Medium", description: "Standard navigation" },
    { value: "lg", label: "Large", description: "Prominent navigation" },
  ];

  // Event handlers
  const handleBreadcrumbClick = useCallback(
    (event: CustomEvent<BreadcrumbItem>) => {
      const item = event.detail;
      logEvent(
        `Breadcrumb clicked: "${item.label}"${
          item.url ? ` (${item.url})` : ""
        }`,
        "info"
      );
    },
    [logEvent]
  );

  const navigateToPath = (path: string[]) => {
    setCurrentPath(path);
    logEvent(`Navigated to: ${path.join(" > ")}`, "success");
  };

  const generateBreadcrumbs = (path: string[]): BreadcrumbItem[] => {
    return path.map((segment, index) => ({
      label: segment,
      url:
        index === path.length - 1
          ? undefined
          : `/${path
              .slice(0, index + 1)
              .join("/")
              .toLowerCase()}`,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Breadcrumbs Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Breadcrumbs component with different navigation
          patterns, sizes, and interactive features.
        </p>
      </div>

      {/* Basic Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Breadcrumb Examples
        </div>
        <p className="text-foreground mb-6">
          Common breadcrumb patterns for different types of applications.
        </p>
        <div className="space-y-6">
          {Object.entries(breadcrumbExamples).map(([key, items]) => (
            <div key={key}>
              <h4 className="text-lg font-semibold mb-3 text-foreground capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </h4>
              <ModusBreadcrumbs
                items={items}
                aria-label={`${key} navigation`}
                onBreadcrumbClick={handleBreadcrumbClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Size Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Size Variants
        </div>
        <p className="text-foreground mb-6">
          Different breadcrumb sizes for various contexts and importance levels.
        </p>
        <div className="space-y-6">
          {sizes.map((size) => (
            <div key={size.value}>
              <h4 className="text-lg font-semibold mb-3 text-foreground">
                {size.label} ({size.description})
              </h4>
              <ModusBreadcrumbs
                items={breadcrumbExamples.basic}
                size={size.value}
                aria-label={`${size.label} navigation`}
                onBreadcrumbClick={handleBreadcrumbClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Navigation */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Navigation
        </div>
        <p className="text-foreground mb-6">
          Simulate navigation through different paths and see breadcrumbs
          update.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Navigation Controls
            </h4>
            <div className="space-y-3">
              <ModusWcButton
                fullWidth
                color="primary"
                onButtonClick={() =>
                  navigateToPath(["Home", "Products", "Electronics"])
                }
              >
                <i className="modus-icons mr-2">home</i>
                Electronics Section
              </ModusWcButton>
              <ModusWcButton
                fullWidth
                color="secondary"
                onButtonClick={() =>
                  navigateToPath([
                    "Home",
                    "Products",
                    "Electronics",
                    "Laptops",
                    "Gaming Laptops",
                  ])
                }
              >
                <i className="modus-icons mr-2">laptop</i>
                Gaming Laptops
              </ModusWcButton>
              <ModusWcButton
                fullWidth
                color="tertiary"
                onButtonClick={() =>
                  navigateToPath([
                    "Home",
                    "Support",
                    "Documentation",
                    "API Reference",
                  ])
                }
              >
                <i className="modus-icons mr-2">help</i>
                API Documentation
              </ModusWcButton>
              <ModusWcButton
                fullWidth
                variant="outlined"
                color="secondary"
                onButtonClick={() => navigateToPath(["Home"])}
              >
                <i className="modus-icons mr-2">arrow_back</i>
                Back to Home
              </ModusWcButton>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Current Path
            </h4>
            <div className="p-4 bg-background rounded border border-border">
              <ModusBreadcrumbs
                items={generateBreadcrumbs(currentPath)}
                aria-label="Current navigation path"
                onBreadcrumbClick={handleBreadcrumbClick}
              />
            </div>
            <div className="mt-4 text-sm text-foreground">
              <div className="font-medium">Current Path:</div>
              <div className="text-muted-foreground">
                {currentPath.join(" > ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styling Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Custom Styling Examples
        </div>
        <p className="text-foreground mb-6">
          Breadcrumbs with custom CSS classes for enhanced styling.
        </p>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Underlined Links
            </h4>
            <ModusBreadcrumbs
              items={breadcrumbExamples.ecommerce}
              customClass="underline-links"
              aria-label="E-commerce navigation with underlined links"
              onBreadcrumbClick={handleBreadcrumbClick}
            />
            <div className="mt-2 text-sm text-muted-foreground">
              Custom CSS class adds underlines to clickable links
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Large Size with Custom Spacing
            </h4>
            <ModusBreadcrumbs
              items={breadcrumbExamples.admin}
              size="lg"
              customClass="custom-spacing"
              aria-label="Admin navigation with custom spacing"
              onBreadcrumbClick={handleBreadcrumbClick}
            />
            <div className="mt-2 text-sm text-muted-foreground">
              Large size with custom spacing for prominent navigation
            </div>
          </div>
        </div>
      </div>

      {/* Real-world Use Cases */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Real-world Use Cases
        </div>
        <p className="text-foreground mb-6">
          Common scenarios where breadcrumbs are used in applications.
        </p>
        <div className="space-y-6">
          {/* E-commerce Product Page */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              E-commerce Product Page
            </h4>
            <div className="p-4 bg-background rounded border border-border">
              <ModusBreadcrumbs
                items={[
                  { label: "Home", url: "/" },
                  { label: "Electronics", url: "/electronics" },
                  { label: "Computers", url: "/electronics/computers" },
                  { label: "Laptops", url: "/electronics/computers/laptops" },
                  { label: "MacBook Pro 16-inch" },
                ]}
                aria-label="Product navigation"
                onBreadcrumbClick={handleBreadcrumbClick}
              />
            </div>
          </div>

          {/* Admin Dashboard */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Admin Dashboard
            </h4>
            <div className="p-4 bg-background rounded border border-border">
              <ModusBreadcrumbs
                items={[
                  { label: "Admin", url: "/admin" },
                  { label: "User Management", url: "/admin/users" },
                  { label: "User Details", url: "/admin/users/123" },
                  { label: "Edit Profile" },
                ]}
                size="sm"
                aria-label="Admin navigation"
                onBreadcrumbClick={handleBreadcrumbClick}
              />
            </div>
          </div>

          {/* Documentation Site */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Documentation Site
            </h4>
            <div className="p-4 bg-background rounded border border-border">
              <ModusBreadcrumbs
                items={[
                  { label: "Docs", url: "/docs" },
                  { label: "Getting Started", url: "/docs/getting-started" },
                  {
                    label: "Installation",
                    url: "/docs/getting-started/installation",
                  },
                  { label: "Next.js Setup" },
                ]}
                size="lg"
                aria-label="Documentation navigation"
                onBreadcrumbClick={handleBreadcrumbClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-semibold text-foreground">
            Event Log
          </div>
          <ModusWcButton
            variant="borderless"
            color="secondary"
            onButtonClick={clearLogs}
            disabled={eventLogs.length === 0}
          >
            <i className="modus-icons mr-2">delete</i>
            Clear Logs
          </ModusWcButton>
        </div>
        <div className="max-h-64 overflow-y-auto border border-border rounded p-4 bg-background">
          {eventLogs.map((log, index) => (
            <div key={index} className="flex gap-4 mb-2 font-mono text-sm">
              <span className="text-foreground min-w-20">{log.timestamp}</span>
              <span
                className={`${
                  log.type === "success"
                    ? "text-success"
                    : log.type === "warning"
                    ? "text-warning"
                    : log.type === "error"
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                {log.message}
              </span>
            </div>
          ))}
          {eventLogs.length === 0 && (
            <div className="text-foreground italic text-center p-8">
              Click on breadcrumb items to see events logged here...
            </div>
          )}
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Usage Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Basic Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusBreadcrumbs
  items={[
    { label: "Home", url: "/" },
    { label: "Products", url: "/products" },
    { label: "Current Page" }
  ]}
  aria-label="Site navigation"
  onBreadcrumbClick={handleClick}
/>`}
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusBreadcrumbs
  items={breadcrumbItems}
  size="lg"
  customClass="underline-links"
  aria-label="Main navigation"
  onBreadcrumbClick={handleNavigation}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
