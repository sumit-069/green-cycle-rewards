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
    const geminiApiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Google AI API key not configured');
    }

    const { query, country, category } = await req.json();

    console.log('Fetching policies with query:', query, 'country:', country, 'category:', category);

    // Generate policies using Google Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an environmental policy expert. Generate 10 realistic environmental policies with detailed information about: ${query || 'waste management and environmental protection'}. Country: ${country || 'various countries'}. Category: ${category || 'all categories'}. Make them realistic and detailed.

Return ONLY a valid JSON object (no markdown formatting) with the following structure:
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
      "summary": "Brief policy summary (100-150 words)",
      "keyPoints": ["point1", "point2", "point3", "point4"],
      "fullText": "Complete policy description with implementation details (300+ words)",
      "impact": "Expected environmental impact",
      "compliance": "Compliance requirements",
      "document": "policy-document-name.pdf",
      "views": number,
      "image": "https://images.unsplash.com/photo-relevant-policy-image-id?w=800&h=400&fit=crop"
    }
  ]
}

Use real Unsplash image URLs that match each policy's topic. Make the policies comprehensive with real-world relevance.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    // Remove markdown code blocks if present
    const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const policiesData = JSON.parse(cleanedContent);

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