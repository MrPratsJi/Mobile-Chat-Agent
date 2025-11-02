import { create } from 'zustand';
import { ChatMessage, ChatSession, MobilePhone, AIResponse } from '@/types';
import { SimplifiedMobileChatAgent } from '@/lib/ai/simplified-chat-agent';

interface ChatStore {
  // State
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  isLoading: boolean;
  isTyping: boolean;
  agent: SimplifiedMobileChatAgent | null;
  
  // Actions
  initializeAgent: (apiKey: string) => void;
  startNewSession: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearCurrentSession: () => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  setTyping: (typing: boolean) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useChatStore = create<ChatStore>()((set, get) => ({
  // Initial state
  currentSession: null,
  sessions: [],
  isLoading: false,
  isTyping: false,
  agent: null,

  // Initialize the AI agent
  initializeAgent: (apiKey: string) => {
    const agent = new SimplifiedMobileChatAgent(apiKey);
    set({ agent });
  },

  // Start a new chat session
  startNewSession: () => {
    const newSession: ChatSession = {
      id: generateId(),
      messages: [
        {
          id: generateId(),
          type: 'assistant',
          content: "Hi! I'm your mobile phone shopping assistant. I can help you find the perfect phone, compare models, explain technical features, and recommend devices based on your needs and budget. What kind of phone are you looking for?",
          timestamp: new Date(),
          metadata: {
            intent: 'greeting',
            confidence: 1.0
          }
        }
      ],
      context: {
        preferences: {}
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    set((state: ChatStore) => ({
      currentSession: newSession,
      sessions: [newSession, ...state.sessions]
    }));
  },

  // Send a message and get AI response
  sendMessage: async (content: string) => {
    const { currentSession, agent } = get();
    
    if (!currentSession || !agent) {
      console.error('No active session or agent not initialized');
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    set((state: ChatStore) => ({
      currentSession: state.currentSession ? {
        ...state.currentSession,
        messages: [...state.currentSession.messages, userMessage],
        updatedAt: new Date()
      } : null,
      isLoading: true,
      isTyping: true
    }));

    try {
      // Prepare conversation history for context
      const conversationHistory = currentSession.messages.map((msg: ChatMessage) => 
        `${msg.type}: ${msg.content}`
      );

      // Get AI response
      const aiResponse: AIResponse = await agent.processQuery(content, conversationHistory);

      // Create assistant message with simplified metadata
      const assistantMessage: ChatMessage = {
        id: generateId(),
        type: 'assistant',
        content: aiResponse.message,
        timestamp: new Date(),
        metadata: {
          phones: aiResponse.phones,
          comparison: aiResponse.comparison ? {
            phones: aiResponse.comparison.phones,
            analysis: aiResponse.comparison.analysis,
            winner: aiResponse.comparison.winner
          } : undefined,
          recommendations: aiResponse.recommendations,
          intent: aiResponse.intent,
          confidence: aiResponse.confidence
        }
      };

      // Update session with assistant response
      set((state: ChatStore) => {
        if (!state.currentSession) return state;

        const updatedSession = {
          ...state.currentSession,
          messages: [...state.currentSession.messages, assistantMessage],
          context: {
            ...state.currentSession.context,
            lastQuery: content,
            // Update preferences based on AI response
            preferences: {
              ...state.currentSession.context.preferences,
              ...(aiResponse.phones && { 
                brands: Array.from(new Set([
                  ...(state.currentSession.context.preferences.brands || []),
                  ...aiResponse.phones.map((p: MobilePhone) => p.brand)
                ]))
              })
            }
          },
          updatedAt: new Date()
        };

        return {
          currentSession: updatedSession,
          sessions: state.sessions.map((session: ChatSession) => 
            session.id === updatedSession.id ? updatedSession : session
          ),
          isLoading: false,
          isTyping: false
        };
      });

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: generateId(),
        type: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again or rephrase your question.",
        timestamp: new Date(),
        metadata: {
          intent: 'error',
          confidence: 0
        }
      };

      set((state: ChatStore) => ({
        currentSession: state.currentSession ? {
          ...state.currentSession,
          messages: [...state.currentSession.messages, errorMessage],
          updatedAt: new Date()
        } : null,
        isLoading: false,
        isTyping: false
      }));
    }
  },

  // Clear current session
  clearCurrentSession: () => {
    set({ currentSession: null });
  },

  // Load a specific session
  loadSession: (sessionId: string) => {
    const { sessions } = get();
    const session = sessions.find((s: ChatSession) => s.id === sessionId);
    if (session) {
      set({ currentSession: session });
    }
  },

  // Delete a session
  deleteSession: (sessionId: string) => {
    set((state: ChatStore) => ({
      sessions: state.sessions.filter((s: ChatSession) => s.id !== sessionId),
      currentSession: state.currentSession?.id === sessionId ? null : state.currentSession
    }));
  },

  // Set typing indicator
  setTyping: (typing: boolean) => {
    set({ isTyping: typing });
  }
}));

// Utility function to get phone details by ID
export const getPhoneById = (phoneId: string, phones: MobilePhone[]): MobilePhone | null => {
  return phones.find(phone => phone.id === phoneId) || null;
};

// Utility function to format message timestamp
export const formatMessageTime = (timestamp: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(timestamp);
};

// Utility function to get session summary
export const getSessionSummary = (session: ChatSession): string => {
  const userMessages = session.messages.filter(msg => msg.type === 'user');
  if (userMessages.length === 0) return 'New conversation';
  
  const firstMessage = userMessages[0].content;
  return firstMessage.length > 50 
    ? firstMessage.substring(0, 50) + '...'
    : firstMessage;
};