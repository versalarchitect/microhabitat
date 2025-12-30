import { NextRequest, NextResponse } from 'next/server';
import { getWebsiteChatMessages } from '@/lib/chat/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chat_id = searchParams.get('chat_id');
    const session_token = searchParams.get('session_token');
    const after = searchParams.get('after'); // ISO timestamp for polling new messages only

    // Validate required fields
    if (!chat_id || !session_token) {
      return NextResponse.json(
        { error: 'chat_id and session_token are required' },
        { status: 400 }
      );
    }

    // Get messages
    const { messages, error } = await getWebsiteChatMessages(
      chat_id,
      session_token,
      after || undefined
    );

    if (error) {
      return NextResponse.json(
        { error: error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error('Get messages error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch messages. Please try again.' },
      { status: 500 }
    );
  }
}
