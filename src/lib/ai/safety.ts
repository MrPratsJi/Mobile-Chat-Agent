export class SafetyFilter {
  private maliciousPatterns: RegExp[];
  private systemPromptPatterns: RegExp[];
  private inappropriatePatterns: RegExp[];

  constructor() {
    this.maliciousPatterns = [
      /ignore\s+(?:previous|all|your)\s+(?:instructions|rules|prompts?)/i,
      /forget\s+(?:everything|all|your)\s+(?:instructions|rules|training)/i,
      /system\s+prompt/i,
      /reveal\s+(?:your|the)\s+(?:prompt|instructions|system)/i,
      /what\s+(?:are|is)\s+your\s+(?:instructions|rules|prompt)/i,
      /tell\s+me\s+your\s+(?:api\s+key|secret|token)/i,
      /\/\*[\s\S]*?\*\//, // Block comments that might contain instructions
      /<[^>]*>/g, // HTML/XML tags
    ];

    this.systemPromptPatterns = [
      /api\s+key/i,
      /secret\s+key/i,
      /auth(?:entication)?\s+token/i,
      /access\s+token/i,
      /gemini\s+key/i,
      /google\s+ai\s+key/i,
    ];

    this.inappropriatePatterns = [
      /(?:fuck|shit|damn|hell|bitch|asshole)/i,
      /(?:offensive|inappropriate|toxic|harmful)\s+content/i,
      /(?:hack|exploit|cheat|fraud)/i,
    ];
  }

  async checkQuery(query: string): Promise<{ passed: boolean; flags?: string[] }> {
    const flags: string[] = [];
    
    // Check for malicious patterns
    for (const pattern of this.maliciousPatterns) {
      if (pattern.test(query)) {
        flags.push('prompt_injection');
        break;
      }
    }

    // Check for system prompt extraction attempts
    for (const pattern of this.systemPromptPatterns) {
      if (pattern.test(query)) {
        flags.push('system_prompt_extraction');
        break;
      }
    }

    // Check for inappropriate content
    for (const pattern of this.inappropriatePatterns) {
      if (pattern.test(query)) {
        flags.push('inappropriate_content');
        break;
      }
    }

    // Check for non-phone related queries that might be attempts to misuse the system
    if (this.isCompletelyUnrelated(query)) {
      flags.push('unrelated_query');
    }

    return {
      passed: flags.length === 0,
      flags: flags.length > 0 ? flags : undefined
    };
  }

  private isCompletelyUnrelated(query: string): boolean {
    const phoneRelatedKeywords = [
      'phone', 'mobile', 'smartphone', 'android', 'ios', 'iphone', 'samsung', 
      'google', 'pixel', 'oneplus', 'xiaomi', 'realme', 'poco', 'motorola', 
      'nothing', 'camera', 'battery', 'display', 'processor', 'storage', 
      'ram', 'price', 'budget', 'compare', 'recommend', 'best', 'buy',
      'specs', 'specification', 'review', 'rating', 'performance', 'gaming',
      'photography', 'video', 'screen', 'size', 'flagship', 'premium',
      'mid-range', 'budget', 'entry-level', '5g', '4g', 'wifi', 'bluetooth',
      'charging', 'wireless', 'fast', 'fingerprint', 'face', 'unlock',
      'waterproof', 'water', 'resistant', 'ip67', 'ip68', 'gorilla', 'glass'
    ];

    const queryLower = query.toLowerCase();
    const hasPhoneKeywords = phoneRelatedKeywords.some(keyword => 
      queryLower.includes(keyword)
    );

    // If no phone keywords and the query looks like it's trying to do something else
    const suspiciousNonPhonePatterns = [
      /write\s+(?:a|an|me)\s+(?:essay|story|poem|code|program|script)/i,
      /solve\s+(?:this|my)\s+(?:math|homework|assignment)/i,
      /translate\s+(?:this|the following)/i,
      /what\s+is\s+the\s+(?:capital|population|weather)/i,
      /how\s+to\s+(?:cook|make|build|create)(?!\s+(?:a\s+)?(?:phone|mobile|smartphone))/i,
      /tell\s+me\s+about\s+(?!(?:phone|mobile|smartphone|android|ios))/i,
    ];

    const hasSuspiciousPatterns = suspiciousNonPhonePatterns.some(pattern => 
      pattern.test(query)
    );

    return !hasPhoneKeywords && hasSuspiciousPatterns;
  }

  sanitizeInput(input: string): string {
    // Remove potential HTML/XML tags
    let sanitized = input.replace(/<[^>]*>/g, '');
    
    // Remove potential script injections
    sanitized = sanitized.replace(/javascript:/gi, '');
    
    // Remove excessive whitespace
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
    
    // Limit length to prevent extremely long inputs
    if (sanitized.length > 500) {
      sanitized = sanitized.substring(0, 500) + '...';
    }
    
    return sanitized;
  }

  isPhoneRelatedQuery(query: string): boolean {
    const phoneKeywords = [
      'phone', 'mobile', 'smartphone', 'android', 'ios', 'iphone',
      'camera', 'battery', 'display', 'processor', 'price', 'budget',
      'compare', 'recommend', 'best', 'specs', 'review', 'buy'
    ];

    const queryLower = query.toLowerCase();
    return phoneKeywords.some(keyword => queryLower.includes(keyword));
  }
}