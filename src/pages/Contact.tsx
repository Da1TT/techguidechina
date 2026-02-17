import { motion } from "framer-motion";
import { useRef } from "react";
import { toast } from "sonner";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  
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

  // Handle form submission using Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      // 使用Formspree发送表单数据
      const form = formRef.current;
      
      try {
        // 使用Formspree推荐的标准方法
        const response = await fetch('https://formspree.io/f/xojdrkdr', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: new FormData(form),
        });
        
        // 记录完整的响应信息用于调试
        console.log('Formspree response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          toast.success('Your message has been sent! We will contact you shortly.');
          form.reset();
        } else {
          // 获取详细的错误信息
          const errorText = await response.text();
          console.error('Form submission error:', response.status, response.statusText, errorText);
          
          try {
            // 尝试解析JSON格式的错误信息
            const errorData = JSON.parse(errorText);
            if (errorData.error) {
              toast.error(`Oops! ${errorData.error}`);
            } else {
              toast.error('Oops! There was a problem submitting your form. Please try again.');
            }
          } catch (jsonError) {
            // 如果错误信息不是JSON格式，显示原始错误文本
            toast.error(`Oops! ${errorText || 'There was a problem submitting your form. Please try again.'}`);
          }
        }
      } catch (error) {
        console.error('Network error:', error);
        toast.error('Network error! Please check your connection and try again later.');
      }
    }
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
        <span className="text-red-600 font-medium">Contact</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Get in Touch With Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance with planning your trip or exhibition visit? Our team is here to help.
        </p>
      </motion.div>
  
      {/* Contact Form and Information */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="tour">Tour Information</option>
                  <option value="exhibition">Exhibition Support</option>
                  <option value="custom">Custom Itinerary</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </motion.div>
  
          {/* Contact Information */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="bg-gray-50 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fa-solid fa-phone text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Phone Numbers</h3>
                    <p className="text-gray-600">+86 13601396033</p>
                    <p className="text-gray-600">+86 18811405699</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email Address</h3>
                    <p className="text-gray-600">yoyo4615@163.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fa-solid fa-clock text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>
  
            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-lg h-72">
              <img 
                src="/images/contact-meeting.jpg" 
                alt="Beijing Map" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
  
      {/* FAQ Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-4"
        >
          <motion.div variants={fadeIn} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-2">How far in advance should I book my tour?</h3>
            <p className="text-gray-600">
              We recommend booking your tour at least 2-4 weeks in advance to ensure availability, especially during peak travel seasons. For custom tours or group bookings, we suggest contacting us 4-6 weeks ahead of time.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-2">What is included in your exhibition support services?</h3>
            <p className="text-gray-600">
              Our exhibition support includes visa assistance, booth setup coordination, translation services, logistics support, transportation, accommodation arrangements, and on-site assistance throughout the exhibition period.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-2">Can you help with visa applications for China?</h3>
            <p className="text-gray-600">
              Yes, we provide visa application assistance for international visitors coming to China for tours, exhibitions, or business purposes. We can guide you through the application process and provide necessary documentation.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-2">How does the booking process work?</h3>
            <p className="text-gray-600">
              To book our services, simply fill out the contact form or email us directly at yoyo4515@163.com. Our team will respond within 24 hours to discuss your requirements and provide a detailed proposal. Once confirmed, we'll handle all arrangements and keep you updated throughout the process.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}