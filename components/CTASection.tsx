"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { contactFormSchema } from "@/lib/validations";
import { env } from "@/lib/env";

const CTASection = () => {
  const { t } = useLang();
  const c = translations.cta;
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const file = fileRef.current?.files?.[0];
    const result = contactFormSchema.safeParse({
      message,
      email,
      file,
    });

    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t(c.toastTitle),
      description: t(c.toastDesc),
    });
    setMessage("");
    setEmail("");
    setFileName("");
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
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
            {t(c.title)}
          </h2>
          <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
            {t(c.sub1)}
            <br className="hidden sm:block" />
            {t(c.sub2)}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              placeholder={t(c.placeholder)}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-border bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 resize-none font-mono transition-colors"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={t(c.email)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-lg border border-border bg-card/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 font-mono transition-colors"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="rounded-lg border border-border bg-card/40 px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/20 transition-colors font-mono truncate max-w-[200px]"
              >
                {fileName || t(c.attachFile)}
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
              className="w-full sm:w-auto rounded-lg bg-primary text-primary-foreground px-8 py-2.5 text-sm font-semibold transition-all hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)] hover:scale-[1.01] active:scale-[0.99]"
            >
              {t(c.send)}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground/60 mb-3 font-mono">
              {t(c.altIntro)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-xs font-mono">
              <a href={`mailto:${env.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                {env.contact.email}
              </a>
              <span className="hidden sm:inline text-muted-foreground/30">·</span>
              <a href={`tel:${env.contact.phone}`} className="text-muted-foreground hover:text-primary transition-colors tabular-nums">
                {env.contact.phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
