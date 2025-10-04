"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Theme =
  | "modus-classic-light"
  | "modus-classic-dark"
  | "modus-modern-light"
  | "modus-modern-dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isModern: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("modus-classic-light");
  const [mounted, setMounted] = useState(false);

  // Derived state
  const isDark = theme.includes("dark");
  const isModern = theme.includes("modern");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("preferred-theme") as Theme;
    if (
      savedTheme &&
      [
        "modus-classic-light",
        "modus-classic-dark",
        "modus-modern-light",
        "modus-modern-dark",
      ].includes(savedTheme)
    ) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  // Apply theme to document when it changes
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;

    // Set theme attributes
    html.setAttribute("data-theme", theme);
    html.setAttribute("data-mode", isDark ? "dark" : "light");
    html.className = isDark ? "dark" : "light";

    // Save to localStorage
    localStorage.setItem("preferred-theme", theme);
  }, [theme, isDark, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, isModern }}>
      {children}
    </ThemeContext.Provider>
  );
}
