"use client";

import ModusInputFeedback from "../components/ModusInputFeedback";

export default function InputFeedbackDemo() {
  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
  const levels: Array<"error" | "info" | "success" | "warning"> = [
    "error",
    "info",
    "success",
    "warning",
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Input Feedback Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80">
          Contextual feedback for form fields with error messages, success
          confirmations, warnings, and informational tips
        </div>
      </div>

      {/* Basic Usage */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Basic Usage
        </div>
        <div className="space-y-4">
          <ModusInputFeedback level="error" message="This field is required" />
          <ModusInputFeedback
            level="info"
            message="This information will be kept private"
          />
          <ModusInputFeedback
            level="success"
            message="Changes saved successfully!"
          />
          <ModusInputFeedback
            level="warning"
            message="Please review your input"
          />
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Four feedback levels: error, info, success, warning
        </div>
      </div>

      {/* Size Variations */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Size Variations
        </div>
        <div className="space-y-6">
          {levels.map((level) => (
            <div key={level}>
              <div className="text-lg font-medium text-foreground mb-3 capitalize">
                {level} Level
              </div>
              <div className="flex items-center gap-6">
                {sizes.map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <ModusInputFeedback
                      level={level}
                      size={size}
                      message={`${size} ${level} message`}
                    />
                    <div className="text-sm text-foreground opacity-70">
                      {size}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Icons */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Custom Icons
        </div>
        <div className="space-y-4">
          <ModusInputFeedback
            level="success"
            icon="calendar_check"
            message="Event added to calendar!"
          />
          <ModusInputFeedback
            level="info"
            icon="help"
            message="Click here for more information"
          />
          <ModusInputFeedback
            level="warning"
            icon="clock_delay_warning"
            message="This action may take a few minutes"
          />
          <ModusInputFeedback
            level="error"
            icon="cancel_circle"
            message="Unable to process your request"
          />
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Override default icons with any Modus icon name
        </div>
      </div>

      {/* Integration Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Integration Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              With Text Input
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-3 rounded bg-background text-foreground"
                style={{ border: "1px solid var(--border)" }}
              />
              <ModusInputFeedback
                level="error"
                message="Please enter a valid email address"
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              With Password Input
            </div>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded bg-background text-foreground"
                style={{ border: "1px solid var(--border)" }}
              />
              <ModusInputFeedback
                level="success"
                message="Password meets all requirements"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Validation Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Form Validation Examples
        </div>
        <div className="space-y-6">
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Username Field
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Choose a username"
                className="w-full p-3 rounded bg-background text-foreground"
                style={{ border: "1px solid var(--border)" }}
              />
              <ModusInputFeedback
                level="info"
                message="Username must be 3-20 characters long"
                size="sm"
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Email Field
            </div>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded bg-background text-foreground"
                style={{ border: "1px solid var(--border)" }}
              />
              <ModusInputFeedback
                level="warning"
                message="Email address already exists"
                size="sm"
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Password Field
            </div>
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-3 rounded bg-background text-foreground"
                style={{ border: "1px solid var(--border)" }}
              />
              <ModusInputFeedback
                level="success"
                message="Strong password! All requirements met"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
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
              {`<ModusInputFeedback level="error" message="This field is required" />`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              With Custom Icon and Size
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusInputFeedback 
  level="success" 
  icon="calendar_check" 
  message="Event added to calendar!" 
  size="lg"
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              All Feedback Levels
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusInputFeedback level="error" message="Error message" />
<ModusInputFeedback level="warning" message="Warning message" />
<ModusInputFeedback level="info" message="Info message" />
<ModusInputFeedback level="success" message="Success message" />`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
