import { motion } from "framer-motion";
import { Layers, Bot, Rocket, Database } from "lucide-react";

const services = [
  {
    icon: Rocket,
    title: "MVP & Product Build",
    description: "From idea to deployed product. Full-stack, AI-native applications built to validate fast and scale later.",
    tags: ["React", "Node", "Cloud"],
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "LLM pipelines, RAG systems, intelligent automation. Practical AI that solves real problems, not demos.",
    tags: ["LLMs", "RAG", "Agents"],
  },
  {
    icon: Layers,
    title: "Architecture & Strategy",
    description: "Technical due diligence, system design, and engineering strategy for founders who need a CTO's perspective.",
    tags: ["System Design", "Strategy"],
  },
  {
    icon: Database,
    title: "Rescue & Rebuild",
    description: "Inherited a mess? I untangle legacy code, fix critical issues, and set a clean foundation for growth.",
    tags: ["Refactor", "Migration"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-bright tracking-tight mb-4">
            What I build.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            End-to-end engineering for products that need to move fast and work right.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 md:p-8 rounded-xl bg-card border border-border transition-all hover:glow-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-bright mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-secondary text-xs font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
