import { useState } from "react";
import BookingForm from "../components/BookingForm";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Types for tour data
interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  highlights: string[];
  itinerary: {
    day: string;
    activities: string[];
  }[];
  category: string;
}

// Types for service feature
interface ServiceFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Tours() {
  const { t, language } = useLanguage();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Animation variants with enhanced effects
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Expanded tour data covering major cities across China
  const tours: Tour[] = [
    // Beijing Tours
    {
      id: 1,
      title: t("featuredTours.historicalTitle"),
      description: t("featuredTours.historicalDesc"),
      price: 499,
      duration: language === "zh" ? "全天" : "Full Day",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Beijing%20Forbidden%20City%20and%20Tiananmen%20Square%2C%20historical%20cultural%20tour&sign=bbe233da432647ad12b50b290fac7703",
      highlights: [
        language === "zh" ? "参观宏伟的故宫" : "Visit the magnificent Forbidden City",
        language === "zh" ? "探索天安门广场" : "Explore Tiananmen Square",
        language === "zh" ? "发现古老的天坛" : "Discover the ancient Temple of Heaven",
        language === "zh" ? "在专业导游的带领下体验中国传统文化" : "Experience traditional Chinese culture with an expert guide"
      ],
      itinerary: [
        {
          day: language === "zh" ? "第1天" : "Day 1",
          activities: [
            language === "zh" ? "上午：专车从酒店接您" : "Morning: Pick up from hotel with private car",
            language === "zh" ? "参观天安门广场" : "Visit Tiananmen Square",
            language === "zh" ? "参观故宫，享受免排队特权" : "Explore the Forbidden City with skip-the-line access",
            language === "zh" ? "在当地餐厅享用传统美食午餐" : "Lunch at local restaurant with traditional cuisine",
            language === "zh" ? "下午：参观天坛" : "Afternoon: Visit Temple of Heaven",
            language === "zh" ? "晚上：返回酒店" : "Evening: Return to hotel"
          ]
        }
      ],
      category: "historical"
    },
    {
      id: 2,
      title: t("featuredTours.modernTitle"),
      description: t("featuredTours.modernDesc"),
      price: 399,
      duration: language === "zh" ? "全天" : "Full Day",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Beijing%20CBD%20skyline%2C%20modern%20architecture%2C%20China&sign=1d304d8218d67b5a2eff3eb90b5a92dc",
      highlights: [
        language === "zh" ? "参观奥运公园和鸟巢体育场" : "Visit the Olympic Park and Bird's Nest Stadium",
        language === "zh" ? "从中央电视塔欣赏全景" : "Enjoy panoramic views from CCTV Tower",
        language === "zh" ? "体验充满活力的购物区" : "Experience vibrant shopping districts",
        language === "zh" ? "在专家解说下了解现代北京的发展" : "See modern Beijing's development with expert commentary"
      ],
      itinerary: [
        {
          day: language === "zh" ? "第1天" : "Day 1",
          activities: [
            language === "zh" ? "上午：专车从酒店接您" : "Morning: Pick up from hotel with private car",
            language === "zh" ? "参观奥运公园和鸟巢" : "Visit Olympic Park and Bird's Nest",
            language === "zh" ? "在现代餐厅享用国际美食午餐" : "Lunch at modern restaurant with international options",
            language === "zh" ? "下午：参观中央电视塔观景台" : "Afternoon: Visit CCTV Tower observation deck",
            language === "zh" ? "探索三里屯购物区" : "Explore Sanlitun shopping district",
            language === "zh" ? "晚上：返回酒店" : "Evening: Return to hotel"
          ]
        }
      ],
      category: "modern"
    },
    
    // Shanghai Tours
    {
      id: 3,
      title: language === "zh" ? "上海外滩与现代天际线之旅" : "Shanghai Bund & Skyline Tour",
      description: language === "zh" ? "探索上海标志性的外滩和现代化的浦东天际线，感受东西方文化的交融。" : "Explore Shanghai's iconic Bund and modern Pudong skyline, experiencing the blend of Eastern and Western cultures.",
      price: 449,
      duration: language === "zh" ? "全天" : "Full Day",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Shanghai%20Bund%20skyline%2C%20modern%20architecture%2C%20China&sign=f5af6966b9959a17cdd5eaf574824500",
      highlights: [
        language === "zh" ? "漫步外滩，欣赏百年建筑群" : "Stroll along the Bund, admiring century-old buildings",
        language === "zh" ? "登上海环球金融中心或上海中心大厦观景台" : "Visit Shanghai World Financial Center or Shanghai Tower observation deck",
        language === "zh" ? "参观豫园和传统商业区" : "Explore Yu Garden and traditional shopping areas",
        language === "zh" ? "体验上海的夜生活" : "Experience Shanghai's vibrant nightlife"
      ],
      itinerary: [
        {
          day: language === "zh" ? "第1天" : "Day 1",
          activities: [
            language === "zh" ? "上午：专车从酒店接您" : "Morning: Pick up from hotel with private car",
            language === "zh" ? "参观外滩，了解上海的历史" : "Visit the Bund, learning about Shanghai's history",
            language === "zh" ? "在当地餐厅享用上海美食午餐" : "Lunch at local restaurant with Shanghai cuisine",
            language === "zh" ? "下午：参观豫园和城隍庙" : "Afternoon: Visit Yu Garden and City God Temple",
            language === "zh" ? "登上海环球金融中心观景台" : "Visit Shanghai World Financial Center observation deck",
            language === "zh" ? "晚上：在外滩欣赏夜景后返回酒店" : "Evening: Enjoy Bund night views before returning to hotel"
          ]
        }
      ],
      category: "modern"
    },
    
    // Xi'an Tours
    {
      id: 4,
      title: language === "zh" ? "西安兵马俑与古城墙之旅" : "Xi'an Terracotta Army & City Wall Tour",
      description: language === "zh" ? "探索世界第八大奇迹兵马俑，骑行于中国保存最完好的明代古城墙。" : "Explore the 8th Wonder of the World - Terracotta Army, and cycle along China's best-preserved Ming Dynasty city wall.",
      price: 599,
      duration: language === "zh" ? "全天" : "Full Day",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Terracotta%20Army%20in%20Xi%27an%2C%20China&sign=e01f8dafd579f1a0f6f1816ef4c07439",
      highlights: [
        language === "zh" ? "参观震撼的兵马俑博物馆" : "Visit the震撼ing Terracotta Army Museum",
        language === "zh" ? "在明代古城墙上骑行或漫步" : "Cycle or walk along the Ming Dynasty City Wall",
        language === "zh" ? "探索大慈恩寺和大雁塔" : "Explore Dacien Temple and Big Wild Goose Pagoda",
        language === "zh" ? "品尝正宗的陕西美食" : "Taste authentic Shaanxi cuisine"
      ],
      itinerary: [
        {
          day: language === "zh" ? "第1天" : "Day 1",
          activities: [
            language === "zh" ? "上午：专车从酒店接您" : "Morning: Pick up from hotel with private car",
            language === "zh" ? "参观兵马俑博物馆" : "Visit Terracotta Army Museum",
            language === "zh" ? "在当地餐厅享用陕西特色午餐" : "Lunch at local restaurant with Shaanxi specialties",
            language === "zh" ? "下午：在古城墙上骑行或漫步" : "Afternoon: Cycle or walk along the City Wall",
            language === "zh" ? "参观大慈恩寺和大雁塔" : "Visit Dacien Temple and Big Wild Goose Pagoda",
            language === "zh" ? "晚上：返回酒店" : "Evening: Return to hotel"
          ]
        }
      ],
      category: "historical"
    },
    
    // Chengdu Tours
    {
      id: 5,
      title: language === "zh" ? "成都大熊猫基地与川菜之旅" : "Chengdu Panda Base & Sichuan Cuisine Tour",
      description: language === "zh" ? "参观世界闻名的大熊猫繁育研究基地，品尝正宗的川菜美食。" : "Visit the world-famous Giant Panda Breeding Research Base and taste authentic Sichuan cuisine.",
      price: 499,
      duration: language === "zh" ? "全天" : "Full Day",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Giant%20Pandas%20in%20Chengdu%20Panda%20Base%2C%20China&sign=a57fe2f100214b09e300eb71399b3368",
      highlights: [
        language === "zh" ? "观察可爱的大熊猫和小熊猫" : "Observe cute giant pandas and red pandas",
        language === "zh" ? "了解大熊猫保护工作" : "Learn about panda conservation efforts",
        language === "zh" ? "参观宽窄巷子历史文化区" : "Explore Kuanzhai Ancient Street historical area",
        language === "zh" ? "品尝正宗川菜，包括麻辣火锅" : "Taste authentic Sichuan cuisine, including spicy hot pot"
      ],
      itinerary: [
        {
          day: language === "zh" ? "第1天" : "Day 1",
          activities: [
            language === "zh" ? "上午：专车从酒店接您" : "Morning: Pick up from hotel with private car",
            language === "zh" ? "参观大熊猫繁育研究基地" : "Visit Giant Panda Breeding Research Base",
            language === "zh" ? "在当地餐厅享用川菜午餐" : "Lunch at local restaurant with Sichuan cuisine",
            language === "zh" ? "下午：探索宽窄巷子" : "Afternoon: Explore Kuanzhai Ancient Street",
            language === "zh" ? "参观锦里古街" : "Visit Jinli Ancient Street",
            language === "zh" ? "晚上：返回酒店" : "Evening: Return to hotel"
          ]
        }
      ],
      category: "cultural"
    },
    
    // Guilin Tours
    {
      id: 6,
      title: language === "zh" ? "桂林山水与漓江竹筏之旅" : "Guilin Landscape & Li River Bamboo Raft Tour",
      description: language === "zh" ? "欣赏桂林壮丽的喀斯特山水风光，乘坐传统竹筏游览漓江。" : "Admire Guilin's magnificent karst landscape and take a traditional bamboo raft ride along the Li River.",
      price: 649,
      duration: language === "zh" ? "全天" : "Full Day",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Guilin%20landscape%20with%20Li%20River%20and%20karst%20mountains%2C%20China&sign=1d01b3ede316817683e7c89449c3bebf",
      highlights: [
        language === "zh" ? "乘坐传统竹筏游览漓江" : "Take a traditional bamboo raft ride along the Li River",
        language === "zh" ? "欣赏'桂林山水甲天下'的壮丽景色" : "Admire the 'world's most beautiful landscape' in Guilin",
        language === "zh" ? "参观阳朔西街" : "Visit Yangshuo West Street",
        language === "zh" ? "体验当地少数民族文化" : "Experience local ethnic minority culture"
      ],
      itinerary: [
        {
          day: language === "zh" ? "第1天" : "Day 1",
          activities: [
            language === "zh" ? "上午：专车从酒店接您" : "Morning: Pick up from hotel with private car",
            language === "zh" ? "乘坐竹筏游览漓江精华段" : "Take bamboo raft ride along the Li River's most scenic section",
            language === "zh" ? "在当地餐厅享用农家菜午餐" : "Lunch at local restaurant with farm-style cuisine",
            language === "zh" ? "下午：游览阳朔西街" : "Afternoon: Explore Yangshuo West Street",
            language === "zh" ? "参观银子岩溶洞" : "Visit Yinziyan Cave",
            language === "zh" ? "晚上：返回酒店" : "Evening: Return to hotel"
          ]
        }
      ],
      category: "scenic"
    },
    
    // Hangzhou Tours
    {
      id: 7,
      title: t("featuredTours.gardensTitle"),
      description: t("featuredTours.gardensDesc"),
      price: 449,
      duration: language === "zh" ? "全天" : "Full Day",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=West%20Lake%20in%20Hangzhou%2C%20China%2C%20traditional%20Chinese%20garden&sign=9ed0f0ccb3f54b98baa875169541c46c",
      highlights: [
        language === "zh" ? "乘船游览美丽的西湖" : "Take a boat ride on the beautiful West Lake",
        language === "zh" ? "参观龙井茶园，了解茶文化" : "Visit Longjing tea plantations and learn about tea culture",
        language === "zh" ? "品尝正宗的西湖龙井茶" : "Taste authentic West Lake Longjing tea",
        language === "zh" ? "探索灵隐寺" : "Explore Lingyin Temple"
      ],
      itinerary: [
        {
          day: language === "zh" ? "第1天" : "Day 1",
          activities: [
            language === "zh" ? "上午：专车从酒店接您" : "Morning: Pick up from hotel with private car",
            language === "zh" ? "乘船游览西湖，参观主要景点" : "Take a boat ride on West Lake, visiting major attractions",
            language === "zh" ? "在湖边餐厅享用杭帮菜午餐" : "Lunch at lakeside restaurant with Hangzhou cuisine",
            language === "zh" ? "下午：参观龙井茶园，学习茶道" : "Afternoon: Visit Longjing tea plantations, learn tea ceremony",
            language === "zh" ? "参观灵隐寺" : "Visit Lingyin Temple",
            language === "zh" ? "晚上：返回酒店" : "Evening: Return to hotel"
          ]
        }
      ],
      category: "gardens"
    },
    
    // Great Wall Tour
    {
      id: 8,
      title: language === "zh" ? "中国长城一日游" : "Great Wall of China Day Trip",
      description: language === "zh" ? "参观中国长城最壮观的慕田峪段，享受往返交通和专业导游服务。" : "Visit the magnificent Mutianyu section of the Great Wall of China, one of the best-preserved sections, with round-trip transportation.",
      price: 549,
      duration: language === "zh" ? "全天" : "Full Day",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Great%20Wall%20of%20China%2C%20Mutianyu%20section%2C%20scenic%20view&sign=93138279c35e7e17e981e6beb4b0fc9a",
      highlights: [
        language === "zh" ? "参观游客较少的慕田峪长城" : "Visit Mutianyu section of the Great Wall with fewer crowds",
        language === "zh" ? "欣赏壮丽的山景" : "Enjoy breathtaking mountain views",
        language === "zh" ? "体验缆车上下长城" : "Experience cable car ride up to the wall",
        language === "zh" ? "从专家导游处了解长城历史" : "Learn about the wall's history from an expert guide"
      ],
      itinerary: [
        {
          day: language === "zh" ? "第1天" : "Day 1",
          activities: [
            language === "zh" ? "上午：从酒店早接，专车前往" : "Morning: Early pick up from hotel with private car",
            language === "zh" ? "驱车前往慕田峪长城（约1.5小时）" : "Drive to Mutianyu Great Wall (approx 1.5 hours)",
            language === "zh" ? "在导游带领下徒步长城" : "Hike along the Great Wall with guide",
            language === "zh" ? "在长城附近的当地餐厅午餐" : "Lunch at local restaurant near the wall",
            language === "zh" ? "下午：可选择滑车下山" : "Afternoon: Optional toboggan ride down",
            language === "zh" ? "晚上：返回北京" : "Evening: Return to Beijing"
          ]
        }
      ],
      category: "historical"
    }
  ];

  // Service features
  const serviceFeatures: ServiceFeature[] = [
    {
      id: 1,
      title: "Professional Guides",
      description: "Expert guides with deep knowledge of Chinese history, culture, and tech industry.",
      icon: "fa-user-tie"
    },
    {
      id: 2,
      title: "Private Transportation",
      description: "Comfortable private vehicles with professional drivers for seamless travel.",
      icon: "fa-car"
    },
    {
      id: 3,
      title: "Translation Services",
      description: "Fluent English-Chinese interpreters to ensure clear communication.",
      icon: "fa-language"
    },
    {
      id: 4,
      title: "Customizable Itineraries",
      description: "Personalized tours tailored to your interests and schedule.",
      icon: "fa-calendar-check"
    }
  ];

  // Filter tours by category
  const filteredTours = activeCategory === "all" 
    ? tours 
    : tours.filter(tour => tour.category === activeCategory);

  // Handle tour selection for details
  const handleTourSelect = (tour: Tour) => {
    setSelectedTour(tour);
  };

  // Handle booking
  const handleBooking = (tour: Tour) => {
    // Open the booking form modal with the selected tour
    setSelectedTour(tour);
    setShowBookingForm(true);
  };

  return (
    <div className="pt-24 pb-16 px-4">
      {/* Page Header */}
       <motion.div 
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true }}
         variants={fadeIn}
         className="max-w-7xl mx-auto text-center mb-16"
       >
         <span className="text-red-600 font-medium">{t("nav.tours")}</span>
         <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{t("featuredTours.title")}</h1>
         <p className="text-gray-600 max-w-2xl mx-auto">
           Discover the best of China with our expert-led tours across major cities, featuring professional guides, translation services, and private transportation options.
        </p>
      </motion.div>

      {/* Tour Services Highlights */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-20 bg-gray-50 rounded-2xl p-8 md:p-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceFeatures.map((feature) => (
            <motion.div 
              key={feature.id}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`fa-solid ${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tour Categories */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {["all", "historical", "modern", "gardens", "cultural"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-red-600 text-white font-medium"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "All Tours" : 
               category === "historical" ? "Historical Sites" :
               category === "modern" ? "Modern City" :
               category === "gardens" ? "Royal Gardens" : "Cultural Experience"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tour Listings */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredTours.map((tour) => (
            <motion.div 
            key={tour.id}
            variants={scaleUp}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative overflow-hidden h-64">
              <img 
                src={tour.image} 
                alt={tour.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
              <div className="absolute top-4 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-lg">
                ${tour.price}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold mb-1">{tour.title}</h3>
                <div className="flex items-center text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full inline-block">
                  <i className="fa-solid fa-clock mr-1"></i> {tour.duration}
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-5 line-clamp-3">
                {tour.description}
              </p>
              <div className="flex space-x-2 mb-4">
                {tour.highlights.slice(0, 3).map((highlight, index) => (
                  <span key={index} className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded-full">
                    <i className="fa-solid fa-check-circle mr-1"></i>{highlight.split(" ")[0]}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleTourSelect(tour)}
                  className="text-red-600 font-medium hover:text-red-700 transition-colors"
                >
                  <i className="fa-solid fa-circle-info mr-1"></i> View Details
                </button>
                <button
                  onClick={() => handleBooking(tour)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Travel Services Highlights */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mt-20 mb-16"
      >
        <div className="text-center mb-12">
          <span className="text-red-600 font-medium">OUR TOUR SERVICES</span>
          <h2 className="text-3xl font-bold mt-2">Premium Travel Experience</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            variants={scaleUp}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center shadow-lg"
          >
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-car-side text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Private Transportation</h3>
            <p className="text-gray-600">Comfortable vehicles with professional drivers, ensuring seamless travel between attractions.</p>
          </motion.div>
          
          <motion.div 
            variants={scaleUp}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 text-center shadow-lg"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-headset text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Expert Guides</h3>
            <p className="text-gray-600">Knowledgeable guides with deep understanding of Beijing's history, culture and modern development.</p>
          </motion.div>
          
          <motion.div 
            variants={scaleUp}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 text-center shadow-lg"
          >
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-language text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Translation Services</h3>
            <p className="text-gray-600">Professional interpreters to ensure smooth communication during your entire Beijing experience.</p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Custom Tour Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mt-10 mb-20 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">Customize Your Perfect Beijing Experience</h2>
            <p className="text-red-100 mb-6">
               Can't find exactly what you're looking for? Our expert team can create a personalized itinerary tailored to your interests, needs, and schedule across China. Our services include private car with driver, professional translation, and knowledgeable guides.
            </p>
            <Link to="/contact" className="inline-block bg-white text-red-600 px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact for Custom Itinerary
            </Link>
          </div>
          <div className="md:w-1/3">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Custom%20travel%20planning%2C%20map%20and%20itinerary%2C%20travel%20agent&sign=1379649be089f1d92a4d2ca9eebe36d6" 
              alt="Custom Tour Planning" className="rounded-xl shadow-lg w-full h-auto border-4 border-white/20"
            />
          </div>
        </div>
      </motion.div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedTour && (
        <BookingForm 
          onClose={() => setShowBookingForm(false)}
          serviceType="tour"
          serviceName={selectedTour.title}
        />
      )}
    </div>
  );
}