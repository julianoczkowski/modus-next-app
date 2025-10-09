"use client";

import ModusDivider from "../components/ModusDivider";

export default function DividerDemoPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <div className="text-4xl font-semibold text-foreground">
          Modus Divider Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
          Use dividers to create lightweight separation between sections,
          align short helper text along a line, and support both horizontal and
          vertical layouts without relying on custom CSS.
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 space-y-8">
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-foreground">
            Horizontal dividers
          </div>
          <div className="text-sm text-foreground opacity-75 leading-relaxed">
            Horizontal dividers stretch to fill the container. Combine the{" "}
            <span className="font-medium">content</span> and{" "}
            <span className="font-medium">position</span> props to place short
            text along the line.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border border-border rounded-lg p-6 space-y-4">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Content free
            </div>
            <div className="space-y-4">
              <div className="text-foreground opacity-80">Quarterly summary</div>
              <ModusDivider ariaHidden thickness="md" />
              <div className="text-foreground opacity-80">
                Financial performance
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 space-y-4">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              With label
            </div>
            <div className="space-y-4">
              <div className="text-foreground opacity-80">
                Continue with corporate credentials
              </div>
              <ModusDivider
                content="or"
                position="center"
                ariaLabel="Divider between sign-in methods"
                thickness="md"
              />
              <div className="text-foreground opacity-80">
                Use Trimble ID account
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 space-y-4">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Positioned text
            </div>
            <div className="space-y-4">
              <div className="text-foreground opacity-80 flex justify-between">
                <span>Setup</span>
                <span className="text-sm opacity-70">Completed</span>
              </div>
              <ModusDivider
                content="phase 2"
                position="start"
                ariaLabel="Divider marking phase two"
                color="primary"
                thickness="lg"
              />
              <div className="text-foreground opacity-80">
                Enable integrations &amp; notifications
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 space-y-4">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Fixed width
            </div>
            <div className="space-y-4 text-center">
              <div className="text-foreground opacity-80">
                Review new submissions
              </div>
              <div className="flex justify-center">
                <ModusDivider
                  responsive={false}
                  orientation="horizontal"
                  color="high-contrast"
                  ariaHidden
                  customClass="w-32"
                  thickness="md"
                />
              </div>
              <div className="text-foreground opacity-80">
                Summary metrics refresh hourly
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 space-y-8">
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-foreground">
            Vertical dividers
          </div>
          <div className="text-sm text-foreground opacity-75 leading-relaxed">
            Vertical dividers align to the height of a flex or grid container.
            Use them to create lightweight column separation without additional
            borders.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border border-border rounded-lg p-6 space-y-6">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Basic flex layout
            </div>
            <div className="flex items-center gap-4 text-foreground opacity-80 h-24">
              <div className="flex-1">
                <div className="font-semibold mb-1">Status</div>
                <div className="text-sm opacity-70">All systems operational</div>
              </div>
              <ModusDivider orientation="vertical" ariaHidden thickness="md" />
              <div className="flex-1">
                <div className="font-semibold mb-1">Next update</div>
                <div className="text-sm opacity-70">14:30 UTC</div>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 space-y-6">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Positioned label
            </div>
            <div className="flex items-stretch gap-4 text-foreground opacity-80 h-36">
              <div className="flex-1 space-y-2">
                <div className="font-semibold">Workflow steps</div>
                <div className="text-sm opacity-70">
                  Assemble incoming inspections and assign field owners.
                </div>
              </div>
              <ModusDivider
                orientation="vertical"
                content="handoff"
                position="end"
                color="warning"
                ariaLabel="Divider indicating workflow handoff"
                responsive={false}
                customClass="h-full"
                thickness="lg"
              />
              <div className="flex-1 space-y-2">
                <div className="font-semibold">Verifications</div>
                <div className="text-sm opacity-70">
                  Validate project risk scoring before publishing to teams.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
