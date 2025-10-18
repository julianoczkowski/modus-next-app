"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusStepper, { ModusStepperItem } from "../components/ModusStepper";

const onboardingSteps: ModusStepperItem[] = [
  { label: "Account", content: "Create account", color: "primary" },
  { label: "Workspace", content: "Workspace details", color: "primary" },
  { label: "Invite", content: "Invite team", color: "primary" },
  { label: "Launch", content: "Go live", color: "accent" },
];

const verticalSteps: ModusStepperItem[] = [
  { label: "Draft", content: "Draft", color: "info" },
  { label: "Review", content: "Review", color: "warning" },
  { label: "Approved", content: "Approved", color: "success" },
];

export default function StepperDemoPage() {
  return (
    <DemoPage
      title="Modus Stepper"
      description="Steppers communicate progress through a multi-step workflow. Keep step titles short and describe what happens at each stage."
    >
      <DemoExample
        title="Horizontal stepper"
        description="Use for onboarding or processes that follow a left-to-right progression."
      >
        <ModusStepper steps={onboardingSteps} />
      </DemoExample>
      <DemoExample
        title="Vertical stepper"
        description="Great for status-driven flows such as approvals."
      >
        <ModusStepper steps={verticalSteps} orientation="vertical" />
      </DemoExample>
    </DemoPage>
  );
}
