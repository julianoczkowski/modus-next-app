"use client";

import { useState, useCallback } from "react";
import ModusDate, { InputFeedbackProp } from "../components/ModusDate";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface EventLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function DateDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [dateValues, setDateValues] = useState<Record<string, string>>({
    basic: "",
    required: "",
    range: "",
    feedback: "",
    form: "",
    disabled: "2025-06-14",
  });

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

  const handleDateChange = useCallback(
    (dateId: string) => (event: CustomEvent<InputEvent>) => {
      const target = event.target as HTMLModusWcDateElement;
      const newValue = target.value;
      setDateValues((prev) => ({
        ...prev,
        [dateId]: newValue,
      }));
      logEvent(`Date "${dateId}" changed to ${newValue || "empty"}`, "info");
    },
    [logEvent]
  );

  const handleDateFocus = useCallback(
    (dateId: string) => () => {
      logEvent(`Date "${dateId}" focused`, "info");
    },
    [logEvent]
  );

  const handleDateBlur = useCallback(
    (dateId: string) => () => {
      logEvent(`Date "${dateId}" blurred`, "info");
    },
    [logEvent]
  );

  const sizes: Array<{
    value: "sm" | "md" | "lg";
    label: string;
    description: string;
  }> = [
    { value: "sm", label: "Small", description: "32px height" },
    { value: "md", label: "Medium", description: "40px height (default)" },
    { value: "lg", label: "Large", description: "48px height" },
  ];

  const resetAllDates = () => {
    setDateValues({
      basic: "",
      required: "",
      range: "",
      feedback: "",
      form: "",
      disabled: "2025-06-14",
    });
    logEvent("All dates reset", "info");
  };

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setDateValues((prev) => ({
      ...prev,
      basic: today,
      required: today,
      range: today,
    }));
    logEvent("All dates set to today", "success");
  };

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Date Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Date component with different configurations,
          validation, and form integration patterns.
        </p>
      </div>

      {/* Basic Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Date Examples
        </div>
        <p className="text-foreground mb-6">
          Simple date pickers with different configurations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ModusDate
              label="Basic Date"
              value={dateValues.basic}
              onInputChange={handleDateChange("basic")}
              onInputFocus={handleDateFocus("basic")}
              onInputBlur={handleDateBlur("basic")}
            />
          </div>
          <div>
            <ModusDate
              label="Required Date"
              required
              value={dateValues.required}
              onInputChange={handleDateChange("required")}
              onInputFocus={handleDateFocus("required")}
              onInputBlur={handleDateBlur("required")}
            />
          </div>
          <div>
            <ModusDate
              label="Disabled Date"
              disabled
              value={dateValues.disabled}
            />
          </div>
          <div>
            <ModusDate label="Read Only Date" readOnly value={today} />
          </div>
        </div>
      </div>

      {/* Size Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Size Variants
        </div>
        <p className="text-foreground mb-6">
          Different date picker sizes for various contexts and importance
          levels.
        </p>
        <div className="space-y-4">
          {sizes.map((size) => (
            <div key={size.value}>
              <h4 className="text-lg font-semibold mb-3 text-foreground">
                {size.label} ({size.description})
              </h4>
              <div className="max-w-xs">
                <ModusDate
                  size={size.value}
                  label={`${size.label} Date Picker`}
                  value={dateValues[`${size.value}-size`] || ""}
                  onInputChange={handleDateChange(`${size.value}-size`)}
                  onInputFocus={handleDateFocus(`${size.value}-size`)}
                  onInputBlur={handleDateBlur(`${size.value}-size`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date Range Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Date Range Examples
        </div>
        <p className="text-foreground mb-6">
          Date pickers with minimum and maximum date restrictions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ModusDate
              label="Today and Future Only"
              min={today}
              value={dateValues.range}
              onInputChange={handleDateChange("range")}
              onInputFocus={handleDateFocus("range")}
              onInputBlur={handleDateBlur("range")}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Minimum date: {today}
            </p>
          </div>
          <div>
            <ModusDate
              label="Next 30 Days Only"
              min={tomorrow}
              max={nextMonth}
              value={dateValues["range-30"] || ""}
              onInputChange={handleDateChange("range-30")}
              onInputFocus={handleDateFocus("range-30")}
              onInputBlur={handleDateBlur("range-30")}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Range: {tomorrow} to {nextMonth}
            </p>
          </div>
          <div>
            <ModusDate
              label="This Week Only"
              min={today}
              max={nextWeek}
              value={dateValues["range-week"] || ""}
              onInputChange={handleDateChange("range-week")}
              onInputFocus={handleDateFocus("range-week")}
              onInputBlur={handleDateBlur("range-week")}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Range: {today} to {nextWeek}
            </p>
          </div>
          <div>
            <ModusDate
              label="Past Dates Only"
              max={today}
              value={dateValues["range-past"] || ""}
              onInputChange={handleDateChange("range-past")}
              onInputFocus={handleDateFocus("range-past")}
              onInputBlur={handleDateBlur("range-past")}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Maximum date: {today}
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Feedback Examples
        </div>
        <p className="text-foreground mb-6">
          Date pickers with different feedback states and messages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ModusDate
              label="Error State"
              required
              feedback={{
                level: "error",
                message: "Please select a valid date.",
              }}
              value={dateValues.feedback}
              onInputChange={handleDateChange("feedback")}
              onInputFocus={handleDateFocus("feedback")}
              onInputBlur={handleDateBlur("feedback")}
            />
          </div>
          <div>
            <ModusDate
              label="Success State"
              feedback={{
                level: "success",
                message: "Date selected successfully!",
              }}
              value={dateValues["feedback-success"] || ""}
              onInputChange={handleDateChange("feedback-success")}
              onInputFocus={handleDateFocus("feedback-success")}
              onInputBlur={handleDateBlur("feedback-success")}
            />
          </div>
          <div>
            <ModusDate
              label="Warning State"
              feedback={{
                level: "warning",
                message: "This date is approaching the deadline.",
              }}
              value={dateValues["feedback-warning"] || ""}
              onInputChange={handleDateChange("feedback-warning")}
              onInputFocus={handleDateFocus("feedback-warning")}
              onInputBlur={handleDateBlur("feedback-warning")}
            />
          </div>
          <div>
            <ModusDate
              label="Info State"
              feedback={{
                level: "info",
                message: "Select a date within the next 30 days.",
              }}
              value={dateValues["feedback-info"] || ""}
              onInputChange={handleDateChange("feedback-info")}
              onInputFocus={handleDateFocus("feedback-info")}
              onInputBlur={handleDateBlur("feedback-info")}
            />
          </div>
        </div>
      </div>

      {/* Form Integration */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Form Integration
        </div>
        <p className="text-foreground mb-6">
          Date pickers integrated into forms with proper naming and validation.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const formObject = Object.fromEntries(formData.entries());
            logEvent("Form submitted with date values", "success");
            console.log("Form data:", formObject);
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ModusDate
                label="Start Date"
                name="startDate"
                required
                min={today}
                value={dateValues.form}
                onInputChange={handleDateChange("form")}
                onInputFocus={handleDateFocus("form")}
                onInputBlur={handleDateBlur("form")}
              />
            </div>
            <div>
              <ModusDate
                label="End Date"
                name="endDate"
                required
                min={dateValues.form || today}
                value={dateValues["form-end"] || ""}
                onInputChange={handleDateChange("form-end")}
                onInputFocus={handleDateFocus("form-end")}
                onInputBlur={handleDateBlur("form-end")}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ModusDate
                label="Birth Date"
                name="birthDate"
                max={today}
                value={dateValues["form-birth"] || ""}
                onInputChange={handleDateChange("form-birth")}
                onInputFocus={handleDateFocus("form-birth")}
                onInputBlur={handleDateBlur("form-birth")}
              />
            </div>
            <div>
              <ModusDate
                label="Appointment Date"
                name="appointmentDate"
                required
                min={tomorrow}
                value={dateValues["form-appointment"] || ""}
                onInputChange={handleDateChange("form-appointment")}
                onInputFocus={handleDateFocus("form-appointment")}
                onInputBlur={handleDateBlur("form-appointment")}
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
              onButtonClick={resetAllDates}
            >
              Reset Form
            </ModusWcButton>
          </div>
        </form>
      </div>

      {/* Real-world Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Real-world Examples
        </div>
        <p className="text-foreground mb-6">
          Common date picker patterns used in applications.
        </p>
        <div className="space-y-8">
          {/* Event Planning */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Event Planning
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ModusDate
                  label="Event Date"
                  name="eventDate"
                  required
                  min={tomorrow}
                  value={dateValues["event-date"] || ""}
                  onInputChange={handleDateChange("event-date")}
                  feedback={{
                    level: "info",
                    message: "Select a date in the future for your event.",
                  }}
                />
              </div>
              <div>
                <ModusDate
                  label="Registration Deadline"
                  name="deadline"
                  required
                  min={today}
                  max={nextMonth}
                  value={dateValues["event-deadline"] || ""}
                  onInputChange={handleDateChange("event-deadline")}
                  feedback={{
                    level: "warning",
                    message: "Registration closes 7 days before the event.",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Project Management */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Project Management
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ModusDate
                  label="Project Start"
                  name="projectStart"
                  required
                  min={today}
                  value={dateValues["project-start"] || ""}
                  onInputChange={handleDateChange("project-start")}
                />
              </div>
              <div>
                <ModusDate
                  label="Project Deadline"
                  name="projectDeadline"
                  required
                  min={dateValues["project-start"] || today}
                  value={dateValues["project-deadline"] || ""}
                  onInputChange={handleDateChange("project-deadline")}
                  feedback={{
                    level: "error",
                    message: "Deadline must be after the start date.",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ModusDate
                  label="Date of Birth"
                  name="dateOfBirth"
                  required
                  max={today}
                  value={dateValues["personal-birth"] || ""}
                  onInputChange={handleDateChange("personal-birth")}
                />
              </div>
              <div>
                <ModusDate
                  label="License Expiry"
                  name="licenseExpiry"
                  min={today}
                  value={dateValues["personal-license"] || ""}
                  onInputChange={handleDateChange("personal-license")}
                  feedback={{
                    level: "warning",
                    message: "License expires soon. Please renew.",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Controls
        </div>
        <p className="text-foreground mb-6">
          Control date values programmatically.
        </p>
        <div className="flex gap-4 mb-6">
          <ModusWcButton color="primary" onButtonClick={setToday}>
            <i className="modus-icons mr-2">today</i>
            Set to Today
          </ModusWcButton>
          <ModusWcButton color="secondary" onButtonClick={resetAllDates}>
            <i className="modus-icons mr-2">refresh</i>
            Reset All
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              Current Values
            </h4>
            <div className="space-y-2 text-sm">
              {Object.entries(dateValues).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-foreground capitalize">{key}:</span>
                  <span className="font-mono text-muted-foreground">
                    {value || "empty"}
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
                  Object.entries(dateValues).filter(([key]) =>
                    [
                      "form",
                      "form-end",
                      "form-birth",
                      "form-appointment",
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
              Interact with the date pickers to see events logged here...
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
              {`<ModusDate
  label="Select Date"
  onInputChange={handleChange}
/>`}
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusDate
  label="Required Date"
  required
  min="2025-01-01"
  max="2025-12-31"
  feedback={{
    level: "error",
    message: "Please select a valid date."
  }}
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
