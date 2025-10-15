"use client";

import { useCallback, useMemo, useState } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusNavbar from "../../../app/components/ModusNavbar";
import ModusSideNavigation, {
  ModusSideNavigationItem,
} from "../../../app/components/ModusSideNavigation";

const primaryNavItems: ModusSideNavigationItem[] = [
  { label: "Overview", value: "overview", startIcon: "dashboard" },
  { label: "Projects", value: "projects", startIcon: "folder" },
  { label: "Workspaces", value: "workspaces", startIcon: "grid_view" },
  { label: "Analytics", value: "analytics", startIcon: "bar_chart" },
  { label: "Settings", value: "settings", startIcon: "settings" },
];

const analyticsNavItems: ModusSideNavigationItem[] = [
  { label: "Executive summary", value: "summary", startIcon: "insights" },
  { label: "Utilization", value: "utilization", startIcon: "analytics" },
  { label: "Forecasting", value: "forecast", startIcon: "timeline" },
  { label: "Costs", value: "costs", startIcon: "payments" },
  { label: "Reports", value: "reports", startIcon: "description" },
];

const compactNavItems: ModusSideNavigationItem[] = [
  { label: "Inbox", value: "inbox", startIcon: "mail" },
  { label: "Review", value: "review", startIcon: "rule_settings" },
  { label: "Approvals", value: "approvals", startIcon: "task_alt" },
  { label: "Archive", value: "archive", startIcon: "archive" },
];

export default function SideNavigationDemoPage() {
  const [activeRoute, setActiveRoute] = useState("overview");
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [analyticsExpanded, setAnalyticsExpanded] = useState(true);
  const [compactExpanded, setCompactExpanded] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((previous) => {
      const next = [`${timestamp} — ${message}`, ...previous];
      return next.slice(0, 18);
    });
  }, []);

  const integratedItems = useMemo(
    () =>
      primaryNavItems.map((item) => ({
        ...item,
        selected: item.value === activeRoute,
      })),
    [activeRoute]
  );

  const integratedContentTitle = useMemo(() => {
    switch (activeRoute) {
      case "projects":
        return "Active project portfolio";
      case "workspaces":
        return "Workspace administration";
      case "analytics":
        return "Analytics and KPIs";
      case "settings":
        return "Configuration controls";
      default:
        return "Program overview dashboard";
    }
  }, [activeRoute]);

  const handleNavbarMainMenuChange = useCallback(
    (open: boolean) => {
      setNavbarExpanded(open);
      logEvent(`Navbar main menu ${open ? "opened" : "closed"}`);
    },
    [logEvent]
  );

  const handleSideNavExpandedChange = useCallback(
    (expanded: boolean) => {
      setNavbarExpanded(expanded);
      logEvent(`Side navigation ${expanded ? "expanded" : "collapsed"}`);
    },
    [logEvent]
  );

  const handlePrimaryItemSelect = useCallback(
    (item: ModusSideNavigationItem) => {
      setActiveRoute(item.value);
      logEvent(`Selected primary item "${item.label}"`);
    },
    [logEvent]
  );

  const analyticsItemsWithSelection = useMemo(
    () =>
      analyticsNavItems.map((item, index) => ({
        ...item,
        selected: index === 0,
      })),
    []
  );

  const compactItemsWithSelection = useMemo(
    () =>
      compactNavItems.map((item) => ({
        ...item,
        selected: item.value === "review",
      })),
    []
  );

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Side Navigation Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Pair the Trimble Modus side navigation with the Modus navbar to
            deliver familiar left-hand navigation layouts. The component
            supports controlled expansion, outside clicks, async menus, and
            responsive width limits while preserving design tokens.
          </div>
        </div>

        {/* Integrated Navbar + Side Navigation */}
        <div
          className="mb-12 p-0 bg-card rounded-lg overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col demo-shell">
            <ModusNavbar
              userCard={{
                name: "Jordan Pulse",
                email: "jordan.pulse@trimble.com",
                avatarSrc:
                  "https://via.placeholder.com/48x48/004680/FFFFFF?text=JP",
              }}
              visibility={{
                mainMenu: true,
                search: true,
                searchInput: false,
                notifications: false,
                apps: false,
                ai: false,
                help: true,
                user: true,
              }}
              mainMenuOpen={navbarExpanded}
              onMainMenuOpenChange={handleNavbarMainMenuChange}
              condensed={false}
              startContent={
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-lg">construction</i>
                  Trimble Construct
                </div>
              }
              endContent={
                <div className="flex items-center gap-2 text-sm text-foreground opacity-80">
                  <i className="modus-icons text-lg">cloud_sync</i>
                  Synced 2 minutes ago
                </div>
              }
            />

            <div className="relative flex-1 min-h-[22rem] bg-background">
              <ModusSideNavigation
                items={integratedItems}
                expanded={navbarExpanded}
                onExpandedChange={handleSideNavExpandedChange}
                onItemSelect={handlePrimaryItemSelect}
                maxWidth="280px"
              />
              <div
                className="h-full transition-all duration-200 ease-out"
                style={{
                  marginLeft: navbarExpanded ? "280px" : "4rem",
                  padding: "2rem",
                }}
              >
                <div className="text-2xl font-semibold text-foreground mb-4">
                  {integratedContentTitle}
                </div>
                <div className="text-sm text-foreground opacity-80 leading-relaxed max-w-2xl">
                  {navbarExpanded
                    ? "The navigation is expanded, revealing descriptive labels alongside icons. Selecting a destination collapses the panel immediately, synchronizing the navbar’s hamburger state."
                    : "Only the navigation icons are visible. Click the navbar hamburger to expand, or interact with content while the panel remains collapsed for a spacious center canvas."}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div
                    className="bg-card rounded-lg p-6"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <div className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                      Current selection
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2 capitalize">
                      {activeRoute}
                    </div>
                    <div className="text-sm text-foreground opacity-80">
                      Updates the highlighted menu item, collapses the panel,
                      and keeps the navbar button state in sync.
                    </div>
                  </div>
                  <div
                    className="bg-card rounded-lg p-6"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <div className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                      Panel behavior
                    </div>
                    <div className="text-sm text-foreground opacity-80">
                      Collapsed width stays at 4rem. Expanded width is
                      controlled with the `maxWidth` property. Outside clicks
                      close the panel thanks to `collapseOnClickOutside`.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variations */}
        <div
          className="mb-12 p-8 bg-card rounded-lg"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Layout Variations
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-wide text-muted-foreground">
                    Analytics workspace
                  </div>
                  <div className="text-sm text-foreground opacity-80">
                    Persistent navigation with outside clicks disabled.
                  </div>
                </div>
                <ModusWcButton
                  color="secondary"
                  variant="outlined"
                  size="sm"
                  onButtonClick={() => {
                    const next = !analyticsExpanded;
                    setAnalyticsExpanded(next);
                    logEvent(
                      `Analytics navigation ${next ? "expanded" : "collapsed"}`
                    );
                  }}
                >
                  {analyticsExpanded ? "Collapse" : "Expand"}
                </ModusWcButton>
              </div>
              <div
                className="relative h-72 bg-card rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <ModusSideNavigation
                  items={analyticsItemsWithSelection}
                  expanded={analyticsExpanded}
                  onExpandedChange={(next) => {
                    setAnalyticsExpanded(next);
                    logEvent(
                      `Analytics navigation ${next ? "expanded" : "collapsed"}`
                    );
                  }}
                  collapseOnClickOutside={false}
                  maxWidth="320px"
                  size="lg"
                  customClass="side-nav-analytics"
                />
                <div
                  className="h-full transition-all duration-200 ease-out"
                  style={{
                    marginLeft: analyticsExpanded ? "320px" : "4rem",
                    padding: "1.5rem",
                  }}
                >
                  <div className="text-sm text-foreground opacity-80">
                    {analyticsExpanded
                      ? "Large navigation ideal for analytical consoles. Manual toggles manage visibility, and outside clicks are ignored."
                      : "Collapsed mode keeps icons centered. Expand to reveal section names."}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-background rounded-lg p-6 flex flex-col gap-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-wide text-muted-foreground">
                    Compact overlay
                  </div>
                  <div className="text-sm text-foreground opacity-80">
                    Slim navigation with custom width styling via `customClass`.
                  </div>
                </div>
                <ModusWcButton
                  color="secondary"
                  variant="outlined"
                  size="sm"
                  onButtonClick={() => {
                    const next = !compactExpanded;
                    setCompactExpanded(next);
                    logEvent(
                      `Compact navigation ${next ? "expanded" : "collapsed"}`
                    );
                  }}
                >
                  {compactExpanded ? "Collapse" : "Expand"}
                </ModusWcButton>
              </div>
              <div
                className="relative h-72 bg-card rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <ModusSideNavigation
                  items={compactItemsWithSelection}
                  expanded={compactExpanded}
                  onExpandedChange={(next) => {
                    setCompactExpanded(next);
                    logEvent(
                      `Compact navigation ${next ? "expanded" : "collapsed"}`
                    );
                  }}
                  maxWidth="220px"
                  customClass="side-nav-compact"
                />
                <div
                  className="h-full transition-all duration-200 ease-out"
                  style={{
                    marginLeft: compactExpanded ? "220px" : "4rem",
                    padding: "1.5rem",
                  }}
                >
                  <div className="text-sm text-foreground opacity-80">
                    {compactExpanded
                      ? "Compact layout keeps navigation narrow and focused. The custom class adjusts background and spacing."
                      : "Collapsed mode maintains consistent icon sizing at 4rem width."}
                  </div>
                </div>
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
            Monitor `expandedChange` events and menu selections emitted by the
            side navigation and navbar integration.
          </div>
          <div
            className="bg-background rounded-lg p-4 min-h-40"
            style={{ border: "1px solid var(--border)" }}
          >
            {eventLog.length === 0 ? (
              <div className="text-sm text-foreground opacity-60">
                Use the navbar hamburger, select menu items, or toggle the
                variations above to populate the log.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {eventLog.map((entry, index) => (
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
        .demo-shell {
          min-height: 24rem;
        }

        .side-nav-analytics .modus-wc-menu-item {
          font-size: 1rem;
        }

        .side-nav-compact .modus-wc-menu {
          padding: 0.5rem;
        }

        .side-nav-compact .modus-wc-menu-item {
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
}
