'use client';

import React, { useState } from 'react';
import { MobilePhone } from '@/types';
import { PhoneCard } from './PhoneCard';
import { formatPrice, cn } from '@/lib/utils';

interface PhoneComparisonProps {
  comparison: {
    phones: MobilePhone[];
    analysis: string;
    winner?: string;
  };
}

type ComparisonCategory = 'overview' | 'performance' | 'camera' | 'battery' | 'display' | 'design';

export function PhoneComparison({ comparison }: PhoneComparisonProps) {
  const [activeCategory, setActiveCategory] = useState<ComparisonCategory>('overview');
  const { phones, analysis, winner } = comparison;

  if (phones.length < 2) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Need at least 2 phones to compare.</p>
      </div>
    );
  }

  const categories: { key: ComparisonCategory; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'performance', label: 'Performance', icon: '⚡' },
    { key: 'camera', label: 'Camera', icon: '📷' },
    { key: 'battery', label: 'Battery', icon: '🔋' },
    { key: 'display', label: 'Display', icon: '📱' },
    { key: 'design', label: 'Design', icon: '🎨' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4">
        <h3 className="text-xl font-semibold mb-2">Phone Comparison</h3>
        <p className="text-purple-100 text-sm">
          Comparing {phones.length} phones across key categories
        </p>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                "border-b-2 border-transparent hover:bg-gray-50",
                activeCategory === category.key
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeCategory === 'overview' && (
          <OverviewComparison phones={phones} winner={winner} />
        )}
        {activeCategory === 'performance' && (
          <PerformanceComparison phones={phones} />
        )}
        {activeCategory === 'camera' && (
          <CameraComparison phones={phones} />
        )}
        {activeCategory === 'battery' && (
          <BatteryComparison phones={phones} />
        )}
        {activeCategory === 'display' && (
          <DisplayComparison phones={phones} />
        )}
        {activeCategory === 'design' && (
          <DesignComparison phones={phones} />
        )}
      </div>

      {/* Analysis */}
      {analysis && (
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{analysis}</p>
        </div>
      )}
    </div>
  );
}

function OverviewComparison({ phones, winner }: { phones: MobilePhone[]; winner?: string }) {
  return (
    <div className="space-y-6">
      {/* Phone Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {phones.map((phone) => (
          <div key={phone.id} className="relative">
            <PhoneCard phone={phone} compact showActions={false} />
            {winner === phone.id && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                🏆 Winner
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 font-medium text-gray-900">Specification</th>
              {phones.map((phone) => (
                <th key={phone.id} className="text-center py-2 font-medium text-gray-900 min-w-32">
                  {phone.brand}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <ComparisonRow
              label="Price"
              values={phones.map(p => formatPrice(p.price.current))}
              highlight="lower"
            />
            <ComparisonRow
              label="Overall Rating"
              values={phones.map(p => `${p.rating.overall}/5`)}
              highlight="higher"
            />
            <ComparisonRow
              label="Display Size"
              values={phones.map(p => p.specifications.display.size)}
            />
            <ComparisonRow
              label="Main Camera"
              values={phones.map(p => p.specifications.camera.rear.main)}
            />
            <ComparisonRow
              label="Battery"
              values={phones.map(p => p.specifications.battery.capacity)}
              highlight="higher"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PerformanceComparison({ phones }: { phones: MobilePhone[] }) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Performance Comparison</h4>
      <div className="grid gap-4">
        {phones.map((phone) => (
          <div key={phone.id} className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">{phone.name}</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Processor:</span>
                <p className="font-medium">{phone.specifications.processor.chipset}</p>
              </div>
              <div>
                <span className="text-gray-500">CPU:</span>
                <p className="font-medium">{phone.specifications.processor.cpu}</p>
              </div>
              <div>
                <span className="text-gray-500">GPU:</span>
                <p className="font-medium">{phone.specifications.processor.gpu}</p>
              </div>
              <div>
                <span className="text-gray-500">Performance Rating:</span>
                <p className="font-medium">{phone.rating.performance}/5</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CameraComparison({ phones }: { phones: MobilePhone[] }) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Camera Comparison</h4>
      <div className="grid gap-4">
        {phones.map((phone) => (
          <div key={phone.id} className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">{phone.name}</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Main Camera:</span>
                <p className="font-medium">{phone.specifications.camera.rear.main}</p>
              </div>
              <div>
                <span className="text-gray-500">Front Camera:</span>
                <p className="font-medium">{phone.specifications.camera.front.main}</p>
              </div>
              <div>
                <span className="text-gray-500">Ultra-wide:</span>
                <p className="font-medium">{phone.specifications.camera.rear.ultrawide || 'None'}</p>
              </div>
              <div>
                <span className="text-gray-500">Camera Rating:</span>
                <p className="font-medium">{phone.rating.camera}/5</p>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-gray-500 text-xs">Features:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {phone.specifications.camera.rear.features.slice(0, 4).map((feature, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BatteryComparison({ phones }: { phones: MobilePhone[] }) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Battery Comparison</h4>
      <div className="grid gap-4">
        {phones.map((phone) => (
          <div key={phone.id} className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">{phone.name}</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Capacity:</span>
                <p className="font-medium">{phone.specifications.battery.capacity}</p>
              </div>
              <div>
                <span className="text-gray-500">Fast Charging:</span>
                <p className="font-medium">{phone.specifications.battery.charging.wired}</p>
              </div>
              <div>
                <span className="text-gray-500">Wireless Charging:</span>
                <p className="font-medium">{phone.specifications.battery.charging.wireless || 'None'}</p>
              </div>
              <div>
                <span className="text-gray-500">Battery Rating:</span>
                <p className="font-medium">{phone.rating.battery}/5</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DisplayComparison({ phones }: { phones: MobilePhone[] }) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Display Comparison</h4>
      <div className="grid gap-4">
        {phones.map((phone) => (
          <div key={phone.id} className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">{phone.name}</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Size:</span>
                <p className="font-medium">{phone.specifications.display.size}</p>
              </div>
              <div>
                <span className="text-gray-500">Type:</span>
                <p className="font-medium">{phone.specifications.display.type}</p>
              </div>
              <div>
                <span className="text-gray-500">Resolution:</span>
                <p className="font-medium">{phone.specifications.display.resolution}</p>
              </div>
              <div>
                <span className="text-gray-500">Refresh Rate:</span>
                <p className="font-medium">{phone.specifications.display.refreshRate}</p>
              </div>
              <div>
                <span className="text-gray-500">Protection:</span>
                <p className="font-medium">{phone.specifications.display.protection}</p>
              </div>
              <div>
                <span className="text-gray-500">Display Rating:</span>
                <p className="font-medium">{phone.rating.display}/5</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignComparison({ phones }: { phones: MobilePhone[] }) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Design Comparison</h4>
      <div className="grid gap-4">
        {phones.map((phone) => (
          <div key={phone.id} className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">{phone.name}</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Dimensions:</span>
                <p className="font-medium">{phone.specifications.design.dimensions}</p>
              </div>
              <div>
                <span className="text-gray-500">Weight:</span>
                <p className="font-medium">{phone.specifications.design.weight}</p>
              </div>
              <div>
                <span className="text-gray-500">Materials:</span>
                <p className="font-medium">{phone.specifications.design.materials.join(', ')}</p>
              </div>
              <div>
                <span className="text-gray-500">Water Resistance:</span>
                <p className="font-medium">{phone.specifications.design.waterResistance || 'None'}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Available Colors:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {phone.specifications.design.colors.map((color, index) => (
                    <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Design Rating:</span>
                <p className="font-medium">{phone.rating.design}/5</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonRow({ 
  label, 
  values, 
  highlight 
}: { 
  label: string; 
  values: string[]; 
  highlight?: 'higher' | 'lower' 
}) {
  const getBestIndex = () => {
    if (!highlight) return -1;
    
    const numericValues = values.map(v => {
      const num = parseFloat(v.replace(/[^\d.]/g, ''));
      return isNaN(num) ? 0 : num;
    });
    
    if (highlight === 'higher') {
      return numericValues.indexOf(Math.max(...numericValues));
    } else {
      return numericValues.indexOf(Math.min(...numericValues));
    }
  };

  const bestIndex = getBestIndex();

  return (
    <tr>
      <td className="py-2 text-gray-700 font-medium">{label}</td>
      {values.map((value, index) => (
        <td key={index} className={cn(
          "py-2 text-center",
          bestIndex === index && highlight
            ? "text-green-600 font-semibold bg-green-50"
            : "text-gray-600"
        )}>
          {value}
        </td>
      ))}
    </tr>
  );
}