import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import PurchaseModal from './components/PurchaseModal';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResalePortal from './components/ResalePortal';
import OperatorPanel from './components/OperatorPanel';
import ProofSection from './components/ProofSection';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePortal, setActivePortal] = useState('landing'); // 'landing' | 'resale' | 'operator'
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setIsPurchaseModalOpen(true);
  };

  const handleLaunchModal = () => {
    // Default to premium plan if none selected
    if (!selectedPackage) {
      setSelectedPackage({
        id: 'premium',
        name: 'Premium Node',
        cost: 100,
        yieldVal: '15,000'
      });
    }
    setIsPurchaseModalOpen(true);
  };

  const handleScrollToSection = (targetId) => {
    setActivePortal('landing');
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-cyber-black text-slate-200 relative selection:bg-green-500/30 selection:text-green-300">
      {/* Immersive cursor tracker backlight */}
      <CursorGlow />

      {/* Global Floating Header */}
      <Navbar
        activePortal={activePortal}
        setActivePortal={setActivePortal}
        onPurchaseClick={handleLaunchModal}
      />

      {/* Main View Manager Router */}
      <main className="relative">
        {activePortal === 'landing' ? (
          /* Main Interactive Crypto Landing Page */
          <>
            <Hero
              onGetStarted={handleLaunchModal}
              onLearnMore={() => handleScrollToSection('features')}
            />
            <Stats />
            <Features onPricingScroll={() => handleScrollToSection('pricing')} />
            <HowItWorks />
            <Pricing onSelectPackage={handleSelectPackage} />
            <ProofSection />
            <Testimonials />
            <Faq />
            <Contact />
          </>
        ) : activePortal === 'resale' ? (
          /* Simulated Liquidity Resale Swap Portal */
          <ResalePortal />
        ) : (
          /* Simulated High-tech Operator Dashboard Console */
          <OperatorPanel />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActivePortal={setActivePortal}
        onPurchaseClick={handleLaunchModal}
      />

      {/* Dynamic 5-Step Checkout Wizard Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
      />
    </div>
  );
}

export default App;
