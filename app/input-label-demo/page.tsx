"use client";

import ModusInputLabel from "../components/ModusInputLabel";
import ModusIcon from "../components/ModusIcon";

export default function InputLabelDemo() {
  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Input Label Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80">
          Labels for form controls with optional sub-label text, required field
          indicators, and custom content
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
          <div>
            <ModusInputLabel labelText="Username" />
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel labelText="Email Address" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Simple labels for form controls
        </div>
      </div>

      {/* Linked Labels */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Linked Labels
        </div>
        <div className="space-y-4">
          <div>
            <ModusInputLabel forId="username-field" labelText="Username" />
            <input
              id="username-field"
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel forId="email-field" labelText="Email Address" />
            <input
              id="email-field"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Labels linked to inputs via for-id (clicking label focuses input)
        </div>
      </div>

      {/* Required Fields */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Required Fields
        </div>
        <div className="space-y-4">
          <div>
            <ModusInputLabel
              forId="required-username"
              labelText="Username"
              required
            />
            <input
              id="required-username"
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="required-email"
              labelText="Email Address"
              required
            />
            <input
              id="required-email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="required-password"
              labelText="Password"
              required
            />
            <input
              id="required-password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Required fields show an asterisk (*) indicator
        </div>
      </div>

      {/* Sub-labels */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Sub-labels
        </div>
        <div className="space-y-4">
          <div>
            <ModusInputLabel
              forId="password-with-hint"
              labelText="Password"
              subLabelText="At least 8 characters with numbers and symbols"
              required
            />
            <input
              id="password-with-hint"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="phone-with-format"
              labelText="Phone Number"
              subLabelText="Format: (555) 123-4567"
            />
            <input
              id="phone-with-format"
              type="tel"
              placeholder="(555) 123-4567"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="username-with-rules"
              labelText="Username"
              subLabelText="3-20 characters, letters and numbers only"
              required
            />
            <input
              id="username-with-rules"
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Sub-labels provide additional context and instructions
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
          {sizes.map((size) => (
            <div key={size}>
              <div className="text-lg font-medium text-foreground mb-3 capitalize">
                {size} Size
              </div>
              <div className="space-y-2">
                <ModusInputLabel
                  forId={`${size}-input`}
                  labelText={`${size} Label`}
                  subLabelText="This is a sub-label"
                  size={size}
                />
                <input
                  id={`${size}-input`}
                  type="text"
                  placeholder={`${size} input field`}
                  className="w-full p-3 rounded bg-background text-foreground"
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Different sizes: sm, md, lg
        </div>
      </div>

      {/* Custom Content */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Custom Content
        </div>
        <div className="space-y-4">
          <div>
            <ModusInputLabel forId="search-field" labelText="Search">
              <ModusIcon name="search" size="sm" />
            </ModusInputLabel>
            <input
              id="search-field"
              type="search"
              placeholder="Search for items"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel forId="help-field" labelText="Help">
              <ModusIcon name="help" size="sm" />
            </ModusInputLabel>
            <input
              id="help-field"
              type="text"
              placeholder="Get help with this field"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="keyboard-hint"
              labelText="Keyboard Shortcut"
            >
              <div className="text-xs bg-muted px-2 py-1 rounded text-foreground">
                ⌘K
              </div>
            </ModusInputLabel>
            <input
              id="keyboard-hint"
              type="text"
              placeholder="Use ⌘K to focus this field"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Custom content in labels: icons, shortcuts, or other elements
        </div>
      </div>

      {/* Form Example */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Complete Form Example
        </div>
        <div className="space-y-6">
          <div>
            <ModusInputLabel
              forId="form-username"
              labelText="Username"
              subLabelText="Choose a unique username"
              required
            />
            <input
              id="form-username"
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="form-email"
              labelText="Email Address"
              subLabelText="We'll never share your email"
              required
            />
            <input
              id="form-email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="form-password"
              labelText="Password"
              subLabelText="At least 8 characters"
              required
            />
            <input
              id="form-password"
              type="password"
              placeholder="Create a password"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="form-phone"
              labelText="Phone Number (Optional)"
            />
            <input
              id="form-phone"
              type="tel"
              placeholder="(555) 123-4567"
              className="w-full p-3 rounded bg-background text-foreground mt-2"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Complete form with various label configurations
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
              Basic Label
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusInputLabel labelText="Username" />`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              Linked Label
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusInputLabel forId="username" labelText="Username" />
<input id="username" type="text" />`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              Required Field with Sub-label
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusInputLabel 
  forId="password" 
  labelText="Password" 
  subLabelText="At least 8 characters"
  required 
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              Label with Custom Content
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusInputLabel labelText="Search">
  <ModusIcon name="search" size="sm" />
</ModusInputLabel>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
