import { motion } from "framer-motion";
import { Zap, Target, Shield } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Speed as strategy",
    description:
      "AI-augmented development means I ship production-ready software in weeks. Your competitive advantage starts on day one.",
  },
  {
    icon: Target,
    title: "Founder-level alignment",
    description:
      "No project managers, no handoffs. You work directly with a senior engineer who thinks about your business, not just your backlog.",
  },
  {
    icon: Shield,
    title: "Craft over scale",
    description:
      "Boutique means intentional. Every line of code is deliberate, every architecture decision is yours to own long after we part ways.",
  },
];

const PhilosophySection = () => {
  return (
    <section id="approach" className="relative py-28 md:py-36">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block">
            Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-bright tracking-tight mb-4">
            Not an agency. Not a factory.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A strategic engineering partner who treats your product like their own.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group p-6 md:p-8 rounded-xl bg-card border border-border transition-all hover:glow-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-bright mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
