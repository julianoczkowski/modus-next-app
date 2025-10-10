"use client";

import { useState } from "react";
import ModusBadge from "../components/ModusBadge";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function BadgeDemoPage() {
  const [selectedColor, setSelectedColor] = useState<
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "high-contrast"
  >("primary");
  const [selectedVariant, setSelectedVariant] = useState<
    "filled" | "text" | "counter"
  >("filled");
  const [selectedSize, setSelectedSize] = useState<"sm" | "md" | "lg">("md");

  const colors: Array<{
    value:
      | "primary"
      | "secondary"
      | "tertiary"
      | "success"
      | "warning"
      | "danger"
      | "high-contrast";
    label: string;
    description: string;
  }> = [
    { value: "primary", label: "Primary", description: "Default blue" },
    { value: "secondary", label: "Secondary", description: "Gray" },
    { value: "tertiary", label: "Tertiary", description: "Light gray" },
    { value: "success", label: "Success", description: "Green" },
    { value: "warning", label: "Warning", description: "Yellow" },
    { value: "danger", label: "Danger", description: "Red" },
    {
      value: "high-contrast",
      label: "High Contrast",
      description: "High visibility",
    },
  ];

  const variants: Array<{
    value: "filled" | "text" | "counter";
    label: string;
    description: string;
  }> = [
    { value: "filled", label: "Filled", description: "Solid background" },
    { value: "text", label: "Text", description: "Transparent background" },
    { value: "counter", label: "Counter", description: "Circular indicator" },
  ];

  const sizes: Array<{
    value: "sm" | "md" | "lg";
    label: string;
    description: string;
  }> = [
    { value: "sm", label: "Small", description: "16px height" },
    { value: "md", label: "Medium", description: "20px height" },
    { value: "lg", label: "Large", description: "24px height" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Badge Demo
        </div>
        <div className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Badge component with different colors, variants,
          sizes, and use cases.
        </div>
      </div>

      {/* Color Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Color Variants
        </div>
        <div className="text-foreground mb-6">
          Different badge colors for various statuses and categories.
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {colors.map((color) => (
            <div key={color.value} className="text-center">
              <ModusBadge color={color.value} variant="filled" size="md">
                {color.label}
              </ModusBadge>
              <div className="mt-2 text-sm text-foreground">
                <div className="font-medium">{color.label}</div>
                <div className="text-muted-foreground">{color.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variant Types */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Variant Types
        </div>
        <div className="text-foreground mb-6">
          Different visual styles for badges.
        </div>
        <div className="space-y-6">
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              Filled Badges
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <ModusBadge variant="filled" color="primary">
                New
              </ModusBadge>
              <ModusBadge variant="filled" color="success">
                Active
              </ModusBadge>
              <ModusBadge variant="filled" color="warning">
                Pending
              </ModusBadge>
              <ModusBadge variant="filled" color="danger">
                Error
              </ModusBadge>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              Text Badges
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <ModusBadge variant="text" color="primary">
                Draft
              </ModusBadge>
              <ModusBadge variant="text" color="success">
                Published
              </ModusBadge>
              <ModusBadge variant="text" color="warning">
                Review
              </ModusBadge>
              <ModusBadge variant="text" color="danger">
                Rejected
              </ModusBadge>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              Counter Badges
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <ModusBadge variant="counter" color="primary">
                5
              </ModusBadge>
              <ModusBadge variant="counter" color="success">
                12
              </ModusBadge>
              <ModusBadge variant="counter" color="warning">
                3
              </ModusBadge>
              <ModusBadge variant="counter" color="danger">
                99+
              </ModusBadge>
            </div>
          </div>
        </div>
      </div>

      {/* Size Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Size Variants
        </div>
        <div className="text-foreground mb-6">
          Different badge sizes for various contexts.
        </div>
        <div className="space-y-6">
          {sizes.map((size) => (
            <div key={size.value}>
              <div className="text-lg font-semibold mb-3 text-foreground">
                {size.label} ({size.description})
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <ModusBadge size={size.value} color="primary">
                  New
                </ModusBadge>
                <ModusBadge size={size.value} color="success">
                  Active
                </ModusBadge>
                <ModusBadge size={size.value} color="warning">
                  Pending
                </ModusBadge>
                <ModusBadge size={size.value} color="danger">
                  Error
                </ModusBadge>
                <ModusBadge size={size.value} variant="text" color="primary">
                  Draft
                </ModusBadge>
                <ModusBadge
                  size={size.value}
                  variant="counter"
                  color="secondary"
                >
                  42
                </ModusBadge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Real-world Examples
        </div>
        <div className="text-foreground mb-6">
          Common use cases for badges in applications.
        </div>
        <div className="space-y-6">
          {/* User Status */}
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              User Status
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
                <div className="text-foreground">John Doe</div>
                <ModusBadge color="success">Online</ModusBadge>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full"></div>
                <div className="text-foreground">Jane Smith</div>
                <ModusBadge color="warning">Away</ModusBadge>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-tertiary rounded-full"></div>
                <div className="text-foreground">Bob Wilson</div>
                <ModusBadge color="secondary">Offline</ModusBadge>
              </div>
            </div>
          </div>

          {/* Notification Counters */}
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              Notification Counters
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <i className="modus-icons text-foreground">mail</i>
                <div className="text-foreground">Messages</div>
                <ModusBadge variant="counter" color="danger">
                  5
                </ModusBadge>
              </div>
              <div className="flex items-center gap-2">
                <i className="modus-icons text-foreground">notifications</i>
                <div className="text-foreground">Alerts</div>
                <ModusBadge variant="counter" color="warning">
                  12
                </ModusBadge>
              </div>
              <div className="flex items-center gap-2">
                <i className="modus-icons text-foreground">shopping_cart</i>
                <div className="text-foreground">Cart</div>
                <ModusBadge variant="counter" color="primary">
                  3
                </ModusBadge>
              </div>
            </div>
          </div>

          {/* Task Status */}
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              Task Status
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-background rounded border border-border">
                <div className="text-foreground">
                  Complete user authentication
                </div>
                <ModusBadge color="success">Completed</ModusBadge>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded border border-border">
                <div className="text-foreground">Update documentation</div>
                <ModusBadge color="warning">In Progress</ModusBadge>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded border border-border">
                <div className="text-foreground">Fix critical bug</div>
                <ModusBadge color="danger">Urgent</ModusBadge>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded border border-border">
                <div className="text-foreground">Code review</div>
                <ModusBadge variant="text" color="primary">
                  Pending
                </ModusBadge>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              Product Categories
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="text-foreground">Electronics</div>
                <ModusBadge color="primary">24 items</ModusBadge>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-foreground">Clothing</div>
                <ModusBadge color="success">18 items</ModusBadge>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-foreground">Books</div>
                <ModusBadge color="secondary">32 items</ModusBadge>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-foreground">Home & Garden</div>
                <ModusBadge color="tertiary">15 items</ModusBadge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Badge Builder */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Badge Builder
        </div>
        <div className="text-foreground mb-6">
          Create custom badges with different properties.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Controls
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => (
                    <ModusWcButton
                      key={color.value}
                      size="sm"
                      variant={
                        selectedColor === color.value ? "filled" : "outlined"
                      }
                      color={
                        selectedColor === color.value ? "primary" : "secondary"
                      }
                      onButtonClick={() => setSelectedColor(color.value)}
                    >
                      {color.label}
                    </ModusWcButton>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Variant
                </label>
                <div className="flex gap-2">
                  {variants.map((variant) => (
                    <ModusWcButton
                      key={variant.value}
                      size="sm"
                      variant={
                        selectedVariant === variant.value
                          ? "filled"
                          : "outlined"
                      }
                      color={
                        selectedVariant === variant.value
                          ? "primary"
                          : "secondary"
                      }
                      onButtonClick={() => setSelectedVariant(variant.value)}
                    >
                      {variant.label}
                    </ModusWcButton>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Size
                </label>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <ModusWcButton
                      key={size.value}
                      size="sm"
                      variant={
                        selectedSize === size.value ? "filled" : "outlined"
                      }
                      color={
                        selectedSize === size.value ? "primary" : "secondary"
                      }
                      onButtonClick={() => setSelectedSize(size.value)}
                    >
                      {size.label}
                    </ModusWcButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Preview
            </div>
            <div className="flex items-center gap-4">
              <ModusBadge
                color={selectedColor}
                variant={selectedVariant}
                size={selectedSize}
              >
                {selectedVariant === "counter" ? "42" : "Badge"}
              </ModusBadge>
              <div className="text-sm text-foreground">
                <div className="font-medium">
                  {selectedColor.toUpperCase()} {selectedVariant.toUpperCase()}
                </div>
                <div className="text-muted-foreground">
                  {sizes.find((s) => s.value === selectedSize)?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styling Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Custom Styling Examples
        </div>
        <div className="text-foreground mb-6">
          Badges with custom CSS classes for enhanced styling.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <ModusBadge color="primary" customClass="shadow-lg">
              Shadow
            </ModusBadge>
            <div className="mt-2 text-sm text-foreground">
              <div className="font-medium">Shadow Effect</div>
              <div className="text-muted-foreground">Drop shadow</div>
            </div>
          </div>
          <div className="text-center">
            <ModusBadge color="success" customClass="border-2 border-success">
              Border
            </ModusBadge>
            <div className="mt-2 text-sm text-foreground">
              <div className="font-medium">Border Effect</div>
              <div className="text-muted-foreground">Custom border</div>
            </div>
          </div>
          <div className="text-center">
            <ModusBadge color="warning" customClass="animate-pulse">
              Animated
            </ModusBadge>
            <div className="mt-2 text-sm text-foreground">
              <div className="font-medium">Animation</div>
              <div className="text-muted-foreground">Pulse effect</div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Usage Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg font-semibold mb-2 text-foreground">
              Basic Usage
            </div>
            <div className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusBadge color="primary">
  New
</ModusBadge>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </div>
            <div className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusBadge
  color="success"
  variant="counter"
  size="lg"
  customClass="shadow-lg"
>
  42
</ModusBadge>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
