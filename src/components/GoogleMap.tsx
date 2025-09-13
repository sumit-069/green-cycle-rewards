import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Phone, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MunicipalOffice {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  distance: number;
  services: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  workingHours: {
    [key: string]: string;
  };
}

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [offices, setOffices] = useState<MunicipalOffice[]>([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<MunicipalOffice | null>(null);

  const GOOGLE_MAPS_API_KEY = 'AIzaSyCALZ3gDA1ATpgzsV_qxc0o6TYjy-H1I3A';

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = async () => {
    try {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      const google = await loader.load();
      
      if (!mapRef.current) return;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });

      setMap(mapInstance);

      // Try to get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            mapInstance.setCenter(userLocation);
            
            // Add user location marker
            new google.maps.Marker({
              position: userLocation,
              map: mapInstance,
              title: 'Your Location',
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }
            });

            // Search for nearby offices
            searchNearbyOffices(userLocation.lat, userLocation.lng);
          },
          () => {
            toast.error('Unable to get your location. Please search manually.');
          }
        );
      }
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      toast.error('Failed to load Google Maps');
    }
  };

  const searchNearbyOffices = async (lat?: number, lng?: number, address?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('find-municipal-offices', {
        body: {
          latitude: lat,
          longitude: lng,
          address: address,
          radius: 15000 // 15km radius
        }
      });

      if (error) {
        console.error('Error finding offices:', error);
        toast.error('Failed to find municipal offices');
        return;
      }

      setOffices(data.offices || []);
      
      if (map && data.offices?.length > 0) {
        // Clear existing markers (except user location)
        // Add markers for each office
        data.offices.forEach((office: MunicipalOffice, index: number) => {
          const marker = new google.maps.Marker({
            position: office.location,
            map: map,
            title: office.name,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; max-width: 250px;">
                <h3 style="margin: 0 0 8px 0; color: #333;">${office.name}</h3>
                <p style="margin: 0 0 5px 0; font-size: 14px;">${office.address}</p>
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">Distance: ${office.distance.toFixed(1)} km</p>
                <p style="margin: 0; font-size: 12px; color: #666;">Rating: ${office.rating || 'N/A'}/5</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
            setSelectedOffice(office);
          });
        });

        toast.success(`Found ${data.offices.length} municipal offices nearby`);
      } else {
        toast.warning('No municipal offices found in your area');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to search for offices');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSearch = () => {
    if (!searchAddress.trim()) {
      toast.error('Please enter an address to search');
      return;
    }
    searchNearbyOffices(undefined, undefined, searchAddress);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Find Municipal Offices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter your address or location..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
              className="flex-1"
            />
            <Button onClick={handleAddressSearch} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Map */}
        <Card>
          <CardContent className="p-0">
            <div
              ref={mapRef}
              className="w-full h-96 rounded-lg"
              style={{ minHeight: '400px' }}
            />
          </CardContent>
        </Card>

        {/* Office List */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby Municipal Offices ({offices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Searching...</span>
                </div>
              ) : offices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No offices found. Try searching a different location.</p>
                </div>
              ) : (
                offices.map((office) => (
                  <div
                    key={office.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOffice?.id === office.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedOffice(office)}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-foreground">{office.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {office.distance.toFixed(1)} km
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {office.address}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {office.contact.phone}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {office.workingHours.monday}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {office.services.slice(0, 3).map((service, index) => (
                          <span
                            key={index}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {service}
                          </span>
                        ))}
                        {office.services.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{office.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Office Details */}
      {selectedOffice && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedOffice.name} - Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedOffice.address}
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedOffice.contact.phone}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Services Available</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOffice.services.map((service, index) => (
                      <span
                        key={index}
                        className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Working Hours</h4>
                <div className="space-y-1 text-sm">
                  {Object.entries(selectedOffice.workingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize font-medium">{day}:</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleMap;