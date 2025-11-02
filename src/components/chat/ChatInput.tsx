'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  disabled?: boolean;
}

export function ChatInput({ disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { sendMessage, isLoading } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || disabled || isLoading) return;
    
    const messageToSend = message.trim();
    setMessage('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    await sendMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={cn(
        "relative border border-gray-300 rounded-xl bg-white transition-all duration-200",
        isFocused && "border-primary-500 shadow-sm ring-1 ring-primary-500",
        disabled && "bg-gray-50 border-gray-200"
      )}>
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled || isLoading}
          placeholder={
            disabled 
              ? "Please wait..." 
              : "Ask about phones, compare models, or get recommendations..."
          }
          rows={1}
          className={cn(
            "w-full px-4 py-3 pr-12 rounded-xl resize-none border-none outline-none",
            "placeholder-gray-500 text-gray-900 text-sm leading-relaxed",
            "disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
          )}
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled || isLoading}
          className={cn(
            "absolute right-2 bottom-2 p-2 rounded-lg transition-all duration-200",
            "flex items-center justify-center",
            message.trim() && !disabled && !isLoading
              ? "bg-primary-500 text-white hover:bg-primary-600 shadow-sm"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          )}
        </button>
      </div>

      {/* Character Count */}
      {message.length > 400 && (
        <div className="flex justify-end mt-1">
          <span className={cn(
            "text-xs",
            message.length > 500 ? "text-red-500" : "text-gray-400"
          )}>
            {message.length}/500
          </span>
        </div>
      )}

      {/* Input Hints */}
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">
            Enter
          </kbd>
          <span className="ml-1">to send</span>
        </span>
        <span className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">
            Shift + Enter
          </kbd>
          <span className="ml-1">for new line</span>
        </span>
      </div>
    </form>
  );
}