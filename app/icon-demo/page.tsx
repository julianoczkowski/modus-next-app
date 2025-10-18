"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusIcon from "../components/ModusIcon";

const navigationIcons = ["dashboard", "insights", "map", "notifications"];

export default function IconDemoPage() {
  return (
    <DemoPage
      title="Modus Icon"
      description="Icons communicate meaning with visual shorthand. Pair them with labels and use consistent sizes across a given surface."
    >
      <DemoExample
        title="Navigation icons"
        description="Use medium icons in a toolbar or navigation rail."
      >
        <div className="flex gap-4">
          {navigationIcons.map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center rounded-full bg-card p-3"
                style={{ border: "1px solid var(--border)" }}
              >
                <ModusIcon name={icon} size="lg" decorative={false} />
              </div>
              <div className="text-sm text-foreground">{icon}</div>
            </div>
          ))}
        </div>
      </DemoExample>
      <DemoExample
        title="Status cues"
        description="Color reinforces the meaning of each state."
      >
        <div className="flex gap-3">
          <ModusIcon name="check_circle" size="lg" decorative={false} color="var(--modus-success-500)" />
          <ModusIcon name="warning" size="lg" decorative={false} color="var(--modus-warning-500)" />
          <ModusIcon name="error" size="lg" decorative={false} color="var(--modus-danger-500)" />
          <ModusIcon name="info" size="lg" decorative={false} color="var(--modus-primary-500)" />
        </div>
      </DemoExample>
    </DemoPage>
  );
}
