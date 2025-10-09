"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusSelect, {
  ModusSelectOption,
  ModusSelectFeedback,
} from "../components/ModusSelect";

const REGION_OPTIONS: ModusSelectOption[] = [
  { label: "Select a region", value: "" },
  { label: "North America", value: "na" },
  { label: "Europe", value: "eu" },
  { label: "Asia Pacific", value: "apac" },
  { label: "Latin America", value: "latam" },
];

const ROLE_OPTIONS: ModusSelectOption[] = [
  { label: "Choose a persona", value: "" },
  { label: "Project Manager", value: "manager" },
  { label: "Field Engineer", value: "engineer" },
  { label: "Quality Inspector", value: "inspector" },
  { label: "Survey Specialist", value: "survey" },
];

const ENVIRONMENT_OPTIONS: ModusSelectOption[] = [
  { label: "Production", value: "prod" },
  { label: "Staging", value: "stage" },
  { label: "Testing", value: "test", disabled: true },
];

const SIZE_VARIANTS: Array<{ label: string; size: "sm" | "md" | "lg" }> = [
  { label: "Small (sm)", size: "sm" },
  { label: "Medium (md)", size: "md" },
  { label: "Large (lg)", size: "lg" },
];

interface ConfigurationState {
  region: string;
  role: string;
  environment: string;
  dataSource: string;
  schedule: string;
}

export default function SelectDemoPage() {
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    region: "",
    role: "",
    environment: "prod",
    dataSource: "",
    schedule: "weekly",
  });
  const [feedback, setFeedback] = useState<ModusSelectFeedback | undefined>();
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [catalog, setCatalog] = useState<ModusSelectOption[]>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);

  const dataSourceOptions = useMemo<ModusSelectOption[]>(() => {
    if (configuration.region === "na") {
      return [
        { label: "Trimble Connect", value: "connect" },
        { label: "Tekla Model Sharing", value: "tekla" },
        { label: "Skyward Drone Maps", value: "skyward" },
      ];
    }

    if (configuration.region === "eu") {
      return [
        { label: "Quadri Projects", value: "quadri" },
        { label: "Novapoint Assets", value: "novapoint" },
        { label: "Cityworks EU", value: "cityworks" },
      ];
    }

    return [
      { label: "Select region first", value: "" },
      { label: "Global BIM 360", value: "bim360" },
      { label: "Autodesk Construction Cloud", value: "acc" },
    ];
  }, [configuration.region]);

  const scheduleOptions = useMemo<ModusSelectOption[]>(() => {
    const base: ModusSelectOption[] = [
      { label: "On demand", value: "adhoc" },
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Monthly", value: "monthly" },
    ];

    if (configuration.environment === "prod") {
      return base;
    }

    return base.map((option) =>
      option.value === "monthly"
        ? { ...option, disabled: true }
        : { ...option }
    );
  }, [configuration.environment]);

  const resetConfiguration = () => {
    setConfiguration({
      region: "",
      role: "",
      environment: "prod",
      dataSource: "",
      schedule: "weekly",
    });
    setFeedback(undefined);
    logEvent("Reset all select values to defaults");
  };

  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((previous) => {
      const next = [`${timestamp} — ${message}`, ...previous];
      return next.slice(0, 15);
    });
  }, []);

  const handleSelectChange = useCallback(
    (field: keyof ConfigurationState) =>
      (event: CustomEvent<InputEvent>) => {
        const select = event.target as HTMLModusWcSelectElement | null;
        if (!select) {
          return;
        }

        const newValue = select.value;
        setConfiguration((prev) => ({
          ...prev,
          [field]: newValue,
        }));

        logEvent(
          `Updated ${field} to "${newValue || "none"}" (${select.label ?? ""})`
        );

        if (field === "region" && !newValue) {
          setFeedback({
            level: "warning",
            message: "Region is required before selecting a data source.",
          });
        } else if (field === "region" && newValue) {
          setFeedback(undefined);
        }
      },
    [logEvent]
  );

  useEffect(() => {
    let active = true;
    setLoadingCatalog(true);

    const timer = window.setTimeout(() => {
      if (!active) return;

      const fetchedOptions: ModusSelectOption[] = [
        { label: "Bridge Construction Package", value: "bridge" },
        { label: "Highway Alignment Set", value: "highway" },
        { label: "Mining Survey Bundle", value: "mining" },
        { label: "Rail Expansion Draft", value: "rail" },
      ];

      setCatalog(fetchedOptions);
      setLoadingCatalog(false);
      logEvent("Loaded catalog options from remote API");
    }, 900);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [logEvent]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Select Component Demo
          </div>
          <p className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Configure dropdown menus with design-system-compliant styling,
            required logic, validation feedback, and event-driven state updates.
            Options are always provided via JavaScript arrays for predictable
            rendering.
          </p>
        </div>

        {/* Project Configuration */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                Project Configuration
              </div>
              <p className="text-sm text-foreground opacity-80">
                Each select is a controlled React value. Events emitted by the
                Modus component keep the state in sync.
              </p>
            </div>
            <div className="flex gap-3">
              <ModusWcButton
                color="primary"
                variant="outlined"
                size="sm"
                onButtonClick={resetConfiguration}
              >
                Reset configuration
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                size="sm"
                onButtonClick={() =>
                  logEvent(
                    `Saved configuration (region: ${
                      configuration.region || "none"
                    }, role: ${configuration.role || "none"}, environment: ${
                      configuration.environment
                    })`
                  )
                }
              >
                Log snapshot
              </ModusWcButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <ModusSelect
                label="Project region"
                required
                options={REGION_OPTIONS}
                value={configuration.region}
                feedback={feedback}
                onInputChange={handleSelectChange("region")}
              />
              <ModusSelect
                label="Primary role"
                options={ROLE_OPTIONS}
                value={configuration.role}
                onInputChange={handleSelectChange("role")}
              />
            </div>
            <div className="space-y-4">
              <ModusSelect
                label="Deployment environment"
                options={ENVIRONMENT_OPTIONS}
                value={configuration.environment}
                onInputChange={handleSelectChange("environment")}
              />
              <ModusSelect
                label="Data sync schedule"
                options={scheduleOptions}
                value={configuration.schedule}
                onInputChange={handleSelectChange("schedule")}
              />
            </div>
          </div>

          <div className="mt-6 bg-background border border-border rounded-lg p-4">
            <div className="text-sm text-foreground opacity-80">
              Selected region:{" "}
              <span className="font-semibold text-foreground">
                {configuration.region || "none"}
              </span>{" "}
              • role:{" "}
              <span className="font-semibold text-foreground">
                {configuration.role || "unassigned"}
              </span>{" "}
              • environment:{" "}
              <span className="font-semibold text-foreground">
                {configuration.environment}
              </span>
            </div>
          </div>
        </div>

        {/* Dependent Options */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Dependent Option Sets
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Data source (filtered by region)
              </div>
              <ModusSelect
                label="Integration source"
                options={dataSourceOptions}
                value={configuration.dataSource}
                onInputChange={handleSelectChange("dataSource")}
                aria-label="Select data integration source"
              />
              <div className="text-xs text-foreground opacity-70">
                The available integration targets adjust based on the chosen
                region. A placeholder guides users to make the prerequisite
                selection.
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Remote catalog (async)
              </div>
              <ModusSelect
                label={loadingCatalog ? "Loading catalog..." : "Project catalog"}
                options={
                  loadingCatalog
                    ? [{ label: "Fetching data…", value: "" }]
                    : catalog
                }
                value=""
                disabled={loadingCatalog}
                aria-label="Catalog selection"
              />
              <div className="text-xs text-foreground opacity-70">
                Catalog options load asynchronously. Disable the control while
                waiting and replace once data arrives.
              </div>
            </div>
          </div>
        </div>

        {/* Size Variants */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Size &amp; Layout Variations
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SIZE_VARIANTS.map((variant) => (
              <div
                key={variant.size}
                className="bg-background border border-border rounded-lg p-5 flex flex-col gap-3"
                style={{ borderWidth: "1px" }}
              >
                <div className="text-sm font-semibold text-foreground">
                  {variant.label}
                </div>
                <ModusSelect
                  label={`${variant.label} select`}
                  size={variant.size}
                  options={[
                    { label: "Option A", value: "a" },
                    { label: "Option B", value: "b" },
                    { label: "Option C", value: "c" },
                  ]}
                  value="a"
                />
                <div className="text-xs text-foreground opacity-70">
                  Match select size with neighbouring inputs to align field
                  heights.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disabled & Custom Width */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Disabled &amp; Custom Styling
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">
                Disabled select with helper text
              </div>
              <ModusSelect
                label="Package choice"
                options={[
                  { label: "Premium bundle (locked)", value: "premium" },
                ]}
                value="premium"
                disabled
                feedback={{
                  level: "info",
                  message: "You need elevated permissions to modify this.",
                }}
              />
            </div>
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">
                Fixed width using custom class
              </div>
              <ModusSelect
                label="Schedule window"
                customClass="select-fixed"
                options={[
                  { label: "Morning (08:00 - 12:00)", value: "am" },
                  { label: "Afternoon (12:00 - 16:00)", value: "pm" },
                  { label: "Evening (16:00 - 20:00)", value: "eve" },
                ]}
                value="am"
              />
              <div className="text-xs text-foreground opacity-70">
                Apply `custom-class` to the host wrapper for layout-specific
                widths while keeping token-based colours.
              </div>
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div
          className="p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-4">
            Event Log
          </div>
          <div className="text-sm text-foreground opacity-70 mb-4">
            Monitor the `inputChange` payload emitted from Modus selects to
            confirm form wiring.
          </div>
          <div className="bg-background border border-border rounded-lg p-4 min-h-40">
            {eventLog.length === 0 ? (
              <div className="text-sm text-foreground opacity-60">
                Interact with any select above to populate the log.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {eventLog.map((entry, index) => (
                  <div
                    key={`${entry}-${index}`}
                    className="text-sm text-foreground leading-relaxed"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .select-fixed {
          width: 18rem;
        }
      `}</style>
    </>
  );
}
