import { motion } from "framer-motion";
import { useState, useRef } from "react";

const CTASection = () => {
  const [formState, setFormState] = useState({ message: "", email: "", file: null as File | null });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState(prev => ({ ...prev, file }));
      setFileName(file.name);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-bright tracking-tight mb-3">
            Let's talk.
          </h2>
          <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
            Tell me what you're building — or send a link to something you like.
            <br className="hidden sm:block" />
            No pitch deck required. A napkin sketch works too.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                placeholder="What's on your mind?"
                value={formState.message}
                onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={4}
                className="w-full rounded-lg border border-border bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 resize-none font-mono transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={formState.email}
                onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                required
                className="flex-1 rounded-lg border border-border bg-card/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 font-mono transition-colors"
              />

              {/* File upload */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="rounded-lg border border-border bg-card/40 px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/20 transition-colors font-mono truncate max-w-[200px]"
              >
                {fileName || "attach file"}
              </button>
              <input
                ref={fileRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.fig,.sketch"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full sm:w-auto rounded-lg bg-primary text-primary-foreground px-8 py-2.5 text-sm font-semibold transition-all hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {submitted ? "Sent ✓" : "Send it"}
            </button>
          </form>

          {/* Alt contact */}
          <div className="mt-10 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground/60 mb-3 font-mono">
              # if you don't like forms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-xs font-mono">
              <a
                href="mailto:hello@goatlabs.dev"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                hello@goatlabs.dev
              </a>
              <span className="hidden sm:inline text-muted-foreground/30">·</span>
              <a
                href="tel:+48000000000"
                className="text-muted-foreground hover:text-primary transition-colors tabular-nums"
              >
                +48 000 000 000
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
