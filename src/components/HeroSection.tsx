import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroGoat from "@/assets/hero-goat.webp";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setScrollY(-rect.top);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stronger parallax: image moves up slower, text moves faster
  const imgOffset = scrollY * 0.4;
  const imgScale = 1 + scrollY * 0.0003;
  const textOffset = scrollY * 0.6;
  const textOpacity = Math.max(0, 1 - scrollY / 500);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Single hero image — full visible at start, parallax on scroll */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${imgOffset}px, 0) scale(${imgScale})`,
        }}
      >
        <img
          src={heroGoat}
          alt="Mountain goat standing confidently on a rocky peak"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
      </div>

      {/* Hero text — moves faster than image for depth */}
      <div
        className="absolute inset-0 flex items-end justify-center z-10 will-change-transform pb-[15vh]"
        style={{
          transform: `translate3d(0, -${textOffset}px, 0)`,
          opacity: textOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6 max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            <span className="text-bright">We climb where</span>
            <br />
            <span className="gradient-text">others won't go.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-base md:text-lg text-foreground/80 max-w-xl mx-auto mb-8 leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          >
            Senior engineering, amplified by AI.
            <br className="hidden sm:block" />
            Production software — shipped in weeks, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-20" />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 z-30 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
