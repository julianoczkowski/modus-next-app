"use client";

import { useCallback, useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusRating from "../components/ModusRating";

const starLabels = [
  "No rating yet",
  "Needs improvement",
  "Below expectations",
  "Meets expectations",
  "Exceeds expectations",
  "Outstanding",
];

const sentimentLabels = [
  "Unhappy",
  "Frustrated",
  "Neutral",
  "Happy",
  "Delighted",
];

export default function RatingDemoPage() {
  const [projectRating, setProjectRating] = useState(3.5);
  const [teamSentiment, setTeamSentiment] = useState(4);
  const [thumbApproval, setThumbApproval] = useState(0);
  const [supportExperience, setSupportExperience] = useState(3);
  const [ratingLog, setRatingLog] = useState<string[]>([]);

  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setRatingLog((previous) => {
      const updated = [`${timestamp} — ${message}`, ...previous];
      return updated.slice(0, 15);
    });
  }, []);

  const handleProjectRatingChange = useCallback(
    (event: CustomEvent<{ newRating: number }>) => {
      const newRating = event.detail.newRating;
      setProjectRating(newRating);
      logEvent(`Project quality rated ${newRating.toFixed(1)} / 5`);
    },
    [logEvent]
  );

  const handleSentimentChange = useCallback(
    (event: CustomEvent<{ newRating: number }>) => {
      const newSentiment = event.detail.newRating;
      setTeamSentiment(newSentiment);
      logEvent(`Team sentiment updated to level ${newSentiment}`);
    },
    [logEvent]
  );

  const handleThumbChange = useCallback(
    (event: CustomEvent<{ newRating: number }>) => {
      const newValue = event.detail.newRating;
      setThumbApproval(newValue);
      logEvent(
        newValue === 1
          ? "Stakeholder response: thumbs down"
          : newValue === 2
          ? "Stakeholder response: thumbs up"
          : "Stakeholder response cleared"
      );
    },
    [logEvent]
  );

  const handleSupportExperienceChange = useCallback(
    (event: CustomEvent<{ newRating: number }>) => {
      const newRating = event.detail.newRating;
      setSupportExperience(newRating);
      logEvent(`Support interaction rated ${newRating} hearts`);
    },
    [logEvent]
  );

  const resetRatings = () => {
    setProjectRating(3.5);
    setTeamSentiment(4);
    setThumbApproval(0);
    setSupportExperience(3);
    logEvent("Reset demo ratings to default values");
  };

  const projectLabel = useMemo(() => {
    const rounded = Math.round(projectRating);
    return starLabels[rounded] ?? starLabels[0];
  }, [projectRating]);

  const sentimentLabel = useMemo(() => {
    const index = Math.max(1, Math.min(teamSentiment, sentimentLabels.length));
    return sentimentLabels[index - 1];
  }, [teamSentiment]);

  const thumbLabel = useMemo(() => {
    if (thumbApproval === 2) {
      return "Project approved";
    }
    if (thumbApproval === 1) {
      return "Revision requested";
    }
    return "Awaiting stakeholder decision";
  }, [thumbApproval]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Rating Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Capture user sentiment and qualitative feedback with star, heart,
            smiley, and thumb ratings. These examples show controlled state,
            half-step precision, event handling, and theme-friendly styling.
          </div>
        </div>

        {/* Guided Evaluation */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                Guided Evaluation
              </div>
              <div className="text-sm text-foreground opacity-80">
                Each rating is fully controlled and stays synchronized with
                React state via the `ratingChange` event.
              </div>
            </div>
            <div className="flex gap-3">
              <ModusWcButton
                color="primary"
                variant="outlined"
                size="sm"
                onButtonClick={resetRatings}
              >
                Reset ratings
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                size="sm"
                onButtonClick={() =>
                  logEvent(
                    `Saved ratings (project ${projectRating.toFixed(
                      1
                    )}, sentiment ${teamSentiment}, hearts ${supportExperience})`
                  )
                }
              >
                Log snapshot
              </ModusWcButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="bg-background rounded-lg p-6 space-y-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Project quality
              </div>
              <ModusRating
                variant="star"
                count={5}
                value={projectRating}
                allowHalf
                size="lg"
                aria-label="Rate overall project quality out of five stars"
                onRatingChange={handleProjectRatingChange}
              />
              <div className="text-sm text-foreground opacity-80">
                {projectRating.toFixed(1)} / 5 — {projectLabel}
              </div>
            </div>

            <div
              className="bg-background rounded-lg p-6 space-y-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Team sentiment
              </div>
              <ModusRating
                variant="smiley"
                count={5}
                value={teamSentiment}
                size="md"
                aria-label="Team sentiment score"
                onRatingChange={handleSentimentChange}
              />
              <div className="text-sm text-foreground opacity-80">
                Team is {sentimentLabel.toLowerCase()}
              </div>
            </div>

            <div
              className="bg-background rounded-lg p-6 space-y-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Stakeholder response
              </div>
              <ModusRating
                variant="thumb"
                value={thumbApproval}
                size="md"
                aria-label="Stakeholder approval thumbs rating"
                onRatingChange={handleThumbChange}
              />
              <div className="text-sm text-foreground opacity-80">
                {thumbLabel}
              </div>
            </div>

            <div
              className="bg-background rounded-lg p-6 space-y-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Support interaction
              </div>
              <ModusRating
                variant="heart"
                count={5}
                value={supportExperience}
                size="md"
                aria-label="Support interaction rating"
                onRatingChange={handleSupportExperienceChange}
                customClass="rating-success"
              />
              <div className="text-sm text-foreground opacity-80">
                {supportExperience} / 5 satisfied
              </div>
            </div>
          </div>
        </div>

        {/* Variant Overview */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Variant Overview
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div
              className="flex flex-col items-center gap-3 bg-background rounded-lg p-6"
              style={{ border: "1px solid var(--border)" }}
            >
              <ModusRating
                variant="star"
                count={5}
                value={4}
                size="md"
                aria-label="Default star rating example"
              />
              <div className="text-sm font-semibold text-foreground">Stars</div>
              <div className="text-xs text-foreground opacity-70 text-center">
                Use for product reviews or performance scoring with optional
                half steps.
              </div>
            </div>
            <div
              className="flex flex-col items-center gap-3 bg-background rounded-lg p-6"
              style={{ border: "1px solid var(--border)" }}
            >
              <ModusRating
                variant="heart"
                count={5}
                value={3}
                size="sm"
                aria-label="Heart rating example"
                customClass="rating-accent"
              />
              <div className="text-sm font-semibold text-foreground">
                Hearts
              </div>
              <div className="text-xs text-foreground opacity-70 text-center">
                Helpful for customer loyalty or satisfaction metrics tied to
                emotion.
              </div>
            </div>
            <div
              className="flex flex-col items-center gap-3 bg-background rounded-lg p-6"
              style={{ border: "1px solid var(--border)" }}
            >
              <ModusRating
                variant="smiley"
                count={5}
                value={5}
                size="lg"
                aria-label="Smiley rating example"
              />
              <div className="text-sm font-semibold text-foreground">
                Smileys
              </div>
              <div className="text-xs text-foreground opacity-70 text-center">
                Great for quick experience checks where faces communicate tone.
              </div>
            </div>
            <div
              className="flex flex-col items-center gap-3 bg-background rounded-lg p-6"
              style={{ border: "1px solid var(--border)" }}
            >
              <ModusRating
                variant="thumb"
                value={2}
                size="md"
                aria-label="Thumb rating example"
              />
              <div className="text-sm font-semibold text-foreground">
                Thumbs
              </div>
              <div className="text-xs text-foreground opacity-70 text-center">
                Simple approve / reject decisions; returns 1 or 2.
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility & Disabled States */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Accessibility &amp; Disabled States
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-background rounded-lg p-6 space-y-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm font-semibold text-foreground">
                Localized aria labels
              </div>
              <ModusRating
                variant="star"
                count={3}
                value={2}
                size="sm"
                aria-label="Valoración del equipo"
                getAriaLabelText={(value) => `Selecciona ${value} de 3`}
              />
              <div className="text-xs text-foreground opacity-70">
                `getAriaLabelText` returns translated messaging for screen
                readers.
              </div>
            </div>
            <div
              className="bg-background rounded-lg p-6 space-y-3"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-sm font-semibold text-foreground">
                Disabled display
              </div>
              <ModusRating
                variant="smiley"
                count={5}
                value={4}
                size="md"
                disabled
                aria-label="Read-only smiley rating example"
              />
              <div className="text-xs text-foreground opacity-70">
                Disabled ratings preserve value but block pointer and keyboard
                input.
              </div>
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div
          className="p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-4">
            Interaction Log
          </div>
          <div className="text-sm text-foreground opacity-70 mb-4">
            Entries capture the detail payload emitted by `ratingChange`.
          </div>
          <div
            className="bg-background rounded-lg p-4 min-h-40"
            style={{ border: "1px solid var(--border)" }}
          >
            {ratingLog.length === 0 ? (
              <div className="text-sm text-foreground opacity-60">
                Adjust any rating to populate the log.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {ratingLog.map((entry, index) => (
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
        .rating-success {
          color: var(--modus-wc-color-success);
        }

        .rating-accent {
          color: var(--modus-wc-color-info);
        }
      `}</style>
    </>
  );
}
