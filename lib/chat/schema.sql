-- Website Chat Tables for MicroHabitat ↔ MyUrbanFarm Integration
-- Run this migration in MyUrbanFarm's Supabase

-- Table: website_chats
-- Stores chat sessions initiated from MicroHabitat website
CREATE TABLE IF NOT EXISTS website_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Visitor information
  visitor_name VARCHAR(255) NOT NULL,
  visitor_email VARCHAR(255) NOT NULL,
  visitor_phone VARCHAR(50),
  visitor_company VARCHAR(255),

  -- Session token for visitor authentication (no login required)
  session_token UUID UNIQUE DEFAULT gen_random_uuid(),

  -- Assignment
  assigned_to UUID REFERENCES users(id),

  -- Status
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),

  -- Source tracking
  source_url TEXT, -- Page where chat was initiated
  source_locale VARCHAR(10) DEFAULT 'en',

  -- Lead conversion
  lead_id UUID, -- Reference to lead_generation_leads if converted
  converted_to_lead_at TIMESTAMPTZ,
  converted_by UUID REFERENCES users(id),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ
);

-- Table: website_chat_messages
-- Stores messages in website chat conversations
CREATE TABLE IF NOT EXISTS website_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES website_chats(id) ON DELETE CASCADE,

  -- Sender info
  sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('visitor', 'staff', 'system')),
  sender_id UUID REFERENCES users(id), -- Only for staff messages
  sender_name VARCHAR(255), -- Cached for display

  -- Content
  content TEXT NOT NULL,

  -- Read status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_website_chats_session_token ON website_chats(session_token);
CREATE INDEX IF NOT EXISTS idx_website_chats_assigned_to ON website_chats(assigned_to);
CREATE INDEX IF NOT EXISTS idx_website_chats_status ON website_chats(status);
CREATE INDEX IF NOT EXISTS idx_website_chat_messages_chat_id ON website_chat_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_website_chat_messages_created_at ON website_chat_messages(created_at);

-- Trigger to update last_message_at on new message
CREATE OR REPLACE FUNCTION update_website_chat_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE website_chats
  SET last_message_at = NEW.created_at, updated_at = NOW()
  WHERE id = NEW.chat_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_website_chat_last_message ON website_chat_messages;
CREATE TRIGGER trg_update_website_chat_last_message
  AFTER INSERT ON website_chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_website_chat_last_message();

-- Enable Row Level Security
ALTER TABLE website_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for website_chats
-- Allow insert from anon (website visitors)
CREATE POLICY "Allow anonymous chat creation" ON website_chats
  FOR INSERT TO anon WITH CHECK (true);

-- Allow visitors to read their own chat via session_token
CREATE POLICY "Allow visitors to read own chat" ON website_chats
  FOR SELECT TO anon USING (true);

-- Allow authenticated users (MUF staff) full access
CREATE POLICY "Allow staff full access to chats" ON website_chats
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for website_chat_messages
-- Allow insert from anon (visitor messages)
CREATE POLICY "Allow anonymous message creation" ON website_chat_messages
  FOR INSERT TO anon WITH CHECK (sender_type = 'visitor');

-- Allow visitors to read messages in their chat
CREATE POLICY "Allow visitors to read chat messages" ON website_chat_messages
  FOR SELECT TO anon USING (true);

-- Allow authenticated users (MUF staff) full access
CREATE POLICY "Allow staff full access to messages" ON website_chat_messages
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enable Realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE website_chats;
ALTER PUBLICATION supabase_realtime ADD TABLE website_chat_messages;

-- Grant permissions
GRANT SELECT, INSERT ON website_chats TO anon;
GRANT SELECT, INSERT ON website_chat_messages TO anon;
GRANT ALL ON website_chats TO authenticated;
GRANT ALL ON website_chat_messages TO authenticated;
