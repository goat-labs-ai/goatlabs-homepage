"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { TimerDisplay } from "./TimerDisplay";

const stack = ["Custom React", "TypeScript", "Cloud infra", "CI/CD"];

const SpeedWidget = () => {
  const { t } = useLang();
  const s = translations.speed;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    setIframeUrl(window.location.href.split("#")[0]);
  }, []);

  const descLines = t(s.description).split("\n");

  return (
    <div ref={ref} className="py-12 md:py-20">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
            <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-border bg-secondary/30">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <span className="text-[10px] text-muted-foreground ml-2 font-mono">build.log</span>
            </div>

            <div className="p-5 md:p-6">
              <div className="mb-5">
                <TimerDisplay start={isInView} />
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {descLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < descLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>

              <div className="h-px bg-border mb-4" />

              <div className="flex flex-wrap gap-2 mb-4">
                {stack.map((item) => (
                  <span key={item} className="text-[10px] px-2 py-1 rounded bg-secondary text-muted-foreground font-mono">
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-mono">
                {t(s.aiNote)}
              </p>

              <div className="h-px bg-border my-4" />
              <p className="text-xs text-foreground/70 leading-relaxed">
                {t(s.punchline1)}
                <br />
                <span className="text-bright">{t(s.punchline2)}</span>
              </p>
            </div>

            <div className="border-t border-border bg-secondary/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-[10px] text-muted-foreground font-mono">{t(s.preview)}</span>
              </div>
              <div className="rounded-md border border-border overflow-hidden bg-background">
                {iframeUrl && (
                  <iframe
                    src={iframeUrl}
                    title="This page — live preview"
                    className="w-full h-48 md:h-56 pointer-events-none"
                    loading="lazy"
                    sandbox=""
                  />
                )}
              </div>
              <p className="text-[10px] text-muted-foreground/40 mt-2 font-mono">
                {t(s.previewNote)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpeedWidget;
