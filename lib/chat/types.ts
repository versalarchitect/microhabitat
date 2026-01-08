export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  confidence?: number;
}

export interface ChatState {
  isOpen: boolean;
  isModelLoading: boolean;
  isProcessing: boolean;
  messages: ChatMessage[];
  error: string | null;
}

export type ChatAction =
  | { type: 'TOGGLE_CHAT' }
  | { type: 'CLOSE_CHAT' }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'START_LOADING_MODEL' }
  | { type: 'MODEL_LOADED' }
  | { type: 'MODEL_ERROR'; error: string }
  | { type: 'ADD_USER_MESSAGE'; content: string }
  | { type: 'START_PROCESSING' }
  | { type: 'ADD_ASSISTANT_MESSAGE'; content: string; confidence: number }
  | { type: 'PROCESSING_ERROR'; error: string };
