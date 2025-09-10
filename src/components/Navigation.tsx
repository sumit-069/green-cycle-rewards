import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X, User, LogOut, Coins } from 'lucide-react';
import ecoLogo from '@/assets/eco-logo.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be connected to actual auth later
  const [ecoPoints, setEcoPoints] = useState(1250); // Mock points data

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Articles', href: '#articles' },
    { name: 'Events', href: '#events' },
    { name: 'Policies', href: '#policies' },
    { name: 'Scan Waste', href: '#scan-waste' },
    { name: 'Uses of Waste', href: '#uses-waste' },
    { name: 'Notify Municipal', href: '#notify-municipal' },
    { name: 'Rewards', href: '#rewards' },
    { name: 'Dashboard', href: '#dashboard' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      isScrolled ? 'bg-background/95 backdrop-blur-md card-shadow' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <img src={ecoLogo} alt="EcoWaste Logo" className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">EcoWaste</h2>
              <p className="text-xs text-muted-foreground">Smart & Green</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth hover:bg-primary/5 rounded-md"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side - Points & Auth */}
          <div className="flex items-center space-x-4">
            {/* Eco Points */}
            {isLoggedIn && (
              <div className="hidden sm:flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded-full">
                <Coins className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">{ecoPoints}</span>
              </div>
            )}

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="eco" 
                size="sm"
                onClick={() => setIsLoggedIn(true)}
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card/95 backdrop-blur-md rounded-lg mt-2 p-4 card-shadow">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-smooth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Points Display */}
              {isLoggedIn && (
                <div className="flex items-center justify-center space-x-2 bg-primary/10 px-4 py-3 rounded-lg mt-4">
                  <Coins className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Eco Points: {ecoPoints}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;