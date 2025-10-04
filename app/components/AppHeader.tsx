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
        className="w-full border-b"
        style={{
          backgroundColor: "var(--modus-wc-color-base-page)",
          borderColor: "var(--modus-wc-color-base-200)",
        }}
      >
        <nav className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
          <div className="flex-shrink-0">
            <h2
              className="text-xl md:text-2xl font-semibold m-0"
              style={{ color: "var(--modus-wc-color-base-content)" }}
            >
              Modus 2.0 Next.js App
            </h2>
          </div>
          <div className="flex gap-2 md:gap-4 order-2 md:order-1">
            <Link
              href="/"
              className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base"
              style={{
                color: "var(--modus-wc-color-base-content)",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
            <Link
              href="/button-demo"
              className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base"
              style={{
                color: "var(--modus-wc-color-base-content)",
                textDecoration: "none",
              }}
            >
              Button Demo
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 md:px-4 rounded transition-colors duration-200 text-sm md:text-base"
              style={{
                color: "var(--modus-wc-color-base-content)",
                textDecoration: "none",
              }}
            >
              About
            </Link>
          </div>
          <div className="flex items-center min-w-[140px] order-1 md:order-2">
            <div className="animate-pulse">
              <div
                className="h-8 w-32 rounded"
                style={{ backgroundColor: "var(--modus-wc-color-base-200)" }}
              />
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className="w-full border-b"
      style={{
        backgroundColor: "var(--modus-wc-color-base-page)",
        borderColor: "var(--modus-wc-color-base-200)",
      }}
    >
      <nav className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
        <div className="flex-shrink-0">
          <h2
            className="text-xl md:text-2xl font-semibold m-0"
            style={{ color: "var(--modus-wc-color-base-content)" }}
          >
            Modus 2.0 Next.js App
          </h2>
        </div>
        <div className="flex gap-2 md:gap-4 order-2 md:order-1">
          <Link
            href="/"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 hover:bg-opacity-10 text-sm md:text-base"
            style={{
              color: "var(--modus-wc-color-base-content)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--modus-wc-color-base-100)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Home
          </Link>
          <Link
            href="/button-demo"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 hover:bg-opacity-10 text-sm md:text-base"
            style={{
              color: "var(--modus-wc-color-base-content)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--modus-wc-color-base-100)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Button Demo
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 md:px-4 rounded transition-colors duration-200 hover:bg-opacity-10 text-sm md:text-base"
            style={{
              color: "var(--modus-wc-color-base-content)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--modus-wc-color-base-100)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
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
