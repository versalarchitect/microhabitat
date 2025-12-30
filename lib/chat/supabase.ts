import { createClient } from '@supabase/supabase-js';

// MyUrbanFarm Supabase client for website chat integration
export const mufSupabase = createClient(
  process.env.MYURBANFARM_SUPABASE_URL || '',
  process.env.MYURBANFARM_SUPABASE_ANON_KEY || ''
);

// Types for website chat
export interface WebsiteChat {
  id: string;
  visitor_name: string;
  visitor_email: string;
  visitor_phone?: string;
  visitor_company?: string;
  session_token: string;
  assigned_to?: string;
  status: 'open' | 'closed' | 'archived';
  source_url?: string;
  source_locale?: string;
  created_at: string;
  updated_at: string;
  last_message_at?: string;
  closed_at?: string;
}

export interface WebsiteChatMessage {
  id: string;
  chat_id: string;
  sender_type: 'visitor' | 'staff' | 'system';
  sender_id?: string;
  sender_name?: string;
  content: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

// Create a new chat session
export async function createWebsiteChat(data: {
  visitor_name: string;
  visitor_email: string;
  visitor_phone?: string;
  visitor_company?: string;
  source_url?: string;
  source_locale?: string;
}): Promise<{ chat: WebsiteChat | null; error: string | null }> {
  const { data: chat, error } = await mufSupabase
    .from('website_chats')
    .insert({
      visitor_name: data.visitor_name,
      visitor_email: data.visitor_email,
      visitor_phone: data.visitor_phone,
      visitor_company: data.visitor_company,
      source_url: data.source_url,
      source_locale: data.source_locale,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating website chat:', error);
    return { chat: null, error: error.message };
  }

  return { chat, error: null };
}

// Send a message in a chat
export async function sendWebsiteChatMessage(data: {
  chat_id: string;
  session_token: string;
  content: string;
  sender_type: 'visitor' | 'staff';
  sender_id?: string;
  sender_name?: string;
}): Promise<{ message: WebsiteChatMessage | null; error: string | null }> {
  // Verify session token for visitor messages
  if (data.sender_type === 'visitor') {
    const { data: chat } = await mufSupabase
      .from('website_chats')
      .select('id')
      .eq('id', data.chat_id)
      .eq('session_token', data.session_token)
      .single();

    if (!chat) {
      return { message: null, error: 'Invalid session' };
    }
  }

  const { data: message, error } = await mufSupabase
    .from('website_chat_messages')
    .insert({
      chat_id: data.chat_id,
      content: data.content,
      sender_type: data.sender_type,
      sender_id: data.sender_id,
      sender_name: data.sender_name || (data.sender_type === 'visitor' ? 'Visitor' : undefined),
    })
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    return { message: null, error: error.message };
  }

  return { message, error: null };
}

// Get messages for a chat
export async function getWebsiteChatMessages(
  chat_id: string,
  session_token: string,
  after?: string
): Promise<{ messages: WebsiteChatMessage[]; error: string | null }> {
  // Verify session token
  const { data: chat } = await mufSupabase
    .from('website_chats')
    .select('id')
    .eq('id', chat_id)
    .eq('session_token', session_token)
    .single();

  if (!chat) {
    return { messages: [], error: 'Invalid session' };
  }

  let query = mufSupabase
    .from('website_chat_messages')
    .select('*')
    .eq('chat_id', chat_id)
    .order('created_at', { ascending: true });

  if (after) {
    query = query.gt('created_at', after);
  }

  const { data: messages, error } = await query;

  if (error) {
    console.error('Error fetching messages:', error);
    return { messages: [], error: error.message };
  }

  return { messages: messages || [], error: null };
}

// Get sales team emails from MUF database
export async function getSalesTeamEmails(): Promise<string[]> {
  const { data: users } = await mufSupabase
    .from('users')
    .select('email')
    .eq('role', 'sales');

  return users?.map(u => u.email).filter(Boolean) || [];
}

// Get chat details by ID and session token
export async function getWebsiteChat(
  chat_id: string,
  session_token: string
): Promise<{ chat: WebsiteChat | null; error: string | null }> {
  const { data: chat, error } = await mufSupabase
    .from('website_chats')
    .select('*')
    .eq('id', chat_id)
    .eq('session_token', session_token)
    .single();

  if (error) {
    return { chat: null, error: error.message };
  }

  return { chat, error: null };
}
