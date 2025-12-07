import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Fallback policies when API is unavailable
const fallbackPolicies = [
  {
    id: "policy-1",
    title: "Single-Use Plastics Ban",
    authority: "European Commission",
    country: "European Union",
    date: "2024-01-01",
    status: "active",
    category: "waste management",
    summary: "Comprehensive ban on single-use plastic products including straws, cutlery, plates, and cotton bud sticks. Aims to reduce marine litter and promote sustainable alternatives.",
    keyPoints: [
      "Ban on 10 single-use plastic products",
      "Extended producer responsibility for packaging",
      "90% collection target for plastic bottles by 2029",
      "Mandatory recycled content in plastic bottles"
    ],
    fullText: "This directive addresses plastic pollution by targeting the most commonly found single-use plastic items on European beaches. Member states must implement awareness campaigns and promote sustainable alternatives.",
    impact: "Expected to reduce marine litter by 70%",
    compliance: "All EU member states must transpose into national law",
    document: "eu-sup-directive-2019.pdf",
    views: 15420,
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&h=400&fit=crop"
  },
  {
    id: "policy-2",
    title: "Extended Producer Responsibility Act",
    authority: "Ministry of Environment",
    country: "Germany",
    date: "2023-07-01",
    status: "active",
    category: "recycling",
    summary: "Manufacturers are held responsible for the entire lifecycle of their products, including collection, recycling, and disposal costs.",
    keyPoints: [
      "Producers fund collection and recycling systems",
      "Eco-design requirements for products",
      "Mandatory recycling targets by product category",
      "Financial incentives for sustainable packaging"
    ],
    fullText: "The EPR framework requires producers to take responsibility for managing the environmental impact of their products throughout their lifecycle. This includes financing waste management systems and meeting recycling targets.",
    impact: "Projected 30% increase in recycling rates",
    compliance: "All manufacturers and importers of packaged goods",
    document: "germany-epr-act-2023.pdf",
    views: 8932,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop"
  },
  {
    id: "policy-3",
    title: "National E-Waste Management Program",
    authority: "Environmental Protection Agency",
    country: "India",
    date: "2023-04-01",
    status: "active",
    category: "waste management",
    summary: "Comprehensive framework for managing electronic waste, including collection targets, recycling standards, and producer responsibilities.",
    keyPoints: [
      "Mandatory e-waste collection by manufacturers",
      "Authorized recycler certification program",
      "Consumer awareness campaigns",
      "Penalties for improper disposal"
    ],
    fullText: "This program establishes a formal e-waste management system with clear responsibilities for all stakeholders. It aims to formalize the informal recycling sector while protecting worker health and the environment.",
    impact: "Target: 70% e-waste collection by 2025",
    compliance: "Electronics manufacturers, importers, and recyclers",
    document: "india-ewaste-rules-2023.pdf",
    views: 12450,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=400&fit=crop"
  },
  {
    id: "policy-4",
    title: "Carbon Neutrality Roadmap 2050",
    authority: "Ministry of Ecology",
    country: "Japan",
    date: "2024-01-15",
    status: "active",
    category: "renewable energy",
    summary: "Strategic plan to achieve carbon neutrality by 2050 through renewable energy expansion, energy efficiency, and circular economy initiatives.",
    keyPoints: [
      "100% renewable electricity by 2050",
      "Green hydrogen development program",
      "Zero-emission vehicle mandate",
      "Industrial decarbonization incentives"
    ],
    fullText: "Japan's comprehensive roadmap outlines the transition to a carbon-neutral society through technology innovation, policy support, and international cooperation. Key sectors include energy, transport, and industry.",
    impact: "Complete carbon neutrality by 2050",
    compliance: "All major industries and utilities",
    document: "japan-carbon-neutral-2050.pdf",
    views: 23100,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop"
  },
  {
    id: "policy-5",
    title: "Plastic Packaging Tax",
    authority: "HM Treasury",
    country: "United Kingdom",
    date: "2023-04-01",
    status: "active",
    category: "recycling",
    summary: "Tax on plastic packaging with less than 30% recycled content, encouraging manufacturers to use more recycled materials.",
    keyPoints: [
      "£210 per tonne tax rate",
      "Applies to imported and UK-produced packaging",
      "Exemptions for small producers",
      "Credits for exported packaging"
    ],
    fullText: "The Plastic Packaging Tax incentivizes the use of recycled plastic in packaging. Businesses must register if they manufacture or import 10+ tonnes of plastic packaging annually.",
    impact: "Expected to increase recycled content by 40%",
    compliance: "Packaging manufacturers and importers",
    document: "uk-plastic-tax-2023.pdf",
    views: 9870,
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&h=400&fit=crop"
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
      console.log('No API key, returning fallback policies');
      return new Response(
        JSON.stringify({ policies: fallbackPolicies }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { query, country, category } = await req.json();

    console.log('Fetching policies with query:', query, 'country:', country, 'category:', category);

    // Use gemini-1.5-flash for better rate limits
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
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
      console.log('Returning fallback policies due to API error');
      return new Response(
        JSON.stringify({ policies: fallbackPolicies }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
    console.log('Returning fallback policies due to error');
    return new Response(
      JSON.stringify({ policies: fallbackPolicies }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
