"use client";

import { useState, useCallback, useMemo } from "react";
import ModusAutocomplete, {
  AutocompleteItem,
} from "../components/ModusAutocomplete";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface EventLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function AutocompleteDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [selectedItems, setSelectedItems] = useState<AutocompleteItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // Sample data for different autocomplete examples
  const fruits: AutocompleteItem[] = [
    { label: "Apple", value: "apple", visibleInMenu: true },
    { label: "Banana", value: "banana", visibleInMenu: true },
    { label: "Cherry", value: "cherry", visibleInMenu: true },
    { label: "Date", value: "date", visibleInMenu: true },
    { label: "Elderberry", value: "elderberry", visibleInMenu: true },
    { label: "Fig", value: "fig", visibleInMenu: true },
    { label: "Grape", value: "grape", visibleInMenu: true },
    { label: "Honeydew", value: "honeydew", visibleInMenu: true },
    { label: "Kiwi", value: "kiwi", visibleInMenu: true },
    { label: "Lemon", value: "lemon", visibleInMenu: true },
    { label: "Mango", value: "mango", visibleInMenu: true },
    { label: "Orange", value: "orange", visibleInMenu: true },
    { label: "Papaya", value: "papaya", visibleInMenu: true },
    { label: "Quince", value: "quince", visibleInMenu: true },
    { label: "Raspberry", value: "raspberry", visibleInMenu: true },
  ];

  const countries: AutocompleteItem[] = useMemo(
    () => [
      { label: "United States", value: "us", visibleInMenu: true },
      { label: "Canada", value: "ca", visibleInMenu: true },
      { label: "United Kingdom", value: "uk", visibleInMenu: true },
      { label: "Germany", value: "de", visibleInMenu: true },
      { label: "France", value: "fr", visibleInMenu: true },
      { label: "Japan", value: "jp", visibleInMenu: true },
      { label: "Australia", value: "au", visibleInMenu: true },
      { label: "Brazil", value: "br", visibleInMenu: true },
      { label: "India", value: "in", visibleInMenu: true },
      { label: "China", value: "cn", visibleInMenu: true },
    ],
    []
  );

  const skills: AutocompleteItem[] = [
    { label: "JavaScript", value: "javascript", visibleInMenu: true },
    { label: "TypeScript", value: "typescript", visibleInMenu: true },
    { label: "React", value: "react", visibleInMenu: true },
    { label: "Vue", value: "vue", visibleInMenu: true },
    { label: "Angular", value: "angular", visibleInMenu: true },
    { label: "Node.js", value: "nodejs", visibleInMenu: true },
    { label: "Python", value: "python", visibleInMenu: true },
    { label: "Java", value: "java", visibleInMenu: true },
    { label: "C#", value: "csharp", visibleInMenu: true },
    { label: "Go", value: "go", visibleInMenu: true },
    { label: "Rust", value: "rust", visibleInMenu: true },
    { label: "Swift", value: "swift", visibleInMenu: true },
  ];

  // Event handlers
  const handleInputChange = useCallback(
    (event: CustomEvent<Event>) => {
      const target = event.detail.target as HTMLInputElement;
      const value = target.value;
      setSearchValue(value);
      logEvent(`Input changed: "${value}"`, "info");
    },
    [logEvent]
  );

  const handleItemSelect = useCallback(
    (event: CustomEvent<AutocompleteItem>) => {
      const item = event.detail;
      logEvent(`Item selected: ${item.label} (${item.value})`, "success");
    },
    [logEvent]
  );

  const handleChipRemove = useCallback(
    (event: CustomEvent<AutocompleteItem>) => {
      const item = event.detail;
      setSelectedItems((prev) => prev.filter((i) => i.value !== item.value));
      logEvent(`Chip removed: ${item.label}`, "info");
    },
    [logEvent]
  );

  const handleInputFocus = useCallback(() => {
    logEvent("Input focused", "info");
  }, [logEvent]);

  const handleInputBlur = useCallback(() => {
    logEvent("Input blurred", "info");
  }, [logEvent]);

  // Simulate remote search
  const handleRemoteSearch = useCallback(
    async (event: CustomEvent<Event>) => {
      const target = event.detail.target as HTMLInputElement;
      const query = target.value.toLowerCase();

      if (query.length < 2) return;

      setIsLoading(true);
      logEvent(`Remote search for: "${query}"`, "info");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filter countries based on query
      const filteredCountries = countries.filter((country) =>
        country.label.toLowerCase().includes(query)
      );

      setIsLoading(false);
      logEvent(
        `Found ${filteredCountries.length} results for "${query}"`,
        "success"
      );
    },
    [countries, logEvent]
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Autocomplete Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Autocomplete component with single/multi-select,
          remote search, custom styling, and advanced features.
        </p>
      </div>

      {/* Basic Single Select */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Single Select
        </div>
        <p className="text-foreground mb-6">
          Simple autocomplete with fruit selection and filtering.
        </p>
        <ModusAutocomplete
          label="Select a Fruit"
          placeholder="Type to search fruits..."
          items={fruits}
          aria-label="Fruit selection"
          onInputChange={handleInputChange}
          onItemSelect={handleItemSelect}
          onInputFocus={handleInputFocus}
          onInputBlur={handleInputBlur}
        />
      </div>

      {/* Multi-Select with Chips */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Multi-Select with Chips
        </div>
        <p className="text-foreground mb-6">
          Select multiple skills with chip display and removal.
        </p>
        <ModusAutocomplete
          label="Select Skills"
          placeholder="Type to search skills..."
          items={skills}
          multiSelect
          leaveMenuOpen
          aria-label="Skills selection"
          onInputChange={handleInputChange}
          onItemSelect={(event) => {
            const item = event.detail;
            setSelectedItems((prev) => [...prev, item]);
            handleItemSelect(event);
          }}
          onChipRemove={handleChipRemove}
          onInputFocus={handleInputFocus}
          onInputBlur={handleInputBlur}
        />
        {selectedItems.length > 0 && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="text-sm text-foreground">
              <strong>Selected Skills:</strong> {selectedItems.length} skill(s)
              selected
            </div>
          </div>
        )}
      </div>

      {/* Remote Search with Spinner */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Remote Search with Loading
        </div>
        <p className="text-foreground mb-6">
          Simulated remote search with loading spinner and debounced input.
        </p>
        <ModusAutocomplete
          label="Search Countries"
          placeholder="Type to search countries..."
          items={countries}
          showSpinner={isLoading}
          debounceMs={500}
          minChars={2}
          aria-label="Country search"
          onInputChange={handleRemoteSearch}
          onItemSelect={handleItemSelect}
          onInputFocus={handleInputFocus}
          onInputBlur={handleInputBlur}
        />
      </div>

      {/* Different Sizes */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Different Sizes
        </div>
        <p className="text-foreground mb-6">
          Autocomplete components in small, medium, and large sizes.
        </p>
        <div className="space-y-4">
          <ModusAutocomplete
            label="Small Size"
            placeholder="Small autocomplete..."
            items={fruits.slice(0, 5)}
            size="sm"
            onItemSelect={handleItemSelect}
          />
          <ModusAutocomplete
            label="Medium Size (Default)"
            placeholder="Medium autocomplete..."
            items={fruits.slice(0, 5)}
            size="md"
            onItemSelect={handleItemSelect}
          />
          <ModusAutocomplete
            label="Large Size"
            placeholder="Large autocomplete..."
            items={fruits.slice(0, 5)}
            size="lg"
            onItemSelect={handleItemSelect}
          />
        </div>
      </div>

      {/* Disabled and Read-Only States */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Disabled and Read-Only States
        </div>
        <p className="text-foreground mb-6">
          Autocomplete components in disabled and read-only states.
        </p>
        <div className="space-y-4">
          <ModusAutocomplete
            label="Disabled Autocomplete"
            placeholder="This is disabled..."
            items={fruits}
            disabled
            value="Cannot interact"
          />
          <ModusAutocomplete
            label="Read-Only Autocomplete"
            placeholder="This is read-only..."
            items={fruits}
            readOnly
            value="Cannot edit"
          />
        </div>
      </div>

      {/* Custom No Results */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Custom No Results
        </div>
        <p className="text-foreground mb-6">
          Autocomplete with custom &quot;no results&quot; message and icon.
        </p>
        <ModusAutocomplete
          label="Search with Custom No Results"
          placeholder="Type something that won't match..."
          items={[]}
          noResults={{
            label: "No matching items found. Try a different search term.",
            subLabel: "Please try a different search term.",
          }}
          onInputChange={handleInputChange}
          onItemSelect={handleItemSelect}
        />
      </div>

      {/* Interactive Controls */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Controls
        </div>
        <p className="text-foreground mb-6">
          Control the autocomplete behavior with different settings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <ModusWcButton
                fullWidth
                color="primary"
                onButtonClick={() => {
                  setSearchValue("");
                  setSelectedItems([]);
                  logEvent("Cleared all selections", "info");
                }}
              >
                <i className="modus-icons mr-2">clear</i>
                Clear All
              </ModusWcButton>
              <ModusWcButton
                fullWidth
                color="secondary"
                onButtonClick={() => {
                  logEvent("Current search value: " + searchValue, "info");
                }}
              >
                <i className="modus-icons mr-2">search</i>
                Show Search Value
              </ModusWcButton>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Current State
            </h4>
            <div className="bg-background p-4 rounded text-sm text-foreground">
              <div>
                <strong>Search Value:</strong> &quot;{searchValue}&quot;
              </div>
              <div>
                <strong>Selected Items:</strong> {selectedItems.length}
              </div>
              <div>
                <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
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
        <div className="max-h-64 overflow-y-auto border border-border rounded p-4 bg-background">
          {eventLogs.map((log, index) => (
            <div key={index} className="flex gap-4 mb-2 font-mono text-sm">
              <span className="text-foreground min-w-20">{log.timestamp}</span>
              <span
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
              </span>
            </div>
          ))}
          {eventLogs.length === 0 && (
            <div className="text-foreground italic text-center p-8">
              Interact with the autocomplete components to see events logged
              here...
            </div>
          )}
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Usage Examples
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Basic Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusAutocomplete
  label="Select Item"
  placeholder="Type to search..."
  items={items}
  onItemSelect={handleSelect}
/>`}
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </h4>
            <pre className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusAutocomplete
  label="Multi-Select"
  placeholder="Type to search..."
  items={items}
  multiSelect
  leaveMenuOpen
  showSpinner={loading}
  debounceMs={500}
  onItemSelect={handleSelect}
  onChipRemove={handleRemove}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
