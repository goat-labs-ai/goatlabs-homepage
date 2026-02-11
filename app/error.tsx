"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-md px-6 text-center">
        <div className="mb-6">
          <span className="text-[10px] font-mono text-destructive/50">ERROR</span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-bright tracking-tight">
            Something went wrong.
          </h1>
        </div>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          An unexpected error occurred. This has been logged and we'll look into it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border bg-card/40 text-foreground text-sm font-medium transition-colors hover:bg-card/60"
          >
            Back to home
          </a>
        </div>

        {process.env.NODE_ENV === "development" && error.digest && (
          <div className="mt-8 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-xs font-mono text-muted-foreground">
              Error ID: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
