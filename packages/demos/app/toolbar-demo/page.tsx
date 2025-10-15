"use client";

import { useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusToolbar from "../../../app/components/ModusToolbar";
import ModusButton from "../../../app/components/ModusButton";
import ModusTextInput from "../../../app/components/ModusTextInput";
import ModusBadge from "../../../app/components/ModusBadge";
import ModusAvatar from "../../../app/components/ModusAvatar";
import ModusSwitch from "../../../app/components/ModusSwitch";

type ProjectView = "table" | "board" | "timeline";

export default function ToolbarDemoPage() {
  const [projectView, setProjectView] = useState<ProjectView>("table");
  const [compactMode, setCompactMode] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "North region",
    "Priority: High",
    "Status: In progress",
  ]);

  const activeFiltersSummary = useMemo(
    () => `${activeFilters.length} filters applied`,
    [activeFilters.length]
  );

  const toolbarDensityClass = compactMode
    ? "bg-background rounded-lg px-3 py-2 gap-3"
    : "bg-background rounded-lg px-5 py-4 gap-5";

  const toolbarBorderStyle = { border: "1px solid var(--border)" };

  const renderFilterBadges = () =>
    activeFilters.map((filter) => (
      <ModusBadge
        key={filter}
        size="sm"
        variant="filled"
        color="secondary"
        customClass="flex items-center gap-1"
      >
        <div>{filter}</div>
        <ModusWcButton
          color="primary"
          variant="borderless"
          size="xs"
          aria-label={`Remove filter ${filter}`}
          onButtonClick={() =>
            setActiveFilters((previous) =>
              previous.filter((value) => value !== filter)
            )
          }
        >
          x
        </ModusWcButton>
      </ModusBadge>
    ));

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-3">
        <div className="text-4xl font-semibold text-foreground">
          Modus Toolbar Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80 max-w-3xl mx-auto leading-relaxed">
          Arrange header content into start, center, and end slots. Toolbars
          power bespoke application shells, sticky page actions, and compact
          utility strips while staying aligned with Modus spacing tokens.
        </div>
      </div>

      <div
        className="p-8 bg-card rounded-lg space-y-6"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-foreground">
              Application shell toolbar
            </div>
            <div className="text-sm text-foreground opacity-75 leading-relaxed max-w-xl">
              Combine navigation, global search, and quick actions. The toolbar
              evenly distributes regions while respecting flex sizing of slotted
              content.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <ModusButton
              color="secondary"
              variant="outlined"
              size="sm"
              onButtonClick={() => setProjectView("table")}
            >
              Reset state
            </ModusButton>
            <ModusButton color="primary" size="sm">
              Launch demo
            </ModusButton>
          </div>
        </div>

        <div
          style={{ border: "1px solid var(--border)" }}
          className="rounded-lg"
        >
          <ModusToolbar
            ariaLabel="Primary application toolbar"
            className="bg-background rounded-lg px-5 py-4 gap-4 shadow-sm"
            startContent={
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-base font-semibold">
                  TM
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-lg font-semibold text-foreground">
                    Trimble Manager
                  </div>
                  <div className="text-xs text-foreground opacity-70">
                    Field operations control
                  </div>
                </div>
              </div>
            }
            centerContent={
              <div className="w-full max-w-md">
                <ModusTextInput
                  placeholder="Search projects, tasks, or people..."
                  includeSearch
                  size="md"
                  customClass="w-full"
                  type="search"
                />
              </div>
            }
            endContent={
              <div className="flex items-center gap-2">
                <ModusButton
                  variant="borderless"
                  shape="circle"
                  icon="notifications"
                  iconPosition="only"
                  ariaLabel="Notifications"
                >
                  Notifications
                </ModusButton>
                <ModusButton
                  variant="borderless"
                  shape="circle"
                  icon="help"
                  iconPosition="only"
                  ariaLabel="Help center"
                >
                  Help
                </ModusButton>
                <ModusAvatar
                  alt="Jordan Smith"
                  size="sm"
                  imgSrc="https://i.pravatar.cc/100?img=12"
                />
              </div>
            }
          />
        </div>

        <div className="text-sm text-foreground opacity-70 leading-relaxed">
          Toolbar flex regions grow or shrink with their contents. The search
          input uses a max width to avoid overwhelming the layout on large
          screens.
        </div>
      </div>

      <div
        className="p-8 bg-card rounded-lg space-y-6"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-foreground">
              Page level actions
            </div>
            <div className="text-sm text-foreground opacity-75 leading-relaxed max-w-xl">
              Secondary toolbars sit beneath the global header to expose
              contextual controls, active filters, and view toggles without
              crowding the page.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-foreground opacity-75">
              {activeFiltersSummary}
            </div>
            <ModusSwitch
              value={compactMode}
              size="sm"
              onInputChange={(event) => {
                const switchEl =
                  event.target as HTMLModusWcSwitchElement | null;
                setCompactMode(Boolean(switchEl?.value));
              }}
            />
            <div className="text-sm text-foreground opacity-75">
              Compact layout
            </div>
          </div>
        </div>

        <div style={toolbarBorderStyle} className="rounded-lg">
          <ModusToolbar
            ariaLabel="Project filters toolbar"
            className={toolbarDensityClass}
            startContent={
              <div className="flex items-center gap-2 flex-wrap">
                {renderFilterBadges()}
                {activeFilters.length === 0 && (
                  <div className="text-sm text-foreground opacity-60">
                    No filters applied
                  </div>
                )}
              </div>
            }
            centerContent={
              <div className="flex items-center gap-2 justify-center">
                <ModusButton
                  variant={projectView === "table" ? "filled" : "outlined"}
                  color={projectView === "table" ? "primary" : "secondary"}
                  size="sm"
                  icon="table"
                  onButtonClick={() => setProjectView("table")}
                >
                  Table
                </ModusButton>
                <ModusButton
                  variant={projectView === "board" ? "filled" : "outlined"}
                  color={projectView === "board" ? "primary" : "secondary"}
                  size="sm"
                  icon="view_kanban"
                  onButtonClick={() => setProjectView("board")}
                >
                  Board
                </ModusButton>
                <ModusButton
                  variant={projectView === "timeline" ? "filled" : "outlined"}
                  color={projectView === "timeline" ? "primary" : "secondary"}
                  size="sm"
                  icon="timeline"
                  onButtonClick={() => setProjectView("timeline")}
                >
                  Timeline
                </ModusButton>
              </div>
            }
            endContent={
              <div className="flex items-center gap-2">
                <ModusButton
                  size="sm"
                  variant="outlined"
                  icon="refresh"
                  onButtonClick={() => setActiveFilters([])}
                >
                  Clear filters
                </ModusButton>
                <ModusButton size="sm" icon="download">
                  Export
                </ModusButton>
                <ModusButton size="sm" color="primary" icon="add">
                  New project
                </ModusButton>
              </div>
            }
          />
        </div>

        <div
          className="bg-background rounded-lg p-6"
          style={{ border: "1px dashed var(--border)" }}
        >
          <div className="text-sm text-foreground opacity-70 leading-relaxed">
            Selected view: <span className="font-semibold">{projectView}</span>.
            Use the toggle buttons above to simulate view switching while the
            toolbar keeps actions aligned across breakpoints.
          </div>
        </div>
      </div>

      <div
        className="p-8 bg-card rounded-lg space-y-6"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-foreground">
            Utility and footer toolbars
          </div>
          <div className="text-sm text-foreground opacity-75 leading-relaxed max-w-3xl">
            Toolbars make lightweight status bars and footers. Stack multiple
            rows to present metadata without dedicating an entire layout
            section.
          </div>
        </div>

        <div className="space-y-4">
          <div
            style={{ border: "1px solid var(--border)" }}
            className="rounded-lg"
          >
            <ModusToolbar
              ariaLabel="Sync status toolbar"
              className="bg-background rounded-lg px-4 py-3"
              startContent={
                <div className="flex items-center gap-2 text-sm text-success">
                  <i className="modus-icons text-base">cloud_done</i>
                  Synced 3 minutes ago
                </div>
              }
              endContent={
                <div className="flex items-center gap-2">
                  <ModusBadge size="sm" variant="counter" color="success">
                    42
                  </ModusBadge>
                  <div className="text-sm text-foreground opacity-70">
                    Online devices
                  </div>
                  <ModusButton
                    size="sm"
                    variant="borderless"
                    icon="refresh"
                    onButtonClick={() => {
                      setActiveFilters((previous) => [...previous]);
                    }}
                  >
                    Refresh
                  </ModusButton>
                </div>
              }
            />
          </div>

          <div
            style={{ border: "1px solid var(--border)" }}
            className="rounded-lg"
          >
            <ModusToolbar
              ariaLabel="Footer toolbar"
              className="bg-background rounded-lg px-4 py-3"
              startContent={
                <div className="flex items-center gap-3 text-sm text-foreground opacity-75">
                  <div>© {new Date().getFullYear()} Trimble Inc.</div>
                  <ModusWcButton
                    color="primary"
                    variant="borderless"
                    onButtonClick={() => {}}
                  >
                    Privacy
                  </ModusWcButton>
                  <ModusWcButton
                    color="primary"
                    variant="borderless"
                    onButtonClick={() => {}}
                  >
                    Terms
                  </ModusWcButton>
                  <ModusWcButton
                    color="primary"
                    variant="borderless"
                    onButtonClick={() => {}}
                  >
                    Contact
                  </ModusWcButton>
                </div>
              }
              endContent={
                <div className="flex items-center gap-2 text-sm text-foreground opacity-70">
                  <i className="modus-icons text-base">info</i>
                  Version 2.1.0
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
