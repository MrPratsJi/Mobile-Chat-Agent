'use client';

import React from 'react';
import { useUIStore } from '@/lib/store/ui-store';
import { formatPrice } from '@/lib/utils';
import { MobilePhone } from '@/types';

export function PhoneComparisonModal() {
  const { comparisonPhones, isComparisonModalOpen, closeComparison, removeFromComparison } = useUIStore();

  if (!isComparisonModalOpen || comparisonPhones.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Phone Comparison ({comparisonPhones.length} phone{comparisonPhones.length > 1 ? 's' : ''})
          </h2>
          <button
            onClick={closeComparison}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <td className="py-4 pr-4 text-left font-medium text-gray-900">Specification</td>
                  {comparisonPhones.map((phone) => (
                    <td key={phone.id} className="py-4 px-4 text-center min-w-[300px]">
                      <div className="space-y-3">
                        <div className="relative">
                          <img
                            src={phone.images.main}
                            alt={phone.name}
                            className="w-24 h-24 object-contain mx-auto bg-gray-50 rounded-lg p-2"
                          />
                          <button
                            onClick={() => removeFromComparison(phone.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{phone.name}</h3>
                          <p className="text-primary-600 font-semibold">
                            {formatPrice(phone.price.current, phone.price.currency)}
                          </p>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Overall Rating */}
                <ComparisonRow 
                  label="Overall Rating"
                  phones={comparisonPhones}
                  getValue={(phone) => `${phone.rating.overall}/5`}
                />

                {/* Display */}
                <ComparisonRow 
                  label="Display Size"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.display.size}
                />
                <ComparisonRow 
                  label="Display Type"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.display.type}
                />
                <ComparisonRow 
                  label="Resolution"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.display.resolution}
                />
                <ComparisonRow 
                  label="Refresh Rate"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.display.refreshRate}
                />

                {/* Performance */}
                <ComparisonRow 
                  label="Chipset"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.processor.chipset}
                />
                <ComparisonRow 
                  label="Performance Rating"
                  phones={comparisonPhones}
                  getValue={(phone) => `${phone.rating.performance}/5`}
                />

                {/* Memory */}
                <ComparisonRow 
                  label="RAM"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.memory.ram.join(', ')}
                />
                <ComparisonRow 
                  label="Storage"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.memory.storage.join(', ')}
                />

                {/* Camera */}
                <ComparisonRow 
                  label="Main Camera"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.camera.rear.main}
                />
                <ComparisonRow 
                  label="Front Camera"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.camera.front.main}
                />
                <ComparisonRow 
                  label="Camera Rating"
                  phones={comparisonPhones}
                  getValue={(phone) => `${phone.rating.camera}/5`}
                />

                {/* Battery */}
                <ComparisonRow 
                  label="Battery Capacity"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.battery.capacity}
                />
                <ComparisonRow 
                  label="Charging Speed"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.battery.charging.wired}
                />
                <ComparisonRow 
                  label="Battery Rating"
                  phones={comparisonPhones}
                  getValue={(phone) => `${phone.rating.battery}/5`}
                />

                {/* Design */}
                <ComparisonRow 
                  label="Weight"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.design.weight}
                />
                <ComparisonRow 
                  label="Materials"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.design.materials.join(', ')}
                />
                <ComparisonRow 
                  label="Water Resistance"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.design.waterResistance || 'Not specified'}
                />

                {/* Connectivity */}
                <ComparisonRow 
                  label="5G Support"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.connectivity.network.includes('5G') ? 'Yes' : 'No'}
                />
                <ComparisonRow 
                  label="Wireless Charging"
                  phones={comparisonPhones}
                  getValue={(phone) => phone.specifications.battery.charging.wireless ? 'Yes' : 'No'}
                />

                {/* Reviews */}
                <ComparisonRow 
                  label="Review Count"
                  phones={comparisonPhones}
                  getValue={(phone) => `${phone.reviews.count} reviews`}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Comparing {comparisonPhones.length} phone{comparisonPhones.length > 1 ? 's' : ''}. 
              You can add up to 3 phones for comparison.
            </p>
            <button
              onClick={closeComparison}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ComparisonRowProps {
  label: string;
  phones: MobilePhone[];
  getValue: (phone: MobilePhone) => string;
}

function ComparisonRow({ label, phones, getValue }: ComparisonRowProps) {
  return (
    <tr>
      <td className="py-3 pr-4 text-left font-medium text-gray-900">{label}</td>
      {phones.map((phone) => (
        <td key={phone.id} className="py-3 px-4 text-center text-gray-700">
          {getValue(phone)}
        </td>
      ))}
    </tr>
  );
}