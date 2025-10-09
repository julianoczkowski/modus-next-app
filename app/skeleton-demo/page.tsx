"use client";

import ModusSkeleton from "../components/ModusSkeleton";

const paragraphSkeleton = [
  { width: "90%", height: "1rem" },
  { width: "85%", height: "1rem" },
  { width: "70%", height: "1rem" },
];

const dashboardCards = [
  { title: "Project overview", lines: ["80%", "60%", "45%"] },
  { title: "Field updates", lines: ["75%", "55%", "35%"] },
  { title: "Upcoming milestones", lines: ["85%", "65%", "40%"] },
];

export default function SkeletonDemoPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Skeleton Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Skeletons provide lightweight placeholders that mimic layouts while
            data loads. Combine shapes and sizes to prevent content shift and
            maintain a polished loading experience.
          </div>
        </div>

        {/* Basic Variants */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Basic Variants
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                Standard rectangles
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <ModusSkeleton width="4rem" height="1rem" ariaLabel="Short line skeleton" />
                <ModusSkeleton width="8rem" height="1.25rem" ariaLabel="Medium line skeleton" />
                <ModusSkeleton width="12rem" height="1.5rem" ariaLabel="Long line skeleton" />
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                Circular placeholders
              </div>
              <div className="flex items-center gap-4">
                <ModusSkeleton
                  shape="circle"
                  width="2.5rem"
                  height="2.5rem"
                  ariaLabel="Avatar skeleton small"
                />
                <ModusSkeleton
                  shape="circle"
                  width="3.5rem"
                  height="3.5rem"
                  ariaLabel="Avatar skeleton medium"
                />
                <ModusSkeleton
                  shape="circle"
                  width="4.5rem"
                  height="4.5rem"
                  ariaLabel="Avatar skeleton large"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Composite Layout */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Card &amp; Content Placeholders
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <ModusSkeleton
                  shape="circle"
                  width="3.5rem"
                  height="3.5rem"
                  ariaLabel="Profile avatar skeleton"
                />
                <div className="flex flex-col gap-2 flex-1">
                  <ModusSkeleton width="70%" height="1.1rem" ariaLabel="Name skeleton" />
                  <ModusSkeleton width="45%" height="0.9rem" ariaLabel="Title skeleton" />
                </div>
              </div>
              <ModusSkeleton height="8rem" ariaLabel="Card body skeleton" />
              <div className="flex gap-3">
                <ModusSkeleton width="40%" height="2.5rem" ariaLabel="Button skeleton" />
                <ModusSkeleton width="30%" height="2.5rem" ariaLabel="Secondary button skeleton" />
              </div>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
                Narrative content
              </div>
              <div className="flex flex-col gap-3">
                <ModusSkeleton width="60%" height="1.25rem" ariaLabel="Title skeleton" />
                {paragraphSkeleton.map((item, index) => (
                  <ModusSkeleton
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    width={item.width}
                    height={item.height}
                    ariaLabel={`Paragraph line ${index + 1} skeleton`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Dashboard Loading State
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardCards.map((card) => (
              <div
                key={card.title}
                className="bg-background border border-border rounded-lg p-5 flex flex-col gap-3"
              >
                <ModusSkeleton width="55%" height="1rem" ariaLabel={`${card.title} title skeleton`} />
                <ModusSkeleton width="35%" height="0.9rem" ariaLabel={`${card.title} subtitle skeleton`} />
                <ModusSkeleton height="6rem" ariaLabel={`${card.title} chart skeleton`} />
                <div className="flex flex-col gap-2">
                  {card.lines.map((width, index) => (
                    <ModusSkeleton
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${card.title}-${index}`}
                      width={width}
                      height="0.75rem"
                      ariaLabel={`${card.title} detail line ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Styling */}
        <div
          className="p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Custom Styling &amp; Tinting
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-3 skeleton-accent">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Accent tinted skeletons
              </div>
              <ModusSkeleton width="65%" height="1rem" ariaLabel="Accent skeleton line 1" customClass="skeleton-accent-block" />
              <ModusSkeleton width="45%" height="1rem" ariaLabel="Accent skeleton line 2" customClass="skeleton-accent-block" />
              <ModusSkeleton height="5rem" ariaLabel="Accent skeleton block" customClass="skeleton-accent-block" />
            </div>
            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-3 skeleton-muted">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Muted background blend
              </div>
              <ModusSkeleton width="70%" height="1rem" ariaLabel="Muted skeleton line 1" customClass="skeleton-muted-block" />
              <ModusSkeleton width="50%" height="1rem" ariaLabel="Muted skeleton line 2" customClass="skeleton-muted-block" />
              <ModusSkeleton height="4rem" ariaLabel="Muted skeleton block" customClass="skeleton-muted-block" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .skeleton-accent {
          color: var(--modus-wc-color-info);
        }

        .skeleton-muted {
          color: var(--modus-wc-color-base-300);
        }

        .skeleton-accent-block,
        .skeleton-muted-block {
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
}
