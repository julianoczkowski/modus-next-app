"use client";

import { useMemo, useState } from "react";
import ModusTimeInput from "../components/ModusTimeInput";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import type { InputFeedbackProp } from "../components/ModusInputFeedback";

const shiftPresets = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30"];
const flightTimes = ["05:15", "11:45", "17:30", "21:05"];

export default function TimeInputDemoPage() {
  const [startTime, setStartTime] = useState("07:30");
  const [endTime, setEndTime] = useState("16:30");
  const [breakDuration, setBreakDuration] = useState("00:30");
  const [feedback, setFeedback] = useState<InputFeedbackProp | undefined>();
  const [eventLog, setEventLog] = useState<string[]>([]);

  const logEvent = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((previous) => {
      const next = [`${timestamp} — ${message}`, ...previous];
      return next.slice(0, 18);
    });
  };

  const workingMinutes = useMemo(() => {
    const toMinutes = (value: string) => {
      const [hrs, mins] = value.split(":").map((v) => parseInt(v, 10));
      return hrs * 60 + mins;
    };
    const start = toMinutes(startTime);
    const end = toMinutes(endTime);
    let diff = end - start;
    diff -= toMinutes(breakDuration);
    return diff;
  }, [breakDuration, endTime, startTime]);

  const handleStartChange = (event: CustomEvent<Event>) => {
    const target = event.target as HTMLModusWcTimeInputElement | null;
    if (!target) return;
    setStartTime(target.value);
    logEvent(`Start time set to ${target.value}`);
  };

  const handleEndChange = (event: CustomEvent<Event>) => {
    const target = event.target as HTMLModusWcTimeInputElement | null;
    if (!target) return;
    setEndTime(target.value);
    logEvent(`End time set to ${target.value}`);
  };

  const handleBreakChange = (event: CustomEvent<Event>) => {
    const target = event.target as HTMLModusWcTimeInputElement | null;
    if (!target) return;
    setBreakDuration(target.value);
    logEvent(`Break duration set to ${target.value}`);
  };

  const applyShiftPreset = (value: string) => {
    setStartTime(value);
    logEvent(`Applied shift preset ${value}`);
  };

  const validateTimes = () => {
    const feedbackMessages: InputFeedbackProp | undefined =
      startTime >= endTime
        ? { level: "error", message: "End time must be after start time" }
        : undefined;
    setFeedback(feedbackMessages);
    logEvent(
      feedbackMessages
        ? feedbackMessages.message ?? "Validation error"
        : "Validation cleared"
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Time Input Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
          Capture time ranges with validation, suggestions, and precise control
          over step, min/max boundaries, and seconds.
        </div>
      </div>

      {/* Shift planner */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
          <div>
            <div className="text-2xl font-semibold text-foreground mb-2">
              Shift Planner
            </div>
            <div className="text-sm text-foreground opacity-80 leading-relaxed">
              Define crew start/end times with optional break durations.
              Suggestions help align with operational presets.
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {shiftPresets.map((preset) => (
              <ModusWcButton
                key={preset}
                color="secondary"
                variant="outlined"
                size="sm"
                onButtonClick={() => applyShiftPreset(preset)}
              >
                {preset}
              </ModusWcButton>
            ))}
            <ModusWcButton
              color="primary"
              variant="outlined"
              size="sm"
              onButtonClick={validateTimes}
            >
              Validate schedule
            </ModusWcButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-background rounded-lg p-6 space-y-3"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Start time
            </div>
            <ModusTimeInput
              label="Start"
              value={startTime}
              min="05:00"
              max="12:00"
              step={900}
              datalistOptions={shiftPresets}
              onInputChange={handleStartChange}
            />
          </div>
          <div
            className="bg-background rounded-lg p-6 space-y-3"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              End time
            </div>
            <ModusTimeInput
              label="End"
              value={endTime}
              min={startTime}
              max="20:00"
              step={900}
              onInputChange={handleEndChange}
              feedback={feedback}
            />
          </div>
          <div
            className="bg-background rounded-lg p-6 space-y-3"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Break
            </div>
            <ModusTimeInput
              label="Duration"
              value={breakDuration}
              showSeconds
              step={60}
              onInputChange={handleBreakChange}
            />
          </div>
        </div>

        <div className="mt-6 text-sm text-foreground opacity-80">
          Net working minutes: {workingMinutes} minutes
        </div>
      </div>

      {/* Flight scheduling */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Flight Scheduling Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="bg-background rounded-lg p-6 space-y-3"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm font-semibold text-foreground">
              Airport transfer slots
            </div>
            <ModusTimeInput
              label="Transfer time"
              datalistOptions={flightTimes}
              step={300}
            />
            <div className="text-xs text-foreground opacity-70">
              Datalist suggestions and 5-minute increments streamline booking.
            </div>
          </div>
          <div
            className="bg-background rounded-lg p-6 space-y-3"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm font-semibold text-foreground">
              Precise engine checks
            </div>
            <ModusTimeInput
              label="Engine warmup"
              showSeconds
              step={15}
              value="00:05:00"
              required
            />
            <div className="text-xs text-foreground opacity-70">
              showSeconds ensures second-level precision; custom step enforces
              15-second intervals.
            </div>
          </div>
        </div>
      </div>

      {/* Sizes & states */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Sizes &amp; States
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-background rounded-lg p-6 space-y-3"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Size tokens
            </div>
            <ModusTimeInput label="Small" size="sm" />
            <ModusTimeInput label="Medium" size="md" />
            <ModusTimeInput label="Large" size="lg" />
          </div>
          <div
            className="bg-background rounded-lg p-6 space-y-3"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Disabled &amp; read only
            </div>
            <ModusTimeInput label="Disabled" value="10:15" disabled />
            <ModusTimeInput label="Read only" value="12:45" readOnly />
          </div>
          <div
            className="bg-background rounded-lg p-6 space-y-3"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Required with feedback
            </div>
            <ModusTimeInput
              label="Departure"
              required
              feedback={{
                level: "info",
                message: "Please select a departure time",
              }}
            />
          </div>
        </div>
      </div>

      {/* Event log */}
      <div
        className="p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-4">
          Interaction Log
        </div>
        <div className="text-sm text-foreground opacity-70 mb-4">
          Captures `inputChange` events from the controlled time inputs above.
        </div>
        <div
          className="bg-background rounded-lg p-4 min-h-40"
          style={{ border: "1px solid var(--border)" }}
        >
          {eventLog.length === 0 ? (
            <div className="text-sm text-foreground opacity-60">
              Adjust any time input above to populate the log.
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
  );
}
