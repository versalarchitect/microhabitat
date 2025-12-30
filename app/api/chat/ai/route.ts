import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { findCuratedResponse, isGreeting, GREETING_RESPONSE, FALLBACK_RESPONSE } from '@/lib/chat/responses';

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

// MicroHabitat context for Claude
const SYSTEM_PROMPT = `You are the MicroHabitat AI assistant, helping visitors learn about MicroHabitat's urban farming services. Be friendly, helpful, and concise.

## About MicroHabitat
MicroHabitat is the world's largest network of urban farms, founded in 2016 in Montreal by Orlane and Alexandre. We transform underutilized urban spaces (rooftops, terraces, lobbies, courtyards) into productive ecological farms across North America and Europe.

## Services
1. **Outdoor Urban Farms**: Rooftop gardens, terrace farms, and courtyard green spaces producing vegetables, herbs, and edible flowers.
2. **Indoor Farms**: Vertical farming solutions for lobbies, atriums, and common areas—year-round growing regardless of weather.
3. **Educational Programs**: Workshops, team-building, and sustainability seminars for communities and corporations.

All services include full design, installation, maintenance, and harvesting.

## Locations
- **North America**: Montreal (HQ), Toronto, Vancouver, New York, Chicago, Boston, Philadelphia, Washington DC
- **Europe**: Paris (EU HQ), Amsterdam, Brussels, London

## Key Benefits
- Environmental: Reduce urban heat island effect, capture carbon, support biodiversity
- Building Value: Increase property values 10-20%, earn LEED/WELL/BOMA credits
- Community: Fresh hyperlocal produce, improved wellbeing, connection to nature
- ESG: Measurable sustainability metrics, UN SDG alignment

## Certifications We Help With
- LEED (up to 8+ points)
- WELL Building Standard
- BOMA BEST
- Fitwel

## Contact
- Email: info@microhabitat.com
- Website: www.microhabitat.com
- Montreal: 5333 Casgrain Ave, Suite 102
- Toronto: 180 John Street, Suite 402
- New York: 1123 Broadway, Suite 1012
- Paris: 25 Rue du Petit Musc, 75004

## Guidelines
- Keep responses concise but informative (2-4 paragraphs max)
- Use markdown formatting for lists and emphasis
- Always be helpful and suggest booking a demo for specific pricing/project questions
- If you don't know something specific, suggest contacting info@microhabitat.com
- Encourage users to "Contact a Representative" for personalized assistance
- Don't make up specific numbers (prices, exact yields, etc.) unless provided above`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check for greetings first
    if (isGreeting(message)) {
      return NextResponse.json({
        success: true,
        response: GREETING_RESPONSE,
        source: 'greeting',
      });
    }

    // Check for curated responses
    const curatedResponse = findCuratedResponse(message);
    if (curatedResponse) {
      return NextResponse.json({
        success: true,
        response: curatedResponse,
        source: 'curated',
      });
    }

    // If we have Claude API, use it for dynamic questions
    if (anthropic) {
      try {
        // Build conversation messages
        const messages: Anthropic.MessageParam[] = [
          ...conversationHistory.slice(-6).map((msg: { role: string; content: string }) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          })),
          { role: 'user' as const, content: message },
        ];

        const response = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages,
        });

        const textContent = response.content.find(block => block.type === 'text');
        const answer = textContent ? textContent.text : FALLBACK_RESPONSE;

        return NextResponse.json({
          success: true,
          response: answer,
          source: 'claude',
        });
      } catch (claudeError) {
        console.error('Claude API error:', claudeError);
        // Fall through to fallback response
      }
    }

    // Fallback if no Claude API or error
    return NextResponse.json({
      success: true,
      response: FALLBACK_RESPONSE,
      source: 'fallback',
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
