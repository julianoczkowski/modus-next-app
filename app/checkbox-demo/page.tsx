"use client";

import { useState, useCallback } from "react";
import ModusCheckbox from "../components/ModusCheckbox";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface EventLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function CheckboxDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>(
    {
      basic: false,
      disabled: true,
      indeterminate: false,
      required: false,
      newsletter: false,
      terms: false,
      notifications: false,
      marketing: false,
      sm: false,
      md: false,
      lg: false,
    }
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

  const handleCheckboxChange = useCallback(
    (checkboxId: string) => (event: CustomEvent<InputEvent>) => {
      const target = event.target as HTMLModusWcCheckboxElement;
      const isChecked = target.value;
      setCheckboxStates((prev) => ({
        ...prev,
        [checkboxId]: isChecked,
      }));
      logEvent(
        `Checkbox "${checkboxId}" changed to ${
          isChecked ? "checked" : "unchecked"
        }`,
        "info"
      );
    },
    [logEvent]
  );

  const handleCheckboxFocus = useCallback(
    (checkboxId: string) => () => {
      logEvent(`Checkbox "${checkboxId}" focused`, "info");
    },
    [logEvent]
  );

  const handleCheckboxBlur = useCallback(
    (checkboxId: string) => () => {
      logEvent(`Checkbox "${checkboxId}" blurred`, "info");
    },
    [logEvent]
  );

  const sizes: Array<{
    value: "sm" | "md" | "lg";
    label: string;
    description: string;
  }> = [
    { value: "sm", label: "Small", description: "16px checkbox" },
    { value: "md", label: "Medium", description: "20px checkbox (default)" },
    { value: "lg", label: "Large", description: "24px checkbox" },
  ];

  const resetAllCheckboxes = () => {
    setCheckboxStates({
      basic: false,
      disabled: true,
      indeterminate: false,
      required: false,
      newsletter: false,
      terms: false,
      notifications: false,
      marketing: false,
      sm: false,
      md: false,
      lg: false,
    });
    logEvent("All checkboxes reset", "info");
  };

  const selectAllCheckboxes = () => {
    setCheckboxStates((prev) => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach((key) => {
        if (key !== "disabled") {
          newStates[key] = true;
        }
      });
      return newStates;
    });
    logEvent("All checkboxes selected", "success");
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Checkbox Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Checkbox component with different states, sizes, and
          form integration patterns.
        </p>
      </div>

      {/* Basic Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Checkbox Examples
        </div>
        <p className="text-foreground mb-6">
          Simple checkboxes with different configurations.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ModusCheckbox
              value={checkboxStates.basic}
              label="Basic Checkbox"
              onInputChange={handleCheckboxChange("basic")}
              onInputFocus={handleCheckboxFocus("basic")}
              onInputBlur={handleCheckboxBlur("basic")}
            />
          </div>
          <div className="flex items-center gap-4">
            <ModusCheckbox
              value={checkboxStates.disabled}
              disabled
              label="Disabled Checkbox (Checked)"
            />
          </div>
          <div className="flex items-center gap-4">
            <ModusCheckbox disabled label="Disabled Checkbox (Unchecked)" />
          </div>
          <div className="flex items-center gap-4">
            <ModusCheckbox
              value={checkboxStates.indeterminate}
              indeterminate={checkboxStates.indeterminate}
              label="Indeterminate Checkbox"
              onInputChange={handleCheckboxChange("indeterminate")}
              onInputFocus={handleCheckboxFocus("indeterminate")}
              onInputBlur={handleCheckboxBlur("indeterminate")}
            />
          </div>
          <div className="flex items-center gap-4">
            <ModusCheckbox
              value={checkboxStates.required}
              required
              label="Required Checkbox"
              onInputChange={handleCheckboxChange("required")}
              onInputFocus={handleCheckboxFocus("required")}
              onInputBlur={handleCheckboxBlur("required")}
            />
          </div>
        </div>
      </div>

      {/* Size Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Size Variants
        </div>
        <p className="text-foreground mb-6">
          Different checkbox sizes for various contexts and importance levels.
        </p>
        <div className="space-y-4">
          {sizes.map((size) => (
            <div key={size.value} className="flex items-center gap-4">
              <ModusCheckbox
                value={checkboxStates[size.value]}
                size={size.value}
                label={`${size.label} Checkbox (${size.description})`}
                onInputChange={handleCheckboxChange(size.value)}
                onInputFocus={handleCheckboxFocus(size.value)}
                onInputBlur={handleCheckboxBlur(size.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Form Integration */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Form Integration
        </div>
        <p className="text-foreground mb-6">
          Checkboxes integrated into forms with proper naming and validation.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logEvent("Form submitted with checkbox values", "success");
          }}
          className="space-y-6"
        >
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Newsletter Subscription
            </h4>
            <div className="space-y-3">
              <ModusCheckbox
                value={checkboxStates.newsletter}
                name="newsletter"
                label="Subscribe to newsletter"
                onInputChange={handleCheckboxChange("newsletter")}
                onInputFocus={handleCheckboxFocus("newsletter")}
                onInputBlur={handleCheckboxBlur("newsletter")}
              />
              <ModusCheckbox
                value={checkboxStates.marketing}
                name="marketing"
                label="Receive marketing emails"
                onInputChange={handleCheckboxChange("marketing")}
                onInputFocus={handleCheckboxFocus("marketing")}
                onInputBlur={handleCheckboxBlur("marketing")}
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Terms and Conditions
            </h4>
            <div className="space-y-3">
              <ModusCheckbox
                value={checkboxStates.terms}
                name="terms"
                required
                label="I agree to the terms and conditions"
                onInputChange={handleCheckboxChange("terms")}
                onInputFocus={handleCheckboxFocus("terms")}
                onInputBlur={handleCheckboxBlur("terms")}
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Notification Preferences
            </h4>
            <div className="space-y-3">
              <ModusCheckbox
                value={checkboxStates.notifications}
                name="notifications"
                label="Enable push notifications"
                onInputChange={handleCheckboxChange("notifications")}
                onInputFocus={handleCheckboxFocus("notifications")}
                onInputBlur={handleCheckboxBlur("notifications")}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <ModusWcButton type="submit" color="primary">
              Submit Form
            </ModusWcButton>
            <ModusWcButton
              type="button"
              variant="outlined"
              color="secondary"
              onButtonClick={resetAllCheckboxes}
            >
              Reset Form
            </ModusWcButton>
          </div>
        </form>
      </div>

      {/* Tree View Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Tree View Example
        </div>
        <p className="text-foreground mb-6">
          Demonstrates indeterminate state for parent-child checkbox
          relationships.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ModusCheckbox
              value={checkboxStates.terms}
              indeterminate={
                !checkboxStates.terms &&
                (checkboxStates.newsletter || checkboxStates.marketing)
              }
              label="Select All"
              onInputChange={(event) => {
                const isChecked = (event.target as HTMLModusWcCheckboxElement)
                  .value;
                setCheckboxStates((prev) => ({
                  ...prev,
                  terms: isChecked,
                  newsletter: isChecked,
                  marketing: isChecked,
                }));
                logEvent(
                  `Select All ${isChecked ? "checked" : "unchecked"}`,
                  "info"
                );
              }}
            />
          </div>
          <div className="ml-6 space-y-2">
            <div className="flex items-center gap-2">
              <ModusCheckbox
                value={checkboxStates.newsletter}
                label="Newsletter"
                onInputChange={handleCheckboxChange("newsletter")}
              />
            </div>
            <div className="flex items-center gap-2">
              <ModusCheckbox
                value={checkboxStates.marketing}
                label="Marketing"
                onInputChange={handleCheckboxChange("marketing")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Accessibility Examples
        </div>
        <p className="text-foreground mb-6">
          Checkboxes with proper accessibility attributes and labels.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ModusCheckbox
              aria-label="Standalone checkbox without visible label"
              onInputChange={() =>
                logEvent("Standalone checkbox changed", "info")
              }
            />
            <span className="text-foreground">
              Standalone checkbox (aria-label only)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ModusCheckbox
              inputId="custom-checkbox"
              label="Checkbox with custom ID"
              onInputChange={() =>
                logEvent("Custom ID checkbox changed", "info")
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <ModusCheckbox
              inputTabIndex={1}
              label="Checkbox with custom tab index"
              onInputChange={() =>
                logEvent("Custom tab index checkbox changed", "info")
              }
            />
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Controls
        </div>
        <p className="text-foreground mb-6">
          Control all checkboxes programmatically.
        </p>
        <div className="flex gap-4 mb-6">
          <ModusWcButton color="primary" onButtonClick={selectAllCheckboxes}>
            <i className="modus-icons mr-2">check_box</i>
            Select All
          </ModusWcButton>
          <ModusWcButton color="secondary" onButtonClick={resetAllCheckboxes}>
            <i className="modus-icons mr-2">check_box_outline_blank</i>
            Clear All
          </ModusWcButton>
          <ModusWcButton
            variant="outlined"
            color="tertiary"
            onButtonClick={clearLogs}
          >
            <i className="modus-icons mr-2">delete</i>
            Clear Logs
          </ModusWcButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Current States
            </h4>
            <div className="space-y-2 text-sm">
              {Object.entries(checkboxStates).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-foreground capitalize">{key}:</span>
                  <span
                    className={`font-mono ${
                      value ? "text-success" : "text-destructive"
                    }`}
                  >
                    {value ? "checked" : "unchecked"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Form Data
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(checkboxStates).filter(([key]) =>
                    [
                      "newsletter",
                      "marketing",
                      "terms",
                      "notifications",
                    ].includes(key)
                  )
                ),
                null,
                2
              )}
            </pre>
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
              Interact with the checkboxes to see events logged here...
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
              {`<ModusCheckbox
  label="Subscribe to newsletter"
  onInputChange={handleChange}
/>`}
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusCheckbox
  value={isChecked}
  disabled={isDisabled}
  indeterminate={isIndeterminate}
  label="Terms and conditions"
  required
  size="lg"
  name="terms"
  onInputChange={handleChange}
  onInputFocus={handleFocus}
  onInputBlur={handleBlur}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
