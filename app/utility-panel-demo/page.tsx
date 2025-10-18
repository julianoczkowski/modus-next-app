"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusButton from "../components/ModusButton";
import ModusUtilityPanel from "../components/ModusUtilityPanel";

export default function UtilityPanelDemoPage() {
  return (
    <DemoPage
      title="Modus Utility Panel"
      description="Utility panels slide in contextual information or controls without leaving the page. Keep content focused and provide clear actions."
    >
      <DemoExample
        title="Insights panel"
        description="Use on the right side to display supplementary details while keeping the main canvas visible."
      >
        <div className="flex gap-4">
          <div
            className="flex flex-1 flex-col gap-3 rounded-lg bg-card p-6"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-base font-medium text-foreground">
              Main workspace
            </div>
            <div className="text-sm text-foreground opacity-80">
              The utility panel slides over this content while still allowing
              people to reference the primary view.
            </div>
          </div>
          <ModusUtilityPanel
            expanded
            headerText="Project insights"
            footerSlot={<ModusButton size="sm">View report</ModusButton>}
          >
            <div className="flex flex-col gap-3 text-sm text-foreground opacity-80">
              <div>
                Most active region this week: Pacific Northwest with 38 on-site
                visits.
              </div>
              <div>
                Top risk: Permit delays in San Diego. Coordinate with field ops
                to stay on track.
              </div>
            </div>
          </ModusUtilityPanel>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
