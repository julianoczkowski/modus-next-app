"use client";

import DemoExample from "@/app/components/DemoExample";
import DemoPage from "@/app/components/DemoPage";
import ModusTextInput from "@/app/components/ModusTextInput";

export default function TextInputDemoPage() {
  return (
    <DemoPage
      title="Modus Text Input"
      description="Text inputs capture freeform responses. Use placeholder text for brief hints and pair with feedback messages when validation fails."
    >
      <DemoExample
        title="Standard input"
        description="Use for single-line responses and align the label above."
      >
        <ModusTextInput
          label="Project name"
          placeholder="Atlas field rollout"
        />
      </DemoExample>
      <DemoExample
        title="Input with feedback"
        description="Surface validation guidance inline to keep the flow on track."
      >
        <ModusTextInput
          label="Workspace slug"
          placeholder="atlas-rollout"
          feedback={{
            level: "warning",
            message: "Only lowercase letters and dashes are allowed.",
          }}
        />
      </DemoExample>
    </DemoPage>
  );
}
