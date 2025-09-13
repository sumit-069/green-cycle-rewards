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

    const policyData = await req.json();

    console.log('Processing policy submission:', policyData);

    // Validate and enhance the policy submission using AI
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
            content: `You are an environmental policy validator. Review the submitted policy and return a JSON response with validation results and suggestions. Structure:
            {
              "valid": boolean,
              "score": number (1-100),
              "suggestions": ["suggestion1", "suggestion2"],
              "category": "determined category",
              "impact": "assessed environmental impact",
              "feasibility": "implementation feasibility assessment",
              "enhancedTitle": "improved title if needed",
              "keyStrengths": ["strength1", "strength2"],
              "areasForImprovement": ["area1", "area2"]
            }`
          },
          {
            role: 'user',
            content: `Review this policy submission: Title: ${policyData.title}, Description: ${policyData.description}, Category: ${policyData.category}, Authority: ${policyData.authority || 'Not specified'}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const validation = JSON.parse(data.choices[0].message.content);

    // Simulate policy submission process
    const submissionResult = {
      id: `policy_${Date.now()}`,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      reviewScore: validation.score,
      validation: validation,
      estimatedReviewTime: '5-7 business days',
      trackingId: `POL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ecoPointsAwarded: Math.max(10, Math.floor(validation.score / 10))
    };

    return new Response(
      JSON.stringify(submissionResult),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error submitting policy:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to submit policy',
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