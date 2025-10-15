"use client";

import { useState } from "react";
import ModusModal from "../../../app/components/ModusModal";
import ModusButton from "../../../app/components/ModusButton";

export default function ModalDemo() {
  // State for different modal examples
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [staticModalOpen, setStaticModalOpen] = useState(false);
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);
  const [topModalOpen, setTopModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);

  // Form state for the form modal example
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormSubmit = () => {
    console.log("Form submitted:", formData);
    setFormModalOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Modal Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80">
          Explore different modal configurations and use cases
        </div>
      </div>

      {/* Basic Modal Example */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-4">
          Basic Modal
        </div>
        <div className="text-base text-foreground opacity-80 mb-6">
          A simple modal with default settings. Click outside to close or use
          the close button.
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusButton
            color="primary"
            onButtonClick={() => setBasicModalOpen(true)}
          >
            Open Basic Modal
          </ModusButton>
        </div>

        <ModusModal
          modalId="basicModal"
          ariaLabel="Basic modal example"
          isOpen={basicModalOpen}
          onClose={() => setBasicModalOpen(false)}
          header={
            <div className="text-xl font-semibold text-foreground">
              Basic Modal
            </div>
          }
          footer={
            <div className="flex gap-2 justify-end">
              <ModusButton
                color="secondary"
                onButtonClick={() => setBasicModalOpen(false)}
              >
                Cancel
              </ModusButton>
              <ModusButton
                color="primary"
                onButtonClick={() => setBasicModalOpen(false)}
              >
                Confirm
              </ModusButton>
            </div>
          }
        >
          <div className="text-foreground">
            <div className="mb-4">
              This is a basic modal with default settings. It can be closed by:
            </div>
            <div className="list-none mb-4 text-foreground opacity-80">
              <div>Clicking the X button in the header</div>
              <div>Clicking outside the modal (backdrop)</div>
              <div>Pressing the Escape key</div>
              <div>Using the Cancel or Confirm buttons</div>
            </div>
            <div className="text-foreground opacity-80">
              The modal automatically handles focus management and prevents body
              scrolling.
            </div>
          </div>
        </ModusModal>
      </div>

      {/* Static Backdrop Modal Example */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-4">
          Static Backdrop Modal
        </div>
        <div className="text-base text-foreground opacity-80 mb-6">
          A modal with static backdrop that cannot be closed by clicking
          outside. User must use buttons or Escape key.
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusButton
            color="primary"
            onButtonClick={() => setStaticModalOpen(true)}
          >
            Open Static Modal
          </ModusButton>
        </div>

        <ModusModal
          modalId="staticModal"
          ariaLabel="Static backdrop modal example"
          backdrop="static"
          isOpen={staticModalOpen}
          onClose={() => setStaticModalOpen(false)}
          header={
            <div className="text-xl font-semibold text-foreground">
              Static Backdrop Modal
            </div>
          }
          footer={
            <div className="flex gap-2 justify-end">
              <ModusButton
                color="secondary"
                onButtonClick={() => setStaticModalOpen(false)}
              >
                Cancel
              </ModusButton>
              <ModusButton
                color="primary"
                onButtonClick={() => setStaticModalOpen(false)}
              >
                Save Changes
              </ModusButton>
            </div>
          }
        >
          <div className="text-foreground">
            <div className="mb-4">
              This modal has a static backdrop, meaning:
            </div>
            <div className="list-none mb-4 text-foreground opacity-80">
              <div>Clicking outside will NOT close the modal</div>
              <div>You must use the buttons or Escape key to close</div>
              <div>Perfect for important confirmations or forms</div>
            </div>
            <div className="text-foreground opacity-80">
              Try clicking outside this modal - it won&apos;t close!
            </div>
          </div>
        </ModusModal>
      </div>

      {/* Fullscreen Modal Example */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-4">
          Fullscreen Modal
        </div>
        <div className="text-base text-foreground opacity-80 mb-6">
          A modal that covers the entire viewport with a toggle button to switch
          between fullscreen and normal size.
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusButton
            color="primary"
            onButtonClick={() => setFullscreenModalOpen(true)}
          >
            Open Fullscreen Modal
          </ModusButton>
        </div>

        <ModusModal
          modalId="fullscreenModal"
          ariaLabel="Fullscreen modal example"
          fullscreen={true}
          showFullscreenToggle={true}
          isOpen={fullscreenModalOpen}
          onClose={() => setFullscreenModalOpen(false)}
          header={
            <div className="text-xl font-semibold text-foreground">
              Fullscreen Modal
            </div>
          }
          footer={
            <div className="flex gap-2 justify-end">
              <ModusButton
                color="secondary"
                onButtonClick={() => setFullscreenModalOpen(false)}
              >
                Close
              </ModusButton>
            </div>
          }
        >
          <div className="text-foreground">
            <div className="mb-4">
              This is a fullscreen modal that covers the entire viewport.
            </div>
            <div className="mb-4 text-foreground opacity-80">
              Notice the toggle button in the header that allows you to switch
              between fullscreen and normal size.
            </div>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <div className="text-foreground font-medium mb-2">Features:</div>
              <div className="list-none text-foreground opacity-80">
                <div>Covers entire viewport</div>
                <div>Toggle button in header</div>
                <div>Perfect for detailed content or forms</div>
                <div>Maintains focus management</div>
              </div>
            </div>
            <div className="text-foreground opacity-80">
              This modal is ideal for displaying large amounts of content or
              complex forms that need maximum screen real estate.
            </div>
          </div>
        </ModusModal>
      </div>

      {/* Top Position Modal Example */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-4">
          Top Position Modal
        </div>
        <div className="text-base text-foreground opacity-80 mb-6">
          A modal positioned at the top of the screen instead of center.
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusButton
            color="primary"
            onButtonClick={() => setTopModalOpen(true)}
          >
            Open Top Modal
          </ModusButton>
        </div>

        <ModusModal
          modalId="topModal"
          ariaLabel="Top position modal example"
          position="top"
          isOpen={topModalOpen}
          onClose={() => setTopModalOpen(false)}
          header={
            <div className="text-xl font-semibold text-foreground">
              Top Position Modal
            </div>
          }
          footer={
            <div className="flex gap-2 justify-end">
              <ModusButton
                color="primary"
                onButtonClick={() => setTopModalOpen(false)}
              >
                Got it!
              </ModusButton>
            </div>
          }
        >
          <div className="text-foreground">
            <div className="mb-4">
              This modal is positioned at the top of the screen instead of
              center.
            </div>
            <div className="text-foreground opacity-80">
              Top positioning is useful for notifications, alerts, or when you
              want the modal to be more prominent.
            </div>
          </div>
        </ModusModal>
      </div>

      {/* Custom Size Modal Example */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-4">
          Custom Size Modal
        </div>
        <div className="text-base text-foreground opacity-80 mb-6">
          A modal with custom dimensions using CSS classes.
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusButton
            color="primary"
            onButtonClick={() => setCustomModalOpen(true)}
          >
            Open Custom Modal
          </ModusButton>
        </div>

        <ModusModal
          modalId="customModal"
          ariaLabel="Custom size modal example"
          customClass="custom-modal-size"
          isOpen={customModalOpen}
          onClose={() => setCustomModalOpen(false)}
          header={
            <div className="text-xl font-semibold text-foreground">
              Custom Size Modal
            </div>
          }
          footer={
            <div className="flex gap-2 justify-end">
              <ModusButton
                color="primary"
                onButtonClick={() => setCustomModalOpen(false)}
              >
                Close
              </ModusButton>
            </div>
          }
        >
          <div className="text-foreground">
            <div className="mb-4">
              This modal has custom dimensions applied via CSS classes.
            </div>
            <div className="text-foreground opacity-80">
              The custom class overrides the default modal size to create a
              wider, shorter modal perfect for specific content layouts.
            </div>
          </div>
        </ModusModal>
      </div>

      {/* Form Modal Example */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-4">
          Form Modal
        </div>
        <div className="text-base text-foreground opacity-80 mb-6">
          A modal containing a form with proper state management and validation.
        </div>
        <div className="flex gap-4 flex-wrap mb-4">
          <ModusButton
            color="primary"
            onButtonClick={() => setFormModalOpen(true)}
          >
            Open Form Modal
          </ModusButton>
        </div>

        <ModusModal
          modalId="formModal"
          ariaLabel="Form modal example"
          backdrop="static"
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          header={
            <div className="text-xl font-semibold text-foreground">
              Contact Form
            </div>
          }
          footer={
            <div className="flex gap-2 justify-end">
              <ModusButton
                color="secondary"
                onButtonClick={() => setFormModalOpen(false)}
              >
                Cancel
              </ModusButton>
              <ModusButton color="primary" onButtonClick={handleFormSubmit}>
                Submit
              </ModusButton>
            </div>
          }
        >
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="w-full px-3 py-2 rounded bg-background text-foreground"
                style={{ border: "1px solid var(--input)" }}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                className="w-full px-3 py-2 rounded bg-background text-foreground"
                style={{ border: "1px solid var(--input)" }}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
                className="w-full px-3 py-2 rounded bg-background text-foreground"
                style={{ border: "1px solid var(--input)" }}
                placeholder="Enter your message"
                rows={4}
                required
              />
            </div>
          </form>
        </ModusModal>
      </div>

      {/* Custom CSS for the custom size modal */}
      <style jsx global>{`
        .custom-modal-size .modus-wc-modal-box {
          width: 80%;
          height: 60%;
          max-width: 800px;
          max-height: 500px;
        }
      `}</style>
    </div>
  );
}
