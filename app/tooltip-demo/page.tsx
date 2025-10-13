"use client";

import { useMemo, useState } from "react";
import ModusTooltip from "../components/ModusTooltip";
import ModusButton from "../components/ModusButton";
import ModusBadge from "../components/ModusBadge";
import ModusSwitch from "../components/ModusSwitch";
import ModusTextInput from "../components/ModusTextInput";

type TooltipPosition = "auto" | "top" | "bottom" | "left" | "right";

const positionOptions: { label: string; value: TooltipPosition }[] = [
  { label: "Auto", value: "auto" },
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
];

export default function TooltipDemoPage() {
  const [selectedPosition, setSelectedPosition] =
    useState<TooltipPosition>("auto");
  const [forceOpen, setForceOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const positionSummary = useMemo(
    () =>
      `Preferred placement: ${selectedPosition
        .charAt(0)
        .toUpperCase()}${selectedPosition.slice(1)}`,
    [selectedPosition]
  );

  const controlTooltipId = "tooltip-control-example";

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-3">
        <div className="text-4xl font-semibold text-foreground">
          Modus Tooltip Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80 max-w-3xl mx-auto leading-relaxed">
          Tooltips reveal concise helper text on hover, focus, or touch. Wrap
          any trigger element to add positioning, timing, and accessibility
          without reinventing interaction logic.
        </div>
      </div>

      <div
        className="p-8 bg-card rounded-lg space-y-6"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-foreground">
              Basic usage
            </div>
            <div className="text-sm text-foreground opacity-75 leading-relaxed max-w-xl">
              Hover or focus the controls below. Each tooltip wraps a single
              trigger element and automatically mirrors focus interactions for
              keyboard users.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <ModusButton
              color="secondary"
              variant="outlined"
              size="sm"
              onButtonClick={() => {
                setSelectedPosition("auto");
                setForceOpen(false);
                setDisabled(false);
              }}
            >
              Reset examples
            </ModusButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="bg-background rounded-lg p-6 space-y-4"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Quick actions
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <ModusTooltip content="Create a new project">
                <ModusButton size="sm" icon="add">
                  New project
                </ModusButton>
              </ModusTooltip>
              <ModusTooltip content="Sync changes to the cloud">
                <ModusButton size="sm" icon="cloud_upload">
                  Sync
                </ModusButton>
              </ModusTooltip>
              <ModusTooltip content="Pending approval">
                <ModusBadge color="warning" variant="filled" size="sm">
                  Pending
                </ModusBadge>
              </ModusTooltip>
            </div>
          </div>

          <div
            className="bg-background rounded-lg p-6 space-y-4"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Form helper
            </div>
            <div className="space-y-3">
              <div className="text-sm text-foreground opacity-70">
                Tooltips can annotate inputs without occupying layout space.
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <ModusTextInput
                    placeholder="Project code"
                    includeClear
                    size="md"
                  />
                </div>
                <ModusTooltip content="Codes must be 6 uppercase characters">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    ?
                  </div>
                </ModusTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-8 bg-card rounded-lg space-y-6"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-foreground">
              Placement controls
            </div>
            <div className="text-sm text-foreground opacity-75 leading-relaxed max-w-xl">
              Choose a preferred side or let the component flip automatically.
              The tooltip repositions itself if the requested placement has
              limited space.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <div className="text-xs uppercase text-muted-foreground mb-1 tracking-wide">
                Position
              </div>
              <select
                className="bg-background rounded px-3 py-2 text-sm text-foreground"
                style={{ border: "1px solid var(--border)" }}
                value={selectedPosition}
                onChange={(event) =>
                  setSelectedPosition(event.target.value as TooltipPosition)
                }
              >
                {positionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <ModusSwitch
                value={forceOpen}
                size="sm"
                onInputChange={(event) => {
                  const switchElement =
                    event.target as HTMLModusWcSwitchElement | null;
                  setForceOpen(Boolean(switchElement?.value));
                }}
              />
              <div className="text-sm text-foreground opacity-80">
                Force open
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ModusSwitch
                value={disabled}
                size="sm"
                onInputChange={(event) => {
                  const switchElement =
                    event.target as HTMLModusWcSwitchElement | null;
                  setDisabled(Boolean(switchElement?.value));
                }}
              />
              <div className="text-sm text-foreground opacity-80">
                Disable tooltip
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-background rounded-lg p-10"
          style={{ border: "1px dashed var(--border)" }}
        >
          <div className="text-sm text-foreground opacity-70 mb-6">
            {positionSummary}. Interact with the icon below to observe the
            placement and toggles.
          </div>
          <div className="flex items-center justify-center">
            <ModusTooltip
              content="Export the current report"
              position={selectedPosition}
              forceOpen={forceOpen}
              disabled={disabled}
            >
              <ModusButton
                variant="borderless"
                shape="circle"
                icon="ios_share"
                iconPosition="only"
                ariaLabel="Export report"
              >
                Export
              </ModusButton>
            </ModusTooltip>
          </div>
        </div>
      </div>

      <div
        className="p-8 bg-card rounded-lg space-y-6"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-foreground">
            Accessibility wiring
          </div>
          <div className="text-sm text-foreground opacity-75 leading-relaxed max-w-3xl">
            Reference tooltips outside of direct triggers using `tooltip-id`.
            The tooltip applies `role=&quot;tooltip&quot;` and connects
            assistive technology through `aria-describedby`.
          </div>
        </div>

        <div
          className="bg-background rounded-lg p-6 space-y-4"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <ModusTextInput
              placeholder="Save location"
              size="md"
              inputId="save-location"
              aria-label="Save location"
            />
            <ModusButton color="primary" size="sm" ariaLabel="Save changes">
              Save
            </ModusButton>
          </div>
          <div
            className="text-sm text-foreground opacity-80"
            aria-describedby={controlTooltipId}
          >
            Need help understanding the save rules?
          </div>
          <ModusTooltip
            content="Saving updates the shared workspace. Ensure the target folder is available to collaborators."
            tooltipId={controlTooltipId}
            forceOpen
            position="bottom"
          />
        </div>
      </div>
    </div>
  );
}
