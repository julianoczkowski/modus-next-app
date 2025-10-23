"use client";

import { useState } from "react";

interface TailwindTestCaseProps {
  title: string;
  description: string;
  tailwindClass: string;
  customClass?: string;
  tailwindElement: React.ReactNode;
  customElement?: React.ReactNode;
  status: "working" | "issue" | "needs-custom";
  codeSnippet: string;
}

export default function TailwindTestCase({
  title,
  description,
  tailwindClass,
  customClass,
  tailwindElement,
  customElement,
  status,
  codeSnippet,
}: TailwindTestCaseProps) {
  const [showCode, setShowCode] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case "working":
        return "text-success";
      case "issue":
        return "text-warning";
      case "needs-custom":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "working":
        return "✓ Working";
      case "issue":
        return "⚠ Issue";
      case "needs-custom":
        return "✗ Needs Custom Solution";
      default:
        return "Unknown";
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="bg-background p-4 rounded-lg border-default">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium text-foreground">{title}</div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>

        {/* Visual Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Tailwind Implementation */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">
              Tailwind:{" "}
              <div className="bg-muted px-2 py-1 rounded text-xs font-mono inline">
                {tailwindClass}
              </div>
            </div>
            <div className="bg-card p-3 rounded border-default">
              {tailwindElement}
            </div>
          </div>

          {/* Custom Solution (if available) */}
          {customElement && customClass && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">
                Custom:{" "}
                <div className="bg-muted px-2 py-1 rounded text-xs font-mono inline">
                  {customClass}
                </div>
              </div>
              <div className="bg-card p-3 rounded border-default">
                {customElement}
              </div>
            </div>
          )}
        </div>

        {/* Code Snippet Toggle */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => setShowCode(!showCode)}
            className="text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            {showCode ? "Hide" : "Show"} Code Snippet
          </div>
          {showCode && (
            <div
              onClick={copyToClipboard}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Copy to Clipboard
            </div>
          )}
        </div>

        {/* Code Snippet */}
        {showCode && (
          <div className="bg-muted p-3 rounded border-default">
            <div className="text-sm text-foreground overflow-x-auto whitespace-pre font-mono">
              {codeSnippet}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
