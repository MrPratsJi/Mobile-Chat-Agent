import { MobilePhone, AIResponse, SearchFilters } from '@/types';
import { mobilePhones } from '@/data/phones';

export class SimplifiedMobileChatAgent {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async processQuery(userQuery: string, conversationHistory: string[] = []): Promise<AIResponse> {
    try {
      console.log('Processing query:', userQuery);
      
      // Safety check first - reject adversarial prompts
      const safetyCheck = this.checkSafety(userQuery);
      if (!safetyCheck.passed) {
        return {
          message: safetyCheck.reason || "I'm designed to help you find mobile phones. Please ask me about phone specifications, comparisons, or recommendations!",
          phones: [],
          intent: 'safety_violation',
          confidence: 1.0,
          safetyCheck
        };
      }
      
      // Simple intent detection
      const intent = this.detectIntent(userQuery);
      console.log('Detected intent:', intent);
      
      switch (intent) {
        case 'search':
          return this.handleSearch(userQuery);
        case 'specific_search':
          return this.handleSpecificPhoneSearch(userQuery);
        case 'compare':
          return this.handleComparison(userQuery);
        case 'recommend':
          return this.handleRecommendation(userQuery);
        default:
          return this.handleGeneral(userQuery);
      }
    } catch (error) {
      console.error('Error in processQuery:', error);
      return {
        message: "I'm here to help you find the perfect mobile phone! Try asking me about:\n\n• Best phones under a budget\n• Phone comparisons\n• Camera phones\n• Gaming phones\n• Battery life champions",
        phones: mobilePhones.slice(0, 3),
        intent: 'error',
        confidence: 0.8,
        safetyCheck: { passed: true }
      };
    }
  }

  private checkSafety(query: string): { passed: boolean; reason?: string } {
    const lowerQuery = query.toLowerCase();
    
    // Check for attempts to reveal system prompts or internal logic
    const promptRevealAttempts = [
      'system prompt', 'hidden prompt', 'your prompt', 'reveal prompt',
      'ignore your rules', 'ignore instructions', 'ignore your instructions',
      'internal logic', 'how you work', 'your algorithm', 'your code'
    ];
    
    // Check for API key requests
    const apiKeyAttempts = [
      'api key', 'tell me your api key', 'show me your api key',
      'what is your api key', 'reveal your api key', 'your key'
    ];
    
    // Check for toxic/defamatory content
    const toxicContent = [
      'trash', 'garbage', 'worst', 'horrible', 'terrible',
      'sucks', 'awful', 'pathetic', 'useless'
    ];
    
    // Check for completely irrelevant requests
    const irrelevantContent = [
      'weather', 'stock market', 'cooking', 'travel', 'news',
      'politics', 'sports', 'movies', 'music', 'games'
    ];
    
    // Safety violations
    for (const attempt of promptRevealAttempts) {
      if (lowerQuery.includes(attempt)) {
        return { 
          passed: false, 
          reason: "I'm designed to help you find mobile phones. I can't share information about my internal workings. Ask me about phone specs, comparisons, or recommendations instead!" 
        };
      }
    }
    
    for (const attempt of apiKeyAttempts) {
      if (lowerQuery.includes(attempt)) {
        return { 
          passed: false, 
          reason: "I can't share API keys or sensitive information. Let me help you find the perfect mobile phone instead!" 
        };
      }
    }
    
    // Check for defamatory content about phone brands
    for (const toxic of toxicContent) {
      if (lowerQuery.includes(toxic)) {
        return { 
          passed: false, 
          reason: "I maintain a neutral and factual approach when discussing mobile phones. Let me help you find phones based on your specific needs and budget!" 
        };
      }
    }
    
    // Check if query is completely unrelated to mobile phones
    const phoneRelated = [
      'phone', 'mobile', 'smartphone', 'iphone', 'android', 'samsung', 'pixel',
      'oneplus', 'xiaomi', 'oppo', 'vivo', 'realme', 'camera', 'battery',
      'display', 'processor', 'storage', 'ram', 'budget', 'price', 'buy'
    ];
    
    const isPhoneRelated = phoneRelated.some(term => lowerQuery.includes(term));
    
    if (!isPhoneRelated) {
      for (const irrelevant of irrelevantContent) {
        if (lowerQuery.includes(irrelevant)) {
          return { 
            passed: false, 
            reason: "I specialize in mobile phone recommendations and information. Ask me about phone specifications, comparisons, or finding the best phone for your needs!" 
          };
        }
      }
    }
    
    return { passed: true };
  }

  private detectIntent(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('compare') || lowerQuery.includes('vs') || lowerQuery.includes('versus')) {
      return 'compare';
    }
    if (lowerQuery.includes('recommend') || lowerQuery.includes('suggest') || lowerQuery.includes('should i')) {
      return 'recommend';
    }
    // Check for specific phone model searches
    if (this.isSpecificPhoneSearch(query)) {
      return 'specific_search';
    }
    if (lowerQuery.includes('best') || lowerQuery.includes('find') || lowerQuery.includes('under') || lowerQuery.includes('budget') ||
        lowerQuery.includes('gaming') || lowerQuery.includes('camera') || lowerQuery.includes('battery') ||
        lowerQuery.includes('phones with') || lowerQuery.includes('show me') || lowerQuery.includes('search') ||
        lowerQuery.includes('compact') || lowerQuery.includes('small') || lowerQuery.includes('large') ||
        lowerQuery.includes('fast charging') || lowerQuery.includes('5g') || lowerQuery.includes('wireless charging') ||
        lowerQuery.includes('waterproof') || lowerQuery.includes('lightweight') || lowerQuery.includes('durable') ||
        lowerQuery.includes('performance') || lowerQuery.includes('display') || lowerQuery.includes('screen') ||
        lowerQuery.includes('storage') || lowerQuery.includes('ram') || lowerQuery.includes('processor') ||
        lowerQuery.includes('one-hand') || lowerQuery.includes('one hand') || lowerQuery.includes('portable') ||
        lowerQuery.includes('flagship') || lowerQuery.includes('premium') || lowerQuery.includes('affordable') ||
        lowerQuery.includes('value') || lowerQuery.includes('cheap') || lowerQuery.includes('expensive') ||
        lowerQuery.includes('long lasting') || lowerQuery.includes('fast') || lowerQuery.includes('slow') ||
        lowerQuery.includes('good') || lowerQuery.includes('excellent') || lowerQuery.includes('amazing')) {
      return 'search';
    }
    return 'general';
  }

  private isSpecificPhoneSearch(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    
    // Common phone model patterns
    const phoneModelPatterns = [
      /iphone \d+/,
      /galaxy s\d+/,
      /pixel \d+/,
      /oneplus \d+/,
      /redmi note \d+/,
      /realme \d+/,
      /poco [a-z]\d+/,
      /nothing phone/,
      /motorola edge/,
      /vivo v\d+/,
      /oppo find/,
      /xiaomi \d+/
    ];
    
    // Check if query contains specific model numbers or names
    const hasModelPattern = phoneModelPatterns.some(pattern => pattern.test(lowerQuery));
    
    // Check for direct phone name mentions
    const phoneKeywords = ['iphone', 'galaxy', 'pixel', 'oneplus', 'redmi', 'realme', 'poco', 'nothing phone', 'motorola', 'vivo', 'oppo', 'xiaomi'];
    const hasPhoneName = phoneKeywords.some(keyword => lowerQuery.includes(keyword));
    
    // Look for specific search patterns like "tell me about", "details of", "info about"
    const specificSearchTerms = ['tell me about', 'details of', 'info about', 'information on', 'specs of', 'specifications of'];
    const hasSpecificSearchTerm = specificSearchTerms.some(term => lowerQuery.includes(term));
    
    return hasModelPattern || (hasPhoneName && hasSpecificSearchTerm);
  }

  private handleSearch(userQuery: string): AIResponse {
    console.log('Handling search for:', userQuery);
    
    // Extract budget from query
    const budgetMatch = userQuery.match(/(\d+),?(\d+)/);
    let maxBudget = 50000; // Default budget
    let budgetFromQuery = false;
    
    if (budgetMatch) {
      const number = parseInt(budgetMatch[0].replace(',', ''));
      maxBudget = number < 1000 ? number * 1000 : number; // Convert 30 to 30000
      budgetFromQuery = true;
      
      // Handle "around" budget - add some flexibility
      if (userQuery.toLowerCase().includes('around') || userQuery.toLowerCase().includes('approximately')) {
        maxBudget = maxBudget * 1.2; // Allow 20% over budget
      }
    }

    // Start with all phones
    let filteredPhones = [...mobilePhones];
    
    // Filter by brand if specified
    const query = userQuery.toLowerCase();
    const brandFilters = [
      { name: 'samsung', brands: ['Samsung'] },
      { name: 'apple', brands: ['Apple'] },
      { name: 'iphone', brands: ['Apple'] },
      { name: 'google', brands: ['Google'] },
      { name: 'pixel', brands: ['Google'] },
      { name: 'oneplus', brands: ['OnePlus'] },
      { name: 'xiaomi', brands: ['Xiaomi'] },
      { name: 'redmi', brands: ['Xiaomi'] },
      { name: 'oppo', brands: ['Oppo'] },
      { name: 'vivo', brands: ['Vivo'] },
      { name: 'realme', brands: ['Realme'] },
      { name: 'nothing', brands: ['Nothing'] },
      { name: 'motorola', brands: ['Motorola'] }
    ];
    
    for (const brandFilter of brandFilters) {
      if (query.includes(brandFilter.name)) {
        filteredPhones = filteredPhones.filter(phone => 
          brandFilter.brands.includes(phone.brand)
        );
        break;
      }
    }
    
    // Filter by budget
    filteredPhones = filteredPhones.filter(phone => phone.price.current <= maxBudget);
    
    // Sort by rating
    filteredPhones.sort((a, b) => b.rating.overall - a.rating.overall);

    // Filter by features mentioned in query
    if (query.includes('camera') || query.includes('photo')) {
      filteredPhones = filteredPhones.filter(phone => 
        phone.tags.includes('camera') || phone.rating.camera >= 4.2
      );
    }
    if (query.includes('gaming') || query.includes('performance')) {
      filteredPhones = filteredPhones.filter(phone => 
        phone.tags.includes('gaming') || phone.tags.includes('performance') || phone.rating.performance >= 4.3
      );
    }
    if (query.includes('battery')) {
      filteredPhones = filteredPhones.filter(phone => 
        phone.rating.battery >= 4.2 || parseInt(phone.specifications.battery.capacity) >= 4500
      );
    }
    if (query.includes('compact') || query.includes('small') || query.includes('one-hand') || query.includes('one hand') || query.includes('portable')) {
      filteredPhones = filteredPhones.filter(phone => {
        const displaySize = parseFloat(phone.specifications.display.size);
        return displaySize <= 6.3; // Phones 6.3" and below are considered compact
      });
    }
    if (query.includes('large') || query.includes('big screen') || query.includes('big display')) {
      filteredPhones = filteredPhones.filter(phone => {
        const displaySize = parseFloat(phone.specifications.display.size);
        return displaySize >= 6.7; // Phones 6.7" and above are considered large
      });
    }
    if (query.includes('fast charging') || query.includes('quick charging')) {
      filteredPhones = filteredPhones.filter(phone => 
        phone.tags.includes('fast-charging') || 
        phone.highlights.some(h => h.toLowerCase().includes('fast charging')) ||
        phone.specifications.battery.charging.wired.includes('W') && 
        parseInt(phone.specifications.battery.charging.wired) >= 25
      );
    }
    if (query.includes('5g')) {
      filteredPhones = filteredPhones.filter(phone => 
        phone.tags.includes('5g') || 
        phone.specifications.connectivity.network.includes('5G')
      );
    }
    if (query.includes('wireless charging')) {
      filteredPhones = filteredPhones.filter(phone => 
        phone.specifications.battery.charging.wireless !== undefined
      );
    }
    if (query.includes('premium') || query.includes('flagship')) {
      filteredPhones = filteredPhones.filter(phone => 
        phone.category === 'premium' || phone.category === 'flagship' || phone.price.current >= 50000
      );
    }
    if (query.includes('budget') || query.includes('affordable') || query.includes('cheap') || query.includes('value')) {
      filteredPhones = filteredPhones.filter(phone => 
        phone.category === 'budget' || phone.tags.includes('value') || phone.price.current <= 25000
      );
    }

    // Check if no phones found with filters
    if (filteredPhones.length === 0) {
      const requestedBrand = brandFilters.find(bf => query.includes(bf.name));
      if (requestedBrand) {
        return {
          message: `I couldn't find any ${requestedBrand.brands[0]} phones under ₹${(maxBudget / 1000).toFixed(0)}k in our current database. 📱\n\n**Try exploring:**\n• "${requestedBrand.brands[0]} phones under ₹${Math.ceil(maxBudget * 1.5 / 5000) * 5}k"\n• "Best ${requestedBrand.brands[0]} phones" (any budget)\n• "Budget phones with good features"\n• "${requestedBrand.brands[0]} phones with specific features"\n\n**Or discover:**\n• Gaming phones in your budget\n• Camera phones\n• Battery life champions\n• 5G phones under ₹25k`,
          phones: [], // No phones shown for brand-specific no results
          intent: 'search',
          confidence: 0.9,
          safetyCheck: { passed: true }
        };
      }
      
      // Handle no results for specific feature searches
      const isGamingQuery = query.includes('gaming') || query.includes('performance');
      const isCameraQuery = query.includes('camera') || query.includes('photo');
      const isBatteryQuery = query.includes('battery') || query.includes('battery king');
      const isFastChargingQuery = query.includes('fast charging') || query.includes('quick charging');
      
      let noResultsMessage = '';
      let suggestedBudget = Math.ceil(maxBudget / 5000) * 5000; // Round up to nearest 5k
      
      if (budgetFromQuery) {
        if (isBatteryQuery && isFastChargingQuery) {
          noResultsMessage = `No phones found with excellent battery life and fast charging under ₹${(maxBudget / 1000).toFixed(0)}k. 📱\n\n**Try exploring:**\n• Increase budget to ₹${(suggestedBudget / 1000).toFixed(0)}k for better battery phones\n• Search "best battery phones" (without budget limit)\n• Look for "phones with fast charging under ₹25k"\n• Try "budget phones with good battery life"\n\n**Or ask me about:**\n• Gaming phones\n• Camera phones\n• 5G phones under your budget`;
        } else if (isBatteryQuery) {
          noResultsMessage = `No phones found with excellent battery life under ₹${(maxBudget / 1000).toFixed(0)}k. 🔋\n\n**Try exploring:**\n• "Battery phones under ₹${(suggestedBudget / 1000).toFixed(0)}k"\n• "Best battery life phones" (any budget)\n• "Phones with 5000mAh battery"\n• "Long lasting phones under ₹25k"\n\n**Or discover:**\n• Gaming phones in your budget\n• Camera phones\n• Fast charging phones`;
        } else if (isCameraQuery) {
          noResultsMessage = `No phones found with excellent camera under ₹${(maxBudget / 1000).toFixed(0)}k. 📸\n\n**Try exploring:**\n• "Camera phones under ₹${(suggestedBudget / 1000).toFixed(0)}k"\n• "Best camera phones" (any budget)\n• "Photography phones under ₹25k"\n• "Phones with good camera"\n\n**Or check out:**\n• Gaming phones\n• Battery phones\n• 5G phones in your range`;
        } else if (isGamingQuery) {
          noResultsMessage = `No gaming phones found under ₹${(maxBudget / 1000).toFixed(0)}k. 🎮\n\n**Try exploring:**\n• "Gaming phones under ₹${(suggestedBudget / 1000).toFixed(0)}k"\n• "Best performance phones" (any budget)\n• "Fast phones under ₹25k"\n• "Phones for gaming"\n\n**Or explore:**\n• Camera phones\n• Battery phones\n• 5G phones in your budget`;
        } else {
          noResultsMessage = `No phones found matching your criteria under ₹${(maxBudget / 1000).toFixed(0)}k. 😊\n\n**Try exploring:**\n• "Best phones under ₹${(suggestedBudget / 1000).toFixed(0)}k"\n• "Budget phones with good features"\n• "5G phones under ₹25k"\n• "Value for money phones"\n\n**Or ask about:**\n• Gaming phones\n• Camera phones\n• Battery life champions`;
        }
      } else {
        noResultsMessage = `No phones found matching your specific requirements. 😊\n\n**Try exploring:**\n• "Best phones under ₹20k"\n• "Budget phones with good features"\n• "Gaming phones"\n• "Camera phones"\n• "Battery life phones"\n\n**Or discover:**\n• "5G phones under ₹25k"\n• "Fast charging phones"\n• "Value for money phones"`;
      }
      
      // Don't show alternative phones - just the encouraging message
      return {
        message: noResultsMessage,
        phones: [], // Empty array so no phone cards are displayed
        intent: 'search',
        confidence: 0.7,
        safetyCheck: { passed: true }
      };
    }

    const topPhones = filteredPhones.slice(0, 6);
    
    // Create contextual message based on query
    let message = '';
    const isGamingQuery = query.includes('gaming') || query.includes('performance');
    const isCameraQuery = query.includes('camera') || query.includes('photo');
    const isBatteryQuery = query.includes('battery');
    const isCompactQuery = query.includes('compact') || query.includes('small') || query.includes('one-hand') || query.includes('one hand') || query.includes('portable');
    const isLargeQuery = query.includes('large') || query.includes('big screen') || query.includes('big display');
    const isFastChargingQuery = query.includes('fast charging') || query.includes('quick charging');
    const is5GQuery = query.includes('5g');
    const isPremiumQuery = query.includes('premium') || query.includes('flagship');
    const isBudgetQuery = query.includes('budget') || query.includes('affordable') || query.includes('cheap') || query.includes('value');
    
    if (isGamingQuery && isBatteryQuery) {
      message = `Here are the best gaming phones with excellent battery life:\n\n`;
    } else if (isGamingQuery) {
      message = `Here are the best gaming phones for performance:\n\n`;
    } else if (isCameraQuery) {
      message = `Here are the best camera phones for photography:\n\n`;
    } else if (isBatteryQuery) {
      message = `Here are the best phones for battery life:\n\n`;
    } else if (isCompactQuery) {
      message = `Here are the best compact phones for one-hand use:\n\n`;
    } else if (isLargeQuery) {
      message = `Here are the best large screen phones:\n\n`;
    } else if (isFastChargingQuery) {
      message = `Here are the best phones with fast charging:\n\n`;
    } else if (is5GQuery) {
      message = `Here are the best 5G phones:\n\n`;
    } else if (isPremiumQuery) {
      message = `Here are the best premium flagship phones:\n\n`;
    } else if (isBudgetQuery) {
      message = `Here are the best budget phones with great value:\n\n`;
    } else {
      message = `Here are the best phones `;
      if (maxBudget < 100000) {
        message += `under ₹${(maxBudget / 1000).toFixed(0)}k `;
      }
      message += `that match your needs:\n\n`;
    }

    topPhones.forEach((phone, index) => {
      message += `**${index + 1}. ${phone.name}** - ₹${phone.price.current.toLocaleString()}\n`;
      
      // Show relevant highlights based on query
      let highlights = [...phone.highlights];
      if (isGamingQuery) {
        highlights = highlights.filter(h => 
          h.toLowerCase().includes('performance') || 
          h.toLowerCase().includes('gaming') || 
          h.toLowerCase().includes('processor') ||
          h.toLowerCase().includes('snapdragon') ||
          h.toLowerCase().includes('a17') ||
          h.toLowerCase().includes('chip')
        );
      }
      if (isBatteryQuery) {
        highlights = [...highlights, ...highlights.filter(h => 
          h.toLowerCase().includes('battery') || 
          h.toLowerCase().includes('mah') ||
          h.toLowerCase().includes('charging')
        )];
      }
      if (isCameraQuery) {
        highlights = highlights.filter(h => 
          h.toLowerCase().includes('camera') || 
          h.toLowerCase().includes('photo') ||
          h.toLowerCase().includes('mp')
        );
      }
      
      // Fallback to original highlights if none match
      if (highlights.length === 0) {
        highlights = phone.highlights.slice(0, 2);
      } else {
        highlights = highlights.slice(0, 2);
      }
      
      message += `   • ${highlights.join(', ')}\n`;
      
      // Add relevant ratings
      if (isGamingQuery) {
        message += `   • Performance: ${phone.rating.performance}/5 | Battery: ${phone.rating.battery}/5\n\n`;
      } else if (isCameraQuery) {
        message += `   • Camera: ${phone.rating.camera}/5 | Overall: ${phone.rating.overall}/5\n\n`;
      } else if (isBatteryQuery) {
        message += `   • Battery: ${phone.rating.battery}/5 | Overall: ${phone.rating.overall}/5\n\n`;
      } else {
        message += `   • ${phone.rating.overall}/5 rating (${phone.reviews.count} reviews)\n\n`;
      }
    });

    return {
      message,
      phones: topPhones,
      intent: 'search',
      confidence: 0.9,
      safetyCheck: { passed: true }
    };
  }

  private handleComparison(userQuery: string): AIResponse {
    // Extract phone names from query
    const phoneNames = this.extractPhoneNames(userQuery);
    const phones = phoneNames.map(name => this.findPhoneByName(name)).filter(Boolean) as MobilePhone[];

    if (phones.length < 2) {
      // Suggest popular phones for comparison
      const popularPhones = [
        mobilePhones.find(p => p.id === 'iphone-15-pro'),
        mobilePhones.find(p => p.id === 'pixel-8a'),
        mobilePhones.find(p => p.id === 'samsung-galaxy-s24')
      ].filter(Boolean) as MobilePhone[];

      return {
        message: "I'd be happy to help you compare phones! Here are some popular options you might want to compare:",
        phones: popularPhones,
        intent: 'compare',
        confidence: 0.7,
        safetyCheck: { passed: true }
      };
    }

    let message = `**Comparison: ${phones[0].name} vs ${phones[1].name}**\n\n`;
    
    // Price comparison
    message += `**💰 Price:**\n`;
    message += `• ${phones[0].name}: ₹${phones[0].price.current.toLocaleString()}\n`;
    message += `• ${phones[1].name}: ₹${phones[1].price.current.toLocaleString()}\n\n`;

    // Camera comparison
    message += `**📷 Camera:**\n`;
    message += `• ${phones[0].name}: ${phones[0].specifications.camera.rear.main} (${phones[0].rating.camera}/5)\n`;
    message += `• ${phones[1].name}: ${phones[1].specifications.camera.rear.main} (${phones[1].rating.camera}/5)\n\n`;

    // Performance comparison
    message += `**⚡ Performance:**\n`;
    message += `• ${phones[0].name}: ${phones[0].specifications.processor.chipset} (${phones[0].rating.performance}/5)\n`;
    message += `• ${phones[1].name}: ${phones[1].specifications.processor.chipset} (${phones[1].rating.performance}/5)\n\n`;

    // Battery comparison
    message += `**🔋 Battery:**\n`;
    message += `• ${phones[0].name}: ${phones[0].specifications.battery.capacity} (${phones[0].rating.battery}/5)\n`;
    message += `• ${phones[1].name}: ${phones[1].specifications.battery.capacity} (${phones[1].rating.battery}/5)\n\n`;

    // Winner determination
    const phone1Score = phones[0].rating.overall;
    const phone2Score = phones[1].rating.overall;
    const winner = phone1Score > phone2Score ? phones[0] : phones[1];
    
    message += `**🏆 Overall Winner: ${winner.name}** (${winner.rating.overall}/5 rating)`;

    return {
      message,
      comparison: {
        phones,
        analysis: message,
        winner: winner.id
      },
      intent: 'compare',
      confidence: 0.9,
      safetyCheck: { passed: true }
    };
  }

  private handleRecommendation(userQuery: string): AIResponse {
    // Simple recommendation based on query context
    let recommendedPhones: MobilePhone[] = [];
    const query = userQuery.toLowerCase();

    if (query.includes('camera') || query.includes('photo')) {
      recommendedPhones = mobilePhones
        .filter(phone => phone.rating.camera >= 4.2)
        .sort((a, b) => b.rating.camera - a.rating.camera)
        .slice(0, 3);
    } else if (query.includes('gaming') || query.includes('performance')) {
      recommendedPhones = mobilePhones
        .filter(phone => phone.rating.performance >= 4.2)
        .sort((a, b) => b.rating.performance - a.rating.performance)
        .slice(0, 3);
    } else if (query.includes('battery')) {
      recommendedPhones = mobilePhones
        .filter(phone => phone.rating.battery >= 4.2)
        .sort((a, b) => b.rating.battery - a.rating.battery)
        .slice(0, 3);
    } else if (query.includes('budget') || query.includes('cheap') || query.includes('affordable')) {
      recommendedPhones = mobilePhones
        .filter(phone => phone.price.current <= 30000)
        .sort((a, b) => b.rating.overall - a.rating.overall)
        .slice(0, 3);
    } else {
      // General recommendations - top rated phones
      recommendedPhones = [...mobilePhones]
        .sort((a, b) => b.rating.overall - a.rating.overall)
        .slice(0, 3);
    }

    const primary = recommendedPhones[0];
    const alternatives = recommendedPhones.slice(1);

    let message = `Based on your requirements, I recommend the **${primary.name}**!\n\n`;
    message += `**Why this phone?**\n`;
    message += `• Price: ₹${primary.price.current.toLocaleString()}\n`;
    message += `• Rating: ${primary.rating.overall}/5 stars\n`;
    message += `• Key features: ${primary.highlights.slice(0, 3).join(', ')}\n`;
    message += `• Best for: ${primary.targetAudience.join(', ')}\n\n`;

    if (alternatives.length > 0) {
      message += `**Other great options:**\n`;
      alternatives.forEach((phone, index) => {
        message += `${index + 1}. **${phone.name}** - ₹${phone.price.current.toLocaleString()} (${phone.rating.overall}/5)\n`;
      });
    }

    return {
      message,
      recommendations: {
        primary,
        alternatives,
        reasoning: `This phone offers the best balance of features for your needs.`
      },
      intent: 'recommend',
      confidence: 0.9,
      safetyCheck: { passed: true }
    };
  }

  private handleGeneral(userQuery: string): AIResponse {
    const query = userQuery.toLowerCase();
    
    if (query.includes('hello') || query.includes('hi') || query.includes('help')) {
      return {
        message: "Hello! I'm your mobile phone shopping assistant. I can help you:\n\n• Find phones within your budget\n• Compare different models\n• Recommend phones for specific needs\n• Explain phone features and specs\n\n💡 **Pro Tip**: To get detailed specifications, ratings, pros & cons of any phone, simply click the **\"View Details\"** button on any phone card!\n\nWhat kind of phone are you looking for?",
        intent: 'greeting',
        confidence: 1.0,
        safetyCheck: { passed: true }
      };
    }

    // Check for "more details" type queries
    const detailsKeywords = [
      'more details', 'tell me more', 'more info', 'more information',
      'details about', 'tell me about', 'learn more', 'know more',
      'specifications', 'full specs', 'complete details', 'detailed info',
      'i like this phone', 'interested in this', 'want to know more'
    ];
    
    const isDetailsQuery = detailsKeywords.some(keyword => query.includes(keyword));
    
    if (isDetailsQuery) {
      return {
        message: "Hello! I'm your mobile phone shopping assistant. I can help you:\n\n• Find phones within your budget\n• Compare different models\n• Recommend phones for specific needs\n• Explain phone features and specs\n\n💡 **Pro Tip**: To get detailed specifications, ratings, pros & cons of any phone, simply click the **\"View Details\"** button on any phone card!\n\nWhat kind of phone are you looking for?",
        intent: 'greeting',
        confidence: 1.0,
        safetyCheck: { passed: true }
      };
    }

    // Check if it's a phone-related query that doesn't fit other categories
    const phoneTerms = ['phone', 'mobile', 'smartphone', 'specs', 'features', 'price'];
    const isPhoneQuery = phoneTerms.some(term => query.includes(term));
    
    if (isPhoneQuery) {
      // Show some popular phones as a starting point
      const popularPhones = mobilePhones.slice(0, 3);
      
      return {
        message: "I'd be happy to help you find the perfect phone! Here are some popular options to get started. You can ask me to:\n\n• Find phones under a specific budget\n• Compare two phones\n• Recommend phones for gaming, camera, or battery life\n\nWhat are you looking for?",
        phones: popularPhones,
        intent: 'general',
        confidence: 0.7,
        safetyCheck: { passed: true }
      };
    }

    // For non-phone queries, redirect to mobile phone assistance
    return {
      message: "I specialize in helping you find mobile phones! I can assist with:\n\n• Phone specifications and features\n• Price comparisons and budget recommendations\n• Finding phones for specific needs (camera, gaming, battery)\n• Comparing different brands and models\n\nAsk me about any mobile phone topic!",
      intent: 'redirect',
      confidence: 0.8,
      safetyCheck: { passed: true }
    };
  }

  private extractPhoneNames(query: string): string[] {
    const phoneNames: string[] = [];
    const phones = mobilePhones;
    
    for (const phone of phones) {
      const phoneName = phone.name.toLowerCase();
      const phoneModel = phone.model.toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (queryLower.includes(phoneName) || queryLower.includes(phoneModel) || 
          queryLower.includes(phone.brand.toLowerCase())) {
        phoneNames.push(phone.name);
      }
    }
    
    return phoneNames;
  }

  private handleSpecificPhoneSearch(userQuery: string): AIResponse {
    console.log('Handling specific phone search for:', userQuery);
    
    const lowerQuery = userQuery.toLowerCase();
    
    // Extract potential phone model from query
    const phoneModelPatterns = [
      { pattern: /iphone (\d+)( pro)?( max)?/i, brand: 'Apple' },
      { pattern: /galaxy s(\d+)( ultra)?/i, brand: 'Samsung' },
      { pattern: /pixel (\d+)( pro)?/i, brand: 'Google' },
      { pattern: /oneplus (\d+[a-z]?)/i, brand: 'OnePlus' },
      { pattern: /redmi note (\d+)( pro)?/i, brand: 'Xiaomi' },
      { pattern: /realme (\d+)( pro)?(\+)?/i, brand: 'Realme' },
      { pattern: /poco ([a-z]\d+)( pro)?/i, brand: 'Xiaomi' },
      { pattern: /nothing phone (\([^)]+\))?/i, brand: 'Nothing' },
      { pattern: /motorola edge (\d+)/i, brand: 'Motorola' },
      { pattern: /vivo v(\d+)/i, brand: 'Vivo' },
      { pattern: /oppo find (\w+)/i, brand: 'Oppo' }
    ];
    
    let requestedPhone = '';
    let brandName = '';
    
    // Try to match specific phone models
    for (const { pattern, brand } of phoneModelPatterns) {
      const match = lowerQuery.match(pattern);
      if (match) {
        requestedPhone = match[0];
        brandName = brand;
        break;
      }
    }
    
    // If no specific pattern matched, try to extract phone name from query
    if (!requestedPhone) {
      // Look for known phone names in our database
      for (const phone of mobilePhones) {
        const phoneName = phone.name.toLowerCase();
        if (lowerQuery.includes(phoneName) || 
            lowerQuery.includes(phone.model.toLowerCase()) ||
            lowerQuery.includes(phone.id.toLowerCase().replace('-', ' '))) {
          requestedPhone = phone.name;
          brandName = phone.brand;
          break;
        }
      }
    }
    
    if (!requestedPhone) {
      // Fallback: try to find any brand mention
      const brands = ['iphone', 'samsung', 'galaxy', 'pixel', 'oneplus', 'redmi', 'realme', 'poco', 'nothing', 'motorola', 'vivo', 'oppo', 'xiaomi'];
      const mentionedBrand = brands.find(brand => lowerQuery.includes(brand));
      if (mentionedBrand) {
        requestedPhone = mentionedBrand;
        brandName = mentionedBrand;
      }
    }
    
    // Search for the phone in our database
    const foundPhone = this.findPhoneByName(requestedPhone);
    
    if (foundPhone) {
      // Phone found - return details
      return {
        message: `Here are the details for **${foundPhone.name}**:\n\n**Price:** ₹${foundPhone.price.current.toLocaleString()}\n**Key Features:**\n• ${foundPhone.highlights.join('\n• ')}\n\n**Specifications:**\n• Display: ${foundPhone.specifications.display.size} ${foundPhone.specifications.display.type}\n• Processor: ${foundPhone.specifications.processor.chipset}\n• Camera: ${foundPhone.specifications.camera.rear.main}\n• Battery: ${foundPhone.specifications.battery.capacity}\n• Storage: ${foundPhone.specifications.memory.storage.join('/')}\n\n**Rating:** ${foundPhone.rating.overall}/5 (${foundPhone.reviews.count} reviews)`,
        phones: [foundPhone],
        intent: 'specific_search',
        confidence: 0.95,
        safetyCheck: { passed: true }
      };
    } else {
      // Phone not found - suggest alternatives
      const alternatives = mobilePhones.slice(0, 3);
      
      return {
        message: `Sorry, I couldn't find **${requestedPhone}** in our current database. ${brandName ? `We may not have the latest ${brandName} models yet.` : ''}\n\nHere are some popular alternatives you might be interested in:\n\nYou can also ask me about:\n• Best phones under a specific budget\n• Phone comparisons\n• Phones for specific needs (gaming, camera, battery)`,
        phones: alternatives,
        intent: 'specific_search',
        confidence: 0.8,
        safetyCheck: { passed: true }
      };
    }
  }

  private findPhoneByName(name: string): MobilePhone | null {
    const searchName = name.toLowerCase().trim();
    
    // First, try exact matches
    let found = mobilePhones.find(phone => 
      phone.name.toLowerCase() === searchName ||
      phone.model.toLowerCase() === searchName ||
      phone.id.toLowerCase().replace('-', ' ') === searchName
    );
    
    if (found) return found;
    
    // Then try partial matches
    found = mobilePhones.find(phone => 
      phone.name.toLowerCase().includes(searchName) ||
      phone.model.toLowerCase().includes(searchName) ||
      searchName.includes(phone.name.toLowerCase()) ||
      searchName.includes(phone.model.toLowerCase())
    );
    
    if (found) return found;
    
    // Finally, try fuzzy matching for common variations
    const variations = [
      { search: 'iphone 15', phones: ['iphone-15-pro'] },
      { search: 'galaxy s24', phones: ['samsung-galaxy-s24'] },
      { search: 'pixel 8', phones: ['google-pixel-8a'] },
      { search: 'oneplus 12', phones: ['oneplus-12r'] },
      { search: 'nothing phone', phones: ['nothing-phone-2a'] }
    ];
    
    for (const variation of variations) {
      if (searchName.includes(variation.search)) {
        const phoneId = variation.phones[0];
        found = mobilePhones.find(phone => phone.id === phoneId);
        if (found) return found;
      }
    }
    
    return null;
  }
}