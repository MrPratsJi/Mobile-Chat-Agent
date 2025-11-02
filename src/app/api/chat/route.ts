import { NextRequest, NextResponse } from 'next/server';
import { MobileChatAgent } from '@/lib/ai/mobile-chat-agent';

export async function POST(request: NextRequest) {
  try {
    const { query, conversationHistory } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const agent = new MobileChatAgent(apiKey);
    const response = await agent.processQuery(query, conversationHistory || []);

    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Mobile Chat Agent API',
      version: '1.0.0',
      endpoints: {
        '/api/chat': 'POST - Send chat message'
      }
    },
    { status: 200 }
  );
}