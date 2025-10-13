"use client";

import { useCallback, useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusSwitch from "../components/ModusSwitch";

interface FeatureToggle {
  id: string;
  label: string;
  description: string;
}

const featureList: FeatureToggle[] = [
  {
    id: "analytics",
    label: "Advanced analytics",
    description: "Enable machine learning summaries and predictive dashboards.",
  },
  {
    id: "alerts",
    label: "Critical alerts",
    description: "Send urgent push notifications to all field devices.",
  },
  {
    id: "backups",
    label: "Nightly backups",
    description: "Archive project data to Trimble Cloud every evening.",
  },
];

export default function SwitchDemoPage() {
  const [primaryToggle, setPrimaryToggle] = useState(true);
  const [indeterminate, setIndeterminate] = useState(true);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    analytics: true,
    alerts: false,
    backups: true,
  });
  const [disabled, setDisabled] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const activeCount = useMemo(
    () =>
      Object.values(toggles).reduce(
        (count, current) => (current ? count + 1 : count),
        0
      ),
    [toggles]
  );

  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((previous) => {
      const next = [`${timestamp} — ${message}`, ...previous];
      return next.slice(0, 18);
    });
  }, []);

  const handlePrimaryChange = useCallback(
    (event: CustomEvent<InputEvent>) => {
      const target = event.target as HTMLModusWcSwitchElement | null;
      if (!target) {
        return;
      }
      setPrimaryToggle(target.value);
      logEvent(`Main power ${target.value ? "enabled" : "disabled"}`);
    },
    [logEvent]
  );

  const handleFeatureChange = useCallback(
    (featureId: string) => (event: CustomEvent<InputEvent>) => {
      const target = event.target as HTMLModusWcSwitchElement | null;
      if (!target) {
        return;
      }
      setToggles((previous) => ({
        ...previous,
        [featureId]: target.value,
      }));
      logEvent(
        `${
          featureList.find((item) => item.id === featureId)?.label ?? featureId
        } ${target.value ? "turned on" : "turned off"}`
      );
    },
    [logEvent]
  );

  const resetToggles = () => {
    setPrimaryToggle(true);
    setToggles({
      analytics: true,
      alerts: false,
      backups: true,
    });
    setIndeterminate(true);
    setDisabled(false);
    logEvent("Reset all switches to default states");
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Switch Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Switches provide accessible on/off toggles for settings, power
            controls, or feature management. Combine sizes, indeterminate
            states, and custom classes to reflect your application’s semantics.
          </div>
        </div>

        {/* Primary Control */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                Facility Master Control
              </div>
              <div className="text-sm text-foreground opacity-80">
                Toggle the master power switch, mark a mixed state, or disable
                all downstream switches.
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ModusWcButton
                color="primary"
                variant="outlined"
                size="sm"
                onButtonClick={resetToggles}
              >
                Reset switches
              </ModusWcButton>
              <ModusWcButton
                color={disabled ? "warning" : "secondary"}
                variant="outlined"
                size="sm"
                onButtonClick={() => {
                  const next = !disabled;
                  setDisabled(next);
                  logEvent(
                    `${next ? "Disabled" : "Enabled"} all feature switches`
                  );
                }}
              >
                {disabled ? "Enable all" : "Disable all"}
              </ModusWcButton>
              <ModusWcButton
                color={indeterminate ? "primary" : "secondary"}
                variant="outlined"
                size="sm"
                onButtonClick={() => {
                  const next = !indeterminate;
                  setIndeterminate(next);
                  logEvent(
                    `Indeterminate state ${next ? "applied" : "cleared"}`
                  );
                }}
              >
                {indeterminate ? "Clear mixed state" : "Set mixed state"}
              </ModusWcButton>
            </div>
          </div>

          <div
            className="bg-background rounded-lg p-6 flex flex-col gap-4"
            style={{ border: "1px solid var(--border)" }}
          >
            <ModusSwitch
              label="Main facility power"
              value={primaryToggle}
              onInputChange={handlePrimaryChange}
              indeterminate={indeterminate}
              size="lg"
              aria-label="Main facility power switch"
            />
            <div className="text-sm text-foreground opacity-80 leading-relaxed">
              The indeterminate state provides a visual hint when subsidiary
              systems are out of sync. Toggling the switch clears the mixed
              state and sets a definitive on/off value.
            </div>
          </div>
        </div>

        {/* Feature Matrix */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Feature Flags
          </div>
          <div
            className="bg-background rounded-lg divide-y divide-border"
            style={{ border: "1px solid var(--border)" }}
          >
            {featureList.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6"
              >
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {feature.label}
                  </div>
                  <div className="text-sm text-foreground opacity-80">
                    {feature.description}
                  </div>
                </div>
                <ModusSwitch
                  value={toggles[feature.id]}
                  onInputChange={handleFeatureChange(feature.id)}
                  disabled={disabled}
                  aria-label={`${feature.label} feature switch`}
                />
              </div>
            ))}
          </div>
          <div className="text-sm text-foreground opacity-80 mt-4">
            {activeCount} of {featureList.length} features active.
          </div>
        </div>

        {/* Sizes & States */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Sizes &amp; States
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Size tokens
              </div>
              <ModusSwitch
                label="Small switch"
                size="sm"
                aria-label="Small switch example"
              />
              <ModusSwitch
                label="Medium switch"
                size="md"
                value
                aria-label="Medium switch example"
              />
              <ModusSwitch
                label="Large switch"
                size="lg"
                aria-label="Large switch example"
              />
            </div>
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Required &amp; disabled
              </div>
              <ModusSwitch
                label="Flight mode (required)"
                value
                required
                aria-label="Required switch example"
              />
              <ModusSwitch
                label="Diagnostics (disabled on)"
                value
                disabled
                aria-label="Disabled on switch example"
              />
              <ModusSwitch
                label="Diagnostics (disabled off)"
                disabled
                aria-label="Disabled off switch example"
              />
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div
          className="p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-4">
            Interaction Log
          </div>
          <div className="text-sm text-foreground opacity-70 mb-4">
            Captures `inputChange` events to audit system changes.
          </div>
          <div
            className="bg-background rounded-lg p-4 min-h-40"
            style={{ border: "1px solid var(--border)" }}
          >
            {eventLog.length === 0 ? (
              <div className="text-sm text-foreground opacity-60">
                Toggle any switch above to populate the log.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {eventLog.map((entry, index) => (
                  <div
                    key={`${entry}-${index}`}
                    className="text-sm text-foreground leading-relaxed"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
