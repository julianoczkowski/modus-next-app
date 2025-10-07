"use client";

import { useState, useCallback } from "react";
import ModusAlert from "../components/ModusAlert";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface EventLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function AlertDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [visibleAlerts, setVisibleAlerts] = useState<Set<string>>(new Set());

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

  const showAlert = (alertId: string) => {
    setVisibleAlerts((prev) => new Set(prev).add(alertId));
    logEvent(`Alert ${alertId} shown`, "info");
  };

  const hideAlert = (alertId: string) => {
    setVisibleAlerts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(alertId);
      return newSet;
    });
    logEvent(`Alert ${alertId} dismissed`, "info");
  };

  const handleDismissClick = useCallback(
    (alertId: string) => (event: CustomEvent<void>) => {
      logEvent(`Alert ${alertId} dismiss button clicked`, "info");
      hideAlert(alertId);
    },
    [logEvent]
  );

  const showAllAlerts = () => {
    const allAlertIds = [
      "basic-info",
      "success-message",
      "warning-message",
      "error-message",
      "dismissible-alert",
      "custom-icon-alert",
      "action-alert",
      "custom-content-alert",
    ];
    setVisibleAlerts(new Set(allAlertIds));
    logEvent("All alerts shown", "info");
  };

  const hideAllAlerts = () => {
    setVisibleAlerts(new Set());
    logEvent("All alerts hidden", "info");
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Alert Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Alert component with different variants, dismissible
          alerts, custom icons, and action buttons.
        </p>
      </div>

      {/* Control Buttons */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Alert Controls
        </div>
        <div className="flex gap-4 flex-wrap">
          <ModusWcButton
            color="primary"
            onButtonClick={showAllAlerts}
            disabled={visibleAlerts.size === 8}
          >
            <i className="modus-icons mr-2">visibility</i>
            Show All Alerts
          </ModusWcButton>
          <ModusWcButton
            color="secondary"
            onButtonClick={hideAllAlerts}
            disabled={visibleAlerts.size === 0}
          >
            <i className="modus-icons mr-2">visibility_off</i>
            Hide All Alerts
          </ModusWcButton>
          <ModusWcButton
            variant="outlined"
            color="tertiary"
            onButtonClick={clearLogs}
            disabled={eventLogs.length === 0}
          >
            <i className="modus-icons mr-2">delete</i>
            Clear Logs
          </ModusWcButton>
        </div>
      </div>

      {/* Basic Alert Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Alert Variants
        </div>
        <p className="text-foreground mb-6">
          Different alert types for various use cases.
        </p>
        <div className="space-y-4">
          {/* Info Alert */}
          {visibleAlerts.has("basic-info") && (
            <ModusAlert
              alertTitle="Information"
              alertDescription="This is an informational alert with default styling."
              variant="info"
              onDismissClick={handleDismissClick("basic-info")}
            />
          )}

          {/* Success Alert */}
          {visibleAlerts.has("success-message") && (
            <ModusAlert
              alertTitle="Success!"
              alertDescription="Your operation completed successfully."
              variant="success"
              onDismissClick={handleDismissClick("success-message")}
            />
          )}

          {/* Warning Alert */}
          {visibleAlerts.has("warning-message") && (
            <ModusAlert
              alertTitle="Warning"
              alertDescription="Please review the details before proceeding."
              variant="warning"
              onDismissClick={handleDismissClick("warning-message")}
            />
          )}

          {/* Error Alert */}
          {visibleAlerts.has("error-message") && (
            <ModusAlert
              alertTitle="Error"
              alertDescription="Something went wrong. Please try again."
              variant="error"
              onDismissClick={handleDismissClick("error-message")}
            />
          )}
        </div>
      </div>

      {/* Dismissible Alerts */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Dismissible Alerts
        </div>
        <p className="text-foreground mb-6">
          Alerts with dismiss buttons for user interaction.
        </p>
        <div className="space-y-4">
          {visibleAlerts.has("dismissible-alert") && (
            <ModusAlert
              alertTitle="Dismissible Alert"
              alertDescription="Click the X button to dismiss this alert."
              variant="info"
              dismissible
              onDismissClick={handleDismissClick("dismissible-alert")}
            />
          )}
        </div>
      </div>

      {/* Custom Icon Alerts */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Custom Icon Alerts
        </div>
        <p className="text-foreground mb-6">
          Alerts with custom icons instead of default variant icons.
        </p>
        <div className="space-y-4">
          {visibleAlerts.has("custom-icon-alert") && (
            <ModusAlert
              alertTitle="Custom Icon Alert"
              alertDescription="This alert uses a custom help icon instead of the default info icon."
              variant="info"
              icon="help"
              onDismissClick={handleDismissClick("custom-icon-alert")}
            />
          )}
        </div>
      </div>

      {/* Action Button Alerts */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Action Button Alerts
        </div>
        <p className="text-foreground mb-6">
          Alerts with action buttons for user interaction.
        </p>
        <div className="space-y-4">
          {visibleAlerts.has("action-alert") && (
            <ModusAlert
              alertTitle="New Messages"
              alertDescription="You have 3 unread messages in your inbox."
              variant="info"
              onDismissClick={handleDismissClick("action-alert")}
            >
              <ModusWcButton
                slot="button"
                color="secondary"
                variant="outlined"
                size="sm"
                onButtonClick={() =>
                  logEvent("View Messages button clicked", "info")
                }
              >
                <i className="modus-icons mr-2">mail</i>
                View Messages
              </ModusWcButton>
            </ModusAlert>
          )}
        </div>
      </div>

      {/* Custom Content Alerts */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Custom Content Alerts
        </div>
        <p className="text-foreground mb-6">
          Alerts with completely custom content using slots.
        </p>
        <div className="space-y-4">
          {visibleAlerts.has("custom-content-alert") && (
            <ModusAlert
              variant="success"
              onDismissClick={handleDismissClick("custom-content-alert")}
            >
              <div slot="content">
                <div className="flex items-center gap-2 mb-2">
                  <i className="modus-icons text-success">check_circle</i>
                  <strong className="text-foreground">Well done!</strong>
                </div>
                <p className="text-foreground">
                  You successfully read this important alert message. This is a
                  custom content alert with rich formatting.
                </p>
                <div className="mt-3 flex gap-2">
                  <ModusWcButton
                    color="primary"
                    size="sm"
                    onButtonClick={() => logEvent("Learn More clicked", "info")}
                  >
                    Learn More
                  </ModusWcButton>
                  <ModusWcButton
                    variant="outlined"
                    size="sm"
                    onButtonClick={() =>
                      logEvent("Documentation clicked", "info")
                    }
                  >
                    Documentation
                  </ModusWcButton>
                </div>
              </div>
            </ModusAlert>
          )}
        </div>
      </div>

      {/* Interactive Alert Generator */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Alert Generator
        </div>
        <p className="text-foreground mb-6">
          Generate alerts dynamically with different configurations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <ModusWcButton
                fullWidth
                color="primary"
                onButtonClick={() => {
                  const alertId = `dynamic-${Date.now()}`;
                  showAlert(alertId);
                }}
              >
                <i className="modus-icons mr-2">add</i>
                Show Info Alert
              </ModusWcButton>
              <ModusWcButton
                fullWidth
                color="primary"
                onButtonClick={() => {
                  const alertId = `success-${Date.now()}`;
                  showAlert(alertId);
                }}
              >
                <i className="modus-icons mr-2">check</i>
                Show Success Alert
              </ModusWcButton>
              <ModusWcButton
                fullWidth
                color="secondary"
                onButtonClick={() => {
                  const alertId = `warning-${Date.now()}`;
                  showAlert(alertId);
                }}
              >
                <i className="modus-icons mr-2">warning</i>
                Show Warning Alert
              </ModusWcButton>
              <ModusWcButton
                fullWidth
                color="danger"
                onButtonClick={() => {
                  const alertId = `error-${Date.now()}`;
                  showAlert(alertId);
                }}
              >
                <i className="modus-icons mr-2">error</i>
                Show Error Alert
              </ModusWcButton>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Usage Examples
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusAlert
  alertTitle="Success!"
  alertDescription="Operation completed."
  variant="success"
  dismissible
  onDismissClick={handleDismiss}
/>`}
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
              Interact with the alerts to see events logged here...
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
              {`<ModusAlert
  alertTitle="Information"
  alertDescription="This is an alert message."
  variant="info"
/>`}
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusAlert
  alertTitle="Success!"
  alertDescription="Operation completed."
  variant="success"
  dismissible
  icon="check_circle"
  onDismissClick={handleDismiss}
>
  <ModusWcButton slot="button">
    Action
  </ModusWcButton>
</ModusAlert>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
