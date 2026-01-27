// Translation file for English and Chinese

interface Translation {
  [key: string]: string | Translation;
}

interface Translations {
  en: Translation;
  zh: Translation;
}

const translations: Translations = {
  en: {
    welcome: "WELCOME TO CHINA",
    hero: {
      title: "Tech Guide in China - Your Gateway to IT & AI Exhibitions",
      subtitle: "Professional guidance for international visitors to China's leading IT and AI exhibitions, with additional tailored China tour services.",
      tours: "China Tours",
      exhibitions: "Explore Exhibitions"
    },
    services: {
      tagline: "OUR SERVICES",
      title: "Comprehensive Solutions for Your Stay in China",
      description: "We provide all the support you need to make your visit to China memorable and successful",
      tourGuide: "Professional Tour Guide",
      tourGuideDesc: "Expert guides with deep knowledge of Chinese history and culture across major cities in China",
      exhibitionService: "Exhibition Support",
      exhibitionServiceDesc: "Complete assistance for IT exhibitions across China",
      customItinerary: "Custom Itineraries",
      customItineraryDesc: "Personalized travel plans tailored to your interests and needs",
      accommodation: "Premium Accommodation",
      accommodationDesc: "Arrangement of comfortable and convenient stays"
    },
    featuredTours: {
      tagline: "POPULAR TOURS",
      title: "Discover China's Best",
      viewAll: "View All Tours",
      bestseller: "BESTSELLER",
      historicalTitle: "Beijing Historical & Cultural Tour",
      historicalDesc: "Explore Beijing's iconic landmarks including the Forbidden City, Tiananmen Square, and Temple of Heaven",
      modernTitle: "Shanghai Modern City Tour",
      modernDesc: "Experience contemporary Shanghai with visits to the Bund, Pudong Skyline, and vibrant shopping districts",
      gardensTitle: "Hangzhou West Lake Tour",
      gardensDesc: "Visit the beautiful West Lake and historic temples in Hangzhou, the 'Paradise on Earth'",
      perPerson: "per person",
      details: "View Details"
    },
    exhibitionServices: {
      tagline: "EXHIBITION SUPPORT",
      title: "Your Partner for China's IT Exhibitions",
      description: "We help international businesses navigate China's major technology exhibitions with professional assistance",
      whyChooseUs: {
        title: "Why Choose Our Exhibition Services?",
        professional: "Industry Expertise",
        professionalDesc: "Our team has extensive experience in China's IT exhibition scene",
        languageSupport: "Multilingual Support",
        languageSupportDesc: "Fluency in English, Chinese, and other major languages",
        logistics: "Full Logistics Support",
        logisticsDesc: "From visa assistance to transportation and accommodation"
      },
      learnMore: "Learn More About Exhibition Services"
    },
    testimonials: {
      tagline: "CLIENT EXPERIENCES",
      title: "What Our Clients Say",
      testimonial1: "The tour guide was exceptional - knowledgeable, friendly, and professional. Made our trip to China truly memorable!",
      testimonial2: "Their exhibition support services were invaluable. We wouldn't have been able to navigate the show without them.",
      testimonial3: "From airport pickup to tour arrangements, everything was handled seamlessly. Highly recommended for business travelers."
    },
    cta: {
      title: "Ready to Experience the Best of China?",
      subtitle: "Contact us today to start planning your perfect itinerary or exhibition visit",
      contactUs: "Contact Us",
      exploreTours: "Explore Tours"
    },
    nav: {
      home: "Home",
      tours: "China Tours",
      exhibitions: "Exhibitions",
      about: "About Us",
      contact: "Contact"
    },
    footer: {
      contactInfo: "Contact Information",
      address: "123 Tiananmen Square, Beijing, China",
      phone: "+86 10 1234 5678",
      email: "info@beijinggroundservices.com",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      copyright: "© 2026 TechGuide in China. All rights reserved."
    },
    consultation: {
      title: "Need Assistance?",
      message: "Chat with our team for immediate help"
    }
  },
  zh: {
    welcome: "欢迎来到中国",
    hero: {
      title: "为国际访客提供专业地接服务",
      subtitle: "与我们的专业导游和展览协助服务一起探索中国的精华",
      tours: "探索中国旅游",
      exhibitions: "查看展会服务"
    },
    services: {
      tagline: "我们的服务",
      title: "为您在中国的停留提供全方位解决方案",
      description: "我们提供您所需的一切支持，让您的中国之旅难忘而成功",
      tourGuide: "专业导游",
      tourGuideDesc: "具有深厚中国历史文化知识的专家导游，覆盖中国主要城市",
      exhibitionService: "展会支持",
      exhibitionServiceDesc: "为中国各地的IT展会提供全面协助",
      customItinerary: "定制行程",
      customItineraryDesc: "根据您的兴趣和需求量身定制的旅行计划",
      accommodation: "优质住宿",
      accommodationDesc: "安排舒适便捷的住宿"
    },
    featuredTours: {
      tagline: "热门线路",
      title: "探索中国精华",
      viewAll: "查看全部线路",
      bestseller: "畅销产品",
      historicalTitle: "北京历史文化之旅",
      historicalDesc: "探索北京标志性景点，包括故宫、天安门广场和天坛",
      modernTitle: "上海现代都市之旅",
      modernDesc: "体验当代上海，参观外滩、浦东天际线和充满活力的购物区",
      gardensTitle: "杭州西湖之旅",
      gardensDesc: "游览美丽的西湖和杭州的历史寺庙，感受'人间天堂'",
      perPerson: "每人",
      details: "查看详情"
    },
    exhibitionServices: {
      tagline: "展会支持",
      title: "中国IT展会的合作伙伴",
      description: "我们帮助国际企业借助专业协助浏览中国的主要科技展会",
      whyChooseUs: {
        title: "为什么选择我们的展会服务？",
        professional: "行业专业知识",
        professionalDesc: "我们的团队在中国IT展览领域拥有丰富经验",
        languageSupport: "多语言支持",
        languageSupportDesc: "流利的英语、中文和其他主要语言",
        logistics: "全面物流支持",
        logisticsDesc: "从签证协助到交通和住宿安排"
      },
      learnMore: "了解更多展会服务"
    },
    testimonials: {
      tagline: "客户体验",
      title: "客户评价",
      testimonial1: "导游非常出色——知识渊博、友好且专业。让我们的中国之旅真正难忘！",
      testimonial2: "他们的展会支持服务非常宝贵。没有他们，我们无法顺利参加展会。",
      testimonial3: "从机场接机到旅游安排，一切都处理得无缝衔接。强烈推荐给商务旅行者。"
    },
    cta: {
      title: "准备好体验中国的精华了吗？",
      subtitle: "立即联系我们，开始规划您的完美行程或展会参观",
      contactUs: "联系我们",
      exploreTours: "探索旅游线路"
    },
    nav: {
      home: "首页",
      tours: "中国旅游",
      exhibitions: "展会服务",
      about: "关于我们",
      contact: "联系我们"
    },
    footer: {
      contactInfo: "联系信息",
      address: "中国北京市天安门广场123号",
      phone: "+86 10 1234 5678",
      email: "info@beijinggroundservices.com",
      quickLinks: "快速链接",
      followUs: "关注我们",
      copyright: "© 2026 TechGuide in China. 保留所有权利。"
    },
    consultation: {
      title: "需要帮助吗？",
      message: "与我们的团队聊天获取即时帮助"
    }
  }
};

export default translations;