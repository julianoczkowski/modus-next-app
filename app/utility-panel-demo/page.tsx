"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import ModusUtilityPanel from "../components/ModusUtilityPanel";
import {
  ModusWcButton,
  ModusWcSwitch,
  ModusWcMenuItem,
} from "@trimble-oss/moduswebcomponents-react";
import ModusTextInput from "../components/ModusTextInput";
import ModusDropdownMenu from "../components/ModusDropdownMenu";

export default function UtilityPanelDemoPage() {
  const [expanded, setExpanded] = useState(true);
  const [position, setPosition] = useState<"left" | "right">("right");
  const [pushContent, setPushContent] = useState(false);
  const [panelWidth, setPanelWidth] = useState("320px");
  const [useCustomHeader, setUseCustomHeader] = useState(false);
  const [panelLog, setPanelLog] = useState<string[]>([]);
  const layoutRef = useRef<HTMLDivElement>(null);

  const logEvent = useCallback((message: string) => {
    setPanelLog((prev) => {
      const timestamp = new Date().toLocaleTimeString();
      return [`${timestamp} — ${message}`, ...prev].slice(0, 8);
    });
  }, []);

  const togglePanel = useCallback(() => {
    setExpanded((current) => !current);
  }, []);

  const resolvedHeader = useMemo(() => {
    if (!useCustomHeader) return undefined;

    return (
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-card">
        <div className="flex items-center gap-2 text-foreground">
          <i className="modus-icons text-xl">handyman</i>
          <div className="font-semibold">Field tools</div>
        </div>
        <ModusWcButton
          size="sm"
          variant="borderless"
          onButtonClick={togglePanel}
          aria-label="Close panel"
        >
          <i className="modus-icons">close</i>
        </ModusWcButton>
      </div>
    );
  }, [togglePanel, useCustomHeader]);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">
      <div className="text-center space-y-4">
        <div className="text-4xl font-semibold text-foreground">
          Modus Utility Panel Demo
        </div>
        <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
          The utility panel provides collapsible side content for filters,
          contextual actions, or supporting information. Toggle position, width,
          and behaviors to fit different workflows.
        </div>
        <ModusWcButton onButtonClick={togglePanel} color="primary" size="sm">
          {expanded ? "Collapse panel" : "Expand panel"}
        </ModusWcButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className="lg:col-span-8 bg-card rounded-lg p-6 space-y-6 relative"
          style={{ border: "1px solid var(--border)" }}
          ref={layoutRef}
        >
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-foreground">
              Primary workspace
            </div>
            <div className="text-sm text-foreground opacity-75 leading-relaxed">
              This area represents the main application content. When &quot;Push
              content&quot; is enabled, the panel you see on the side will slide
              this region to expose additional information without covering it.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="bg-background rounded-lg p-4 space-y-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm font-semibold text-foreground">
                Current project
              </div>
              <div className="text-foreground opacity-80">
                Riverside Campus Redevelopment
              </div>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                size="sm"
                onButtonClick={togglePanel}
              >
                Adjust filters
              </ModusWcButton>
            </div>

            <div
              className="bg-background rounded-lg p-4 space-y-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm font-semibold text-foreground">
                Site overview
              </div>
              <div className="text-sm text-foreground opacity-70 leading-relaxed">
                Monitor field teams, schedule updates, and inspection results in
                real time. Surface contextual insights using the utility panel.
              </div>
              <ModusDropdownMenu
                buttonVariant="outlined"
                buttonSize="sm"
                customClass="w-full"
              >
                <div slot="menu">
                  <ModusWcMenuItem label="Open activity log" value="activity" />
                  <ModusWcMenuItem label="View analytics" value="analytics" />
                  <ModusWcMenuItem label="Export report" value="export" />
                </div>
                <div
                  slot="button"
                  className="flex items-center justify-between w-full gap-2"
                >
                  <div className="text-sm text-foreground opacity-80">
                    Quick actions
                  </div>
                  <i className="modus-icons text-base">expand_more</i>
                </div>
              </ModusDropdownMenu>
            </div>
          </div>
        </div>

        <div
          className="lg:col-span-4 bg-card rounded-lg p-6 space-y-6"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-lg font-semibold text-foreground">
            Panel configuration
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground opacity-80">
                Show custom header
              </div>
              <ModusWcSwitch
                value={useCustomHeader}
                onInputChange={() => setUseCustomHeader((v) => !v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground opacity-80">
                Push main content
              </div>
              <ModusWcSwitch
                value={pushContent}
                onInputChange={() => setPushContent((v) => !v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground opacity-80">
                Panel position
              </div>
              <div className="flex gap-2">
                <ModusWcButton
                  size="sm"
                  variant={position === "left" ? "filled" : "outlined"}
                  color={position === "left" ? "primary" : "secondary"}
                  onButtonClick={() => setPosition("left")}
                >
                  Left
                </ModusWcButton>
                <ModusWcButton
                  size="sm"
                  variant={position === "right" ? "filled" : "outlined"}
                  color={position === "right" ? "primary" : "secondary"}
                  onButtonClick={() => setPosition("right")}
                >
                  Right
                </ModusWcButton>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-foreground opacity-80">
                Panel width
              </div>
              <ModusTextInput
                value={panelWidth}
                onInputChange={(event: CustomEvent<InputEvent>) => {
                  const element = event.target as HTMLModusWcTextInputElement;
                  if (!element) return;
                  setPanelWidth(element.value || "320px");
                }}
                aria-label="Panel width"
                size="md"
                bordered
              />
              <div className="text-xs text-foreground opacity-60">
                Accepts CSS units (px, rem, %, etc.)
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">
              Panel events
            </div>
            <div
              className="bg-background rounded-lg p-3 min-h-24 space-y-1"
              style={{ border: "1px solid var(--border)" }}
            >
              {panelLog.length === 0 ? (
                <div className="text-sm text-foreground opacity-60">
                  Interact with the panel to see event logs.
                </div>
              ) : (
                panelLog.map((entry) => (
                  <div
                    key={entry}
                    className="text-xs text-foreground opacity-80"
                  >
                    {entry}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ModusUtilityPanel
        expanded={expanded}
        position={position}
        pushContent={pushContent}
        panelWidth={panelWidth}
        headerText={!useCustomHeader ? "Project filters" : undefined}
        headerSlot={resolvedHeader}
        ariaLabel="Project utility panel"
        ariaExpanded={expanded}
        targetElement={pushContent ? layoutRef.current : null}
        onPanelOpened={() => logEvent("Panel expanded")}
        onPanelClosed={() => logEvent("Panel collapsed")}
        className="bg-background"
      >
        <div className="p-4 space-y-6 text-foreground">
          <div className="space-y-3">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Status filters
            </div>
            <ModusWcSwitch label="Show active issues" value />
            <ModusWcSwitch label="Include archived" />
            <ModusWcSwitch label="Only my assignments" />
          </div>

          <div className="space-y-3">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Quick adjustments
            </div>
            <ModusTextInput label="Owner" placeholder="Search people" />
            <ModusTextInput label="Tag" placeholder="Add tag" />
          </div>

          <div className="space-y-3">
            <div className="text-sm uppercase tracking-wide text-muted-foreground">
              Actions
            </div>
            <ModusWcButton color="primary" fullWidth>
              Apply filters
            </ModusWcButton>
            <ModusWcButton color="secondary" variant="outlined" fullWidth>
              Reset values
            </ModusWcButton>
          </div>
        </div>
      </ModusUtilityPanel>
    </div>
  );
}
