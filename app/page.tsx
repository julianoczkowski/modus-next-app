import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--modus-wc-color-base-page)" }}
    >
      <AppHeader />

      <main
        className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full"
        style={{ backgroundColor: "var(--modus-wc-color-base-page)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-8 flex justify-center items-center">
              <Image
                src="/nextjs-icon.svg"
                alt="Next.js Logo"
                width={120}
                height={120}
                className="drop-shadow-lg transition-transform duration-300 hover:scale-105 nextjs-logo-light"
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                }}
              />
              <Image
                src="/nextjs-icon.svg"
                alt="Next.js Logo"
                width={120}
                height={120}
                className="drop-shadow-lg transition-transform duration-300 hover:scale-105 nextjs-logo-dark hidden"
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) invert(1)",
                }}
              />
            </div>
            <h1
              className="text-4xl md:text-5xl font-semibold mb-4"
              style={{ color: "var(--modus-wc-color-base-content)" }}
            >
              Welcome to Modus 2.0 Next.js App
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-80"
              style={{ color: "var(--modus-wc-color-base-content)" }}
            >
              A boilerplate for building Next.js applications with Modus. If you
              can see this page, example components, icons and theme switching
              you have successfully installed the boilerplate.
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div
                className="rounded-xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: "var(--modus-wc-color-base-100)",
                  border: "1px solid var(--modus-wc-color-base-200)",
                }}
              >
                <div className="flex items-start gap-4 flex-1">
                  <i
                    className="modus-icons text-2xl flex-shrink-0 mt-1"
                    style={{ color: "var(--modus-wc-color-base-content)" }}
                  >
                    coffee_cup
                  </i>
                  <div className="flex-1">
                    <h4
                      className="text-lg font-semibold mb-2 m-0"
                      style={{ color: "var(--modus-wc-color-base-content)" }}
                    >
                      Rich Components
                    </h4>
                    <p
                      className="text-sm leading-relaxed m-0 opacity-80"
                      style={{ color: "var(--modus-wc-color-base-content)" }}
                    >
                      40+ production-ready components
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Link href="/button-demo" className="no-underline">
                    <ModusWcButton color="primary">Check Buttons</ModusWcButton>
                  </Link>
                </div>
              </div>

              <div
                className="rounded-xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: "var(--modus-wc-color-base-100)",
                  border: "1px solid var(--modus-wc-color-base-200)",
                }}
              >
                <div className="flex items-start gap-4 flex-1">
                  <i
                    className="modus-icons text-2xl flex-shrink-0 mt-1"
                    style={{ color: "var(--modus-wc-color-base-content)" }}
                  >
                    palette
                  </i>
                  <div className="flex-1">
                    <h4
                      className="text-lg font-semibold mb-2 m-0"
                      style={{ color: "var(--modus-wc-color-base-content)" }}
                    >
                      Theme Support
                    </h4>
                    <p
                      className="text-sm leading-relaxed m-0 opacity-80"
                      style={{ color: "var(--modus-wc-color-base-content)" }}
                    >
                      Light & dark themes with variants
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <ModusWcButton color="secondary" size="sm">
                    <i className="modus-icons" style={{ marginRight: "6px" }}>
                      brightness
                    </i>
                    Try Themes
                  </ModusWcButton>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="mt-16 mb-12">
            <div className="text-center mb-8">
              <h2
                className="text-3xl md:text-4xl font-semibold mb-4"
                style={{ color: "var(--modus-wc-color-base-content)" }}
              >
                About this Boilerplate
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto opacity-80"
                style={{ color: "var(--modus-wc-color-base-content)" }}
              >
                Watch this video to discover more about this boilerplate
              </p>
            </div>
            <div
              className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg aspect-video"
              style={{
                backgroundColor: "var(--modus-wc-color-base-100)",
                border: "1px solid var(--modus-wc-color-base-200)",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/aG7Eu7SkKZA?si=KDI-XcSlRNr70bS5"
                title="Boilerplate Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-none rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
