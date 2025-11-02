'use client';

import { useEffect } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { PhoneDetailsModal } from '@/components/modals/PhoneDetailsModal';
import { PhoneComparisonModal } from '@/components/modals/PhoneComparisonModal';
import { ComparisonToolbar } from '@/components/ui/ComparisonToolbar';
import { useChatStore } from '@/lib/store/chat-store';

export default function HomePage() {
  const { agent, initializeAgent, startNewSession } = useChatStore();

  useEffect(() => {
    if (!agent) {
      initializeAgent('server-key');
    }

    startNewSession();
  }, [agent, initializeAgent, startNewSession]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mobile Chat Agent
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your AI-powered shopping assistant for finding the perfect mobile phone. 
            Ask about specifications, compare models, or get personalized recommendations.
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <ChatInterface />
        </div>
        
        <PhoneDetailsModal />
        <PhoneComparisonModal />
        
        <ComparisonToolbar />
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>
            Powered by Google Gemini AI • Built with Next.js & TypeScript
          </p>
          <p className="mt-2">
            🔒 Your conversations are private and secure
          </p>
        </footer>
      </div>
    </main>
  );
}