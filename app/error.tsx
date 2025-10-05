'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--modus-wc-color-base-page)" }}
    >
      <div className="text-center">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "var(--modus-wc-color-base-content)" }}
        >
          Something went wrong!
        </h1>
        <p
          className="text-lg mb-8"
          style={{ color: "var(--modus-wc-color-base-content)" }}
        >
          An error occurred while loading this page.
        </p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 rounded-lg text-white font-medium transition-colors"
          style={{ backgroundColor: "var(--modus-wc-color-info)" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
