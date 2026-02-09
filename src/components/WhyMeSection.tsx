import { motion } from "framer-motion";

const points = [
  "CTO-level. Every line, every decision.",
  "Boutique. Few clients, full attention.",
  "I challenge your ideas. Then I build them better.",
  "No bloat. No premature architecture. Pragmatism.",
];

const WhyMeSection = () => {
  return (
    <section id="why" className="relative py-28 md:py-36">
      <div className="container px-6 md:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-4">
              Not an agency.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              One senior engineer who ships like a founder.
            </p>
          </motion.div>

          <div className="space-y-6">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
