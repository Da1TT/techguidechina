import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Contact() {
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
        <span className="text-red-600 font-medium">{t("nav.contact")}</span>
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
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Select a subject</option>
                  <option value="tour">Tour Information</option>
                  <option value="exhibition">Exhibition Support</option>
                  <option value="custom">Custom Itinerary</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your message"
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
                    <i className="fa-solid fa-map-marker-alt text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Our Office</h3>
                    <p className="text-gray-600">{t("footer.address")}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fa-solid fa-phone text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Phone Number</h3>
                    <p className="text-gray-600">{t("footer.phone")}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email Address</h3>
                    <p className="text-gray-600">{t("footer.email")}</p>
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
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Map%20showing%20Beijing%20location%20in%20China&sign=f84347b106f0f46beeeb1c01c3e768fb" 
                alt="Office Location Map" 
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
            <h3 className="text-xl font-bold mb-2">What languages do your guides speak?</h3>
            <p className="text-gray-600">
              Our professional guides are fluent in English, Mandarin, and many other languages including French, Spanish, German, Japanese, and Korean. Please specify your language preference when booking.
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
        </motion.div>
      </motion.div>

      {/* GitHub File Operations Guide */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">GitHub File Operations Guide</h2>
          <p className="text-gray-600">
            Learn how to manage files in your GitHub repository
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Moving Files */}
          <div>
            <h3 className="text-xl font-bold mb-4">Moving Files</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold mb-2">Method 1: Using GitHub Web Interface</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Navigate to your repository on GitHub</li>
                <li>Click on the file you want to move</li>
                <li>Click the pencil icon to edit the file</li>
                <li>In the file name field, update the path (e.g., change "old-folder/file.md" to "new-folder/file.md")</li>
                <li>Scroll down and commit your changes</li>
              </ol>
              
              <h4 className="font-bold mt-4 mb-2">Method 2: Using Git Command Line</h4>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>
                  # Move a file from old location to new location
                  git mv old-folder/file.md new-folder/file.md
                  
                  # Commit the change
                  git commit -m "Move file to new folder"
                  
                  # Push the change to GitHub
                  git push origin main
                </code>
              </pre>
            </div>
          </div>
          
          {/* Deleting Files */}
          <div>
            <h3 className="text-xl font-bold mb-4">Deleting Files</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold mb-2">Method 1: Using GitHub Web Interface</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Navigate to your repository on GitHub</li>
                <li>Click on the file you want to delete</li>
                <li>Click the trash can icon at the top right</li>
                <li>Scroll down and commit your changes</li>
              </ol>
              
              <h4 className="font-bold mt-4 mb-2">Method 2: Using Git Command Line</h4>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>
                  # Delete a file
                  git rm file.md
                  
                  # Commit the deletion
                  git commit -m "Delete file"
                  
                  # Push the change to GitHub
                  git push origin main
                </code>
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}