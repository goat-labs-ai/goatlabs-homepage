"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TARGET_SECONDS = 3693; // 61m 33s
const ANIM_DURATION = 2500; // 2.5 seconds

interface TimerDisplayProps {
  start: boolean; // Start animation when in view
}

export function TimerDisplay({ start }: TimerDisplayProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [totalSec, setTotalSec] = useState(TARGET_SECONDS);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Don't animate until mounted and start=true
    if (!mounted || !start) return;

    // If reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setTotalSec(TARGET_SECONDS);
      return;
    }

    // Animate from 0 to TARGET_SECONDS
    setTotalSec(0);
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / ANIM_DURATION, 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setTotalSec(Math.floor(eased * TARGET_SECONDS));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [mounted, start, prefersReducedMotion]);

  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;

  return (
    <div className="flex items-baseline gap-1 font-mono" suppressHydrationWarning>
      <span className="text-4xl md:text-5xl font-bold text-bright tabular-nums tracking-tight">
        {String(mins).padStart(2, "0")}
      </span>
      <span className="text-lg text-muted-foreground font-normal">m</span>
      <span className="text-4xl md:text-5xl font-bold text-bright tabular-nums tracking-tight ml-1">
        {String(secs).padStart(2, "0")}
      </span>
      <span className="text-lg text-muted-foreground font-normal">s</span>
    </div>
  );
}
