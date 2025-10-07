"use client";

import Image from "next/image";

export default function AppFooter() {
  return (
    <footer className="text-center py-4 border-t-2 bg-card border-border text-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center flex-wrap gap-4 px-4">
        <div className="flex items-center gap-3">
          <Image
            src="/nextjs-icon.svg"
            alt="Next.js Logo"
            width={24}
            height={24}
            className="drop-shadow-sm nextjs-logo-light"
            style={{
              filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
            }}
          />
          <Image
            src="/nextjs-icon.svg"
            alt="Next.js Logo"
            width={24}
            height={24}
            className="drop-shadow-sm nextjs-logo-dark hidden"
            style={{
              filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1)) invert(1)",
            }}
          />
          <span className="text-sm text-foreground">
            &copy; 2025 Modus 2.0 Next.js App - Built with Next.js
          </span>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/julianoczkowski/modus-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center transition-colors duration-200 no-underline text-foreground hover:opacity-80"
          >
            <Image
              src="/github-mark.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="mr-1.5 github-icon-light"
            />
            <Image
              src="/github-mark-white.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="mr-1.5 github-icon-dark hidden"
            />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
