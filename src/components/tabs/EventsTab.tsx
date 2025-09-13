import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ExternalLink,
  Plus,
  Filter
} from 'lucide-react';

const EventsTab = () => {
  const events = [
    {
      id: 1,
      title: 'Global Earth Day Clean-Up Drive 2024',
      date: '2024-04-22',
      time: '09:00 AM',
      location: 'Central Park, New York',
      organizer: 'Green Earth Foundation',
      participants: 1250,
      maxParticipants: 2000,
      type: 'Global',
      status: 'upcoming',
      description: 'Join thousands of eco-warriors in the largest clean-up drive of the year.',
      image: '/api/placeholder/300/200',
      tags: ['Clean-up', 'Community', 'Earth Day']
    },
    {
      id: 2,
      title: 'Sustainable Living Workshop',
      date: '2024-03-15',
      time: '02:00 PM',
      location: 'EcoCenter Downtown',
      organizer: 'Local Environmental Council',
      participants: 45,
      maxParticipants: 60,
      type: 'Local',
      status: 'upcoming',
      description: 'Learn practical tips for reducing waste and living sustainably.',
      image: '/api/placeholder/300/200',
      tags: ['Workshop', 'Education', 'Zero Waste']
    },
    {
      id: 3,
      title: 'Beach Clean-Up & Marine Conservation',
      date: '2024-02-28',
      time: '07:00 AM',
      location: 'Sunset Beach',
      organizer: 'Ocean Guardians NGO',
      participants: 180,
      maxParticipants: 200,
      type: 'Local',
      status: 'completed',
      description: 'Successfully cleaned 2.5 km of coastline and collected 500kg of marine debris.',
      image: '/api/placeholder/300/200',
      tags: ['Marine', 'Clean-up', 'Conservation']
    }
  ];

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <Button variant="eco" size="sm">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Showing events for March 2024</span>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <span>Upcoming Events</span>
          <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
            {upcomingEvents.length}
          </span>
        </h3>
        
        <div className="grid gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-card rounded-lg card-shadow p-6 hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Event Image */}
                <div className="bg-muted/50 rounded-lg h-40 md:h-full flex items-center justify-center">
                  <span className="text-muted-foreground">Event Image</span>
                </div>
                
                {/* Event Details */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.type === 'Global' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {event.type}
                      </span>
                      {event.tags.map(tag => (
                        <span key={tag} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.participants}/{event.maxParticipants}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Organized by <span className="font-medium text-foreground">{event.organizer}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col justify-between space-y-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{event.participants}</div>
                    <div className="text-xs text-muted-foreground">Registered</div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="eco" className="w-full">
                      Register Now
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                  
                  <div className="text-xs text-center">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground mt-1 block">
                      {Math.round((event.participants / event.maxParticipants) * 100)}% Full
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <span>Past Events</span>
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
            {pastEvents.length}
          </span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {pastEvents.map((event) => (
            <div key={event.id} className="bg-card/50 rounded-lg border border-muted p-4 opacity-75 hover:opacity-100 transition-opacity">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-foreground">{event.title}</h5>
                  <span className="bg-success/20 text-success text-xs px-2 py-1 rounded-full">
                    Completed
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">{event.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.participants} participants</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                    View Report
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsTab;