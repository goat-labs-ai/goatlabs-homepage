import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="relative py-32 md:py-44">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Subtle ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-6 leading-tight">
              Let's build something
              <br />
              <span className="gradient-text">worth shipping.</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto mb-10">
              No pitch decks. No discovery workshops. Just a calm, honest conversation
              about what you need and whether I can help.
            </p>

            <a
              href="mailto:hello@example.com"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:shadow-[0_0_50px_-10px_hsl(var(--primary)/0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <p className="text-sm text-muted-foreground/60 mt-8">
              I respond within 24 hours. Usually faster.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
