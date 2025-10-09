"use client";

import { useCallback, useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusRadio from "../components/ModusRadio";

const communicationOptions = [
  {
    id: "email",
    label: "Email updates",
    description: "Receive summaries and alerts via email once per day.",
  },
  {
    id: "sms",
    label: "SMS notifications",
    description: "Get immediate SMS notifications for critical events.",
  },
  {
    id: "push",
    label: "Push notifications",
    description: "Send alerts to the Trimble mobile app in real time.",
  },
];

const sizeVariants: Array<{
  size: "sm" | "md" | "lg";
  label: string;
  detail: string;
}> = [
  { size: "sm", label: "Small", detail: "16px control" },
  { size: "md", label: "Medium", detail: "20px control (default)" },
  { size: "lg", label: "Large", detail: "24px control" },
];

const deploymentPriorities = [
  {
    id: "standard",
    label: "Standard rollout",
    description: "Schedule deployment during regular maintenance windows.",
  },
  {
    id: "staged",
    label: "Staged rollout",
    description: "Deploy to pilot sites first, then expand regionally.",
  },
  {
    id: "urgent",
    label: "Urgent rollout",
    description: "Escalate and deploy immediately across all environments.",
  },
];

export default function RadioDemoPage() {
  const [communicationPreference, setCommunicationPreference] =
    useState("email");
  const [deploymentPriority, setDeploymentPriority] = useState("standard");
  const [surveyChoice, setSurveyChoice] = useState("approve");
  const [eventLog, setEventLog] = useState<string[]>([]);

  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((previous) => {
      const next = [`${timestamp} — ${message}`, ...previous];
      return next.slice(0, 12);
    });
  }, []);

  const handleCommunicationChange = useCallback(
    (optionId: string) =>
      (event: CustomEvent<InputEvent>) => {
        const radio = event.target as HTMLModusWcRadioElement | null;
        if (!radio?.value) {
          return;
        }

        setCommunicationPreference(optionId);
        logEvent(`Notification preference set to ${optionId}`);
      },
    [logEvent]
  );

  const handlePriorityChange = useCallback(
    (optionId: string) =>
      (event: CustomEvent<InputEvent>) => {
        const radio = event.target as HTMLModusWcRadioElement | null;
        if (!radio?.value) {
          return;
        }

        setDeploymentPriority(optionId);
        logEvent(`Deployment priority changed to ${optionId}`);
      },
    [logEvent]
  );

  const handleSurveyChange = useCallback(
    (optionId: string) =>
      (event: CustomEvent<InputEvent>) => {
        const radio = event.target as HTMLModusWcRadioElement | null;
        if (!radio?.value) {
          return;
        }

        setSurveyChoice(optionId);
        logEvent(`Survey response updated to ${optionId}`);
      },
    [logEvent]
  );

  const resetSelections = () => {
    setCommunicationPreference("email");
    setDeploymentPriority("standard");
    setSurveyChoice("approve");
    logEvent("Reset all radio selections");
  };

  const selectedCommunicationDescription = useMemo(() => {
    return (
      communicationOptions.find(
        (option) => option.id === communicationPreference
      )?.description ?? ""
    );
  }, [communicationPreference]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Radio Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Radio buttons let users choose a single option from a set. This demo
            shows theme-aware sizes, validation states, and how to integrate
            Modus Web Component events with React state.
          </div>
        </div>

        {/* Notification Preferences */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Notification Preferences
          </div>
          <div className="space-y-6">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Choose one delivery method
            </div>
            <div className="flex flex-col gap-4">
              {communicationOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-background border border-border rounded-lg p-4"
                  style={{ borderWidth: "1px" }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground mb-1">
                        {option.label}
                      </div>
                      <div className="text-sm text-foreground opacity-80">
                        {option.description}
                      </div>
                    </div>
                    <ModusRadio
                      value={communicationPreference === option.id}
                      name="communication-preference"
                      label={option.label}
                      inputId={`communication-${option.id}`}
                      onInputChange={handleCommunicationChange(option.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm text-foreground opacity-80">
              Currently selected:{" "}
              <span className="font-semibold text-foreground">
                {
                  communicationOptions.find(
                    (option) => option.id === communicationPreference
                  )?.label
                }
              </span>
              {selectedCommunicationDescription && (
                <>
                  {" "}
                  <span className="block font-normal opacity-70 text-sm">
                    {selectedCommunicationDescription}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Deployment Priority */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                Deployment Priority
              </div>
              <div className="text-sm text-foreground opacity-80">
                Radial controls stay in sync across themes. Use consistent names
                to form exclusive groups.
              </div>
            </div>
            <div className="flex gap-3">
              <ModusWcButton
                color="primary"
                variant="outlined"
                size="sm"
                onButtonClick={resetSelections}
              >
                Reset selections
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                size="sm"
                onButtonClick={() =>
                  logEvent(`Saved selections (${communicationPreference}, ${deploymentPriority})`)
                }
              >
                Log selection
              </ModusWcButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deploymentPriorities.map((option) => (
              <div
                key={option.id}
                className="bg-background border border-border rounded-lg p-6 flex flex-col gap-4 justify-between"
                style={{ borderWidth: "1px" }}
              >
                <div>
                  <div className="text-lg font-semibold text-foreground mb-2">
                    {option.label}
                  </div>
                  <div className="text-sm text-foreground opacity-80">
                    {option.description}
                  </div>
                </div>
                <ModusRadio
                  value={deploymentPriority === option.id}
                  name="deployment-priority"
                  label={option.label}
                  size="lg"
                  inputId={`deployment-${option.id}`}
                  onInputChange={handlePriorityChange(option.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Size & Layout Variations */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Size &amp; Layout Variations
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {sizeVariants.map((variant) => (
                <div
                  key={variant.size}
                  className="flex items-center justify-between bg-background border border-border rounded-lg px-4 py-3"
                  style={{ borderWidth: "1px" }}
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {variant.label}
                    </div>
                    <div className="text-xs text-foreground opacity-70">
                      {variant.detail}
                    </div>
                  </div>
                  <ModusRadio
                    value={variant.size === "md"}
                    name="size-demo"
                    label={variant.label}
                    size={variant.size}
                    inputId={`size-${variant.size}`}
                    customClass="radio-inline"
                    aria-label={`${variant.label} radio example`}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Inline layout using a custom class
                </div>
                <div className="radio-pill-group">
                  <ModusRadio
                    value={surveyChoice === "approve"}
                    name="survey"
                    label="Approve"
                    customClass="radio-inline"
                    onInputChange={handleSurveyChange("approve")}
                    inputId="survey-approve"
                  />
                  <ModusRadio
                    value={surveyChoice === "revise"}
                    name="survey"
                    label="Revise"
                    customClass="radio-inline"
                    onInputChange={handleSurveyChange("revise")}
                    inputId="survey-revise"
                  />
                  <ModusRadio
                    value={surveyChoice === "reject"}
                    name="survey"
                    label="Reject"
                    customClass="radio-inline"
                    onInputChange={handleSurveyChange("reject")}
                    inputId="survey-reject"
                  />
                </div>
                <div className="text-xs text-foreground opacity-70 mt-3">
                  The `customClass` prop applies styles to the host element,
                  letting you create inline arrangements without altering the
                  component internals.
                </div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Event log
                </div>
                <div className="bg-background border border-border rounded-lg p-4 min-h-36">
                  {eventLog.length === 0 ? (
                    <div className="text-sm text-foreground opacity-60">
                      Interact with any radio to see its events.
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
          </div>
        </div>

        {/* States & Accessibility */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            States &amp; Accessibility
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-background border border-border rounded-lg p-6">
              <div className="text-sm font-semibold text-foreground">
                Required group
              </div>
              <div className="text-xs text-foreground opacity-70">
                Browser validation ensures a choice is made before submission.
              </div>
              <ModusRadio
                value={true}
                name="required-group"
                label="Primary region"
                required
                inputId="required-primary"
              />
              <ModusRadio
                value={false}
                name="required-group"
                label="Secondary region"
                required
                inputId="required-secondary"
              />
            </div>
            <div className="space-y-4 bg-background border border-border rounded-lg p-6">
              <div className="text-sm font-semibold text-foreground">
                Disabled &amp; aria-label usage
              </div>
              <ModusRadio
                value={true}
                name="disabled-group"
                label="Headquarters"
                disabled
                inputId="disabled-hq"
              />
              <ModusRadio
                value={false}
                name="disabled-group"
                disabled
                aria-label="Satellite office (disabled example)"
                inputId="disabled-satellite"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .radio-inline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .radio-pill-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
