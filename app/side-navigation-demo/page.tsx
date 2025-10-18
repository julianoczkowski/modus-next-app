"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusSideNavigation from "../components/ModusSideNavigation";

const navigationItems = [
  { label: "Overview", value: "overview", startIcon: "dashboard", selected: true },
  { label: "Projects", value: "projects", startIcon: "folder" },
  { label: "Teams", value: "teams", startIcon: "groups" },
  { label: "Settings", value: "settings", startIcon: "settings" },
];

export default function SideNavigationDemoPage() {
  return (
    <DemoPage
      title="Modus Side Navigation"
      description="Side navigation gives people persistent access to major areas of the product. Keep the list short and use icons when it helps recognition."
    >
      <DemoExample
        title="Expanded navigation"
        description="A medium width works well for four to six top-level destinations."
      >
        <ModusSideNavigation items={navigationItems} defaultExpanded maxWidth="280px" />
      </DemoExample>
    </DemoPage>
  );
}
