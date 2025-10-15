import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/app/globals.css";
import ModusProvider from "../../app/components/ModusProvider";
import { ThemeProvider } from "../../app/contexts/ThemeContext";
import AppHeader from "../../app/components/AppHeader";
import AppFooter from "../../app/components/AppFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modus Components Demo",
  description: "Interactive examples and demos for Modus Web Components",
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModusProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <AppHeader workspace="demos" />
              <div className="flex-1">{children}</div>
              <AppFooter />
            </div>
          </ThemeProvider>
        </ModusProvider>
      </body>
    </html>
  );
}
