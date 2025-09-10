import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TabbedFeatures from '@/components/TabbedFeatures';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TabbedFeatures />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
