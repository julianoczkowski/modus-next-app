"use client";

import { useState, useCallback } from "react";
import ModusNumberInput from "../../../app/components/ModusNumberInput";

export default function NumberInputDemo() {
  // State for demo configuration
  const [demoConfig, setDemoConfig] = useState({
    label: "Demo Number Input",
    placeholder: "Enter a number",
    size: "md" as "sm" | "md" | "lg",
    type: "number" as "number" | "range",
    min: "",
    max: "",
    step: "",
    currencySymbol: "",
    disabled: false,
    readOnly: false,
    required: false,
    bordered: true,
    inputMode: "numeric" as "decimal" | "numeric" | "none",
  });

  // Event log for testing
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Event handlers
  const logEvent = useCallback((eventName: string, detail?: unknown) => {
    const timestamp = new Date().toLocaleTimeString();
    const detailStr = detail ? ` - ${JSON.stringify(detail)}` : "";
    const logEntry = `[${timestamp}] ${eventName}${detailStr}`;
    setEventLog((prev) => [logEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  }, []);

  const handleInputFocus = useCallback(
    (event: FocusEvent) => {
      logEvent("inputFocus", {
        target: (event.target as HTMLInputElement)?.id,
      });
    },
    [logEvent]
  );

  const handleInputBlur = useCallback(
    (event: FocusEvent) => {
      logEvent("inputBlur", { target: (event.target as HTMLInputElement)?.id });
    },
    [logEvent]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      logEvent("inputChange", { value });
    },
    [logEvent]
  );

  // Validation state
  const [ageFeedback, setAgeFeedback] = useState({
    level: "info" as "error" | "info" | "success" | "warning",
    message: "Enter your age (18-120)",
  });

  const [priceFeedback, setPriceFeedback] = useState({
    level: "info" as "error" | "info" | "success" | "warning",
    message: "Enter product price ($0.01 - $9,999.99)",
  });

  const [quantityFeedback, setQuantityFeedback] = useState({
    level: "info" as "error" | "info" | "success" | "warning",
    message: "Enter quantity (1-100)",
  });

  // Validation handlers
  const handleAgeChange = useCallback((value: string) => {
    const numValue = parseFloat(value);
    if (value && (numValue < 18 || numValue > 120)) {
      setAgeFeedback({
        level: "error",
        message: "Age must be between 18 and 120",
      });
    } else if (value && numValue >= 18 && numValue <= 120) {
      setAgeFeedback({
        level: "success",
        message: "Valid age entered",
      });
    } else {
      setAgeFeedback({
        level: "info",
        message: "Enter your age (18-120)",
      });
    }
  }, []);

  const handlePriceChange = useCallback((value: string) => {
    const numValue = parseFloat(value);
    if (value && (numValue < 0.01 || numValue > 9999.99)) {
      setPriceFeedback({
        level: "error",
        message: "Price must be between $0.01 and $9,999.99",
      });
    } else if (value && numValue >= 0.01 && numValue <= 9999.99) {
      setPriceFeedback({
        level: "success",
        message: "Valid price entered",
      });
    } else {
      setPriceFeedback({
        level: "info",
        message: "Enter product price ($0.01 - $9,999.99)",
      });
    }
  }, []);

  const handleQuantityChange = useCallback((value: string) => {
    const numValue = parseInt(value);
    if (value && (numValue < 1 || numValue > 100)) {
      setQuantityFeedback({
        level: "error",
        message: "Quantity must be between 1 and 100",
      });
    } else if (value && numValue >= 1 && numValue <= 100) {
      setQuantityFeedback({
        level: "success",
        message: "Valid quantity entered",
      });
    } else {
      setQuantityFeedback({
        level: "info",
        message: "Enter quantity (1-100)",
      });
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <div className="text-3xl font-bold text-foreground mb-4">
          Modus Number Input Demo
        </div>
        <div className="text-lg text-muted-foreground">
          Interactive demonstration of the Modus Number Input component with
          validation, currency support, range sliders, and comprehensive
          configuration options.
        </div>
      </div>

      {/* Interactive Demo */}
      <div
        className="mb-8 p-6 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-xl font-semibold text-foreground mb-4">
          Interactive Demo
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demo Input */}
          <div>
            <ModusNumberInput
              label={demoConfig.label}
              placeholder={demoConfig.placeholder}
              size={demoConfig.size}
              type={demoConfig.type}
              min={demoConfig.min ? parseFloat(demoConfig.min) : undefined}
              max={demoConfig.max ? parseFloat(demoConfig.max) : undefined}
              step={demoConfig.step ? parseFloat(demoConfig.step) : undefined}
              currencySymbol={demoConfig.currencySymbol || undefined}
              disabled={demoConfig.disabled}
              readOnly={demoConfig.readOnly}
              required={demoConfig.required}
              bordered={demoConfig.bordered}
              inputMode={demoConfig.inputMode}
              onInputFocus={handleInputFocus}
              onInputBlur={handleInputBlur}
              onInputChange={handleInputChange}
              ariaLabel="Interactive demo number input"
            />
          </div>

          {/* Configuration Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={demoConfig.label}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      label: e.target.value,
                    }))
                  }
                  className="w-full p-2 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={demoConfig.placeholder}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      placeholder: e.target.value,
                    }))
                  }
                  className="w-full p-2 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Size
                </label>
                <select
                  value={demoConfig.size}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      size: e.target.value as "sm" | "md" | "lg",
                    }))
                  }
                  className="w-full p-2 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type
                </label>
                <select
                  value={demoConfig.type}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      type: e.target.value as "number" | "range",
                    }))
                  }
                  className="w-full p-2 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <option value="number">Number</option>
                  <option value="range">Range Slider</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Min Value
                </label>
                <input
                  type="number"
                  value={demoConfig.min}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({ ...prev, min: e.target.value }))
                  }
                  placeholder="No minimum"
                  className="w-full p-2 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Max Value
                </label>
                <input
                  type="number"
                  value={demoConfig.max}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({ ...prev, max: e.target.value }))
                  }
                  placeholder="No maximum"
                  className="w-full p-2 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Step
                </label>
                <input
                  type="number"
                  value={demoConfig.step}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({ ...prev, step: e.target.value }))
                  }
                  placeholder="Default step"
                  step="0.01"
                  className="w-full p-2 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  value={demoConfig.currencySymbol}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      currencySymbol: e.target.value,
                    }))
                  }
                  placeholder="e.g., $, €, £"
                  className="w-full p-2 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={demoConfig.disabled}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      disabled: e.target.checked,
                    }))
                  }
                />
                <div className="text-foreground">Disabled</div>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={demoConfig.readOnly}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      readOnly: e.target.checked,
                    }))
                  }
                />
                <div className="text-foreground">Read-only</div>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={demoConfig.required}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      required: e.target.checked,
                    }))
                  }
                />
                <div className="text-foreground">Required</div>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={demoConfig.bordered}
                  onChange={(e) =>
                    setDemoConfig((prev) => ({
                      ...prev,
                      bordered: e.target.checked,
                    }))
                  }
                />
                <div className="text-foreground">Bordered</div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Usage Examples */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Basic Usage Examples
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Simple Number Input
            </div>
            <ModusNumberInput
              label="Quantity"
              placeholder="Enter quantity"
              ariaLabel="Quantity input"
            />
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              With Min/Max/Step
            </div>
            <ModusNumberInput
              label="Score (0-100)"
              min={0}
              max={100}
              step={10}
              value="50"
              placeholder="Enter score"
              ariaLabel="Score input with constraints"
            />
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Decimal Numbers
            </div>
            <ModusNumberInput
              label="Weight (kg)"
              step={0.1}
              min={0}
              placeholder="0.0"
              inputMode="decimal"
              ariaLabel="Weight input with decimals"
            />
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Required Field
            </div>
            <ModusNumberInput
              label="Age"
              min={18}
              max={120}
              required
              placeholder="Enter your age"
              ariaLabel="Required age input"
            />
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Currency Support
            </div>
            <ModusNumberInput
              label="Price (USD)"
              currencySymbol="$"
              step={0.01}
              min={0}
              placeholder="0.00"
              inputMode="decimal"
              ariaLabel="Price in US dollars"
            />
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Range Slider
            </div>
            <ModusNumberInput
              label="Volume"
              type="range"
              min={0}
              max={11}
              step={1}
              value="5"
              ariaLabel="Volume control slider"
            />
          </div>
        </div>
      </div>

      {/* Size Comparison */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Size Comparison
        </div>

        <div className="space-y-4 max-w-md">
          <ModusNumberInput
            label="Small Number Input"
            size="sm"
            placeholder="Small size"
            ariaLabel="Small number input"
          />
          <ModusNumberInput
            label="Medium Number Input (Default)"
            size="md"
            placeholder="Medium size"
            ariaLabel="Medium number input"
          />
          <ModusNumberInput
            label="Large Number Input"
            size="lg"
            placeholder="Large size"
            ariaLabel="Large number input"
          />
        </div>
      </div>

      {/* States */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Different States
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Normal State
            </div>
            <ModusNumberInput
              label="Normal Input"
              placeholder="Enter number"
              ariaLabel="Normal number input"
            />
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Disabled State
            </div>
            <ModusNumberInput
              label="Disabled Input"
              value="123"
              disabled
              ariaLabel="Disabled number input"
            />
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Read-only State
            </div>
            <ModusNumberInput
              label="Read-only Input"
              value="456"
              readOnly
              ariaLabel="Read-only number input"
            />
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Borderless
            </div>
            <ModusNumberInput
              label="Borderless Input"
              bordered={false}
              placeholder="No border"
              ariaLabel="Borderless number input"
            />
          </div>
        </div>
      </div>

      {/* Validation & Feedback */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Validation & Feedback
        </div>

        <div className="max-w-2xl space-y-6">
          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-4">
              Real-time Validation Example
            </div>
            <div className="space-y-4">
              <ModusNumberInput
                label="Age"
                min={18}
                max={120}
                required
                placeholder="Enter your age"
                feedback={ageFeedback}
                onInputChange={handleAgeChange}
                ariaLabel="Age validation input"
              />

              <ModusNumberInput
                label="Product Price"
                currencySymbol="$"
                step={0.01}
                min={0.01}
                max={9999.99}
                required
                placeholder="0.00"
                inputMode="decimal"
                feedback={priceFeedback}
                onInputChange={handlePriceChange}
                ariaLabel="Price validation input"
              />

              <ModusNumberInput
                label="Quantity"
                min={1}
                max={100}
                step={1}
                required
                placeholder="Enter quantity"
                inputMode="numeric"
                feedback={quantityFeedback}
                onInputChange={handleQuantityChange}
                ariaLabel="Quantity validation input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Event Log
        </div>
        <div
          className="p-4 bg-muted rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-sm text-muted-foreground mb-2">
            Interact with number inputs to see events...
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {eventLog.length === 0 ? (
              <div className="text-muted-foreground italic">No events yet</div>
            ) : (
              eventLog.map((event, index) => (
                <div key={index} className="text-sm font-mono text-foreground">
                  {event}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Usage Examples
        </div>
        <div className="space-y-4">
          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-2">
              Basic Usage
            </div>
            <div className="text-sm text-muted-foreground overflow-x-auto">
              {`<ModusNumberInput
  label="Quantity"
  placeholder="Enter quantity"
  min={1}
  max={100}
  onInputChange={(value) => console.log('Value:', value)}
/>`}
            </div>
          </div>

          <div
            className="p-4 bg-card rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-lg font-semibold text-foreground mb-2">
              Advanced Usage
            </div>
            <div className="text-sm text-muted-foreground overflow-x-auto">
              {`<ModusNumberInput
  label="Price"
  currencySymbol="$"
  step={0.01}
  min={0.01}
  max={9999.99}
  inputMode="decimal"
  required
  feedback={{
    level: "error",
    message: "Price must be between $0.01 and $9,999.99"
  }}
  onInputChange={handlePriceChange}
/>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
