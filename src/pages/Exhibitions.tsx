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
}

// Types for service
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Exhibitions() {
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

  // 2026年真实大型IT和AI展会信息（英文，按时间排序）
  const exhibitions: Exhibition[] = [
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
      image: "https://images.unsplash.com/photo-1518182172843-d6b4f3ff90e6?w=800&q=80",
      registrationLink: "https://www.smartbuildingexpo.com.cn"
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
      image: "https://images.unsplash.com/photo-1526374966328-7f61ad4dd0c0?w=800&q=80",
      registrationLink: "https://www.bigdata-expo.cn"
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
      image: "https://images.unsplash.com/photo-1518182172843-d6b4f3ff90e6?w=800&q=80",
      registrationLink: "https://www.csis.cn"
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
      image: "https://images.unsplash.com/photo-1526374966328-7f61ad4dd0c0?w=800&q=80",
      registrationLink: "https://www.worldaic.com.cn"
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
      image: "https://images.unsplash.com/photo-1526374966328-7f61ad4dd0c0?w=800&q=80",
      registrationLink: "https://www.chinajoy.net"
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
      image: "https://images.unsplash.com/photo-1526374966328-7f61ad4dd0c0?w=800&q=80",
      registrationLink: "https://www.ptexpo.com.cn"
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
      image: "https://images.unsplash.com/photo-1526374966328-7f61ad4dd0c0?w=800&q=80",
      registrationLink: "https://www.wicinternet.org"
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
      image: "https://images.unsplash.com/photo-1526374966328-7f61ad4dd0c0?w=800&q=80",
      registrationLink: "https://www.iotexpo.com.cn"
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
      image: "https://images.unsplash.com/photo-1526374966328-7f61ad4dd0c0?w=800&q=80",
      registrationLink: "#"
    }
  ];

  // Services
  const services: Service[] = [
    {
      id: 1,
      title: "Pre-Exhibition Planning",
      description: "Comprehensive planning including visa assistance, accommodation booking, and scheduling.",
      icon: "fa-calendar-check"
    },
    {
      id: 2,
      title: "On-site Support",
      description: "Professional interpreters and guides to assist you throughout exhibition period.",
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

  // Handle exhibition registration
  const handleRegistration = (exhibition: Exhibition) => {
    // Open booking form modal with selected exhibition
    setSelectedExhibition(exhibition);
    setShowBookingForm(true);
  };

  // Service process steps
  const processSteps = [
    {
      title: "Initial Consultation",
      description: "We discuss your specific needs, goals, and expectations for exhibition visit."
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
          {exhibitions.map((exhibition) => (
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
                  src="/team/bowen-zhang.jpg" 
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
                  src="/team/yoyo-guan.jpg" 
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
