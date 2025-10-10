"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeSwitcherDropdown from "./ThemeSwitcherDropdown";

export default function AppHeader() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header
        className="w-full border-b bg-background border-border text-foreground"
        style={{ borderBottomWidth: "1px" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
          <div className="flex-shrink-0">
            <div className="text-xl md:text-2xl font-semibold m-0 text-foreground">
              Modus 2.0 Next.js App
            </div>
          </div>
          <div className="flex gap-2 md:gap-4 order-2 md:order-1">
            <Link
              href="/"
              className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
            >
              Home
            </Link>
            <Link
              href="/button-demo"
              className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
            >
              Button Demo
            </Link>
            <Link
              href="/color-palette"
              className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
            >
              Colors
            </Link>
            <Link
              href="/accordion-demo"
              className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
            >
              Accordion
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
            >
              About
            </Link>
          </div>
          <div className="flex items-center min-w-[140px] order-1 md:order-2">
            <div className="animate-pulse">
              <div className="h-8 w-32 rounded border" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className="w-full border-b bg-background border-border text-foreground"
      style={{ borderBottomWidth: "1px" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
        <div className="flex-shrink-0">
          <div className="text-xl md:text-2xl font-semibold m-0 text-foreground">
            Modus 2.0 Next.js App
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 order-2 md:order-1">
          <Link
            href="/"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Home
          </Link>
          <Link
            href="/button-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Button Demo
          </Link>
          <Link
            href="/color-palette"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Colors
          </Link>
          <Link
            href="/components-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Components
          </Link>
        </div>
        <div className="flex items-center min-w-[140px] order-1 md:order-2">
          <ThemeSwitcherDropdown />
        </div>
      </div>
    </header>
  );
}
