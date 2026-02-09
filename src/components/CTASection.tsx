import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          {/* Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/8 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-6">
              Ready to build
              <br />
              <span className="gradient-text">something real?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-10">
              No sales pitch. No discovery workshop. Just a direct conversation 
              with the person who'll build your product.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@example.com"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4" />
                Get in touch
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Typically respond within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
