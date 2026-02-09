import { motion } from "framer-motion";
import { Cpu, TrendingUp, Sparkles, Code2 } from "lucide-react";

const outcomes = [
  {
    icon: TrendingUp,
    title: "Launch faster",
    description:
      "Go from idea to production in weeks. AI-augmented development compresses timelines without cutting corners.",
  },
  {
    icon: Cpu,
    title: "AI that works",
    description:
      "Not chatbot demos — real AI integration. Automation, intelligent pipelines, and LLM-powered features that solve actual problems.",
  },
  {
    icon: Code2,
    title: "Code you own",
    description:
      "Clean, documented, production-grade. Your codebase is an asset, not a liability. No vendor lock-in, ever.",
  },
  {
    icon: Sparkles,
    title: "Scale when ready",
    description:
      "Architecture designed for today's needs with tomorrow's growth in mind. Start lean, expand deliberately.",
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
            I build software that moves your business forward — fast, clean, and with
            AI as a genuine lever, not a buzzword on a slide.
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
              <item.icon className="w-5 h-5 text-primary mb-5 transition-transform group-hover:scale-110" />
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
