import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Gift, 
  Coins, 
  Trophy, 
  Star, 
  Leaf, 
  ShoppingCart,
  TreePine,
  Recycle,
  Award,
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';

const RewardsTab = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const userStats = {
    totalPoints: 1250,
    pointsThisMonth: 350,
    rank: 'Eco Warrior',
    level: 12,
    nextLevelPoints: 1500,
    wasteScanned: 45,
    reportsSubmitted: 8,
    eventsAttended: 3
  };

  const rewards = [
    {
      id: 1,
      name: 'Plant a Tree Certificate',
      category: 'Environmental',
      points: 500,
      description: 'Plant a tree in your name through our partner NGO and receive a digital certificate.',
      image: '/api/placeholder/200/150',
      availability: 'Available',
      timeLimit: null,
      popularity: 95,
      impactDescription: '1 tree planted = 22kg CO₂ absorbed annually'
    },
    {
      id: 2,
      name: '20% Off Eco-Products',
      category: 'Shopping',
      points: 200,
      description: 'Get 20% discount on sustainable products from partner eco-stores.',
      image: '/api/placeholder/200/150',
      availability: 'Limited',
      timeLimit: '3 days left',
      popularity: 78,
      impactDescription: 'Support sustainable businesses'
    },
    {
      id: 3,
      name: 'Free Composting Workshop',
      category: 'Education',
      points: 300,
      description: 'Attend a free composting workshop and learn to create nutrient-rich soil.',
      image: '/api/placeholder/200/150',
      availability: 'Available',
      timeLimit: null,
      popularity: 67,
      impactDescription: 'Learn to reduce organic waste by 60%'
    },
    {
      id: 4,
      name: 'Reusable Water Bottle',
      category: 'Products',
      points: 150,
      description: 'High-quality stainless steel water bottle made from recycled materials.',
      image: '/api/placeholder/200/150',
      availability: 'Available',
      timeLimit: null,
      popularity: 89,
      impactDescription: 'Replace 1000+ single-use plastic bottles'
    },
    {
      id: 5,
      name: 'Carbon Offset Credits',
      category: 'Environmental',
      points: 800,
      description: 'Offset 1 ton of CO₂ through verified environmental projects.',
      image: '/api/placeholder/200/150',
      availability: 'Available',
      timeLimit: null,
      popularity: 72,
      impactDescription: '1 ton CO₂ offset = average person\'s monthly footprint'
    },
    {
      id: 6,
      name: 'Eco-Friendly Starter Kit',
      category: 'Products',
      points: 400,
      description: 'Complete kit with bamboo utensils, reusable bags, and eco-cleaning supplies.',
      image: '/api/placeholder/200/150',
      availability: 'Limited',
      timeLimit: '1 week left',
      popularity: 84,
      impactDescription: 'Reduce plastic waste by 80% in daily life'
    }
  ];

  const recentActivity = [
    { action: 'Scanned plastic bottle', points: 10, date: '2 hours ago' },
    { action: 'Reported overflowing bin', points: 25, date: '1 day ago' },
    { action: 'Attended clean-up event', points: 100, date: '3 days ago' },
    { action: 'Shared reuse idea', points: 15, date: '5 days ago' }
  ];

  const achievements = [
    { title: 'First Scan', icon: Recycle, earned: true, description: 'Completed your first waste scan' },
    { title: 'Community Hero', icon: Award, earned: true, description: 'Submitted 5 municipal reports' },
    { title: 'Green Thumb', icon: TreePine, earned: false, description: 'Plant 3 trees through our program' },
    { title: 'Eco Influencer', icon: Star, earned: false, description: 'Share 10 reuse ideas' }
  ];

  const categories = ['All', 'Environmental', 'Shopping', 'Education', 'Products'];

  const filteredRewards = selectedCategory === 'All' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'text-success bg-success/10';
      case 'Limited': return 'text-warning bg-warning/10';
      case 'Sold Out': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Stats Dashboard */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Points Balance */}
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Coins className="w-10 h-10 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary">{userStats.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Eco Points</div>
            <div className="text-xs text-success mt-1">+{userStats.pointsThisMonth} this month</div>
          </div>
          
          {/* Level & Rank */}
          <div className="text-center">
            <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-10 h-10 text-warning" />
            </div>
            <div className="text-xl font-bold text-foreground">{userStats.rank}</div>
            <div className="text-sm text-muted-foreground">Level {userStats.level}</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all"
                style={{ width: `${(userStats.totalPoints / userStats.nextLevelPoints) * 100}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {userStats.nextLevelPoints - userStats.totalPoints} points to next level
            </div>
          </div>
          
          {/* Activity Stats */}
          <div className="text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-10 h-10 text-success" />
            </div>
            <div className="space-y-1 text-sm">
              <div><span className="font-semibold">{userStats.wasteScanned}</span> scans</div>
              <div><span className="font-semibold">{userStats.reportsSubmitted}</span> reports</div>
              <div><span className="font-semibold">{userStats.eventsAttended}</span> events</div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Recent Activity</h4>
            <div className="space-y-2">
              {recentActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{activity.action}</span>
                  <span className="text-primary font-medium">+{activity.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 text-center ${
                  achievement.earned 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-muted bg-muted/5 text-muted-foreground'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="font-medium text-sm">{achievement.title}</div>
                <div className="text-xs mt-1 opacity-75">{achievement.description}</div>
                {achievement.earned && (
                  <div className="text-xs text-success mt-2 font-medium">✓ Earned</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewards Marketplace */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Rewards Marketplace</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Coins className="w-4 h-4" />
            <span>Balance: {userPoints} points</span>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? 'eco' : 'outline'}
              size="sm"
              className="text-xs"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <div key={reward.id} className="bg-card rounded-lg card-shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-muted/50 h-40 flex items-center justify-center">
                <span className="text-muted-foreground">Reward Image</span>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(reward.availability)}`}>
                      {reward.availability}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-current text-warning" />
                      <span>{reward.popularity}%</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-foreground">{reward.name}</h4>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Environmental Impact:</div>
                  <div className="text-sm font-medium text-primary">{reward.impactDescription}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-primary" />
                    <span className="text-xl font-bold text-primary">{reward.points}</span>
                  </div>
                  
                  {reward.timeLimit && (
                    <div className="text-xs text-warning flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{reward.timeLimit}</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant={userPoints >= reward.points ? 'eco' : 'outline'} 
                  className="w-full"
                  disabled={userPoints < reward.points || reward.availability === 'Sold Out'}
                >
                  {userPoints >= reward.points ? (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Redeem Now
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" />
                      Need {reward.points - userPoints} more
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earn More Points */}
      <div className="bg-primary/5 rounded-lg p-6 text-center border border-primary/20">
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Want to Earn More Points?
        </h4>
        <p className="text-muted-foreground mb-4">
          Engage with our platform to earn eco-points and unlock amazing rewards that benefit both you and the environment.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Recycle className="w-6 h-6 text-primary" />
            </div>
            <div className="font-medium">Scan Waste</div>
            <div className="text-sm text-muted-foreground">5-20 points per scan</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div className="font-medium">Report Issues</div>
            <div className="text-sm text-muted-foreground">25-50 points per report</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className="font-medium">Join Events</div>
            <div className="text-sm text-muted-foreground">50-200 points per event</div>
          </div>
        </div>
        <Button variant="eco">
          <TrendingUp className="w-4 h-4" />
          Start Earning Points
        </Button>
      </div>
    </div>
  );
};

export default RewardsTab;