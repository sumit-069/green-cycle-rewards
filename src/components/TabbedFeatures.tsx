import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Scan, 
  Lightbulb, 
  Bell, 
  Gift,
  Leaf
} from 'lucide-react';
import ArticlesTab from './tabs/ArticlesTab';
import EventsTab from './tabs/EventsTab';
import PoliciesTab from './tabs/PoliciesTab';
import ScanWasteTab from './tabs/ScanWasteTab';
import UsesWasteTab from './tabs/UsesWasteTab';
import NotifyMunicipalTab from './tabs/NotifyMunicipalTab';
import RewardsTab from './tabs/RewardsTab';

interface TabbedFeaturesProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const TabbedFeatures: React.FC<TabbedFeaturesProps> = ({ 
  activeTab = 'articles', 
  onTabChange 
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const tabs = [
    {
      id: 'articles',
      label: 'Articles',
      icon: BookOpen,
      component: ArticlesTab,
      description: 'Educational content on sustainability'
    },
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      component: EventsTab,
      description: 'Eco-events and clean-up drives'
    },
    {
      id: 'policies',
      label: 'Policies',
      icon: FileText,
      component: PoliciesTab,
      description: 'Government waste policies'
    },
    {
      id: 'scan-waste',
      label: 'Scan Waste',
      icon: Scan,
      component: ScanWasteTab,
      description: 'AI-powered waste detection'
    },
    {
      id: 'uses-waste',
      label: 'Uses of Waste',
      icon: Lightbulb,
      component: UsesWasteTab,
      description: 'Creative reuse ideas'
    },
    {
      id: 'notify-municipal',
      label: 'Notify Municipal',
      icon: Bell,
      component: NotifyMunicipalTab,
      description: 'Report waste to authorities'
    },
    {
      id: 'rewards',
      label: 'Rewards',
      icon: Gift,
      component: RewardsTab,
      description: 'Earn and redeem eco-points'
    }
  ];

  return (
    <section className="py-20 bg-background" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 slide-up">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Eco Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Smart Tools for a <span className="text-primary">Greener Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive suite of tools designed to make waste management 
            smarter, easier, and more rewarding for everyone.
          </p>
        </div>

        {/* Tabbed Interface */}
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          {/* Tab Navigation - Responsive Grid */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 h-auto p-2 bg-muted/50 backdrop-blur-sm rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center space-y-2 p-4 text-xs font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-primary/10"
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:block text-center leading-tight">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Content */}
          <div className="mt-8">
            {tabs.map((tab) => {
              const Component = tab.component;
              return (
                <TabsContent 
                  key={tab.id} 
                  value={tab.id}
                  className="m-0 slide-up"
                >
                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 md:p-8 card-shadow border border-primary/10">
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <tab.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{tab.label}</h3>
                          <p className="text-sm text-muted-foreground">{tab.description}</p>
                        </div>
                      </div>
                    </div>
                    <Component />
                  </div>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedFeatures;