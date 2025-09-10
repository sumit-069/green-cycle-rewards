import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Upload, 
  Send, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Navigation,
  Building,
  Star,
  Camera
} from 'lucide-react';

const NotifyMunicipalTab = () => {
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const municipalOffices = [
    {
      id: 1,
      name: 'Downtown Municipal Waste Center',
      address: '123 Green Street, Downtown District',
      phone: '+1 (555) 123-4567',
      email: 'downtown@municipality.gov',
      distance: '0.8 km',
      rating: 4.5,
      responseTime: '2-4 hours',
      specialties: ['Hazardous Waste', 'E-Waste', 'Bulk Collection'],
      workingHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
      zone: 'Zone A'
    },
    {
      id: 2,
      name: 'Northside Sanitation Department',
      address: '456 Oak Avenue, North District',
      phone: '+1 (555) 234-5678',
      email: 'north@municipality.gov',
      distance: '2.1 km',
      rating: 4.2,
      responseTime: '4-8 hours',
      specialties: ['Organic Waste', 'Recycling', 'Street Cleaning'],
      workingHours: 'Mon-Fri: 7AM-5PM, Sat: 8AM-3PM',
      zone: 'Zone B'
    },
    {
      id: 3,
      name: 'Eastside Environmental Services',
      address: '789 Pine Road, East District',
      phone: '+1 (555) 345-6789',
      email: 'east@municipality.gov',
      distance: '3.2 km',
      rating: 4.8,
      responseTime: '1-3 hours',
      specialties: ['Emergency Response', 'Industrial Waste', 'Medical Waste'],
      workingHours: '24/7 Emergency Service',
      zone: 'Zone C'
    }
  ];

  const recentReports = [
    {
      id: 'RPT001',
      type: 'Illegal Dumping',
      location: 'Park Avenue & 5th Street',
      status: 'Resolved',
      date: '2024-03-10',
      pointsEarned: 50
    },
    {
      id: 'RPT002',
      type: 'Overflowing Bins',
      location: 'Market Square',
      status: 'In Progress',
      date: '2024-03-12',
      pointsEarned: 25
    },
    {
      id: 'RPT003',
      type: 'Hazardous Waste',
      location: 'Industrial Area B',
      status: 'Pending',
      date: '2024-03-14',
      pointsEarned: 0
    }
  ];

  const wasteCategories = [
    'Illegal Dumping',
    'Overflowing Bins',
    'Hazardous Materials',
    'Medical Waste',
    'E-Waste Accumulation',
    'Dead Animal',
    'Chemical Spill',
    'Other'
  ];

  const handleSubmitReport = () => {
    setReportSubmitted(true);
    // Award points logic would go here
    setTimeout(() => setReportSubmitted(false), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'text-success bg-success/10';
      case 'In Progress': return 'text-warning bg-warning/10';
      case 'Pending': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Location & Office Finder */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Find Nearest Municipal Office
        </h3>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input 
              placeholder="Enter your location or postal code..."
              className="h-12"
            />
          </div>
          <Button variant="eco" size="lg" className="md:w-auto">
            <Navigation className="w-4 h-4" />
            Find Offices
          </Button>
        </div>

        <div className="grid gap-4">
          {municipalOffices.map((office) => (
            <div 
              key={office.id} 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedOffice?.id === office.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted hover:border-primary/30 bg-card'
              }`}
              onClick={() => setSelectedOffice(office)}
            >
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{office.name}</h4>
                    <div className="flex items-center space-x-1 text-warning">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{office.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{office.address}</span>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                        {office.distance}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Response: {office.responseTime}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-foreground mb-2">Specialties:</h5>
                  <div className="flex flex-wrap gap-1">
                    {office.specialties.map(specialty => (
                      <span key={specialty} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col justify-center space-y-2">
                  <Button 
                    variant={selectedOffice?.id === office.id ? 'eco' : 'outline'} 
                    size="sm"
                  >
                    <Building className="w-4 h-4" />
                    Select Office
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Form */}
      {selectedOffice && (
        <div className="bg-card rounded-lg card-shadow p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Submit Waste Report to {selectedOffice.name}
          </h3>
          
          {!reportSubmitted ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Waste Category *
                    </label>
                    <select className="w-full p-3 border border-input rounded-md bg-background">
                      <option value="">Select category...</option>
                      {wasteCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location *
                    </label>
                    <Input 
                      placeholder="Enter specific location or address"
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Urgency Level
                    </label>
                    <select className="w-full p-3 border border-input rounded-md bg-background">
                      <option value="low">Low - Can wait 1-2 days</option>
                      <option value="medium">Medium - Needs attention within 24hrs</option>
                      <option value="high">High - Immediate response needed</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description *
                    </label>
                    <Textarea 
                      placeholder="Describe the waste issue in detail..."
                      className="h-32"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Upload Photos
                    </label>
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                      <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload photos of the waste issue
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  Earn up to 50 Eco Points for valid reports
                </div>
                <Button variant="eco" size="lg" onClick={handleSubmitReport}>
                  <Send className="w-4 h-4" />
                  Submit Report
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-8">
              <CheckCircle className="w-16 h-16 text-success mx-auto" />
              <h4 className="text-xl font-semibold text-success">Report Submitted Successfully!</h4>
              <p className="text-muted-foreground">
                Your report has been sent to {selectedOffice.name}. 
                Expected response time: {selectedOffice.responseTime}
              </p>
              <div className="bg-primary/10 rounded-lg p-4 inline-block">
                <p className="text-primary font-semibold">+25 Eco Points Earned!</p>
                <p className="text-sm text-muted-foreground">Report ID: RPT{Date.now().toString().slice(-3)}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Reports */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground flex items-center justify-between">
          <span>Your Recent Reports</span>
          <Button variant="ghost" size="sm">View All</Button>
        </h3>
        
        <div className="grid gap-3">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-card rounded-lg card-shadow">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-medium text-foreground">#{report.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="text-foreground">{report.type}</div>
                  <div className="text-muted-foreground flex items-center space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span>{report.location}</span>
                    <span>•</span>
                    <span>{report.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-primary">
                  {report.pointsEarned > 0 ? `+${report.pointsEarned}` : '—'}
                </div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <h4 className="font-semibold text-destructive">Emergency Waste Issues</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          For immediate hazardous waste emergencies or chemical spills, contact emergency services directly.
        </p>
        <div className="flex space-x-3">
          <Button variant="destructive" size="sm">
            <Phone className="w-4 h-4" />
            Emergency Hotline
          </Button>
          <Button variant="outline" size="sm">
            Emergency Protocol
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotifyMunicipalTab;