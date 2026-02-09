import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import parallaxBg from "@/assets/parallax-bg.png";
import parallaxMid from "@/assets/parallax-mid.png";
import parallaxGoat from "@/assets/parallax-goat.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      // Only track scroll while section is visible
      if (sectionTop < window.innerHeight && rect.bottom > 0) {
        setScrollY(-sectionTop);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOffset = scrollY * 0.15;
  const midOffset = scrollY * 0.35;
  const fgOffset = scrollY * 0.55;
  const textOffset = scrollY * 0.45;
  const textOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      ref={sectionRef}
      className="relative h-[130vh] overflow-hidden"
    >
      {/* Background layer — sky + distant mountains */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${bgOffset}px, 0)` }}
      >
        <img
          src={parallaxBg}
          alt=""
          className="w-full h-[130%] object-cover object-center"
          loading="eager"
        />
        {/* Darken overlay */}
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Midground layer — mountain ridges */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${midOffset}px, 0)` }}
      >
        <img
          src={parallaxMid}
          alt=""
          className="w-full h-[130%] object-cover object-bottom"
          loading="eager"
        />
      </div>

      {/* Hero text — between mid and foreground */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 will-change-transform"
        style={{
          transform: `translate3d(0, ${textOffset}px, 0)`,
          opacity: textOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6 max-w-3xl -mt-24"
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
            AI-powered software, built at founder speed.
            <br className="hidden sm:block" />
            Real business impact — shipped in weeks, not months.
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

      {/* Foreground layer — goat */}
      <div
        className="absolute inset-0 will-change-transform z-20 pointer-events-none"
        style={{ transform: `translate3d(0, ${fgOffset}px, 0)` }}
      >
        <img
          src={parallaxGoat}
          alt="Mountain goat standing confidently on a rocky peak"
          className="w-full h-[130%] object-cover object-bottom"
          loading="eager"
        />
        {/* Top gradient for blending */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/40 to-transparent" />
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-30" />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 z-30 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
