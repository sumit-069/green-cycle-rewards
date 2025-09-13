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
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { location, type } = await req.json();

    console.log('Fetching events for location:', location, 'type:', type);

    // Generate events using OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an environmental event coordinator. Generate 8 realistic environmental events with detailed information. Return them as a JSON array with the following structure:
            {
              "events": [
                {
                  "id": "unique_id",
                  "title": "Event Title",
                  "description": "Event description",
                  "date": "YYYY-MM-DD",
                  "time": "HH:MM",
                  "location": "Event location",
                  "organizer": "Organizer name",
                  "participants": number,
                  "maxParticipants": number,
                  "status": "upcoming" or "past",
                  "tags": ["tag1", "tag2"],
                  "type": "cleanup" or "workshop" or "awareness" or "tree-planting",
                  "ecoPoints": number,
                  "requirements": ["requirement1", "requirement2"]
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Generate environmental events for location: ${location || 'local community'}. Event type preference: ${type || 'all types'}. Include a mix of upcoming and past events with realistic dates.`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const eventsData = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify(eventsData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error fetching events:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch events',
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