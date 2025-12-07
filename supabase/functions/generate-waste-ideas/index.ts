import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Fallback ideas when API is unavailable
const fallbackIdeas = [
  {
    id: 1,
    title: "Plastic Bottle Vertical Garden",
    wasteType: "Plastic",
    difficulty: "Easy",
    timeRequired: "30 mins",
    description: "Transform empty plastic bottles into a stunning vertical garden for herbs or small plants.",
    materials: ["Plastic bottles", "Scissors", "Rope or wire", "Soil", "Small plants or seeds"],
    instructions: [
      "Cut bottles horizontally, keeping bottom portion",
      "Make drainage holes at the bottom",
      "Attach bottles to wall or fence using rope",
      "Fill with soil and plant your favorites"
    ],
    tags: ["Garden", "Decor", "Sustainable"],
    likes: 1250,
    difficulty_level: 1,
    author: "EcoCreator",
    featured: true
  },
  {
    id: 2,
    title: "Cardboard Cat Playhouse",
    wasteType: "Cardboard",
    difficulty: "Medium",
    timeRequired: "1 hour",
    description: "Create an exciting multi-level playhouse for your cat using cardboard boxes.",
    materials: ["Large cardboard boxes", "Box cutter", "Tape", "Non-toxic paint"],
    instructions: [
      "Design your playhouse layout with multiple levels",
      "Cut entrance holes and windows in boxes",
      "Stack and secure boxes together",
      "Decorate with pet-safe paint"
    ],
    tags: ["Pets", "Fun", "Recycling"],
    likes: 890,
    difficulty_level: 2,
    author: "GreenPaws",
    featured: false
  },
  {
    id: 3,
    title: "Glass Jar Lanterns",
    wasteType: "Glass",
    difficulty: "Easy",
    timeRequired: "20 mins",
    description: "Turn empty glass jars into beautiful decorative lanterns for indoor or outdoor use.",
    materials: ["Glass jars", "Wire", "Pliers", "Tea light candles", "Decorative items"],
    instructions: [
      "Clean jars thoroughly and remove labels",
      "Wrap wire around jar rim to create handle",
      "Add decorative stones or sand to bottom",
      "Place tea light inside and enjoy"
    ],
    tags: ["Decor", "Lighting", "Romantic"],
    likes: 1580,
    difficulty_level: 1,
    author: "CraftQueen",
    featured: true
  },
  {
    id: 4,
    title: "Newspaper Seed Pots",
    wasteType: "Paper",
    difficulty: "Easy",
    timeRequired: "15 mins",
    description: "Make biodegradable seed starting pots from old newspapers that can be planted directly in soil.",
    materials: ["Newspaper", "Small can or jar as mold", "Water"],
    instructions: [
      "Cut newspaper into strips",
      "Wrap around can leaving excess at bottom",
      "Fold bottom flaps and press firmly",
      "Fill with soil and plant seeds"
    ],
    tags: ["Garden", "Seeds", "Biodegradable"],
    likes: 720,
    difficulty_level: 1,
    author: "GardenGuru",
    featured: false
  },
  {
    id: 5,
    title: "Tin Can Wind Chimes",
    wasteType: "Metal",
    difficulty: "Medium",
    timeRequired: "45 mins",
    description: "Create melodic wind chimes from empty tin cans for your garden or balcony.",
    materials: ["Various sized tin cans", "Acrylic paint", "String", "Beads", "Drill or hammer and nail"],
    instructions: [
      "Clean cans and remove labels",
      "Paint and decorate as desired",
      "Make holes at bottom of each can",
      "String cans at varying lengths with beads"
    ],
    tags: ["Garden", "Music", "Decor"],
    likes: 945,
    difficulty_level: 2,
    author: "MetalArtist",
    featured: false
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const googleApiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!googleApiKey) {
      console.log('No API key, returning fallback ideas');
      return new Response(
        JSON.stringify({ ideas: fallbackIdeas }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

    // Use gemini-1.5-flash for better rate limits
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${googleApiKey}`, {
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
      console.log('Returning fallback ideas due to API error');
      return new Response(
        JSON.stringify({ ideas: fallbackIdeas }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected API response format:', data);
      return new Response(
        JSON.stringify({ ideas: fallbackIdeas }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
        JSON.stringify({ ideas: fallbackIdeas }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
      JSON.stringify({ ideas: fallbackIdeas }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
