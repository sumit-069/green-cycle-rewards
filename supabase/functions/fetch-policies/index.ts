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

    const { query, country, category } = await req.json();

    console.log('Fetching policies with query:', query, 'country:', country, 'category:', category);

    // Generate policies using OpenAI
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
            content: `You are an environmental policy expert. Generate 10 realistic environmental policies with detailed information. Return them as a JSON array with the following structure:
            {
              "policies": [
                {
                  "id": "unique_id",
                  "title": "Policy Title",
                  "authority": "Government/Organization name",
                  "country": "Country name",
                  "date": "YYYY-MM-DD",
                  "status": "active" or "proposed" or "expired",
                  "category": "waste management" or "recycling" or "pollution control" or "renewable energy",
                  "summary": "Brief policy summary",
                  "keyPoints": ["point1", "point2", "point3"],
                  "fullText": "Complete policy description with implementation details",
                  "impact": "Expected environmental impact",
                  "compliance": "Compliance requirements"
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Generate environmental policies about: ${query || 'waste management and environmental protection'}. Country: ${country || 'various countries'}. Category: ${category || 'all categories'}. Make them realistic and detailed.`
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
    const policiesData = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify(policiesData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error fetching policies:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch policies',
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