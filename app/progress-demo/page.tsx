"use client";

import { useMemo, useState } from "react";
import ModusProgress from "../components/ModusProgress";
import ModusIcon from "../components/ModusIcon";

export default function ProgressDemo() {
  const [taskProgress, setTaskProgress] = useState(45);
  const [radialProgress, setRadialProgress] = useState(72);

  const milestones = useMemo(
    () => [
      { label: "Design", value: 100 },
      { label: "Development", value: 65 },
      { label: "Testing", value: 35 },
    ],
    []
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Progress Component Demo
        </div>
        <p className="text-lg text-foreground opacity-80">
          Communicate task status with linear bars or circular indicators. The
          Modus progress component supports determinate, indeterminate, and
          fully customised presentations.
        </p>
      </div>

      {/* Determinate progress with React state */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Controlled Progress Values
        </div>
        <p className="text-foreground opacity-80 mb-6">
          Bind the progress value to React state to update the bar as work is
          completed. Adjust the slider to change the <code>value</code>
          property.
        </p>
        <div className="space-y-6">
          <ModusProgress
            ariaLabel="Task completion"
            value={taskProgress}
            label={`${taskProgress}%`}
          />
          <input
            type="range"
            className="w-full"
            min={0}
            max={100}
            value={taskProgress}
            onChange={(event) => setTaskProgress(Number(event.target.value))}
          />
          <div className="text-sm text-foreground opacity-70">
            Current value: <strong>{taskProgress}%</strong>
          </div>
        </div>
      </div>

      {/* Indeterminate and labelled examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Determinate and Indeterminate Bars
        </div>
        <p className="text-foreground opacity-80 mb-6">
          Use labels to communicate progress context, or switch to an
          indeterminate animation when the duration is unknown.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">File upload</div>
            <ModusProgress
              ariaLabel="File upload progress"
              value={68}
              label="Uploading documents (68%)"
            />
            <div className="text-sm text-foreground opacity-70">
              Determinate mode mirrors the <code>value</code> and
              <code>max</code> attributes for assistive technology.
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-lg font-medium text-foreground">
              Background processing
            </div>
            <ModusProgress
              ariaLabel="Processing data"
              indeterminate
              label="Processing..."
            />
            <div className="text-sm text-foreground opacity-70">
              The indeterminate variant shows a continuous animation while work
              completes server-side.
            </div>
          </div>
        </div>
      </div>

      {/* Radial variant examples */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Radial Variant with Slots
        </div>
        <p className="text-foreground opacity-80 mb-6">
          Switch <code>variant</code> to <code>&quot;radial&quot;</code> to display a
          circular indicator. Slot content into the centre for icons or
          additional context.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-3">
            <ModusProgress
              ariaLabel="Sprint completion"
              variant="radial"
              value={radialProgress}
              label={`${radialProgress}%`}
              customClass="radial-md"
            />
            <input
              type="range"
              className="w-full"
              min={0}
              max={100}
              value={radialProgress}
              onChange={(event) => setRadialProgress(Number(event.target.value))}
            />
            <div className="text-sm text-foreground opacity-70 text-center">
              Interactive radial progress bound to React state
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ModusProgress
              ariaLabel="Quality checks"
              variant="radial"
              value={92}
              customClass="radial-success"
            >
              <div className="flex flex-col items-center gap-1">
                <ModusIcon name="check-circle" decorative={false} size="md" />
                <span className="text-sm font-medium">92%</span>
              </div>
            </ModusProgress>
            <div className="text-sm text-foreground opacity-70 text-center">
              Slot arbitrary HTML to display icons or formatted numbers
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ModusProgress
              ariaLabel="Deployment progress"
              variant="radial"
              value={40}
              customClass="radial-thick"
            />
            <div className="text-sm text-foreground opacity-70 text-center">
              Custom CSS variables adjust diameter and thickness
            </div>
          </div>
        </div>
      </div>

      {/* Progress list */}
      <div
        className="p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Progress Across Milestones
        </div>
        <p className="text-foreground opacity-80 mb-6">
          Render multiple progress bars to communicate the status of different
          milestones within a project overview.
        </p>
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <div key={milestone.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-foreground">
                <span className="font-medium">{milestone.label}</span>
                <span>{milestone.value}%</span>
              </div>
              <ModusProgress
                ariaLabel={`${milestone.label} completion`}
                value={milestone.value}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        modus-wc-progress.radial-md {
          --size: 6rem;
        }

        modus-wc-progress.radial-success {
          --size: 6rem;
          color: var(--modus-color-success);
          --thickness: 0.6rem;
        }

        modus-wc-progress.radial-success span {
          color: var(--modus-color-success);
        }

        modus-wc-progress.radial-thick {
          --size: 7rem;
          --thickness: 1.2rem;
        }
      `}</style>
    </div>
  );
}
