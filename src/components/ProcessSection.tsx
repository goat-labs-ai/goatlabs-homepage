import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery call",
    description: "30-minute conversation to understand your problem, constraints, and goals. No fluff.",
  },
  {
    number: "02",
    title: "Scope & proposal",
    description: "A clear, honest breakdown of what I'll build, how long it takes, and what it costs. Fixed scope, no surprises.",
  },
  {
    number: "03",
    title: "Build sprint",
    description: "Rapid, focused execution. Daily async updates, weekly demos. You see progress in real time.",
  },
  {
    number: "04",
    title: "Ship & handoff",
    description: "Production deployment, documentation, and knowledge transfer. Your product, fully yours.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="relative py-28 md:py-36">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-bright tracking-tight mb-4">
            Simple. Transparent. Fast.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Four steps from first conversation to shipped product.
          </p>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-border hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-6 items-start"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                  <span className="text-sm font-mono text-primary font-semibold">{step.number}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-bright mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
