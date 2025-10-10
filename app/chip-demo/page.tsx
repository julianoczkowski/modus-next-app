"use client";

import { useState, useCallback } from "react";
import ModusChip from "../components/ModusChip";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface EventLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function ChipDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set());
  const [removedChips, setRemovedChips] = useState<Set<string>>(new Set());

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

  const handleChipClick = useCallback(
    (chipId: string) => () => {
      setSelectedChips((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(chipId)) {
          newSet.delete(chipId);
          logEvent(`Chip "${chipId}" deselected`, "info");
        } else {
          newSet.add(chipId);
          logEvent(`Chip "${chipId}" selected`, "success");
        }
        return newSet;
      });
    },
    [logEvent]
  );

  const handleChipRemove = useCallback(
    (chipId: string) => () => {
      setRemovedChips((prev) => new Set(prev).add(chipId));
      logEvent(`Chip "${chipId}" removed`, "warning");
    },
    [logEvent]
  );

  const sizes: Array<{
    value: "sm" | "md" | "lg";
    label: string;
    description: string;
  }> = [
    { value: "sm", label: "Small", description: "20px height" },
    { value: "md", label: "Medium", description: "24px height (default)" },
    { value: "lg", label: "Large", description: "28px height" },
  ];

  const variants: Array<{
    value: "filled" | "outline";
    label: string;
    description: string;
  }> = [
    { value: "filled", label: "Filled", description: "Solid background" },
    {
      value: "outline",
      label: "Outline",
      description: "Transparent with border",
    },
  ];

  const resetAllChips = () => {
    setSelectedChips(new Set());
    setRemovedChips(new Set());
    logEvent("All chips reset", "info");
  };

  const selectAllChips = () => {
    const allChipIds = [
      "basic",
      "outline",
      "active",
      "error",
      "disabled",
      "removable",
    ];
    setSelectedChips(new Set(allChipIds));
    logEvent("All chips selected", "success");
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Chip Demo
        </div>
        <div className="text-lg leading-relaxed text-foreground text-center">
          Explore the Modus Chip component with different variants, states, and
          interactive features.
        </div>
      </div>

      {/* Basic Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Basic Chip Examples
        </div>
        <div className="text-foreground mb-6">
          Simple chips with different configurations and states.
        </div>
        <div className="flex flex-wrap gap-4">
          <ModusChip
            label="Basic Chip"
            onChipClick={handleChipClick("basic")}
            active={selectedChips.has("basic")}
          />
          <ModusChip
            label="Outline Chip"
            variant="outline"
            onChipClick={handleChipClick("outline")}
            active={selectedChips.has("outline")}
          />
          <ModusChip
            label="Active Chip"
            active
            onChipClick={handleChipClick("active")}
          />
          <ModusChip
            label="Error Chip"
            hasError
            showRemove
            onChipClick={handleChipClick("error")}
            onChipRemove={handleChipRemove("error")}
            active={selectedChips.has("error")}
          />
          <ModusChip label="Disabled Chip" disabled />
          <ModusChip
            label="Removable Chip"
            showRemove
            onChipClick={handleChipClick("removable")}
            onChipRemove={handleChipRemove("removable")}
            active={selectedChips.has("removable")}
          />
        </div>
      </div>

      {/* Size Variants */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Size Variants
        </div>
        <div className="text-foreground mb-6">
          Different chip sizes for various contexts and importance levels.
        </div>
        <div className="space-y-4">
          {sizes.map((size) => (
            <div key={size.value}>
              <div className="text-lg font-semibold mb-3 text-foreground">
                {size.label} ({size.description})
              </div>
              <div className="flex flex-wrap gap-4">
                <ModusChip
                  size={size.value}
                  label={`${size.label} Filled`}
                  variant="filled"
                  onChipClick={handleChipClick(`${size.value}-filled`)}
                  active={selectedChips.has(`${size.value}-filled`)}
                />
                <ModusChip
                  size={size.value}
                  label={`${size.label} Outline`}
                  variant="outline"
                  onChipClick={handleChipClick(`${size.value}-outline`)}
                  active={selectedChips.has(`${size.value}-outline`)}
                />
                <ModusChip
                  size={size.value}
                  label={`${size.label} Removable`}
                  variant="filled"
                  showRemove
                  onChipClick={handleChipClick(`${size.value}-removable`)}
                  onChipRemove={handleChipRemove(`${size.value}-removable`)}
                  active={selectedChips.has(`${size.value}-removable`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variant Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Variant Examples
        </div>
        <div className="text-foreground mb-6">
          Filled and outline variants with different states.
        </div>
        <div className="space-y-6">
          {variants.map((variant) => (
            <div key={variant.value}>
              <div className="text-lg font-semibold mb-3 text-foreground">
                {variant.label} Variant ({variant.description})
              </div>
              <div className="flex flex-wrap gap-4">
                <ModusChip
                  variant={variant.value}
                  label={`${variant.label} Normal`}
                  onChipClick={handleChipClick(`${variant.value}-normal`)}
                  active={selectedChips.has(`${variant.value}-normal`)}
                />
                <ModusChip
                  variant={variant.value}
                  label={`${variant.label} Active`}
                  active
                  onChipClick={handleChipClick(`${variant.value}-active`)}
                />
                <ModusChip
                  variant={variant.value}
                  label={`${variant.label} Error`}
                  hasError
                  onChipClick={handleChipClick(`${variant.value}-error`)}
                  active={selectedChips.has(`${variant.value}-error`)}
                />
                <ModusChip
                  variant={variant.value}
                  label={`${variant.label} Disabled`}
                  disabled
                />
                <ModusChip
                  variant={variant.value}
                  label={`${variant.label} Removable`}
                  showRemove
                  onChipClick={handleChipClick(`${variant.value}-removable`)}
                  onChipRemove={handleChipRemove(`${variant.value}-removable`)}
                  active={selectedChips.has(`${variant.value}-removable`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chip with Content */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Chips with Content
        </div>
        <div className="text-foreground mb-6">
          Chips containing icons, avatars, and other content.
        </div>
        <div className="flex flex-wrap gap-4">
          {/* Chip with Icon */}
          <ModusChip
            label="Success"
            showRemove
            onChipClick={handleChipClick("success-chip")}
            onChipRemove={handleChipRemove("success-chip")}
            active={selectedChips.has("success-chip")}
          >
            <i className="modus-icons mr-1">check_circle</i>
          </ModusChip>

          {/* Chip with Warning Icon */}
          <ModusChip
            label="Warning"
            variant="outline"
            showRemove
            onChipClick={handleChipClick("warning-chip")}
            onChipRemove={handleChipRemove("warning-chip")}
            active={selectedChips.has("warning-chip")}
          >
            <i className="modus-icons mr-1">warning</i>
          </ModusChip>

          {/* Chip with Error Icon */}
          <ModusChip
            label="Error"
            hasError
            showRemove
            onChipClick={handleChipClick("error-chip")}
            onChipRemove={handleChipRemove("error-chip")}
            active={selectedChips.has("error-chip")}
          >
            <i className="modus-icons mr-1">error</i>
          </ModusChip>

          {/* Chip with Info Icon */}
          <ModusChip
            label="Info"
            variant="outline"
            onChipClick={handleChipClick("info-chip")}
            active={selectedChips.has("info-chip")}
          >
            <i className="modus-icons mr-1">info</i>
          </ModusChip>

          {/* Chip with Star Icon */}
          <ModusChip
            label="Favorite"
            showRemove
            onChipClick={handleChipClick("favorite-chip")}
            onChipRemove={handleChipRemove("favorite-chip")}
            active={selectedChips.has("favorite-chip")}
          >
            <i className="modus-icons mr-1">star</i>
          </ModusChip>

          {/* Icon-only Chip */}
          <ModusChip
            aria-label="Settings chip"
            showRemove
            onChipClick={handleChipClick("settings-chip")}
            onChipRemove={handleChipRemove("settings-chip")}
            active={selectedChips.has("settings-chip")}
          >
            <i className="modus-icons">settings</i>
          </ModusChip>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Real-world Examples
        </div>
        <div className="text-foreground mb-6">
          Common chip patterns used in applications.
        </div>
        <div className="space-y-8">
          {/* Filter Chips */}
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Filter Chips
            </div>
            <div className="flex flex-wrap gap-2">
              <ModusChip
                label="All"
                active
                onChipClick={handleChipClick("filter-all")}
              />
              <ModusChip
                label="Active"
                variant="outline"
                onChipClick={handleChipClick("filter-active")}
                active={selectedChips.has("filter-active")}
              />
              <ModusChip
                label="Completed"
                variant="outline"
                onChipClick={handleChipClick("filter-completed")}
                active={selectedChips.has("filter-completed")}
              />
              <ModusChip
                label="Pending"
                variant="outline"
                onChipClick={handleChipClick("filter-pending")}
                active={selectedChips.has("filter-pending")}
              />
            </div>
          </div>

          {/* Tag Chips */}
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Tag Chips
            </div>
            <div className="flex flex-wrap gap-2">
              <ModusChip
                label="React"
                showRemove
                onChipClick={handleChipClick("tag-react")}
                onChipRemove={handleChipRemove("tag-react")}
                active={selectedChips.has("tag-react")}
              />
              <ModusChip
                label="TypeScript"
                showRemove
                onChipClick={handleChipClick("tag-typescript")}
                onChipRemove={handleChipRemove("tag-typescript")}
                active={selectedChips.has("tag-typescript")}
              />
              <ModusChip
                label="Next.js"
                showRemove
                onChipClick={handleChipClick("tag-nextjs")}
                onChipRemove={handleChipRemove("tag-nextjs")}
                active={selectedChips.has("tag-nextjs")}
              />
              <ModusChip
                label="Tailwind"
                showRemove
                onChipClick={handleChipClick("tag-tailwind")}
                onChipRemove={handleChipRemove("tag-tailwind")}
                active={selectedChips.has("tag-tailwind")}
              />
            </div>
          </div>

          {/* Status Chips */}
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Status Chips
            </div>
            <div className="flex flex-wrap gap-2">
              <ModusChip
                label="Online"
                variant="outline"
                onChipClick={handleChipClick("status-online")}
                active={selectedChips.has("status-online")}
              >
                <i className="modus-icons mr-1 text-success">circle</i>
              </ModusChip>
              <ModusChip
                label="Away"
                variant="outline"
                onChipClick={handleChipClick("status-away")}
                active={selectedChips.has("status-away")}
              >
                <i className="modus-icons mr-1 text-warning">circle</i>
              </ModusChip>
              <ModusChip
                label="Offline"
                variant="outline"
                onChipClick={handleChipClick("status-offline")}
                active={selectedChips.has("status-offline")}
              >
                <i className="modus-icons mr-1 text-muted-foreground">circle</i>
              </ModusChip>
              <ModusChip
                label="Busy"
                variant="outline"
                onChipClick={handleChipClick("status-busy")}
                active={selectedChips.has("status-busy")}
              >
                <i className="modus-icons mr-1 text-destructive">circle</i>
              </ModusChip>
            </div>
          </div>

          {/* Category Chips */}
          <div>
            <div className="text-lg font-semibold mb-4 text-foreground">
              Category Chips
            </div>
            <div className="flex flex-wrap gap-2">
              <ModusChip
                label="Technology"
                size="sm"
                onChipClick={handleChipClick("category-tech")}
                active={selectedChips.has("category-tech")}
              />
              <ModusChip
                label="Design"
                size="sm"
                onChipClick={handleChipClick("category-design")}
                active={selectedChips.has("category-design")}
              />
              <ModusChip
                label="Business"
                size="sm"
                onChipClick={handleChipClick("category-business")}
                active={selectedChips.has("category-business")}
              />
              <ModusChip
                label="Marketing"
                size="sm"
                onChipClick={handleChipClick("category-marketing")}
                active={selectedChips.has("category-marketing")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Controls
        </div>
        <div className="text-foreground mb-6">
          Control chip states programmatically.
        </div>
        <div className="flex gap-4 mb-6">
          <ModusWcButton color="primary" onButtonClick={selectAllChips}>
            <i className="modus-icons mr-2">check_box</i>
            Select All
          </ModusWcButton>
          <ModusWcButton color="secondary" onButtonClick={resetAllChips}>
            <i className="modus-icons mr-2">check_box_outline_blank</i>
            Clear All
          </ModusWcButton>
          <ModusWcButton
            variant="outlined"
            color="tertiary"
            onButtonClick={clearLogs}
          >
            <i className="modus-icons mr-2">delete</i>
            Clear Logs
          </ModusWcButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              Selected Chips
            </div>
            <div className="text-sm text-foreground">
              {selectedChips.size > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedChips).map((chipId) => (
                    <span
                      key={chipId}
                      className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs"
                    >
                      {chipId}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">No chips selected</span>
              )}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-3 text-foreground">
              Removed Chips
            </div>
            <div className="text-sm text-foreground">
              {removedChips.size > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {Array.from(removedChips).map((chipId) => (
                    <span
                      key={chipId}
                      className="px-2 py-1 bg-destructive text-destructive-foreground rounded text-xs"
                    >
                      {chipId}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">No chips removed</span>
              )}
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
              Interact with the chips to see events logged here...
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
            <div className="text-lg font-semibold mb-2 text-foreground">
              Basic Usage
            </div>
            <div className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusChip
  label="Basic Chip"
  onChipClick={handleClick}
/>`}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2 text-foreground">
              Advanced Usage
            </div>
            <div className="bg-background p-4 rounded text-sm text-foreground overflow-x-auto">
              {`<ModusChip
  label="Removable Chip"
  variant="outline"
  size="lg"
  showRemove
  active={isActive}
  onChipClick={handleClick}
  onChipRemove={handleRemove}
>
  <i className="modus-icons mr-1">star</i>
</ModusChip>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
