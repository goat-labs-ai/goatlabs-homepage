import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container px-6 md:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-bright tracking-tight mb-6">
              About.
            </h2>

            <div className="space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                I'm a CTO-level engineer who's spent years building products from zero to scale —
                across startups, scale-ups, and enterprise. Architecture, code, infrastructure, team.
              </p>
              <p>
                I've led engineering orgs, shipped products used by millions, and learned that the
                best software comes from people who understand both the business and the code.
              </p>
              <p className="text-muted-foreground">
                GoatLabs is how I work now: directly with founders, on hard problems,
                with AI as serious leverage — not a gimmick.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-border">·</span>
              <span className="text-xs text-muted-foreground/50 font-mono">
                Available for select engagements
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
