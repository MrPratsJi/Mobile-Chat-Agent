'use client';

import React from 'react';
import { MobilePhone } from '@/types';
import { PhoneCard } from './PhoneCard';
import { cn } from '@/lib/utils';

interface PhoneGridProps {
  phones: MobilePhone[];
  maxDisplay?: number;
  showViewAll?: boolean;
}

export function PhoneGrid({ phones, maxDisplay = 6, showViewAll = true }: PhoneGridProps) {
  const displayPhones = phones.slice(0, maxDisplay);
  const hasMorePhones = phones.length > maxDisplay;

  if (phones.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">📱</div>
        <p>No phones found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {phones.length === 1 ? 'Phone Details' : `Found ${phones.length} Phone${phones.length > 1 ? 's' : ''}`}
        </h3>
        {hasMorePhones && showViewAll && (
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all {phones.length} phones
          </button>
        )}
      </div>

      {/* Grid */}
      <div className={cn(
        "grid gap-4",
        displayPhones.length === 1 
          ? "grid-cols-1" 
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}>
        {displayPhones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>

      {/* Show More Button */}
      {hasMorePhones && showViewAll && (
        <div className="text-center pt-4">
          <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium">
            Show {phones.length - maxDisplay} more phones
          </button>
        </div>
      )}
    </div>
  );
}