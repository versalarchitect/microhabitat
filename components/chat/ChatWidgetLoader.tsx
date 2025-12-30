"use client";

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to prevent transformers.js from loading on server
const ChatWidget = dynamic(
  () => import('./ChatWidget').then((mod) => mod.ChatWidget),
  { ssr: false }
);

export function ChatWidgetLoader() {
  return <ChatWidget />;
}
