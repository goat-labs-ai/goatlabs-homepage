import { Linkedin, Github, Twitter } from "lucide-react";

const socials = [
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "GitHub", icon: Github, href: "https://github.com" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GoatLabs.
          </p>
          <span className="hidden sm:inline text-muted-foreground/30">·</span>
          <p className="text-xs text-muted-foreground/50 font-mono">
            Build with internet.
          </p>
        </div>
        <div className="flex items-center gap-5">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
