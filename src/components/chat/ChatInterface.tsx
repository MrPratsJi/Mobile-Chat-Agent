'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { PhoneGrid } from '../phones/PhoneGrid';
import { PhoneComparison } from '../phones/PhoneComparison';
import { cn } from '@/lib/utils';

export function ChatInterface() {
  const { currentSession, isLoading, isTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Starting new conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-primary-500 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Mobile Shopping Assistant</h2>
            <p className="text-primary-100 text-sm">
              {currentSession.messages.length} messages • Ready to help
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        className="h-96 md:h-[500px] overflow-y-auto px-6 py-4 space-y-4"
        onScroll={handleScroll}
      >
        {currentSession.messages.map((message) => (
          <div key={message.id}>
            <ChatMessage message={message} />
            
            {message.metadata?.phones && (
              <div className="mt-4">
                <PhoneGrid phones={message.metadata.phones} />
              </div>
            )}
            
            {message.metadata?.comparison && (
              <div className="mt-4">
                <PhoneComparison comparison={message.metadata.comparison} />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-8 bg-primary-500 text-white p-2 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
          aria-label="Scroll to bottom"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}

      {/* Chat Input */}
      <div className="border-t border-gray-200 p-4">
        <ChatInput disabled={isLoading} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-6 pb-4">
        <QuickSuggestions />
      </div>
    </div>
  );
}

function QuickSuggestions() {
  const { sendMessage } = useChatStore();
  
  const suggestions = [
    "Best camera phone under ₹30,000?",
    "Compare iPhone 15 Pro vs Pixel 8a",
    "Gaming phones with good battery life",
    "Compact phones for one-hand use",
    "Budget phones with 5G support"
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500 font-medium">Quick suggestions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => sendMessage(suggestion)}
            className={cn(
              "px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full",
              "hover:bg-primary-100 hover:text-primary-700 transition-colors",
              "border border-gray-200 hover:border-primary-200"
            )}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}