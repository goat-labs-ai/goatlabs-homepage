import { motion } from "framer-motion";

const steps = [
  { label: "Talk", time: "Day 1", note: "30 min. Your problem, my questions." },
  { label: "Scope", time: "Day 2–3", note: "What, when, how much. No ambiguity." },
  { label: "Build", time: "Weeks", note: "Working software every week. Not decks." },
  { label: "Ship", time: "Done", note: "Yours. Deployed, documented, handed off." },
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
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-3">
            How it works.
          </h2>
          <p className="text-muted-foreground text-base">
            Same person architects, builds, and ships. No layers.
          </p>
        </motion.div>

        {/* Horizontal visual timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-border" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="hidden md:block w-3 h-3 rounded-full bg-primary/80 border-2 border-background mb-6" />

                <span className="text-xs font-mono text-primary/60 block mb-2">{step.time}</span>
                <h3 className="text-xl font-bold text-bright mb-1">{step.label}</h3>
                <p className="text-muted-foreground text-sm">{step.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
