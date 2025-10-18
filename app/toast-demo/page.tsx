"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusToast from "../components/ModusToast";

const toasts = [
  {
    id: "toast-success",
    title: "Saved",
    description: "Your changes are live.",
    variant: "success" as const,
    dismissible: true,
  },
  {
    id: "toast-warning",
    title: "Connection lost",
    description: "We will retry automatically in a few seconds.",
    variant: "warning" as const,
    dismissible: true,
    delay: null,
    position: "bottom-end" as const,
  },
];

export default function ToastDemoPage() {
  return (
    <DemoPage
      title="Modus Toast"
      description="Toasts deliver lightweight confirmations or alerts without disrupting workflow. Keep the message brief and allow dismissal."
    >
      <DemoExample
        title="Inline toast preview"
        description="This example shows two toasts at different positions."
      >
        <ModusToast toasts={toasts} />
      </DemoExample>
    </DemoPage>
  );
}
