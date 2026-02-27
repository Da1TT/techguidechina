// 服务范围和定价体系
// 基于客户需求：展会服务 + 旅游服务

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    unit: string;
    deposit: number;
  };
  features: string[];
  targetAudience: string[];
  recommended: boolean;
}

export interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: string;
  unit: string;
}

// 展会服务套餐
export const exhibitionPackages: ServicePackage[] = [
  {
    id: 'exhibition-basic',
    name: 'Basic Exhibition Support',
    description: 'Essential support for attending exhibitions in China',
    price: {
      amount: 800,
      currency: 'USD',
      unit: 'per day',
      deposit: 400
    },
    features: [
      'Professional English-Chinese interpreter',
      'Exhibition venue navigation assistance',
      'Basic business card exchange support',
      'Local transportation (exhibition venue only)',
      'WeChat setup and basic training',
      'Emergency support hotline'
    ],
    targetAudience: [
      'Solo travelers',
      'Small business owners',
      'First-time visitors to China'
    ],
    recommended: false
  },
  {
    id: 'exhibition-professional',
    name: 'Professional Business Package',
    description: 'Comprehensive support for serious business development',
    price: {
      amount: 1800,
      currency: 'USD',
      unit: 'per day',
      deposit: 900
    },
    features: [
      'Senior business interpreter with industry expertise',
      'Pre-exhibition company research and matching',
      'Business meeting facilitation and negotiation support',
      'Comprehensive transportation (airport, hotel, venues)',
      'Hotel booking assistance (4-star or boutique)',
      'Dinner arrangement with potential partners',
      'Post-meeting follow-up coordination',
      'Document translation (up to 10 pages)',
      'Dedicated WeChat support group'
    ],
    targetAudience: [
      'Business executives',
      'Investors and VCs',
      'Corporate delegations',
      'Serious entrepreneurs'
    ],
    recommended: true
  },
  {
    id: 'exhibition-enterprise',
    name: 'Enterprise VIP Package',
    description: 'White-glove service for VIP clients and delegations',
    price: {
      amount: 3500,
      currency: 'USD',
      unit: 'per day',
      deposit: 1750
    },
    features: [
      'Dedicated account manager',
      'Elite business interpreter (industry specialist)',
      'Strategic company matching and pre-qualification',
      'Executive-level meeting facilitation',
      'Luxury transportation (business class vehicles)',
      '5-star hotel or serviced apartment booking',
      'Fine dining reservations and business entertainment',
      'Comprehensive follow-up and deal support',
      'Unlimited document translation',
      '24/7 concierge service',
      'Customized itinerary adjustments',
      'Post-visit relationship management'
    ],
    targetAudience: [
      'C-level executives',
      'Government delegations',
      'Major investors',
      'VIP clients'
    ],
    recommended: false
  }
];

// 旅游服务套餐
export const tourPackages: ServicePackage[] = [
  {
    id: 'tour-standard',
    name: 'Standard Cultural Tour',
    description: 'Essential China experience with comfortable accommodations',
    price: {
      amount: 200,
      currency: 'USD',
      unit: 'per day per person',
      deposit: 200
    },
    features: [
      '3-star or boutique hotel accommodation',
      'Daily breakfast',
      'Private car with driver',
      'English-speaking guide',
      'Entrance fees to major attractions',
      'Basic travel insurance'
    ],
    targetAudience: [
      'Budget-conscious travelers',
      'Solo travelers',
      'Small groups'
    ],
    recommended: false
  },
  {
    id: 'tour-premium',
    name: 'Premium Experience Tour',
    description: 'Luxury experience with personalized service',
    price: {
      amount: 450,
      currency: 'USD',
      unit: 'per day per person',
      deposit: 450
    },
    features: [
      '4-star or luxury boutique hotel',
      'All meals at quality restaurants',
      'Luxury private vehicle',
      'Expert English-speaking guide',
      'Fast-track entrance to attractions',
      'Comprehensive travel insurance',
      '24/7 concierge service'
    ],
    targetAudience: [
      'Business travelers',
      'Luxury seekers',
      'VIP clients'
    ],
    recommended: true
  },
  {
    id: 'tour-enterprise',
    name: 'Enterprise/Business Tour',
    description: 'Corporate-focused tours with business facilities',
    price: {
      amount: 750,
      currency: 'USD',
      unit: 'per day per person',
      deposit: 750
    },
    features: [
      '5-star luxury hotel or serviced apartment',
      'Gourmet dining and business meals',
      'Business class transportation',
      'Corporate concierge services',
      'Meeting room and office facilities',
      'Professional interpreter services',
      'Corporate travel insurance',
      'Dedicated account manager'
    ],
    targetAudience: [
      'Corporate clients',
      'Business delegations',
      'Investors'
    ],
    recommended: false
  }
];

// 附加服务
export const addOnServices: AddOnService[] = [
  {
    id: 'addon-translator',
    name: 'Professional Business Translator',
    description: 'Certified translator with business background for meetings and negotiations',
    price: '$300 - $500',
    unit: 'per day'
  },
  {
    id: 'addon-it-guide',
    name: 'IT Industry Specialist Guide',
    description: 'Expert guide with deep knowledge of Chinese tech industry and companies',
    price: '$400 - $600',
    unit: 'per day'
  },
  {
    id: 'addon-business-setup',
    name: 'Business Meeting Arrangement',
    description: 'Arrange meetings with Chinese companies, including pre-screening and coordination',
    price: '$500 - $1,000',
    unit: 'per meeting'
  },
  {
    id: 'addon-executive-protection',
    name: 'Executive Protection Services',
    description: 'Professional security detail for VIP clients',
    price: '$800 - $1,200',
    unit: 'per day'
  },
  {
    id: 'addon-custom-tour',
    name: 'Custom Itinerary Design',
    description: 'Personalized tour planning based on specific interests and requirements',
    price: '$200 - $500',
    unit: 'per itinerary'
  },
  {
    id: 'addon-document-translation',
    name: 'Document Translation',
    description: 'Professional translation of business documents, contracts, and presentations',
    price: '$50 - $100',
    unit: 'per page'
  }
];

// 支付方式
export const paymentMethods = {
  international: [
    {
      method: 'PayPal',
      description: 'Secure online payment via PayPal',
      processingTime: 'Instant',
      fees: '2.9% + $0.30 per transaction'
    },
    {
      method: 'International Wire Transfer',
      description: 'Direct bank transfer to our USD/EUR/GBP accounts',
      processingTime: '2-5 business days',
      fees: 'Depends on your bank (~$15-50)'
    },
    {
      method: 'Credit Card',
      description: 'Visa, MasterCard, AmEx via secure payment gateway',
      processingTime: 'Instant',
      fees: '3.5% per transaction'
    }
  ],
  china: [
    {
      method: '支付宝 (Alipay)',
      description: 'Direct payment via Alipay',
      processingTime: 'Instant',
      fees: 'No additional fees'
    },
    {
      method: '微信支付 (WeChat Pay)',
      description: 'Payment via WeChat',
      processingTime: 'Instant',
      fees: 'No additional fees'
    },
    {
      method: '中国银联卡 (UnionPay)',
      description: 'Direct bank card payment',
      processingTime: 'Instant',
      fees: 'No additional fees'
    },
    {
      method: '人民币银行转账 (RMB Bank Transfer)',
      description: 'Direct transfer to our China bank account',
      processingTime: '1-2 business days',
      fees: 'Depends on your bank'
    }
  ]
};

// 退款政策
export const refundPolicy = {
  general: {
    moreThan30Days: 'Full refund minus 10% administrative fee',
    15To30Days: '70% refund',
    7To14Days: '50% refund',
    lessThan7Days: 'No refund, but can reschedule within 6 months'
  },
  forceMajeure: 'Full refund or free rescheduling in case of visa rejection, natural disasters, or government restrictions',
  cancellationByUs: 'Full refund plus $200 compensation if we cancel the tour'
};
