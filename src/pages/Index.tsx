import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TabbedFeatures from '@/components/TabbedFeatures';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('articles');

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onTabChange={handleTabChange} />
      <main>
        <HeroSection />
        <TabbedFeatures activeTab={activeTab} onTabChange={setActiveTab} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
