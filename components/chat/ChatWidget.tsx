"use client";

import { useReducer, useCallback } from "react";
import { ChatButton } from "./ChatButton";
import { ChatPanel } from "./ChatPanel";
import type { ChatState, ChatAction, ChatMessage } from "@/lib/chat/types";

const initialState: ChatState = {
  isOpen: false,
  isModelLoading: false,
  isProcessing: false,
  messages: [],
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "TOGGLE_CHAT":
      return { ...state, isOpen: !state.isOpen };
    case "CLOSE_CHAT":
      return { ...state, isOpen: false };
    case "CLEAR_MESSAGES":
      return { ...state, messages: [], error: null };
    case "START_LOADING_MODEL":
      return { ...state, isModelLoading: true, error: null };
    case "MODEL_LOADED":
      return { ...state, isModelLoading: false };
    case "MODEL_ERROR":
      return { ...state, isModelLoading: false, error: action.error };
    case "ADD_USER_MESSAGE": {
      const newMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: action.content,
        timestamp: new Date(),
      };
      return { ...state, messages: [...state.messages, newMessage] };
    }
    case "START_PROCESSING":
      return { ...state, isProcessing: true, error: null };
    case "ADD_ASSISTANT_MESSAGE": {
      const newMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: action.content,
        timestamp: new Date(),
        confidence: action.confidence,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
        isProcessing: false,
      };
    }
    case "PROCESSING_ERROR":
      return { ...state, isProcessing: false, error: action.error };
    default:
      return state;
  }
}

export function ChatWidget() {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const handleSendMessage = useCallback(async (message: string) => {
    dispatch({ type: "ADD_USER_MESSAGE", content: message });
    dispatch({ type: "START_PROCESSING" });

    try {
      // Build conversation history for context
      const conversationHistory = state.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/chat/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, conversationHistory }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get response');
      }

      dispatch({
        type: "ADD_ASSISTANT_MESSAGE",
        content: data.response,
        confidence: data.source === 'claude' ? 0.9 : 0.8,
      });
    } catch {
      dispatch({
        type: "PROCESSING_ERROR",
        error: "Sorry, I encountered an error. Please try again or contact us at info@microhabitat.com.",
      });
    }
  }, [state.messages]);

  const handleToggle = useCallback(() => {
    dispatch({ type: "TOGGLE_CHAT" });
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_CHAT" });
  }, []);

  const handleClearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
  }, []);

  return (
    <>
      <ChatButton isOpen={state.isOpen} onClick={handleToggle} />
      {state.isOpen && (
        <ChatPanel
          messages={state.messages}
          isModelLoading={state.isModelLoading}
          isProcessing={state.isProcessing}
          error={state.error}
          onSendMessage={handleSendMessage}
          onClose={handleClose}
          onClearMessages={handleClearMessages}
        />
      )}
    </>
  );
}
