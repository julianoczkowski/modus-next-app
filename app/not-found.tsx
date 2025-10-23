"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function NotFound() {
  const pathname = usePathname();
  const isDemosRoute = pathname.startsWith("/demos/");

  if (isDemosRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-2xl mx-auto text-center p-8">
          <div className="text-6xl mb-6">📦</div>
          <div className="text-4xl font-bold mb-4 text-foreground">
            Demo Pages Not Installed
          </div>
          <div className="text-lg mb-8 text-foreground leading-relaxed">
            The demo pages you&apos;re looking for aren&apos;t installed yet.
            Install the Modus Next.js demos package to get access to all
            component examples.
          </div>

          <div className="bg-card rounded-lg p-6 mb-8 border-default">
            <div className="text-xl font-semibold mb-4 text-foreground">
              Installation Instructions
            </div>
            <div className="text-left bg-background rounded p-4 mb-4 font-mono text-sm">
              <div className="text-muted-foreground mb-2">
                # Install the demos package
              </div>
              <div className="text-foreground">
                npm install @julianoczkowski/modus-nextjs-demos
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-left">
              After installation, demo pages will be automatically copied to
              your{" "}
              <code className="bg-background px-2 py-1 rounded text-xs">
                app/demos/
              </code>{" "}
              directory.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <ModusWcButton color="primary" variant="filled">
                <i className="modus-icons mr-2">home</i>
                Go Home
              </ModusWcButton>
            </Link>
            <Link href="/color-palette">
              <ModusWcButton color="secondary" variant="outlined">
                <i className="modus-icons mr-2">palette</i>
                View Colors
              </ModusWcButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-4xl font-bold mb-4 text-foreground">
          404 - Page Not Found
        </div>
        <div className="text-lg mb-8 text-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg text-primary-foreground font-medium transition-colors bg-primary"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
