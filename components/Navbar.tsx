"use client";

import { motion } from "framer-motion";
import goatLabsLogo from "@/assets/goat-labs-logo.png";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Navbar = () => {
  const { lang, toggleLang, t } = useLang();
  const nav = translations.nav;

  const links = [
    { label: t(nav.approach), href: "#approach" },
    { label: t(nav.process), href: "#process" },
    { label: t(nav.about), href: "#about" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container px-6 md:px-8 flex items-center justify-between h-20">
        <a href="#" className="flex items-center">
          <img src={goatLabsLogo.src} alt="GoatLabs" className="h-20 brightness-0 invert" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          {/* Language switcher */}
          <button
            onClick={toggleLang}
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span className={lang === "en" ? "text-foreground" : "text-muted-foreground/50"}>EN</span>
            <span className="text-muted-foreground/30">/</span>
            <span className={lang === "pl" ? "text-foreground" : "text-muted-foreground/50"}>PL</span>
          </button>

          <a
            href="#contact"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {t(nav.letsTalk)}
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
