export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const formatPrice = (price: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceCompact = (price: number): string => {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`;
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(0)}k`;
  }
  return `₹${price}`;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatMessageTime = (timestamp: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(timestamp);
};

export const formatRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const formatStorage = (storage: string[]): string => {
  return storage.map(s => s.replace('GB', '')).join('/') + 'GB';
};

export const formatRAM = (ram: string[]): string => {
  return ram.map(r => r.replace('GB', '')).join('/') + 'GB';
};

export const getBatteryRating = (capacity: string): 'Poor' | 'Average' | 'Good' | 'Excellent' => {
  const mah = parseInt(capacity);
  if (mah >= 5000) return 'Excellent';
  if (mah >= 4500) return 'Good';
  if (mah >= 4000) return 'Average';
  return 'Poor';
};

export const getPerformanceRating = (chipset: string): 'Entry' | 'Mid-range' | 'High-end' | 'Flagship' => {
  const chip = chipset.toLowerCase();
  
  if (chip.includes('a17') || chip.includes('a16') || chip.includes('snapdragon 8 gen')) {
    return 'Flagship';
  }
  if (chip.includes('a15') || chip.includes('snapdragon 7') || chip.includes('dimensity 8')) {
    return 'High-end';
  }
  if (chip.includes('snapdragon 6') || chip.includes('dimensity 7')) {
    return 'Mid-range';
  }
  return 'Entry';
};

export const getCameraRating = (megapixels: string): 'Basic' | 'Good' | 'Very Good' | 'Excellent' => {
  const mp = parseInt(megapixels);
  if (mp >= 100) return 'Excellent';
  if (mp >= 64) return 'Very Good';
  if (mp >= 48) return 'Good';
  return 'Basic';
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};