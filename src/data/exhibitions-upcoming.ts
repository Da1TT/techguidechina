// 2025-2026年中国重点IT/AI展会信息
// 定期更新 - 最后更新: 2026-02-25

export interface Exhibition {
  id: string;
  title: string;
  name: string;
  date: string;
  startDate: Date;
  endDate: Date;
  location: string;
  venue: string;
  description: string;
  highlights: string[];
  keyExhibitors: string[];
  targetAudience: string[];
  boothPrice: string;
  visitorRegistration: string;
  website: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'past';
  valueProposition: string[];
  networkingOpportunities: string[];
  conferenceProgram: string[];
}

export const upcomingExhibitions: Exhibition[] = [
  {
    id: 'waic-2025',
    title: 'WAIC 2025 - World Artificial Intelligence Conference',
    name: '世界人工智能大会 2025',
    date: 'July 10-12, 2025',
    startDate: new Date('2025-07-10'),
    endDate: new Date('2025-07-12'),
    location: 'Shanghai, China',
    venue: 'Shanghai World Expo Exhibition & Convention Center',
    description: 'WAIC is the world\'s most influential AI conference, bringing together 300+ top AI scientists, 500+ global AI companies, and 300,000+ professional visitors. The conference covers cutting-edge AI technologies, applications, and industry solutions.',
    highlights: [
      'Keynotes by Nobel laureates and Turing Award winners',
      '300+ AI companies showcasing latest technologies',
      '50+ parallel forums on AI applications',
      'Matchmaking sessions for business partnerships',
      'AI startup pitch competitions',
      'Government policy announcements'
    ],
    keyExhibitors: [
      'SenseTime', 'Baidu', 'Alibaba Cloud', 'Tencent', 'Huawei',
      'Microsoft China', 'IBM China', 'NVIDIA', 'Intel', 'Qualcomm'
    ],
    targetAudience: [
      'AI researchers and scientists',
      'Tech company executives',
      'Investors and VCs',
      'Government officials',
      'Enterprise decision makers',
      'AI startups and entrepreneurs'
    ],
    boothPrice: 'Standard Booth: $800/sqm; Premium Booth: $1,200/sqm',
    visitorRegistration: 'Free for pre-registered visitors; $50 on-site',
    website: 'https://www.worldaic.com.cn',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800',
    status: 'upcoming',
    valueProposition: [
      'Meet 300+ AI companies seeking international partnerships',
      'Access cutting-edge AI technologies before public release',
      'Network with Chinese AI talent and researchers',
      'Understand China\'s AI policy direction and market trends',
      'Find local partners for China market entry'
    ],
    networkingOpportunities: [
      'VIP business matching meetings (pre-arranged)',
      'AI Innovation Night - cocktail reception',
      'Industry-specific roundtables',
      'Startup-investor speed dating',
      'Government officials networking dinner'
    ],
    conferenceProgram: [
      'Opening Ceremony with keynote speeches',
      'Global AI Governance Forum',
      'AI for Good - Social Impact Summit',
      'Enterprise AI Adoption Conference',
      'AI Chip and Hardware Forum',
      'Autonomous Driving Technology Summit'
    ]
  },
  {
    id: 'ces-asia-2025',
    title: 'CES Asia 2025 - Consumer Technology Show',
    name: '亚洲消费电子展 2025',
    date: 'June 11-13, 2025',
    startDate: new Date('2025-06-11'),
    endDate: new Date('2025-06-13'),
    location: 'Shanghai, China',
    venue: 'Shanghai New International Expo Centre (SNIEC)',
    description: 'CES Asia is the premier Asian event for consumer technology, showcasing breakthrough products and innovations in IoT, wearables, smart home, AI, and robotics. The show attracts 40,000+ attendees and 500+ exhibitors from 80+ countries.',
    highlights: [
      '500+ consumer tech companies exhibiting',
      '40,000+ professional visitors',
      'Keynotes by global tech leaders',
      'Product launch events and demos',
      'IoT and smart home pavilions',
      'VR/AR experience zones'
    ],
    keyExhibitors: [
      'Huawei', 'Xiaomi', 'DJI', 'iFLYTEK', 'Haier',
      'Samsung China', 'Sony China', 'Panasonic', 'Bosch', 'Philips'
    ],
    targetAudience: [
      'Consumer electronics brands',
      'Retailers and distributors',
      'Product designers and engineers',
      'Tech media and influencers',
      'Investors and analysts',
      'Smart home integrators'
    ],
    boothPrice: 'Standard Booth: $650/sqm; Premium Location: $950/sqm',
    visitorRegistration: 'Free for industry professionals; $25 for students',
    website: 'https://www.ces.tech/ces-asia',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    status: 'upcoming',
    valueProposition: [
      'Launch products to 40,000+ Asian tech buyers',
      'Meet 500+ consumer electronics suppliers',
      'Explore latest IoT and smart home innovations',
      'Network with Asian retail and distribution partners',
      'Understand consumer tech trends in Asia'
    ],
    networkingOpportunities: [
      'Retail buyer matchmaking sessions',
      'Product launch networking receptions',
      'Industry vertical meetups (IoT, wearables, etc.)',
      'Media and influencer networking',
      'VIP buyer dinner events'
    ],
    conferenceProgram: [
      'Opening Keynote: Future of Consumer Tech',
      'IoT World Forum Asia',
      'Smart Home Summit',
      'Wearable Technology Conference',
      'Robotics and Drones Forum',
      '5G and Connected Devices Summit'
    ]
  }
];

// 获取即将举办的展会（未来6个月内）
export const getUpcomingExhibitions = (): Exhibition[] => {
  const now = new Date();
  const sixMonthsLater = new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000);
  
  return upcomingExhibitions.filter(
    (ex) => ex.startDate >= now && ex.startDate <= sixMonthsLater
  );
};

// 获取热门展会（按关注度和规模排序）
export const getFeaturedExhibitions = (): Exhibition[] => {
  return upcomingExhibitions
    .filter((ex) => ex.status === 'upcoming')
    .slice(0, 4);
};

// 按月份获取展会
export const getExhibitionsByMonth = (year: number, month: number): Exhibition[] => {
  return upcomingExhibitions.filter((ex) => {
    const startDate = ex.startDate;
    return startDate.getFullYear() === year && startDate.getMonth() === month - 1;
  });
};

// 搜索展会
export const searchExhibitions = (keyword: string): Exhibition[] => {
  const lowerKeyword = keyword.toLowerCase();
  return upcomingExhibitions.filter(
    (ex) =>
      ex.title.toLowerCase().includes(lowerKeyword) ||
      ex.description.toLowerCase().includes(lowerKeyword) ||
      ex.location.toLowerCase().includes(lowerKeyword) ||
      ex.keyExhibitors.some((e) => e.toLowerCase().includes(lowerKeyword))
  );
};
