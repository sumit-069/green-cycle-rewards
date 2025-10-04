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

    const { query, category } = await req.json();

    console.log('Fetching articles with query:', query, 'category:', category);

    // Generate articles using Google Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an environmental expert. Generate 6 realistic environmental articles with detailed information about: ${query || 'sustainable waste management and eco-friendly practices'}. Category focus: ${category || 'general'}. Make them practical and actionable.

Return ONLY a valid JSON object (no markdown formatting) with the following structure:
{
  "articles": [
    {
      "id": "unique_id",
      "title": "Article Title",
      "excerpt": "Brief excerpt (100-150 words)",
      "author": "Author Name",
      "readTime": "X min read",
      "likes": number,
      "category": "category_name",
      "featured": boolean,
      "publishedDate": "YYYY-MM-DD",
      "content": "Full article content (500+ words with practical tips)",
      "image": "https://images.unsplash.com/photo-relevant-environmental-image-id?w=800&h=400&fit=crop"
    }
  ]
}

Use real Unsplash image URLs that match each article's topic. Make the articles comprehensive and educational.`
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
    const articlesData = JSON.parse(cleanedContent);

    return new Response(
      JSON.stringify(articlesData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error fetching articles:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch articles',
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