import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Fallback articles when API is unavailable
const fallbackArticles = [
  {
    id: "fallback-1",
    title: "10 Simple Ways to Reduce Household Waste",
    excerpt: "Discover practical tips to minimize waste in your daily life, from composting to smart shopping habits that benefit both your wallet and the environment.",
    author: "Dr. Sarah Green",
    readTime: "5 min read",
    likes: 342,
    category: "Tips",
    featured: true,
    publishedDate: "2024-01-15",
    content: "Reducing household waste is one of the most impactful ways individuals can contribute to environmental sustainability. Start by conducting a waste audit to understand what you're throwing away most often. Consider composting food scraps, buying in bulk to reduce packaging, and choosing reusable alternatives to single-use items.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop"
  },
  {
    id: "fallback-2",
    title: "The Future of Plastic Recycling",
    excerpt: "New technologies are revolutionizing how we process and recycle plastics, offering hope for a more sustainable future.",
    author: "James Wilson",
    readTime: "7 min read",
    likes: 256,
    category: "Innovation",
    featured: false,
    publishedDate: "2024-01-10",
    content: "Advanced chemical recycling methods are now capable of breaking down plastics to their molecular components, allowing for infinite recyclability. Companies worldwide are investing in these technologies to address the growing plastic waste crisis.",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&h=400&fit=crop"
  },
  {
    id: "fallback-3",
    title: "Community Gardens: Growing Together for Sustainability",
    excerpt: "Learn how community gardens are transforming urban spaces and bringing people together while promoting sustainable food production.",
    author: "Maria Santos",
    readTime: "4 min read",
    likes: 189,
    category: "Community",
    featured: false,
    publishedDate: "2024-01-08",
    content: "Community gardens provide numerous benefits beyond fresh produce. They create green spaces in urban environments, reduce food miles, and foster community connections. Many programs also incorporate composting initiatives, turning local organic waste into nutrient-rich soil.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop"
  },
  {
    id: "fallback-4",
    title: "E-Waste: The Hidden Environmental Crisis",
    excerpt: "Electronic waste is one of the fastest-growing waste streams. Here's what you need to know about responsible e-waste disposal.",
    author: "Tech Green Team",
    readTime: "6 min read",
    likes: 423,
    category: "Awareness",
    featured: true,
    publishedDate: "2024-01-05",
    content: "Electronic waste contains valuable materials like gold, silver, and rare earth elements, but also hazardous substances. Proper recycling can recover these resources while preventing environmental contamination. Always use certified e-waste recyclers and consider repairing or donating functional electronics.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=400&fit=crop"
  },
  {
    id: "fallback-5",
    title: "Zero Waste Living: A Beginner's Guide",
    excerpt: "Starting your zero-waste journey can seem overwhelming. This guide breaks it down into manageable steps for lasting change.",
    author: "Emily Chen",
    readTime: "8 min read",
    likes: 567,
    category: "Lifestyle",
    featured: false,
    publishedDate: "2024-01-03",
    content: "Zero waste living isn't about perfection—it's about making better choices. Start with the 5 Rs: Refuse what you don't need, Reduce what you do need, Reuse what you consume, Recycle what you can't refuse, and Rot (compost) the rest.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop"
  },
  {
    id: "fallback-6",
    title: "Ocean Cleanup Innovations Making Waves",
    excerpt: "Discover the latest technologies and initiatives working to clean our oceans from plastic pollution.",
    author: "Ocean Watch Team",
    readTime: "5 min read",
    likes: 389,
    category: "Innovation",
    featured: false,
    publishedDate: "2024-01-01",
    content: "From autonomous cleanup vessels to biodegradable fishing nets, innovators worldwide are developing solutions to tackle ocean plastic pollution. These efforts combine technology with community action to protect marine ecosystems.",
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&h=400&fit=crop"
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const geminiApiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!geminiApiKey) {
      console.log('No API key, returning fallback articles');
      return new Response(
        JSON.stringify({ articles: fallbackArticles }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { query, category } = await req.json();

    console.log('Fetching articles with query:', query, 'category:', category);

    // Use gemini-1.5-flash for better rate limits
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
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
      console.log('Returning fallback articles due to API error');
      return new Response(
        JSON.stringify({ articles: fallbackArticles }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
    console.log('Returning fallback articles due to error');
    return new Response(
      JSON.stringify({ articles: fallbackArticles }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
