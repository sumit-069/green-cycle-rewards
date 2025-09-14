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

    const { query, category } = await req.json();

    console.log('Fetching articles with query:', query, 'category:', category);

    // Generate articles using OpenAI
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
            content: `You are an environmental expert. Generate 6 realistic environmental articles with detailed information. Return them as a JSON array with the following structure:
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
                  "content": "Full article content (500+ words with practical tips)"
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Generate environmental articles about: ${query || 'sustainable waste management and eco-friendly practices'}. Category focus: ${category || 'general'}. Make them practical and actionable.`
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
    const articlesData = JSON.parse(data.choices[0].message.content);

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