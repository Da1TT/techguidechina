export interface Exhibition {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  image: string;
  registrationLink: string;
  startDate: Date;
}

// 2026年真实大型IT和AI展会信息（英文，按时间排序）
export const exhibitions: Exhibition[] = [
  // Q1 2026
  {
    id: 1,
    title: "China International Smart Building Expo",
    date: "March 10-12, 2026",
    location: "China National Convention Center, Beijing",
    description: "The most influential professional exhibition in China's smart building sector, focusing on smart buildings, IoT, AI applications in urban management, and gathering leading enterprises and internationally renowned manufacturers.",
    highlights: [
      "Smart building and IoT technologies",
      "AI-driven building automation systems",
      "5G applications in smart buildings",
      "Green building and energy efficiency technologies"
    ],
    image: "/images/expo-smart-building.jpg",
    registrationLink: "https://www.smartbuildingexpo.com.cn",
    startDate: new Date(2026, 2, 10)
  },

  // Q2 2026
  {
    id: 2,
    title: "China International Big Data Industry Expo",
    date: "May 26-28, 2026",
    location: "Guiyang International Convention and Exhibition Center, Guiyang",
    description: "The only national-level exhibition in China's big data sector, focusing on big data, cloud computing, artificial intelligence and other cutting-edge technologies. It is an important indicator of global big data development.",
    highlights: [
      "Big data and cloud computing innovations",
      "AI applications across various industries",
      "Data security and privacy protection",
      "International big data industry cooperation"
    ],
    image: "/images/expo-big-data.jpg",
    registrationLink: "https://www.bigdata-expo.cn",
    startDate: new Date(2026, 4, 26)
  },

  {
    id: 3,
    title: "China International Software & Information Service Fair",
    date: "June 15-17, 2026",
    location: "Dalian World Expo Center, Dalian",
    description: "One of China's largest software and information service industry events, focusing on software development, digital transformation, and AI applications, gathering top technology enterprises and development teams from home and abroad.",
    highlights: [
      "AI software development platforms and tools",
      "Cloud computing and SaaS solutions",
      "Digital transformation success cases",
      "Open source technology and collaboration"
    ],
    image: "/images/expo-software-fair.jpg",
    registrationLink: "https://www.csis.cn",
    startDate: new Date(2026, 5, 15)
  },

  // Q3 2026
  {
    id: 4,
    title: "World Artificial Intelligence Conference (WAIC)",
    date: "July 8-10, 2026",
    location: "Shanghai World Expo Exhibition & Convention Center, Shanghai",
    description: "One of most influential top-level events globally in field of artificial intelligence, bringing together leading AI companies and top experts and scholars worldwide to showcase the most cutting-edge AI technologies and applications.",
    highlights: [
      "AI large models and generative AI",
      "Autonomous driving and robotics technology",
      "AI applications across vertical industries",
      "Global AI frontier research releases"
    ],
    image: "/images/expo-world-ai-conference.jpg",
    registrationLink: "https://www.worldaic.com.cn",
    startDate: new Date(2026, 6, 8)
  },

  {
    id: 5,
    title: "China Digital Entertainment Expo & Conference (ChinaJoy)",
    date: "July 30 - August 2, 2026",
    location: "Shanghai New International Expo Center, Shanghai",
    description: "Asia's most influential digital entertainment exhibition, covering games, animation, VR/AR, e-sports, and more, showcasing the latest applications of AI in digital entertainment field.",
    highlights: [
      "AI-driven game development technology",
      "VR/AR and immersive experiences",
      "Global top-tier e-sports tournaments",
      "Digital content creation and distribution"
    ],
    image: "/images/expo-chinajoy.jpg",
    registrationLink: "https://www.chinajoy.net",
    startDate: new Date(2026, 6, 30)
  },

  // Q4 2026
  {
    id: 6,
    title: "China International Information Communication Exhibition (PT Expo China)",
    date: "September 20-22, 2026",
    location: "China National Convention Center, Beijing",
    description: "One of Asia's largest and most influential information communication exhibitions, focusing on 5G, IoT, cloud computing, artificial intelligence and other cutting-edge technologies.",
    highlights: [
      "5G network technology and applications",
      "IoT and smart cities",
      "Cloud computing and big data platforms",
      "Future communication technology outlook"
    ],
    image: "/images/expo-5g-telecom.jpg",
    registrationLink: "https://www.ptexpo.com.cn",
    startDate: new Date(2026, 8, 20)
  },

  {
    id: 7,
    title: "World Internet Conference",
    date: "November 7-9, 2026",
    location: "Wuzhen Internet International Convention and Exhibition Center, Wuzhen, Zhejiang",
    description: "The top global event in internet field, focusing on digital economy, artificial intelligence, cybersecurity and other cutting-edge topics, bringing together leading figures in global internet sector.",
    highlights: [
      "Global internet frontier trends",
      "AI ethics and governance",
      "Digital economy development strategies",
      "International internet governance cooperation"
    ],
    image: "/images/expo-world-internet-conference.jpg",
    registrationLink: "https://www.wicinternet.org",
    startDate: new Date(2026, 10, 7)
  },

  {
    id: 8,
    title: "China International IoT Exhibition",
    date: "October 28-30, 2026",
    location: "Shenzhen Convention and Exhibition Center, Shenzhen",
    description: "The most influential professional exhibition in China's IoT sector, showcasing cutting-edge technologies and solutions such as IoT sensors, RFID, and smart hardware.",
    highlights: [
      "IoT sensor and network technology",
      "RFID and intelligent recognition",
      "Smart hardware and embedded systems",
      "Industrial IoT applications"
    ],
    image: "/images/expo-iot.jpg",
    registrationLink: "https://www.iotexpo.com.cn",
    startDate: new Date(2026, 9, 28)
  },

  {
    id: 9,
    title: "China International Artificial Intelligence Industry Development Conference",
    date: "September 12-14, 2026",
    location: "Shanghai Hongqiao National Convention and Exhibition Center, Shanghai",
    description: "A professional event focusing on AI industry development, showcasing full-industry chain technologies such as AI algorithms, AI chips, and AI applications, promoting AI industrialization and implementation.",
    highlights: [
      "AI computing power and chips",
      "AI algorithms and models",
      "AI applications in manufacturing",
      "AI industry investment and cooperation"
    ],
    image: "/images/expo-world-ai-conference.jpg",
    registrationLink: "#",
    startDate: new Date(2026, 8, 12)
  }
];
