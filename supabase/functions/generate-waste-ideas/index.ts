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

    const { wasteType, difficulty, category } = await req.json();

    console.log('Generating waste reuse ideas for:', wasteType, difficulty, category);

    // Generate waste reuse ideas using OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `You are a creative upcycling expert. Generate 8 innovative waste reuse ideas with detailed instructions. Return them as a JSON array with the following structure:
            {
              "ideas": [
                {
                  "id": "unique_id",
                  "title": "Creative Project Title",
                  "wasteType": "material type",
                  "difficulty": "Easy|Medium|Hard",
                  "timeRequired": "time estimate",
                  "materials": ["material1", "material2"],
                  "description": "Project description",
                  "instructions": ["step1", "step2", "step3"],
                  "tips": ["tip1", "tip2"],
                  "safetyNote": "safety considerations",
                  "environmentalImpact": "positive impact description",
                  "costSaving": "estimated cost saving",
                  "difficulty_level": 1-3,
                  "featured": boolean,
                  "tags": ["tag1", "tag2"],
                  "estimatedCost": "cost estimate"
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Generate creative reuse ideas for waste type: ${wasteType || 'mixed materials'}. Difficulty level: ${difficulty || 'all levels'}. Category: ${category || 'general'}. Focus on practical, achievable projects with clear environmental benefits.`
          }
        ],
        temperature: 0.8,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const ideasData = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify(ideasData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error generating waste ideas:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate waste ideas',
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