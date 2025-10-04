import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const googleApiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!googleApiKey) {
      console.error('Google AI API key not found');
      return new Response(
        JSON.stringify({ error: 'Google AI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { wasteType, difficulty, category } = await req.json();

    console.log('Generating waste reuse ideas for:', wasteType, difficulty, category);

    const prompt = `Generate 5 creative and practical DIY ideas for reusing ${wasteType || 'various types of'} waste materials. 
    ${difficulty ? `Focus on ${difficulty} difficulty level projects.` : ''}
    ${category && category !== 'general' ? `Related to: ${category}` : ''}
    
    For each idea, provide:
    1. A catchy title
    2. The specific waste type used (Plastic, Cardboard, Metal, Glass, Paper, or Organic)
    3. Difficulty level (Easy, Medium, or Hard)
    4. Time required (e.g., "15 mins", "1 hour")
    5. Brief description (1-2 sentences)
    6. List of materials needed (3-5 items)
    7. Step-by-step instructions (3-5 steps)
    8. 2-3 relevant tags

    Format each idea as a JSON object with these exact fields:
    {
      "title": "string",
      "wasteType": "string",
      "difficulty": "string",
      "timeRequired": "string",
      "description": "string",
      "materials": ["string"],
      "instructions": ["string"],
      "tags": ["string"],
      "likes": number (random between 100-2000),
      "difficulty_level": number (1 for Easy, 2 for Medium, 3 for Hard),
      "author": "string (creative eco-themed username)",
      "featured": boolean (make 1-2 featured)
    }

    Return ONLY a valid JSON array of 5 ideas, no additional text.`;

    // Use Google Gemini 2.0 Flash for fast, cost-effective idea generation
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${googleApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 4096
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Gemini API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate ideas' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected API response format:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let generatedText = data.candidates[0].content.parts[0].text.trim();
    
    // Clean up the response - remove markdown code blocks if present
    generatedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let ideas;
    try {
      ideas = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', generatedText);
      console.error('Parse error:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse generated ideas' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Ensure we have an array
    if (!Array.isArray(ideas)) {
      ideas = [ideas];
    }

    // Add IDs to each idea
    ideas = ideas.map((idea, index) => ({
      id: Date.now() + index,
      ...idea
    }));

    console.log('Successfully generated', ideas.length, 'ideas');

    return new Response(
      JSON.stringify({ ideas }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in generate-waste-ideas function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});