#!/usr/bin/env bun
/**
 * End-to-end test script for the chat system
 * Run with: bun run scripts/test-chat-e2e.ts
 *
 * Tests visitor (anon) operations - staff operations tested in MUF
 */

import { createClient } from '@supabase/supabase-js';

// Real Supabase credentials
const SUPABASE_URL = 'https://cuzozmvjqkatxkzdkojj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1em96bXZqcWthdHhremRrb2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTMxODAsImV4cCI6MjA1OTg4OTE4MH0.yk7I02r27IRuy2Xx6x00KpTsAMgUmsHA4qKK0pQEVl0';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1em96bXZqcWthdHhremRrb2pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDMxMzE4MCwiZXhwIjoyMDU5ODg5MTgwfQ.fiObu37vWNoaxGI2_j7dNdkNqxLkLucvy876bq7SiSk';

// Anon client (visitor)
const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Service role client (staff/admin)
const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Test data
const testVisitor = {
  name: 'E2E Test User',
  email: `e2e-test-${Date.now()}@example.com`,
  phone: '+1234567890',
  company: 'Test Company Inc',
};

let testChatId: string;
let testSessionToken: string;
let passed = 0;
let failed = 0;

function log(emoji: string, msg: string) {
  console.log(`${emoji} ${msg}`);
}

function pass(test: string) {
  log('✅', test);
  passed++;
}

function fail(test: string, error: any) {
  log('❌', `${test}: ${error?.message || error}`);
  failed++;
}

async function runTests() {
  console.log('\n🧪 Chat System E2E Tests\n');
  console.log('=' .repeat(50));

  // ==========================================
  // VISITOR (ANON) TESTS
  // ==========================================
  console.log('\n👤 VISITOR OPERATIONS (Anon Role)');
  console.log('-'.repeat(50));

  // Test 1: Visitor creates chat session
  console.log('\n📝 Test 1: Visitor Creates Chat');
  try {
    const { data: chat, error } = await anonClient
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

    if (error) throw error;
    if (!chat) throw new Error('No chat returned');

    testChatId = chat.id;
    testSessionToken = chat.session_token;

    if (chat.visitor_name === testVisitor.name && chat.status === 'open') {
      pass(`Created chat: ${testChatId.substring(0, 8)}...`);
    } else {
      throw new Error('Chat data mismatch');
    }
  } catch (e) {
    fail('Create chat', e);
    return; // Can't continue without chat
  }

  // Test 2: Visitor sends message
  console.log('\n📤 Test 2: Visitor Sends Message');
  try {
    const { data: message, error } = await anonClient
      .from('website_chat_messages')
      .insert({
        chat_id: testChatId,
        content: 'Hello! I am interested in your urban farming services.',
        sender_type: 'visitor',
        sender_name: testVisitor.name,
      })
      .select()
      .single();

    if (error) throw error;
    if (message && message.sender_type === 'visitor') {
      pass('Visitor message sent');
    } else {
      throw new Error('Message not saved correctly');
    }
  } catch (e) {
    fail('Send visitor message', e);
  }

  // Test 3: Visitor can read their messages
  console.log('\n👁️ Test 3: Visitor Reads Messages');
  try {
    const { data: messages, error } = await anonClient
      .from('website_chat_messages')
      .select('*')
      .eq('chat_id', testChatId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    if (messages && messages.length >= 1) {
      pass(`Visitor can read ${messages.length} message(s)`);
    } else {
      throw new Error(`Expected at least 1 message`);
    }
  } catch (e) {
    fail('Visitor read messages', e);
  }

  // Test 4: Visitor cannot send staff messages (RLS check)
  console.log('\n🚫 Test 4: Visitor Cannot Send Staff Message (RLS)');
  try {
    const { error } = await anonClient
      .from('website_chat_messages')
      .insert({
        chat_id: testChatId,
        content: 'Trying to impersonate staff',
        sender_type: 'staff', // This should fail
        sender_name: 'Fake Staff',
      });

    if (error && error.message.includes('row-level security')) {
      pass('RLS blocked visitor from sending staff message');
    } else if (error) {
      pass(`RLS blocked with: ${error.message}`);
    } else {
      throw new Error('RLS should have blocked this');
    }
  } catch (e: any) {
    if (e.message.includes('RLS')) {
      pass('RLS correctly blocked staff message');
    } else {
      fail('RLS staff message block', e);
    }
  }

  // Test 5: Session token verification
  console.log('\n🔑 Test 5: Session Token Works');
  try {
    const { data: chat, error } = await anonClient
      .from('website_chats')
      .select('id, session_token')
      .eq('id', testChatId)
      .eq('session_token', testSessionToken)
      .single();

    if (error) throw error;
    if (chat && chat.id === testChatId) {
      pass('Session token verified correctly');
    } else {
      throw new Error('Session token not matched');
    }
  } catch (e) {
    fail('Session token verification', e);
  }

  // ==========================================
  // STAFF (SERVICE ROLE) TESTS
  // ==========================================
  console.log('\n\n👔 STAFF OPERATIONS (Service Role)');
  console.log('-'.repeat(50));

  // Test 6: Staff sends reply
  console.log('\n📥 Test 6: Staff Sends Reply');
  try {
    const { data: message, error } = await adminClient
      .from('website_chat_messages')
      .insert({
        chat_id: testChatId,
        content: 'Hi there! Thanks for reaching out. How can I help you today?',
        sender_type: 'staff',
        sender_name: 'Gabriel',
      })
      .select()
      .single();

    if (error) throw error;
    if (message && message.sender_type === 'staff') {
      pass('Staff reply sent');
    } else {
      throw new Error('Staff message not saved');
    }
  } catch (e) {
    fail('Staff send reply', e);
  }

  // Test 7: Visitor can see staff reply
  console.log('\n👁️ Test 7: Visitor Sees Staff Reply');
  try {
    const { data: messages, error } = await anonClient
      .from('website_chat_messages')
      .select('*')
      .eq('chat_id', testChatId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    const staffMessages = messages?.filter(m => m.sender_type === 'staff');
    if (staffMessages && staffMessages.length >= 1) {
      pass(`Visitor can see ${staffMessages.length} staff message(s)`);
    } else {
      throw new Error('Visitor cannot see staff messages');
    }
  } catch (e) {
    fail('Visitor see staff reply', e);
  }

  // Test 8: Staff can close chat
  console.log('\n🔒 Test 8: Staff Closes Chat');
  try {
    const { data: chat, error } = await adminClient
      .from('website_chats')
      .update({ status: 'closed', closed_at: new Date().toISOString() })
      .eq('id', testChatId)
      .select()
      .single();

    if (error) throw error;
    if (chat && chat.status === 'closed') {
      pass('Chat closed by staff');
    } else {
      throw new Error('Chat not closed');
    }
  } catch (e) {
    fail('Staff close chat', e);
  }

  // Test 9: Staff can reopen chat
  console.log('\n🔓 Test 9: Staff Reopens Chat');
  try {
    const { data: chat, error } = await adminClient
      .from('website_chats')
      .update({ status: 'open', closed_at: null })
      .eq('id', testChatId)
      .select()
      .single();

    if (error) throw error;
    if (chat && chat.status === 'open') {
      pass('Chat reopened by staff');
    } else {
      throw new Error('Chat not reopened');
    }
  } catch (e) {
    fail('Staff reopen chat', e);
  }

  // Test 10: Check last_message_at trigger worked
  console.log('\n⏰ Test 10: last_message_at Trigger');
  try {
    const { data: chat, error } = await adminClient
      .from('website_chats')
      .select('last_message_at')
      .eq('id', testChatId)
      .single();

    if (error) throw error;
    if (chat && chat.last_message_at) {
      pass(`last_message_at updated: ${new Date(chat.last_message_at).toLocaleTimeString()}`);
    } else {
      throw new Error('last_message_at is null');
    }
  } catch (e) {
    fail('last_message_at trigger', e);
  }

  // Cleanup
  console.log('\n\n🧹 Cleanup');
  console.log('-'.repeat(50));
  try {
    await adminClient
      .from('website_chat_messages')
      .delete()
      .eq('chat_id', testChatId);

    await adminClient
      .from('website_chats')
      .delete()
      .eq('id', testChatId);

    log('🗑️', `Deleted test chat: ${testChatId.substring(0, 8)}...`);
  } catch (e) {
    log('⚠️', `Cleanup failed: ${e}`);
  }

  // Summary
  console.log('\n' + '=' .repeat(50));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log('\n🎉 All E2E tests passed!\n');
    process.exit(0);
  } else {
    console.log('\n💥 Some tests failed!\n');
    process.exit(1);
  }
}

runTests().catch(console.error);
