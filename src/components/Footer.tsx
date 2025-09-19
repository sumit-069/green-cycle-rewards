import React from 'react';
import { Leaf, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import greenovantLogo from '@/assets/greenovant-logo.jpg';

const Footer = () => {
  const scrollToFeatures = (tab: string) => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const tabElement = document.querySelector(`[data-value="${tab}"]`);
        if (tabElement) {
          (tabElement as HTMLElement).click();
        }
      }, 800);
    }
  };

  const footerLinks = {
    platform: [
      { name: 'How It Works', href: '#features', onClick: () => scrollToFeatures('articles') },
      { name: 'Waste Scanner', href: '#features', onClick: () => scrollToFeatures('scan-waste') },
      { name: 'Rewards Program', href: '#features', onClick: () => scrollToFeatures('rewards') },
      { name: 'Events Calendar', href: '#features', onClick: () => scrollToFeatures('events') },
    ],
    resources: [
      { name: 'Recycling Guide', href: '#features', onClick: () => scrollToFeatures('uses-waste') },
      { name: 'Waste Policies', href: '#features', onClick: () => scrollToFeatures('policies') },
      { name: 'Educational Articles', href: '#features', onClick: () => scrollToFeatures('articles') },
      { name: 'Municipal Directory', href: '#features', onClick: () => scrollToFeatures('notify-municipal') },
    ],
    community: [
      { name: 'Join Events', href: '#features', onClick: () => scrollToFeatures('events') },
      { name: 'Share Ideas', href: '#features', onClick: () => scrollToFeatures('uses-waste') },
      { name: 'Success Stories', href: '#features', onClick: () => scrollToFeatures('articles') },
      { name: 'Partner With Us', href: '#features', onClick: () => scrollToFeatures('events') },
    ],
    support: [
      { name: 'Help Center', href: '#features', onClick: () => scrollToFeatures('articles') },
      { name: 'Contact Support', href: '#features', onClick: () => scrollToFeatures('notify-municipal') },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src={greenovantLogo} alt="GREENOVANT Logo" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">GREENOVANT</h3>
                  <p className="text-sm text-muted-foreground">Future in Green</p>
                </div>
              </div>
              
              <p className="text-muted-foreground max-w-md">
                Leading the revolution in smart waste management through AI-powered solutions, 
                community engagement, and gamified sustainability practices for a cleaner, greener future.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>contact@greenovant.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) GREEN-VENT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Green Tech Hub, Sustainability Street</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-8 lg:col-span-3">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Platform</h4>
                <ul className="space-y-2">
                  {footerLinks.platform.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (link.onClick) link.onClick();
                        }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (link.onClick) link.onClick();
                        }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Community</h4>
                <ul className="space-y-2">
                  {footerLinks.community.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (link.onClick) link.onClick();
                        }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2 lg:col-span-3 xl:col-span-1">
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (link.onClick) link.onClick();
                        }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                © 2024 GREENOVANT Platform. All rights reserved.
              </div>
              <div className="hidden md:flex items-center space-x-2 text-xs text-muted-foreground">
                <Leaf className="w-3 h-3 text-primary" />
                <span>Carbon Neutral Certified</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
          
          {/* Environmental Impact Stats */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Together we've made a positive impact:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">2.5M kg</div>
                  <div className="text-xs text-muted-foreground">Waste Recycled</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-success">15,000</div>
                  <div className="text-xs text-muted-foreground">Trees Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-warning">50,000+</div>
                  <div className="text-xs text-muted-foreground">Eco Warriors</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">25+</div>
                  <div className="text-xs text-muted-foreground">Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;