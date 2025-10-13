"use client";

import { useState, useCallback } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusButton from "../components/ModusButton";

interface EventLog {
  timestamp: string;
  message: string;
}

interface BuilderConfig {
  variant: "filled" | "outlined" | "borderless";
  color: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  size: "xs" | "sm" | "md" | "lg";
  shape: "rectangle" | "square" | "circle";
  disabled: boolean;
  fullWidth: boolean;
}

export default function ButtonDemoPage() {
  // State for interactive features
  const [isPressed, setIsPressed] = useState(false);
  const [clickCounter, setClickCounter] = useState(0);
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [formData, setFormData] = useState({ name: "" });

  const [builderConfig, setBuilderConfig] = useState<BuilderConfig>({
    variant: "filled",
    color: "primary",
    size: "md",
    shape: "rectangle",
    disabled: false,
    fullWidth: false,
  });

  // Event logging function
  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLogs((prev) => {
      const newLogs = [{ timestamp, message }, ...prev];
      return newLogs.slice(0, 10); // Keep only last 10 logs
    });
  }, []);

  // Event handlers
  const togglePressed = () => {
    setIsPressed(!isPressed);
    logEvent(`Button toggled: ${!isPressed ? "pressed" : "unpressed"}`);
  };

  const handleSave = () => logEvent("Save button clicked");
  const handleDownload = () => logEvent("Download button clicked");
  const handleUpload = () => logEvent("Upload button clicked");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logEvent(`Form submitted with name: "${formData.name}"`);
  };

  const resetForm = () => {
    setFormData({ name: "" });
    logEvent("Form reset");
  };

  const handleBuilderClick = () => {
    logEvent("Builder preview button clicked");
  };

  const showAlert = () => {
    alert("Hello from Modus Button!");
    logEvent("Alert shown");
  };

  const incrementCounter = () => {
    setClickCounter((prev) => prev + 1);
    logEvent(`Counter incremented to ${clickCounter + 1}`);
  };

  const clearLogs = () => {
    setEventLogs([]);
  };

  // Generated code for builder
  const generatedCode = (() => {
    const attrs = [];

    if (builderConfig.variant !== "filled") {
      attrs.push(`variant="${builderConfig.variant}"`);
    }
    if (builderConfig.color !== "primary") {
      attrs.push(`color="${builderConfig.color}"`);
    }
    if (builderConfig.size !== "md") {
      attrs.push(`size="${builderConfig.size}"`);
    }
    if (builderConfig.shape !== "rectangle") {
      attrs.push(`shape="${builderConfig.shape}"`);
    }
    if (builderConfig.disabled) {
      attrs.push("disabled");
    }
    if (builderConfig.fullWidth) {
      attrs.push("full-width");
    }

    const attrString = attrs.length > 0 ? " " + attrs.join(" ") : "";
    const content =
      builderConfig.shape === "rectangle"
        ? '\n  <i className="modus-icons mr-2">star</i>\n  Custom Button\n'
        : '\n  <i className="modus-icons">star</i>\n';

    return `<ModusWcButton${attrString}>${content}</ModusWcButton>`;
  })();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Button Demo
        </div>
        <div className="text-lg leading-relaxed text-foreground text-center">
          Explore all the variants, colors, sizes, and features of the Modus
          Button component. This page demonstrates both direct web component
          usage and React integration patterns. If you can see this page, you
          have successfully installed the boilerplate and are ready to build
          your application.
        </div>
      </div>

      {/* Improved Approach - Single Configurable Component */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Improved Approach: Single Configurable Component
        </div>
        <div className="text-base mb-6 text-foreground">
          Instead of separate components for each button type, use one flexible
          component with props:
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusButton
            icon="apps"
            iconPosition="left"
            onButtonClick={() => logEvent("Improved button clicked!")}
          >
            Test Modus Button
          </ModusButton>
          <ModusButton
            icon="download"
            iconPosition="left"
            color="secondary"
            variant="outlined"
            onButtonClick={() => logEvent("Download clicked!")}
          >
            Download
          </ModusButton>
          <ModusButton
            icon="warning"
            iconPosition="left"
            color="warning"
            onButtonClick={() => logEvent("Warning clicked!")}
          >
            Warning
          </ModusButton>
          <ModusButton
            icon="delete"
            iconPosition="left"
            color="danger"
            variant="borderless"
            onButtonClick={() => logEvent("Delete clicked!")}
          >
            Delete
          </ModusButton>
        </div>
      </div>

      {/* Button Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Button Variants
        </div>
        <div className="grid gap-8">
          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Filled (Default)
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
              <ModusWcButton color="primary">Primary</ModusWcButton>
              <ModusWcButton color="secondary">Secondary</ModusWcButton>
              <ModusWcButton color="tertiary">Tertiary</ModusWcButton>
              <ModusWcButton color="warning">Warning</ModusWcButton>
              <ModusWcButton color="danger">Danger</ModusWcButton>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Outlined
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
              <ModusWcButton variant="outlined" color="primary">
                Primary
              </ModusWcButton>
              <ModusWcButton variant="outlined" color="secondary">
                Secondary
              </ModusWcButton>
              <ModusWcButton variant="outlined" color="tertiary">
                Tertiary
              </ModusWcButton>
              <ModusWcButton variant="outlined" color="warning">
                Warning
              </ModusWcButton>
              <ModusWcButton variant="outlined" color="danger">
                Danger
              </ModusWcButton>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Borderless
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
              <ModusWcButton variant="borderless" color="primary">
                Primary
              </ModusWcButton>
              <ModusWcButton variant="borderless" color="secondary">
                Secondary
              </ModusWcButton>
              <ModusWcButton variant="borderless" color="tertiary">
                Tertiary
              </ModusWcButton>
              <ModusWcButton variant="borderless" color="warning">
                Warning
              </ModusWcButton>
              <ModusWcButton variant="borderless" color="danger">
                Danger
              </ModusWcButton>
            </div>
          </div>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Button Sizes
        </div>
        <div className="flex gap-4 flex-wrap mb-4 items-end">
          <ModusWcButton size="xs" color="primary">
            Extra Small
          </ModusWcButton>
          <ModusWcButton size="sm" color="primary">
            Small
          </ModusWcButton>
          <ModusWcButton size="md" color="primary">
            Medium (Default)
          </ModusWcButton>
          <ModusWcButton size="lg" color="primary">
            Large
          </ModusWcButton>
        </div>
      </div>

      {/* Button Shapes */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Button Shapes
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusWcButton shape="rectangle" color="primary">
            Rectangle (Default)
          </ModusWcButton>
          <ModusWcButton
            shape="square"
            color="primary"
            aria-label="Square button"
          >
            <i className="modus-icons">add</i>
          </ModusWcButton>
          <ModusWcButton
            shape="circle"
            color="primary"
            aria-label="Circle button"
          >
            <i className="modus-icons">close</i>
          </ModusWcButton>
        </div>
      </div>

      {/* Buttons with Icons */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Buttons with Icons
        </div>
        <div className="grid gap-8">
          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Icon + Text
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
              <ModusWcButton color="primary" onButtonClick={handleSave}>
                <i className="modus-icons mr-2">save_disk</i>
                Save
              </ModusWcButton>
              <ModusWcButton color="secondary" onButtonClick={handleDownload}>
                <i className="modus-icons mr-2">download</i>
                Download
              </ModusWcButton>
              <ModusWcButton color="tertiary" onButtonClick={handleUpload}>
                <i className="modus-icons mr-2">upload</i>
                Upload
              </ModusWcButton>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Icon Only
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
              <ModusWcButton shape="circle" color="primary" aria-label="Edit">
                <i className="modus-icons">edit_combination</i>
              </ModusWcButton>
              <ModusWcButton shape="circle" color="danger" aria-label="Delete">
                <i className="modus-icons">delete</i>
              </ModusWcButton>
              <ModusWcButton
                shape="circle"
                color="secondary"
                aria-label="Settings"
              >
                <i className="modus-icons">settings</i>
              </ModusWcButton>
              <ModusWcButton
                shape="circle"
                color="tertiary"
                aria-label="Search"
              >
                <i className="modus-icons">search</i>
              </ModusWcButton>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Text + Icon
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
              <ModusWcButton color="primary">
                Next
                <i className="modus-icons ml-2">arrow_right</i>
              </ModusWcButton>
              <ModusWcButton color="secondary">
                Previous
                <i className="modus-icons ml-2">arrow_left</i>
              </ModusWcButton>
              <ModusWcButton color="tertiary">
                External Link
                <i className="modus-icons ml-2">launch</i>
              </ModusWcButton>
            </div>
          </div>
        </div>
      </div>

      {/* Button States */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Button States
        </div>
        <div className="grid gap-8">
          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Disabled State
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
              <ModusWcButton color="primary" disabled>
                Disabled Primary
              </ModusWcButton>
              <ModusWcButton variant="outlined" color="secondary" disabled>
                Disabled Outlined
              </ModusWcButton>
              <ModusWcButton variant="borderless" color="tertiary" disabled>
                Disabled Borderless
              </ModusWcButton>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Pressed State (Toggle)
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
              <ModusWcButton
                color="primary"
                pressed={isPressed}
                onButtonClick={togglePressed}
                aria-label="Toggle button"
              >
                <i className="modus-icons mr-2">
                  {isPressed ? "visibility_on" : "visibility_off"}
                </i>
                {isPressed ? "Visible" : "Hidden"}
              </ModusWcButton>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Full Width
            </div>
            <div className="flex flex-col gap-4">
              <ModusWcButton variant="filled" color="primary" fullWidth>
                Full Width Primary
              </ModusWcButton>
              <ModusWcButton variant="outlined" color="primary" fullWidth>
                Full Width Outlined
              </ModusWcButton>
            </div>
          </div>
        </div>
      </div>

      {/* Form Integration */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Form Integration
        </div>
        <form onSubmit={handleFormSubmit} className="max-w-lg">
          <div className="mb-4">
            <label htmlFor="demo-input">Sample Input:</label>
            <input
              id="demo-input"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-border rounded bg-background text-foreground text-base"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <ModusWcButton type="submit" color="primary">
              <i className="modus-icons mr-2">check</i>
              Submit
            </ModusWcButton>
            <ModusWcButton
              type="button"
              variant="outlined"
              onButtonClick={resetForm}
            >
              <i className="modus-icons mr-2">refresh</i>
              Reset
            </ModusWcButton>
            <ModusWcButton type="button" variant="borderless" color="secondary">
              <i className="modus-icons mr-2">cancel_circle</i>
              Cancel
            </ModusWcButton>
          </div>
        </form>
      </div>

      {/* Interactive Demo */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Button Builder
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label>Variant:</label>
              <select
                value={builderConfig.variant}
                onChange={(e) =>
                  setBuilderConfig((prev) => ({
                    ...prev,
                    variant: e.target.value as BuilderConfig["variant"],
                  }))
                }
                className="p-2 border border-border rounded bg-background text-foreground"
              >
                <option value="filled">Filled</option>
                <option value="outlined">Outlined</option>
                <option value="borderless">Borderless</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label>Color:</label>
              <select
                value={builderConfig.color}
                onChange={(e) =>
                  setBuilderConfig((prev) => ({
                    ...prev,
                    color: e.target.value as BuilderConfig["color"],
                  }))
                }
                className="p-2 border border-border rounded bg-background text-foreground"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="tertiary">Tertiary</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label>Size:</label>
              <select
                value={builderConfig.size}
                onChange={(e) =>
                  setBuilderConfig((prev) => ({
                    ...prev,
                    size: e.target.value as BuilderConfig["size"],
                  }))
                }
                className="p-2 border border-border rounded bg-background text-foreground"
              >
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label>Shape:</label>
              <select
                value={builderConfig.shape}
                onChange={(e) =>
                  setBuilderConfig((prev) => ({
                    ...prev,
                    shape: e.target.value as BuilderConfig["shape"],
                  }))
                }
                className="p-2 border border-border rounded bg-background text-foreground"
              >
                <option value="rectangle">Rectangle</option>
                <option value="square">Square</option>
                <option value="circle">Circle</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="checkbox"
                  checked={builderConfig.disabled}
                  onChange={(e) =>
                    setBuilderConfig((prev) => ({
                      ...prev,
                      disabled: e.target.checked,
                    }))
                  }
                  className="m-0"
                />
                Disabled
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="checkbox"
                  checked={builderConfig.fullWidth}
                  onChange={(e) =>
                    setBuilderConfig((prev) => ({
                      ...prev,
                      fullWidth: e.target.checked,
                    }))
                  }
                  className="m-0"
                />
                Full Width
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-lg font-medium mb-2 text-foreground">
              Preview:
            </div>
            <div className="p-8 border border-border rounded bg-background text-center">
              <ModusWcButton
                variant={builderConfig.variant}
                color={builderConfig.color}
                size={builderConfig.size}
                shape={builderConfig.shape}
                disabled={builderConfig.disabled}
                fullWidth={builderConfig.fullWidth}
                onButtonClick={handleBuilderClick}
              >
                {builderConfig.shape !== "rectangle" ? (
                  <i className="modus-icons">star</i>
                ) : (
                  <>
                    <i className="modus-icons mr-2">star</i>
                    Custom Button
                  </>
                )}
              </ModusWcButton>
            </div>

            <div className="mt-4">
              <div className="text-base font-medium mb-2 text-foreground">
                Generated Code:
              </div>
              <div className="bg-background border border-border rounded p-4 overflow-x-auto font-mono text-sm text-foreground m-0">
                <code>{generatedCode}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Handling Demo */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Event Handling
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 items-start">
            <ModusWcButton
              color="primary"
              onButtonClick={() => logEvent("Primary clicked")}
            >
              Click Me
            </ModusWcButton>
            <ModusWcButton color="secondary" onButtonClick={showAlert}>
              Show Alert
            </ModusWcButton>
            <ModusWcButton color="tertiary" onButtonClick={incrementCounter}>
              Counter: {clickCounter}
            </ModusWcButton>
          </div>

          <div>
            <div className="text-lg font-medium mb-2 text-foreground">
              Event Log:
            </div>
            <div className="max-h-48 overflow-y-auto border border-border rounded p-4 bg-background mb-4">
              {eventLogs.map((log, index) => (
                <div key={index} className="flex gap-4 mb-2 font-mono text-sm">
                  <div className="text-foreground min-w-20">
                    {log.timestamp}
                  </div>
                  <div className="text-foreground">{log.message}</div>
                </div>
              ))}
              {eventLogs.length === 0 && (
                <div className="text-foreground italic text-center p-8">
                  Click buttons above to see events logged here...
                </div>
              )}
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
        </div>
      </div>
    </div>
  );
}
