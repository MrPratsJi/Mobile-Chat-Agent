import { MobilePhone } from '@/types';

export const mobilePhones: MobilePhone[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    model: '15 Pro',
    price: {
      current: 134900,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.1"',
        resolution: '2556 x 1179',
        type: 'Super Retina XDR OLED',
        refreshRate: '120Hz ProMotion',
        protection: 'Ceramic Shield'
      },
      processor: {
        chipset: 'Apple A17 Pro',
        cpu: '6-core (2+4)',
        gpu: '6-core Apple GPU'
      },
      memory: {
        ram: ['8GB'],
        storage: ['128GB', '256GB', '512GB', '1TB'],
        expandable: false
      },
      camera: {
        rear: {
          main: '48MP f/1.78',
          ultrawide: '13MP f/2.2',
          telephoto: '12MP f/2.8 (3x)',
          features: ['Night mode', 'Deep Fusion', 'Smart HDR 5', 'ProRAW', 'Action mode']
        },
        front: {
          main: '12MP f/1.9',
          features: ['Night mode', 'Deep Fusion', 'Smart HDR 5']
        },
        video: {
          rear: '4K@60fps, ProRes, Log recording',
          front: '4K@60fps'
        }
      },
      battery: {
        capacity: '3274mAh',
        charging: {
          wired: '20W',
          wireless: '15W MagSafe',
          reverse: 'Yes'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6E',
        bluetooth: 'Bluetooth 5.3',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '146.6 x 70.6 x 8.25mm',
        weight: '187g',
        materials: ['Titanium', 'Glass'],
        colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
        waterResistance: 'IP68'
      },
      software: {
        os: 'iOS 17',
        ui: 'iOS',
        updateSupport: '5+ years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Spatial Audio', 'Dolby Atmos']
      },
      sensors: ['Face ID', 'LiDAR', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      'Titanium design',
      'A17 Pro chip',
      'Action Button',
      'USB-C',
      'Pro camera system'
    ],
    pros: [
      'Excellent performance',
      'Premium build quality',
      'Great camera system',
      'Long software support'
    ],
    cons: [
      'Expensive',
      'No expandable storage',
      'Limited customization'
    ],
    targetAudience: ['Professionals', 'Photographers', 'Premium users'],
    tags: ['flagship', 'premium', 'camera', 'performance'],
    rating: {
      overall: 4.7,
      camera: 4.8,
      performance: 4.9,
      battery: 4.3,
      display: 4.8,
      design: 4.9
    },
    reviews: {
      count: 1250,
      summary: 'Excellent flagship with premium build and top-tier performance'
    },
    releaseDate: '2023-09-22',
    category: 'flagship'
  },
  {
    id: 'pixel-8a',
    name: 'Google Pixel 8a',
    brand: 'Google',
    model: '8a',
    price: {
      current: 52999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.1"',
        resolution: '2400 x 1080',
        type: 'OLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass 3'
      },
      processor: {
        chipset: 'Google Tensor G3',
        cpu: '9-core (1+4+4)',
        gpu: 'Mali-G715 MP7'
      },
      memory: {
        ram: ['8GB'],
        storage: ['128GB', '256GB'],
        expandable: false
      },
      camera: {
        rear: {
          main: '64MP f/1.89',
          ultrawide: '13MP f/2.2',
          features: ['Night Sight', 'Portrait mode', 'Magic Eraser', 'Real Tone', 'Live Translate']
        },
        front: {
          main: '13MP f/2.2',
          features: ['Portrait mode', 'Night Sight']
        },
        video: {
          rear: '4K@30fps',
          front: '4K@30fps'
        }
      },
      battery: {
        capacity: '4492mAh',
        charging: {
          wired: '18W',
          wireless: '7.5W'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6E',
        bluetooth: 'Bluetooth 5.3',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '152.1 x 72.7 x 8.9mm',
        weight: '193.5g',
        materials: ['Aluminum', 'Glass'],
        colors: ['Obsidian', 'Porcelain', 'Bay', 'Mint'],
        waterResistance: 'IP67'
      },
      software: {
        os: 'Android 14',
        ui: 'Pixel UI',
        updateSupport: '7 years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Spatial Audio']
      },
      sensors: ['Fingerprint (under-display)', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      'AI-powered photography',
      'Clean Android experience',
      '7 years of updates',
      'Affordable price',
      'Computational photography'
    ],
    pros: [
      'Excellent camera AI features',
      'Clean software',
      'Long update support',
      'Good value for money'
    ],
    cons: [
      'Average performance',
      'Slower charging',
      'No telephoto camera'
    ],
    targetAudience: ['Photography enthusiasts', 'Stock Android lovers', 'Budget-conscious buyers'],
    tags: ['mid-range', 'camera', 'ai', 'updates'],
    rating: {
      overall: 4.4,
      camera: 4.6,
      performance: 4.1,
      battery: 4.3,
      display: 4.4,
      design: 4.3
    },
    reviews: {
      count: 892,
      summary: 'Great camera and software experience at mid-range price'
    },
    releaseDate: '2024-05-07',
    category: 'mid-range'
  },
  {
    id: 'oneplus-12r',
    name: 'OnePlus 12R',
    brand: 'OnePlus',
    model: '12R',
    price: {
      current: 39999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.78"',
        resolution: '2780 x 1264',
        type: 'LTPO4 AMOLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass Victus 2'
      },
      processor: {
        chipset: 'Snapdragon 8 Gen 2',
        cpu: '8-core (1+2+2+3)',
        gpu: 'Adreno 740'
      },
      memory: {
        ram: ['8GB', '16GB'],
        storage: ['128GB', '256GB'],
        expandable: false
      },
      camera: {
        rear: {
          main: '50MP f/1.8',
          ultrawide: '8MP f/2.2',
          macro: '2MP f/2.4',
          features: ['OIS', 'Nightscape', 'Portrait mode', 'Pro mode']
        },
        front: {
          main: '16MP f/2.4',
          features: ['Portrait mode', 'AI enhancement']
        },
        video: {
          rear: '4K@60fps',
          front: '1080p@30fps'
        }
      },
      battery: {
        capacity: '5500mAh',
        charging: {
          wired: '100W SuperVOOC'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 7',
        bluetooth: 'Bluetooth 5.3',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '163.3 x 75.3 x 8.8mm',
        weight: '207g',
        materials: ['Aluminum', 'Glass'],
        colors: ['Cool Blue', 'Iron Gray'],
        waterResistance: 'IP64'
      },
      software: {
        os: 'Android 14',
        ui: 'OxygenOS 14',
        updateSupport: '4 years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Dolby Atmos']
      },
      sensors: ['Fingerprint (under-display)', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      '100W fast charging',
      'Flagship performance',
      'Large battery',
      'Smooth display',
      'Great value'
    ],
    pros: [
      'Excellent performance',
      'Ultra-fast charging',
      'Large battery',
      'Smooth display'
    ],
    cons: [
      'Average camera system',
      'No wireless charging',
      'Limited water resistance'
    ],
    targetAudience: ['Gamers', 'Performance enthusiasts', 'Heavy users'],
    tags: ['performance', 'gaming', 'fast-charging', 'value'],
    rating: {
      overall: 4.5,
      camera: 4.2,
      performance: 4.8,
      battery: 4.7,
      display: 4.6,
      design: 4.4
    },
    reviews: {
      count: 756,
      summary: 'Flagship performance with excellent battery life and fast charging'
    },
    releaseDate: '2024-02-13',
    category: 'premium'
  },
  {
    id: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    model: 'Galaxy S24',
    price: {
      current: 79999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.2"',
        resolution: '2340 x 1080',
        type: 'Dynamic AMOLED 2X',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass Victus 2'
      },
      processor: {
        chipset: 'Samsung Exynos 2400',
        cpu: '10-core (1+2+3+4)',
        gpu: 'Xclipse 940'
      },
      memory: {
        ram: ['8GB'],
        storage: ['128GB', '256GB'],
        expandable: false
      },
      camera: {
        rear: {
          main: '50MP f/1.8',
          ultrawide: '12MP f/2.2',
          telephoto: '10MP f/2.4 (3x)',
          features: ['OIS', 'Night mode', 'Portrait mode', 'Pro mode', 'Galaxy AI']
        },
        front: {
          main: '12MP f/2.2',
          features: ['Portrait mode', 'Night mode']
        },
        video: {
          rear: '8K@30fps, 4K@60fps',
          front: '4K@60fps'
        }
      },
      battery: {
        capacity: '4000mAh',
        charging: {
          wired: '25W',
          wireless: '15W',
          reverse: '4.5W'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6E',
        bluetooth: 'Bluetooth 5.3',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '147 x 70.6 x 7.6mm',
        weight: '167g',
        materials: ['Aluminum', 'Glass'],
        colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
        waterResistance: 'IP68'
      },
      software: {
        os: 'Android 14',
        ui: 'One UI 6.1',
        updateSupport: '7 years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Dolby Atmos']
      },
      sensors: ['Fingerprint (under-display)', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      'Galaxy AI features',
      'Compact flagship',
      '7 years of updates',
      'Versatile camera system',
      'Premium design'
    ],
    pros: [
      'Compact size',
      'AI-powered features',
      'Good camera system',
      'Premium build quality'
    ],
    cons: [
      'Smaller battery',
      'Slower charging',
      'Expensive'
    ],
    targetAudience: ['Compact phone lovers', 'Samsung ecosystem users', 'AI enthusiasts'],
    tags: ['flagship', 'compact', 'ai', 'camera'],
    rating: {
      overall: 4.5,
      camera: 4.6,
      performance: 4.5,
      battery: 4.0,
      display: 4.7,
      design: 4.6
    },
    reviews: {
      count: 1456,
      summary: 'Compact flagship with AI features and solid overall performance'
    },
    releaseDate: '2024-01-17',
    category: 'flagship'
  },
  {
    id: 'redmi-note-13-pro',
    name: 'Redmi Note 13 Pro',
    brand: 'Xiaomi',
    model: 'Redmi Note 13 Pro',
    price: {
      current: 24999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.67"',
        resolution: '2712 x 1220',
        type: 'AMOLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass 5'
      },
      processor: {
        chipset: 'Snapdragon 7s Gen 2',
        cpu: '8-core (1+3+4)',
        gpu: 'Adreno 710'
      },
      memory: {
        ram: ['8GB', '12GB'],
        storage: ['128GB', '256GB'],
        expandable: true
      },
      camera: {
        rear: {
          main: '200MP f/1.65',
          ultrawide: '8MP f/2.2',
          macro: '2MP f/2.4',
          features: ['OIS', 'Night mode', 'Portrait mode', 'Pro mode']
        },
        front: {
          main: '16MP f/2.4',
          features: ['Portrait mode', 'Night mode']
        },
        video: {
          rear: '4K@30fps',
          front: '1080p@30fps'
        }
      },
      battery: {
        capacity: '5100mAh',
        charging: {
          wired: '67W'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.2',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '161.15 x 74.95 x 7.98mm',
        weight: '187g',
        materials: ['Plastic', 'Glass'],
        colors: ['Mystic Black', 'Ocean Teal', 'Sunset Purple'],
        waterResistance: 'IP54'
      },
      software: {
        os: 'Android 13',
        ui: 'MIUI 14',
        updateSupport: '3 years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: true,
        features: ['Hi-Res Audio']
      },
      sensors: ['Fingerprint (side-mounted)', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      '200MP main camera',
      'AMOLED display',
      'Fast charging',
      'Expandable storage',
      'Great value'
    ],
    pros: [
      'Excellent camera for price',
      'Good display quality',
      'Fast charging',
      'Expandable storage'
    ],
    cons: [
      'Average performance',
      'MIUI can be heavy',
      'Limited water resistance'
    ],
    targetAudience: ['Budget photographers', 'Students', 'First-time smartphone buyers'],
    tags: ['mid-range', 'camera', 'value', 'display'],
    rating: {
      overall: 4.3,
      camera: 4.5,
      performance: 4.1,
      battery: 4.4,
      display: 4.4,
      design: 4.2
    },
    reviews: {
      count: 2341,
      summary: 'Excellent camera and display at an affordable price point'
    },
    releaseDate: '2024-01-04',
    category: 'mid-range'
  },
  {
    id: 'realme-12-pro-plus',
    name: 'Realme 12 Pro+',
    brand: 'Realme',
    model: '12 Pro+',
    price: {
      current: 29999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.7"',
        resolution: '2412 x 1080',
        type: 'AMOLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass 5'
      },
      processor: {
        chipset: 'Snapdragon 7s Gen 2',
        cpu: '8-core (1+3+4)',
        gpu: 'Adreno 710'
      },
      memory: {
        ram: ['8GB', '12GB'],
        storage: ['128GB', '256GB'],
        expandable: true
      },
      camera: {
        rear: {
          main: '50MP f/1.8',
          ultrawide: '8MP f/2.2',
          telephoto: '64MP f/2.6 (3x)',
          features: ['OIS', 'Periscope zoom', 'Night mode', 'Portrait mode']
        },
        front: {
          main: '32MP f/2.4',
          features: ['Portrait mode', 'Night mode']
        },
        video: {
          rear: '4K@30fps',
          front: '1080p@30fps'
        }
      },
      battery: {
        capacity: '5000mAh',
        charging: {
          wired: '67W'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.2',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '161.47 x 74.02 x 8.75mm',
        weight: '196g',
        materials: ['Plastic', 'Glass'],
        colors: ['Submarine Blue', 'Explorer Red', 'Navigator Beige'],
        waterResistance: 'IP65'
      },
      software: {
        os: 'Android 14',
        ui: 'Realme UI 5.0',
        updateSupport: '3 years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Hi-Res Audio', 'Dolby Atmos']
      },
      sensors: ['Fingerprint (under-display)', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      'Periscope telephoto camera',
      '3x optical zoom',
      'Premium design',
      'Fast charging',
      'Good performance'
    ],
    pros: [
      'Excellent zoom camera',
      'Premium design',
      'Good performance',
      'Fast charging'
    ],
    cons: [
      'Average main camera',
      'No wireless charging',
      'Heavy UI'
    ],
    targetAudience: ['Photography enthusiasts', 'Style-conscious users', 'Mid-range buyers'],
    tags: ['mid-range', 'camera', 'zoom', 'design'],
    rating: {
      overall: 4.2,
      camera: 4.4,
      performance: 4.1,
      battery: 4.3,
      display: 4.3,
      design: 4.4
    },
    reviews: {
      count: 1234,
      summary: 'Great zoom camera and premium design at mid-range price'
    },
    releaseDate: '2024-01-29',
    category: 'mid-range'
  },
  {
    id: 'poco-x6-pro',
    name: 'POCO X6 Pro',
    brand: 'POCO',
    model: 'X6 Pro',
    price: {
      current: 26999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.67"',
        resolution: '2712 x 1220',
        type: 'AMOLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass 5'
      },
      processor: {
        chipset: 'MediaTek Dimensity 8300-Ultra',
        cpu: '8-core (1+3+4)',
        gpu: 'Mali-G615 MC6'
      },
      memory: {
        ram: ['8GB', '12GB'],
        storage: ['256GB', '512GB'],
        expandable: false
      },
      camera: {
        rear: {
          main: '64MP f/1.79',
          ultrawide: '8MP f/2.2',
          macro: '2MP f/2.4',
          features: ['OIS', 'Night mode', 'Portrait mode', 'Pro mode']
        },
        front: {
          main: '16MP f/2.3',
          features: ['Portrait mode']
        },
        video: {
          rear: '4K@30fps',
          front: '1080p@30fps'
        }
      },
      battery: {
        capacity: '5000mAh',
        charging: {
          wired: '67W'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.4',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '160.5 x 74.3 x 8.25mm',
        weight: '186g',
        materials: ['Plastic', 'Glass'],
        colors: ['Shadow Black', 'Snowstorm White', 'Yellow'],
        waterResistance: 'IP54'
      },
      software: {
        os: 'Android 14',
        ui: 'HyperOS',
        updateSupport: '3 years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Hi-Res Audio', 'Dolby Atmos']
      },
      sensors: ['Fingerprint (under-display)', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      'Gaming performance',
      'MediaTek Dimensity 8300',
      'AMOLED display',
      'Fast charging',
      'Aggressive pricing'
    ],
    pros: [
      'Excellent performance',
      'Good gaming capabilities',
      'Fast charging',
      'Value for money'
    ],
    cons: [
      'Average camera system',
      'No expandable storage',
      'Heavy UI'
    ],
    targetAudience: ['Gamers', 'Performance seekers', 'Budget-conscious buyers'],
    tags: ['mid-range', 'gaming', 'performance', 'value'],
    rating: {
      overall: 4.3,
      camera: 4.0,
      performance: 4.6,
      battery: 4.4,
      display: 4.4,
      design: 4.1
    },
    reviews: {
      count: 1567,
      summary: 'Great performance phone for gaming and daily use at competitive price'
    },
    releaseDate: '2024-01-11',
    category: 'mid-range'
  },
  {
    id: 'iphone-se-3rd-gen',
    name: 'iPhone SE (3rd Gen)',
    brand: 'Apple',
    model: 'SE 3rd Gen',
    price: {
      current: 47900,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400'
      ]
    },
    specifications: {
      display: {
        size: '4.7"',
        resolution: '1334 x 750',
        type: 'Retina LCD',
        refreshRate: '60Hz',
        protection: 'Glass'
      },
      processor: {
        chipset: 'Apple A15 Bionic',
        cpu: '6-core (2+4)',
        gpu: '4-core Apple GPU'
      },
      memory: {
        ram: ['4GB'],
        storage: ['64GB', '128GB', '256GB'],
        expandable: false
      },
      camera: {
        rear: {
          main: '12MP f/1.8',
          features: ['Portrait mode', 'Smart HDR 4', 'Deep Fusion']
        },
        front: {
          main: '7MP f/2.2',
          features: ['Portrait mode', 'Smart HDR 4']
        },
        video: {
          rear: '4K@60fps',
          front: '1080p@30fps'
        }
      },
      battery: {
        capacity: '2018mAh',
        charging: {
          wired: '20W',
          wireless: '7.5W'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.0',
        usb: 'Lightning',
        nfc: true
      },
      design: {
        dimensions: '138.4 x 67.3 x 7.3mm',
        weight: '144g',
        materials: ['Aluminum', 'Glass'],
        colors: ['Midnight', 'Starlight', 'Red'],
        waterResistance: 'IP67'
      },
      software: {
        os: 'iOS 17',
        ui: 'iOS',
        updateSupport: '5+ years'
      },
      audio: {
        speakers: 'Single speaker',
        headphoneJack: false,
        features: ['Spatial Audio']
      },
      sensors: ['Touch ID', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      'Compact size',
      'A15 Bionic chip',
      'Touch ID',
      'iOS experience',
      'Long software support'
    ],
    pros: [
      'Compact and lightweight',
      'Powerful processor',
      'iOS ecosystem',
      'Touch ID'
    ],
    cons: [
      'Old design',
      'Small screen',
      'Poor battery life',
      'Single camera'
    ],
    targetAudience: ['Compact phone lovers', 'iOS users', 'Budget iPhone buyers'],
    tags: ['compact', 'ios', 'budget', 'apple'],
    rating: {
      overall: 4.1,
      camera: 3.8,
      performance: 4.5,
      battery: 3.5,
      display: 3.8,
      design: 4.0
    },
    reviews: {
      count: 876,
      summary: 'Compact iPhone with powerful processor but dated design'
    },
    releaseDate: '2022-03-18',
    category: 'budget'
  },
  {
    id: 'nothing-phone-2a',
    name: 'Nothing Phone (2a)',
    brand: 'Nothing',
    model: 'Phone (2a)',
    price: {
      current: 23999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.7"',
        resolution: '2412 x 1084',
        type: 'AMOLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass 5'
      },
      processor: {
        chipset: 'MediaTek Dimensity 7200 Pro',
        cpu: '8-core (2+6)',
        gpu: 'Mali-G610 MC4'
      },
      memory: {
        ram: ['8GB', '12GB'],
        storage: ['128GB', '256GB'],
        expandable: false
      },
      camera: {
        rear: {
          main: '50MP f/1.88',
          ultrawide: '50MP f/2.2',
          features: ['Night mode', 'Portrait mode', 'Ultra XDR']
        },
        front: {
          main: '32MP f/2.2',
          features: ['Portrait mode']
        },
        video: {
          rear: '4K@30fps',
          front: '1080p@30fps'
        }
      },
      battery: {
        capacity: '5000mAh',
        charging: {
          wired: '45W'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.3',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '161.7 x 76.3 x 8.55mm',
        weight: '190g',
        materials: ['Aluminum', 'Plastic'],
        colors: ['Milk', 'Black'],
        waterResistance: 'IP54'
      },
      software: {
        os: 'Android 14',
        ui: 'Nothing OS 2.5',
        updateSupport: '3 years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Hi-Res Audio']
      },
      sensors: ['Fingerprint (under-display)', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      'Unique transparent design',
      'Glyph Interface',
      'Clean software',
      'Dual 50MP cameras',
      'Nothing OS experience'
    ],
    pros: [
      'Unique design',
      'Clean software',
      'Good cameras',
      'Smooth performance'
    ],
    cons: [
      'Average battery life',
      'No expandable storage',
      'Limited availability'
    ],
    targetAudience: ['Design enthusiasts', 'Young users', 'Tech enthusiasts'],
    tags: ['mid-range', 'design', 'unique', 'camera'],
    rating: {
      overall: 4.2,
      camera: 4.3,
      performance: 4.1,
      battery: 4.0,
      display: 4.3,
      design: 4.7
    },
    reviews: {
      count: 543,
      summary: 'Unique design with solid performance and clean software experience'
    },
    releaseDate: '2024-03-05',
    category: 'mid-range'
  },
  {
    id: 'motorola-edge-50-fusion',
    name: 'Motorola Edge 50 Fusion',
    brand: 'Motorola',
    model: 'Edge 50 Fusion',
    price: {
      current: 22999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.7"',
        resolution: '2400 x 1080',
        type: 'pOLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass 5'
      },
      processor: {
        chipset: 'Snapdragon 7s Gen 2',
        cpu: '8-core (1+3+4)',
        gpu: 'Adreno 710'
      },
      memory: {
        ram: ['8GB', '12GB'],
        storage: ['128GB', '256GB'],
        expandable: true
      },
      camera: {
        rear: {
          main: '50MP f/1.8',
          ultrawide: '13MP f/2.2',
          features: ['OIS', 'Night Vision', 'Portrait mode', 'Macro Vision']
        },
        front: {
          main: '32MP f/2.4',
          features: ['Portrait mode', 'Night Vision']
        },
        video: {
          rear: '4K@30fps',
          front: '4K@30fps'
        }
      },
      battery: {
        capacity: '5000mAh',
        charging: {
          wired: '68W',
          wireless: '15W'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.2',
        usb: 'USB-C',
        nfc: true
      },
      design: {
        dimensions: '167.1 x 75.4 x 7.9mm',
        weight: '175g',
        materials: ['Aluminum', 'Vegan leather/Acrylic'],
        colors: ['Marshmallow Blue', 'Hot Pink', 'Forest Blue'],
        waterResistance: 'IP68'
      },
      software: {
        os: 'Android 14',
        ui: 'MyUX',
        updateSupport: '3 years'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Dolby Atmos', 'Hi-Res Audio']
      },
      sensors: ['Fingerprint (under-display)', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient light']
    },
    highlights: [
      'Lightweight design',
      'IP68 rating',
      'Wireless charging',
      'Clean Android',
      'Fast charging'
    ],
    pros: [
      'Lightweight and slim',
      'IP68 water resistance',
      'Clean Android experience',
      'Wireless charging support'
    ],
    cons: [
      'Average performance',
      'Camera could be better',
      'No telephoto camera'
    ],
    targetAudience: ['Style-conscious users', 'Android purists', 'Casual users'],
    tags: ['mid-range', 'design', 'clean-android', 'lightweight'],
    rating: {
      overall: 4.1,
      camera: 4.0,
      performance: 4.0,
      battery: 4.2,
      display: 4.2,
      design: 4.4
    },
    reviews: {
      count: 432,
      summary: 'Stylish and lightweight phone with clean Android experience'
    },
    releaseDate: '2024-05-16',
    category: 'mid-range'
  },
  {
    id: 'samsung-galaxy-a34',
    name: 'Samsung Galaxy A34 5G',
    brand: 'Samsung',
    model: 'Galaxy A34 5G',
    price: {
      current: 24999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.6"',
        resolution: '2340 x 1080',
        type: 'Super AMOLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass 5'
      },
      processor: {
        chipset: 'MediaTek Dimensity 1080',
        cpu: 'Octa-core (2x2.6 GHz + 6x2.0 GHz)',
        gpu: 'Mali-G68 MC4'
      },
      memory: {
        ram: ['6GB', '8GB'],
        storage: ['128GB', '256GB'],
        expandable: true
      },
      camera: {
        rear: {
          main: '48MP f/1.8',
          ultrawide: '8MP f/2.2',
          macro: '5MP f/2.4',
          features: ['OIS', 'Night mode', 'Portrait mode']
        },
        front: {
          main: '13MP f/2.2',
          features: ['Portrait mode']
        },
        video: {
          rear: '4K@30fps, 1080p@30/60fps',
          front: '1080p@30fps'
        }
      },
      battery: {
        capacity: '5000mAh',
        charging: {
          wired: '25W fast charging'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 802.11 a/b/g/n/ac',
        bluetooth: '5.3',
        usb: 'USB Type-C',
        nfc: true
      },
      design: {
        dimensions: '161.3 x 78.1 x 8.2 mm',
        weight: '199g',
        materials: ['Glass front', 'Plastic frame', 'Plastic back'],
        colors: ['Awesome Black', 'Awesome Silver', 'Awesome Violet'],
        waterResistance: 'IP67'
      },
      software: {
        os: 'Android 13',
        ui: 'One UI 5.1',
        updateSupport: '4 years OS + 5 years security'
      },
      audio: {
        speakers: 'Stereo speakers',
        headphoneJack: false,
        features: ['Dolby Atmos']
      },
      sensors: ['Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass']
    },
    highlights: [
      'Excellent AMOLED display',
      'Great battery life',
      'Good camera performance'
    ],
    pros: [
      'Beautiful AMOLED display with 120Hz',
      'Excellent battery life',
      'Good main camera with OIS',
      'IP67 water resistance',
      'Long software support'
    ],
    cons: [
      'Plastic build',
      'Average performance',
      'Slow charging'
    ],
    rating: {
      overall: 4.2,
      camera: 4.0,
      performance: 3.8,
      battery: 4.5,
      display: 4.3,
      design: 3.7
    },
    reviews: {
      count: 1523,
      summary: 'Solid mid-range phone with great display and battery'
    },
    tags: ['mid-range', 'battery', 'camera', '5g'],
    targetAudience: ['Budget conscious users', 'Samsung fans', 'Battery life seekers'],
    releaseDate: '2023-03-24',
    category: 'mid-range'
  },
  {
    id: 'samsung-galaxy-m34',
    name: 'Samsung Galaxy M34 5G',
    brand: 'Samsung',
    model: 'Galaxy M34 5G',
    price: {
      current: 18999,
      currency: 'INR'
    },
    availability: 'in-stock',
    images: {
      main: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
      ]
    },
    specifications: {
      display: {
        size: '6.5"',
        resolution: '2340 x 1080',
        type: 'Super AMOLED',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass 5'
      },
      processor: {
        chipset: 'Samsung Exynos 1280',
        cpu: 'Octa-core (2x2.4 GHz + 6x2.0 GHz)',
        gpu: 'Mali-G68'
      },
      memory: {
        ram: ['6GB', '8GB'],
        storage: ['128GB'],
        expandable: true
      },
      camera: {
        rear: {
          main: '50MP f/1.8',
          ultrawide: '8MP f/2.2',
          macro: '2MP f/2.4',
          features: ['Night mode', 'Portrait mode']
        },
        front: {
          main: '13MP f/2.2',
          features: ['Portrait mode']
        },
        video: {
          rear: '4K@30fps, 1080p@30/60fps',
          front: '1080p@30fps'
        }
      },
      battery: {
        capacity: '6000mAh',
        charging: {
          wired: '25W fast charging'
        }
      },
      connectivity: {
        network: ['5G', '4G LTE'],
        wifi: 'Wi-Fi 802.11 a/b/g/n/ac',
        bluetooth: '5.3',
        usb: 'USB Type-C',
        nfc: false
      },
      design: {
        dimensions: '161.7 x 77.2 x 9.8 mm',
        weight: '208g',
        materials: ['Glass front', 'Plastic frame', 'Plastic back'],
        colors: ['Midnight Blue', 'Prism Silver', 'Waterfall Blue'],
        waterResistance: 'IP67'
      },
      software: {
        os: 'Android 13',
        ui: 'One UI 5.1',
        updateSupport: '4 years OS + 5 years security'
      },
      audio: {
        speakers: 'Single speaker',
        headphoneJack: false,
        features: ['Dolby Atmos']
      },
      sensors: ['Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass']
    },
    highlights: [
      'Massive 6000mAh battery',
      'Beautiful AMOLED display',
      'Great value for money'
    ],
    pros: [
      'Exceptional battery life',
      'Great AMOLED display',
      'Good value for money',
      'Expandable storage',
      'Long software support'
    ],
    cons: [
      'Average performance',
      'Plastic build',
      'No wireless charging',
      'Heavy weight'
    ],
    rating: {
      overall: 4.1,
      camera: 3.9,
      performance: 3.7,
      battery: 4.8,
      display: 4.2,
      design: 3.5
    },
    reviews: {
      count: 2156,
      summary: 'Battery champion with good display at budget price'
    },
    tags: ['budget', 'battery', '5g', 'value'],
    targetAudience: ['Budget users', 'Battery life seekers', 'Students'],
    releaseDate: '2023-07-07',
    category: 'budget'
  }
];

export const brands = Array.from(new Set(mobilePhones.map(phone => phone.brand))).sort();
export const categories = Array.from(new Set(mobilePhones.map(phone => phone.category))).sort();
export const priceRanges = [
  { label: 'Under ₹15,000', min: 0, max: 15000 },
  { label: '₹15,000 - ₹25,000', min: 15000, max: 25000 },
  { label: '₹25,000 - ₹40,000', min: 25000, max: 40000 },
  { label: '₹40,000 - ₹60,000', min: 40000, max: 60000 },
  { label: '₹60,000 - ₹80,000', min: 60000, max: 80000 },
  { label: 'Above ₹80,000', min: 80000, max: Infinity }
];

export const features = [
  'Camera', 'Gaming', 'Battery Life', 'Fast Charging', 'Wireless Charging',
  'Water Resistance', 'Compact Size', 'Large Display', '5G', 'Expandable Storage',
  'Headphone Jack', 'Fingerprint Scanner', 'Face Unlock', 'AI Features', 'Clean Android'
];