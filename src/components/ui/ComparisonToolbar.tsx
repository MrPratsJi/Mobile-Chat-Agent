'use client';

import React from 'react';
import { useUIStore } from '@/lib/store/ui-store';

export function ComparisonToolbar() {
  const { comparisonPhones, openComparison, clearComparison } = useUIStore();

  if (comparisonPhones.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-40">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-900">
            {comparisonPhones.length} phone{comparisonPhones.length > 1 ? 's' : ''} selected
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={openComparison}
            className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            Compare
          </button>
          <button
            onClick={clearComparison}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="flex mt-3 space-x-2">
        {comparisonPhones.map((phone) => (
          <div key={phone.id} className="relative">
            <img
              src={phone.images.main}
              alt={phone.name}
              className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}