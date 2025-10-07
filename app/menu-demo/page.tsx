"use client";

import { useState } from "react";
import ModusMenu, { MenuItem } from "../components/ModusMenu";

export default function MenuDemo() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
    console.log("Selected item:", item);
  };

  // Sample menu data
  const navigationItems: MenuItem[] = [
    { label: "Dashboard", value: "dashboard", startIcon: "dashboard" },
    { label: "Projects", value: "projects", startIcon: "folder_open" },
    { label: "Tasks", value: "tasks", startIcon: "check_circle" },
    { label: "Calendar", value: "calendar", startIcon: "calendar" },
    {
      label: "Settings",
      value: "settings",
      startIcon: "settings",
      selected: true,
    },
  ];

  const toolbarItems: MenuItem[] = [
    { label: "File", value: "file" },
    { label: "Edit", value: "edit" },
    { label: "View", value: "view" },
    { label: "Tools", value: "tools" },
    { label: "Help", value: "help" },
  ];

  const settingsItems: MenuItem[] = [
    {
      label: "Account",
      value: "account",
      subLabel: "Manage your account settings",
      startIcon: "person",
    },
    {
      label: "Notifications",
      value: "notifications",
      subLabel: "Configure notification preferences",
      startIcon: "notifications",
    },
    {
      label: "Privacy",
      value: "privacy",
      subLabel: "Control your privacy settings",
      startIcon: "lock",
    },
    {
      label: "Billing",
      value: "billing",
      subLabel: "Manage your subscription",
      startIcon: "credit_card",
    },
  ];

  const actionItems: MenuItem[] = [
    { label: "New Project", value: "new-project", startIcon: "add" },
    { label: "Import Data", value: "import", startIcon: "download" },
    { label: "Export Report", value: "export", startIcon: "upload" },
    {
      label: "Archive",
      value: "archive",
      startIcon: "archive_square",
      disabled: true,
    },
    { label: "Delete", value: "delete", startIcon: "delete", bordered: true },
  ];

  const contextItems: MenuItem[] = [
    { label: "Copy", value: "copy", startIcon: "copy_content" },
    { label: "Cut", value: "cut", startIcon: "scissors" },
    { label: "Paste", value: "paste", startIcon: "clipboard" },
    { label: "Duplicate", value: "duplicate", startIcon: "file_copy" },
  ];

  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Menu Component Demo
        </div>
        <p className="text-lg text-foreground opacity-80">
          Integrated menu system with container and menu items working together
        </p>
      </div>

      {/* Selected Item Display */}
      {selectedItem && (
        <div
          className="mb-8 p-4 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-lg font-medium text-foreground mb-2">
            Last Selected Item:
          </div>
          <div className="text-foreground">
            <strong>Label:</strong> {selectedItem.label} |{" "}
            <strong>Value:</strong> {selectedItem.value}
            {selectedItem.subLabel && (
              <span>
                {" "}
                | <strong>Sub-label:</strong> {selectedItem.subLabel}
              </span>
            )}
            {selectedItem.startIcon && (
              <span>
                {" "}
                | <strong>Icon:</strong> {selectedItem.startIcon}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Basic Usage */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Basic Usage
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Vertical Menu
            </div>
            <ModusMenu
              items={navigationItems}
              orientation="vertical"
              size="md"
              ariaLabel="Navigation menu"
              onItemSelect={handleItemSelect}
            />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Horizontal Menu
            </div>
            <ModusMenu
              items={toolbarItems}
              orientation="horizontal"
              size="sm"
              ariaLabel="Toolbar menu"
              onItemSelect={handleItemSelect}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Basic vertical and horizontal menu orientations
        </div>
      </div>

      {/* Size Variations */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Size Variations
        </div>
        <div className="space-y-8">
          {sizes.map((size) => (
            <div key={size}>
              <div className="text-lg font-medium text-foreground mb-4 capitalize">
                {size} Size
              </div>
              <div className="flex gap-8">
                <div className="flex-1">
                  <div className="text-sm text-foreground opacity-70 mb-2">
                    Vertical
                  </div>
                  <ModusMenu
                    items={navigationItems.slice(0, 3)}
                    orientation="vertical"
                    size={size}
                    ariaLabel={`${size} vertical menu`}
                    onItemSelect={handleItemSelect}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-foreground opacity-70 mb-2">
                    Horizontal
                  </div>
                  <ModusMenu
                    items={toolbarItems.slice(0, 3)}
                    orientation="horizontal"
                    size={size}
                    ariaLabel={`${size} horizontal menu`}
                    onItemSelect={handleItemSelect}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Size tokens: sm, md, lg
        </div>
      </div>

      {/* Menu with Icons and Sub-labels */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Rich Menu Items
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              With Icons
            </div>
            <ModusMenu
              items={navigationItems}
              orientation="vertical"
              size="md"
              ariaLabel="Navigation with icons"
              onItemSelect={handleItemSelect}
            />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              With Sub-labels
            </div>
            <ModusMenu
              items={settingsItems}
              orientation="vertical"
              size="lg"
              ariaLabel="Settings with sub-labels"
              onItemSelect={handleItemSelect}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Menu items with start icons and sub-labels for rich content
        </div>
      </div>

      {/* Menu States */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Menu States
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Selected & Disabled Items
            </div>
            <ModusMenu
              items={actionItems}
              orientation="vertical"
              size="md"
              ariaLabel="Action menu with states"
              onItemSelect={handleItemSelect}
            />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Bordered Menu
            </div>
            <ModusMenu
              items={contextItems}
              orientation="vertical"
              size="md"
              bordered
              ariaLabel="Bordered context menu"
              onItemSelect={handleItemSelect}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Menu items with different states: selected, disabled, bordered
        </div>
      </div>

      {/* Use Case Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Use Case Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Side Navigation
            </div>
            <div className="p-4 bg-muted rounded">
              <ModusMenu
                items={navigationItems}
                orientation="vertical"
                size="md"
                bordered
                ariaLabel="Side navigation"
                onItemSelect={handleItemSelect}
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Application Toolbar
            </div>
            <div className="p-4 bg-muted rounded">
              <ModusMenu
                items={toolbarItems}
                orientation="horizontal"
                size="sm"
                ariaLabel="Application toolbar"
                onItemSelect={handleItemSelect}
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Context Menu
            </div>
            <div className="p-4 bg-muted rounded">
              <ModusMenu
                items={contextItems}
                orientation="vertical"
                size="sm"
                bordered
                ariaLabel="Context menu"
                onItemSelect={handleItemSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styling */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Custom Styling
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Custom Width
            </div>
            <ModusMenu
              items={navigationItems}
              orientation="vertical"
              size="md"
              customClass="w-64"
              ariaLabel="Custom width menu"
              onItemSelect={handleItemSelect}
            />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Custom Styling
            </div>
            <ModusMenu
              items={settingsItems.slice(0, 3)}
              orientation="vertical"
              size="lg"
              bordered
              customClass="shadow-lg"
              ariaLabel="Custom styled menu"
              onItemSelect={handleItemSelect}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Custom CSS classes for width, shadows, and other styling
        </div>
      </div>

      {/* Accessibility Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Accessibility
        </div>
        <div className="space-y-6">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Descriptive Labels
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModusMenu
                items={navigationItems.slice(0, 3)}
                orientation="vertical"
                size="md"
                ariaLabel="Main application navigation"
                onItemSelect={handleItemSelect}
              />
              <ModusMenu
                items={actionItems.slice(0, 3)}
                orientation="vertical"
                size="md"
                ariaLabel="File operations menu"
                onItemSelect={handleItemSelect}
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Keyboard Navigation
            </div>
            <div className="p-4 bg-muted rounded">
              <div className="text-sm text-foreground opacity-70 mb-4">
                Use arrow keys to navigate, Enter/Space to select, Escape to
                close
              </div>
              <ModusMenu
                items={navigationItems}
                orientation="vertical"
                size="md"
                bordered
                ariaLabel="Keyboard navigable menu"
                onItemSelect={handleItemSelect}
              />
            </div>
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Proper ARIA labels and keyboard navigation support
        </div>
      </div>

      {/* Code Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Code Examples
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              Basic Menu
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusMenu 
  items={[
    { label: "Dashboard", value: "dashboard", startIcon: "dashboard" },
    { label: "Settings", value: "settings", startIcon: "settings" }
  ]}
  orientation="vertical"
  onItemSelect={(item) => console.log(item.value)}
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              Horizontal Toolbar
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusMenu 
  items={[
    { label: "File", value: "file" },
    { label: "Edit", value: "edit" },
    { label: "View", value: "view" }
  ]}
  orientation="horizontal"
  size="sm"
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              Rich Menu Items
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusMenu 
  items={[
    { 
      label: "Account", 
      value: "account", 
      subLabel: "Manage your account",
      startIcon: "person",
      selected: true
    },
    { 
      label: "Settings", 
      value: "settings", 
      subLabel: "Configure preferences",
      startIcon: "settings"
    }
  ]}
  orientation="vertical"
  size="lg"
  bordered
/>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
