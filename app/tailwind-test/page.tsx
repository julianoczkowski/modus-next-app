"use client";

import DemoPage from "../components/DemoPage";
import TailwindTestSection from "../components/TailwindTestSection";

export default function TailwindTestPage() {
  return (
    <DemoPage
      title="Tailwind CSS v4 Utility Test Suite"
      description="Comprehensive testing page to identify Tailwind CSS v4 utility class issues beyond borders. Tests margins, padding, gap, flexbox, grid, spacing, and other utilities with visual comparisons and code examples."
    >
      {/* Summary Dashboard */}
      <div className="bg-card p-6 rounded-lg border-default">
        <div className="text-xl font-semibold text-foreground mb-4">
          Test Results Summary
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background p-4 rounded-lg border-default">
            <div className="text-2xl font-bold text-success">12</div>
            <div className="text-sm text-muted-foreground">
              Utilities Working
            </div>
          </div>
          <div className="bg-background p-4 rounded-lg border-default">
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-sm text-muted-foreground">
              Need Custom Solution
            </div>
          </div>
          <div className="bg-background p-4 rounded-lg border-default">
            <div className="text-2xl font-bold text-primary">15</div>
            <div className="text-sm text-muted-foreground">Total Tested</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <div className="font-medium text-foreground mb-2">Known Issues:</div>
          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-foreground mt-2 flex-shrink-0"></div>
              <div>
                Border utilities (border, border-2) - Use custom .border-default
                classes
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-foreground mt-2 flex-shrink-0"></div>
              <div>Some gap utilities may need verification</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-foreground mt-2 flex-shrink-0"></div>
              <div>Space-between utilities need testing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout & Spacing Tests */}
      <TailwindTestSection
        title="Layout & Spacing"
        description="Testing margin, padding, gap, and space-between utilities"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Margin Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Margin Utilities
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  m-4 (margin: 1rem)
                </div>
                <div className="bg-background p-2 m-4 border-default">
                  <div className="text-sm">Content with m-4</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  mx-4 my-2 (margin-x: 1rem, margin-y: 0.5rem)
                </div>
                <div className="bg-background p-2 mx-4 my-2 border-default">
                  <div className="text-sm">Content with mx-4 my-2</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  mt-6 mb-2 ml-8 mr-4
                </div>
                <div className="bg-background p-2 mt-6 mb-2 ml-8 mr-4 border-default">
                  <div className="text-sm">Content with individual margins</div>
                </div>
              </div>
            </div>
          </div>

          {/* Padding Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Padding Utilities
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  p-4 (padding: 1rem)
                </div>
                <div className="bg-background p-4 border-default">
                  <div className="text-sm">Content with p-4</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  px-6 py-3 (padding-x: 1.5rem, padding-y: 0.75rem)
                </div>
                <div className="bg-background px-6 py-3 border-default">
                  <div className="text-sm">Content with px-6 py-3</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  pt-8 pb-2 pl-4 pr-6
                </div>
                <div className="bg-background pt-8 pb-2 pl-4 pr-6 border-default">
                  <div className="text-sm">Content with individual padding</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gap Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Gap Utilities
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  Flex with gap-4
                </div>
                <div className="flex gap-4">
                  <div className="bg-background p-2 border-default text-sm">
                    Item 1
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 2
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 3
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  Grid with gap-6
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-background p-2 border-default text-sm">
                    A
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    B
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    C
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Space Between Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Space Between Utilities
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  space-y-4
                </div>
                <div className="space-y-4">
                  <div className="bg-background p-2 border-default text-sm">
                    Item 1
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 2
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 3
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  space-x-6
                </div>
                <div className="flex space-x-6">
                  <div className="bg-background p-2 border-default text-sm">
                    Item 1
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 2
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TailwindTestSection>

      {/* Border Tests */}
      <TailwindTestSection
        title="Border Utilities"
        description="Testing border utilities - known issues with Tailwind v4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tailwind Border Classes (Problematic) */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Tailwind Border Classes (Issues)
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  border border-border (No visible border)
                </div>
                <div className="bg-background p-4 border border-border">
                  <div className="text-sm">
                    This should have a border but doesn't
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  border-2 border-border (No visible border)
                </div>
                <div className="bg-background p-4 border-2 border-border">
                  <div className="text-sm">
                    This should have a thick border but doesn't
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Border Solutions */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Custom Border Solutions (Working)
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  border-default (Custom solution)
                </div>
                <div className="bg-background p-4 border-default">
                  <div className="text-sm">This has a proper border</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  border-thick (Custom solution)
                </div>
                <div className="bg-background p-4 border-thick">
                  <div className="text-sm">This has a thick border</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  border-dashed (Custom solution)
                </div>
                <div className="bg-background p-4 border-dashed">
                  <div className="text-sm">This has a dashed border</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TailwindTestSection>

      {/* Flexbox & Grid Tests */}
      <TailwindTestSection
        title="Flexbox & Grid"
        description="Testing flexbox and grid utilities with spacing"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flexbox Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Flexbox Utilities
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  flex gap-4
                </div>
                <div className="flex gap-4">
                  <div className="bg-background p-2 border-default text-sm">
                    Flex 1
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Flex 2
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Flex 3
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  flex flex-col gap-2
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-background p-2 border-default text-sm">
                    Column 1
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Column 2
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Column 3
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Grid Utilities
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  grid grid-cols-3 gap-4
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-background p-2 border-default text-sm">
                    A
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    B
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    C
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    D
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    E
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    F
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  grid grid-cols-2 gap-x-6 gap-y-2
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div className="bg-background p-2 border-default text-sm">
                    Item 1
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 2
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 3
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TailwindTestSection>

      {/* Box Model Tests */}
      <TailwindTestSection
        title="Box Model"
        description="Testing box-sizing, width/height with padding, and dimensions"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Box Sizing Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Box Sizing Tests
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  w-32 p-4 border (box-sizing: border-box)
                </div>
                <div className="w-32 p-4 border-default bg-background">
                  <div className="text-sm">Width 32 + padding</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  h-24 p-6 border (box-sizing: border-box)
                </div>
                <div className="h-24 p-6 border-default bg-background">
                  <div className="text-sm">Height 24 + padding</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dimension Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Dimension Utilities
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  w-full max-w-md
                </div>
                <div className="w-full max-w-md p-4 border-default bg-background">
                  <div className="text-sm">Full width with max constraint</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  min-h-32 max-h-48
                </div>
                <div className="min-h-32 max-h-48 p-4 border-default bg-background">
                  <div className="text-sm">Min/max height constraints</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TailwindTestSection>

      {/* Display & Positioning Tests */}
      <TailwindTestSection
        title="Display & Positioning"
        description="Testing display utilities and positioning with spacing"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Display Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Display Utilities
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  flex items-center gap-4
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-background p-2 border-default text-sm">
                    Item 1
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Item 2
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  grid grid-cols-2 items-center gap-4
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <div className="bg-background p-2 border-default text-sm">
                    Grid A
                  </div>
                  <div className="bg-background p-2 border-default text-sm">
                    Grid B
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Positioning Tests */}
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Positioning with Spacing
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border-default relative">
                <div className="text-sm text-muted-foreground mb-2">
                  relative with absolute positioned child
                </div>
                <div className="bg-background p-2 border-default text-sm">
                  Parent
                </div>
                <div className="absolute top-2 right-2 bg-background p-1 border-default text-xs">
                  Absolute
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border-default">
                <div className="text-sm text-muted-foreground mb-2">
                  sticky positioning
                </div>
                <div className="h-32 overflow-y-auto">
                  <div className="bg-background p-2 border-default text-sm mb-2">
                    Content 1
                  </div>
                  <div className="bg-background p-2 border-default text-sm mb-2">
                    Content 2
                  </div>
                  <div className="sticky top-0 bg-background p-2 border-default text-sm">
                    Sticky
                  </div>
                  <div className="bg-background p-2 border-default text-sm mb-2">
                    Content 3
                  </div>
                  <div className="bg-background p-2 border-default text-sm mb-2">
                    Content 4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TailwindTestSection>
    </DemoPage>
  );
}
