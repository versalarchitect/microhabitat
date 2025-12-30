"use client";

import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "h-14 w-14 rounded-full",
        "bg-primary text-primary-foreground",
        "border-2 border-primary",
        "flex items-center justify-center",
        "transition-colors hover:bg-primary/90",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <MessageCircle className="h-6 w-6" />
      )}
    </button>
  );
}
