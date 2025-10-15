"use client";

import { useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusTextarea from "../../../app/components/ModusTextarea";

const MAX_MESSAGE_LENGTH = 500;

const quickTemplates = [
  {
    id: "inspection",
    label: "Inspection Summary",
    content:
      "Completed site walk-through. Documented punch list items and captured drone imagery for follow-up.",
  },
  {
    id: "handoff",
    label: "Handoff Notes",
    content:
      "Shift change complete. Excavation crews moving to zone B, surveying team on standby for afternoon alignment check.",
  },
  {
    id: "issue",
    label: "Issue Log",
    content:
      "Identified wiring discrepancy in control room cabinet. Requesting electrical engineering review before power-up.",
  },
];

export default function TextareaDemoPage() {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const remainingCharacters = useMemo(
    () => MAX_MESSAGE_LENGTH - message.length,
    [message]
  );

  const logEvent = (entry: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((previous) => {
      const nextEntries = [`${timestamp} — ${entry}`, ...previous];
      return nextEntries.slice(0, 18);
    });
  };

  const handleValueChange = (value: string) => {
    setMessage(value);
    logEvent(`Textarea updated (${value.length} characters)`);
  };

  const applyTemplate = (templateContent: string) => {
    setMessage(templateContent);
    logEvent("Applied predefined template");
  };

  const clearMessage = () => {
    setMessage("");
    logEvent("Cleared message");
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Textarea Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Capture multi-line notes, inspection forms, and handoff updates with
            theme-aware styling, helper messaging, and built-in validation.
          </div>
        </div>

        {/* Controlled editor */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                Controlled Field Log
              </div>
              <div className="text-sm text-foreground opacity-80">
                Manage value through React state. Helper text tracks remaining
                characters while quick templates accelerate data entry.
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ModusWcButton
                color="primary"
                variant="outlined"
                size="sm"
                onButtonClick={clearMessage}
              >
                Clear note
              </ModusWcButton>
              <ModusWcButton
                color={disabled ? "warning" : "secondary"}
                variant="outlined"
                size="sm"
                onButtonClick={() => {
                  const next = !disabled;
                  setDisabled(next);
                  logEvent(`${next ? "Disabled" : "Enabled"} field input`);
                }}
              >
                {disabled ? "Enable input" : "Disable input"}
              </ModusWcButton>
              <ModusWcButton
                color={readOnly ? "primary" : "secondary"}
                variant="outlined"
                size="sm"
                onButtonClick={() => {
                  const next = !readOnly;
                  setReadOnly(next);
                  logEvent(`${next ? "Set to" : "Removed"} read-only mode`);
                }}
              >
                {readOnly ? "Allow editing" : "Set read-only"}
              </ModusWcButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <ModusTextarea
                label="Daily field log"
                placeholder="Document key observations, issues, and next actions."
                helperText={`${remainingCharacters} characters remaining`}
                value={message}
                onValueChange={handleValueChange}
                rows={6}
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={disabled}
                readOnly={readOnly}
                ariaLabel="Daily field log textarea"
              />
              <div className="text-xs text-foreground opacity-70">
                Value synchronized with React state and the component’s native
                `valueChange` event.
              </div>
            </div>

            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Quick templates
              </div>
              {quickTemplates.map((template) => (
                <button
                  key={template.id}
                  className="text-left p-4 rounded-lg bg-card hover:bg-card/80 transition-colors text-sm text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                  type="button"
                  onClick={() => applyTemplate(template.content)}
                >
                  <div className="font-semibold text-foreground mb-1">
                    {template.label}
                  </div>
                  <div className="opacity-80 leading-relaxed">
                    {template.content}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sizes & alignment */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Size &amp; Alignment Variations
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Preset sizes
              </div>
              <ModusTextarea
                label="Medium size"
                placeholder="Default size for forms"
                rows={3}
                helperText="Line height ≈ 40px"
              />
              <ModusTextarea
                label="Large size"
                placeholder="High-visibility variant"
                size="lg"
                rows={3}
                helperText="Line height ≈ 48px"
              />
            </div>
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Text alignment
              </div>
              <ModusTextarea
                label="Center aligned"
                placeholder="Centered messaging"
                customClass="textarea-align-center"
                rows={3}
              />
              <ModusTextarea
                label="Right aligned"
                placeholder="Right aligned for totals or metrics"
                customClass="textarea-align-right"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* States & validation */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            States &amp; Validation
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm font-semibold text-foreground">
                Helper text
              </div>
              <ModusTextarea
                label="Support request"
                placeholder="Describe the issue…"
                helperText="Include reproduction steps or screenshots"
                rows={4}
              />
            </div>
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm font-semibold text-foreground">
                Error state
              </div>
              <ModusTextarea
                label="Incident summary"
                value="Details pending review"
                errorText="A full incident summary is required"
                rows={4}
                required
              />
            </div>
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm font-semibold text-foreground">
                Valid state
              </div>
              <ModusTextarea
                label="Approval note"
                value="Ready to promote to production"
                validText="Looks good"
                rows={4}
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
            Every `valueChange` event captured from the controlled textarea.
          </div>
          <div
            className="bg-background rounded-lg p-4 min-h-40"
            style={{ border: "1px solid var(--border)" }}
          >
            {eventLog.length === 0 ? (
              <div className="text-sm text-foreground opacity-60">
                Start typing or apply a template to populate the log.
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

      <style jsx global>{`
        .textarea-align-center textarea {
          text-align: center;
        }

        .textarea-align-right textarea {
          text-align: right;
        }
      `}</style>
    </>
  );
}
