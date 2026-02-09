import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Terminal, GitBranch } from "lucide-react";

const outcomes = [
  {
    icon: ArrowUpRight,
    title: "Compressed timelines",
    description:
      "Weeks to production, not quarters. AI-augmented engineering eliminates busywork — what remains is focus and craft.",
  },
  {
    icon: Layers,
    title: "Intelligent systems",
    description:
      "LLM pipelines, retrieval architectures, decision automation. Applied AI that disappears into the product and makes it better.",
  },
  {
    icon: Terminal,
    title: "Production-grade code",
    description:
      "Clean, tested, documented. Your codebase is an asset you can hand to any senior engineer. No lock-in, no debt.",
  },
  {
    icon: GitBranch,
    title: "Deliberate architecture",
    description:
      "Designed for what you need today, structured for what comes next. No premature optimization, no throwaway prototypes.",
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
          className="max-w-2xl mb-20"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block">
            What I do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-bright tracking-tight mb-4">
            Outcomes, not deliverables.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I build software that moves your business forward. AI is a multiplier
            in my process — embedded quietly, not sold loudly.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-px bg-border/50 rounded-xl overflow-hidden">
          {outcomes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card p-8 md:p-10 group"
            >
              <item.icon className="w-5 h-5 text-primary/70 mb-5" />
              <h3 className="text-lg font-semibold text-bright mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
