const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} GoatLabs. Built with precision.
        </p>
        <div className="flex items-center gap-6">
          {["LinkedIn", "GitHub", "Twitter"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
