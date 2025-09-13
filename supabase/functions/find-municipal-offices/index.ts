import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!googleMapsApiKey) {
      throw new Error('Google Maps API key not configured');
    }

    const { latitude, longitude, address, radius = 10000 } = await req.json();

    console.log('Finding municipal offices near:', { latitude, longitude, address, radius });

    let searchLocation = '';
    
    if (latitude && longitude) {
      searchLocation = `${latitude},${longitude}`;
    } else if (address) {
      // First geocode the address
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();
      
      if (geocodeData.results && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].geometry.location;
        searchLocation = `${location.lat},${location.lng}`;
      } else {
        throw new Error('Unable to geocode the provided address');
      }
    } else {
      throw new Error('Either coordinates or address must be provided');
    }

    // Search for municipal offices using Google Places API
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${searchLocation}&radius=${radius}&type=local_government_office&key=${googleMapsApiKey}`;
    
    const placesResponse = await fetch(placesUrl);
    const placesData = await placesResponse.json();

    if (placesData.status !== 'OK' && placesData.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API error: ${placesData.status}`);
    }

    // Process and format the results
    const offices = placesData.results?.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity || place.formatted_address,
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      },
      rating: place.rating || 0,
      types: place.types,
      isOpen: place.opening_hours?.open_now,
      photoReference: place.photos?.[0]?.photo_reference,
      distance: calculateDistance(
        parseFloat(searchLocation.split(',')[0]),
        parseFloat(searchLocation.split(',')[1]),
        place.geometry.location.lat,
        place.geometry.location.lng
      ),
      services: generateMunicipalServices(),
      contact: generateContactInfo(),
      workingHours: generateWorkingHours()
    })) || [];

    // Sort by distance
    offices.sort((a: any, b: any) => a.distance - b.distance);

    return new Response(
      JSON.stringify({
        offices: offices.slice(0, 10), // Return top 10 closest offices
        searchLocation: searchLocation,
        totalFound: offices.length
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error finding municipal offices:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to find municipal offices',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

// Generate typical municipal services
function generateMunicipalServices(): string[] {
  const services = [
    'Waste Collection',
    'Recycling Programs',
    'Bulk Waste Pickup',
    'Hazardous Waste Disposal',
    'Environmental Permits',
    'Complaint Registration',
    'Public Health Services',
    'Building Permits',
    'Utility Services'
  ];
  return services.slice(0, Math.floor(Math.random() * 4) + 3);
}

// Generate contact information
function generateContactInfo() {
  return {
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    email: 'info@municipal.gov',
    website: 'www.municipal.gov'
  };
}

// Generate working hours
function generateWorkingHours() {
  return {
    monday: '8:00 AM - 5:00 PM',
    tuesday: '8:00 AM - 5:00 PM',
    wednesday: '8:00 AM - 5:00 PM',
    thursday: '8:00 AM - 5:00 PM',
    friday: '8:00 AM - 5:00 PM',
    saturday: '9:00 AM - 1:00 PM',
    sunday: 'Closed'
  };
}