import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, User, Heart } from 'lucide-react';

const ArticlesTab = () => {
  const articles = [
    {
      id: 1,
      title: 'The Ultimate Guide to Zero Waste Living',
      excerpt: 'Discover practical tips and strategies to minimize waste in your daily life and create a more sustainable lifestyle.',
      author: 'Dr. Sarah Green',
      readTime: '8 min read',
      likes: 234,
      image: '/api/placeholder/400/200',
      category: 'Lifestyle',
      featured: true
    },
    {
      id: 2,
      title: 'Plastic Pollution: Understanding the Crisis',
      excerpt: 'An in-depth look at the global plastic pollution problem and actionable solutions for individuals and communities.',
      author: 'Prof. Michael Chen',
      readTime: '12 min read',
      likes: 189,
      image: '/api/placeholder/400/200',
      category: 'Environment'
    },
    {
      id: 3,
      title: 'Composting 101: Turn Waste into Gold',
      excerpt: 'Learn how to transform your organic waste into nutrient-rich compost for your garden and reduce landfill burden.',
      author: 'Emma Rodriguez',
      readTime: '6 min read',
      likes: 156,
      image: '/api/placeholder/400/200',
      category: 'Gardening'
    },
    {
      id: 4,
      title: 'E-Waste Recycling: What You Need to Know',
      excerpt: 'Understand the importance of proper electronic waste disposal and find certified recycling centers near you.',
      author: 'Tech Green Initiative',
      readTime: '10 min read',
      likes: 203,
      image: '/api/placeholder/400/200',
      category: 'Technology'
    }
  ];

  const categories = ['All', 'Lifestyle', 'Environment', 'Gardening', 'Technology', 'Policy'];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
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

      {/* Featured Article */}
      {articles.filter(article => article.featured).map((article) => (
        <div key={article.id} className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold text-foreground hover:text-primary cursor-pointer transition-colors">
                {article.title}
              </h3>
              <p className="text-muted-foreground">{article.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{article.likes}</span>
                  </div>
                </div>
                
                <Button variant="eco" size="sm">
                  <ExternalLink className="w-4 h-4" />
                  Read Article
                </Button>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg h-48 flex items-center justify-center">
              <span className="text-muted-foreground">Article Image</span>
            </div>
          </div>
        </div>
      ))}

      {/* Regular Articles Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {articles.filter(article => !article.featured).map((article) => (
          <div key={article.id} className="bg-card rounded-lg card-shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-muted/50 h-40 flex items-center justify-center">
              <span className="text-muted-foreground">Article Image</span>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              
              <h4 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                {article.title}
              </h4>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{article.likes}</span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default ArticlesTab;