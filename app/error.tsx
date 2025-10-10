"use client";

import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-4xl font-bold mb-4 text-foreground">
          Something went wrong!
        </div>
        <div className="text-lg mb-8 text-foreground">
          An error occurred while loading this page.
        </div>
        <ModusWcButton color="primary" onButtonClick={reset}>
          Try again
        </ModusWcButton>
      </div>
    </div>
  );
}
