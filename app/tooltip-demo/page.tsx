"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusTooltip from "../components/ModusTooltip";
import ModusButton from "../components/ModusButton";

export default function TooltipDemoPage() {
  return (
    <DemoPage
      title="Modus Tooltip"
      description="Tooltips provide helpful context on hover or focus. Keep the copy short and avoid critical instructions."
    >
      <DemoExample
        title="Icon help"
        description="Pair an icon with a tooltip to explain unfamiliar concepts."
      >
        <ModusTooltip content="Forecasts update every 15 minutes.">
          <i className="modus-icons text-primary">info</i>
        </ModusTooltip>
      </DemoExample>
      <DemoExample
        title="Button tooltip"
        description="Tooltips can reinforce what an icon-only button does."
      >
        <ModusTooltip content="Refresh dashboard">
          <ModusButton
            icon="refresh"
            iconPosition="only"
            ariaLabel="Refresh dashboard"
          >
            Refresh
          </ModusButton>
        </ModusTooltip>
      </DemoExample>
    </DemoPage>
  );
}
