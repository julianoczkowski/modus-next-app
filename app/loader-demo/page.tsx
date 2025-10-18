"use client";

import DemoExample from "../components/DemoExample";
import DemoPage from "../components/DemoPage";
import ModusLoader from "../components/ModusLoader";

export default function LoaderDemoPage() {
  return (
    <DemoPage
      title="Modus Loader"
      description="Loaders communicate that content is on the way. Select a variant that fits the space and avoid pairing multiple animations together."
    >
      <DemoExample
        title="Standard spinner"
        description="Use the default spinner for most background operations."
      >
        <div className="flex items-center gap-3">
          <ModusLoader variant="spinner" size="md" />
          <div className="text-sm text-foreground opacity-80">Syncing records…</div>
        </div>
      </DemoExample>
      <DemoExample
        title="Inline indicator"
        description="Smaller loaders can sit next to inline copy while data refreshes."
      >
        <div className="flex items-center gap-2">
          <ModusLoader variant="dots" size="sm" color="secondary" />
          <div className="text-sm text-foreground opacity-80">Preparing report</div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
