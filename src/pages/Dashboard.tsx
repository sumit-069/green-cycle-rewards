import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, 
  Coins, 
  Trophy, 
  Calendar, 
  MapPin, 
  Camera,
  FileText,
  Bell,
  Gift,
  BarChart3,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const userStats = {
    ecoPoints: 1250,
    articlesRead: 23,
    eventsAttended: 5,
    wasteScanned: 15,
    reportsSubmitted: 8,
    rewardsEarned: 3
  };

  const recentActivities = [
    { id: 1, type: 'scan', title: 'Scanned plastic bottle', points: 10, date: '2 hours ago' },
    { id: 2, type: 'article', title: 'Read: "Recycling Best Practices"', points: 5, date: '1 day ago' },
    { id: 3, type: 'event', title: 'Attended cleanup drive', points: 50, date: '3 days ago' },
    { id: 4, type: 'report', title: 'Reported illegal dumping', points: 25, date: '1 week ago' }
  ];

  const achievements = [
    { id: 1, title: 'Eco Warrior', description: 'Earned 1000+ eco points', icon: Trophy, earned: true },
    { id: 2, title: 'Scanner Pro', description: 'Scanned 10+ waste items', icon: Camera, earned: true },
    { id: 3, title: 'Knowledge Seeker', description: 'Read 20+ articles', icon: FileText, earned: true },
    { id: 4, title: 'Community Hero', description: 'Submit 5+ municipal reports', icon: Bell, earned: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back to GREENOVANT!</p>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
              <Coins className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userStats.ecoPoints}</div>
              <p className="text-xs text-muted-foreground">+50 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles Read</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.articlesRead}</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.eventsAttended}</div>
              <p className="text-xs text-muted-foreground">Next event in 3 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waste Scanned</CardTitle>
              <Camera className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.wasteScanned}</div>
              <p className="text-xs text-muted-foreground">+2 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Your latest eco-friendly actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      +{activity.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>Your environmental milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className={`p-2 rounded-full ${achievement.earned ? 'bg-primary/10' : 'bg-muted'}`}>
                      <achievement.icon className={`w-4 h-4 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge variant="default" className="text-xs">
                        Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Towards Next Level */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="w-5 h-5" />
              <span>Level Progress</span>
            </CardTitle>
            <CardDescription>Keep earning points to reach the next level!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Level: Eco Enthusiast</span>
                <span className="text-sm text-muted-foreground">1250 / 2000 points</span>
              </div>
              <Progress value={62.5} className="h-3" />
              <p className="text-sm text-muted-foreground">
                750 more points needed to reach <strong>Eco Champion</strong> level
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            className="h-16 flex flex-col items-center justify-center space-y-2"
            onClick={() => navigate('/?tab=scan-waste')}
          >
            <Camera className="w-5 h-5" />
            <span className="text-sm">Scan Waste</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center space-y-2"
            onClick={() => navigate('/?tab=articles')}
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm">Read Articles</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center space-y-2"
            onClick={() => navigate('/?tab=notify-municipal')}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-sm">Report Issue</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center space-y-2"
            onClick={() => navigate('/?tab=rewards')}
          >
            <Gift className="w-5 h-5" />
            <span className="text-sm">Claim Rewards</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;