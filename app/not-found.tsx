import Link from "next/link";

export default function NotFound() {
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
