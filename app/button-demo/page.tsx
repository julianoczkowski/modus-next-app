"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusButton from "../components/ModusButton";

export default function ButtonDemoPage() {
  return (
    <DemoPage
      title="Modus Button"
      description="Buttons launch the primary actions on a page. Choose a clear label, match the color to the level of emphasis, and avoid stacking more than a few in a row."
    >
      <DemoExample
        title="Primary actions"
        description="Filled buttons communicate the main task."
      >
        <div className="flex flex-wrap gap-3">
          <ModusButton color="primary">Create project</ModusButton>
          <ModusButton color="secondary">Invite teammates</ModusButton>
          <ModusButton color="tertiary">View activity</ModusButton>
        </div>
      </DemoExample>
      <DemoExample
        title="Subtle treatments"
        description="Outlined and borderless buttons are helpful for secondary or tertiary actions."
      >
        <div className="flex flex-wrap gap-3">
          <ModusButton color="primary" variant="outlined">
            Export CSV
          </ModusButton>
          <ModusButton color="danger" variant="borderless" icon="delete">
            Delete
          </ModusButton>
          <ModusButton color="warning" icon="schedule" iconPosition="left">
            Schedule
          </ModusButton>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
