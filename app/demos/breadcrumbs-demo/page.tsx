"use client";

import DemoExample from "@/app/components/DemoExample";
import DemoPage from "@/app/components/DemoPage";
import ModusBreadcrumbs from "@/app/components/ModusBreadcrumbs";

const analyticsPath = [
  { label: "Home" },
  { label: "Dashboards" },
  { label: "Revenue" },
];

const libraryPath = [
  { label: "Workspace" },
  { label: "Content" },
  { label: "Guides" },
  { label: "Campaign launch" },
];

export default function BreadcrumbsDemoPage() {
  return (
    <DemoPage
      title="Modus Breadcrumbs"
      description="Breadcrumbs show people where they are in a hierarchy. Keep labels short and mirror the navigation structure."
    >
      <DemoExample
        title="Dashboard context"
        description="Use medium breadcrumbs above a page title to orient someone inside analytics."
      >
        <ModusBreadcrumbs
          items={analyticsPath}
          aria-label="Analytics navigation"
        />
      </DemoExample>
      <DemoExample
        title="Deep library path"
        description="Large breadcrumbs improve readability when the hierarchy has four or more levels."
      >
        <ModusBreadcrumbs
          items={libraryPath}
          size="lg"
          aria-label="Library navigation"
        />
      </DemoExample>
    </DemoPage>
  );
}
