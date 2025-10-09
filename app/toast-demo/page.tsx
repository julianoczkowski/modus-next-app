"use client";

import { useCallback, useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusToast, {
  ModusToastItem,
  ModusToastAction,
  ToastPosition,
  ToastVariant,
} from "../components/ModusToast";
import ModusSwitch from "../components/ModusSwitch";

interface ToastDraft {
  title: string;
  description?: string;
  variant?: ToastVariant;
  dismissible?: boolean;
  delay?: number | null;
  position?: ToastPosition;
  customClass?: string;
  action?: ModusToastAction;
}

const toastPositions: { value: ToastPosition; label: string }[] = [
  { value: "top-start", label: "Top start" },
  { value: "top-center", label: "Top center" },
  { value: "top-end", label: "Top end" },
  { value: "middle-start", label: "Middle start" },
  { value: "middle-center", label: "Middle center" },
  { value: "middle-end", label: "Middle end" },
  { value: "bottom-start", label: "Bottom start" },
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-end", label: "Bottom end" },
];

const variantPresets: Record<
  ToastVariant,
  { title: string; description: string }
> = {
  success: {
    title: "Success",
    description: "Everything completed successfully.",
  },
  info: {
    title: "Heads up",
    description: "Here is an informational update for you.",
  },
  warning: {
    title: "Warning",
    description: "Please double-check the impacted records.",
  },
  error: {
    title: "Error",
    description: "Something went wrong. Try again shortly.",
  },
};

const generateToastId = () =>
  `toast-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

export default function ToastDemoPage() {
  const [toasts, setToasts] = useState<ModusToastItem[]>([]);
  const [position, setPosition] = useState<ToastPosition>("top-end");
  const [defaultDelay, setDefaultDelay] = useState(4000);
  const [autoDismiss, setAutoDismiss] = useState(true);
  const [logEntries, setLogEntries] = useState<string[]>([]);

  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogEntries((previous) => {
      const next = [`${timestamp} — ${message}`, ...previous];
      return next.slice(0, 20);
    });
  }, []);

  const registerToast = useCallback(
    (draft: ToastDraft) => {
      const toastId = generateToastId();
      const nextToast: ModusToastItem = {
        id: toastId,
        title: draft.title,
        description: draft.description,
        variant: draft.variant ?? "info",
        dismissible: draft.dismissible ?? true,
        action: draft.action,
        position: draft.position ?? position,
        delay:
          draft.delay !== undefined
            ? draft.delay
            : autoDismiss
            ? defaultDelay
            : null,
        customClass: draft.customClass,
      };

      setToasts((previous) => [...previous, nextToast].slice(-6));
      logEvent(`Toast queued: ${nextToast.title}`);
    },
    [autoDismiss, defaultDelay, logEvent, position]
  );

  const handleDismiss = useCallback(
    (toastId: string) => {
      setToasts((previous) => previous.filter((toast) => toast.id !== toastId));
      logEvent(`Toast dismissed: ${toastId}`);
    },
    [logEvent]
  );

  const handleAction = useCallback(
    (toastId: string) => {
      logEvent(`Toast action invoked: ${toastId}`);
    },
    [logEvent]
  );

  const groupedLog = useMemo(() => logEntries.slice(0, 12), [logEntries]);

  const presetButtons = (Object.keys(variantPresets) as ToastVariant[]).map(
    (variant) => (
      <ModusWcButton
        key={variant}
        color={variant === "warning" ? "warning" : variant === "error" ? "danger" : "primary"}
        variant={variant === "info" ? "outlined" : "filled"}
        size="sm"
        onButtonClick={() =>
          registerToast({
            title: variantPresets[variant].title,
            description: variantPresets[variant].description,
            variant,
          })
        }
      >
        <i className="modus-icons mr-2">
          {variant === "success"
            ? "task_alt"
            : variant === "warning"
            ? "warning"
            : variant === "error"
            ? "error"
            : "info"}
        </i>
        {variantPresets[variant].title}
      </ModusWcButton>
    )
  );

  return (
    <div className="relative max-w-6xl mx-auto p-8 space-y-12">
      <ModusToast
        toasts={toasts}
        defaultPosition={position}
        defaultDelay={autoDismiss ? defaultDelay : null}
        customClass="shadow-lg"
        className="fixed inset-0 pointer-events-none z-[60]"
        onDismiss={handleDismiss}
        onAction={handleAction}
      />

      <div className="text-center space-y-4">
        <div className="text-4xl font-semibold text-foreground">
          Modus Toast Component Demo
        </div>
        <div className="text-lg text-foreground opacity-80 max-w-3xl mx-auto leading-relaxed">
          Toasts pair with alerts to surface lightweight notifications. Control
          position, auto-dismiss timing, stacking, and actions that keep users in
          flow while respecting Modus design tokens.
        </div>
      </div>

      <div className="p-8 bg-card border border-border rounded-lg space-y-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-foreground">
              Quick notifications
            </div>
            <div className="text-sm text-foreground opacity-75 leading-relaxed max-w-xl">
              Trigger instant messages that auto-stack by position. Each toast
              wraps a Modus alert ensuring consistent iconography and tone.
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-end">{presetButtons}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background border border-border rounded-lg p-6 space-y-4">
            <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Position
            </div>
            <div className="text-sm text-foreground opacity-70">
              Toasts pin themselves relative to the nearest positioned container.
            </div>
            <select
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
              value={position}
              onChange={(event) =>
                setPosition(event.target.value as ToastPosition)
              }
            >
              {toastPositions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ModusWcButton
              color="secondary"
              variant="outlined"
              size="sm"
              onButtonClick={() =>
                registerToast({
                  title: "Position preview",
                  description: `Anchored at ${position.replace("-", " ")}`,
                })
              }
            >
              Preview current position
            </ModusWcButton>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 space-y-4">
            <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Auto-dismiss
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground opacity-70">
                Toggle auto removal and adjust timing (ms).
              </div>
              <ModusSwitch
                value={autoDismiss}
                size="sm"
                onInputChange={(event) => {
                  const switchElement =
                    event.target as HTMLModusWcSwitchElement | null;
                  setAutoDismiss(Boolean(switchElement?.value));
                }}
              />
            </div>
            <input
              type="number"
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
              min={1000}
              step={500}
              value={defaultDelay}
              disabled={!autoDismiss}
              onChange={(event) => setDefaultDelay(Number(event.target.value))}
            />
            <ModusWcButton
              color="primary"
              variant="filled"
              size="sm"
              disabled={!autoDismiss}
              onButtonClick={() =>
                registerToast({
                  title: "Auto-dismiss sample",
                  description: `Closes after ${defaultDelay / 1000}s`,
                  variant: "info",
                })
              }
            >
              Show timed toast
            </ModusWcButton>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 space-y-4">
            <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Actions
            </div>
            <div className="text-sm text-foreground opacity-70">
              Pair dismissible alerts with secondary actions to keep users in
              context.
            </div>
            <ModusWcButton
              color="primary"
              variant="filled"
              size="sm"
              onButtonClick={() =>
                registerToast({
                  title: "Undo archive",
                  description: "The report moved to Archive. Undo within 5s.",
                  variant: "info",
                  delay: 5000,
                  action: {
                    label: "Undo",
                    color: "secondary",
                    variant: "outlined",
                    onClick: () => logEvent("Undo action executed"),
                  },
                })
              }
            >
              Spawn actionable toast
            </ModusWcButton>
            <ModusWcButton
              color="warning"
              variant="outlined"
              size="sm"
              onButtonClick={() =>
                registerToast({
                  title: "Persistent warning",
                  description: "This stays visible until dismissed.",
                  variant: "warning",
                  delay: null,
                })
              }
            >
              Persistent toast
            </ModusWcButton>
          </div>
        </div>
      </div>

      <div className="p-8 bg-card border border-border rounded-lg space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-foreground">
              Stacking sandbox
            </div>
            <div className="text-sm text-foreground opacity-75 leading-relaxed max-w-xl">
              Rapidly enqueue toasts to watch Modus handle stacking and focus.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ModusWcButton
              color="primary"
              variant="filled"
              size="sm"
              onButtonClick={() => {
                registerToast({
                  title: "Bulk import complete",
                  description: "27 records synced successfully.",
                  variant: "success",
                });
                registerToast({
                  title: "Low satellite signal",
                  description: "Signal degradation detected in zone 5.",
                  variant: "warning",
                });
                registerToast({
                  title: "Retry failed upload",
                  description: "One file needs your attention.",
                  variant: "error",
                });
              }}
            >
              Queue three toasts
            </ModusWcButton>
            <ModusWcButton
              color="secondary"
              variant="outlined"
              size="sm"
              onButtonClick={() => setToasts([])}
            >
              Clear all
            </ModusWcButton>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-6 min-h-48">
          <div className="text-sm text-foreground opacity-70 mb-4">
            Event log (latest 12 entries)
          </div>
          {groupedLog.length === 0 ? (
            <div className="text-sm text-foreground opacity-60">
              Interact with the controls above to see toast lifecycle events.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {groupedLog.map((entry) => (
                <div key={entry} className="text-sm text-foreground">
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
