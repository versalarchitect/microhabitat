import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the supabase module
vi.mock('@/lib/chat/supabase', () => ({
  createWebsiteChat: vi.fn(),
  sendWebsiteChatMessage: vi.fn(),
  getWebsiteChatMessages: vi.fn(),
  getSalesTeamEmails: vi.fn(),
  getWebsiteChat: vi.fn(),
}));

// Mock resend
vi.mock('resend', () => {
  const mockSend = vi.fn().mockResolvedValue({ id: 'email-123' });
  return {
    Resend: class MockResend {
      emails = { send: mockSend };
    },
  };
});

import {
  createWebsiteChat,
  sendWebsiteChatMessage,
  getWebsiteChatMessages,
  getSalesTeamEmails,
  getWebsiteChat,
} from '@/lib/chat/supabase';

describe('Chat API - Start Chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should validate required fields', async () => {
    // Test missing name
    const mockRequest = (body: object) => ({
      json: () => Promise.resolve(body),
    });

    // Import the route handler dynamically to get fresh instance
    const { POST } = await import('@/app/api/chat/start/route');

    // Missing name
    const response1 = await POST(mockRequest({ email: 'test@test.com', message: 'Hello' }) as any);
    const data1 = await response1.json();
    expect(response1.status).toBe(400);
    expect(data1.error).toContain('Name');

    // Missing email
    const response2 = await POST(mockRequest({ name: 'Test', message: 'Hello' }) as any);
    const data2 = await response2.json();
    expect(response2.status).toBe(400);
    expect(data2.error).toContain('email');

    // Missing message
    const response3 = await POST(mockRequest({ name: 'Test', email: 'test@test.com' }) as any);
    const data3 = await response3.json();
    expect(response3.status).toBe(400);
    expect(data3.error).toContain('message');
  });

  it('should validate email format', async () => {
    const mockRequest = {
      json: () => Promise.resolve({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Hello',
      }),
    };

    const { POST } = await import('@/app/api/chat/start/route');
    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('valid email');
  });

  it('should create chat successfully', async () => {
    const mockChat = {
      id: 'chat-123',
      session_token: 'token-456',
      visitor_name: 'Test User',
      visitor_email: 'test@example.com',
    };

    vi.mocked(createWebsiteChat).mockResolvedValue({ chat: mockChat as any, error: null });
    vi.mocked(sendWebsiteChatMessage).mockResolvedValue({ message: null, error: null });
    vi.mocked(getSalesTeamEmails).mockResolvedValue(['sales@example.com']);

    const mockRequest = {
      json: () => Promise.resolve({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Hello, I need help!',
        company: 'Test Corp',
        phone: '+1234567890',
      }),
    };

    const { POST } = await import('@/app/api/chat/start/route');
    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.chat_id).toBe('chat-123');
    expect(data.session_token).toBe('token-456');
    expect(createWebsiteChat).toHaveBeenCalledWith(
      expect.objectContaining({
        visitor_name: 'Test User',
        visitor_email: 'test@example.com',
        visitor_company: 'Test Corp',
        visitor_phone: '+1234567890',
      })
    );
  });

  it('should handle chat creation failure', async () => {
    vi.mocked(createWebsiteChat).mockResolvedValue({ chat: null, error: 'Database error' });

    const mockRequest = {
      json: () => Promise.resolve({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Hello',
      }),
    };

    const { POST } = await import('@/app/api/chat/start/route');
    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain('Failed to start chat');
  });
});

describe('Chat API - Send Message', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should validate required fields', async () => {
    const mockRequest = (body: object) => ({
      json: () => Promise.resolve(body),
    });

    const { POST } = await import('@/app/api/chat/message/route');

    // Missing chat_id
    const response1 = await POST(mockRequest({ session_token: 'token', content: 'Hello' }) as any);
    expect(response1.status).toBe(400);

    // Missing session_token
    const response2 = await POST(mockRequest({ chat_id: 'chat-123', content: 'Hello' }) as any);
    expect(response2.status).toBe(400);

    // Missing content
    const response3 = await POST(mockRequest({ chat_id: 'chat-123', session_token: 'token' }) as any);
    expect(response3.status).toBe(400);
  });

  it('should send message successfully', async () => {
    const mockChat = {
      id: 'chat-123',
      session_token: 'token-456',
      visitor_name: 'Test User',
      visitor_email: 'test@example.com',
    };

    const mockMessage = {
      id: 'msg-123',
      chat_id: 'chat-123',
      content: 'Hello!',
      sender_type: 'visitor',
      created_at: new Date().toISOString(),
    };

    vi.mocked(getWebsiteChat).mockResolvedValue({ chat: mockChat as any, error: null });
    vi.mocked(sendWebsiteChatMessage).mockResolvedValue({ message: mockMessage as any, error: null });
    vi.mocked(getSalesTeamEmails).mockResolvedValue(['sales@example.com']);

    const mockRequest = {
      json: () => Promise.resolve({
        chat_id: 'chat-123',
        session_token: 'token-456',
        content: 'Hello!',
        sender_name: 'Test User',
      }),
    };

    const { POST } = await import('@/app/api/chat/message/route');
    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(sendWebsiteChatMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        chat_id: 'chat-123',
        session_token: 'token-456',
        content: 'Hello!',
        sender_type: 'visitor',
      })
    );
  });

  it('should handle invalid session', async () => {
    vi.mocked(getWebsiteChat).mockResolvedValue({ chat: null, error: 'Invalid session' });

    const mockRequest = {
      json: () => Promise.resolve({
        chat_id: 'chat-123',
        session_token: 'invalid-token',
        content: 'Hello!',
      }),
    };

    const { POST } = await import('@/app/api/chat/message/route');
    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid session');
  });
});

describe('Chat API - Get Messages', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should validate required params', async () => {
    const mockRequest = (params: Record<string, string>) => ({
      url: `http://localhost:3000/api/chat/messages?${new URLSearchParams(params)}`,
    });

    const { GET } = await import('@/app/api/chat/messages/route');

    // Missing chat_id
    const response1 = await GET(mockRequest({ session_token: 'token' }) as any);
    expect(response1.status).toBe(400);

    // Missing session_token
    const response2 = await GET(mockRequest({ chat_id: 'chat-123' }) as any);
    expect(response2.status).toBe(400);
  });

  it('should fetch messages successfully', async () => {
    const mockMessages = [
      { id: 'msg-1', content: 'Hello', sender_type: 'visitor', created_at: '2024-01-01T00:00:00Z' },
      { id: 'msg-2', content: 'Hi there!', sender_type: 'staff', created_at: '2024-01-01T00:01:00Z' },
    ];

    vi.mocked(getWebsiteChatMessages).mockResolvedValue({ messages: mockMessages as any, error: null });

    const mockRequest = {
      url: 'http://localhost:3000/api/chat/messages?chat_id=chat-123&session_token=token-456',
    };

    const { GET } = await import('@/app/api/chat/messages/route');
    const response = await GET(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.messages).toHaveLength(2);
    expect(getWebsiteChatMessages).toHaveBeenCalledWith('chat-123', 'token-456', undefined);
  });

  it('should support after param for polling', async () => {
    vi.mocked(getWebsiteChatMessages).mockResolvedValue({ messages: [], error: null });

    const afterTime = '2024-01-01T00:00:00Z';
    const mockRequest = {
      url: `http://localhost:3000/api/chat/messages?chat_id=chat-123&session_token=token-456&after=${encodeURIComponent(afterTime)}`,
    };

    const { GET } = await import('@/app/api/chat/messages/route');
    await GET(mockRequest as any);

    expect(getWebsiteChatMessages).toHaveBeenCalledWith('chat-123', 'token-456', afterTime);
  });
});
