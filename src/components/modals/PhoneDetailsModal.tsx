'use client';

import React from 'react';
import { MobilePhone } from '@/types';
import { useUIStore } from '@/lib/store/ui-store';
import { formatPrice } from '@/lib/utils';

export function PhoneDetailsModal() {
  const { selectedPhone, isDetailModalOpen, closePhoneDetails, addToComparison } = useUIStore();

  if (!isDetailModalOpen || !selectedPhone) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{selectedPhone.name}</h2>
          <button
            onClick={closePhoneDetails}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-50 rounded-lg p-8 mb-6">
                <img
                  src={selectedPhone.images.main}
                  alt={selectedPhone.name}
                  className="w-full h-80 object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Price</h3>
                  <p className="text-3xl font-bold text-primary-600">
                    {formatPrice(selectedPhone.price.current, selectedPhone.price.currency)}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Highlights</h3>
                  <ul className="space-y-1">
                    {selectedPhone.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ratings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall</span>
                      <span className="font-medium">{selectedPhone.rating.overall}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Camera</span>
                      <span className="font-medium">{selectedPhone.rating.camera}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance</span>
                      <span className="font-medium">{selectedPhone.rating.performance}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery</span>
                      <span className="font-medium">{selectedPhone.rating.battery}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Display</span>
                      <span className="font-medium">{selectedPhone.rating.display}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Design</span>
                      <span className="font-medium">{selectedPhone.rating.design}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Display */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Display</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium">{selectedPhone.specifications.display.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{selectedPhone.specifications.display.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolution</span>
                    <span className="font-medium">{selectedPhone.specifications.display.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Refresh Rate</span>
                    <span className="font-medium">{selectedPhone.specifications.display.refreshRate}</span>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chipset</span>
                    <span className="font-medium">{selectedPhone.specifications.processor.chipset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CPU</span>
                    <span className="font-medium">{selectedPhone.specifications.processor.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GPU</span>
                    <span className="font-medium">{selectedPhone.specifications.processor.gpu}</span>
                  </div>
                </div>
              </div>

              {/* Memory */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Memory & Storage</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">RAM</span>
                    <span className="font-medium">{selectedPhone.specifications.memory.ram.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage</span>
                    <span className="font-medium">{selectedPhone.specifications.memory.storage.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expandable</span>
                    <span className="font-medium">{selectedPhone.specifications.memory.expandable ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              {/* Camera */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Camera</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Main</span>
                    <span className="font-medium">{selectedPhone.specifications.camera.rear.main}</span>
                  </div>
                  {selectedPhone.specifications.camera.rear.ultrawide && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ultrawide</span>
                      <span className="font-medium">{selectedPhone.specifications.camera.rear.ultrawide}</span>
                    </div>
                  )}
                  {selectedPhone.specifications.camera.rear.telephoto && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Telephoto</span>
                      <span className="font-medium">{selectedPhone.specifications.camera.rear.telephoto}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Front</span>
                    <span className="font-medium">{selectedPhone.specifications.camera.front.main}</span>
                  </div>
                </div>
              </div>

              {/* Battery */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Battery</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-medium">{selectedPhone.specifications.battery.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wired Charging</span>
                    <span className="font-medium">{selectedPhone.specifications.battery.charging.wired}</span>
                  </div>
                  {selectedPhone.specifications.battery.charging.wireless && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wireless Charging</span>
                      <span className="font-medium">{selectedPhone.specifications.battery.charging.wireless}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">Pros</h3>
                  <ul className="space-y-1">
                    {selectedPhone.pros.map((pro, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">Cons</h3>
                  <ul className="space-y-1">
                    {selectedPhone.cons.map((con, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end space-x-4">
            <button
              onClick={closePhoneDetails}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => {
                addToComparison(selectedPhone);
                closePhoneDetails();
              }}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Add to Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}