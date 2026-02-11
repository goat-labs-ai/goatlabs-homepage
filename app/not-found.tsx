import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-md px-6 text-center">
        <div className="mb-6">
          <span className="text-[10px] font-mono text-primary/50">ERROR 404</span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-bright tracking-tight">
            Page not found.
          </h1>
        </div>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          This path doesn't exist. Either the URL is wrong, or the page moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            ← Back to home
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border bg-card/40 text-foreground text-sm font-medium transition-colors hover:bg-card/60"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
