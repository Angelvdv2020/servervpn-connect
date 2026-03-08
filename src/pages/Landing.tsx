import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import PlatformsSection from '@/components/landing/PlatformsSection';
import WhySection from '@/components/landing/WhySection';
import ScenariosSection from '@/components/landing/ScenariosSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PricingSection from '@/components/landing/PricingSection';
import TrustSection from '@/components/landing/TrustSection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import Footer from '@/components/landing/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PlatformsSection />
        <WhySection />
        <ScenariosSection />
        <HowItWorksSection />
        <PricingSection />
        <TrustSection />
        <ReviewsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
