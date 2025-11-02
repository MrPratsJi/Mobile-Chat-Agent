'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MobilePhone } from '@/types';
import { formatPrice, formatPriceCompact, cn } from '@/lib/utils';
import { useUIStore } from '@/lib/store/ui-store';

interface PhoneCardProps {
  phone: MobilePhone;
  compact?: boolean;
  showActions?: boolean;
}

export function PhoneCard({ phone, compact = false, showActions = true }: PhoneCardProps) {
  const [imageError, setImageError] = useState(false);
  const { 
    openPhoneDetails, 
    addToComparison, 
    comparisonPhones
  } = useUIStore();

  const handleCompare = () => {
    addToComparison(phone);
  };

  const handleViewDetails = () => {
    openPhoneDetails(phone);
  };

  const isInComparison = comparisonPhones.some(p => p.id === phone.id);
  const comparisonFull = comparisonPhones.length >= 3;
  const isCompareDisabled = isInComparison || comparisonFull;

  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 overflow-hidden",
      "hover:shadow-lg transition-shadow duration-200",
      compact ? "p-3" : "p-4"
    )}>
      <div className="relative mb-3">
        <div className={cn(
          "relative bg-gray-50 rounded-lg overflow-hidden",
          compact ? "h-32" : "h-40"
        )}>
          {!imageError ? (
            <Image
              src={phone.images.main}
              alt={phone.name}
              fill
              className="object-contain p-2"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        <div className="absolute top-2 right-2">
          <AvailabilityBadge availability={phone.availability} />
        </div>

        {phone.price.original && (
          <div className="absolute top-2 left-2">
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {Math.round((1 - phone.price.current / phone.price.original) * 100)}% OFF
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div>
          <h3 className={cn(
            "font-semibold text-gray-900 line-clamp-1",
            compact ? "text-sm" : "text-base"
          )}>
            {phone.name}
          </h3>
          <p className="text-sm text-gray-500">{phone.brand}</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className={cn(
            "font-bold text-green-600",
            compact ? "text-lg" : "text-xl"
          )}>
            {formatPriceCompact(phone.price.current)}
          </span>
          {phone.price.original && (
            <span className="text-sm text-gray-400 line-through">
              {formatPriceCompact(phone.price.original)}
            </span>
          )}
        </div>

        {!compact && (
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Display:</span>
              <span>{phone.specifications.display.size} {phone.specifications.display.type}</span>
            </div>
            <div className="flex justify-between">
              <span>Camera:</span>
              <span>{phone.specifications.camera.rear.main}</span>
            </div>
            <div className="flex justify-between">
              <span>Battery:</span>
              <span>{phone.specifications.battery.capacity}</span>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <StarRating rating={phone.rating.overall} size={compact ? 'sm' : 'md'} />
            <span className={cn(
              "ml-1 font-medium text-gray-700",
              compact ? "text-xs" : "text-sm"
            )}>
              {phone.rating.overall}
            </span>
          </div>
          <span className={cn(
            "text-gray-500",
            compact ? "text-xs" : "text-sm"
          )}>
            ({phone.reviews.count} reviews)
          </span>
        </div>

        {!compact && phone.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {phone.highlights.slice(0, 3).map((highlight, index) => (
              <span 
                key={index}
                className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full border border-primary-200"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {showActions && (
          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-primary-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              View Details
            </button>
            <button
              onClick={handleCompare}
              disabled={isCompareDisabled}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCompareDisabled
                  ? 'border border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              title={
                isInComparison 
                  ? 'Already in comparison' 
                  : comparisonFull 
                  ? 'Maximum 3 phones can be compared'
                  : 'Add to comparison'
              }
            >
              {isInComparison ? 'Added' : 'Compare'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AvailabilityBadge({ availability }: { availability: MobilePhone['availability'] }) {
  const styles = {
    'in-stock': 'bg-green-500 text-white',
    'out-of-stock': 'bg-red-500 text-white',
    'pre-order': 'bg-yellow-500 text-white'
  };

  const labels = {
    'in-stock': 'In Stock',
    'out-of-stock': 'Out of Stock',
    'pre-order': 'Pre-order'
  };

  return (
    <div className={cn(
      "text-xs px-2 py-1 rounded-full font-medium",
      styles[availability]
    )}>
      {labels[availability]}
    </div>
  );
}

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          )}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}