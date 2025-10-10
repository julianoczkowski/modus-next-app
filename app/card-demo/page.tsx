"use client";

import { useState } from "react";
import Image from "next/image";
import ModusCard from "../components/ModusCard";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function CardDemoPage() {
  const [selectedLayout, setSelectedLayout] = useState<
    "vertical" | "horizontal"
  >("vertical");
  const [selectedPadding, setSelectedPadding] = useState<"normal" | "compact">(
    "normal"
  );
  const [showBordered, setShowBordered] = useState(false);
  const [showBackgroundFigure, setShowBackgroundFigure] = useState(false);

  const layouts: Array<{
    value: "vertical" | "horizontal";
    label: string;
    description: string;
  }> = [
    {
      value: "vertical",
      label: "Vertical",
      description: "Header above content",
    },
    {
      value: "horizontal",
      label: "Horizontal",
      description: "Header beside content",
    },
  ];

  const paddingOptions: Array<{
    value: "normal" | "compact";
    label: string;
    description: string;
  }> = [
    { value: "normal", label: "Normal", description: "Standard padding" },
    { value: "compact", label: "Compact", description: "Reduced padding" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Card Demo
        </div>
        <div className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Card component with different layouts, styles, and
          content arrangements.
        </div>
      </div>

      {/* Basic Card Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Card Examples
        </div>
        <div className="text-foreground mb-6">
          Simple cards with different content arrangements.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Simple Card */}
          <ModusCard
            title="Simple Card"
            subtitle="Basic card with title and content"
            aria-label="Simple card example"
          >
            <div className="text-foreground">
              This is a simple card with just a title, subtitle, and body
              content.
            </div>
          </ModusCard>

          {/* Card with Actions */}
          <ModusCard
            title="Card with Actions"
            subtitle="Includes action buttons"
            aria-label="Card with actions example"
            actions={
              <div className="flex gap-2">
                <ModusWcButton size="sm" color="primary">
                  Action
                </ModusWcButton>
                <ModusWcButton size="sm" variant="outlined" color="secondary">
                  Cancel
                </ModusWcButton>
              </div>
            }
          >
            <div className="text-foreground">
              This card includes action buttons in the footer area.
            </div>
          </ModusCard>

          {/* Card with Footer */}
          <ModusCard
            title="Card with Footer"
            subtitle="Includes footer content"
            aria-label="Card with footer example"
            footer={
              <div className="text-sm text-muted-foreground">
                Last updated: 2 hours ago
              </div>
            }
          >
            <div className="text-foreground">
              This card includes footer content below the main body.
            </div>
          </ModusCard>
        </div>
      </div>

      {/* Layout Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Layout Variants
        </div>
        <div className="text-foreground mb-6">
          Vertical and horizontal card layouts with image headers.
        </div>
        <div className="space-y-8">
          {/* Vertical Layout */}
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Vertical Layout (Default)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModusCard
                layout="vertical"
                header={
                  <figure>
                    <Image
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop"
                      alt="Coding workspace"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded"
                    />
                  </figure>
                }
                title="Vertical Card"
                subtitle="Image above content"
                aria-label="Vertical card with image"
              >
                <div className="text-foreground">
                  This card uses vertical layout with the image positioned above
                  the content.
                </div>
              </ModusCard>

              <ModusCard
                layout="vertical"
                header={
                  <figure>
                    <Image
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
                      alt="Technology"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded"
                    />
                  </figure>
                }
                title="Another Vertical Card"
                subtitle="With action buttons"
                actions={
                  <ModusWcButton size="sm" color="primary">
                    Learn More
                  </ModusWcButton>
                }
                aria-label="Vertical card with actions"
              >
                <div className="text-foreground">
                  Vertical cards work well for most content layouts and are the
                  default choice.
                </div>
              </ModusCard>
            </div>
          </div>

          {/* Horizontal Layout */}
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Horizontal Layout
            </div>
            <div className="grid grid-cols-1 gap-6">
              <ModusCard
                layout="horizontal"
                header={
                  <figure>
                    <Image
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop"
                      alt="Team collaboration"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded"
                    />
                  </figure>
                }
                title="Horizontal Card"
                subtitle="Image beside content"
                aria-label="Horizontal card with image"
              >
                <div className="text-foreground">
                  This card uses horizontal layout with the image positioned
                  beside the content. Horizontal layout is great for showcasing
                  images while keeping content readable.
                </div>
              </ModusCard>
            </div>
          </div>
        </div>
      </div>

      {/* Background Figure Cards */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Background Figure Cards
        </div>
        <div className="text-foreground mb-6">
          Cards with background images and overlaid text content.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModusCard
            backgroundFigure
            header={
              <figure>
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop"
                  alt="Mountain landscape"
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </figure>
            }
            title="Hero Card"
            subtitle="Background image with overlaid text"
            aria-label="Hero card with background image"
          >
            <div className="text-white drop-shadow-lg">
              This card uses a background figure with text overlaid on top of
              the image. Perfect for hero sections and featured content.
            </div>
          </ModusCard>

          <ModusCard
            backgroundFigure
            header={
              <figure>
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop"
                  alt="Technology workspace"
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </figure>
            }
            title="Featured Content"
            subtitle="Technology and innovation"
            actions={
              <div className="flex gap-2">
                <ModusWcButton
                  size="sm"
                  color="primary"
                  className="bg-white/90 text-black"
                >
                  Get Started
                </ModusWcButton>
                <ModusWcButton
                  size="sm"
                  variant="outlined"
                  className="border-white text-white"
                >
                  Learn More
                </ModusWcButton>
              </div>
            }
            aria-label="Featured content card"
          >
            <div className="text-white drop-shadow-lg">
              Background figure cards are perfect for showcasing featured
              content with dramatic visual impact.
            </div>
          </ModusCard>
        </div>
      </div>

      {/* Bordered and Compact Cards */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Bordered and Compact Cards
        </div>
        <div className="text-foreground mb-6">
          Cards with borders and compact padding for dense layouts.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Normal Card */}
          <ModusCard
            title="Normal Card"
            subtitle="Standard padding and no border"
            aria-label="Normal card example"
          >
            <div className="text-foreground">
              This is a normal card with standard padding and no border.
            </div>
          </ModusCard>

          {/* Bordered Card */}
          <ModusCard
            bordered
            title="Bordered Card"
            subtitle="With border for separation"
            aria-label="Bordered card example"
          >
            <div className="text-foreground">
              This card has a border which is useful for separating cards on
              light backgrounds.
            </div>
          </ModusCard>

          {/* Compact Card */}
          <ModusCard
            padding="compact"
            title="Compact Card"
            subtitle="Reduced padding for dense layouts"
            aria-label="Compact card example"
          >
            <div className="text-foreground">
              This card uses compact padding, ideal for dense dashboards and
              grid layouts.
            </div>
          </ModusCard>

          {/* Compact Bordered Card */}
          <ModusCard
            bordered
            padding="compact"
            title="Compact Bordered"
            subtitle="Both compact and bordered"
            aria-label="Compact bordered card example"
          >
            <div className="text-foreground">
              This card combines compact padding with a border for maximum space
              efficiency.
            </div>
          </ModusCard>

          {/* Card with All Features */}
          <ModusCard
            bordered
            title="Feature-Rich Card"
            subtitle="With all available features"
            actions={
              <ModusWcButton size="sm" color="primary">
                Action
              </ModusWcButton>
            }
            footer={
              <div className="text-sm text-muted-foreground">
                Created 2 days ago
              </div>
            }
            aria-label="Feature-rich card example"
          >
            <div className="text-foreground">
              This card demonstrates all available features: title, subtitle,
              actions, and footer.
            </div>
          </ModusCard>

          {/* Empty Card */}
          <ModusCard bordered aria-label="Empty card example">
            <div className="text-foreground">
              Cards can also be used without titles or subtitles for simple
              content containers.
            </div>
          </ModusCard>
        </div>
      </div>

      {/* Interactive Card Builder */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Card Builder
        </div>
        <div className="text-foreground mb-6">
          Customize card properties and see the results in real-time.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Controls
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Layout
                </label>
                <div className="flex gap-2">
                  {layouts.map((layout) => (
                    <ModusWcButton
                      key={layout.value}
                      size="sm"
                      variant={
                        selectedLayout === layout.value ? "filled" : "outlined"
                      }
                      color={
                        selectedLayout === layout.value
                          ? "primary"
                          : "secondary"
                      }
                      onButtonClick={() => setSelectedLayout(layout.value)}
                    >
                      {layout.label}
                    </ModusWcButton>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Padding
                </label>
                <div className="flex gap-2">
                  {paddingOptions.map((padding) => (
                    <ModusWcButton
                      key={padding.value}
                      size="sm"
                      variant={
                        selectedPadding === padding.value
                          ? "filled"
                          : "outlined"
                      }
                      color={
                        selectedPadding === padding.value
                          ? "primary"
                          : "secondary"
                      }
                      onButtonClick={() => setSelectedPadding(padding.value)}
                    >
                      {padding.label}
                    </ModusWcButton>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showBordered}
                      onChange={(e) => setShowBordered(e.target.checked)}
                      className="rounded"
                    />
                    <div className="text-sm text-foreground">Bordered</div>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showBackgroundFigure}
                      onChange={(e) =>
                        setShowBackgroundFigure(e.target.checked)
                      }
                      className="rounded"
                    />
                    <div className="text-sm text-foreground">
                      Background Figure
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Preview
            </div>
            <ModusCard
              layout={selectedLayout}
              padding={selectedPadding}
              bordered={showBordered}
              backgroundFigure={showBackgroundFigure}
              header={
                showBackgroundFigure ? (
                  <figure>
                    <Image
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
                      alt="Preview image"
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                  </figure>
                ) : undefined
              }
              title="Preview Card"
              subtitle={`${selectedLayout} layout, ${selectedPadding} padding${
                showBordered ? ", bordered" : ""
              }`}
              actions={
                <ModusWcButton size="sm" color="primary">
                  Action
                </ModusWcButton>
              }
              aria-label="Interactive card preview"
            >
              <div className="text-foreground">
                This is a preview of your card configuration. Adjust the
                controls to see how different options affect the card
                appearance.
              </div>
            </ModusCard>
          </div>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Real-world Examples
        </div>
        <div className="text-foreground mb-6">
          Common card patterns used in applications.
        </div>
        <div className="space-y-8">
          {/* Product Cards */}
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Product Cards
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModusCard
                header={
                  <figure>
                    <Image
                      src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
                      alt="Laptop"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                }
                title="MacBook Pro"
                subtitle="$2,499.00"
                actions={
                  <ModusWcButton size="sm" color="primary">
                    Add to Cart
                  </ModusWcButton>
                }
                aria-label="MacBook Pro product card"
              >
                <div className="text-foreground">
                  16-inch MacBook Pro with M2 Pro chip. Perfect for professional
                  workflows.
                </div>
              </ModusCard>

              <ModusCard
                header={
                  <figure>
                    <Image
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
                      alt="Headphones"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                }
                title="Wireless Headphones"
                subtitle="$199.99"
                actions={
                  <ModusWcButton size="sm" color="primary">
                    Add to Cart
                  </ModusWcButton>
                }
                aria-label="Wireless headphones product card"
              >
                <div className="text-foreground">
                  Premium wireless headphones with noise cancellation and
                  30-hour battery life.
                </div>
              </ModusCard>

              <ModusCard
                header={
                  <figure>
                    <Image
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
                      alt="Smartwatch"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                }
                title="Smart Watch"
                subtitle="$299.99"
                actions={
                  <ModusWcButton size="sm" color="primary">
                    Add to Cart
                  </ModusWcButton>
                }
                aria-label="Smart watch product card"
              >
                <div className="text-foreground">
                  Advanced smartwatch with health monitoring, GPS, and 5-day
                  battery life.
                </div>
              </ModusCard>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Dashboard Cards
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModusCard
                padding="compact"
                bordered
                title="Total Users"
                aria-label="Total users dashboard card"
              >
                <div className="text-3xl font-bold text-foreground">1,234</div>
                <div className="text-sm text-muted-foreground">
                  +12% from last month
                </div>
              </ModusCard>

              <ModusCard
                padding="compact"
                bordered
                title="Revenue"
                aria-label="Revenue dashboard card"
              >
                <div className="text-3xl font-bold text-foreground">
                  $45,678
                </div>
                <div className="text-sm text-muted-foreground">
                  +8% from last month
                </div>
              </ModusCard>

              <ModusCard
                padding="compact"
                bordered
                title="Orders"
                aria-label="Orders dashboard card"
              >
                <div className="text-3xl font-bold text-foreground">567</div>
                <div className="text-sm text-muted-foreground">
                  +15% from last month
                </div>
              </ModusCard>

              <ModusCard
                padding="compact"
                bordered
                title="Conversion"
                aria-label="Conversion dashboard card"
              >
                <div className="text-3xl font-bold text-foreground">3.2%</div>
                <div className="text-sm text-muted-foreground">
                  +0.5% from last month
                </div>
              </ModusCard>
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
              {`<ModusCard
  title="Card Title"
  subtitle="Card subtitle"
  aria-label="Card description"
>
  <p>Card content goes here</p>
</ModusCard>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </div>
            <div className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusCard
  layout="horizontal"
  bordered
  padding="compact"
  header={<Image src="image.jpg" alt="Header" width={300} height={200} />}
  title="Card Title"
  subtitle="Card subtitle"
  actions={<button>Action</button>}
  footer={<div>Footer content</div>}
  aria-label="Advanced card"
>
  <p>Card content</p>
</ModusCard>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
