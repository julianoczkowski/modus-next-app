"use client";

import { useState } from "react";
import ModusModal from "../components/ModusModal";
import ModusButton from "../components/ModusButton";

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
        <p className="text-lg text-foreground opacity-80">
          Explore different modal configurations and use cases
        </p>
      </div>

      {/* Basic Modal Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold text-foreground mb-4">
          Basic Modal
        </div>
        <p className="text-base text-foreground opacity-80 mb-6">
          A simple modal with default settings. Click outside to close or use
          the close button.
        </p>
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
            <p className="mb-4">
              This is a basic modal with default settings. It can be closed by:
            </p>
            <ul className="list-disc list-inside mb-4 text-foreground opacity-80">
              <li>Clicking the X button in the header</li>
              <li>Clicking outside the modal (backdrop)</li>
              <li>Pressing the Escape key</li>
              <li>Using the Cancel or Confirm buttons</li>
            </ul>
            <p className="text-foreground opacity-80">
              The modal automatically handles focus management and prevents body
              scrolling.
            </p>
          </div>
        </ModusModal>
      </div>

      {/* Static Backdrop Modal Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold text-foreground mb-4">
          Static Backdrop Modal
        </div>
        <p className="text-base text-foreground opacity-80 mb-6">
          A modal with static backdrop that cannot be closed by clicking
          outside. User must use buttons or Escape key.
        </p>
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
            <p className="mb-4">This modal has a static backdrop, meaning:</p>
            <ul className="list-disc list-inside mb-4 text-foreground opacity-80">
              <li>Clicking outside will NOT close the modal</li>
              <li>You must use the buttons or Escape key to close</li>
              <li>Perfect for important confirmations or forms</li>
            </ul>
            <p className="text-foreground opacity-80">
              Try clicking outside this modal - it won&apos;t close!
            </p>
          </div>
        </ModusModal>
      </div>

      {/* Fullscreen Modal Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold text-foreground mb-4">
          Fullscreen Modal
        </div>
        <p className="text-base text-foreground opacity-80 mb-6">
          A modal that covers the entire viewport with a toggle button to switch
          between fullscreen and normal size.
        </p>
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
            <p className="mb-4">
              This is a fullscreen modal that covers the entire viewport.
            </p>
            <p className="mb-4 text-foreground opacity-80">
              Notice the toggle button in the header that allows you to switch
              between fullscreen and normal size.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <p className="text-foreground font-medium mb-2">Features:</p>
              <ul className="list-disc list-inside text-foreground opacity-80">
                <li>Covers entire viewport</li>
                <li>Toggle button in header</li>
                <li>Perfect for detailed content or forms</li>
                <li>Maintains focus management</li>
              </ul>
            </div>
            <p className="text-foreground opacity-80">
              This modal is ideal for displaying large amounts of content or
              complex forms that need maximum screen real estate.
            </p>
          </div>
        </ModusModal>
      </div>

      {/* Top Position Modal Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold text-foreground mb-4">
          Top Position Modal
        </div>
        <p className="text-base text-foreground opacity-80 mb-6">
          A modal positioned at the top of the screen instead of center.
        </p>
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
            <p className="mb-4">
              This modal is positioned at the top of the screen instead of
              center.
            </p>
            <p className="text-foreground opacity-80">
              Top positioning is useful for notifications, alerts, or when you
              want the modal to be more prominent.
            </p>
          </div>
        </ModusModal>
      </div>

      {/* Custom Size Modal Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold text-foreground mb-4">
          Custom Size Modal
        </div>
        <p className="text-base text-foreground opacity-80 mb-6">
          A modal with custom dimensions using CSS classes.
        </p>
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
            <p className="mb-4">
              This modal has custom dimensions applied via CSS classes.
            </p>
            <p className="text-foreground opacity-80">
              The custom class overrides the default modal size to create a
              wider, shorter modal perfect for specific content layouts.
            </p>
          </div>
        </ModusModal>
      </div>

      {/* Form Modal Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold text-foreground mb-4">
          Form Modal
        </div>
        <p className="text-base text-foreground opacity-80 mb-6">
          A modal containing a form with proper state management and validation.
        </p>
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
                className="w-full px-3 py-2 border border-input rounded bg-background text-foreground"
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
                className="w-full px-3 py-2 border border-input rounded bg-background text-foreground"
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
                className="w-full px-3 py-2 border border-input rounded bg-background text-foreground"
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
