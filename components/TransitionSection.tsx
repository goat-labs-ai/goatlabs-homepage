"use client";

import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const TransitionSection = () => {
  const { t } = useLang();
  const tr = translations.transition;

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px bg-primary mx-auto mb-6"
          />
          <p className="text-2xl md:text-3xl text-bright font-bold tracking-tight leading-snug">
            {t(tr.headline)}
            <br />
            <span className="text-muted-foreground font-normal text-lg md:text-xl">{t(tr.sub)}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TransitionSection;
