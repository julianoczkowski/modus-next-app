"use client";

import { useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusStepper, {
  ModusStepperItem,
  StepperColor,
} from "../components/ModusStepper";

interface PipelineStage {
  id: string;
  label: string;
  color: StepperColor;
  summary: string;
}

const onboardingSteps: ModusStepperItem[] = [
  { label: "Profile" },
  { label: "Verification" },
  { label: "Preferences" },
  { label: "Complete", content: "✔", color: "success" },
];

const deploymentStages: PipelineStage[] = [
  {
    id: "plan",
    label: "Planning",
    color: "info",
    summary: "Define scope, set timelines, and gather requirements.",
  },
  {
    id: "prepare",
    label: "Preparation",
    color: "secondary",
    summary: "Provision infrastructure, stage datasets, and assign roles.",
  },
  {
    id: "deploy",
    label: "Deployment",
    color: "primary",
    summary: "Roll out updates to targeted environments with monitoring.",
  },
  {
    id: "validate",
    label: "Validation",
    color: "warning",
    summary: "Run automated checks and manual sign-offs ahead of release.",
  },
  {
    id: "launch",
    label: "Launch",
    color: "success",
    summary: "Promote to production and notify stakeholders.",
  },
];

export default function StepperDemoPage() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [variant, setVariant] = useState<"horizontal" | "vertical">(
    "horizontal"
  );

  const pipelineSteps = useMemo<ModusStepperItem[]>(() => {
    return deploymentStages.map((stage, index) => {
      if (index < activeIndex) {
        return { label: stage.label, color: "success", content: "✔" };
      }
      if (index === activeIndex) {
        return { label: stage.label, color: stage.color, content: String(index + 1) };
      }
      return { label: stage.label, color: "neutral" };
    });
  }, [activeIndex]);

  const updateActiveIndex = (direction: "prev" | "next") => {
    setActiveIndex((previous) => {
      const next =
        direction === "next" ? previous + 1 : Math.max(previous - 1, 0);
      return Math.min(Math.max(next, 0), deploymentStages.length - 1);
    });
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Stepper Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Steppers provide visual progress through multi-step workflows. Blend
            orientation, colouring, and icons to guide users as they complete
            onboarding, deployments, or review pipelines.
          </div>
        </div>

        {/* Onboarding Example */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Account Onboarding
          </div>
          <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-4">
            <ModusStepper
              steps={onboardingSteps}
              ariaLabel="Onboarding progress"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-sm text-foreground opacity-80 leading-relaxed">
                Each step includes a descriptive label and optional icon
                content. Use a success color with a checkmark to reinforce that
                onboarding ends with account activation.
              </div>
              <div className="text-sm text-foreground opacity-80 leading-relaxed">
                Because the stepper is purely presentational, use your own
                state to determine which steps are complete. The wrapper assigns
                fresh objects to the underlying web component to ensure updates
                render immediately.
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Workflow */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                Deployment Pipeline
              </div>
              <div className="text-sm text-foreground opacity-80">
                Toggle orientation and advance steps to highlight progress
                across the release lifecycle.
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ModusWcButton
                color="primary"
                variant="outlined"
                size="sm"
                onButtonClick={() => updateActiveIndex("prev")}
              >
                Previous stage
              </ModusWcButton>
              <ModusWcButton
                color="primary"
                variant="filled"
                size="sm"
                onButtonClick={() => updateActiveIndex("next")}
              >
                Next stage
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                size="sm"
                onButtonClick={() =>
                  setVariant((current) =>
                    current === "horizontal" ? "vertical" : "horizontal"
                  )
                }
              >
                Orientation: {variant === "horizontal" ? "Horizontal" : "Vertical"}
              </ModusWcButton>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-background border border-border rounded-lg p-6">
              <ModusStepper
                steps={pipelineSteps}
                orientation={variant}
                customClass="stepper-pipeline"
                ariaLabel="Deployment pipeline progress"
              />
            </div>
            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-3">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Active stage
              </div>
              <div className="text-lg font-semibold text-foreground">
                {deploymentStages[activeIndex].label}
              </div>
              <div className="text-sm text-foreground opacity-80 leading-relaxed">
                {deploymentStages[activeIndex].summary}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Task Breakdown */}
        <div
          className="p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Vertical Task Breakdown
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-lg p-6">
              <ModusStepper
                orientation="vertical"
                steps={[
                  { label: "Site survey", color: "info" },
                  { label: "Equipment staging", color: "secondary" },
                  { label: "Calibration", color: "warning" },
                  { label: "Certification", color: "success", content: "✔" },
                ]}
                ariaLabel="Field deployment tasks"
              />
            </div>
            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-3">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Tips
              </div>
              <div className="text-sm text-foreground opacity-80 leading-relaxed">
                • Use `vertical` orientation when screen width is limited or
                when steps need descriptive text alongside each item.{" "}
                <br />
                • Combine the stepper with a detail panel or form section for
                each step to keep users focused on one task at a time. <br />•
                Assign `customClass` per item to mark critical or optional steps
                with icons or alternate styling.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .stepper-pipeline {
          gap: 1.25rem;
        }
      `}</style>
    </>
  );
}
