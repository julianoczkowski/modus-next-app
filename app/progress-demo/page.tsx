"use client";

import { useEffect, useMemo, useState } from "react";
import ModusProgress from "../components/ModusProgress";
import ModusIcon from "../components/ModusIcon";

const statusProgress = [
  {
    title: "Uploading project files",
    value: 32,
    label: "Uploading (32%)",
    ariaLabel: "Uploading project files 32 percent complete",
  },
  {
    title: "Validating geometry",
    value: 68,
    label: "Validation (68%)",
    ariaLabel: "Validating geometry 68 percent complete",
  },
  {
    title: "Finalizing deliverables",
    value: 92,
    label: "Finalizing (92%)",
    ariaLabel: "Finalizing deliverables 92 percent complete",
  },
];

const radialVariants = [
  {
    title: "Design review",
    value: 58,
    label: "58%",
    ariaLabel: "Design review radial progress 58 percent",
  },
  {
    title: "QA checks",
    value: 82,
    label: "82%",
    ariaLabel: "Quality assurance radial progress 82 percent",
    customClass: "progress-radial-lg",
  },
  {
    title: "Site readiness",
    value: 44,
    label: "44%",
    ariaLabel: "Site readiness radial progress 44 percent",
    customClass: "progress-radial-compact",
  },
];

export default function ProgressDemo() {
  const [simulatedProgress, setSimulatedProgress] = useState(12);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSimulatedProgress((current) => (current >= 100 ? 0 : current + 8));
    }, 1200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const simulatedStage = useMemo(() => {
    if (simulatedProgress === 0) {
      return "Waiting for tasks";
    }
    if (simulatedProgress < 40) {
      return "Queuing jobs";
    }
    if (simulatedProgress < 70) {
      return "Processing data";
    }
    if (simulatedProgress < 100) {
      return "Publishing results";
    }
    return "Published";
  }, [simulatedProgress]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Progress Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Track task completion, loading workflows, and long running
            operations with linear and radial progress indicators that stay in
            sync with Modus design tokens and theme-aware colours.
          </div>
        </div>

        {/* Basic Usage */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Basic Usage
          </div>
          <div className="space-y-8">
            <div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                Project roadmap
              </div>
              <ModusProgress
                value={65}
                label="Planning (65%)"
                ariaLabel="Project roadmap 65 percent complete"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                  Release preparation
                </div>
                <ModusProgress
                  variant="radial"
                  value={72}
                  label="72%"
                  ariaLabel="Release preparation radial progress 72 percent complete"
                />
              </div>
              <div className="text-sm text-foreground opacity-70 max-w-lg">
                Linear progress communicates status for tasks with a known end
                point, while radial progress highlights milestones or condensed
                summaries. Labels are optional and appear inside the indicator
                when provided.
              </div>
            </div>
          </div>
        </div>

        {/* Indeterminate & Status Tracking */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Indeterminate &amp; Status Tracking
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Background sync
              </div>
              <ModusProgress
                indeterminate
                label="Syncing data"
                ariaLabel="Background sync in progress"
              />
              <div className="text-sm text-foreground opacity-70">
                Indeterminate mode animates continuously when completion timing
                is unknown, keeping users informed without misleading
                percentages.
              </div>
            </div>
            <div className="space-y-6">
              {statusProgress.map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="text-sm font-medium text-foreground">
                    {item.title}
                  </div>
                  <ModusProgress
                    value={item.value}
                    label={item.label}
                    ariaLabel={item.ariaLabel}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Progress Simulation */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Live Progress Simulation
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <ModusProgress
                value={simulatedProgress}
                label={`${simulatedProgress}%`}
                ariaLabel={`Live data pipeline ${simulatedProgress} percent complete`}
                customClass="progress-thin"
              />
              <div className="text-sm text-foreground opacity-80 mt-4">
                {simulatedStage}
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-muted rounded-lg p-6 flex-none w-full lg:w-80">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Automation pipeline
              </div>
              <div className="text-lg font-semibold text-foreground">
                {simulatedProgress < 100
                  ? "Processing project data"
                  : "Processing complete"}
              </div>
              <div className="text-sm text-foreground opacity-70 leading-relaxed">
                This demo loops through a pipeline every few seconds to show how
                progress updates feel in real-time workflows.
              </div>
            </div>
          </div>
        </div>

        {/* Radial Variations */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Radial Variations &amp; Slot Content
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {radialVariants.map((variant) => (
              <div
                key={variant.title}
                className="flex flex-col items-center gap-4 bg-background rounded-lg p-6 border border-border"
                style={{ borderWidth: "1px" }}
              >
                <ModusProgress
                  variant="radial"
                  value={variant.value}
                  label={variant.label}
                  ariaLabel={variant.ariaLabel}
                  customClass={variant.customClass}
                />
                <div className="text-sm font-medium text-foreground text-center">
                  {variant.title}
                </div>
              </div>
            ))}
            <div
              className="flex flex-col items-center gap-4 bg-background rounded-lg p-6 border border-border"
              style={{ borderWidth: "1px" }}
            >
              <ModusProgress
                variant="radial"
                value={94}
                ariaLabel="Safety checks radial progress 94 percent complete"
                customClass="progress-radial-lg"
              >
                <ModusIcon
                  name="security"
                  size="lg"
                  decorative={false}
                  ariaLabel="Security checks"
                />
              </ModusProgress>
              <div className="text-sm font-medium text-foreground text-center">
                Safety checks
              </div>
              <div className="text-xs text-foreground opacity-70 text-center">
                Slot custom content such as icons or KPI values in the centre of
                the radial ring.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .progress-thin {
          height: 0.5rem;
        }

        .progress-radial-lg {
          --size: 8rem;
          --thickness: 0.75rem;
        }

        .progress-radial-compact {
          --size: 5rem;
          --thickness: 0.4rem;
        }
      `}</style>
    </>
  );
}
