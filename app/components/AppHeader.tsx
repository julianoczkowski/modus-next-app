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
        <nav className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
          <div className="flex-shrink-0">
            <h2 className="text-xl md:text-2xl font-semibold m-0 text-foreground">
              Modus 2.0 Next.js App
            </h2>
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
        </nav>
      </header>
    );
  }

  return (
    <header
      className="w-full border-b bg-background border-border text-foreground"
      style={{ borderBottomWidth: "1px" }}
    >
      <nav className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
        <div className="flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-semibold m-0 text-foreground">
            Modus 2.0 Next.js App
          </h2>
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
            href="/table-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Table
          </Link>
          <Link
            href="/alert-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Alert
          </Link>
          <Link
            href="/autocomplete-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Autocomplete
          </Link>
          <Link
            href="/avatar-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Avatar
          </Link>
          <Link
            href="/badge-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Badge
          </Link>
          <Link
            href="/breadcrumbs-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Breadcrumbs
          </Link>
          <Link
            href="/card-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Card
          </Link>
          <Link
            href="/checkbox-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Checkbox
          </Link>
          <Link
            href="/chip-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Chip
          </Link>
          <Link
            href="/date-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Date
          </Link>
          <Link
            href="/dropdown-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            Dropdown
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base no-underline text-foreground hover:bg-card"
          >
            About
          </Link>
        </div>
        <div className="flex items-center min-w-[140px] order-1 md:order-2">
          <ThemeSwitcherDropdown />
        </div>
      </nav>
    </header>
  );
}
