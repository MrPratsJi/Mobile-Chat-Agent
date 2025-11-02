'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm text-gray-500">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
}