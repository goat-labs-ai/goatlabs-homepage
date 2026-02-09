import { motion } from "framer-motion";

const TransitionSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle grid pattern emerging */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-primary mx-auto mb-10"
          />

          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-light">
            Mountains teach patience and precision.
            <br className="hidden sm:block" />
            <span className="text-bright font-normal">I bring both to every line of code.</span>
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-primary mx-auto mt-10"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TransitionSection;
