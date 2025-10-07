"use client";

import { useState } from "react";
import ModusAvatar from "../components/ModusAvatar";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function AvatarDemoPage() {
  const [selectedSize, setSelectedSize] = useState<"xs" | "sm" | "md" | "lg">(
    "md"
  );
  const [selectedShape, setSelectedShape] = useState<"circle" | "square">(
    "circle"
  );

  // Sample avatar data
  const avatars = [
    {
      name: "Alice Johnson",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      alt: "Alice Johnson",
    },
    {
      name: "Bob Smith",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      alt: "Bob Smith",
    },
    {
      name: "Carol Davis",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      alt: "Carol Davis",
    },
    {
      name: "David Wilson",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      alt: "David Wilson",
    },
    {
      name: "Eva Brown",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      alt: "Eva Brown",
    },
    {
      name: "Frank Miller",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      alt: "Frank Miller",
    },
  ];

  const sizes: Array<{
    value: "xs" | "sm" | "md" | "lg";
    label: string;
    description: string;
  }> = [
    { value: "xs", label: "Extra Small", description: "24px" },
    { value: "sm", label: "Small", description: "32px" },
    { value: "md", label: "Medium", description: "40px" },
    { value: "lg", label: "Large", description: "64px" },
  ];

  const shapes: Array<{
    value: "circle" | "square";
    label: string;
    description: string;
  }> = [
    {
      value: "circle",
      label: "Circle",
      description: "Rounded profile picture",
    },
    { value: "square", label: "Square", description: "Square for data tables" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Avatar Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Avatar component with different sizes, shapes, and
          styling options.
        </p>
      </div>

      {/* Size Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Size Variants
        </div>
        <p className="text-foreground mb-6">
          Different avatar sizes for various use cases.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          {sizes.map((size) => (
            <div key={size.value} className="text-center">
              <ModusAvatar
                alt="Sample avatar"
                imgSrc={avatars[0].src}
                size={size.value}
                shape="circle"
              />
              <div className="mt-2 text-sm text-foreground">
                <div className="font-medium">{size.label}</div>
                <div className="text-muted-foreground">{size.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shape Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Shape Variants
        </div>
        <p className="text-foreground mb-6">
          Circle and square shapes for different contexts.
        </p>
        <div className="flex items-center gap-8 flex-wrap">
          {shapes.map((shape) => (
            <div key={shape.value} className="text-center">
              <ModusAvatar
                alt="Sample avatar"
                imgSrc={avatars[1].src}
                size="lg"
                shape={shape.value}
              />
              <div className="mt-2 text-sm text-foreground">
                <div className="font-medium">{shape.label}</div>
                <div className="text-muted-foreground">{shape.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User List Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          User List Example
        </div>
        <p className="text-foreground mb-6">
          Avatars in a user list with names and roles.
        </p>
        <div className="space-y-4">
          {avatars.slice(0, 4).map((avatar, index) => (
            <div
              key={avatar.name}
              className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <ModusAvatar
                alt={avatar.alt}
                imgSrc={avatar.src}
                size="md"
                shape="circle"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">{avatar.name}</div>
                <div className="text-sm text-muted-foreground">
                  {index === 0 && "Software Engineer"}
                  {index === 1 && "Product Manager"}
                  {index === 2 && "UX Designer"}
                  {index === 3 && "Data Scientist"}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {index === 0 && "Online"}
                {index === 1 && "Away"}
                {index === 2 && "Online"}
                {index === 3 && "Offline"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Size/Shape Selector */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Avatar Preview
        </div>
        <p className="text-foreground mb-6">
          Change the size and shape to see how the avatar updates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Controls
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Size
                </label>
                <div className="flex gap-2 flex-wrap">
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
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Shape
                </label>
                <div className="flex gap-2">
                  {shapes.map((shape) => (
                    <ModusWcButton
                      key={shape.value}
                      size="sm"
                      variant={
                        selectedShape === shape.value ? "filled" : "outlined"
                      }
                      color={
                        selectedShape === shape.value ? "primary" : "secondary"
                      }
                      onButtonClick={() => setSelectedShape(shape.value)}
                    >
                      {shape.label}
                    </ModusWcButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Preview
            </h4>
            <div className="flex items-center gap-4">
              <ModusAvatar
                alt="Preview avatar"
                imgSrc={avatars[2].src}
                size={selectedSize}
                shape={selectedShape}
              />
              <div>
                <div className="font-medium text-foreground">
                  {selectedSize.toUpperCase()} {selectedShape.toUpperCase()}
                </div>
                <div className="text-sm text-muted-foreground">
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
        <p className="text-foreground mb-6">
          Avatars with custom CSS classes for borders, shadows, and effects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <ModusAvatar
              alt="Avatar with border"
              imgSrc={avatars[3].src}
              size="lg"
              shape="circle"
              customClass="border-2 border-primary"
            />
            <div className="mt-2 text-sm text-foreground">
              <div className="font-medium">Border</div>
              <div className="text-muted-foreground">Custom border</div>
            </div>
          </div>
          <div className="text-center">
            <ModusAvatar
              alt="Avatar with shadow"
              imgSrc={avatars[4].src}
              size="lg"
              shape="circle"
              customClass="shadow-lg"
            />
            <div className="mt-2 text-sm text-foreground">
              <div className="font-medium">Shadow</div>
              <div className="text-muted-foreground">Drop shadow</div>
            </div>
          </div>
          <div className="text-center">
            <ModusAvatar
              alt="Avatar with ring"
              imgSrc={avatars[5].src}
              size="lg"
              shape="circle"
              customClass="ring-4 ring-primary ring-opacity-50"
            />
            <div className="mt-2 text-sm text-foreground">
              <div className="font-medium">Ring</div>
              <div className="text-muted-foreground">Focus ring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fallback States */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Fallback States
        </div>
        <p className="text-foreground mb-6">
          How avatars behave when images fail to load or are not provided.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <ModusAvatar
              alt="No image provided"
              imgSrc=""
              size="lg"
              shape="circle"
            />
            <div className="mt-2 text-sm text-foreground">
              <div className="font-medium">No Image</div>
              <div className="text-muted-foreground">Empty src attribute</div>
            </div>
          </div>
          <div className="text-center">
            <ModusAvatar
              alt="Broken image"
              imgSrc="https://example.com/broken-image.jpg"
              size="lg"
              shape="circle"
            />
            <div className="mt-2 text-sm text-foreground">
              <div className="font-medium">Broken Image</div>
              <div className="text-muted-foreground">Invalid image URL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Accessibility Examples
        </div>
        <p className="text-foreground mb-6">
          Proper alt text usage for screen readers and accessibility.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
            <ModusAvatar
              alt="John Doe, Software Engineer"
              imgSrc={avatars[0].src}
              size="md"
              shape="circle"
            />
            <div>
              <div className="font-medium text-foreground">Good Alt Text</div>
              <div className="text-sm text-muted-foreground">
                "John Doe, Software Engineer" - Descriptive and meaningful
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
            <ModusAvatar
              alt="User avatar"
              imgSrc={avatars[1].src}
              size="md"
              shape="circle"
            />
            <div>
              <div className="font-medium text-foreground">
                Generic Alt Text
              </div>
              <div className="text-sm text-muted-foreground">
                "User avatar" - Less descriptive but acceptable
              </div>
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
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Basic Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusAvatar
  alt="User name"
  imgSrc="https://example.com/avatar.jpg"
  size="md"
  shape="circle"
/>`}
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusAvatar
  alt="John Doe, Software Engineer"
  imgSrc="https://example.com/avatar.jpg"
  size="lg"
  shape="square"
  customClass="border-2 border-primary shadow-lg"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
