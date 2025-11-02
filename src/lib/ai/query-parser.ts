export interface ParsedQuery {
  intent: 'search' | 'compare' | 'recommend' | 'explain' | 'details' | 'general';
  confidence: number;
  budget?: {
    min: number;
    max: number;
  };
  brands?: string[];
  features?: string[];
  category?: string;
  phoneNames?: string[];
  topic?: string;
  phoneName?: string;
}

export class QueryParser {
  private intentPatterns: { [key: string]: RegExp[] };
  private brandPatterns: { [key: string]: RegExp };
  private budgetPatterns: RegExp[];
  private featurePatterns: { [key: string]: RegExp };

  constructor() {
    this.intentPatterns = {
      search: [
        /(?:find|search|show|get|looking\s+for|want|need)\s+(?:a\s+)?(?:phone|mobile|smartphone)/i,
        /(?:best|good|top)\s+(?:phone|mobile|smartphone)/i,
        /phone(?:s)?\s+(?:under|below|within|around|for)/i,
        /(?:budget|cheap|affordable)\s+phone/i,
      ],
      compare: [
        /compare\s+(?:the\s+)?(?:phone|mobile|smartphone)/i,
        /(?:vs|versus|compared\s+to)\s+/i,
        /difference\s+between/i,
        /which\s+is\s+better/i,
        /(?:phone\s+a|[\w\s]+)\s+(?:vs|versus)\s+(?:phone\s+b|[\w\s]+)/i,
      ],
      recommend: [
        /recommend(?:ation)?/i,
        /suggest(?:ion)?/i,
        /what\s+(?:phone|mobile|smartphone)\s+should\s+i/i,
        /which\s+(?:phone|mobile|smartphone)\s+(?:is\s+)?(?:best|good)/i,
      ],
      explain: [
        /(?:what\s+is|explain|tell\s+me\s+about)\s+(?:ois|eis|amoled|oled|snapdragon|dimensity|a\d+|exynos)/i,
        /difference\s+between\s+(?:ois|eis|amoled|oled|lcd)/i,
        /how\s+(?:does|do)\s+(?:ois|eis|fast\s+charging|wireless\s+charging)/i,
      ],
      details: [
        /tell\s+me\s+(?:more\s+)?about\s+(?:the\s+)?(?:iphone|samsung|pixel|oneplus|xiaomi|realme|poco|nothing|motorola)/i,
        /(?:specs|specifications)\s+(?:of|for)\s+(?:the\s+)?[\w\s]+/i,
        /(?:review|rating)\s+(?:of|for)\s+(?:the\s+)?[\w\s]+/i,
      ]
    };

    this.brandPatterns = {
      Apple: /apple|iphone/i,
      Samsung: /samsung|galaxy/i,
      Google: /google|pixel/i,
      OnePlus: /oneplus|one\s?plus/i,
      Xiaomi: /xiaomi|redmi|mi\s/i,
      Realme: /realme/i,
      POCO: /poco/i,
      Nothing: /nothing/i,
      Motorola: /motorola|moto/i,
    };

    this.budgetPatterns = [
      /under\s+(?:₹|rs\.?|inr)?\s?(\d+)(?:k|000)?/i,
      /below\s+(?:₹|rs\.?|inr)?\s?(\d+)(?:k|000)?/i,
      /(?:₹|rs\.?|inr)?\s?(\d+)(?:k|000)?\s+(?:budget|range)/i,
      /(?:around|about)\s+(?:₹|rs\.?|inr)?\s?(\d+)(?:k|000)?/i,
      /between\s+(?:₹|rs\.?|inr)?\s?(\d+)(?:k|000)?\s+(?:and|to)\s+(?:₹|rs\.?|inr)?\s?(\d+)(?:k|000)?/i,
    ];

    this.featurePatterns = {
      camera: /camera|photography|photo|selfie|video|zoom|portrait|night\s+mode/i,
      gaming: /gaming|game|performance|fps|processor|chipset|snapdragon|dimensity|a\d+|exynos/i,
      battery: /battery|charge|charging|fast\s+charge|wireless\s+charge|power|mah/i,
      display: /display|screen|amoled|oled|lcd|refresh\s+rate|120hz|90hz/i,
      design: /design|build|premium|lightweight|compact|slim|size|color/i,
      storage: /storage|memory|ram|gb|expandable|microsd/i,
      connectivity: /5g|4g|wifi|bluetooth|nfc|network/i,
      audio: /audio|speaker|headphone|jack|music|sound/i,
      security: /fingerprint|face\s+unlock|security|biometric/i,
      waterproof: /water|ip67|ip68|waterproof|resistant/i,
    };
  }

  async parse(query: string, conversationHistory: string[] = []): Promise<ParsedQuery> {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Determine intent
    const intent = this.detectIntent(normalizedQuery);
    
    // Extract structured data based on intent
    const result: ParsedQuery = {
      intent,
      confidence: this.calculateConfidence(intent, normalizedQuery),
    };

    // Extract budget information
    const budget = this.extractBudget(normalizedQuery);
    if (budget) {
      result.budget = budget;
    }

    // Extract brand preferences
    const brands = this.extractBrands(normalizedQuery);
    if (brands.length > 0) {
      result.brands = brands;
    }

    // Extract feature preferences
    const features = this.extractFeatures(normalizedQuery);
    if (features.length > 0) {
      result.features = features;
    }

    // Extract category (flagship, premium, mid-range, budget)
    const category = this.extractCategory(normalizedQuery);
    if (category) {
      result.category = category;
    }

    // Extract specific phone names for comparison or details
    if (intent === 'compare' || intent === 'details') {
      const phoneNames = this.extractPhoneNames(normalizedQuery);
      if (phoneNames.length > 0) {
        if (intent === 'compare') {
          result.phoneNames = phoneNames;
        } else {
          result.phoneName = phoneNames[0];
        }
      }
    }

    // Extract technical topics for explanations
    if (intent === 'explain') {
      const topic = this.extractTechnicalTopic(normalizedQuery);
      if (topic) {
        result.topic = topic;
      }
    }

    return result;
  }

  private detectIntent(query: string): ParsedQuery['intent'] {
    let maxScore = 0;
    let detectedIntent: ParsedQuery['intent'] = 'general';

    for (const [intent, patterns] of Object.entries(this.intentPatterns)) {
      const score = patterns.reduce((acc, pattern) => {
        return acc + (pattern.test(query) ? 1 : 0);
      }, 0);

      if (score > maxScore) {
        maxScore = score;
        detectedIntent = intent as ParsedQuery['intent'];
      }
    }

    return detectedIntent;
  }

  private calculateConfidence(intent: string, query: string): number {
    const patterns = this.intentPatterns[intent] || [];
    const matches = patterns.filter(pattern => pattern.test(query)).length;
    const total = patterns.length;
    
    return total > 0 ? Math.min(0.9, 0.3 + (matches / total) * 0.6) : 0.5;
  }

  private extractBudget(query: string): { min: number; max: number } | null {
    for (const pattern of this.budgetPatterns) {
      const match = query.match(pattern);
      if (match) {
        if (pattern.source.includes('between')) {
          // Range pattern
          const min = this.parseAmount(match[1]);
          const max = this.parseAmount(match[2]);
          return { min, max };
        } else {
          // Single amount pattern (treat as max)
          const amount = this.parseAmount(match[1]);
          return { min: 0, max: amount };
        }
      }
    }
    return null;
  }

  private parseAmount(amount: string): number {
    const num = parseInt(amount);
    // If the amount is less than 1000, assume it's in thousands (e.g., "30" means "30000")
    return num < 1000 ? num * 1000 : num;
  }

  private extractBrands(query: string): string[] {
    const brands: string[] = [];
    for (const [brand, pattern] of Object.entries(this.brandPatterns)) {
      if (pattern.test(query)) {
        brands.push(brand);
      }
    }
    return brands;
  }

  private extractFeatures(query: string): string[] {
    const features: string[] = [];
    for (const [feature, pattern] of Object.entries(this.featurePatterns)) {
      if (pattern.test(query)) {
        features.push(feature);
      }
    }
    return features;
  }

  private extractCategory(query: string): string | null {
    if (/flagship|premium|high[- ]?end|expensive|top[- ]?tier/i.test(query)) {
      return 'flagship';
    }
    if (/mid[- ]?range|medium|middle/i.test(query)) {
      return 'mid-range';
    }
    if (/budget|cheap|affordable|low[- ]?cost|entry[- ]?level/i.test(query)) {
      return 'budget';
    }
    return null;
  }

  private extractPhoneNames(query: string): string[] {
    const phoneNames: string[] = [];
    
    // Common phone naming patterns
    const phonePatterns = [
      /iphone\s+\d+(?:\s+pro)?(?:\s+max)?/gi,
      /galaxy\s+s\d+(?:\s+ultra)?/gi,
      /pixel\s+\d+(?:\s*a)?(?:\s+pro)?/gi,
      /oneplus\s+\d+(?:\s*r)?(?:\s+pro)?/gi,
      /redmi\s+note\s+\d+(?:\s+pro)?/gi,
      /poco\s+[xf]\d+(?:\s+pro)?/gi,
      /realme\s+\d+(?:\s+pro)?/gi,
      /nothing\s+phone\s+\(?(\d+a?)\)?/gi,
      /motorola\s+edge\s+\d+/gi,
    ];

    for (const pattern of phonePatterns) {
      const matches = query.match(pattern);
      if (matches) {
        phoneNames.push(...matches);
      }
    }

    return phoneNames;
  }

  private extractTechnicalTopic(query: string): string | null {
    const topics = [
      'OIS', 'EIS', 'AMOLED', 'OLED', 'LCD', 'Snapdragon', 'Dimensity',
      'Exynos', 'A17 Pro', 'fast charging', 'wireless charging', 'IP67',
      'IP68', 'refresh rate', 'HDR', 'portrait mode', 'night mode'
    ];

    for (const topic of topics) {
      if (new RegExp(topic, 'i').test(query)) {
        return topic;
      }
    }

    return null;
  }
}