import { useState } from "react";
import BookingForm from "../components/BookingForm";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'it' | 'digital' | 'industry'>('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);

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

  // Mock exhibition data with focus on AI and IT exhibitions (monthly coverage)
  const exhibitions: Exhibition[] = [
    // January 2026
    {
      id: 1,
      title: "Beijing Smart City Expo",
      date: "January 12-14, 2026",
      location: "China National Convention Center, Beijing",
      description: "Leading exhibition showcasing smart city technologies, IoT, AI applications for urban management and sustainability.",
      highlights: [
        "Smart infrastructure solutions",
        "AI-powered urban management systems",
        "Sustainable city technologies",
        "Case studies from leading Chinese cities"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Smart%20City%20Technology%20Exhibition%2C%20Beijing&sign=6856f58a6c5e477f9ad6dd8029d26b01",
      registrationLink: "#",
      category: 'ai'
    },
    
    // February 2026
    {
      id: 2,
      title: "Guangzhou International Digital Economy Expo",
      date: "February 20-22, 2026",
      location: "China Import and Export Fair Complex, Guangzhou",
      description: "Major event focusing on digital economy development, e-commerce innovations, and AI-driven business transformation.",
      highlights: [
        "Digital transformation strategies",
        "AI in e-commerce",
        "Blockchain applications",
        "Cross-border digital trade opportunities"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Digital%20Economy%20Exhibition%2C%20Guangzhou&sign=b493ac3474664c38ecb5e03975ff43da",
      registrationLink: "#",
      category: 'digital'
    },
    
    // March 2026
    {
      id: 3,
      title: "Shanghai AI & Robotics Expo",
      date: "March 15-17, 2026",
      location: "Shanghai New International Expo Center",
      description: "Focus on the latest advancements in artificial intelligence, robotics, automation and their industrial applications.",
      highlights: [
        "Service and industrial robotics demonstrations",
        "AI algorithms and platforms",
        "Automation solutions for manufacturing",
        "Human-robot collaboration technologies"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=AI%20and%20Robotics%20Exhibition%2C%20Shanghai&sign=a71fcf6672da119c8eb27d1811b7918f",
      registrationLink: "#",
      category: 'ai'
    },
    
    // April 2026
    {
      id: 4,
      title: "China Cybersecurity & Information Technology Expo",
      date: "April 8-10, 2026",
      location: "Chongqing International Expo Center",
      description: "Leading exhibition for cybersecurity technologies, data protection solutions, and IT security management systems.",
      highlights: [
        "Network security solutions",
        "Data privacy protection technologies",
        "AI in cybersecurity",
        "Cloud security innovations"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Cybersecurity%20Exhibition%2C%20China&sign=702ace6937a6f24bf35c90a1202d0f2e",
      registrationLink: "#",
      category: 'it'
    },
    
    // May 2026
    {
      id: 5,
      title: "China Big Data Expo",
      date: "May 26-28, 2026",
      location: "Guiyang International Convention and Exhibition Center",
      description: "Major event focusing on big data, cloud computing, and AI technologies with international participation.",
      highlights: [
        "Big data and cloud computing innovations",
        "AI integration in various industries",
        "Data security and privacy solutions",
        "International cooperation opportunities"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Big%20Data%20and%20Cloud%20Computing%20Exhibition%2C%20China&sign=8d1ba33572ab44314f87eca5e2b8b49c",
      registrationLink: "#",
      category: 'ai'
    },
    
    // June 2026
    {
      id: 6,
      title: "China International Software & Information Service Fair",
      date: "June 15-17, 2026",
      location: "Dalian World Expo Center",
      description: "Major event for software development, information services, and digital transformation with focus on AI software solutions.",
      highlights: [
        "AI software development platforms",
        "Cloud computing and big data solutions",
        "Cybersecurity technologies",
        "Digital transformation case studies"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Software%20and%20information%20service%20exhibition%2C%20China&sign=c30039d78b5815b5ec9ac16c96a08416",
      registrationLink: "#",
      category: 'it'
    },
    
    // July 2026
    {
      id: 7,
      title: "China Digital Entertainment Expo & Conference",
      date: "July 26-28, 2026",
      location: "Shanghai New International Expo Center",
      description: "Asia's largest digital entertainment exhibition featuring games, animation, e-sports, and digital content with AI applications.",
      highlights: [
        "AI in gaming and digital entertainment",
        "E-sports tournaments with top teams worldwide",
        "Digital content creation technologies",
        "Networking opportunities with global professionals"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=China%20digital%20entertainment%20expo%2C%20gaming%20event&sign=a3971fd429410a00b529ae3b362f8499",
      registrationLink: "#",
      category: 'digital'
    },
    
    // August 2026
    {
      id: 8,
      title: "World Artificial Intelligence Conference",
      date: "August 29-31, 2026",
      location: "Shanghai World Expo Exhibition & Convention Center",
      description: "Global platform for AI innovation, research, and business collaboration with leading tech companies and researchers.",
      highlights: [
        "Keynote speeches from AI pioneers",
        "Cutting-edge AI technology demonstrations",
        "AI application showcases across industries",
        "Investment and partnership opportunities"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=World%20Artificial%20Intelligence%20Conference%2C%20tech%20event&sign=2525739ada50d6fe1e934dd6c1596237",
      registrationLink: "#",
      category: 'ai'
    },
    
    // September 2026
    {
      id: 9,
      title: "China International Industry Fair",
      date: "September 19-23, 2026",
      location: "National Exhibition and Convention Center, Shanghai",
      description: "Leading exhibition for industrial technology, automation, and intelligent manufacturing featuring cutting-edge AI applications.",
      highlights: [
        "Industrial automation and robotics displays",
        "Smart manufacturing solutions",
        "5G and IoT applications in industry",
        "Opportunities for international collaboration"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=China%20international%20industry%20fair%2C%20technology%20exhibition&sign=e41bb82746c665fbccbb0523466195b2",
      registrationLink: "#",
      category: 'industry'
    },
    
    // October 2026
    {
      id: 10,
      title: "Beijing International AI Conference",
      date: "October 15-17, 2026",
      location: "China National Convention Center, Beijing",
      description: "Leading AI conference in northern China focusing on the latest advancements and applications in artificial intelligence.",
      highlights: [
        "AI research breakthrough presentations",
        "Industry-specific AI solutions",
        "Startup innovation showcase",
        "Networking with AI experts"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=AI%20Conference%20in%20Beijing%2C%20tech%20event&sign=4d426db46917e7de66ffce312e801e03",
      registrationLink: "#",
      category: 'ai'
    },
    
    // November 2026
    {
      id: 11,
      title: "China 5G and IoT Expo",
      date: "November 8-10, 2026",
      location: "Shenzhen Convention and Exhibition Center",
      description: "Focus on the latest developments in 5G technology, Internet of Things, and their integration with AI applications.",
      highlights: [
        "5G network technology demonstrations",
        "IoT applications across industries",
        "Smart city solutions",
        "Network security innovations"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=5G%20and%20IoT%20Technology%20Exhibition%2C%20China&sign=1d7a778fe31a89c32266952087f1af52",
      registrationLink: "#",
      category: 'it'
    },
    
    // December 2026
    {
      id: 12,
      title: "Shanghai International Computer & Information Technology Exhibition",
      date: "December 5-7, 2026",
      location: "Shanghai New International Expo Center",
      description: "One of China's largest IT exhibitions featuring the latest in computer hardware, software, and digital solutions.",
      highlights: [
        "Latest computer hardware innovations",
        "Software development tools",
        "IT infrastructure solutions",
        "Business technology integrations"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Computer%20and%20IT%20Technology%20Exhibition%2C%20Shanghai&sign=8f30b48f8f3fb63ff28626c7a8b8c012",
      registrationLink: "#",
      category: 'it'
    },
    
    // January 2027 (to show future planning)
    {
      id: 13,
      title: "China Smart Manufacturing Expo",
      date: "January 18-20, 2027",
      location: "Nanjing International Expo Center",
      description: "Focus on Industry 4.0, smart factories, and advanced manufacturing technologies powered by AI and IoT.",
      highlights: [
        "Smart factory demonstrations",
        "AI-driven manufacturing processes",
        "Industrial IoT applications",
        "Supply chain optimization solutions"
      ],
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Smart%20Manufacturing%20Technology%20Exhibition%2C%20China&sign=9ff3da8928d2f4a54cf1a003d540ccb1",
      registrationLink: "#",
      category: 'industry'
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
  const filteredExhibitions = activeCategory === 'all' 
    ? exhibitions 
    : exhibitions.filter(exhibition => exhibition.category === activeCategory);

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
        <span className="text-red-600 font-medium">{t("nav.exhibitions")}</span>
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
        className="max-w-7xl mx-auto mb-12"
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
                className={`md:flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
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
                   With many years of experience in the IT and internet industry, Bowen Zhang has extensive knowledge of China's technology companies and exhibitions across the country.
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
                   With 8 years of experience at Lenovo, Yoyo Guan brings deep expertise in chip and battery technology, providing valuable technical insights for clients.
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
        <Link to="/contact" className="bg-white text-red-600 px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block">
          Request Exhibition Support
        </Link>
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