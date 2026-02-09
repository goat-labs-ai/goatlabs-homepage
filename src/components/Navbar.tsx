import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container px-6 md:px-8 flex items-center justify-between h-16">
        <a href="#" className="text-bright font-semibold tracking-tight text-lg">
          <span className="gradient-text">◆</span>{" "}
          <span className="hidden sm:inline">studio</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Approach", "Services", "Process"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Let's talk →
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
