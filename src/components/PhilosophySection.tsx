import { motion } from "framer-motion";

const outcomes = [
  {
    number: "01",
    title: "Ship in weeks",
    detail: "Idea → production. AI compresses the timeline. You move while competitors plan.",
  },
  {
    number: "02",
    title: "AI that disappears",
    detail: "Pipelines, automation, LLMs — woven into your product. Not bolted on as a feature.",
  },
  {
    number: "03",
    title: "Code you can own",
    detail: "Clean. Tested. Documented. Hand it to any engineer — they'll thank you.",
  },
  {
    number: "04",
    title: "Built to evolve",
    detail: "Right-sized architecture. No gold-plating. Scales when you need it, not before.",
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
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight">
            What you get.
          </h2>
        </motion.div>

        <div className="space-y-0 border-t border-border">
          {outcomes.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[60px_200px_1fr] gap-4 md:gap-8 items-baseline py-8 border-b border-border group"
            >
              <span className="text-xs font-mono text-primary/50">{item.number}</span>
              <h3 className="text-lg md:text-xl font-semibold text-bright">{item.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed col-start-2 md:col-start-3">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
