const CompanyDetails = () => {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          {/* README-style header */}
          <div className="rounded-lg border border-border bg-card/40 overflow-hidden">
            <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-border bg-secondary/30">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <span className="text-[10px] text-muted-foreground ml-2 font-mono">
                company.md
              </span>
            </div>

            <div className="p-5 md:p-6 space-y-5 text-sm">
              {/* Heading */}
              <div>
                <h2 className="text-lg font-semibold text-bright font-mono">
                  # Company details
                </h2>
                <p className="text-muted-foreground text-xs mt-1">
                  The boring-but-important stuff.
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Details grid */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">name</span>
                  <span className="text-foreground/90">GoatLabs</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">address</span>
                  <span className="text-foreground/90">ul. Przykładowa 42, 00-001 Warszawa, Poland</span>
                </div>

                <div className="h-px bg-border/50" />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">NIP</span>
                  <span className="text-foreground/90 tabular-nums">000-000-00-00</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">REGON</span>
                  <span className="text-foreground/90 tabular-nums">000000000</span>
                </div>

                <div className="h-px bg-border/50" />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">email</span>
                  <a
                    href="mailto:hello@goatlabs.dev"
                    className="text-foreground/90 hover:text-primary transition-colors"
                  >
                    hello@goatlabs.dev
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">phone</span>
                  <a
                    href="tel:+48000000000"
                    className="text-foreground/90 hover:text-primary transition-colors tabular-nums"
                  >
                    +48 000 000 000
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;
