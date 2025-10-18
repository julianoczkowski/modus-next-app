"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusButton from "../components/ModusButton";
import ModusModal from "../components/ModusModal";

export default function ModalDemoPage() {
  return (
    <DemoPage
      title="Modus Modal"
      description="Modals focus attention on a short, interruptive task. Keep content concise and provide a clear primary action."
    >
      <DemoExample
        title="Centered dialog"
        description="Use for quick confirmations or lightweight forms."
      >
        <ModusModal
          modalId="modal-demo-primary"
          ariaLabel="Archive project"
          isOpen
          header={<div className="text-xl font-semibold text-foreground">Archive project</div>}
          footer={
            <div className="flex gap-2">
              <ModusButton variant="borderless">Cancel</ModusButton>
              <ModusButton color="danger">Archive</ModusButton>
            </div>
          }
        >
          <div className="text-sm text-foreground opacity-80">
            Archived projects are hidden from your active workspace. You can
            restore them later from the settings panel.
          </div>
        </ModusModal>
      </DemoExample>
    </DemoPage>
  );
}
