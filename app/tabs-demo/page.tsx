"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusTabs from "../components/ModusTabs";

const overviewPanels = [
  <div key="summary" className="text-sm text-foreground opacity-80">
    Review highlights, key metrics, and quick actions for the current project.
  </div>,
  <div key="timeline" className="text-sm text-foreground opacity-80">
    Explore recent updates in chronological order to stay informed.
  </div>,
  <div key="files" className="text-sm text-foreground opacity-80">
    Access shared documents and media assets that support this initiative.
  </div>,
];

export default function TabsDemoPage() {
  return (
    <DemoPage
      title="Modus Tabs"
      description="Tabs organize content into logical sections without leaving the page. Keep labels short and related."
    >
      <DemoExample
        title="Project tabs"
        description="Bordered tabs pair well with dashboards and keep the content anchored."
      >
        <ModusTabs
          tabs={[
            { label: "Summary", icon: "dashboard" },
            { label: "Activity", icon: "history" },
            { label: "Files", icon: "folder" },
          ]}
          panels={overviewPanels}
        />
      </DemoExample>
      <DemoExample
        title="Compact tabs"
        description="Use the small size when tabs sit inside cards or sidebars."
      >
        <ModusTabs
          tabs={[
            { label: "Plan" },
            { label: "Deliver" },
            { label: "Review" },
          ]}
          panels={[
            <div key="plan" className="text-sm text-foreground opacity-80">
              Outline the work and align on timelines.
            </div>,
            <div key="deliver" className="text-sm text-foreground opacity-80">
              Track progress as each milestone is completed.
            </div>,
            <div key="review" className="text-sm text-foreground opacity-80">
              Capture lessons learned and share with the team.
            </div>,
          ]}
          size="sm"
          tabStyle="boxed"
        />
      </DemoExample>
    </DemoPage>
  );
}
