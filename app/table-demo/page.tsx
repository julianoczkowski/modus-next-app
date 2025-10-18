"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusTable from "../components/ModusTable";

const columns = [
  { id: "name", header: "Name", accessor: "name", width: "40%" },
  { id: "role", header: "Role", accessor: "role" },
  { id: "status", header: "Status", accessor: "status" },
];

const data = [
  { id: "1", name: "Alex Rivera", role: "Project Lead", status: "Active" },
  { id: "2", name: "Brianna Lee", role: "UX Researcher", status: "In review" },
  { id: "3", name: "Chris Patel", role: "Developer", status: "Active" },
  { id: "4", name: "Morgan Diaz", role: "Analyst", status: "Blocked" },
];

export default function TableDemoPage() {
  return (
    <DemoPage
      title="Modus Table"
      description="Tables structure datasets for scanning and comparison. Limit the number of columns and prioritize the most actionable information."
    >
      <DemoExample
        title="Team overview"
        description="Comfortable density balances readability with information density."
      >
        <ModusTable columns={columns} data={data} density="comfortable" zebra hover />
      </DemoExample>
    </DemoPage>
  );
}
