import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const useAnimatedCounter = (target: number, duration: number, start: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
};

const stack = ["Custom React", "TypeScript", "Cloud infra", "CI/CD"];

const SpeedWidget = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const minutes = useAnimatedCounter(61, 2000, isInView);

  return (
    <div ref={ref} className="py-16 md:py-24">
      <div className="container px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          {/* Widget container */}
          <div className="rounded-xl border border-border bg-card/50 p-6 md:p-8 font-mono">
            {/* Terminal-like header */}
            <div className="flex items-center gap-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <div className="w-2 h-2 rounded-full bg-border" />
              <span className="text-[10px] text-muted-foreground ml-2">build.log</span>
            </div>

            {/* Counter */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold text-bright tabular-nums tracking-tight">
                  {minutes}
                </span>
                <span className="text-sm text-muted-foreground">min</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                This page. From scratch. Somewhere between
                <br />
                chopping vegetables and deploying to production.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-5" />

            {/* Stack footnote */}
            <div className="flex flex-wrap gap-2 mb-5">
              {stack.map((item) => (
                <span
                  key={item}
                  className="text-[10px] px-2 py-1 rounded bg-secondary text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              AI-assisted, not AI-generated. Real code, real infra.
            </p>

            {/* Punchline */}
            <div className="h-px bg-border my-5" />
            <p className="text-xs text-foreground/70 leading-relaxed">
              If this is what gets built casually —
              <br />
              <span className="text-bright">imagine what happens when I focus on yours.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpeedWidget;
