import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";

// Types for company history
interface TimelineItem {
  year: string;
  event: string;
}

export default function About() {
  const { t } = useLanguage();
  
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

  // Core values
  const coreValues = [
    {
      title: "Expertise",
      description: "Deep knowledge of China's tech industry and exhibitions",
      icon: "fa-lightbulb"
    },
    {
      title: "Professionalism",
      description: "Highest standards of service quality and reliability",
      icon: "fa-award"
    },
    {
      title: "Integrity",
      description: "Honest, transparent, and ethical business practices",
      icon: "fa-shield-alt"
    },
    {
      title: "Innovation",
      description: "Staying ahead of tech trends to provide cutting-edge insights",
      icon: "fa-rocket"
    }
  ];

  // Founders with detailed background
  const founders = [
     {
      name: "Bowen Zhang",
      position: "Founder",
      image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/355308353282/attachment/张博文_20260125162507.jpg",
      bio: "With many years of experience in the IT and internet industry, Bowen Zhang has extensive knowledge of China's technology companies and exhibitions across the country. His deep understanding of the Chinese tech ecosystem and international business practices makes him an invaluable resource for clients seeking to navigate China's tech landscape.",
      expertise: ["IT Industry", "Business Development", "Exhibition Strategy", "Cross-cultural Communication"]
    },
     {
      name: "Yoyo Guan",
      position: "Founder",
      image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/355308353282/attachment/关玥_20260125162507.JPG",
      bio: "With 8 years of experience at Lenovo, Yoyo Guan brings deep expertise in chip and battery technology. Her technical background and understanding of China's tech ecosystem provide valuable insights for clients attending technology exhibitions. She is passionate about bridging the gap between Chinese tech innovation and international audiences.",
      expertise: ["Semiconductor Technology", "Battery Innovation", "Technical Translation", "AI Applications"]
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
        <span className="text-red-600 font-medium">{t("nav.about")}</span>
         <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">About TechGuide in China</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We are a professional services provider specializing in IT and AI exhibition support and customized Beijing tours for international visitors, founded by tech industry experts with deep knowledge of China's technology ecosystem.
        </p>
      </motion.div>

      {/* Company Overview */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
             <p className="text-gray-600 mb-4">
              Founded by Zhang Bowen and Guan Yue, TechGuide in China was created to bridge the gap between China's thriving tech ecosystem and international visitors. Recognizing the growing interest in China's IT and AI innovations, our founders set out to provide specialized support services for international businesses and professionals attending tech exhibitions in China.
            </p>
            <p className="text-gray-600 mb-4">
              With a combined background in IT, semiconductor technology, and international business, our team brings unique insights and expertise to every client engagement. We understand the specific needs of tech professionals visiting China and have tailored our services to provide comprehensive support for both exhibition participation and cultural exploration.
            </p>
            <p className="text-gray-600">
              Today, TechGuide in China has successfully served thousands of clients from around the world, helping them navigate China's complex tech landscape with confidence and ease. Our commitment to excellence and deep industry knowledge has made us a trusted partner for businesses looking to engage with China's tech ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=IT%20exhibition%20in%20China%2C%20international%20business%20people%20networking&sign=bf5bf10b8e17102d22d0ffd9e343359e" 
                alt="Tech Exhibition Support" 
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Professional%20tour%20guide%20with%20foreign%20visitors%2C%20Beijing&sign=81b34affbba2ae51be03d6db1a20e4af" 
                alt="Beijing Tour Services" 
                className="rounded-xl shadow-lg w-full h-80 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Founders Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-20 bg-gradient-to-b from-red-50 to-white"
      >
        <div className="text-center mb-16 p-8">
          <h2 className="text-3xl font-bold mb-2">Meet Our Expert Founders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With deep expertise in China's tech industry and years of professional experience, our founders are dedicated to providing exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-8">
          {founders.map((founder, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg mb-6 border-4 border-red-100">
                    <img 
                      src={founder.image} 
                      alt={founder.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                  <p className="text-red-600 font-medium">{founder.position}</p>
                </div>
                <p className="text-gray-600 mb-6 text-center">
                  {founder.bio}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {founder.expertise.map((skill, i) => (
                    <span 
                      key={i} 
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-20 bg-gray-50 rounded-2xl p-8 md:p-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {coreValues.map((value, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`fa-solid ${value.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-red-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Why Choose TechGuide in China?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-laptop-code text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Tech Industry Expertise</h3>
              <p>Our team has deep knowledge of China's IT and AI sectors, providing valuable insights beyond basic translation.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-handshake text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Trusted Partnership</h3>
              <p>We build long-term relationships with our clients based on trust, reliability, and exceptional service quality.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-map-marked-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Local Insights</h3>
              <p>Our deep understanding of Chinese business culture and local customs ensures smooth and successful engagements.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}