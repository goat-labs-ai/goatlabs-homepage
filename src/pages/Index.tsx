import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TransitionSection from "@/components/TransitionSection";
import PhilosophySection from "@/components/PhilosophySection";
import ProcessSection from "@/components/ProcessSection";
import WhyMeSection from "@/components/WhyMeSection";
import SpeedWidget from "@/components/SpeedWidget";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TransitionSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <PhilosophySection />
      <div className="section-divider mx-auto max-w-5xl" />
      <ProcessSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <WhyMeSection />
      <SpeedWidget />
      <div className="section-divider mx-auto max-w-5xl" />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
