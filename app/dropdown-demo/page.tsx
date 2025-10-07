"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  ModusWcButton,
  ModusWcMenuItem,
  ModusWcDropdownMenu,
} from "@trimble-oss/moduswebcomponents-react";

interface EventLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

// Simple wrapper component for DropdownWithEvents with event handling
function DropdownWithEvents({
  children,
  onMenuVisibilityChange,
  onSelect,
  ...props
}: {
  children: React.ReactNode;
  onMenuVisibilityChange?: (event: CustomEvent<{ isVisible: boolean }>) => void;
  onSelect?: (event: CustomEvent<{ value: string }>) => void;
  [key: string]: unknown;
}) {
  const dropdownRef = useRef<HTMLModusWcDropdownMenuElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const handleMenuVisibilityChange = (event: Event) => {
      onMenuVisibilityChange?.(event as CustomEvent<{ isVisible: boolean }>);
    };
    const handleSelect = (event: Event) => {
      onSelect?.(event as CustomEvent<{ value: string }>);
    };

    if (onMenuVisibilityChange)
      dropdown.addEventListener(
        "menuVisibilityChange",
        handleMenuVisibilityChange
      );
    if (onSelect) dropdown.addEventListener("itemSelect", handleSelect);

    return () => {
      if (onMenuVisibilityChange)
        dropdown.removeEventListener(
          "menuVisibilityChange",
          handleMenuVisibilityChange
        );
      if (onSelect) dropdown.removeEventListener("itemSelect", handleSelect);
    };
  }, [onMenuVisibilityChange, onSelect]);

  return (
    <ModusWcDropdownMenu ref={dropdownRef} {...props}>
      {children}
    </ModusWcDropdownMenu>
  );
}

export default function DropdownDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>(
    {}
  );
  const [menuVisibility, setMenuVisibility] = useState<Record<string, boolean>>(
    {}
  );

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

  const handleMenuVisibilityChange = useCallback(
    (dropdownId: string) => (event: CustomEvent<{ isVisible: boolean }>) => {
      const isVisible = event.detail.isVisible;
      setMenuVisibility((prev) => ({
        ...prev,
        [dropdownId]: isVisible,
      }));
      logEvent(
        `Dropdown "${dropdownId}" ${isVisible ? "opened" : "closed"}`,
        "info"
      );
    },
    [logEvent]
  );

  const handleItemSelect = useCallback(
    (dropdownId: string) => (event: CustomEvent<{ value: string }>) => {
      const value = event.detail.value;
      setSelectedItems((prev) => ({
        ...prev,
        [dropdownId]: value,
      }));
      logEvent(`Dropdown "${dropdownId}" selected: "${value}"`, "success");

      // Close the menu after item selection
      const dropdown = event.target as HTMLModusWcDropdownMenuElement;
      if (dropdown) {
        dropdown.menuVisible = false;
      }
    },
    [logEvent]
  );

  const sizes: Array<{
    value: "xs" | "sm" | "md" | "lg";
    label: string;
    description: string;
  }> = [
    { value: "xs", label: "Extra Small", description: "Compact button" },
    { value: "sm", label: "Small", description: "Small button" },
    { value: "md", label: "Medium", description: "Standard button (default)" },
    { value: "lg", label: "Large", description: "Large button" },
  ];

  const colors: Array<{
    value: "primary" | "secondary" | "tertiary" | "warning" | "danger";
    label: string;
    description: string;
  }> = [
    { value: "primary", label: "Primary", description: "Main action color" },
    {
      value: "secondary",
      label: "Secondary",
      description: "Secondary action color",
    },
    {
      value: "tertiary",
      label: "Tertiary",
      description: "Subtle action color",
    },
    { value: "warning", label: "Warning", description: "Warning action color" },
    {
      value: "danger",
      label: "Danger",
      description: "Destructive action color",
    },
  ];

  const variants: Array<{
    value: "filled" | "outlined" | "borderless";
    label: string;
    description: string;
  }> = [
    { value: "filled", label: "Filled", description: "Solid background" },
    {
      value: "outlined",
      label: "Outlined",
      description: "Border with transparent background",
    },
    {
      value: "borderless",
      label: "Borderless",
      description: "No border, transparent background",
    },
  ];

  const placements: Array<{
    value:
      | "top"
      | "top-start"
      | "top-end"
      | "bottom"
      | "bottom-start"
      | "bottom-end"
      | "left"
      | "left-start"
      | "left-end"
      | "right"
      | "right-start"
      | "right-end";
    label: string;
    description: string;
  }> = [
    {
      value: "bottom-start",
      label: "Bottom Start",
      description: "Below, left-aligned",
    },
    { value: "bottom", label: "Bottom", description: "Below, centered" },
    {
      value: "bottom-end",
      label: "Bottom End",
      description: "Below, right-aligned",
    },
    {
      value: "top-start",
      label: "Top Start",
      description: "Above, left-aligned",
    },
    { value: "top", label: "Top", description: "Above, centered" },
    { value: "top-end", label: "Top End", description: "Above, right-aligned" },
    {
      value: "left-start",
      label: "Left Start",
      description: "Left, top-aligned",
    },
    { value: "left", label: "Left", description: "Left, centered" },
    {
      value: "left-end",
      label: "Left End",
      description: "Left, bottom-aligned",
    },
    {
      value: "right-start",
      label: "Right Start",
      description: "Right, top-aligned",
    },
    { value: "right", label: "Right", description: "Right, centered" },
    {
      value: "right-end",
      label: "Right End",
      description: "Right, bottom-aligned",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Dropdown Menu Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Dropdown Menu component with different
          configurations, placements, and interactive features.
        </p>
      </div>

      {/* Test Simple Dropdown */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Test Simple Dropdown
        </div>
        <p className="text-foreground mb-6">
          Testing basic dropdown functionality.
        </p>
        <div className="flex flex-wrap gap-4">
          <DropdownWithEvents>
            <div slot="button">Test Dropdown</div>
            <div slot="menu">
              <ModusWcMenuItem label="Option 1" value="option1" />
              <ModusWcMenuItem label="Option 2" value="option2" />
            </div>
          </DropdownWithEvents>
        </div>
      </div>

      {/* Basic Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Dropdown Examples
        </div>
        <p className="text-foreground mb-6">
          Simple dropdown menus with different configurations.
        </p>
        <div className="flex flex-wrap gap-4">
          <DropdownWithEvents
            onMenuVisibilityChange={handleMenuVisibilityChange("basic")}
            onSelect={handleItemSelect("basic")}
          >
            <div
              slot="button"
              className="flex items-center justify-between w-full min-w-[120px] px-3 py-2 gap-2"
            >
              <span className="flex-1 text-left">Actions</span>
              <i className="modus-icons text-base flex-shrink-0">expand_more</i>
            </div>
            <div slot="menu">
              <ModusWcMenuItem label="Edit" value="edit" />
              <ModusWcMenuItem label="Delete" value="delete" />
              <ModusWcMenuItem label="Share" value="share" />
            </div>
          </DropdownWithEvents>

          <DropdownWithEvents
            buttonColor="secondary"
            buttonVariant="outlined"
            onMenuVisibilityChange={handleMenuVisibilityChange("options")}
            onSelect={handleItemSelect("options")}
          >
            <div
              slot="button"
              className="flex items-center justify-between w-full min-w-[120px] px-3 py-2 gap-2"
            >
              <span className="flex-1 text-left">Options</span>
              <i className="modus-icons text-base flex-shrink-0">expand_more</i>
            </div>
            <div slot="menu">
              <ModusWcMenuItem
                label="Settings"
                value="settings"
                startIcon="settings"
              />
              <ModusWcMenuItem label="Help" value="help" startIcon="help" />
              <ModusWcMenuItem label="About" value="about" startIcon="info" />
            </div>
          </DropdownWithEvents>

          <DropdownWithEvents
            buttonSize="sm"
            buttonVariant="borderless"
            buttonColor="tertiary"
            onMenuVisibilityChange={handleMenuVisibilityChange("icon")}
            onSelect={handleItemSelect("icon")}
          >
            <div slot="button">
              <i className="modus-icons">more_vertical</i>
            </div>
            <div slot="menu">
              <ModusWcMenuItem label="Copy" value="copy" startIcon="copy" />
              <ModusWcMenuItem label="Cut" value="cut" startIcon="cut" />
              <ModusWcMenuItem
                label="Paste"
                value="paste"
                startIcon="paste"
                disabled
              />
            </div>
          </DropdownWithEvents>

          <DropdownWithEvents
            disabled
            onMenuVisibilityChange={handleMenuVisibilityChange("disabled")}
            onSelect={handleItemSelect("disabled")}
          >
            <div
              slot="button"
              className="flex items-center justify-between w-full min-w-[120px] px-3 py-2 gap-2"
            >
              <span className="flex-1 text-left">Disabled</span>
              <i className="modus-icons text-base flex-shrink-0">expand_more</i>
            </div>
            <div slot="menu">
              <ModusWcMenuItem label="Option 1" value="option1" />
              <ModusWcMenuItem label="Option 2" value="option2" />
            </div>
          </DropdownWithEvents>
        </div>
      </div>

      {/* Size Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Size Variants
        </div>
        <p className="text-foreground mb-6">
          Different dropdown button sizes for various contexts.
        </p>
        <div className="flex flex-wrap gap-4">
          {sizes.map((size) => (
            <DropdownWithEvents
              key={size.value}
              buttonSize={size.value}
              onMenuVisibilityChange={handleMenuVisibilityChange(
                `size-${size.value}`
              )}
              onSelect={handleItemSelect(`size-${size.value}`)}
            >
              <div
                slot="button"
                className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 gap-2"
              >
                <span className="flex-1 text-left">{size.label} Dropdown</span>
                <i className="modus-icons text-base flex-shrink-0">
                  expand_more
                </i>
              </div>
              <div slot="menu">
                <ModusWcMenuItem label="Option 1" value="option1" />
                <ModusWcMenuItem label="Option 2" value="option2" />
                <ModusWcMenuItem label="Option 3" value="option3" />
              </div>
            </DropdownWithEvents>
          ))}
        </div>
      </div>

      {/* Color Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Color Variants
        </div>
        <p className="text-foreground mb-6">
          Different dropdown button colors for various actions.
        </p>
        <div className="flex flex-wrap gap-4">
          {colors.map((color) => (
            <DropdownWithEvents
              key={color.value}
              buttonColor={color.value}
              onMenuVisibilityChange={handleMenuVisibilityChange(
                `color-${color.value}`
              )}
              onSelect={handleItemSelect(`color-${color.value}`)}
            >
              <div
                slot="button"
                className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 gap-2"
              >
                <span className="flex-1 text-left">{color.label} Action</span>
                <i className="modus-icons text-base flex-shrink-0">
                  expand_more
                </i>
              </div>
              <div slot="menu">
                <ModusWcMenuItem label="Primary Action" value="primary" />
                <ModusWcMenuItem label="Secondary Action" value="secondary" />
                <ModusWcMenuItem label="Tertiary Action" value="tertiary" />
              </div>
            </DropdownWithEvents>
          ))}
        </div>
      </div>

      {/* Variant Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Variant Examples
        </div>
        <p className="text-foreground mb-6">
          Different button variants for various visual styles.
        </p>
        <div className="flex flex-wrap gap-4">
          {variants.map((variant) => (
            <DropdownWithEvents
              key={variant.value}
              buttonVariant={variant.value}
              onMenuVisibilityChange={handleMenuVisibilityChange(
                `variant-${variant.value}`
              )}
              onSelect={handleItemSelect(`variant-${variant.value}`)}
            >
              <div
                slot="button"
                className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 gap-2"
              >
                <span className="flex-1 text-left">{variant.label} Button</span>
                <i className="modus-icons text-base flex-shrink-0">
                  expand_more
                </i>
              </div>
              <div slot="menu">
                <ModusWcMenuItem label="Menu Item 1" value="item1" />
                <ModusWcMenuItem label="Menu Item 2" value="item2" />
                <ModusWcMenuItem label="Menu Item 3" value="item3" />
              </div>
            </DropdownWithEvents>
          ))}
        </div>
      </div>

      {/* Placement Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Placement Examples
        </div>
        <p className="text-foreground mb-6">
          Different menu placement options relative to the button.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {placements.slice(0, 8).map((placement) => (
            <DropdownWithEvents
              key={placement.value}
              menuPlacement={placement.value}
              onMenuVisibilityChange={handleMenuVisibilityChange(
                `placement-${placement.value}`
              )}
              onSelect={handleItemSelect(`placement-${placement.value}`)}
            >
              <div
                slot="button"
                className="flex items-center justify-between w-full min-w-[120px] px-3 py-2 gap-2"
              >
                <span className="flex-1 text-left">{placement.label}</span>
                <i className="modus-icons text-base flex-shrink-0">
                  expand_more
                </i>
              </div>
              <div slot="menu">
                <ModusWcMenuItem label="Option 1" value="option1" />
                <ModusWcMenuItem label="Option 2" value="option2" />
                <ModusWcMenuItem label="Option 3" value="option3" />
              </div>
            </DropdownWithEvents>
          ))}
        </div>
      </div>

      {/* Menu Size Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Menu Size Examples
        </div>
        <p className="text-foreground mb-6">
          Different menu sizes for various content densities.
        </p>
        <div className="flex flex-wrap gap-4">
          <DropdownWithEvents
            menuSize="sm"
            onMenuVisibilityChange={handleMenuVisibilityChange("menu-sm")}
            onSelect={handleItemSelect("menu-sm")}
          >
            <div
              slot="button"
              className="flex items-center justify-between w-full min-w-[120px] px-3 py-2 gap-2"
            >
              <span className="flex-1 text-left">Small Menu</span>
              <i className="modus-icons text-base flex-shrink-0">expand_more</i>
            </div>
            <div slot="menu">
              <ModusWcMenuItem label="Compact Item 1" value="item1" />
              <ModusWcMenuItem label="Compact Item 2" value="item2" />
              <ModusWcMenuItem label="Compact Item 3" value="item3" />
            </div>
          </DropdownWithEvents>

          <DropdownWithEvents
            menuSize="md"
            onMenuVisibilityChange={handleMenuVisibilityChange("menu-md")}
            onSelect={handleItemSelect("menu-md")}
          >
            <div
              slot="button"
              className="flex items-center justify-between w-full min-w-[120px] px-3 py-2 gap-2"
            >
              <span className="flex-1 text-left">Medium Menu</span>
              <i className="modus-icons text-base flex-shrink-0">expand_more</i>
            </div>
            <div slot="menu">
              <ModusWcMenuItem label="Standard Item 1" value="item1" />
              <ModusWcMenuItem label="Standard Item 2" value="item2" />
              <ModusWcMenuItem label="Standard Item 3" value="item3" />
            </div>
          </DropdownWithEvents>

          <DropdownWithEvents
            menuSize="lg"
            onMenuVisibilityChange={handleMenuVisibilityChange("menu-lg")}
            onSelect={handleItemSelect("menu-lg")}
          >
            <div
              slot="button"
              className="flex items-center justify-between w-full min-w-[120px] px-3 py-2 gap-2"
            >
              <span className="flex-1 text-left">Large Menu</span>
              <i className="modus-icons text-base flex-shrink-0">expand_more</i>
            </div>
            <div slot="menu">
              <ModusWcMenuItem label="Large Item 1" value="item1" />
              <ModusWcMenuItem label="Large Item 2" value="item2" />
              <ModusWcMenuItem label="Large Item 3" value="item3" />
            </div>
          </DropdownWithEvents>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Real-world Examples
        </div>
        <p className="text-foreground mb-6">
          Common dropdown patterns used in applications.
        </p>
        <div className="space-y-8">
          {/* User Profile Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              User Profile Menu
            </h4>
            <DropdownWithEvents
              buttonSize="lg"
              menuSize="lg"
              menuBordered={false}
              onMenuVisibilityChange={handleMenuVisibilityChange("profile")}
              onSelect={handleItemSelect("profile")}
            >
              <div
                slot="button"
                className="flex items-center justify-between w-full min-w-[160px] px-3 py-2 gap-2"
              >
                <span className="flex-1 text-left">User Profile</span>
                <i className="modus-icons text-base flex-shrink-0">
                  expand_more
                </i>
              </div>
              <div slot="menu">
                <ModusWcMenuItem
                  label="Account Settings"
                  subLabel="Manage your profile"
                  startIcon="person"
                  value="account"
                />
                <ModusWcMenuItem
                  label="Preferences"
                  subLabel="App configuration"
                  startIcon="settings"
                  value="prefs"
                />
                <ModusWcMenuItem
                  label="Sign Out"
                  startIcon="logout"
                  value="logout"
                />
              </div>
            </DropdownWithEvents>
          </div>

          {/* Filter Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Filter Menu
            </h4>
            <DropdownWithEvents
              buttonSize="sm"
              buttonVariant="borderless"
              buttonColor="tertiary"
              onMenuVisibilityChange={handleMenuVisibilityChange("filter")}
              onSelect={handleItemSelect("filter")}
            >
              <div slot="button">
                <i className="modus-icons">filter_list</i>
              </div>
              <div slot="menu">
                <ModusWcMenuItem
                  label="All Items"
                  value="all"
                  selected={selectedItems.filter === "all"}
                />
                <ModusWcMenuItem
                  label="Active Only"
                  value="active"
                  selected={selectedItems.filter === "active"}
                />
                <ModusWcMenuItem
                  label="Archived"
                  value="archived"
                  selected={selectedItems.filter === "archived"}
                />
                <ModusWcMenuItem
                  label="Draft"
                  value="draft"
                  selected={selectedItems.filter === "draft"}
                />
              </div>
            </DropdownWithEvents>
          </div>

          {/* Context Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Context Menu
            </h4>
            <DropdownWithEvents
              buttonVariant="borderless"
              buttonColor="tertiary"
              menuPlacement="right-start"
              onMenuVisibilityChange={handleMenuVisibilityChange("context")}
              onSelect={handleItemSelect("context")}
            >
              <div slot="button">
                <i className="modus-icons">more_horizontal</i>
              </div>
              <div slot="menu">
                <ModusWcMenuItem label="Copy" value="copy" startIcon="copy" />
                <ModusWcMenuItem label="Cut" value="cut" startIcon="cut" />
                <ModusWcMenuItem
                  label="Paste"
                  value="paste"
                  startIcon="paste"
                  disabled
                />
                <ModusWcMenuItem
                  label="Delete"
                  value="delete"
                  startIcon="delete"
                />
              </div>
            </DropdownWithEvents>
          </div>

          {/* Action Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Action Menu
            </h4>
            <DropdownWithEvents
              buttonColor="primary"
              buttonVariant="outlined"
              onMenuVisibilityChange={handleMenuVisibilityChange("actions")}
              onSelect={handleItemSelect("actions")}
            >
              <div
                slot="button"
                className="flex items-center justify-between w-full min-w-[120px] px-3 py-2 gap-2"
              >
                <span className="flex-1 text-left">Actions</span>
                <i className="modus-icons text-base flex-shrink-0">
                  expand_more
                </i>
              </div>
              <div slot="menu">
                <ModusWcMenuItem
                  label="Create New"
                  value="create"
                  startIcon="add"
                />
                <ModusWcMenuItem
                  label="Import"
                  value="import"
                  startIcon="upload"
                />
                <ModusWcMenuItem
                  label="Export"
                  value="export"
                  startIcon="download"
                />
                <ModusWcMenuItem
                  label="Settings"
                  value="settings"
                  startIcon="settings"
                />
              </div>
            </DropdownWithEvents>
          </div>
        </div>
      </div>

      {/* Menu Visibility Control */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Menu Visibility Control
        </div>
        <p className="text-foreground mb-6">
          Control dropdown menu visibility programmatically.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <DropdownWithEvents
            buttonColor="primary"
            onMenuVisibilityChange={handleMenuVisibilityChange("controlled")}
            onSelect={handleItemSelect("controlled")}
          >
            <div
              slot="button"
              className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 gap-2"
            >
              <span className="flex-1 text-left">Controlled Menu</span>
              <i className="modus-icons text-base flex-shrink-0">expand_more</i>
            </div>
            <div slot="menu">
              <ModusWcMenuItem label="Option 1" value="option1" />
              <ModusWcMenuItem label="Option 2" value="option2" />
              <ModusWcMenuItem label="Option 3" value="option3" />
            </div>
          </DropdownWithEvents>

          <ModusWcButton color="primary" onButtonClick={clearLogs}>
            <i className="modus-icons mr-2">delete</i>
            Clear Logs
          </ModusWcButton>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Note:</strong> This dropdown menu now closes automatically
            after item selection. The menu closes by setting{" "}
            <code>dropdown.menuVisible = false</code>
            in the event handler when an item is selected.
          </p>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Controls
        </div>
        <p className="text-foreground mb-6">
          Control dropdown states and see selection results.
        </p>
        <div className="flex gap-4 mb-6">
          <ModusWcButton color="primary" onButtonClick={clearLogs}>
            <i className="modus-icons mr-2">delete</i>
            Clear Logs
          </ModusWcButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Selected Items
            </h4>
            <div className="space-y-2 text-sm">
              {Object.entries(selectedItems).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-foreground capitalize">{key}:</span>
                  <span className="font-mono text-muted-foreground">
                    {value || "none"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Menu Visibility
            </h4>
            <div className="space-y-2 text-sm">
              {Object.entries(menuVisibility).map(([key, isVisible]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-foreground capitalize">{key}:</span>
                  <span
                    className={`font-mono ${
                      isVisible ? "text-success" : "text-destructive"
                    }`}
                  >
                    {isVisible ? "open" : "closed"}
                  </span>
                </div>
              ))}
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
              Interact with the dropdowns to see events logged here...
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
              {`<DropdownWithEvents
  button="Actions"
  onMenuVisibilityChange={handleVisibility}
  onSelect={handleSelect}
>
  <div slot="menu">
    <ModusWcMenuItem label="Edit" value="edit" />
    <ModusWcMenuItem label="Delete" value="delete" />
  </div>
</DropdownWithEvents>`}
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<DropdownWithEvents
  buttonColor="secondary"
  buttonSize="lg"
  buttonVariant="outlined"
  menuPlacement="bottom-end"
  menuSize="lg"
  button="User Profile"
  onMenuVisibilityChange={handleVisibility}
  onSelect={handleSelect}
>
  <div slot="menu">
    <ModusWcMenuItem
      label="Account Settings"
      subLabel="Manage profile"
      startIcon="person"
      value="account"
    />
  </div>
</DropdownWithEvents>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
