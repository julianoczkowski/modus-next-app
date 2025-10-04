import ModusButtonDemo from "./components/ModusButtonDemo";
import ModusButtonSecondary from "./components/ModusButtonSecondary";
import ModusButtonWarning from "./components/ModusButtonWarning";
import ModusButtonDanger from "./components/ModusButtonDanger";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ backgroundColor: 'var(--modus-wc-color-base-100)' }}>
      <main className="flex flex-col items-center gap-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--modus-wc-color-base-content)' }}>
            Modus Web Components Demo
          </h1>
          <p className="text-lg" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.8 }}>
            Next.js 15 + React 19 + Modus Design System
          </p>
        </div>

        {/* Button Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-3 p-6 rounded-lg shadow-md" style={{ backgroundColor: 'var(--modus-wc-color-base-page)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.8 }}>
              Primary
            </h3>
            <ModusButtonDemo />
            <p className="text-xs text-center" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.6 }}>
              Filled variant with apps icon
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg shadow-md" style={{ backgroundColor: 'var(--modus-wc-color-base-page)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.8 }}>
              Secondary
            </h3>
            <ModusButtonSecondary />
            <p className="text-xs text-center" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.6 }}>
              Outlined variant with download icon
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg shadow-md" style={{ backgroundColor: 'var(--modus-wc-color-base-page)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.8 }}>
              Warning
            </h3>
            <ModusButtonWarning />
            <p className="text-xs text-center" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.6 }}>
              Filled variant with warning icon
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg shadow-md" style={{ backgroundColor: 'var(--modus-wc-color-base-page)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.8 }}>
              Danger
            </h3>
            <ModusButtonDanger />
            <p className="text-xs text-center" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.6 }}>
              Borderless variant with delete icon
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 text-center max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--modus-wc-color-base-content)' }}>
            Modus Web Components Integration
          </h2>
          <p className="mb-4" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.8 }}>
            This demo showcases Modus Web Components integrated with Next.js 15
            and React 19. Each button demonstrates different color variants,
            styles, and icon usage patterns.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: 'var(--modus-wc-color-base-content)', opacity: 0.6 }}>
            <span className="flex items-center gap-1">
              <i className="modus-icons">check_circle</i>
              React 19 Compatible
            </span>
            <span className="flex items-center gap-1">
              <i className="modus-icons">check_circle</i>
              TypeScript Support
            </span>
            <span className="flex items-center gap-1">
              <i className="modus-icons">check_circle</i>
              SSR Ready
            </span>
            <span className="flex items-center gap-1">
              <i className="modus-icons">check_circle</i>
              Dark Mode Support
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
