"use client";

import { useEffect, useState } from "react";
import {
  ModusWcButton,
  ModusWcThemeProvider,
} from "@trimble-oss/moduswebcomponents-react";
import ModusThemeSwitcher, {
  ModusThemeConfig,
} from "../components/ModusThemeSwitcher";

const themes = [
  {
    label: "Modus Modern",
    light: "modus-modern-light",
    dark: "modus-modern-dark",
  },
  {
    label: "Modus Classic",
    light: "modus-classic-light",
    dark: "modus-classic-dark",
  },
];

export default function ThemeSwitcherDemoPage() {
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const themeSet = themes[themeIndex];

  useEffect(() => {
    const savedTheme = localStorage.getItem("modus-theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [currentTheme]);

  const handleThemeChange = (config: ModusThemeConfig) => {
    setCurrentTheme(config.name);
    localStorage.setItem("modus-theme", config.name);
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((previous) =>
      [`${timestamp} — switched to ${config.name}`, ...previous].slice(0, 18)
    );
  };

  const toggleThemeSet = () => {
    setThemeIndex((current) => (current + 1) % themes.length);
  };

  const deriveThemeConfig = (name: string): ModusThemeConfig => ({
    name,
    mode: name.endsWith("dark") ? "dark" : "light",
  });

  const appliedTheme = deriveThemeConfig(currentTheme ?? themeSet.light);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Theme Switcher Demo
        </div>
        <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
          Toggle between light and dark modes with the Modus theme switcher.
          Persist users&apos; preferences and switch across Modus Classic and
          Modus Modern palettes.
        </div>
      </div>

      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
          <div>
            <div className="text-2xl font-semibold text-foreground mb-2">
              Live Theme Playground
            </div>
            <div className="text-sm text-foreground opacity-80">
              Stored theme: {currentTheme ?? "not set"}. Change the palette
              family or toggle between light/dark modes.
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <ModusWcButton
              color="secondary"
              variant="outlined"
              size="sm"
              onButtonClick={toggleThemeSet}
            >
              Use {themes[(themeIndex + 1) % themes.length].label}
            </ModusWcButton>
            <ModusWcButton
              color="primary"
              variant="outlined"
              size="sm"
              onButtonClick={() =>
                handleThemeChange({ name: themeSet.light, mode: "light" })
              }
            >
              Switch to Light
            </ModusWcButton>
            <ModusWcButton
              color="primary"
              variant="filled"
              size="sm"
              onButtonClick={() =>
                handleThemeChange({ name: themeSet.dark, mode: "dark" })
              }
            >
              Switch to Dark
            </ModusWcButton>
          </div>
        </div>

        <ModusWcThemeProvider initialTheme={appliedTheme}>
          <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                  Current palette
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {themeSet.label} ({appliedTheme.mode})
                </div>
              </div>
              <ModusThemeSwitcher
                ariaLabel="Toggle light and dark theme"
                onThemeChange={handleThemeChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-foreground">
                  Contrast preview
                </div>
                <div className="p-6 rounded-lg border border-border bg-card shadow-sm">
                  <div className="text-foreground font-semibold mb-2">
                    Dashboard cards
                  </div>
                  <div className="text-sm text-foreground opacity-80 leading-relaxed">
                    Ensure data visualizations look great in both light and dark
                    modes.
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-semibold text-foreground">
                  Accent preview
                </div>
                <div className="p-6 rounded-lg border border-border bg-card">
                  <ModusWcButton color="primary">Primary Action</ModusWcButton>
                  <span className="ml-4 text-sm text-foreground opacity-80">
                    Buttons and badges update with the selected palette.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ModusWcThemeProvider>
      </div>

      <div
        className="p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-4">
          Theme Change Log
        </div>
        <div className="text-sm text-foreground opacity-70 mb-4">
          Observe the payload from `themeChange` and manual actions.
        </div>
        <div className="bg-background border border-border rounded-lg p-4 min-h-40">
          {eventLog.length === 0 ? (
            <div className="text-sm text-foreground opacity-60">
              Use the switcher or buttons above to generate log entries.
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
  );
}
