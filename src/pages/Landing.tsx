
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection onGetStarted={handleGetStarted} />
      <TestimonialsSection />
      <CTASection />
      <FooterSection isAuthenticated={isAuthenticated} onLogout={logout} />
    </div>
  );
}
