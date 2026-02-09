import { motion } from "framer-motion";
import { UserCheck, Gem, Target, ShieldCheck } from "lucide-react";

const differentiators = [
  {
    icon: UserCheck,
    title: "Senior-level, not junior-delegated",
    description:
      "Every decision, every line — made by a CTO-level engineer. No juniors, no outsourcing, no surprises.",
  },
  {
    icon: Gem,
    title: "Boutique by design",
    description:
      "I take on few projects at a time. This means you get my full attention, not a ticket number in a queue.",
  },
  {
    icon: Target,
    title: "Strategic, not transactional",
    description:
      "I don't just build what you ask for — I challenge, refine, and improve it. A partner, not an order-taker.",
  },
  {
    icon: ShieldCheck,
    title: "No overengineering",
    description:
      "The right solution at the right scale. No architecture astronautics, no gold-plating. Pragmatism over ego.",
  },
];

const WhyMeSection = () => {
  return (
    <section id="why" className="relative py-28 md:py-36">
      <div className="container px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block">
              Why me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-bright tracking-tight mb-6">
              Not an agency.
              <br />
              <span className="gradient-text">A weapon.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              You don't need a team of ten. You need one senior engineer who
              understands your business and ships like a founder.
            </p>
          </motion.div>

          {/* Right — differentiators */}
          <div className="space-y-4">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-xl bg-card border border-border hover:glow-border transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-bright mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
