import ModusButton from "./components/ModusButton";
import Link from "next/link";
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
            Welcome to Modus 2.0 Next.js Apps
          </div>
          <div className="text-lg leading-relaxed text-foreground text-center">
            A boilerplate for building Next.js applications with Modus. If you
            can see this page, example components, icons and theme switching you
            have successfully installed the boilerplate.
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div
              className="rounded-xl p-6 flex flex-col gap-4 color-card bg-card border border-border"
              style={{ borderWidth: "1px" }}
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
                    40+ production-ready components
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link href="/button-demo" className="no-underline">
                  <ModusButton color="primary">Check Buttons</ModusButton>
                </Link>
              </div>
            </div>

            <div
              className="rounded-xl p-6 flex flex-col gap-4 color-card bg-card border border-border"
              style={{ borderWidth: "1px" }}
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
                    Light & dark themes with variants
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <ModusButton
                  color="secondary"
                  size="sm"
                  icon="brightness"
                  iconPosition="left"
                >
                  Try Themes
                </ModusButton>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <div className="text-3xl font-semibold mb-4 text-foreground">
              About this Boilerplate
            </div>
            <div className="text-body max-w-2xl mx-auto opacity-80 text-foreground">
              Watch this video to discover more about this boilerplate
            </div>
          </div>
          <div
            className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg aspect-video bg-card border border-border"
            style={{ borderWidth: "1px" }}
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
    </div>
  );
}
