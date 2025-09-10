import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Recycle, Globe, TreePine, Award, Scan } from 'lucide-react';
import heroImage from '@/assets/hero-eco-illustration.png';

const HeroSection = () => {
  const stats = [
    { icon: Recycle, label: 'Waste Recycled', value: '2.5M kg', color: 'text-primary' },
    { icon: TreePine, label: 'Trees Saved', value: '15,000', color: 'text-success' },
    { icon: Award, label: 'Eco Warriors', value: '50k+', color: 'text-warning' },
    { icon: Globe, label: 'Cities Covered', value: '25+', color: 'text-primary-light' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-nature-mint/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 slide-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Smart Waste Management</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-primary">Clean Earth,</span>
                <br />
                <span className="eco-gradient bg-clip-text text-transparent">Green Future</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Join our smart waste management platform to create a sustainable future. 
                Scan, sort, and earn rewards while making a positive impact on our planet.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                <Scan className="w-5 h-5 group-hover:animate-pulse" />
                Start Scanning Waste
              </Button>
              <Button variant="outline" size="lg" className="bg-card/50 backdrop-blur-sm">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="text-center space-y-2 slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mx-auto w-12 h-12 bg-card/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 float-animation">
              <img 
                src={heroImage} 
                alt="Eco-friendly waste management illustration"
                className="w-full h-auto rounded-2xl card-shadow"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-success/20 rounded-full flex items-center justify-center float-animation" style={{ animationDelay: '0.5s' }}>
              <Recycle className="w-6 h-6 text-success" />
            </div>
            <div className="absolute top-1/2 -right-6 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center float-animation" style={{ animationDelay: '1s' }}>
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute -bottom-4 left-1/3 w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center float-animation" style={{ animationDelay: '1.5s' }}>
              <Globe className="w-5 h-5 text-warning" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;