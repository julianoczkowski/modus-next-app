"use client";

import ModusIcon from "../components/ModusIcon";
import ModusButton from "../components/ModusButton";

export default function IconDemo() {
  // Icon categories for organized display
  const iconCategories = {
    navigation: [
      "arrow_left",
      "arrow_right",
      "arrow_up",
      "arrow_down",
      "chevron_left",
      "chevron_right",
      "home",
      "dashboard",
      "menu",
      "close",
    ],
    actions: [
      "add",
      "edit_combination",
      "delete",
      "save_disk",
      "download",
      "upload",
      "search",
      "filter",
      "settings",
      "refresh",
    ],
    status: [
      "check",
      "check_circle",
      "close",
      "cancel_circle",
      "warning",
      "info",
      "alert",
      "help",
      "exclamation_mark",
    ],
    content: [
      "file",
      "folder_open",
      "folder_closed",
      "image",
      "video",
      "document",
      "calendar",
      "email",
      "camera",
    ],
    user: [
      "person",
      "people_group",
      "user_account",
      "sign_in",
      "sign_out",
      "lock",
      "lock_open",
      "manage_accounts",
    ],
  };

  const sizes: Array<"xs" | "sm" | "md" | "lg"> = ["xs", "sm", "md", "lg"];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Icon Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80">
          Comprehensive showcase of the ModusIcon component with various sizes,
          categories, and usage patterns
        </div>
      </div>

      {/* Basic Usage */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Basic Usage
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusIcon name="settings" />
          <ModusIcon name="home" />
          <ModusIcon name="person" />
          <ModusIcon name="check_circle" />
          <ModusIcon name="warning" />
        </div>
        <div className="text-sm text-foreground opacity-70">
          Default decorative icons (md size)
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
        <div className="flex items-center gap-6 mb-4">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <ModusIcon name="settings" size={size} />
              <div className="text-sm text-foreground opacity-70">{size}</div>
            </div>
          ))}
        </div>
        <div className="text-sm text-foreground opacity-70">
          Icons in different sizes: xs, sm, md, lg
        </div>
      </div>

      {/* Accessibility Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Accessibility Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Decorative Icons
            </div>
            <div className="flex gap-4 mb-4">
              <ModusIcon name="star" decorative={true} />
              <ModusIcon name="heart" decorative={true} />
              <ModusIcon name="bookmark" decorative={true} />
            </div>
            <div className="text-sm text-foreground opacity-70">
              Hidden from screen readers (decorative=true)
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Meaningful Icons
            </div>
            <div className="flex gap-4 mb-4">
              <ModusIcon
                name="warning"
                decorative={false}
                ariaLabel="Warning message"
              />
              <ModusIcon
                name="info"
                decorative={false}
                ariaLabel="Information"
              />
              <ModusIcon
                name="help"
                decorative={false}
                ariaLabel="Help and support"
              />
            </div>
            <div className="text-sm text-foreground opacity-70">
              Accessible to screen readers (decorative=false with aria-label)
            </div>
          </div>
        </div>
      </div>

      {/* Icon Categories */}
      {Object.entries(iconCategories).map(([category, icons]) => (
        <div
          key={category}
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6 capitalize">
            {category} Icons
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4 mb-4">
            {icons.map((iconName) => (
              <div
                key={iconName}
                className="flex flex-col items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
              >
                <ModusIcon name={iconName} size="lg" />
                <div className="text-xs text-foreground opacity-70 text-center break-all">
                  {iconName}
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-foreground opacity-70">
            {icons.length} {category} icons available
          </div>
        </div>
      ))}

      {/* Usage in Buttons */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Icons in Buttons
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <ModusButton color="primary">
            <i className="modus-icons mr-2">save_disk</i>
            Save Document
          </ModusButton>
          <ModusButton color="secondary">
            <i className="modus-icons mr-2">download</i>
            Download
          </ModusButton>
          <ModusButton color="danger">
            <i className="modus-icons mr-2">delete</i>
            Delete
          </ModusButton>
          <ModusButton variant="outlined">
            <i className="modus-icons mr-2">edit_combination</i>
            Edit
          </ModusButton>
        </div>
        <div className="flex gap-4 mb-4">
          <ModusButton shape="circle" color="primary" ariaLabel="Settings">
            <i className="modus-icons">settings</i>
          </ModusButton>
          <ModusButton shape="circle" color="secondary" ariaLabel="Search">
            <i className="modus-icons">search</i>
          </ModusButton>
          <ModusButton shape="circle" color="danger" ariaLabel="Delete">
            <i className="modus-icons">delete</i>
          </ModusButton>
          <ModusButton shape="circle" variant="outlined" ariaLabel="Add">
            <i className="modus-icons">add</i>
          </ModusButton>
        </div>
        <div className="text-sm text-foreground opacity-70">
          Icons integrated with ModusButton component
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
        <div className="flex gap-4 mb-4">
          <ModusIcon
            name="check_circle"
            color="var(--modus-wc-color-success)"
            size="lg"
          />
          <ModusIcon
            name="warning"
            color="var(--modus-wc-color-warning)"
            size="lg"
          />
          <ModusIcon
            name="cancel_circle"
            color="var(--modus-wc-color-error)"
            size="lg"
          />
          <ModusIcon name="info" color="var(--modus-wc-color-info)" size="lg" />
        </div>
        <div className="text-sm text-foreground opacity-70">
          Icons with custom colors using Modus design tokens
        </div>
      </div>

      {/* Interactive Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Interactive Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Status Indicators
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ModusIcon
                  name="check_circle"
                  color="var(--modus-wc-color-success)"
                />
                <div className="text-foreground">
                  Task completed successfully
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ModusIcon
                  name="warning"
                  color="var(--modus-wc-color-warning)"
                />
                <div className="text-foreground">
                  Warning: Please review settings
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ModusIcon
                  name="cancel_circle"
                  color="var(--modus-wc-color-error)"
                />
                <div className="text-foreground">Error: Operation failed</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Navigation Items
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors cursor-pointer">
                <ModusIcon name="home" />
                <div className="text-foreground">Home</div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors cursor-pointer">
                <ModusIcon name="dashboard" />
                <div className="text-foreground">Dashboard</div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors cursor-pointer">
                <ModusIcon name="settings" />
                <div className="text-foreground">Settings</div>
              </div>
            </div>
          </div>
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
              Basic Usage
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusIcon name="settings" />`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              With Size and Accessibility
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusIcon 
  name="warning" 
  size="lg" 
  decorative={false} 
  ariaLabel="Warning message" 
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              Custom Color
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusIcon 
  name="check_circle" 
  color="var(--modus-wc-color-success)" 
  size="lg" 
/>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
