// Test setup file
import { vi } from 'vitest';

// Mock environment variables
process.env.MYURBANFARM_SUPABASE_URL = 'https://cuzozmvjqkatxkzdkojj.supabase.co';
process.env.MYURBANFARM_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.MYURBANFARM_URL = 'https://www.myurbanfarm.ai';
process.env.RESEND_API_KEY = 'test-resend-key';
process.env.EMAIL_FROM = 'team@microhabitat.com';

// Mock fetch globally
global.fetch = vi.fn();
