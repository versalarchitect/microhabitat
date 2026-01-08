"use client";

import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/lib/chat/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

// Parse and render formatted content
function FormattedContent({ content }: { content: string }) {
  // Split content into paragraphs/sections
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="space-y-1.5 my-2">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-1 flex-shrink-0">•</span>
              <span>{formatInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  // Format inline text (bold, links)
  const formatInlineText = (text: string): React.ReactNode => {
    // Simple regex-based formatting - process bold, then links, then URLs
    let result: React.ReactNode[] = [text];
    let keyCounter = 0;

    // Helper to process a single pattern across all string segments
    const processPattern = (
      segments: React.ReactNode[],
      pattern: RegExp,
      replacer: (match: RegExpExecArray) => React.ReactNode
    ): React.ReactNode[] => {
      const newSegments: React.ReactNode[] = [];
      for (const segment of segments) {
        if (typeof segment !== 'string') {
          newSegments.push(segment);
          continue;
        }
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        const regex = new RegExp(pattern.source, 'g');
        while ((match = regex.exec(segment)) !== null) {
          if (match.index > lastIndex) {
            newSegments.push(segment.slice(lastIndex, match.index));
          }
          newSegments.push(replacer(match));
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < segment.length) {
          newSegments.push(segment.slice(lastIndex));
        }
      }
      return newSegments;
    };

    // Process bold **text**
    result = processPattern(result, /\*\*([^*]+)\*\*/, (match) => (
      <strong key={`bold-${keyCounter++}`} className="font-semibold">{match[1]}</strong>
    ));

    // Process markdown links [text](url)
    result = processPattern(result, /\[([^\]]+)\]\(([^)]+)\)/, (match) => (
      <a key={`link-${keyCounter++}`} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">{match[1]}</a>
    ));

    // Process plain URLs (but not ones we just converted from markdown links)
    result = processPattern(result, /(https?:\/\/[^\s]+)/, (match) => {
      const url = match[1];
      const displayUrl = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
      return <a key={`url-${keyCounter++}`} href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">{displayUrl}</a>;
    });

    return result.length === 1 ? result[0] : <>{result}</>;
  };

  lines.forEach((line, lineIndex) => {
    const trimmed = line.trim();

    // Check for bullet points
    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const bulletContent = trimmed.replace(/^[•\-*]\s*/, '');
      currentList.push(bulletContent);
    } else if (trimmed === '') {
      flushList();
      // Add small spacing for empty lines
      elements.push(<div key={`space-${lineIndex}`} className="h-2" />);
    } else {
      flushList();
      // Regular paragraph - check if it's a header-like line
      const isHeader = trimmed.startsWith('##') || (trimmed.endsWith(':') && trimmed.length < 50);
      const headerContent = trimmed.replace(/^#+\s*/, '').replace(/:$/, '');

      if (isHeader) {
        elements.push(
          <p key={`header-${lineIndex}`} className="font-semibold text-foreground mt-2 mb-1">
            {headerContent}
          </p>
        );
      } else {
        elements.push(
          <p key={`para-${lineIndex}`} className="leading-relaxed">
            {formatInlineText(trimmed)}
          </p>
        );
      }
    }
  });

  flushList();

  return <div className="space-y-1">{elements}</div>;
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
        {isUser ? (
          message.content
        ) : (
          <FormattedContent content={message.content} />
        )}
      </div>
    </div>
  );
}
