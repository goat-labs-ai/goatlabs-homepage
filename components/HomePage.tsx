"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TransitionSection from "@/components/TransitionSection";
import PhilosophySection from "@/components/PhilosophySection";
import ProcessSection from "@/components/ProcessSection";
import WhyMeSection from "@/components/WhyMeSection";
import SpeedWidget from "@/components/SpeedWidget";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import CompanyDetails from "@/components/CompanyDetails";
import Footer from "@/components/Footer";

export default function HomePage() {
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
      <AboutSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <CTASection />
      <div className="section-divider mx-auto max-w-5xl" />
      <CompanyDetails />
      <Footer />
    </div>
  );
}
