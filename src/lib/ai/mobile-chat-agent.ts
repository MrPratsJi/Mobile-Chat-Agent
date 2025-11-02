import { GoogleGenerativeAI } from '@google/generative-ai';
import { MobilePhone, AIResponse, SearchFilters } from '@/types';
import { mobilePhones } from '@/data/phones';
import { SafetyFilter } from './safety';
import { QueryParser } from './query-parser';
import { RecommendationEngine } from './recommendation-engine';

export class MobileChatAgent {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private safetyFilter: SafetyFilter;
  private queryParser: QueryParser;
  private recommendationEngine: RecommendationEngine;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.safetyFilter = new SafetyFilter();
    this.queryParser = new QueryParser();
    this.recommendationEngine = new RecommendationEngine();
  }

  async processQuery(userQuery: string, conversationHistory: string[] = []): Promise<AIResponse> {
    try {
      // Safety check first
      const safetyCheck = await this.safetyFilter.checkQuery(userQuery);
      if (!safetyCheck.passed) {
        return {
          message: "I'm here to help you find the perfect mobile phone. Please ask me about phone specifications, comparisons, or recommendations.",
          intent: 'safety_violation',
          confidence: 1.0,
          safetyCheck
        };
      }

      // Parse user intent and extract structured data
      const parsedQuery = await this.queryParser.parse(userQuery, conversationHistory);
      
      // Generate appropriate response based on intent
      switch (parsedQuery.intent) {
        case 'search':
          return await this.handleSearch(parsedQuery, userQuery);
        case 'compare':
          return await this.handleComparison(parsedQuery, userQuery);
        case 'recommend':
          return await this.handleRecommendation(parsedQuery, userQuery);
        case 'explain':
          return await this.handleExplanation(parsedQuery, userQuery);
        case 'details':
          return await this.handleProductDetails(parsedQuery, userQuery);
        default:
          return await this.handleGeneral(userQuery, conversationHistory);
      }
    } catch (error) {
      console.error('Error processing query:', error);
      
      // More detailed error information for debugging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      return {
        message: "I'm having trouble connecting to my AI service right now. Here are some phones I can recommend while we fix this: Let me suggest some popular options based on common needs.",
        phones: mobilePhones.slice(0, 3), // Show some phones even when AI fails
        intent: 'error',
        confidence: 0,
        safetyCheck: { passed: true }
      };
    }
  }

  private async handleSearch(parsedQuery: any, userQuery: string): Promise<AIResponse> {
    try {
      const filters = this.buildSearchFilters(parsedQuery);
      const matchedPhones = this.searchPhones(filters);
      
      if (matchedPhones.length === 0) {
        return {
          message: "I couldn't find any phones matching your exact criteria. Here are some popular alternatives that might interest you:",
          phones: this.recommendationEngine.getFallbackRecommendations(parsedQuery.budget),
          intent: 'search',
          confidence: 0.8,
          safetyCheck: { passed: true }
        };
      }

      // Create a simple response without using Gemini AI for now
      let response = `I found ${matchedPhones.length} phone${matchedPhones.length > 1 ? 's' : ''} matching your criteria. `;
      
      if (parsedQuery.budget) {
        response += `Within your budget of ₹${parsedQuery.budget.max?.toLocaleString() || 'your range'}, `;
      }
      
      response += `here are the top options:\n\n`;
      
      matchedPhones.slice(0, 3).forEach((phone, index) => {
        response += `${index + 1}. **${phone.name}** - ₹${phone.price.current.toLocaleString()}\n`;
        response += `   • ${phone.highlights.slice(0, 2).join(', ')}\n`;
        response += `   • Rating: ${phone.rating.overall}/5 (${phone.reviews.count} reviews)\n\n`;
      });
      
      return {
        message: response,
        phones: matchedPhones.slice(0, 6), // Limit to top 6 results
        intent: 'search',
        confidence: 0.9,
        safetyCheck: { passed: true }
      };
    } catch (error) {
      console.error('Error in handleSearch:', error);
      return {
        message: "Here are some popular phones that might interest you:",
        phones: mobilePhones.slice(0, 3),
        intent: 'search',
        confidence: 0.5,
        safetyCheck: { passed: true }
      };
    }
  }

  private async handleComparison(parsedQuery: any, userQuery: string): Promise<AIResponse> {
    const phonesToCompare = this.findPhonesForComparison(parsedQuery);
    
    if (phonesToCompare.length < 2) {
      return {
        message: "I need at least two phones to compare. Could you specify the phones you'd like me to compare?",
        intent: 'compare',
        confidence: 0.7,
        safetyCheck: { passed: true }
      };
    }

    const comparisonAnalysis = await this.generateComparisonAnalysis(phonesToCompare, parsedQuery);
    
    return {
      message: comparisonAnalysis.summary,
      comparison: {
        phones: phonesToCompare,
        analysis: comparisonAnalysis.detailed,
        winner: comparisonAnalysis.winner
      },
      intent: 'compare',
      confidence: 0.9,
      safetyCheck: { passed: true }
    };
  }

  private async handleRecommendation(parsedQuery: any, userQuery: string): Promise<AIResponse> {
    try {
      const recommendations = this.recommendationEngine.getRecommendations(parsedQuery);
      
      let response = `Based on your requirements, I recommend the **${recommendations.primary.name}** as your best option.\n\n`;
      response += `**Why this phone?**\n`;
      response += `• Price: ₹${recommendations.primary.price.current.toLocaleString()}\n`;
      response += `• Key features: ${recommendations.primary.highlights.slice(0, 3).join(', ')}\n`;
      response += `• Rating: ${recommendations.primary.rating.overall}/5\n\n`;
      
      if (recommendations.alternatives.length > 0) {
        response += `**Alternative options:**\n`;
        recommendations.alternatives.slice(0, 2).forEach((phone, index) => {
          response += `${index + 1}. ${phone.name} - ₹${phone.price.current.toLocaleString()}\n`;
        });
      }
      
      return {
        message: response,
        recommendations: {
          primary: recommendations.primary,
          alternatives: recommendations.alternatives,
          reasoning: recommendations.reasoning
        },
        intent: 'recommend',
        confidence: 0.9,
        safetyCheck: { passed: true }
      };
    } catch (error) {
      console.error('Error in handleRecommendation:', error);
      return {
        message: "Here are some great phone recommendations based on popular choices:",
        phones: mobilePhones.slice(0, 3),
        intent: 'recommend',
        confidence: 0.5,
        safetyCheck: { passed: true }
      };
    }
  }

  private async handleExplanation(parsedQuery: any, userQuery: string): Promise<AIResponse> {
    const explanation = await this.generateTechnicalExplanation(parsedQuery.topic, userQuery);
    
    return {
      message: explanation,
      intent: 'explain',
      confidence: 0.8,
      safetyCheck: { passed: true }
    };
  }

  private async handleProductDetails(parsedQuery: any, userQuery: string): Promise<AIResponse> {
    const phone = this.findPhoneByName(parsedQuery.phoneName);
    
    if (!phone) {
      return {
        message: "I couldn't find that specific phone. Could you check the spelling or try a different model?",
        intent: 'details',
        confidence: 0.6,
        safetyCheck: { passed: true }
      };
    }

    const detailedResponse = await this.generateProductDetails(phone, userQuery);
    
    return {
      message: detailedResponse,
      phones: [phone],
      intent: 'details',
      confidence: 0.9,
      safetyCheck: { passed: true }
    };
  }

  private async handleGeneral(userQuery: string, conversationHistory: string[]): Promise<AIResponse> {
    const context = this.buildConversationContext(conversationHistory);
    const response = await this.generateGeneralResponse(userQuery, context);
    
    return {
      message: response,
      intent: 'general',
      confidence: 0.7,
      safetyCheck: { passed: true }
    };
  }

  private buildSearchFilters(parsedQuery: any): SearchFilters {
    const filters: SearchFilters = {};
    
    if (parsedQuery.budget) {
      filters.priceRange = {
        min: parsedQuery.budget.min || 0,
        max: parsedQuery.budget.max || Infinity
      };
    }
    
    if (parsedQuery.brands?.length) {
      filters.brands = parsedQuery.brands;
    }
    
    if (parsedQuery.features?.length) {
      filters.features = parsedQuery.features;
    }
    
    if (parsedQuery.category) {
      filters.categories = [parsedQuery.category];
    }
    
    return filters;
  }

  private searchPhones(filters: SearchFilters): MobilePhone[] {
    return mobilePhones.filter(phone => {
      // Price filter
      if (filters.priceRange) {
        const price = phone.price.current;
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }
      
      // Brand filter
      if (filters.brands?.length && !filters.brands.includes(phone.brand)) {
        return false;
      }
      
      // Category filter
      if (filters.categories?.length && !filters.categories.includes(phone.category)) {
        return false;
      }
      
      // Feature filter
      if (filters.features?.length) {
        const phoneFeatures = [...phone.tags, ...phone.highlights, ...phone.targetAudience];
        const hasRequiredFeatures = filters.features.some(feature => 
          phoneFeatures.some(phoneFeature => 
            phoneFeature.toLowerCase().includes(feature.toLowerCase())
          )
        );
        if (!hasRequiredFeatures) {
          return false;
        }
      }
      
      return true;
    }).sort((a, b) => b.rating.overall - a.rating.overall);
  }

  private findPhonesForComparison(parsedQuery: any): MobilePhone[] {
    if (parsedQuery.phoneNames?.length) {
      return parsedQuery.phoneNames
        .map((name: string) => this.findPhoneByName(name))
        .filter(Boolean);
    }
    
    // If no specific phones mentioned, suggest top phones in category/budget
    const filters = this.buildSearchFilters(parsedQuery);
    return this.searchPhones(filters).slice(0, 3);
  }

  private findPhoneByName(name: string): MobilePhone | null {
    const normalizedName = name.toLowerCase();
    return mobilePhones.find(phone => 
      phone.name.toLowerCase().includes(normalizedName) ||
      phone.model.toLowerCase().includes(normalizedName) ||
      `${phone.brand} ${phone.model}`.toLowerCase().includes(normalizedName)
    ) || null;
  }

  private async generateSearchResponse(phones: MobilePhone[], parsedQuery: any, userQuery: string): Promise<string> {
    const phoneList = phones.map(p => `${p.name} (₹${p.price.current.toLocaleString()})`).join(', ');
    
    const prompt = `Based on the user query "${userQuery}", I found these phones: ${phoneList}. 
    Generate a helpful response that:
    1. Acknowledges their search criteria
    2. Highlights why these phones match their needs
    3. Mentions key differentiators
    4. Keeps it conversational and under 150 words`;
    
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  private async generateComparisonAnalysis(phones: MobilePhone[], parsedQuery: any) {
    const phoneDetails = phones.map(p => ({
      name: p.name,
      price: p.price.current,
      key_specs: {
        processor: p.specifications.processor.chipset,
        camera: p.specifications.camera.rear.main,
        battery: p.specifications.battery.capacity,
        display: `${p.specifications.display.size} ${p.specifications.display.type}`
      },
      pros: p.pros,
      cons: p.cons
    }));

    const prompt = `Compare these phones: ${JSON.stringify(phoneDetails)}
    
    Provide:
    1. A summary comparison (100 words)
    2. Detailed analysis focusing on key differences
    3. Recommend a winner based on overall value
    
    Be objective and mention trade-offs.`;
    
    const result = await this.model.generateContent(prompt);
    const response = result.response.text();
    
    // Simple parsing to extract winner (in a real app, you'd use more sophisticated parsing)
    const winner = phones[0].id; // Placeholder logic
    
    return {
      summary: response,
      detailed: response,
      winner
    };
  }

  private async generateRecommendationResponse(recommendations: any, parsedQuery: any, userQuery: string) {
    const prompt = `User asked: "${userQuery}"
    
    Top recommendation: ${recommendations.primary.name} (₹${recommendations.primary.price.current})
    Alternatives: ${recommendations.alternatives.map((p: MobilePhone) => p.name).join(', ')}
    
    Generate:
    1. A personalized explanation (100 words)
    2. Reasoning for the recommendation
    
    Focus on why this phone suits their needs.`;
    
    const result = await this.model.generateContent(prompt);
    const response = result.response.text();
    
    return {
      explanation: response,
      reasoning: `Based on your requirements, this phone offers the best balance of features and value.`
    };
  }

  private async generateTechnicalExplanation(topic: string, userQuery: string): Promise<string> {
    const prompt = `Explain "${topic}" in the context of mobile phones. 
    User asked: "${userQuery}"
    
    Provide a clear, technical but accessible explanation in 150 words or less.
    Focus on practical implications for phone users.`;
    
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  private async generateProductDetails(phone: MobilePhone, userQuery: string): Promise<string> {
    const prompt = `User is asking about the ${phone.name}. 
    Query: "${userQuery}"
    
    Key specs:
    - Price: ₹${phone.price.current}
    - Display: ${phone.specifications.display.size} ${phone.specifications.display.type}
    - Processor: ${phone.specifications.processor.chipset}
    - Camera: ${phone.specifications.camera.rear.main}
    - Battery: ${phone.specifications.battery.capacity}
    
    Pros: ${phone.pros.join(', ')}
    Cons: ${phone.cons.join(', ')}
    
    Provide detailed information addressing their specific question in 200 words.`;
    
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  private buildConversationContext(history: string[]): string {
    return history.slice(-6).join('\n'); // Last 6 messages for context
  }

  private async generateGeneralResponse(userQuery: string, context: string): Promise<string> {
    const prompt = `You are a mobile phone shopping assistant. 
    User query: "${userQuery}"
    Context: ${context}
    
    Provide a helpful response that guides them toward phone-related topics.
    If the query is unrelated to phones, politely redirect to phone shopping.
    Keep it under 100 words.`;
    
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}