import { MobilePhone } from '@/types';
import { mobilePhones } from '@/data/phones';

export interface RecommendationCriteria {
  budget?: { min: number; max: number };
  brands?: string[];
  features?: string[];
  category?: string;
  useCase?: string;
}

export interface Recommendation {
  primary: MobilePhone;
  alternatives: MobilePhone[];
  reasoning: string;
}

export class RecommendationEngine {
  private readonly weights = {
    price: 0.25,
    performance: 0.20,
    camera: 0.20,
    battery: 0.15,
    display: 0.10,
    design: 0.10
  };

  getRecommendations(criteria: RecommendationCriteria): Recommendation {
    // Filter phones based on criteria
    let candidatePhones = this.filterByCriteria(criteria);
    
    // If no phones match, fallback to popular phones in budget
    if (candidatePhones.length === 0) {
      candidatePhones = this.getFallbackRecommendations(criteria.budget);
    }

    // Score and rank phones
    const scoredPhones = this.scorePhones(candidatePhones, criteria);
    
    // Sort by score and pick top recommendations
    const sortedPhones = scoredPhones.sort((a, b) => b.score - a.score);
    
    const primary = sortedPhones[0]?.phone;
    const alternatives = sortedPhones.slice(1, 4).map(item => item.phone);
    
    const reasoning = this.generateReasoning(primary, criteria);

    return {
      primary: primary || mobilePhones[0], // Fallback to first phone
      alternatives,
      reasoning
    };
  }

  getFallbackRecommendations(budget?: { min: number; max: number }): MobilePhone[] {
    let phones = [...mobilePhones];
    
    if (budget) {
      phones = phones.filter(phone => 
        phone.price.current >= budget.min && phone.price.current <= budget.max
      );
    }
    
    // Return top-rated phones as fallback
    return phones
      .sort((a, b) => b.rating.overall - a.rating.overall)
      .slice(0, 6);
  }

  private filterByCriteria(criteria: RecommendationCriteria): MobilePhone[] {
    return mobilePhones.filter(phone => {
      // Budget filter
      if (criteria.budget) {
        const price = phone.price.current;
        if (price < criteria.budget.min || price > criteria.budget.max) {
          return false;
        }
      }

      // Brand filter
      if (criteria.brands?.length && !criteria.brands.includes(phone.brand)) {
        return false;
      }

      // Category filter
      if (criteria.category && phone.category !== criteria.category) {
        return false;
      }

      // Feature filter
      if (criteria.features?.length) {
        const phoneFeatures = [
          ...phone.tags,
          ...phone.highlights,
          ...phone.targetAudience,
          ...phone.pros
        ].map(f => f.toLowerCase());

        const hasRequiredFeatures = criteria.features.some(feature =>
          phoneFeatures.some(phoneFeature =>
            phoneFeature.includes(feature.toLowerCase())
          )
        );

        if (!hasRequiredFeatures) {
          return false;
        }
      }

      return true;
    });
  }

  private scorePhones(phones: MobilePhone[], criteria: RecommendationCriteria): Array<{ phone: MobilePhone; score: number }> {
    return phones.map(phone => ({
      phone,
      score: this.calculateScore(phone, criteria)
    }));
  }

  private calculateScore(phone: MobilePhone, criteria: RecommendationCriteria): number {
    let score = 0;

    // Base rating score (0-1)
    score += phone.rating.overall / 5;

    // Price score (higher score for better value)
    if (criteria.budget) {
      const budgetRange = criteria.budget.max - criteria.budget.min;
      const phonePrice = phone.price.current;
      const budgetUtilization = (phonePrice - criteria.budget.min) / budgetRange;
      
      // Sweet spot is using 70-90% of budget
      if (budgetUtilization >= 0.7 && budgetUtilization <= 0.9) {
        score += this.weights.price;
      } else if (budgetUtilization < 0.7) {
        score += this.weights.price * 0.8; // Slightly lower for underutilizing budget
      } else {
        score += this.weights.price * 0.6; // Lower for going over sweet spot
      }
    } else {
      score += this.weights.price * 0.7; // Default price score
    }

    // Feature-specific scoring
    if (criteria.features?.includes('camera')) {
      score += (phone.rating.camera / 5) * this.weights.camera;
    } else {
      score += (phone.rating.camera / 5) * this.weights.camera * 0.5;
    }

    if (criteria.features?.includes('gaming') || criteria.features?.includes('performance')) {
      score += (phone.rating.performance / 5) * this.weights.performance;
    } else {
      score += (phone.rating.performance / 5) * this.weights.performance * 0.5;
    }

    if (criteria.features?.includes('battery')) {
      score += (phone.rating.battery / 5) * this.weights.battery;
    } else {
      score += (phone.rating.battery / 5) * this.weights.battery * 0.5;
    }

    // Display and design scores
    score += (phone.rating.display / 5) * this.weights.display;
    score += (phone.rating.design / 5) * this.weights.design;

    // Category bonus
    if (criteria.category === phone.category) {
      score += 0.1;
    }

    // Brand preference bonus
    if (criteria.brands?.includes(phone.brand)) {
      score += 0.1;
    }

    // Availability bonus
    if (phone.availability === 'in-stock') {
      score += 0.05;
    }

    return Math.min(score, 1.0); // Cap at 1.0
  }

  private generateReasoning(phone: MobilePhone, criteria: RecommendationCriteria): string {
    const reasons: string[] = [];

    // Budget reasoning
    if (criteria.budget) {
      const budgetRange = criteria.budget.max - criteria.budget.min;
      const phonePrice = phone.price.current;
      
      if (phonePrice <= criteria.budget.max * 0.8) {
        reasons.push(`excellent value within your budget of ₹${criteria.budget.max.toLocaleString()}`);
      } else {
        reasons.push(`makes good use of your ₹${criteria.budget.max.toLocaleString()} budget`);
      }
    }

    // Feature reasoning
    if (criteria.features?.includes('camera')) {
      reasons.push(`outstanding ${phone.specifications.camera.rear.main} camera system`);
    }
    
    if (criteria.features?.includes('gaming')) {
      reasons.push(`powerful ${phone.specifications.processor.chipset} processor for gaming`);
    }
    
    if (criteria.features?.includes('battery')) {
      reasons.push(`robust ${phone.specifications.battery.capacity} battery with ${phone.specifications.battery.charging.wired} fast charging`);
    }

    // Brand reasoning
    if (criteria.brands?.includes(phone.brand)) {
      reasons.push(`from your preferred brand ${phone.brand}`);
    }

    // Add key highlights
    if (phone.highlights.length > 0) {
      reasons.push(`featuring ${phone.highlights.slice(0, 2).join(' and ')}`);
    }

    // Rating reasoning
    if (phone.rating.overall >= 4.5) {
      reasons.push(`highly rated at ${phone.rating.overall}/5 stars`);
    }

    return reasons.length > 0 
      ? `Recommended for ${reasons.join(', ')}.`
      : `This phone offers a great balance of features and performance for your needs.`;
  }

  // Specialized recommendation methods
  getCameraPhones(budget?: { min: number; max: number }): MobilePhone[] {
    let phones = mobilePhones.filter(phone => 
      phone.rating.camera >= 4.2 && 
      phone.tags.includes('camera')
    );

    if (budget) {
      phones = phones.filter(phone => 
        phone.price.current >= budget.min && phone.price.current <= budget.max
      );
    }

    return phones.sort((a, b) => b.rating.camera - a.rating.camera);
  }

  getGamingPhones(budget?: { min: number; max: number }): MobilePhone[] {
    let phones = mobilePhones.filter(phone => 
      phone.rating.performance >= 4.3 && 
      (phone.tags.includes('gaming') || phone.tags.includes('performance'))
    );

    if (budget) {
      phones = phones.filter(phone => 
        phone.price.current >= budget.min && phone.price.current <= budget.max
      );
    }

    return phones.sort((a, b) => b.rating.performance - a.rating.performance);
  }

  getBudgetPhones(maxBudget: number): MobilePhone[] {
    return mobilePhones
      .filter(phone => phone.price.current <= maxBudget)
      .sort((a, b) => {
        // Sort by value (rating/price ratio)
        const aValue = a.rating.overall / (a.price.current / 10000);
        const bValue = b.rating.overall / (b.price.current / 10000);
        return bValue - aValue;
      });
  }

  getCompactPhones(): MobilePhone[] {
    return mobilePhones.filter(phone => {
      const screenSize = parseFloat(phone.specifications.display.size);
      return screenSize <= 6.2 && phone.targetAudience.includes('Compact phone lovers');
    }).sort((a, b) => b.rating.overall - a.rating.overall);
  }

  getBatteryChampions(): MobilePhone[] {
    return mobilePhones
      .filter(phone => {
        const batteryCapacity = parseInt(phone.specifications.battery.capacity);
        return batteryCapacity >= 4500;
      })
      .sort((a, b) => {
        const aBattery = parseInt(a.specifications.battery.capacity);
        const bBattery = parseInt(b.specifications.battery.capacity);
        return bBattery - aBattery;
      });
  }
}