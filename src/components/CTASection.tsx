import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-5 leading-tight">
            Let's talk.
          </h2>

          <p className="text-muted-foreground text-sm mb-8">
            No pitch. No funnel. Just a conversation about what you're building.
          </p>

          <a
            href="mailto:hello@example.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:shadow-[0_0_50px_-10px_hsl(var(--primary)/0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start a conversation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
