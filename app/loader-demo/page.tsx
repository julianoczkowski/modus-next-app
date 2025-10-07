"use client";

import ModusLoader from "../components/ModusLoader";

export default function LoaderDemo() {
  const variants: Array<
    "spinner" | "ball" | "bars" | "dots" | "infinity" | "ring"
  > = ["spinner", "ball", "bars", "dots", "infinity", "ring"];

  const colors: Array<
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral"
  > = [
    "primary",
    "secondary",
    "accent",
    "success",
    "warning",
    "error",
    "info",
    "neutral",
  ];

  const sizes: Array<"xs" | "sm" | "md" | "lg"> = ["xs", "sm", "md", "lg"];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Loader Component Demo
        </div>
        <p className="text-lg text-foreground opacity-80">
          Visual indicators for loading states with 6 animation variants, 4
          sizes, and 8 color options
        </p>
      </div>

      {/* Basic Usage */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Basic Usage
        </div>
        <div className="flex items-center justify-center gap-8">
          <ModusLoader />
          <ModusLoader variant="ball" />
          <ModusLoader variant="bars" />
          <ModusLoader variant="dots" />
          <ModusLoader variant="infinity" />
          <ModusLoader variant="ring" />
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4 text-center">
          Default loader (spinner) and all 6 animation variants
        </div>
      </div>

      {/* All Variants */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          All Animation Variants
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-3">
              <ModusLoader variant={variant} size="lg" />
              <div className="text-sm text-foreground opacity-70 capitalize text-center">
                {variant}
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4 text-center">
          6 different animation styles: spinner, ball, bars, dots, infinity,
          ring
        </div>
      </div>

      {/* Size Variations */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Size Variations
        </div>
        <div className="space-y-8">
          {variants.map((variant) => (
            <div key={variant}>
              <div className="text-lg font-medium text-foreground mb-4 capitalize">
                {variant} Variant
              </div>
              <div className="flex items-center justify-center gap-8">
                {sizes.map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <ModusLoader variant={variant} size={size} />
                    <div className="text-xs text-foreground opacity-70">
                      {size}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4 text-center">
          Size tokens: xs (16px), sm (20px), md (24px), lg (32px)
        </div>
      </div>

      {/* Color Variations */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Color Variations
        </div>
        <div className="space-y-8">
          {variants.map((variant) => (
            <div key={variant}>
              <div className="text-lg font-medium text-foreground mb-4 capitalize">
                {variant} Variant
              </div>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {colors.map((color) => (
                  <div key={color} className="flex flex-col items-center gap-2">
                    <ModusLoader variant={variant} color={color} size="md" />
                    <div className="text-xs text-foreground opacity-70 capitalize">
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4 text-center">
          8 theme-aware colors: primary, secondary, accent, success, warning,
          error, info, neutral
        </div>
      </div>

      {/* Usage Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Usage Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Button Loading State
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded flex items-center gap-2"
                disabled
              >
                <ModusLoader size="sm" color="primary" />
                Loading...
              </button>
              <button
                className="px-4 py-2 bg-success text-primary-foreground rounded flex items-center gap-2"
                disabled
              >
                <ModusLoader size="sm" color="success" />
                Saving...
              </button>
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Page Loading State
            </div>
            <div className="flex flex-col items-center gap-4 p-6 bg-muted rounded">
              <ModusLoader variant="infinity" size="lg" color="primary" />
              <div className="text-foreground">Loading content...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading States */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Loading States
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-muted rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <ModusLoader variant="spinner" size="sm" color="primary" />
              <div className="text-foreground font-medium">
                Processing Request
              </div>
            </div>
            <div className="text-sm text-foreground opacity-70">
              Your request is being processed...
            </div>
          </div>
          <div className="p-6 bg-muted rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <ModusLoader variant="dots" size="sm" color="info" />
              <div className="text-foreground font-medium">Uploading File</div>
            </div>
            <div className="text-sm text-foreground opacity-70">
              Please wait while your file uploads...
            </div>
          </div>
          <div className="p-6 bg-muted rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <ModusLoader variant="bars" size="sm" color="success" />
              <div className="text-foreground font-medium">Saving Changes</div>
            </div>
            <div className="text-sm text-foreground opacity-70">
              Your changes are being saved...
            </div>
          </div>
          <div className="p-6 bg-muted rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <ModusLoader variant="ball" size="sm" color="warning" />
              <div className="text-foreground font-medium">Validating Data</div>
            </div>
            <div className="text-sm text-foreground opacity-70">
              Checking your input for errors...
            </div>
          </div>
          <div className="p-6 bg-muted rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <ModusLoader variant="ring" size="sm" color="accent" />
              <div className="text-foreground font-medium">Connecting</div>
            </div>
            <div className="text-sm text-foreground opacity-70">
              Establishing connection...
            </div>
          </div>
          <div className="p-6 bg-muted rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <ModusLoader variant="infinity" size="sm" color="error" />
              <div className="text-foreground font-medium">Retrying</div>
            </div>
            <div className="text-sm text-foreground opacity-70">
              Attempting to reconnect...
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styling */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Custom Styling
        </div>
        <div className="space-y-6">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Custom Size
            </div>
            <div className="flex items-center justify-center gap-6">
              <ModusLoader
                variant="spinner"
                customClass="w-12 h-12"
                ariaLabel="Large custom loader"
              />
              <ModusLoader
                variant="ball"
                customClass="w-16 h-16"
                ariaLabel="Extra large custom loader"
              />
              <ModusLoader
                variant="infinity"
                customClass="w-20 h-20"
                ariaLabel="Huge custom loader"
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Custom Colors
            </div>
            <div className="flex items-center justify-center gap-6">
              <ModusLoader
                variant="spinner"
                customClass="text-purple-500"
                ariaLabel="Purple loader"
              />
              <ModusLoader
                variant="dots"
                customClass="text-pink-500"
                ariaLabel="Pink loader"
              />
              <ModusLoader
                variant="ring"
                customClass="text-cyan-500"
                ariaLabel="Cyan loader"
              />
            </div>
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4 text-center">
          Custom sizing and colors using CSS classes
        </div>
      </div>

      {/* Accessibility Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Accessibility Examples
        </div>
        <div className="space-y-6">
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Descriptive Labels
            </div>
            <div className="flex items-center justify-center gap-6">
              <ModusLoader variant="spinner" ariaLabel="Loading user profile" />
              <ModusLoader variant="bars" ariaLabel="Uploading document" />
              <ModusLoader variant="dots" ariaLabel="Processing payment" />
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-4">
              Context-Aware Labels
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded">
                <div className="flex items-center gap-3 mb-2">
                  <ModusLoader size="sm" ariaLabel="Loading search results" />
                  <span className="text-foreground">Searching...</span>
                </div>
                <div className="text-sm text-foreground opacity-70">
                  Finding matches for your query
                </div>
              </div>
              <div className="p-4 bg-muted rounded">
                <div className="flex items-center gap-3 mb-2">
                  <ModusLoader size="sm" ariaLabel="Saving form data" />
                  <span className="text-foreground">Saving...</span>
                </div>
                <div className="text-sm text-foreground opacity-70">
                  Your changes are being saved
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4 text-center">
          Always provide descriptive aria-label attributes for screen readers
        </div>
      </div>

      {/* Performance Note */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Performance
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Multiple Loaders
            </div>
            <div className="flex items-center justify-center gap-4">
              <ModusLoader variant="spinner" size="sm" />
              <ModusLoader variant="ball" size="sm" />
              <ModusLoader variant="bars" size="sm" />
              <ModusLoader variant="dots" size="sm" />
              <ModusLoader variant="infinity" size="sm" />
              <ModusLoader variant="ring" size="sm" />
            </div>
            <div className="text-sm text-foreground opacity-70 mt-2">
              Pure CSS animations - minimal performance impact
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-3">
              Layout Integration
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded">
              <div className="text-foreground">Processing items...</div>
              <ModusLoader variant="spinner" size="sm" />
            </div>
            <div className="text-sm text-foreground opacity-70 mt-2">
              Inline-block elements - easy to align and position
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
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
              {`<ModusLoader />`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              With Variant and Size
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusLoader variant="dots" size="lg" />`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              With Color and Custom Class
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusLoader 
  variant="infinity" 
  color="success" 
  customClass="w-16 h-16"
  ariaLabel="Loading data"
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              All Variants
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusLoader variant="spinner" />
<ModusLoader variant="ball" />
<ModusLoader variant="bars" />
<ModusLoader variant="dots" />
<ModusLoader variant="infinity" />
<ModusLoader variant="ring" />`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
