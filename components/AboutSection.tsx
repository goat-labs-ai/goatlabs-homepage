"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const AboutSection = () => {
  const { t } = useLang();
  const a = translations.about;

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-6">
              {t(a.title)}
            </h2>

            <div className="space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>{t(a.p1)}</p>
              <p>{t(a.p2)}</p>
              <p className="text-muted-foreground">{t(a.p3)}</p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>{t(a.linkedin)}</span>
              </a>
              <span className="text-border">·</span>
              <span className="text-xs text-muted-foreground/50 font-mono">
                {t(a.available)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
