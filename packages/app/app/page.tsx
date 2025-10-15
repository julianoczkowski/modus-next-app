import ModusButton from "../components/ModusButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-8 flex justify-center items-center">
            <Image
              src="/nextjs-icon.svg"
              alt="Next.js Logo"
              width={80}
              height={80}
              className="drop-shadow-lg transition-transform duration-300 hover:scale-105 nextjs-logo-light"
            />
            <Image
              src="/nextjs-icon.svg"
              alt="Next.js Logo"
              width={80}
              height={80}
              className="drop-shadow-lg transition-transform duration-300 hover:scale-105 nextjs-logo-dark hidden"
            />
          </div>
          <div className="text-4xl font-semibold mb-4 text-foreground">
            Modus Next.js Boilerplate
          </div>
          <div className="text-lg leading-relaxed text-foreground text-center max-w-2xl mx-auto">
            A production-ready Next.js 15 boilerplate with Modus 2 Web
            Components integration. Start building your application with 40+
            pre-built components and modern development practices.
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="mb-12">
          <div className="text-2xl font-semibold mb-6 text-foreground text-center">
            Quick Start
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div
              className="rounded-xl p-6 flex flex-col gap-4 bg-card"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="flex items-start gap-4 flex-1">
                <i className="modus-icons text-2xl flex-shrink-0 mt-1 text-foreground">
                  coffee_cup
                </i>
                <div className="flex-1">
                  <div className="text-lg font-semibold mb-2 m-0 text-foreground">
                    Rich Components
                  </div>
                  <div className="text-body leading-relaxed m-0 opacity-80 text-foreground">
                    40+ production-ready Modus components ready to use
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-6 flex flex-col gap-4 bg-card"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="flex items-start gap-4 flex-1">
                <i className="modus-icons text-2xl flex-shrink-0 mt-1 text-foreground">
                  palette
                </i>
                <div className="flex-1">
                  <div className="text-lg font-semibold mb-2 m-0 text-foreground">
                    Theme Support
                  </div>
                  <div className="text-body leading-relaxed m-0 opacity-80 text-foreground">
                    Light & dark themes with Classic and Modern variants
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mb-12">
          <div className="text-2xl font-semibold mb-6 text-foreground text-center">
            Getting Started
          </div>
          <div className="max-w-3xl mx-auto">
            <div
              className="bg-card rounded-xl p-6"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="text-lg font-semibold mb-4 text-foreground">
                Start Building Your App
              </div>
              <div className="text-foreground mb-4">
                This boilerplate includes everything you need to start building
                with Modus Web Components:
              </div>
              <div className="list-none space-y-2 mb-6 text-foreground">
                <div className="flex items-center gap-2">
                  <i className="modus-icons text-sm text-primary">check</i>
                  Next.js 15 with React 19 and TypeScript
                </div>
                <div className="flex items-center gap-2">
                  <i className="modus-icons text-sm text-primary">check</i>
                  40+ pre-built Modus wrapper components
                </div>
                <div className="flex items-center gap-2">
                  <i className="modus-icons text-sm text-primary">check</i>
                  Complete theme system with 4 variants
                </div>
                <div className="flex items-center gap-2">
                  <i className="modus-icons text-sm text-primary">check</i>
                  Production-ready build configuration
                </div>
                <div className="flex items-center gap-2">
                  <i className="modus-icons text-sm text-primary">check</i>
                  Comprehensive linting and quality tools
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Want to see component examples?</strong> Install the
                demos workspace to explore interactive examples and
                implementation patterns.
              </div>
            </div>
          </div>
        </div>

        {/* Component Showcase */}
        <div className="mb-12">
          <div className="text-2xl font-semibold mb-6 text-foreground text-center">
            Available Components
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div
              className="bg-card rounded-lg p-4 text-center"
              style={{ border: "1px solid var(--border)" }}
            >
              <i className="modus-icons text-2xl mb-2 text-primary">add</i>
              <div className="text-sm font-medium text-foreground">Buttons</div>
            </div>
            <div
              className="bg-card rounded-lg p-4 text-center"
              style={{ border: "1px solid var(--border)" }}
            >
              <i className="modus-icons text-2xl mb-2 text-primary">
                edit_combination
              </i>
              <div className="text-sm font-medium text-foreground">Forms</div>
            </div>
            <div
              className="bg-card rounded-lg p-4 text-center"
              style={{ border: "1px solid var(--border)" }}
            >
              <i className="modus-icons text-2xl mb-2 text-primary">
                dashboard
              </i>
              <div className="text-sm font-medium text-foreground">
                Navigation
              </div>
            </div>
            <div
              className="bg-card rounded-lg p-4 text-center"
              style={{ border: "1px solid var(--border)" }}
            >
              <i className="modus-icons text-2xl mb-2 text-primary">info</i>
              <div className="text-sm font-medium text-foreground">
                Feedback
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="text-lg font-semibold mb-4 text-foreground">
            Ready to Build?
          </div>
          <div className="text-foreground mb-6">
            Start customizing this boilerplate for your project
          </div>
          <div className="flex gap-4 justify-center">
            <ModusButton color="primary" size="lg">
              <i className="modus-icons mr-2">rocket_launch</i>
              Get Started
            </ModusButton>
            <ModusButton color="secondary" size="lg">
              <i className="modus-icons mr-2">book</i>
              View Docs
            </ModusButton>
          </div>
        </div>
      </div>
    </div>
  );
}
