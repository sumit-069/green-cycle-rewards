import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  ExternalLink, 
  Download, 
  Calendar,
  Building,
  Search,
  Filter,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const PoliciesTab = () => {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: 'Plastic Waste Management Rules 2024',
      authority: 'Ministry of Environment',
      country: 'India',
      datePublished: '2024-01-15',
      category: 'Plastic Waste',
      status: 'Active',
      summary: 'Comprehensive guidelines for plastic waste collection, segregation, and recycling across urban and rural areas.',
      keyPoints: [
        'Mandatory segregation at source',
        'Extended Producer Responsibility (EPR)',
        'Ban on single-use plastics',
        'Recycling targets for manufacturers'
      ],
      document: 'plastic-waste-rules-2024.pdf',
      views: 15420,
      image: undefined
    },
    {
      id: 2,
      title: 'EU Circular Economy Action Plan',
      authority: 'European Commission',
      country: 'European Union',
      datePublished: '2024-02-10',
      category: 'Circular Economy',
      status: 'Active',
      summary: 'Strategic framework to accelerate the transition towards a circular economy model across EU member states.',
      keyPoints: [
        'Sustainable product design requirements',
        'Right to repair legislation',
        'Waste prevention targets',
        'Green public procurement rules'
      ],
      document: 'eu-circular-economy-2024.pdf',
      views: 22150,
      image: undefined
    },
    {
      id: 3,
      title: 'E-Waste Management Guidelines',
      authority: 'EPA',
      country: 'United States',
      datePublished: '2023-11-20',
      category: 'E-Waste',
      status: 'Active',
      summary: 'Federal guidelines for proper disposal and recycling of electronic waste to prevent environmental contamination.',
      keyPoints: [
        'Certified e-waste recyclers only',
        'Data security requirements',
        'Corporate responsibility programs',
        'Consumer education initiatives'
      ],
      document: 'epa-ewaste-guidelines.pdf',
      views: 8930,
      image: undefined
    },
    {
      id: 4,
      title: 'Municipal Solid Waste Strategy 2030',
      authority: 'Department of Environment',
      country: 'Canada',
      datePublished: '2023-09-05',
      category: 'Municipal Waste',
      status: 'Under Review',
      summary: 'Long-term strategy to achieve zero waste to landfill by 2030 through enhanced recycling and composting programs.',
      keyPoints: [
        'Organics diversion mandate',
        'Pay-as-you-throw systems',
        'Industrial composting facilities',
        'Waste reduction education'
      ],
      document: 'canada-msw-strategy-2030.pdf',
      views: 6750,
      image: undefined
    }
  ]);

  const [loading, setLoading] = useState(false);
  const categories = ['All', 'Plastic Waste', 'Circular Economy', 'E-Waste', 'Municipal Waste', 'Hazardous Waste'];
  const countries = ['All', 'India', 'United States', 'European Union', 'Canada', 'Australia'];

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-policies', {
        body: { limit: 10 }
      });
      
      if (error) throw error;
      
      if (data?.policies) {
        setPolicies(prev => [...prev, ...data.policies]);
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search policies, regulations, and guidelines..." 
              className="pl-10"
            />
          </div>
          <Button variant="eco" size="sm">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Categories:</span>
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'eco' : 'outline'}
              size="sm"
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Region:</span>
          {countries.map((country) => (
            <Button
              key={country}
              variant={country === 'All' ? 'eco' : 'outline'}
              size="sm"
              className="text-xs"
            >
              {country}
            </Button>
          ))}
        </div>
      </div>

      {/* Policy Cards */}
      <div className="grid gap-6">
        {policies.map((policy) => (
          <div key={policy.id} className="bg-card rounded-lg card-shadow p-6 hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="md:col-span-3 space-y-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      policy.status === 'Active' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {policy.status}
                    </span>
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                      {policy.category}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-foreground mb-2">{policy.title}</h4>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{policy.authority}, {policy.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(policy.datePublished).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{policy.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{policy.summary}</p>
                </div>
                
                {/* Key Points */}
                <div>
                  <h5 className="font-medium text-foreground mb-2">Key Provisions:</h5>
                  <ul className="space-y-1">
                    {policy.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                {policy.image ? (
                  <div className="rounded-lg overflow-hidden h-40">
                    <img 
                      src={policy.image} 
                      alt={policy.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <FileText className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Official Document</p>
                    <p className="text-xs text-muted-foreground">{policy.document}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Button variant="eco" className="w-full">
                    <ExternalLink className="w-4 h-4" />
                    View Full Policy
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    Share Policy
                  </Button>
                </div>
                
                {/* Policy Rating/Impact */}
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-primary">8.5/10</div>
                  <div className="text-xs text-muted-foreground">Implementation Score</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" onClick={fetchPolicies} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Load More Policies
        </Button>
      </div>

      {/* Policy Submission */}
      <div className="bg-primary/5 rounded-lg p-6 text-center border border-primary/20">
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Know of a New Policy?
        </h4>
        <p className="text-muted-foreground mb-4">
          Help us keep our policy database up-to-date by submitting new waste management policies and regulations.
        </p>
        <Button variant="eco">
          Submit Policy
        </Button>
      </div>
    </div>
  );
};

export default PoliciesTab;