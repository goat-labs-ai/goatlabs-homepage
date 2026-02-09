import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ProcessSection = () => {
  const { t } = useLang();
  const p = translations.process;

  return (
    <section id="process" className="relative py-20 md:py-28">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-3">
            {t(p.title)}
          </h2>
          <p className="text-muted-foreground text-sm font-mono">
            {t(p.subtitle)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-border bg-card/60 overflow-hidden max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-secondary/30">
            <div className="w-2 h-2 rounded-full bg-destructive/50" />
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <div className="w-2 h-2 rounded-full bg-green-500/40" />
            <span className="text-[10px] text-muted-foreground ml-2 font-mono">
              {t(p.terminalCmd)}
            </span>
          </div>

          <div className="font-mono text-sm">
            {p.steps.map((step, i) => (
              <motion.div
                key={step.cmd}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.12 }}
                className="flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-b-0 hover:bg-secondary/20 transition-colors"
              >
                <span className="text-primary/80 mt-0.5 shrink-0">✓</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-primary/70 text-xs">{step.cmd}</span>
                    <span className="text-bright text-sm">{t(step.label)}</span>
                    <span className="text-muted-foreground/50 text-[10px] ml-auto shrink-0">{t(step.time)}</span>
                  </div>
                  <p className="text-muted-foreground text-xs mt-0.5">{t(step.detail)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-4 py-2.5 text-xs text-muted-foreground/40 font-mono">
            <span className="animate-pulse text-primary/60">▋</span> ready
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
