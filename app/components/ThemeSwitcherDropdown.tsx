"use client";

import { useTheme, type Theme } from "../contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";
import {
  ModusWcDropdownMenu,
  ModusWcMenuItem,
} from "@trimble-oss/moduswebcomponents-react";

interface ThemeSwitcherDropdownProps {
  className?: string;
}

function ThemeSwitcherDropdownContent({
  className = "",
}: ThemeSwitcherDropdownProps) {
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLModusWcDropdownMenuElement>(null);

  // Add event listeners directly to the dropdown element
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      const handleItemSelect = (event: Event) => {
        const customEvent = event as CustomEvent;
        const selectedValue = customEvent.detail?.value as Theme;
        if (selectedValue && selectedValue !== theme) {
          setTheme(selectedValue);
          dropdown.menuVisible = false;
        }
      };

      dropdown.addEventListener("itemSelect", handleItemSelect);

      return () => {
        dropdown.removeEventListener("itemSelect", handleItemSelect);
      };
    }
  }, [theme, setTheme]);

  const themes: { value: Theme; label: string; description: string }[] = [
    {
      value: "modus-classic-light",
      label: "Classic Light",
      description: "Traditional light theme",
    },
    {
      value: "modus-classic-dark",
      label: "Classic Dark",
      description: "Traditional dark theme",
    },
    {
      value: "modus-modern-light",
      label: "Modern Light",
      description: "Contemporary light theme",
    },
    {
      value: "modus-modern-dark",
      label: "Modern Dark",
      description: "Contemporary dark theme",
    },
  ];

  const getCurrentThemeLabel = () => {
    const currentTheme = themes.find((t) => t.value === theme);
    return currentTheme ? currentTheme.label : "Theme";
  };

  const handleThemeSelect = (event: React.SyntheticEvent) => {
    const customEvent = event.nativeEvent as CustomEvent;
    const selectedValue = customEvent.detail?.value as Theme;
    if (selectedValue && selectedValue !== theme) {
      setTheme(selectedValue);

      // Close the dropdown
      if (dropdownRef.current) {
        dropdownRef.current.menuVisible = false;
      }
    }
  };

  const handleMenuVisibility = () => {
    // Optional: Add any logic when menu opens/closes
  };

  return (
    <div className={`theme-switcher-dropdown ${className}`}>
      <ModusWcDropdownMenu
        ref={dropdownRef}
        buttonSize="md"
        buttonVariant="filled"
        menuPlacement="bottom-end"
        onMenuVisibilityChange={handleMenuVisibility}
        onSelect={handleThemeSelect}
        className="theme-dropdown"
      >
        <div
          slot="button"
          className="theme-button-content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            minWidth: "140px",
            padding: "0 12px",
            gap: "8px",
          }}
        >
          <span
            className="theme-label"
            style={{
              flex: "1",
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {getCurrentThemeLabel()}
          </span>
          <i
            className="modus-icons theme-arrow"
            style={{
              fontSize: "16px",
              flexShrink: "0",
              marginLeft: "auto",
            }}
          >
            expand_more
          </i>
        </div>
        <div slot="menu">
          {themes.map((themeOption) => (
            <ModusWcMenuItem
              key={themeOption.value}
              label={themeOption.label}
              value={themeOption.value}
              selected={theme === themeOption.value}
              onSelect={handleThemeSelect}
            />
          ))}
        </div>
      </ModusWcDropdownMenu>
    </div>
  );
}

export default function ThemeSwitcherDropdown(
  props: ThemeSwitcherDropdownProps
) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`theme-switcher-dropdown ${props.className || ""}`}>
        <div className="animate-pulse">
          <div
            className="h-8 w-32 rounded"
            style={{ backgroundColor: "var(--modus-wc-color-base-200)" }}
          />
        </div>
      </div>
    );
  }

  return <ThemeSwitcherDropdownContent {...props} />;
}
