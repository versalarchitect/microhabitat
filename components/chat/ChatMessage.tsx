"use client";

import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/lib/chat/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] px-3 py-2 rounded-md text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground border border-border"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
