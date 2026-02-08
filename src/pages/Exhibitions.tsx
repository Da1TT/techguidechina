import { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";
import { motion } from "framer-motion";
import ScrollLink from "../components/ScrollLink";

// Types for exhibition data
interface Exhibition {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  image: string;
  registrationLink: string;
  category: 'ai' | 'it' | 'digital' | 'industry';
}

// Types for service
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Exhibitions() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'it' | 'digital' | 'industry'>('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [filteredExhibitions, setFilteredExhibitions] = useState<Exhibition[]>([]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 2026年中国境内真实大型IT和AI展会信息（按时间排序）
  const exhibitions: Exhibition[] = [
    // Q1 2026
    {
      id: 1,
      title: "中国国际智能建筑展览会",
      date: "March 10-12, 2026",
      location: "北京国家会议中心, 北京",
      description: "中国智能建筑领域最具影响力的专业展会，聚焦智慧建筑、物联网、AI在城市管理中的应用，汇聚行业领军企业和国际知名厂商。",
      highlights: [
        "智慧建筑与物联网技术",
        "AI驱动的楼宇自动化系统",
        "5G在智能建筑中的应用",
        "绿色建筑与节能技术"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Smart%20Building%20Exhibition%20Beijing%20China%20technology&sign=6856f58a6c5e477f9ad6dd8029d26b01",
      registrationLink: "https://www.smartbuildingexpo.com.cn",
      category: 'industry'
    },

    // Q2 2026
    {
      id: 2,
      title: "中国国际大数据产业博览会",
      date: "May 26-28, 2026",
      location: "贵阳国际会议展览中心, 贵阳",
      description: "中国大数据领域唯一的国家级展会，聚焦大数据、云计算、人工智能等前沿技术，是全球大数据发展的重要风向标。",
      highlights: [
        "大数据与云计算技术创新",
        "AI在各行业的应用案例",
        "数据安全与隐私保护",
        "国际大数据产业合作"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Big%20Data%20Expo%20China%20Guiyang%20technology%20conference&sign=b493ac3474664c38ecb5e03975ff43da",
      registrationLink: "https://www.bigdata-expo.cn",
      category: 'ai'
    },

    {
      id: 3,
      title: "中国国际软件和信息服务交易会",
      date: "June 15-17, 2026",
      location: "大连世界博览广场, 大连",
      description: "中国最大的软件和信息服务行业盛会之一，聚焦软件开发、数字化转型、AI应用，汇聚国内外顶尖科技企业和开发团队。",
      highlights: [
        "AI软件开发平台与工具",
        "云计算与SaaS解决方案",
        "数字化转型成功案例",
        "开源技术与协作"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Software%20Expo%20Dalian%20China%20IT%20technology&sign=a71fcf6672da119c8eb27d1811b7918f",
      registrationLink: "https://www.csis.cn",
      category: 'it'
    },

    // Q3 2026
    {
      id: 4,
      title: "世界人工智能大会（WAIC）",
      date: "July 8-10, 2026",
      location: "上海世博展览馆, 上海",
      description: "全球人工智能领域最具影响力的顶级盛会之一，汇聚全球AI领军企业、顶尖专家学者，展示最前沿的AI技术和应用。",
      highlights: [
        "AI大模型与生成式AI",
        "自动驾驶与机器人技术",
        "AI+垂直行业应用",
        "全球AI前沿研究发布"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=World%20Artificial%20Intelligence%20Conference%20WAIC%20Shanghai&sign=702ace6937a6f24bf35c90a1202d0f2e",
      registrationLink: "https://www.worldaic.com.cn",
      category: 'ai'
    },

    {
      id: 5,
      title: "中国国际数字娱乐展览会（ChinaJoy）",
      date: "July 30-August 2, 2026",
      location: "上海新国际博览中心, 上海",
      description: "亚洲最具影响力的数字娱乐展会，涵盖游戏、动漫VR/AR、电竞等，展示AI在数字娱乐领域的最新应用。",
      highlights: [
        "AI驱动的游戏开发技术",
        "VR/AR与沉浸式体验",
        "全球电竞顶级赛事",
        "数字内容创作与分发"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=ChinaJoy%20digital%20entertainment%20exhibition%20Shanghai&sign=8d1ba33572ab44314f87eca5e2b8b49c",
      registrationLink: "https://www.chinajoy.net",
      category: 'digital'
    },

    // Q4 2026
    {
      id: 6,
      title: "中国国际信息通信展览会（PT Expo China）",
      date: "September 20-22, 2026",
      location: "北京国家会议中心, 北京",
      description: "亚洲规模最大、最具影响力的信息通信展会之一，聚焦5G、物联网、云计算、人工智能等前沿技术。",
      highlights: [
        "5G网络技术与应用",
        "物联网与智慧城市",
        "AI在网络运营中的应用",
        "未来通信技术展望"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=PT%20Expo%20China%20telecommunication%20Beijing%205G&sign=c30039d78b5815b5ec9ac16c96a08416",
      registrationLink: "https://www.ptexpo.com.cn",
      category: 'it'
    },

    {
      id: 7,
      title: "世界互联网大会",
      date: "November 7-9, 2026",
      location: "乌镇互联网国际会展中心, 浙江乌镇",
      description: "全球互联网领域的顶级盛会，聚焦数字经济、人工智能、网络安全等前沿话题，汇聚全球互联网领军人物。",
      highlights: [
        "全球互联网前沿趋势",
        "AI伦理与治理",
        "数字经济发展战略",
        "国际互联网治理合作"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=World%20Internet%20Conference%20Wuzhen%20China%20digital%20economy&sign=a3971fd429410a00b529ae3b362f8499",
      registrationLink: "https://www.wicinternet.org",
      category: 'ai'
    },

    {
      id: 8,
      title: "中国国际物联网展览会",
      date: "October 28-30, 2026",
      location: "深圳会展中心, 深圳",
      description: "中国物联网领域最具影响力的专业展会，展示物联网传感器、RFID、智能硬件等前沿技术与解决方案。",
      highlights: [
        "物联网传感器与芯片",
        "RFID与自动识别技术",
        "AIoT智能硬件",
        "工业4.0与智能制造"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=IoT%20Expo%20Shenzhen%20ChinaChina%20Internet%20of%20Things&sign=2525739ada50d6fe1e934dd6c1596237",
      registrationLink: "https://www.iotexpo.com.cn",
      category: 'it'
    },

    {
      id: 9,
      title: "中国国际人工智能产业发展大会",
      date: "September 12-14, 2026",
      location: "上海虹桥国家会展中心, 上海",
      description: "聚焦AI产业发展的专业盛会，展示AI算法、AI芯片、AI应用等全产业链技术，推动AI产业化落地。",
      highlights: [
        "AI算力与芯片",
        "AI算法与模型",
        "AI在制造业的应用",
        "AI产业投资与合作"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=AI%20Industry%20Conference%20Shanghai%20China%20technology&sign=e41bb82746c665fbccbb0523466195b2",
      registrationLink: "#",
      category: 'ai'
    }
  ];

  // Exhibition services
  const services: Service[] = [
    {
      id: 1,
      title: "Pre-exhibition Planning",
      description: "Comprehensive planning assistance including registration, visa support, and logistics coordination.",
      icon: "fa-calendar-check"
    },
    {
      id: 2,
      title: "On-site Support",
      description: "Professional interpreters and guides to assist you throughout the exhibition period.",
      icon: "fa-handshake"
    },
    {
      id: 3,
      title: "Industry Insights",
      description: "Expert analysis of market trends and introduction to key players in China's tech industry.",
      icon: "fa-lightbulb"
    },
    {
      id: 4,
      title: "Transport & Accommodation",
      description: "Premium transportation services and accommodation arrangements tailored to your needs.",
      icon: "fa-car"
    }
  ];

  // Filter exhibitions by category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredExhibitions(exhibitions);
    } else {
      setFilteredExhibitions(exhibitions.filter(exhibition => exhibition.category === activeCategory));
    }
  }, [activeCategory]);

  // Handle exhibition registration
  const handleRegistration = (exhibition: Exhibition) => {
    // Open the booking form modal with the selected exhibition
    setSelectedExhibition(exhibition);
    setShowBookingForm(true);
  };

  // Service process steps
  const processSteps = [
    {
      title: "Initial Consultation",
      description: "We discuss your specific needs, goals, and expectations for the exhibition visit."
    },
    {
      title: "Customized Planning",
      description: "Our team creates a tailored plan including logistics, scheduling, and support services."
    },
    {
      title: "On-site Support",
      description: "Our professional team provides on-site assistance throughout the exhibition period."
    },
    {
      title: "Post-event Follow-up",
      description: "We gather feedback and provide a summary report to help evaluate your exhibition success."
    }
  ];

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
        <span className="text-red-600 font-medium">Exhibitions</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">IT & AI Exhibition Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional guidance for international visitors to China's leading IT and AI exhibitions, with expert insights from our team of industry specialists.
        </p>
      </motion.div>

      {/* Exhibition Categories */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className className="max-w-7xl mx-auto mb-12"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {['all', 'ai', 'it', 'digital', 'industry'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as any)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-red-600 text-white font-medium"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category === 'all' ? 'All Exhibitions' : 
               category === 'ai' ? 'AI & Machine Learning' :
               category === 'it' ? 'IT & Software' :
               category === 'digital' ? 'Digital Entertainment' : 'Industrial Tech'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Exhibitions */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Upcoming Technology Exhibitions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the major IT and AI exhibitions in China for 2026
          </p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredExhibitions.map((exhibition) => (
            <motion.div 
              key={exhibition.id}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={exhibition.image} 
                    alt={exhibition.title} 
                    className="h-64 md:h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center text-sm text-red-600 mb-3">
                    <i className="fa-solid fa-calendar-days mr-2"></i>
                    <span>{exhibition.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{exhibition.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <i className="fa-solid fa-location-dot mr-2"></i>
                    <span>{exhibition.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{exhibition.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Highlights:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {exhibition.highlights.slice(0, 2).map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleRegistration(exhibition)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Exhibition Services */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-20 bg-gray-50 rounded-2xl p-8 md:p-12"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">Our Exhibition Support Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive support to ensure your exhibition experience is successful and productive
          </p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`fa-solid ${service.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Exhibition Support Process */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">Our Exhibition Support Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide end-to-end support to ensure your exhibition experience is successful
          </p>
        </div>
        
        <div className="relative">
          {/* Process steps */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-red-200 transform -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                  <h3 className="text-2xl font-bold mb-3">Step {index + 1}: {step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                <div className="hidden md:flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                
                <div className="md:w-1/2 mt-4 md:mt-0"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Expert Founders Highlight */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Benefit from Our Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our founders have deep knowledge of China's tech industry and can provide invaluable insights during your exhibition visit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mr-6 border-4 border-white">
                <img 
                  src="https://lf-code-agent.coze.cn/obj/x-ai-cn/355308353282/attachment/张博文_20260125162507.jpg" 
                  alt="Zhang Bowen" 
                  className="w-full h-full object-cover"
                />
              </div>
               <div>
                 <h3 className="text-xl font-bold mb-1">Bowen Zhang</h3>
                 <p className="text-red-600 font-medium mb-2">Co-founder & CEO</p>
                 <p className="text-gray-600">
                   With extensive experience in the IT and internet industry, Bowen Zhang has in-depth knowledge of China's technology companies and exhibitions across the country.
                 </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mr-6 border-4 border-white">
                <img 
                  src="https://lf-code-agent.coze.cn/obj/x-ai-cn/355308353282/attachment/关玥_20260125162507.JPG" 
                  alt="Guan Yue" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                 <h3 className="text-xl font-bold mb-1">Yoyo Guan</h3>
                 <p className="text-red-600 font-medium mb-2">Co-founder & CTO</p>
                 <p className="text-gray-600">
                   With extensive experience in Fortune 500 IT companies, Yoyo Guan brings deep expertise in chip and battery technology, providing valuable technical insights for clients.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto bg-red-600 rounded-2xl p-8 md:p-12 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Explore China's Tech Exhibitions?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let our expert team handle all the details so you can focus on your business objectives and make the most of your exhibition experience.
        </p>
        <ScrollLink to="/contact" className="bg-white text-red-600 px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block">
          Request Exhibition Support
        </ScrollLink>
      </motion.div>
      
      {/* Booking Form Modal */}
      {showBookingForm && selectedExhibition && (
        <BookingForm 
          onClose={() => setShowBookingForm(false)}
          serviceType="exhibition"
          serviceName={selectedExhibition.title}
        />
      )}
    </div>
  );
}
