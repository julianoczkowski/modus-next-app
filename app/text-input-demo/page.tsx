"use client";

import { useState } from "react";
import ModusTextInput from "../components/ModusTextInput";
import ModusInputLabel from "../components/ModusInputLabel";

export default function TextInputDemo() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    search: "",
    phone: "",
    website: "",
  });

  const [validation, setValidation] = useState({
    username: {
      level: "info" as "info" | "warning" | "error" | "success",
      message: "Username must be 3-20 characters",
    },
    email: {
      level: "info" as "info" | "warning" | "error" | "success",
      message: "Enter a valid email address",
    },
    password: {
      level: "info" as "info" | "warning" | "error" | "success",
      message: "Password must be at least 8 characters",
    },
  });

  const handleInputChange =
    (field: string) => (event: CustomEvent<InputEvent>) => {
      const value = (event.target as HTMLInputElement).value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Simple validation examples
      if (field === "username") {
        if (value.length === 0) {
          setValidation((prev) => ({
            ...prev,
            username: { level: "info", message: "Username is required" },
          }));
        } else if (value.length < 3) {
          setValidation((prev) => ({
            ...prev,
            username: {
              level: "warning",
              message: "Username must be at least 3 characters",
            },
          }));
        } else if (value.length > 20) {
          setValidation((prev) => ({
            ...prev,
            username: {
              level: "error",
              message: "Username must be 20 characters or less",
            },
          }));
        } else {
          setValidation((prev) => ({
            ...prev,
            username: { level: "success", message: "Username looks good!" },
          }));
        }
      }

      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.length === 0) {
          setValidation((prev) => ({
            ...prev,
            email: { level: "info", message: "Email is required" },
          }));
        } else if (!emailRegex.test(value)) {
          setValidation((prev) => ({
            ...prev,
            email: {
              level: "error",
              message: "Please enter a valid email address",
            },
          }));
        } else {
          setValidation((prev) => ({
            ...prev,
            email: { level: "success", message: "Email format is valid" },
          }));
        }
      }

      if (field === "password") {
        if (value.length === 0) {
          setValidation((prev) => ({
            ...prev,
            password: { level: "info", message: "Password is required" },
          }));
        } else if (value.length < 8) {
          setValidation((prev) => ({
            ...prev,
            password: {
              level: "warning",
              message: "Password must be at least 8 characters",
            },
          }));
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          setValidation((prev) => ({
            ...prev,
            password: {
              level: "warning",
              message:
                "Password should contain uppercase, lowercase, and numbers",
            },
          }));
        } else {
          setValidation((prev) => ({
            ...prev,
            password: { level: "success", message: "Strong password!" },
          }));
        }
      }
    };

  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
  const inputTypes = [
    { type: "text", label: "Text", placeholder: "Enter text" },
    { type: "email", label: "Email", placeholder: "Enter email address" },
    { type: "password", label: "Password", placeholder: "Enter password" },
    { type: "search", label: "Search", placeholder: "Search..." },
    { type: "url", label: "URL", placeholder: "https://example.com" },
    { type: "tel", label: "Phone", placeholder: "(555) 123-4567" },
    { type: "number", label: "Number", placeholder: "Enter a number" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Text Input Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80">
          Single-line text fields with various types, validation feedback, and
          interactive features
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ModusTextInput
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onInputChange={handleInputChange("username")}
            />
          </div>
          <div>
            <ModusTextInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onInputChange={handleInputChange("email")}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Basic text inputs with labels and placeholders
        </div>
      </div>

      {/* Input Types */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Input Types
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputTypes.map(({ type, label, placeholder }) => (
            <div key={type}>
              <ModusTextInput
                label={label}
                type={
                  type as
                    | "text"
                    | "email"
                    | "password"
                    | "search"
                    | "url"
                    | "tel"
                    | "number"
                }
                placeholder={placeholder}
                size="md"
              />
            </div>
          ))}
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Different HTML input types with appropriate keyboards and validation
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModusTextInput
                  label={`${size} Text Input`}
                  placeholder={`${size} placeholder`}
                  size={size}
                />
                <ModusTextInput
                  label={`${size} Email Input`}
                  type="email"
                  placeholder={`${size} email`}
                  size={size}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Different sizes: sm (32px), md (40px), lg (48px)
        </div>
      </div>

      {/* Features: Clear and Search Icons */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Clear and Search Icons
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ModusTextInput
              label="Search with Icon"
              type="search"
              placeholder="Search for items..."
              includeSearch
              value={formData.search}
              onInputChange={handleInputChange("search")}
            />
          </div>
          <div>
            <ModusTextInput
              label="Clearable Input"
              placeholder="Type something to clear..."
              includeClear
              value={formData.phone}
              onInputChange={handleInputChange("phone")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <ModusTextInput
              label="Search with Clear"
              type="search"
              placeholder="Search and clear..."
              includeSearch
              includeClear
              value={formData.website}
              onInputChange={handleInputChange("website")}
            />
          </div>
          <div>
            <ModusTextInput
              label="Custom Clear Label"
              placeholder="Custom clear button..."
              includeClear
              clearAriaLabel="Clear this field"
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Inputs with search icons, clear buttons, or both
        </div>
      </div>

      {/* Validation and Feedback */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Validation and Feedback
        </div>
        <div className="space-y-6">
          <div>
            <ModusTextInput
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              feedback={validation.username}
              onInputChange={handleInputChange("username")}
            />
          </div>
          <div>
            <ModusTextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              feedback={validation.email}
              onInputChange={handleInputChange("email")}
            />
          </div>
          <div>
            <ModusTextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              feedback={validation.password}
              onInputChange={handleInputChange("password")}
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Real-time validation with dynamic feedback messages
        </div>
      </div>

      {/* Input States */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Input States
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ModusTextInput
              label="Normal State"
              placeholder="Normal input field"
            />
          </div>
          <div>
            <ModusTextInput
              label="Disabled State"
              placeholder="This field is disabled"
              disabled
            />
          </div>
          <div>
            <ModusTextInput
              label="Read Only State"
              placeholder="This field is read only"
              readOnly
              value="Read only value"
            />
          </div>
          <div>
            <ModusTextInput
              label="Required Field"
              placeholder="This field is required"
              required
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Different input states: normal, disabled, read-only, required
        </div>
      </div>

      {/* Mobile Optimization */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Mobile Optimization
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ModusTextInput
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              inputMode="tel"
              enterkeyhint="done"
            />
          </div>
          <div>
            <ModusTextInput
              label="Email (Mobile)"
              type="email"
              placeholder="Enter email"
              inputMode="email"
              autoComplete="email"
              enterkeyhint="next"
            />
          </div>
          <div>
            <ModusTextInput
              label="Numeric Input"
              type="number"
              placeholder="Enter number"
              inputMode="numeric"
              enterkeyhint="done"
            />
          </div>
          <div>
            <ModusTextInput
              label="Search (Mobile)"
              type="search"
              placeholder="Search..."
              inputMode="search"
              enterkeyhint="search"
              includeSearch
            />
          </div>
        </div>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Mobile-optimized inputs with appropriate keyboards and autocomplete
        </div>
      </div>

      {/* Form Integration */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Form Integration
        </div>
        <form className="space-y-6">
          <div>
            <ModusInputLabel
              forId="form-username"
              labelText="Username"
              required
            />
            <ModusTextInput
              inputId="form-username"
              name="username"
              placeholder="Enter your username"
              required
              maxLength={20}
              minLength={3}
            />
          </div>
          <div>
            <ModusInputLabel
              forId="form-email"
              labelText="Email Address"
              required
            />
            <ModusTextInput
              inputId="form-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <ModusInputLabel
              forId="form-password"
              labelText="Password"
              required
            />
            <ModusTextInput
              inputId="form-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <div>
            <ModusInputLabel
              forId="form-website"
              labelText="Website (Optional)"
            />
            <ModusTextInput
              inputId="form-website"
              name="website"
              type="url"
              placeholder="https://example.com"
              autoComplete="url"
            />
          </div>
        </form>
        <div className="text-sm text-foreground opacity-70 mt-4">
          Complete form with labels, validation, and proper form attributes
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
              Basic Text Input
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusTextInput 
  label="Username" 
  placeholder="Enter your username" 
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              With Validation
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusTextInput 
  label="Email" 
  type="email" 
  feedback={{ level: "error", message: "Invalid email" }}
  required 
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              With Icons
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusTextInput 
  type="search" 
  includeSearch 
  includeClear 
  placeholder="Search..." 
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground mb-2">
              Mobile Optimized
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono text-foreground">
              {`<ModusTextInput 
  type="tel" 
  inputMode="tel" 
  enterkeyhint="done" 
  autoComplete="tel" 
/>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
