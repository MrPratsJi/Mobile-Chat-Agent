import { create } from 'zustand';
import { MobilePhone } from '@/types';

interface UIStore {
  selectedPhone: MobilePhone | null;
  isDetailModalOpen: boolean;
  
  comparisonPhones: MobilePhone[];
  isComparisonModalOpen: boolean;
  
  openPhoneDetails: (phone: MobilePhone) => void;
  closePhoneDetails: () => void;
  
  addToComparison: (phone: MobilePhone) => void;
  removeFromComparison: (phoneId: string) => void;
  clearComparison: () => void;
  openComparison: () => void;
  closeComparison: () => void;
  
  isComparisonFull: () => boolean;
  isPhoneInComparison: (phoneId: string) => boolean;
}

export const useUIStore = create<UIStore>()((set, get) => ({
  selectedPhone: null,
  isDetailModalOpen: false,
  comparisonPhones: [],
  isComparisonModalOpen: false,

  openPhoneDetails: (phone: MobilePhone) => {
    set({ selectedPhone: phone, isDetailModalOpen: true });
  },

  closePhoneDetails: () => {
    set({ selectedPhone: null, isDetailModalOpen: false });
  },

  addToComparison: (phone: MobilePhone) => {
    const { comparisonPhones } = get();
    
    if (comparisonPhones.find(p => p.id === phone.id)) {
      return;
    }
    
    if (comparisonPhones.length >= 3) {
      return;
    }
    
    set({ 
      comparisonPhones: [...comparisonPhones, phone],
      isComparisonModalOpen: comparisonPhones.length >= 1
    });
  },

  removeFromComparison: (phoneId: string) => {
    const { comparisonPhones } = get();
    set({ 
      comparisonPhones: comparisonPhones.filter(p => p.id !== phoneId) 
    });
  },

  clearComparison: () => {
    set({ comparisonPhones: [], isComparisonModalOpen: false });
  },

  openComparison: () => {
    set({ isComparisonModalOpen: true });
  },

  closeComparison: () => {
    set({ isComparisonModalOpen: false });
  },

  isComparisonFull: () => {
    const { comparisonPhones } = get();
    return comparisonPhones.length >= 3;
  },

  isPhoneInComparison: (phoneId: string) => {
    const { comparisonPhones } = get();
    return comparisonPhones.some(p => p.id === phoneId);
  },
}));