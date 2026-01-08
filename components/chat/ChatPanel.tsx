"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X, Loader2, User, ArrowLeft, Check } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import type { ChatMessage as ChatMessageType } from "@/lib/chat/types";

interface ChatPanelProps {
  messages: ChatMessageType[];
  isModelLoading: boolean;
  isProcessing: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  onClearMessages: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What is MicroHabitat?",
  "What services do you offer?",
  "How do I get started?",
  "What are the benefits?",
  "Where do you operate?",
];

// Storage keys
const CHAT_SESSION_KEY = 'microhabitat_chat_session';

interface ChatSession {
  chat_id: string;
  session_token: string;
  visitor_name: string;
}

interface LiveMessage {
  id: string;
  content: string;
  sender_type: 'visitor' | 'staff' | 'system';
  sender_name?: string;
  created_at: string;
}

export function ChatPanel({
  messages,
  isModelLoading,
  isProcessing,
  error,
  onSendMessage,
  onClose,
  onClearMessages,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Live chat state
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [liveMessages, setLiveMessages] = useState<LiveMessage[]>([]);
  const [isLiveChatMode, setIsLiveChatMode] = useState(false);
  const [isSendingLiveMessage, setIsSendingLiveMessage] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load existing chat session from localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem(CHAT_SESSION_KEY);
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession) as ChatSession;
        setChatSession(session);
        setIsLiveChatMode(true);
        // Fetch existing messages
        fetchMessages(session.chat_id, session.session_token);
      } catch (e) {
        localStorage.removeItem(CHAT_SESSION_KEY);
      }
    }
  }, []);

  // Poll for new messages when in live chat mode
  useEffect(() => {
    if (isLiveChatMode && chatSession) {
      // Start polling
      pollIntervalRef.current = setInterval(() => {
        fetchMessages(chatSession.chat_id, chatSession.session_token, lastMessageTime || undefined);
      }, 3000); // Poll every 3 seconds

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      };
    }
  }, [isLiveChatMode, chatSession, lastMessageTime]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveMessages]);

  // Focus input when panel opens and model is ready
  useEffect(() => {
    if (!isModelLoading && !showContactForm) {
      inputRef.current?.focus();
    }
  }, [isModelLoading, showContactForm]);

  const fetchMessages = useCallback(async (chat_id: string, session_token: string, after?: string) => {
    try {
      const params = new URLSearchParams({ chat_id, session_token });
      if (after) params.append('after', after);

      const response = await fetch(`/api/chat/messages?${params}`);
      const data = await response.json();

      if (data.success && data.messages?.length > 0) {
        if (after) {
          // Append new messages
          setLiveMessages(prev => [...prev, ...data.messages]);
        } else {
          // Replace all messages
          setLiveMessages(data.messages);
        }
        // Update last message time for polling
        const lastMsg = data.messages[data.messages.length - 1];
        setLastMessageTime(lastMsg.created_at);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing && !isModelLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleLiveMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession || isSendingLiveMessage) return;

    const messageContent = input.trim();
    setInput("");
    setIsSendingLiveMessage(true);

    // Optimistically add message to UI
    const optimisticMessage: LiveMessage = {
      id: `temp-${Date.now()}`,
      content: messageContent,
      sender_type: 'visitor',
      sender_name: chatSession.visitor_name,
      created_at: new Date().toISOString(),
    };
    setLiveMessages(prev => [...prev, optimisticMessage]);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatSession.chat_id,
          session_token: chatSession.session_token,
          content: messageContent,
          sender_name: chatSession.visitor_name,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        // Remove optimistic message on error
        setLiveMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));
        setSubmitError(data.error || 'Failed to send message');
      } else if (data.message) {
        // Replace optimistic message with real message from server
        setLiveMessages(prev => prev.map(m =>
          m.id === optimisticMessage.id ? data.message : m
        ));
        // Update last message time to skip this message in polling
        setLastMessageTime(data.message.created_at);
      }
    } catch (err) {
      setLiveMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSendingLiveMessage(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone || undefined,
          company: contactForm.company || undefined,
          message: contactForm.message,
          source_url: window.location.href,
          locale: document.documentElement.lang || 'en',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start chat");
      }

      // Save session to localStorage
      const session: ChatSession = {
        chat_id: data.chat_id,
        session_token: data.session_token,
        visitor_name: contactForm.name,
      };
      localStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(session));
      setChatSession(session);

      // Add initial message to live messages
      setLiveMessages([{
        id: 'initial',
        content: contactForm.message,
        sender_type: 'visitor',
        sender_name: contactForm.name,
        created_at: new Date().toISOString(),
      }]);

      setSubmitSuccess(true);

      // Switch to live chat mode after brief success message
      setTimeout(() => {
        setShowContactForm(false);
        setSubmitSuccess(false);
        setIsLiveChatMode(true);
        setContactForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      }, 2000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Live chat mode UI
  if (isLiveChatMode && chatSession) {
    return (
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50",
          "w-[420px] max-w-[calc(100vw-3rem)]",
          "h-[600px] max-h-[calc(100vh-8rem)]",
          "bg-card border border-border rounded-md",
          "flex flex-col overflow-hidden",
          "animate-in fade-in slide-in-from-bottom-4 duration-200"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <div>
              <h3 className="text-sm font-medium text-foreground">
                Chat with MicroHabitat
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                We typically reply within minutes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {liveMessages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender_type === 'visitor' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2",
                  msg.sender_type === 'visitor'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.sender_type === 'staff' && msg.sender_name && (
                  <p className="text-xs font-medium mb-1 opacity-70">
                    {msg.sender_name}
                  </p>
                )}
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  msg.sender_type === 'visitor' ? "opacity-70" : "text-muted-foreground"
                )}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {liveMessages.length === 1 && (
            <div className="text-center py-4">
              <p className="text-xs text-muted-foreground">
                A representative will respond shortly.
              </p>
            </div>
          )}

          {submitError && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {submitError}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleLiveMessageSubmit} className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              disabled={isSendingLiveMessage}
              className={cn(
                "flex-1 px-3 py-2 text-sm",
                "border border-border rounded-md bg-background",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            />
            <button
              type="submit"
              disabled={!input.trim() || isSendingLiveMessage}
              className={cn(
                "p-2 rounded-md",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              aria-label="Send message"
            >
              {isSendingLiveMessage ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Contact form view
  if (showContactForm) {
    return (
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50",
          "w-[420px] max-w-[calc(100vw-3rem)]",
          "h-[600px] max-h-[calc(100vh-8rem)]",
          "bg-card border border-border rounded-md",
          "flex flex-col overflow-hidden",
          "animate-in fade-in slide-in-from-bottom-4 duration-200"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowContactForm(false);
                setSubmitError(null);
              }}
              className="p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to chat"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h3 className="text-sm font-medium text-foreground">
                Start a Conversation
              </h3>
              <p className="text-xs text-muted-foreground">
                We&apos;ll reply in the chat
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">
                Message Sent!
              </h4>
              <p className="text-sm text-muted-foreground">
                Opening your chat...
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className={cn(
                    "w-full px-3 py-2 text-sm",
                    "border border-border rounded-md bg-background",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className={cn(
                    "w-full px-3 py-2 text-sm",
                    "border border-border rounded-md bg-background",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, phone: e.target.value })
                  }
                  className={cn(
                    "w-full px-3 py-2 text-sm",
                    "border border-border rounded-md bg-background",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-company"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Company
                </label>
                <input
                  id="contact-company"
                  type="text"
                  value={contactForm.company}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, company: e.target.value })
                  }
                  className={cn(
                    "w-full px-3 py-2 text-sm",
                    "border border-border rounded-md bg-background",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className={cn(
                    "w-full px-3 py-2 text-sm resize-none",
                    "border border-border rounded-md bg-background",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                  placeholder="How can we help you?"
                />
              </div>

              {submitError && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-2.5 px-4 text-sm font-medium rounded-md",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Starting chat...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Start Chat
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Main chat view (AI assistant)
  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-50",
        "w-[360px] max-w-[calc(100vw-3rem)]",
        "h-[500px] max-h-[calc(100vh-8rem)]",
        "bg-card border border-border rounded-md",
        "flex flex-col overflow-hidden",
        "animate-in fade-in slide-in-from-bottom-4 duration-200"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          {messages.length > 0 && !isModelLoading ? (
            <button
              type="button"
              onClick={onClearMessages}
              className="p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to questions"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <Logo size="sm" />
          )}
          <div>
            <h3 className="text-sm font-medium text-foreground">
              MicroHabitat Assistant
            </h3>
            <p className="text-xs text-muted-foreground">
              {messages.length > 0 && !isModelLoading
                ? "Back to suggested questions"
                : "Ask about our urban farming services"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isModelLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
            <p className="text-sm text-muted-foreground">
              Loading AI assistant...
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              This may take a moment on first load
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Hi! I can help answer questions about MicroHabitat&apos;s urban
              farming services.
            </p>
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Quick questions:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED_QUESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => onSendMessage(suggestion)}
                    className="text-xs px-3 py-1.5 border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-border mt-4">
                <p className="text-xs text-muted-foreground mb-2">
                  Or speak with someone directly:
                </p>
                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  className={cn(
                    "flex items-center justify-center gap-2 w-full",
                    "text-sm px-4 py-2.5 rounded-md",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90 transition-colors"
                  )}
                >
                  <User className="h-4 w-4" />
                  Contact a Representative
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isProcessing && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}

            {/* Show contact button after messages */}
            {messages.length > 0 && !isProcessing && (
              <div className="pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <User className="h-3 w-3" />
                  Contact a representative
                </button>
              </div>
            )}
          </>
        )}
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isModelLoading || isProcessing}
            className={cn(
              "flex-1 px-3 py-2 text-sm",
              "border border-border rounded-md bg-background",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          />
          <button
            type="submit"
            disabled={!input.trim() || isModelLoading || isProcessing}
            className={cn(
              "p-2 rounded-md",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
