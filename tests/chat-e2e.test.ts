/**
 * End-to-end tests for the chat system
 * These tests use the real Supabase database
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createClient } from '@supabase/supabase-js';

// Real Supabase credentials for testing
const SUPABASE_URL = 'https://cuzozmvjqkatxkzdkojj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1em96bXZqcWthdHhremRrb2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTMxODAsImV4cCI6MjA1OTg4OTE4MH0.yk7I02r27IRuy2Xx6x00KpTsAMgUmsHA4qKK0pQEVl0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test data
const testVisitor = {
  name: 'E2E Test User',
  email: `e2e-test-${Date.now()}@example.com`,
  phone: '+1234567890',
  company: 'Test Company Inc',
};

let testChatId: string;
let testSessionToken: string;

describe('Chat System E2E Tests', () => {
  describe('1. Create Chat Session', () => {
    it('should create a new chat session in the database', async () => {
      const { data: chat, error } = await supabase
        .from('website_chats')
        .insert({
          visitor_name: testVisitor.name,
          visitor_email: testVisitor.email,
          visitor_phone: testVisitor.phone,
          visitor_company: testVisitor.company,
          source_url: 'https://www.microhabitat.com/test',
          source_locale: 'en',
        })
        .select()
        .single();

      expect(error).toBeNull();
      expect(chat).not.toBeNull();
      expect(chat.id).toBeDefined();
      expect(chat.session_token).toBeDefined();
      expect(chat.visitor_name).toBe(testVisitor.name);
      expect(chat.visitor_email).toBe(testVisitor.email);
      expect(chat.status).toBe('open');

      // Store for later tests
      testChatId = chat.id;
      testSessionToken = chat.session_token;

      console.log(`  Created chat: ${testChatId}`);
    });
  });

  describe('2. Send Messages', () => {
    it('should send a visitor message', async () => {
      const { data: message, error } = await supabase
        .from('website_chat_messages')
        .insert({
          chat_id: testChatId,
          content: 'Hello! I am interested in your urban farming services.',
          sender_type: 'visitor',
          sender_name: testVisitor.name,
        })
        .select()
        .single();

      expect(error).toBeNull();
      expect(message).not.toBeNull();
      expect(message.content).toContain('urban farming');
      expect(message.sender_type).toBe('visitor');

      console.log(`  Sent visitor message: ${message.id}`);
    });

    it('should send a staff message', async () => {
      const { data: message, error } = await supabase
        .from('website_chat_messages')
        .insert({
          chat_id: testChatId,
          content: 'Hi there! Thanks for reaching out. How can I help you today?',
          sender_type: 'staff',
          sender_name: 'Test Staff',
        })
        .select()
        .single();

      expect(error).toBeNull();
      expect(message).not.toBeNull();
      expect(message.sender_type).toBe('staff');

      console.log(`  Sent staff message: ${message.id}`);
    });

    it('should send a system message', async () => {
      const { data: message, error } = await supabase
        .from('website_chat_messages')
        .insert({
          chat_id: testChatId,
          content: 'Chat assigned to sales team',
          sender_type: 'system',
        })
        .select()
        .single();

      expect(error).toBeNull();
      expect(message).not.toBeNull();
      expect(message.sender_type).toBe('system');

      console.log(`  Sent system message: ${message.id}`);
    });
  });

  describe('3. Retrieve Messages', () => {
    it('should retrieve all messages for the chat', async () => {
      const { data: messages, error } = await supabase
        .from('website_chat_messages')
        .select('*')
        .eq('chat_id', testChatId)
        .order('created_at', { ascending: true });

      expect(error).toBeNull();
      expect(messages).not.toBeNull();
      expect(messages.length).toBeGreaterThanOrEqual(3);

      // Verify message order
      const senderTypes = messages.map(m => m.sender_type);
      expect(senderTypes).toContain('visitor');
      expect(senderTypes).toContain('staff');
      expect(senderTypes).toContain('system');

      console.log(`  Retrieved ${messages.length} messages`);
    });

    it('should retrieve messages after a specific timestamp', async () => {
      // Get the first message timestamp
      const { data: firstMessage } = await supabase
        .from('website_chat_messages')
        .select('created_at')
        .eq('chat_id', testChatId)
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      // Get messages after the first one
      const { data: messages, error } = await supabase
        .from('website_chat_messages')
        .select('*')
        .eq('chat_id', testChatId)
        .gt('created_at', firstMessage.created_at)
        .order('created_at', { ascending: true });

      expect(error).toBeNull();
      expect(messages.length).toBeGreaterThanOrEqual(2); // At least staff + system messages

      console.log(`  Retrieved ${messages.length} messages after first`);
    });
  });

  describe('4. Chat Status Management', () => {
    it('should update last_message_at when message is sent', async () => {
      const { data: chat } = await supabase
        .from('website_chats')
        .select('last_message_at')
        .eq('id', testChatId)
        .single();

      expect(chat.last_message_at).not.toBeNull();
      console.log(`  last_message_at updated: ${chat.last_message_at}`);
    });

    it('should close the chat', async () => {
      const { data: chat, error } = await supabase
        .from('website_chats')
        .update({
          status: 'closed',
          closed_at: new Date().toISOString(),
        })
        .eq('id', testChatId)
        .select()
        .single();

      expect(error).toBeNull();
      expect(chat.status).toBe('closed');
      expect(chat.closed_at).not.toBeNull();

      console.log(`  Chat closed at: ${chat.closed_at}`);
    });

    it('should reopen the chat', async () => {
      const { data: chat, error } = await supabase
        .from('website_chats')
        .update({
          status: 'open',
          closed_at: null,
        })
        .eq('id', testChatId)
        .select()
        .single();

      expect(error).toBeNull();
      expect(chat.status).toBe('open');
      expect(chat.closed_at).toBeNull();

      console.log(`  Chat reopened`);
    });
  });

  describe('5. Session Token Verification', () => {
    it('should find chat by session token', async () => {
      const { data: chat, error } = await supabase
        .from('website_chats')
        .select('*')
        .eq('id', testChatId)
        .eq('session_token', testSessionToken)
        .single();

      expect(error).toBeNull();
      expect(chat).not.toBeNull();
      expect(chat.id).toBe(testChatId);

      console.log(`  Session token verified`);
    });

    it('should not find chat with invalid session token', async () => {
      const { data: chat, error } = await supabase
        .from('website_chats')
        .select('*')
        .eq('id', testChatId)
        .eq('session_token', 'invalid-token-12345')
        .single();

      // Should return no data (PGRST116 means no rows found)
      expect(chat).toBeNull();
      console.log(`  Invalid session token rejected`);
    });
  });

  // Cleanup after all tests
  afterAll(async () => {
    if (testChatId) {
      // Delete test messages first (due to foreign key)
      await supabase
        .from('website_chat_messages')
        .delete()
        .eq('chat_id', testChatId);

      // Delete test chat
      await supabase
        .from('website_chats')
        .delete()
        .eq('id', testChatId);

      console.log(`\n  Cleaned up test chat: ${testChatId}`);
    }
  });
});
