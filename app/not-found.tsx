import Link from "next/link";

export default function NotFound() {
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
          404 - Page Not Found
        </h1>
        <p
          className="text-lg mb-8"
          style={{ color: "var(--modus-wc-color-base-content)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg text-white font-medium transition-colors"
          style={{ backgroundColor: "var(--modus-wc-color-info)" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
