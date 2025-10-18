"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusMenu from "../components/ModusMenu";

const projectMenu = [
  { label: "Overview", value: "overview", selected: true, startIcon: "dashboard" },
  { label: "Tasks", value: "tasks", startIcon: "checklist" },
  { label: "Files", value: "files", startIcon: "folder" },
  { label: "Activity", value: "activity", startIcon: "timelapse" },
];

const compactMenu = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly", selected: true },
  { label: "Monthly", value: "monthly" },
];

export default function MenuDemoPage() {
  return (
    <DemoPage
      title="Modus Menu"
      description="Menus list navigation destinations or quick filters. Keep item labels short and highlight only one selection at a time."
    >
      <DemoExample
        title="Navigation menu"
        description="Vertical menus organize major sections of a workspace."
      >
        <ModusMenu items={projectMenu} bordered size="lg" />
      </DemoExample>
      <DemoExample
        title="Compact filter"
        description="Horizontal menus are perfect for switching simple views."
      >
        <ModusMenu items={compactMenu} orientation="horizontal" size="sm" />
      </DemoExample>
    </DemoPage>
  );
}
