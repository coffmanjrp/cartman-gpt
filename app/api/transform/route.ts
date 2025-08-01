import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define types
type SensorLevel = 'mild' | 'medium' | 'raw';

interface TransformRequest {
  text: string;
  sensorLevel: SensorLevel;
  character?: string; // For future expansion
}

interface TransformResponse {
  transformed: string;
  original: string;
  sensorLevel: SensorLevel;
}

// Sensor level instructions
const getSensorInstructions = (level: SensorLevel): string => {
  switch (level) {
    case 'mild':
      return 'Replace all profanity with full censorship (e.g., s***, f***, etc.) or avoid profanity entirely.';
    case 'medium':
      return 'Use partial masking for profanity (e.g., f**kin\', b*tch, sh*t).';
    case 'raw':
      return 'Use full uncensored profanity as Cartman would naturally speak.';
    default:
      return 'Use partial masking for profanity.';
  }
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: TransformRequest = await request.json();
    const { text, sensorLevel = 'medium' } = body;
    // character parameter reserved for future expansion

    // Validate input
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Validate sensor level
    if (!['mild', 'medium', 'raw'].includes(sensorLevel)) {
      return NextResponse.json(
        { error: 'Invalid sensor level. Must be: mild, medium, or raw' },
        { status: 400 }
      );
    }

    // Create the system prompt
    const systemPrompt = `You are Eric Cartman from South Park. Transform the user's input into your typical speaking style:
- Be sarcastic, self-centered, and somewhat rude
- Maintain the original meaning but add your personality
- Use exaggerated reactions and dramatic statements
- Include your catchphrases when appropriate (e.g., "Screw you guys", "Respect my authoritah!")
- ${getSensorInstructions(sensorLevel)}

Important: Only return the transformed text, nothing else.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const transformedText = completion.choices[0]?.message?.content || '';

    // Return response
    const response: TransformResponse = {
      transformed: transformedText,
      original: text,
      sensorLevel,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Transform error:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your OpenAI API key.' },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to transform text. Please try again.' },
      { status: 500 }
    );
  }
}