"use client";

import { useState, useCallback } from "react";
import ModusTable, {
  TableColumn,
  TableData,
} from "../../../app/components/ModusTable";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface EventLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function TableDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setPageSize] = useState(10);

  const logEvent = useCallback(
    (message: string, type: EventLog["type"] = "info") => {
      const timestamp = new Date().toLocaleTimeString();
      setEventLogs((prev) => {
        const newLogs = [{ timestamp, message, type }, ...prev];
        return newLogs.slice(0, 20); // Keep last 20 events
      });
    },
    []
  );

  const clearLogs = () => {
    setEventLogs([]);
  };

  // Sample data for different table examples
  const employeeData: TableData[] = [
    {
      id: "1",
      name: "Alice Johnson",
      role: "Software Engineer",
      department: "Engineering",
      salary: 95000,
      startDate: "2022-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Bob Smith",
      role: "Product Manager",
      department: "Product",
      salary: 110000,
      startDate: "2021-03-22",
      status: "active",
    },
    {
      id: "3",
      name: "Carol Davis",
      role: "UX Designer",
      department: "Design",
      salary: 85000,
      startDate: "2022-06-10",
      status: "active",
    },
    {
      id: "4",
      name: "David Wilson",
      role: "Data Scientist",
      department: "Engineering",
      salary: 105000,
      startDate: "2021-11-08",
      status: "active",
    },
    {
      id: "5",
      name: "Eva Brown",
      role: "Marketing Manager",
      department: "Marketing",
      salary: 75000,
      startDate: "2023-02-14",
      status: "active",
    },
    {
      id: "6",
      name: "Frank Miller",
      role: "DevOps Engineer",
      department: "Engineering",
      salary: 98000,
      startDate: "2022-09-05",
      status: "active",
    },
    {
      id: "7",
      name: "Grace Lee",
      role: "HR Specialist",
      department: "Human Resources",
      salary: 70000,
      startDate: "2023-01-20",
      status: "active",
    },
    {
      id: "8",
      name: "Henry Taylor",
      role: "Sales Director",
      department: "Sales",
      salary: 120000,
      startDate: "2020-07-12",
      status: "active",
    },
    {
      id: "9",
      name: "Ivy Chen",
      role: "Frontend Developer",
      department: "Engineering",
      salary: 92000,
      startDate: "2022-04-18",
      status: "active",
    },
    {
      id: "10",
      name: "Jack Anderson",
      role: "Backend Developer",
      department: "Engineering",
      salary: 94000,
      startDate: "2021-12-03",
      status: "active",
    },
  ];

  const productData: TableData[] = [
    {
      id: "p1",
      name: "Laptop Pro",
      category: "Electronics",
      price: 1299.99,
      stock: 45,
      rating: 4.8,
      featured: true,
    },
    {
      id: "p2",
      name: "Wireless Mouse",
      category: "Accessories",
      price: 29.99,
      stock: 120,
      rating: 4.5,
      featured: false,
    },
    {
      id: "p3",
      name: "Mechanical Keyboard",
      category: "Accessories",
      price: 149.99,
      stock: 78,
      rating: 4.7,
      featured: true,
    },
    {
      id: "p4",
      name: "4K Monitor",
      category: "Electronics",
      price: 399.99,
      stock: 23,
      rating: 4.9,
      featured: true,
    },
    {
      id: "p5",
      name: "USB-C Hub",
      category: "Accessories",
      price: 79.99,
      stock: 67,
      rating: 4.3,
      featured: false,
    },
  ];

  // Column definitions
  const employeeColumns: TableColumn[] = [
    { id: "id", header: "ID", accessor: "id", width: "60px", sortable: true },
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "role", header: "Role", accessor: "role", sortable: true },
    {
      id: "department",
      header: "Department",
      accessor: "department",
      sortable: true,
    },
    { id: "salary", header: "Salary", accessor: "salary", sortable: true },
    {
      id: "startDate",
      header: "Start Date",
      accessor: "startDate",
      sortable: true,
    },
    { id: "status", header: "Status", accessor: "status", sortable: true },
  ];

  const productColumns: TableColumn[] = [
    { id: "name", header: "Product", accessor: "name", sortable: true },
    {
      id: "category",
      header: "Category",
      accessor: "category",
      sortable: true,
    },
    { id: "price", header: "Price", accessor: "price", sortable: true },
    { id: "stock", header: "Stock", accessor: "stock", sortable: true },
    { id: "rating", header: "Rating", accessor: "rating", sortable: true },
    {
      id: "featured",
      header: "Featured",
      accessor: "featured",
      sortable: true,
    },
  ];

  // Event handlers
  const handleRowSelectionChange = useCallback(
    (
      event: CustomEvent<{ selectedRows: unknown[]; selectedRowIds: string[] }>
    ) => {
      const { selectedRowIds } = event.detail;
      setSelectedRows(selectedRowIds);
      logEvent(
        `Selected ${selectedRowIds.length} row(s): ${selectedRowIds.join(
          ", "
        )}`,
        "info"
      );
    },
    [logEvent]
  );

  const handleSortChange = useCallback(
    (
      event: CustomEvent<Array<{ columnId: string; direction: "asc" | "desc" }>>
    ) => {
      const sortInfo = event.detail;
      const sortString = sortInfo
        .map((s) => `${s.columnId} (${s.direction})`)
        .join(", ");
      logEvent(`Table sorted by: ${sortString}`, "info");
    },
    [logEvent]
  );

  const handlePaginationChange = useCallback(
    (event: CustomEvent<{ currentPage: number; pageSize: number }>) => {
      const { currentPage: newPage, pageSize: newPageSize } = event.detail;
      setCurrentPage(newPage);
      setPageSize(newPageSize);
      logEvent(`Page changed to ${newPage}, page size: ${newPageSize}`, "info");
    },
    [logEvent]
  );

  const handleRowClick = useCallback(
    (event: CustomEvent<{ row: unknown; index: number }>) => {
      const { row, index } = event.detail;
      const rowData = row as TableData;
      logEvent(
        `Row ${index + 1} clicked: ${rowData.name || rowData.id}`,
        "info"
      );
    },
    [logEvent]
  );

  const handleCellEditCommit = useCallback(
    (
      event: CustomEvent<{
        rowIndex: number;
        colId: string;
        newValue: unknown;
        updatedRow: unknown;
      }>
    ) => {
      const { rowIndex, colId, newValue } = event.detail;
      logEvent(
        `Cell edited: Row ${
          rowIndex + 1
        }, Column ${colId}, New value: ${newValue}`,
        "success"
      );
    },
    [logEvent]
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Table Demo
        </div>
        <div className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Table component with sorting, pagination, selection,
          and editing capabilities.
        </div>
      </div>

      {/* Basic Table */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Sortable Table
        </div>
        <div className="text-foreground mb-6">
          A simple table with sorting enabled. Click column headers to sort.
        </div>
        <ModusTable
          columns={employeeColumns}
          data={employeeData}
          aria-label="Employee table"
          onSortChange={handleSortChange}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Paginated Table */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Paginated Table with Selection
        </div>
        <div className="text-foreground mb-6">
          Table with pagination, row selection, and zebra striping.
        </div>
        <ModusTable
          columns={employeeColumns}
          data={employeeData}
          paginated
          selectable="multi"
          zebra
          density="comfortable"
          currentPage={currentPage}
          pageSizeOptions={[5, 10, 15]}
          selectedRowIds={selectedRows}
          aria-label="Paginated employee table"
          onPaginationChange={handlePaginationChange}
          onRowSelectionChange={handleRowSelectionChange}
          onSortChange={handleSortChange}
          onRowClick={handleRowClick}
        />
        {selectedRows.length > 0 && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="text-sm text-foreground">
              <strong>Selected Rows:</strong> {selectedRows.length} row(s)
              selected
            </div>
          </div>
        )}
      </div>

      {/* Compact Product Table */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Compact Product Table
        </div>
        <div className="text-foreground mb-6">
          Compact density table with hover effects and single row selection.
        </div>
        <ModusTable
          columns={productColumns}
          data={productData}
          selectable="single"
          density="compact"
          hover
          aria-label="Product table"
          onRowSelectionChange={handleRowSelectionChange}
          onSortChange={handleSortChange}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Editable Table */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Editable Table
        </div>
        <div className="text-foreground mb-6">
          Table with inline editing capabilities. Click on cells to edit them.
        </div>
        <ModusTable
          columns={[
            {
              id: "name",
              header: "Product Name",
              accessor: "name",
              sortable: true,
              editor: "text",
            },
            {
              id: "price",
              header: "Price",
              accessor: "price",
              sortable: true,
              editor: "number",
            },
            {
              id: "stock",
              header: "Stock",
              accessor: "stock",
              sortable: true,
              editor: "number",
            },
            {
              id: "featured",
              header: "Featured",
              accessor: "featured",
              sortable: true,
            },
          ]}
          data={productData}
          editable
          hover
          aria-label="Editable product table"
          onCellEditStart={(event) => {
            const { rowIndex, colId } = event.detail;
            logEvent(
              `Started editing: Row ${rowIndex + 1}, Column ${colId}`,
              "info"
            );
          }}
          onCellEditCommit={handleCellEditCommit}
          onSortChange={handleSortChange}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Event Log */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-semibold text-foreground">
            Event Log
          </div>
          <ModusWcButton
            variant="borderless"
            color="secondary"
            onButtonClick={clearLogs}
            disabled={eventLogs.length === 0}
          >
            <i className="modus-icons mr-2">delete</i>
            Clear Logs
          </ModusWcButton>
        </div>
        <div
          className="max-h-64 overflow-y-auto rounded p-4 bg-background"
          style={{ border: "1px solid var(--border)" }}
        >
          {eventLogs.map((log, index) => (
            <div key={index} className="flex gap-4 mb-2 font-mono text-sm">
              <div className="text-foreground min-w-20">{log.timestamp}</div>
              <div
                className={`${
                  log.type === "success"
                    ? "text-success"
                    : log.type === "warning"
                    ? "text-warning"
                    : log.type === "error"
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                {log.message}
              </div>
            </div>
          ))}
          {eventLogs.length === 0 && (
            <div className="text-foreground italic text-center p-8">
              Interact with the tables to see events logged here...
            </div>
          )}
        </div>
      </div>

      {/* Usage Examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Usage Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg font-semibold mb-2 text-foreground">
              Basic Usage
            </div>
            <div className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusTable
  columns={columns}
  data={data}
  aria-label="My table"
  onSortChange={handleSort}
  onRowClick={handleRowClick}
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </div>
            <div className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusTable
  columns={columns}
  data={data}
  paginated
  selectable="multi"
  zebra
  density="compact"
  editable
  onRowSelectionChange={handleSelection}
  onCellEditCommit={handleEdit}
/>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
