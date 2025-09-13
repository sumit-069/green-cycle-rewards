import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Heart, 
  Share2, 
  Star, 
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const UsesWasteTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wasteIdeas, setWasteIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockWasteIdeas = [
    {
      id: 1,
      title: 'Plastic Bottle Planters',
      wasteType: 'Plastic',
      difficulty: 'Easy',
      timeRequired: '15 mins',
      materials: ['Plastic bottles', 'Soil', 'Seeds', 'Knife'],
      description: 'Transform plastic bottles into beautiful hanging planters for your herbs and small plants.',
      instructions: [
        'Clean the plastic bottle thoroughly',
        'Cut holes around the bottle for drainage',
        'Make hanging loops with wire or rope',
        'Fill with soil and plant your seeds',
        'Hang in a sunny location and water regularly'
      ],
      likes: 1250,
      difficulty_level: 1,
      image: '/api/placeholder/300/200',
      author: 'EcoMaker Sarah',
      featured: true,
      tags: ['Garden', 'Upcycle', 'Indoor Plants']
    },
    {
      id: 2,
      title: 'Cardboard Storage Organizer',
      wasteType: 'Cardboard',
      difficulty: 'Medium',
      timeRequired: '45 mins',
      materials: ['Large cardboard box', 'Smaller boxes', 'Glue', 'Fabric/paper'],
      description: 'Create a multi-compartment desk organizer using cardboard boxes and decorative materials.',
      instructions: [
        'Cut cardboard boxes to desired sizes',
        'Create compartments by arranging smaller boxes inside larger one',
        'Glue everything securely in place',
        'Cover with decorative paper or fabric',
        'Add labels for different items'
      ],
      likes: 890,
      difficulty_level: 2,
      image: '/api/placeholder/300/200',
      author: 'CraftGuru Mike',
      featured: false,
      tags: ['Organization', 'Office', 'DIY']
    },
    {
      id: 3,
      title: 'Tin Can Acoustic Speakers',
      wasteType: 'Metal',
      difficulty: 'Hard',
      timeRequired: '2 hours',
      materials: ['Large tin cans', 'Cardboard tube', 'Funnel', 'Sandpaper'],
      description: 'Build passive acoustic speakers that amplify your phone\'s sound using recycled tin cans.',
      instructions: [
        'Clean and sand the tin cans smooth',
        'Cut a phone-sized slot in the cardboard tube',
        'Attach cans to both ends of the tube',
        'Create a funnel shape inside each can',
        'Test and adjust for optimal sound quality'
      ],
      likes: 567,
      difficulty_level: 3,
      image: '/api/placeholder/300/200',
      author: 'TechUpcycle Pro',
      featured: false,
      tags: ['Technology', 'Audio', 'Advanced']
    },
    {
      id: 4,
      title: 'Glass Jar Lanterns',
      wasteType: 'Glass',
      difficulty: 'Easy',
      timeRequired: '20 mins',
      materials: ['Glass jars', 'Wire', 'LED tea lights', 'Decorative stones'],
      description: 'Create magical outdoor lanterns using glass jars and simple LED lights.',
      instructions: [
        'Clean glass jars thoroughly',
        'Wrap wire around the jar rim for hanging',
        'Add decorative stones to the bottom',
        'Place LED tea lights inside',
        'Hang in garden or patio area'
      ],
      likes: 1876,
      difficulty_level: 1,
      image: '/api/placeholder/300/200',
      author: 'GardenLights Emma',
      featured: true,
      tags: ['Lighting', 'Garden', 'Decoration']
    },
    {
      id: 5,
      title: 'Newspaper Seed Pots',
      wasteType: 'Paper',
      difficulty: 'Easy',
      timeRequired: '10 mins',
      materials: ['Old newspapers', 'Ruler', 'Small cup or mold'],
      description: 'Make biodegradable seed starting pots from old newspapers that can be planted directly in soil.',
      instructions: [
        'Cut newspaper into rectangular strips',
        'Wrap strips around a small cup mold',
        'Fold bottom edges to create base',
        'Remove from mold and fill with soil',
        'Plant seeds and transplant entire pot when ready'
      ],
      likes: 745,
      difficulty_level: 1,
      image: '/api/placeholder/300/200',
      author: 'SeedStarter Jo',
      featured: false,
      tags: ['Gardening', 'Biodegradable', 'Seeds']
    }
  ];

  const categories = ['All', 'Plastic', 'Cardboard', 'Metal', 'Glass', 'Paper', 'Organic'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const fetchWasteIdeas = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-waste-ideas', {
        body: { 
          wasteType: selectedCategory === 'All' ? null : selectedCategory,
          difficulty: 'all',
          category: searchQuery || 'general'
        }
      });

      if (error) {
        console.error('Error fetching waste ideas:', error);
        toast.error('Failed to load ideas. Using sample ideas.');
        setWasteIdeas(mockWasteIdeas);
      } else {
        setWasteIdeas(data.ideas || mockWasteIdeas);
        toast.success('Ideas loaded successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load ideas. Using sample ideas.');
      setWasteIdeas(mockWasteIdeas);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWasteIdeas();
  }, []);

  const handleSearch = () => {
    fetchWasteIdeas();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Hard': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const filteredIdeas = selectedCategory === 'All' 
    ? wasteIdeas 
    : wasteIdeas.filter(idea => idea.wasteType === selectedCategory);

  const featuredIdeas = filteredIdeas.filter(idea => idea.featured);
  const regularIdeas = filteredIdeas.filter(idea => !idea.featured);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search reuse ideas, materials, or techniques..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button variant="eco" size="sm" onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4" />
            Submit Idea
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Materials:</span>
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? 'eco' : 'outline'}
              size="sm"
              className="text-xs"
              onClick={() => {
                setSelectedCategory(category);
                fetchWasteIdeas();
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Ideas */}
      {featuredIdeas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Star className="w-5 h-5 text-warning" />
            <span>Featured Ideas</span>
          </h3>
          
          <div className="grid gap-6">
            {featuredIdeas.map((idea) => (
              <div key={idea.id} className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-muted/50 rounded-lg h-48 flex items-center justify-center">
                    <span className="text-muted-foreground">Project Image</span>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                          Featured
                        </span>
                        <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                          {idea.wasteType}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(idea.difficulty)}`}>
                          {idea.difficulty}
                        </span>
                        {idea.tags.map(tag => (
                          <span key={tag} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h4 className="text-2xl font-bold text-foreground">{idea.title}</h4>
                      <p className="text-muted-foreground">{idea.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{idea.timeRequired}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{idea.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-muted-foreground" />
                        <span>{idea.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4 text-muted-foreground" />
                        <span>{idea.materials.length} materials</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="space-x-2">
                        <Button variant="eco">View Instructions</Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Ideas Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          All Ideas ({regularIdeas.length})
        </h3>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading ideas...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularIdeas.map((idea) => (
            <div key={idea.id} className="bg-card rounded-lg card-shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-muted/50 h-40 flex items-center justify-center">
                <span className="text-muted-foreground">Project Image</span>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {idea.wasteType}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(idea.difficulty)}`}>
                      {idea.difficulty}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                    {idea.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {idea.description}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{idea.timeRequired}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{idea.likes}</span>
                    </div>
                  </div>
                  <div className="text-xs">By {idea.author}</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button variant="eco" size="sm">View Guide</Button>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" onClick={fetchWasteIdeas} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Load More Ideas
        </Button>
      </div>

      {/* Submit Your Own Idea */}
      <div className="bg-primary/5 rounded-lg p-6 text-center border border-primary/20">
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Have a Creative Reuse Idea?
        </h4>
        <p className="text-muted-foreground mb-4">
          Share your innovative waste reuse projects with our community and inspire others to create sustainably.
        </p>
        <Button variant="eco">
          <Plus className="w-4 h-4" />
          Submit Your Idea
        </Button>
      </div>
    </div>
  );
};

export default UsesWasteTab;