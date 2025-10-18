"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusProgress from "../components/ModusProgress";

export default function ProgressDemoPage() {
  return (
    <DemoPage
      title="Modus Progress"
      description="Progress indicators show how close a task is to completion. Use determinate values when you know the total work and switch to indeterminate when you do not."
    >
      <DemoExample
        title="Linear progress"
        description="Display a label when the step is critical to the flow."
      >
        <div className="flex flex-col gap-2">
          <div className="text-sm text-foreground opacity-80">Uploading design files</div>
          <ModusProgress value={60} max={100} label="60%" />
        </div>
      </DemoExample>
      <DemoExample
        title="Radial progress"
        description="Circular indicators fit nicely inside cards or dashboards."
      >
        <div className="flex items-center gap-4">
          <ModusProgress variant="radial" value={42} max={100}>
            <div className="text-sm font-semibold text-foreground">42%</div>
          </ModusProgress>
          <div className="text-sm text-foreground opacity-80">
            Customer onboarding flow completion rate
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
