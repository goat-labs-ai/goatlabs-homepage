import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <PhilosophySection />
      <div className="section-divider mx-auto max-w-5xl" />
      <ServicesSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <ProcessSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
