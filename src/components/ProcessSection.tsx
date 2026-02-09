import { motion } from "framer-motion";
import { MessageSquare, Compass, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Conversation",
    duration: "Day 1",
    description:
      "A direct, 30-minute call. I listen to your problem, ask the right questions, and tell you honestly if I'm the right fit.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Scope & clarity",
    duration: "Day 2–3",
    description:
      "A clear proposal: what gets built, what it costs, and when it ships. No ambiguity, no hidden layers.",
  },
  {
    icon: Hammer,
    number: "03",
    title: "Build sprint",
    duration: "Weeks, not months",
    description:
      "Focused, AI-augmented execution. You see working software every week — not decks, not wireframes.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Ship & own",
    duration: "Handoff day",
    description:
      "Production deployment, documentation, knowledge transfer. It's your product — fully yours, no strings attached.",
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
          className="max-w-2xl mb-20"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block">
            How I work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-bright tracking-tight mb-4">
            One person. Zero overhead.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            You talk to the same person who architects, builds, and ships your product.
            No handoffs, no telephone game.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative p-6 rounded-xl bg-card border border-border group hover:glow-border transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-primary/60">{step.number}</span>
                <span className="text-xs font-mono text-muted-foreground">{step.duration}</span>
              </div>
              <step.icon className="w-5 h-5 text-primary mb-4" />
              <h3 className="text-base font-semibold text-bright mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector line on larger screens */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
