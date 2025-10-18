"use client";

import {
  ModusWcDropdownMenu,
  ModusWcMenuItem,
} from "@trimble-oss/moduswebcomponents-react";
import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";

export default function DropdownDemoPage() {
  return (
    <DemoPage
      title="Modus Dropdown"
      description="Dropdown menus reveal a short list of related actions. Use them for secondary commands or compact filters."
    >
      <DemoExample
        title="Simple action list"
        description="Keep the label on the button clear so people know what will open."
      >
        <ModusWcDropdownMenu buttonColor="primary" buttonVariant="filled">
          <ModusWcMenuItem value="rename">Rename</ModusWcMenuItem>
          <ModusWcMenuItem value="duplicate">Duplicate</ModusWcMenuItem>
          <ModusWcMenuItem value="archive">Archive</ModusWcMenuItem>
        </ModusWcDropdownMenu>
      </DemoExample>
      <DemoExample
        title="Compact filters"
        description="Borderless buttons blend into toolbars and allow quick context changes."
      >
        <ModusWcDropdownMenu
          buttonColor="secondary"
          buttonVariant="borderless"
          buttonSize="sm"
          menuPlacement="bottom-end"
        >
          <ModusWcMenuItem value="today">Today</ModusWcMenuItem>
          <ModusWcMenuItem value="week">This week</ModusWcMenuItem>
          <ModusWcMenuItem value="month">This month</ModusWcMenuItem>
        </ModusWcDropdownMenu>
      </DemoExample>
    </DemoPage>
  );
}
