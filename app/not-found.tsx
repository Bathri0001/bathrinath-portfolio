import Link from "next/link";
export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-accent2-ink">404</p>
      <h1 className="gradient-text mt-2 text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn btn-primary mt-6">Back to home</Link>
    </section>
  );
}
