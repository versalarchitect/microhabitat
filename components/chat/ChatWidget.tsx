"use client";

import { useReducer, useCallback, useRef, useEffect } from "react";
import { ChatButton } from "./ChatButton";
import { ChatPanel } from "./ChatPanel";
import { loadModel, askQuestion, isModelLoaded } from "@/lib/chat/chatbot";
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
  const hasInitiatedLoad = useRef(false);

  // Lazy load model when chat is first opened
  useEffect(() => {
    if (state.isOpen && !hasInitiatedLoad.current && !isModelLoaded()) {
      hasInitiatedLoad.current = true;
      dispatch({ type: "START_LOADING_MODEL" });

      loadModel()
        .then(() => dispatch({ type: "MODEL_LOADED" }))
        .catch((err) =>
          dispatch({
            type: "MODEL_ERROR",
            error: `Failed to load AI assistant: ${err.message}`,
          })
        );
    }
  }, [state.isOpen]);

  const handleSendMessage = useCallback(async (message: string) => {
    dispatch({ type: "ADD_USER_MESSAGE", content: message });
    dispatch({ type: "START_PROCESSING" });

    try {
      const response = await askQuestion(message);
      dispatch({
        type: "ADD_ASSISTANT_MESSAGE",
        content: response.answer,
        confidence: response.confidence,
      });
    } catch {
      dispatch({
        type: "PROCESSING_ERROR",
        error: "Sorry, I encountered an error. Please try again.",
      });
    }
  }, []);

  const handleToggle = useCallback(() => {
    dispatch({ type: "TOGGLE_CHAT" });
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_CHAT" });
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
        />
      )}
    </>
  );
}
