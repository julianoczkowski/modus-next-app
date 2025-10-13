"use client";

import { ReactNode, useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusTabs, { ModusTab, ModusTabsStyle } from "../components/ModusTabs";

const overviewTabs: ModusTab[] = [
  { label: "Summary", icon: "dashboard" },
  { label: "Metrics", icon: "bar_graph" },
  { label: "Activity", icon: "timeline" },
  { label: "Settings", icon: "settings" },
];

const overviewPanels = [
  <div className="space-y-3" key="summary">
    <div className="text-lg font-semibold text-foreground">Project summary</div>
    <div className="text-sm text-foreground opacity-80 leading-relaxed">
      Snapshot of deployment health, outstanding tasks, and platform usage
      trends across your Trimble environment.
    </div>
  </div>,
  <div className="space-y-3" key="metrics">
    <div className="text-lg font-semibold text-foreground">
      Performance metrics
    </div>
    <div className="text-sm text-foreground opacity-80 leading-relaxed">
      Load charts, processing queues, and pipeline throughput with configurable
      time ranges.
    </div>
  </div>,
  <div className="space-y-3" key="activity">
    <div className="text-lg font-semibold text-foreground">Recent activity</div>
    <div className="text-sm text-foreground opacity-80 leading-relaxed">
      Audit events for data imports, user sign-ins, and integration triggers
      over the last 7 days.
    </div>
  </div>,
  <div className="space-y-3" key="settings">
    <div className="text-lg font-semibold text-foreground">Configuration</div>
    <div className="text-sm text-foreground opacity-80 leading-relaxed">
      Manage connectors, notification routing, and environment preferences from
      a single place.
    </div>
  </div>,
];

const variantExamples: Array<{
  title: string;
  description: string;
  tabStyle: ModusTabsStyle;
  tabs: ModusTab[];
  panels: ReactNode[];
}> = [
  {
    title: "Bordered (default)",
    description:
      "Classic underline indicator that keeps focus on content-heavy layouts.",
    tabStyle: "bordered",
    tabs: [{ label: "Overview" }, { label: "Schedule" }, { label: "Files" }],
    panels: [
      <div
        key="bordered-0"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        High-level overview, resource status, and quick actions.
      </div>,
      <div
        key="bordered-1"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Upcoming milestones, crew rotations, and equipment bookings.
      </div>,
      <div
        key="bordered-2"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Drawings, specification sheets, and field documentation.
      </div>,
    ],
  },
  {
    title: "Boxed",
    description:
      "Boxed tabs work well for dashboard navigation or card layouts.",
    tabStyle: "boxed",
    tabs: [
      { icon: "route", label: "Routes" },
      { icon: "map", label: "Maps" },
      { icon: "apps", label: "Apps hub" },
    ],
    panels: [
      <div
        key="boxed-0"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Manage logistics routes for survey crews and equipment deliveries.
      </div>,
      <div
        key="boxed-1"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Access terrain overlays, geofences, and sensor coverage.
      </div>,
      <div
        key="boxed-2"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Launch Trimble productivity and analytics apps directly.
      </div>,
    ],
  },
  {
    title: "Lifted",
    description:
      "Lifted style surfaces the active tab, ideal for multi-step flows.",
    tabStyle: "lifted",
    tabs: [
      { label: "Step 1" },
      { label: "Step 2" },
      { label: "Step 3", disabled: true },
    ],
    panels: [
      <div
        key="lifted-0"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Collect baseline data inputs and assign responsibilities.
      </div>,
      <div
        key="lifted-1"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Configure advanced options before validation.
      </div>,
      <div
        key="lifted-2"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Disabled tabs are skipped until prerequisites are complete.
      </div>,
    ],
  },
  {
    title: "Minimal",
    description:
      "Remove decoration when tabs act as compact filters or segmented controls.",
    tabStyle: "none",
    tabs: [{ label: "All" }, { label: "In progress" }, { label: "Completed" }],
    panels: [
      <div
        key="none-0"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Aggregated list of all tasks and tickets.
      </div>,
      <div
        key="none-1"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Focus on ongoing workstreams requiring attention.
      </div>,
      <div
        key="none-2"
        className="text-sm text-foreground opacity-80 leading-relaxed"
      >
        Historical log of closed tasks and approvals.
      </div>,
    ],
  },
];

export default function TabsDemoPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const tabSummary = useMemo(() => {
    const labels = overviewTabs.map((tab) => tab.label ?? "Tab");
    return labels[activeTab] ?? labels[0];
  }, [activeTab]);

  const logEvent = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((previous) => {
      const nextEntries = [`${timestamp} — ${message}`, ...previous];
      return nextEntries.slice(0, 18);
    });
  };

  const handleTabChange = (detail: { previousTab: number; newTab: number }) => {
    setActiveTab(detail.newTab);
    logEvent(
      `Switched from tab ${detail.previousTab + 1} to ${detail.newTab + 1}`
    );
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Tabs Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Tabs group related views or forms into a single surface. Combine
            icons, disabled states, and controlled tab indices to deliver
            accessible navigation across Trimble applications.
          </div>
        </div>

        {/* Controlled Tabs */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                Controlled Project Overview
              </div>
              <div className="text-sm text-foreground opacity-80">
                Manage active tab state within React. Navigation buttons adjust
                the active index and subscribe to `tabChange` for keyboard and
                click interaction.
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ModusWcButton
                color="primary"
                variant="outlined"
                size="sm"
                onButtonClick={() =>
                  setActiveTab((current) => Math.max(current - 1, 0))
                }
              >
                Previous
              </ModusWcButton>
              <ModusWcButton
                color="primary"
                variant="filled"
                size="sm"
                onButtonClick={() =>
                  setActiveTab((current) =>
                    Math.min(current + 1, overviewTabs.length - 1)
                  )
                }
              >
                Next
              </ModusWcButton>
            </div>
          </div>

          <div
            className="bg-background rounded-lg p-6"
            style={{ border: "1px solid var(--border)" }}
          >
            <ModusTabs
              tabs={overviewTabs}
              panels={overviewPanels}
              activeTabIndex={activeTab}
              tabStyle="bordered"
              customClass="tabs-controlled"
              ariaLabel="Project overview tabs"
              onTabChange={handleTabChange}
            />
            <div className="mt-6 text-sm text-foreground opacity-80 leading-relaxed">
              Active tab:{" "}
              <div className="font-semibold text-foreground">{tabSummary}</div>
            </div>
          </div>
        </div>

        {/* Style Variants */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Visual Styles &amp; States
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {variantExamples.map((example) => (
              <div
                key={example.title}
                className="bg-background rounded-lg p-6 space-y-4"
                style={{ border: "1px solid var(--border)" }}
              >
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {example.title}
                  </div>
                  <div className="text-sm text-foreground opacity-80">
                    {example.description}
                  </div>
                </div>
                <ModusTabs
                  tabs={example.tabs}
                  panels={example.panels}
                  tabStyle={example.tabStyle}
                  size="md"
                  ariaLabel={`${example.title} tabs`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Event Log */}
        <div
          className="p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-4">
            Interaction Log
          </div>
          <div className="text-sm text-foreground opacity-70 mb-4">
            Records the `tabChange` details emitted from the Modus tabs
            component when users change sections.
          </div>
          <div
            className="bg-background rounded-lg p-4 min-h-40"
            style={{ border: "1px solid var(--border)" }}
          >
            {eventLog.length === 0 ? (
              <div className="text-sm text-foreground opacity-60">
                Switch between tabs above to populate the log.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {eventLog.map((entry, index) => (
                  <div
                    key={`${entry}-${index}`}
                    className="text-sm text-foreground leading-relaxed"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .tabs-controlled modus-wc-tab-button[aria-selected="true"] {
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
