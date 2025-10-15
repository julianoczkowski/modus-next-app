"use client";

import { useRouter } from "next/navigation";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ThemeSwitcherDropdown from "./ThemeSwitcherDropdown";

export default function AppHeader() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className="w-full"
      style={{
        borderBottomWidth: "1px",
        borderBottomColor: "var(--modus-wc-color-base-200)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
        <div className="flex-shrink-0">
          <div className="text-xl md:text-2xl font-semibold m-0 text-foreground">
            Modus 2.0 Next.js App
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 order-2 md:order-1">
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/")}
          >
            Home
          </ModusWcButton>
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/button-demo")}
          >
            Button Demo
          </ModusWcButton>
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/color-palette")}
          >
            Colors
          </ModusWcButton>
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/components-demo")}
          >
            Components
          </ModusWcButton>
        </div>
        <div className="flex items-center min-w-[140px] order-1 md:order-2">
          <ThemeSwitcherDropdown />
        </div>
      </div>
    </div>
  );
}
