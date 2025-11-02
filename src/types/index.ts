export interface MobilePhone {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  availability: 'in-stock' | 'out-of-stock' | 'pre-order';
  images: {
    main: string;
    gallery: string[];
  };
  specifications: {
    display: {
      size: string;
      resolution: string;
      type: string;
      refreshRate: string;
      protection: string;
    };
    processor: {
      chipset: string;
      cpu: string;
      gpu: string;
    };
    memory: {
      ram: string[];
      storage: string[];
      expandable: boolean;
    };
    camera: {
      rear: {
        main: string;
        ultrawide?: string;
        macro?: string;
        depth?: string;
        telephoto?: string;
        features: string[];
      };
      front: {
        main: string;
        features: string[];
      };
      video: {
        rear: string;
        front: string;
      };
    };
    battery: {
      capacity: string;
      charging: {
        wired: string;
        wireless?: string;
        reverse?: string;
      };
    };
    connectivity: {
      network: string[];
      wifi: string;
      bluetooth: string;
      usb: string;
      nfc?: boolean;
    };
    design: {
      dimensions: string;
      weight: string;
      materials: string[];
      colors: string[];
      waterResistance?: string;
    };
    software: {
      os: string;
      ui: string;
      updateSupport: string;
    };
    audio: {
      speakers: string;
      headphoneJack: boolean;
      features: string[];
    };
    sensors: string[];
  };
  highlights: string[];
  pros: string[];
  cons: string[];
  targetAudience: string[];
  tags: string[];
  rating: {
    overall: number;
    camera: number;
    performance: number;
    battery: number;
    display: number;
    design: number;
  };
  reviews: {
    count: number;
    summary: string;
  };
  releaseDate: string;
  category: 'flagship' | 'premium' | 'mid-range' | 'budget' | 'entry-level';
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    phones?: MobilePhone[];
    comparison?: {
      phones: MobilePhone[];
      analysis: string;
      winner?: string;
    };
    recommendations?: {
      primary: MobilePhone;
      alternatives: MobilePhone[];
      reasoning: string;
    };
    intent?: string;
    confidence?: number;
  };
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  context: {
    budget?: {
      min: number;
      max: number;
    };
    preferences: {
      brands?: string[];
      features?: string[];
      categories?: string[];
    };
    lastQuery?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  categories?: string[];
  features?: string[];
  rating?: number;
  availability?: string[];
}

export interface ComparisonRequest {
  phoneIds: string[];
  criteria?: string[];
}

export interface AIResponse {
  message: string;
  phones?: MobilePhone[];
  comparison?: {
    phones: MobilePhone[];
    analysis: string;
    winner?: string;
  };
  recommendations?: {
    primary: MobilePhone;
    alternatives: MobilePhone[];
    reasoning: string;
  };
  intent: string;
  confidence: number;
  safetyCheck: {
    passed: boolean;
    flags?: string[];
  };
}