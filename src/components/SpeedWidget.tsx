import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Total target: 61 min 33 sec = 3693 seconds
const TARGET_SECONDS = 3693;
const ANIM_DURATION = 2500; // ms

const useAnimatedTime = (start: boolean) => {
  const [totalSec, setTotalSec] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / ANIM_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setTotalSec(Math.floor(eased * TARGET_SECONDS));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start]);

  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return { mins, secs };
};

const stack = ["Custom React", "TypeScript", "Cloud infra", "CI/CD"];

const SpeedWidget = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mins, secs } = useAnimatedTime(isInView);

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
          {/* Widget container */}
          <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
            {/* Terminal-like header */}
            <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-border bg-secondary/30">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <span className="text-[10px] text-muted-foreground ml-2 font-mono">build.log</span>
            </div>

            <div className="p-5 md:p-6">
              {/* Counter */}
              <div className="mb-5">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-4xl md:text-5xl font-bold text-bright tabular-nums tracking-tight">
                    {String(mins).padStart(2, "0")}
                  </span>
                  <span className="text-lg text-muted-foreground font-normal">m</span>
                  <span className="text-4xl md:text-5xl font-bold text-bright tabular-nums tracking-tight ml-1">
                    {String(secs).padStart(2, "0")}
                  </span>
                  <span className="text-lg text-muted-foreground font-normal">s</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  This page. From scratch. Somewhere between
                  <br />
                  chopping vegetables and deploying to production.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-4" />

              {/* Stack footnote */}
              <div className="flex flex-wrap gap-2 mb-4">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] px-2 py-1 rounded bg-secondary text-muted-foreground font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-mono">
                AI-assisted, not AI-generated. Real code, real infra.
              </p>

              {/* Punchline */}
              <div className="h-px bg-border my-4" />
              <p className="text-xs text-foreground/70 leading-relaxed">
                If this is what gets built casually —
                <br />
                <span className="text-bright">imagine what happens when I focus on yours.</span>
              </p>
            </div>

            {/* Framed page preview as proof */}
            <div className="border-t border-border bg-secondary/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-[10px] text-muted-foreground font-mono">live preview — goatlabs.dev</span>
              </div>
              <div className="rounded-md border border-border overflow-hidden bg-background">
                <iframe
                  src={window.location.href.split('#')[0]}
                  title="This page — live preview"
                  className="w-full h-48 md:h-56 pointer-events-none"
                  loading="lazy"
                  sandbox=""
                />
              </div>
              <p className="text-[10px] text-muted-foreground/40 mt-2 font-mono">
                ↑ This is the page you're looking at right now.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpeedWidget;
