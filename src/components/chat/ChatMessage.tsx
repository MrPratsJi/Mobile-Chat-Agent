'use client';

import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types';
import { formatMessageTime, cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl",
        "rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "bg-primary-500 text-white" 
          : "bg-gray-100 text-gray-900 border border-gray-200"
      )}>
        <div className="space-y-2">
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="text-sm leading-relaxed mb-2 last:mb-0">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="text-sm space-y-1 ml-4 list-disc">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="text-sm space-y-1 ml-4 list-decimal">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-xs">
                      {children}
                    </code>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className={cn(
          "flex items-center justify-between mt-2 pt-2",
          "border-t border-opacity-20",
          isUser ? "border-white" : "border-gray-300"
        )}>
          <span className={cn(
            "text-xs",
            isUser ? "text-primary-100" : "text-gray-500"
          )}>
            {formatMessageTime(message.timestamp)}
          </span>
          
          {!isUser && message.metadata?.confidence && (
            <div className="flex items-center space-x-1">
              <ConfidenceIndicator confidence={message.metadata.confidence} />
              <span className="text-xs text-gray-400">
                {Math.round(message.metadata.confidence * 100)}%
              </span>
            </div>
          )}
        </div>

        {!isUser && message.metadata?.intent && message.metadata.intent !== 'general' && (
          <div className="mt-2">
            <IntentBadge intent={message.metadata.intent} />
          </div>
        )}
      </div>
    </div>
  );
}

function ConfidenceIndicator({ confidence }: { confidence: number }) {
  const getColor = (conf: number) => {
    if (conf >= 0.8) return 'text-green-500';
    if (conf >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getIcon = (conf: number) => {
    if (conf >= 0.8) return '●';
    if (conf >= 0.6) return '◐';
    return '○';
  };

  return (
    <span className={cn("text-xs", getColor(confidence))}>
      {getIcon(confidence)}
    </span>
  );
}

function IntentBadge({ intent }: { intent: string }) {
  const getBadgeStyle = (intent: string) => {
    switch (intent) {
      case 'search':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'compare':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'recommend':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'explain':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'details':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getIntentLabel = (intent: string) => {
    switch (intent) {
      case 'search': return 'Search';
      case 'compare': return 'Compare';
      case 'recommend': return 'Recommend';
      case 'explain': return 'Explain';
      case 'details': return 'Details';
      default: return intent;
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
      getBadgeStyle(intent)
    )}>
      {getIntentLabel(intent)}
    </span>
  );
}