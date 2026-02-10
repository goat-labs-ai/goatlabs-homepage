"use client";

import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { env } from "@/lib/env";

const CompanyDetails = () => {
  const { t } = useLang();
  const c = translations.company;

  return (
    <section className="relative py-16 md:py-20">
      <div className="container px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg border border-border bg-card/40 overflow-hidden">
            <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-border bg-secondary/30">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <span className="text-[10px] text-muted-foreground ml-2 font-mono">company.md</span>
            </div>

            <div className="p-5 md:p-6 space-y-5 text-sm">
              <div>
                <h2 className="text-lg font-semibold text-bright font-mono">{t(c.title)}</h2>
                <p className="text-muted-foreground text-xs mt-1">{t(c.subtitle)}</p>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-3 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">name</span>
                  <span className="text-foreground/90">{env.company.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">address</span>
                  <span className="text-foreground/90">{env.company.address}</span>
                </div>

                <div className="h-px bg-border/50" />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">NIP</span>
                  <span className="text-foreground/90 tabular-nums">{env.company.nip}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">REGON</span>
                  <span className="text-foreground/90 tabular-nums">{env.company.regon}</span>
                </div>

                <div className="h-px bg-border/50" />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">email</span>
                  <a href={`mailto:${env.contact.email}`} className="text-foreground/90 hover:text-primary transition-colors">
                    {env.contact.email}
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">phone</span>
                  <a href={`tel:${env.contact.phone}`} className="text-foreground/90 hover:text-primary transition-colors tabular-nums">
                    {env.contact.phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')}
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
