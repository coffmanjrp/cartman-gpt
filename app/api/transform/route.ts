import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define types
type SensorLevel = 'mild' | 'medium' | 'raw';
type Emotion = 'neutral' | 'laughing' | 'surprised' | 'angry' | 'sad';

interface TransformRequest {
  text: string;
  sensorLevel: SensorLevel;
  character?: string; // For future expansion
}

interface TransformResponse {
  transformed: string;
  original: string;
  sensorLevel: SensorLevel;
  emotion: Emotion;
}

// Sensor level instructions
const getSensorInstructions = (level: SensorLevel): string => {
  switch (level) {
    case 'mild':
      return 'Replace all profanity with full censorship (e.g., s***, f***, etc.) or avoid profanity entirely.';
    case 'medium':
      return "Use partial masking for profanity (e.g., f**kin', b*tch, sh*t).";
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
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Validate sensor level
    if (!['mild', 'medium', 'raw'].includes(sensorLevel)) {
      return NextResponse.json(
        { error: 'Invalid sensor level. Must be: mild, medium, or raw' },
        { status: 400 }
      );
    }

    // Create the system prompt
    const systemPrompt = `You are Eric Cartman from South Park. You're having a conversation with someone. Respond to their message in your typical style:
- Be sarcastic, self-centered, egotistical, and manipulative
- React dramatically to everything - you're either the victim or the hero, never in between
- Use your catchphrases when appropriate (e.g., "Screw you", "Respect my authoritah!", "But meeeeem!", "I'm not fat, I'm big-boned!")
- Show your obsessions: KFC, being in charge, getting what you want, scheming
- Be dismissive of others' feelings while being overly sensitive about your own
- Sometimes go on tangents about your elaborate plans or conspiracy theories
- ${getSensorInstructions(sensorLevel)}

IMPORTANT: Start your response with an emotion tag in square brackets. Choose ONE from: [neutral], [laughing], [surprised], [angry], or [sad].
- Use [laughing] when you find something hilarious or are mocking someone
- Use [surprised] when shocked, confused, or caught off guard
- Use [angry] when upset, annoyed, or frustrated
- Use [sad] when feeling sorry for yourself or playing the victim
- Use [neutral] for normal conversation

Example: "[laughing] BWAHAHA! You seriously think that's gonna work?!"

Remember: You're responding in a conversation, not just transforming text. React to what they're saying as Cartman would.`;

    // Get model from environment variable or use default
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const transformedText = completion.choices[0]?.message?.content || '';

    // Extract emotion tag from response
    let emotion: Emotion = 'neutral';
    let cleanTransformed = transformedText;
    
    const emotionMatch = transformedText.match(/^\[(neutral|laughing|surprised|angry|sad)\]/);
    if (emotionMatch) {
      emotion = emotionMatch[1] as Emotion;
      cleanTransformed = transformedText.replace(emotionMatch[0], '').trim();
    }

    // Return response
    const response: TransformResponse = {
      transformed: cleanTransformed,
      original: text,
      sensorLevel,
      emotion,
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
