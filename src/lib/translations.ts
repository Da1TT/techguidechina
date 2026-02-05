// Translation file for English
interface Translation {
  [key: string]: string | Translation;
}

interface Translations {
  en: Translation;
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
  }
};

export default translations;