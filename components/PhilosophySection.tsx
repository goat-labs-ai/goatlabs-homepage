"use client";

import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const PhilosophySection = () => {
  const { t } = useLang();
  const p = translations.philosophy;

  return (
    <section id="approach" className="relative py-20 md:py-28">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight">
            {t(p.title)}
          </h2>
        </motion.div>

        <div className="space-y-0 border-t border-border max-w-3xl mx-auto">
          {p.outcomes.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[60px_220px_1fr] gap-4 md:gap-8 items-baseline py-6 border-b border-border group"
            >
              <span className="text-xs font-mono text-primary/50">{item.number}</span>
              <h3 className="text-lg md:text-xl font-semibold text-bright">{t(item.title)}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed col-start-2 md:col-start-3">
                {t(item.detail)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
