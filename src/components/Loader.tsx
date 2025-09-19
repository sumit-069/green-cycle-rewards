import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import greenovantLogo from '@/assets/greenovant-logo.jpg';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center hero-gradient">
      <div className="text-center space-y-8 slide-up">
        {/* Logo with Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center pulse-glow">
            <img src={greenovantLogo} alt="GREENOVANT Logo" className="w-20 h-20 float-animation" />
          </div>
          
          {/* Rotating Leaves */}
          <div className="absolute -top-4 -right-4">
            <Leaf className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute -bottom-4 -left-4">
            <Leaf className="w-6 h-6 text-primary-light animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
          </div>
        </div>

        {/* Brand Text */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            GREENOVANT
          </h1>
          <p className="text-lg text-muted-foreground">
            Smart Waste Management Platform
          </p>
          <p className="text-sm text-primary font-medium">
            Future in Green
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto space-y-2">
          <div className="w-full bg-card/30 rounded-full h-2 backdrop-blur-sm">
            <div 
              className="eco-gradient h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Loading... {Math.round(progress)}%
          </p>
        </div>

        {/* Loading Text Animation */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;