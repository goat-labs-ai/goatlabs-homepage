import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const WhyMeSection = () => {
  const { t } = useLang();
  const w = translations.whyMe;

  return (
    <section id="why" className="relative py-20 md:py-28">
      <div className="container px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-3">
              {t(w.title)}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              {t(w.subtitle)}
            </p>
          </motion.div>

          <div className="space-y-5 inline-block text-left">
            {w.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{t(point)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
