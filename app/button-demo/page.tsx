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
          <ModusButton color="warning" icon="add" iconPosition="left">
            Schedule
          </ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Button sizes"
        description="Different sizes for various contexts and hierarchy."
      >
        <div className="flex flex-wrap items-center gap-3">
          <ModusButton size="xs" color="primary">
            Extra Small
          </ModusButton>
          <ModusButton size="sm" color="primary">
            Small
          </ModusButton>
          <ModusButton size="md" color="primary">
            Medium
          </ModusButton>
          <ModusButton size="lg" color="primary">
            Large
          </ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Icon buttons"
        description="Icon-only buttons for compact interfaces and toolbars."
      >
        <div className="flex flex-wrap gap-3">
          <ModusButton
            shape="circle"
            color="primary"
            icon="add"
            iconPosition="only"
            ariaLabel="Add item"
          ></ModusButton>
          <ModusButton
            shape="circle"
            color="secondary"
            icon="edit_combination"
            iconPosition="only"
            ariaLabel="Edit item"
          ></ModusButton>
          <ModusButton
            shape="circle"
            color="danger"
            icon="delete"
            iconPosition="only"
            ariaLabel="Delete item"
          ></ModusButton>
          <ModusButton
            shape="circle"
            color="warning"
            icon="warning"
            iconPosition="only"
            ariaLabel="Warning"
          ></ModusButton>
          <ModusButton
            shape="square"
            color="primary"
            icon="save_disk"
            iconPosition="only"
            ariaLabel="Save"
          ></ModusButton>
          <ModusButton
            shape="square"
            color="secondary"
            icon="download"
            iconPosition="only"
            ariaLabel="Download"
          ></ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Buttons with icons"
        description="Text buttons enhanced with icons for better visual communication."
      >
        <div className="flex flex-wrap gap-3">
          <ModusButton color="primary" icon="save_disk" iconPosition="left">
            Save Changes
          </ModusButton>
          <ModusButton color="secondary" icon="download" iconPosition="right">
            Download
          </ModusButton>
          <ModusButton color="primary" icon="check" iconPosition="left">
            Complete Task
          </ModusButton>
          <ModusButton color="warning" icon="warning" iconPosition="left">
            Review Required
          </ModusButton>
          <ModusButton color="danger" icon="delete" iconPosition="left">
            Remove Item
          </ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Button states"
        description="Different states to communicate interaction possibilities."
      >
        <div className="flex flex-wrap gap-3">
          <ModusButton color="primary">Normal</ModusButton>
          <ModusButton color="primary" disabled>
            Disabled
          </ModusButton>
          <ModusButton color="primary" pressed>
            Pressed
          </ModusButton>
          <ModusButton color="secondary" variant="outlined">
            Outlined
          </ModusButton>
          <ModusButton color="secondary" variant="borderless">
            Borderless
          </ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Full-width buttons"
        description="Full-width buttons for forms and mobile interfaces."
      >
        <div className="gap-3 flex flex-col flex-wrap">
          <ModusButton color="primary" fullWidth>
            Submit Form
          </ModusButton>
          <ModusButton color="secondary" variant="outlined" fullWidth>
            Cancel
          </ModusButton>
          <ModusButton
            color="danger"
            variant="borderless"
            fullWidth
            icon="delete"
          >
            Delete Account
          </ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Form buttons"
        description="Common button patterns for forms and workflows."
      >
        <div className="flex flex-wrap gap-3">
          <ModusButton type="submit" color="primary" icon="check">
            Submit
          </ModusButton>
          <ModusButton
            type="reset"
            color="secondary"
            variant="outlined"
            icon="refresh"
          >
            Reset
          </ModusButton>
          <ModusButton
            type="button"
            color="danger"
            variant="borderless"
            icon="cancel_circle"
          >
            Cancel
          </ModusButton>
          <ModusButton color="primary" variant="outlined" icon="arrow_left">
            Back
          </ModusButton>
          <ModusButton color="primary" icon="arrow_right" iconPosition="right">
            Next
          </ModusButton>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
