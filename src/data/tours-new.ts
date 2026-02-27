// 旅游服务数据 - 2025-2026
// 主题旅游路线和价格体系

export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  durationDays: number;
  maxGroupSize: number;
  price: {
    base: number;
    currency: string;
    perPerson: boolean;
    deposit: number;
  };
  highlights: string[];
  itinerary: DayPlan[];
  included: string[];
  excluded: string[];
  images: string[];
  targetAudience: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestSeason: string[];
  theme: string;
  city: string;
  tags: string[];
}

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  accommodation?: string;
  transportation?: string;
}

// 价格参考体系
export const PRICING_GUIDE = {
  standard: {
    name: 'Standard Package',
    priceRange: '$800 - $1,500',
    perDay: '$200 - $375',
    includes: [
      '3-star or boutique hotel accommodation',
      'Daily breakfast',
      'Private car with driver',
      'English-speaking guide',
      'Entrance fees to attractions',
      'Basic travel insurance'
    ],
    bestFor: 'Budget-conscious travelers, small groups'
  },
  premium: {
    name: 'Premium Package',
    priceRange: '$1,500 - $3,000',
    perDay: '$375 - $750',
    includes: [
      '4-star or luxury boutique hotel',
      'All meals at quality restaurants',
      'Luxury private vehicle',
      'Expert English-speaking guide',
      'Fast-track entrance to attractions',
      'Comprehensive travel insurance',
      '24/7 concierge service'
    ],
    bestFor: 'Business travelers, luxury seekers, VIP clients'
  },
  enterprise: {
    name: 'Enterprise/Business Package',
    priceRange: '$3,000+',
    perDay: '$750+',
    includes: [
      '5-star luxury hotel or serviced apartment',
      'Gourmet dining and business meals',
      'Business class transportation',
      'Corporate concierge services',
      'Meeting room and office facilities',
      'Professional interpreter services',
      'Corporate travel insurance',
      'Dedicated account manager'
    ],
    bestFor: 'Corporate clients, business delegations, investors'
  },
  
  // 附加服务价格
  addOns: {
    professionalTranslator: {
      name: 'Professional Business Translator',
      price: '$300 - $500 per day',
      description: 'Certified translator with business background for meetings and negotiations'
    },
    itGuide: {
      name: 'IT Industry Specialist Guide',
      price: '$400 - $600 per day',
      description: 'Expert guide with deep knowledge of Chinese tech industry and companies'
    },
    businessSetup: {
      name: 'Business Meeting Arrangement',
      price: '$500 - $1,000 per meeting',
      description: 'Arrange meetings with Chinese companies, including pre-screening and coordination'
    },
    executiveProtection: {
      name: 'Executive Protection Services',
      price: '$800 - $1,200 per day',
      description: 'Professional security detail for VIP clients'
    },
    customTour: {
      name: 'Custom Itinerary Design',
      price: '$200 - $500',
      description: 'Personalized tour planning based on specific interests and requirements'
    }
  }
};

// 旅游路线数据
export const tours: Tour[] = [
  {
    id: 'beijing-tech-innovation-5d',
    title: 'Beijing Tech Innovation & Culture Tour',
    subtitle: 'Explore China\'s Silicon Valley and Imperial Heritage',
    description: 'A comprehensive 5-day journey through Beijing\'s thriving tech ecosystem and rich cultural heritage. Visit Zhongguancun (China\'s Silicon Valley), meet with tech companies, explore the Forbidden City, and experience authentic Beijing culture.',
    duration: '5 Days 4 Nights',
    durationDays: 5,
    maxGroupSize: 8,
    price: {
      base: 1800,
      currency: 'USD',
      perPerson: true,
      deposit: 500
    },
    highlights: [
      'Visit Zhongguancun Science Park (China\'s Silicon Valley)',
      'Meet with innovative tech companies and startups',
      'Explore Forbidden City and Great Wall',
      'Experience authentic Beijing cuisine and culture',
      'Private guided tours with IT industry expert'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Zhongguancun Tech Hub',
        description: 'Arrive in Beijing, transfer to hotel. Afternoon visit to Zhongguancun Science Park, meeting with tech companies.',
        activities: [
          'Airport pickup and hotel check-in',
          'Welcome dinner with Beijing specialties',
          'Visit Zhongguancun Inno Way',
          'Meeting with tech startup representatives'
        ],
        meals: {
          dinner: 'Welcome Dinner - Beijing Roast Duck'
        },
        accommodation: '4-star Hotel in Zhongguancun Area'
      },
      {
        day: 2,
        title: 'Tech Company Visits & Great Wall',
        description: 'Morning meetings with tech companies, afternoon visit to Mutianyu Great Wall.',
        activities: [
          'Visit to leading AI company',
          'Meeting with semiconductor company executives',
          'Afternoon at Mutianyu Great Wall (cable car up)',
          'Tech industry dinner discussion'
        ],
        meals: {
          breakfast: 'Hotel Breakfast',
          lunch: 'Tech Company Cafeteria Experience',
          dinner: 'Sichuan Cuisine - Business Discussion'
        },
        accommodation: '4-star Hotel in Zhongguancun Area'
      },
      {
        day: 3,
        title: 'Forbidden City & Traditional Culture',
        description: 'Full day exploring Beijing\'s imperial heritage and traditional culture.',
        activities: [
          'Early morning at Forbidden City (VIP entrance)',
          'Tiananmen Square visit',
          'Hutong walking tour (traditional courtyard houses)',
          'Peking Opera performance',
          'Traditional Chinese medicine experience'
        ],
        meals: {
          breakfast: 'Hotel Breakfast',
          lunch: 'Imperial Court Cuisine',
          dinner: 'Hutong Family Dinner'
        },
        accommodation: '4-star Hotel in Zhongguancun Area'
      },
      {
        day: 4,
        title: 'Modern Beijing & Innovation',
        description: 'Explore modern Beijing\'s architecture, innovation centers, and business districts.',
        activities: [
          'Visit CCTV Headquarters (architectural tour)',
          'Olympic Park and Bird\'s Nest visit',
          '798 Art District (contemporary Chinese art)',
          'Silicon Valley-style startup meetup',
          'Farewell dinner with Beijing city view'
        ],
        meals: {
          breakfast: 'Hotel Breakfast',
          lunch: 'Modern Beijing Cuisine',
          dinner: 'Rooftop Farewell Dinner'
        },
        accommodation: '4-star Hotel in Zhongguancun Area'
      },
      {
        day: 5,
        title: 'Departure & Final Meetings',
        description: 'Optional morning meetings and airport transfer.',
        activities: [
          'Optional breakfast meeting with local partners',
          'Hotel checkout',
          'Airport transfer',
          'Souvenir shopping (optional)'
        ],
        meals: {
          breakfast: 'Hotel Breakfast'
        }
      }
    ],
    included: [
      '4 nights accommodation in 4-star hotel',
      'Daily breakfast, 4 lunches, 4 dinners',
      'Private air-conditioned vehicle with driver',
      'Professional English-speaking guide (IT industry expert)',
      'All entrance fees to attractions',
      'Airport pickup and drop-off',
      'Business meeting arrangements with tech companies',
      'Basic travel insurance'
    ],
    excluded: [
      'International flights to/from Beijing',
      'Chinese visa fee',
      'Personal expenses and optional activities',
      'Alcoholic beverages (except welcome/farewell dinners)',
      'Tips for guide and driver (recommended: $10-15/day)',
      'Additional business meeting fees beyond included ones'
    ],
    images: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800',
      'https://images.unsplash.com/photo-1603705368672-20f8fc8fb36e?w=800'
    ],
    targetAudience: [
      'Tech industry professionals',
      'Business executives exploring China market',
      'Investors and VCs',
      'IT company representatives',
      'Academic researchers',
      'Government officials'
    ],
    difficulty: 'Easy',
    bestSeason: ['Spring (April-May)', 'Autumn (September-October)'],
    theme: 'Tech Innovation & Culture',
    city: 'Beijing',
    tags: [
      'Technology',
      'Business',
      'Culture',
      'Innovation',
      'Silicon Valley',
      'Forbidden City',
      'Great Wall',
      'Zhongguancun'
    ]
  }
];

// 获取旅游路线
export const getTours = (): Tour[] => tours;

// 按城市筛选
export const getToursByCity = (city: string): Tour[] => {
  return tours.filter((tour) => tour.city === city);
};

// 按主题筛选
export const getToursByTheme = (theme: string): Tour[] => {
  return tours.filter((tour) => tour.theme === theme);
};

// 按价格范围筛选
export const getToursByPrice = (min: number, max: number): Tour[] => {
  return tours.filter((tour) => tour.price.base >= min && tour.price.base <= max);
};

// 搜索旅游路线
export const searchTours = (keyword: string): Tour[] => {
  const lowerKeyword = keyword.toLowerCase();
  return tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(lowerKeyword) ||
      tour.description.toLowerCase().includes(lowerKeyword) ||
      tour.city.toLowerCase().includes(lowerKeyword) ||
      tour.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
  );
};
