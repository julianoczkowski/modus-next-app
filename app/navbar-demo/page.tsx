"use client";

import { useState, useCallback } from "react";
import ModusNavbar from "../components/ModusNavbar";
import ModusButton from "../components/ModusButton";

export default function NavbarDemo() {
  // State for navbar configuration
  const [condensed, setCondensed] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [notificationsMenuOpen, setNotificationsMenuOpen] = useState(false);
  const [appsMenuOpen, setAppsMenuOpen] = useState(false);
  const [searchInputOpen, setSearchInputOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [condensedMenuOpen, setCondensedMenuOpen] = useState(false);

  // Visibility controls
  const [visibility, setVisibility] = useState({
    mainMenu: true,
    search: true,
    searchInput: true,
    notifications: true,
    apps: true,
    ai: true,
    help: true,
    user: true,
  });

  // Event log for testing
  const [eventLog, setEventLog] = useState<string[]>([]);

  // User card data
  const userCard = {
    name: "Demo User",
    email: "demo@trimble.com",
    avatarSrc: "https://via.placeholder.com/40x40/0066CC/FFFFFF?text=DU",
  };

  // Event handlers
  const logEvent = useCallback((eventName: string, detail?: unknown) => {
    const timestamp = new Date().toLocaleTimeString();
    const detailStr = detail ? ` - ${JSON.stringify(detail)}` : "";
    const logEntry = `[${timestamp}] ${eventName}${detailStr}`;
    setEventLog((prev) => [logEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  }, []);

  const handleAiClick = useCallback(() => {
    logEvent("aiClick");
  }, [logEvent]);

  const handleAppsClick = useCallback(() => {
    logEvent("appsClick");
  }, [logEvent]);

  const handleHelpClick = useCallback(() => {
    logEvent("helpClick");
  }, [logEvent]);

  const handleNotificationsClick = useCallback(() => {
    logEvent("notificationsClick");
  }, [logEvent]);

  const handleSearchClick = useCallback(() => {
    logEvent("searchClick");
  }, [logEvent]);

  const handleSignOutClick = useCallback(() => {
    logEvent("signOutClick");
  }, [logEvent]);

  const handleMyTrimbleClick = useCallback(() => {
    logEvent("myTrimbleClick");
  }, [logEvent]);

  const handleTrimbleLogoClick = useCallback(() => {
    logEvent("trimbleLogoClick");
  }, [logEvent]);

  const handleSearchChange = useCallback(
    (value: string) => {
      logEvent("searchChange", { value });
    },
    [logEvent]
  );

  const handleMainMenuOpenChange = useCallback(
    (open: boolean) => {
      setMainMenuOpen(open);
      logEvent("mainMenuOpenChange", { open });
    },
    [logEvent]
  );

  const handleNotificationsMenuOpenChange = useCallback(
    (open: boolean) => {
      setNotificationsMenuOpen(open);
      logEvent("notificationsMenuOpenChange", { open });
    },
    [logEvent]
  );

  const handleAppsMenuOpenChange = useCallback(
    (open: boolean) => {
      setAppsMenuOpen(open);
      logEvent("appsMenuOpenChange", { open });
    },
    [logEvent]
  );

  const handleSearchInputOpenChange = useCallback(
    (open: boolean) => {
      setSearchInputOpen(open);
      logEvent("searchInputOpenChange", { open });
    },
    [logEvent]
  );

  const handleUserMenuOpenChange = useCallback(
    (open: boolean) => {
      setUserMenuOpen(open);
      logEvent("userMenuOpenChange", { open });
    },
    [logEvent]
  );

  const handleCondensedMenuOpenChange = useCallback(
    (open: boolean) => {
      setCondensedMenuOpen(open);
      logEvent("condensedMenuOpenChange", { open });
    },
    [logEvent]
  );

  // Slot content components
  const MainMenuContent = () => (
    <div
      className="p-4 bg-card rounded-lg border border-border"
      style={{ borderWidth: "1px" }}
    >
      <div className="text-lg font-semibold text-foreground mb-4">
        Main Menu
      </div>
      <div className="flex flex-col gap-2">
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded text-foreground hover:bg-muted no-underline"
        >
          <i className="modus-icons">home</i>
          Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded text-foreground hover:bg-muted no-underline"
        >
          <i className="modus-icons">folder</i>
          Projects
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded text-foreground hover:bg-muted no-underline"
        >
          <i className="modus-icons">people</i>
          Team
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded text-foreground hover:bg-muted no-underline"
        >
          <i className="modus-icons">settings</i>
          Settings
        </a>
      </div>
    </div>
  );

  const NotificationsContent = () => (
    <div
      className="p-4 bg-card rounded-lg border border-border"
      style={{ borderWidth: "1px" }}
    >
      <div className="text-lg font-semibold text-foreground mb-4">
        Notifications
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 border-b border-border">
          <i className="modus-icons text-primary">mail</i>
          <div>
            <div className="font-semibold text-foreground">
              New message received
            </div>
            <div className="text-sm text-muted-foreground">2 minutes ago</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border-b border-border">
          <i className="modus-icons text-warning">warning</i>
          <div>
            <div className="font-semibold text-foreground">
              System maintenance scheduled
            </div>
            <div className="text-sm text-muted-foreground">1 hour ago</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3">
          <i className="modus-icons text-success">check_circle</i>
          <div>
            <div className="font-semibold text-foreground">
              Project deployment successful
            </div>
            <div className="text-sm text-muted-foreground">3 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );

  const AppsContent = () => (
    <div
      className="p-4 bg-card rounded-lg border border-border"
      style={{ borderWidth: "1px" }}
    >
      <div className="text-lg font-semibold text-foreground mb-4">
        Applications
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: "mail", name: "Email" },
          { icon: "calendar", name: "Calendar" },
          { icon: "folder", name: "Files" },
          { icon: "chat", name: "Chat" },
          { icon: "analytics", name: "Analytics" },
          { icon: "settings", name: "Settings" },
        ].map((app, index) => (
          <a
            key={index}
            href="#"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted hover:bg-muted/80 text-foreground no-underline"
          >
            <i className="modus-icons text-primary text-2xl">{app.icon}</i>
            <span className="text-sm">{app.name}</span>
          </a>
        ))}
      </div>
    </div>
  );

  const StartContent = () => (
    <ModusButton
      variant="borderless"
      size="sm"
      icon="refresh"
      iconPosition="only"
      ariaLabel="Refresh"
      onButtonClick={() => logEvent("refreshClick")}
    >
      Refresh
    </ModusButton>
  );

  const CenterContent = () => (
    <div className="flex items-center gap-3">
      <i className="modus-icons text-primary">code</i>
      <span className="font-semibold text-foreground">Demo Application</span>
    </div>
  );

  const EndContent = () => (
    <div className="flex gap-2">
      <ModusButton
        variant="borderless"
        size="sm"
        icon="star"
        iconPosition="only"
        ariaLabel="Bookmark"
        onButtonClick={() => logEvent("bookmarkClick")}
      >
        Bookmark
      </ModusButton>
      <ModusButton
        variant="borderless"
        size="sm"
        icon="share"
        iconPosition="only"
        ariaLabel="Share"
        onButtonClick={() => logEvent("shareClick")}
      >
        Share
      </ModusButton>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <div className="text-3xl font-bold text-foreground mb-4">
          Modus Navbar Demo
        </div>
        <p className="text-lg text-muted-foreground">
          Interactive demonstration of the Modus Navbar component with full
          configuration options.
        </p>
      </div>

      {/* Configuration Controls */}
      <div
        className="mb-8 p-6 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-xl font-semibold text-foreground mb-4">
          Configuration Controls
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Layout
            </label>
            <select
              value={condensed ? "true" : "false"}
              onChange={(e) => setCondensed(e.target.value === "true")}
              className="w-full p-2 border border-border rounded bg-background text-foreground"
              style={{ borderWidth: "1px" }}
            >
              <option value="false">Standard</option>
              <option value="true">Condensed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Main Menu
            </label>
            <select
              value={visibility.mainMenu ? "true" : "false"}
              onChange={(e) =>
                setVisibility((prev) => ({
                  ...prev,
                  mainMenu: e.target.value === "true",
                }))
              }
              className="w-full p-2 border border-border rounded bg-background text-foreground"
              style={{ borderWidth: "1px" }}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Search
            </label>
            <select
              value={visibility.search ? "true" : "false"}
              onChange={(e) =>
                setVisibility((prev) => ({
                  ...prev,
                  search: e.target.value === "true",
                  searchInput: e.target.value === "true",
                }))
              }
              className="w-full p-2 border border-border rounded bg-background text-foreground"
              style={{ borderWidth: "1px" }}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notifications
            </label>
            <select
              value={visibility.notifications ? "true" : "false"}
              onChange={(e) =>
                setVisibility((prev) => ({
                  ...prev,
                  notifications: e.target.value === "true",
                }))
              }
              className="w-full p-2 border border-border rounded bg-background text-foreground"
              style={{ borderWidth: "1px" }}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Apps
            </label>
            <select
              value={visibility.apps ? "true" : "false"}
              onChange={(e) =>
                setVisibility((prev) => ({
                  ...prev,
                  apps: e.target.value === "true",
                }))
              }
              className="w-full p-2 border border-border rounded bg-background text-foreground"
              style={{ borderWidth: "1px" }}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              AI Button
            </label>
            <select
              value={visibility.ai ? "true" : "false"}
              onChange={(e) =>
                setVisibility((prev) => ({
                  ...prev,
                  ai: e.target.value === "true",
                }))
              }
              className="w-full p-2 border border-border rounded bg-background text-foreground"
              style={{ borderWidth: "1px" }}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Help
            </label>
            <select
              value={visibility.help ? "true" : "false"}
              onChange={(e) =>
                setVisibility((prev) => ({
                  ...prev,
                  help: e.target.value === "true",
                }))
              }
              className="w-full p-2 border border-border rounded bg-background text-foreground"
              style={{ borderWidth: "1px" }}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              User
            </label>
            <select
              value={visibility.user ? "true" : "false"}
              onChange={(e) =>
                setVisibility((prev) => ({
                  ...prev,
                  user: e.target.value === "true",
                }))
              }
              className="w-full p-2 border border-border rounded bg-background text-foreground"
              style={{ borderWidth: "1px" }}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <ModusButton
            color="primary"
            onButtonClick={() => {
              setMainMenuOpen(!mainMenuOpen);
              logEvent("toggleMainMenu", { open: !mainMenuOpen });
            }}
          >
            Toggle Main Menu
          </ModusButton>
          <ModusButton
            color="secondary"
            onButtonClick={() => {
              setNotificationsMenuOpen(!notificationsMenuOpen);
              logEvent("toggleNotifications", { open: !notificationsMenuOpen });
            }}
          >
            Toggle Notifications
          </ModusButton>
          <ModusButton
            color="tertiary"
            onButtonClick={() => {
              setAppsMenuOpen(!appsMenuOpen);
              logEvent("toggleApps", { open: !appsMenuOpen });
            }}
          >
            Toggle Apps
          </ModusButton>
        </div>
      </div>

      {/* Navbar Demo */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Navbar Component
        </div>
        <div
          className="border border-border rounded-lg overflow-hidden"
          style={{ borderWidth: "1px" }}
        >
          <ModusNavbar
            condensed={condensed}
            userCard={userCard}
            visibility={visibility}
            mainMenuOpen={mainMenuOpen}
            notificationsMenuOpen={notificationsMenuOpen}
            appsMenuOpen={appsMenuOpen}
            searchInputOpen={searchInputOpen}
            userMenuOpen={userMenuOpen}
            condensedMenuOpen={condensedMenuOpen}
            mainMenuContent={<MainMenuContent />}
            notificationsContent={<NotificationsContent />}
            appsContent={<AppsContent />}
            startContent={<StartContent />}
            centerContent={<CenterContent />}
            endContent={<EndContent />}
            onAiClick={handleAiClick}
            onAppsClick={handleAppsClick}
            onHelpClick={handleHelpClick}
            onNotificationsClick={handleNotificationsClick}
            onSearchClick={handleSearchClick}
            onSignOutClick={handleSignOutClick}
            onMyTrimbleClick={handleMyTrimbleClick}
            onTrimbleLogoClick={handleTrimbleLogoClick}
            onSearchChange={handleSearchChange}
            onMainMenuOpenChange={handleMainMenuOpenChange}
            onNotificationsMenuOpenChange={handleNotificationsMenuOpenChange}
            onAppsMenuOpenChange={handleAppsMenuOpenChange}
            onSearchInputOpenChange={handleSearchInputOpenChange}
            onUserMenuOpenChange={handleUserMenuOpenChange}
            onCondensedMenuOpenChange={handleCondensedMenuOpenChange}
            ariaLabel="Interactive demo navbar"
          />

          {/* Demo content area */}
          <div className="p-6 bg-muted min-h-64">
            <div className="text-lg font-semibold text-foreground mb-2">
              Page Content
            </div>
            <p className="text-muted-foreground">
              This is the main content area below the navbar. Use the controls
              above to modify the navbar properties and see how it behaves in
              different configurations. Click on navbar buttons to see events
              logged below.
            </p>
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Event Log
        </div>
        <div
          className="p-4 bg-muted rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-sm text-muted-foreground mb-2">
            Click navbar buttons to see events...
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {eventLog.length === 0 ? (
              <div className="text-muted-foreground italic">No events yet</div>
            ) : (
              eventLog.map((event, index) => (
                <div key={index} className="text-sm font-mono text-foreground">
                  {event}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-8">
        <div className="text-xl font-semibold text-foreground mb-4">
          Usage Examples
        </div>
        <div className="space-y-4">
          <div
            className="p-4 bg-card rounded-lg border border-border"
            style={{ borderWidth: "1px" }}
          >
            <div className="text-lg font-semibold text-foreground mb-2">
              Basic Usage
            </div>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              {`<ModusNavbar
  userCard={{
    name: "John Doe",
    email: "john@trimble.com",
    avatarSrc: "/avatar.jpg"
  }}
  centerContent="My Application"
  onSearchChange={(value) => console.log('Search:', value)}
/>`}
            </pre>
          </div>

          <div
            className="p-4 bg-card rounded-lg border border-border"
            style={{ borderWidth: "1px" }}
          >
            <div className="text-lg font-semibold text-foreground mb-2">
              Advanced Usage
            </div>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              {`<ModusNavbar
  condensed
  userCard={userCard}
  visibility={{
    mainMenu: true,
    search: true,
    notifications: true,
    user: true
  }}
  mainMenuContent={<CustomMainMenu />}
  notificationsContent={<CustomNotifications />}
  onMainMenuOpenChange={setMainMenuOpen}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
