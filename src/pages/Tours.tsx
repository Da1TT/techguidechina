import { useState } from "react";
import BookingForm from "../components/BookingForm";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

interface ServiceFeature {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export default function Tours() {
    const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [showBookingForm, setShowBookingForm] = useState(false);

    const fadeIn = {
        hidden: {
            opacity: 0,
            y: 20
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const staggerContainer = {
        hidden: {
            opacity: 0
        },

        visible: {
            opacity: 1,

            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const scaleUp = {
        hidden: {
            opacity: 0,
            scale: 0.95
        },

        visible: {
            opacity: 1,
            scale: 1,

            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const tours: Tour[] = [{
        id: 1,
        title: "Beijing Historical & Cultural Tour",
        description: "Explore Beijing's iconic landmarks including the Forbidden City, Tiananmen Square, and Temple of Heaven",
        price: 499,
        duration: "Full Day",
        image: "/images/tour-beijing-forbidden-city.jpg",

        highlights: [
            "Visit the magnificent Forbidden City",
            "Explore Tiananmen Square",
            "Discover the ancient Temple of Heaven",
            "Experience traditional Chinese culture with an expert guide"
        ],

        itinerary: [{
            day: "Day 1",

            activities: [
                "Morning: Pick up from hotel with private car",
                "Visit Tiananmen Square",
                "Explore the Forbidden City with skip-the-line access",
                "Lunch at local restaurant with traditional cuisine",
                "Afternoon: Visit Temple of Heaven",
                "Evening: Return to hotel"
            ]
        }],

        category: "historical"
    }, {
        id: 2,
        title: "Shanghai Modern City Tour",
        description: "Experience contemporary Shanghai with visits to the Bund, Pudong Skyline, and vibrant shopping districts",
        price: 399,
        duration: "Full Day",
        image: "/images/tour-shanghai-modern-city.jpg",

        highlights: [
            "Visit the Olympic Park and Bird's Nest Stadium",
            "Enjoy panoramic views from CCTV Tower",
            "Experience vibrant shopping districts",
            "See modern Beijing's development with expert commentary"
        ],

        itinerary: [{
            day: "Day 1",

            activities: [
                "Morning: Pick up from hotel with private car",
                "Visit Olympic Park and Bird's Nest",
                "Lunch at modern restaurant with international options",
                "Afternoon: Visit CCTV Tower observation deck",
                "Explore Sanlitun shopping district",
                "Evening: Return to hotel"
            ]
        }],

        category: "modern"
    }, {
        id: 3,
        title: "Shanghai Bund & Skyline Tour",
        description: "Explore Shanghai's iconic Bund and modern Pudong skyline, experiencing the blend of Eastern and Western cultures.",
        price: 449,
        duration: "Full Day",
        image: "/images/tour-shanghai-bund.jpg",

        highlights: [
            "Stroll along the Bund, admiring century-old buildings",
            "Visit Shanghai World Financial Center or Shanghai Tower observation deck",
            "Explore Yu Garden and traditional shopping areas",
            "Experience Shanghai's vibrant nightlife"
        ],

        itinerary: [{
            day: "Day 1",

            activities: [
                "Morning: Pick up from hotel with private car",
                "Visit the Bund, learning about Shanghai's history",
                "Lunch at local restaurant with Shanghai cuisine",
                "Afternoon: Visit Yu Garden and City God Temple",
                "Visit Shanghai World Financial Center observation deck",
                "Evening: Enjoy Bund night views before returning to hotel"
            ]
        }],

        category: "modern"
    }, {
        id: 4,
        title: "Xi'an Terracotta Army & City Wall Tour",
        description: "Explore the 8th Wonder of the World - Terracotta Army, and cycle along China's best-preserved Ming Dynasty city wall.",
        price: 599,
        duration: "Full Day",
        image: "/images/tour-xian-terracotta-army.jpg",

        highlights: [
            "Visit the Terracotta Army Museum",
            "Cycle or walk along the Ming Dynasty City Wall",
            "Explore Dacien Temple and Big Wild Goose Pagoda",
            "Taste authentic Shaanxi cuisine"
        ],

        itinerary: [{
            day: "Day 1",

            activities: [
                "Morning: Pick up from hotel with private car",
                "Visit Terracotta Army Museum",
                "Lunch at local restaurant with Shaanxi specialties",
                "Afternoon: Cycle or walk along the City Wall",
                "Visit Dacien Temple and Big Wild Goose Pagoda",
                "Evening: Return to hotel"
            ]
        }],

        category: "historical"
    }, {
        id: 5,
        title: "Chengdu Panda Base & Sichuan Cuisine Tour",
        description: "Visit the world-famous Giant Panda Breeding Research Base and taste authentic Sichuan cuisine.",
        price: 499,
        duration: "Full Day",
        image: "/images/tour-chengdu-panda.jpg",

        highlights: [
            "Observe cute giant pandas and red pandas",
            "Learn about panda conservation efforts",
            "Explore Kuanzhai Ancient Street historical area",
            "Taste authentic Sichuan cuisine, including spicy hot pot"
        ],

        itinerary: [{
            day: "Day 1",

            activities: [
                "Morning: Pick up from hotel with private car",
                "Visit Giant Panda Breeding Research Base",
                "Lunch at local restaurant with Sichuan cuisine",
                "Afternoon: Explore Kuanzhai Ancient Street",
                "Visit Jinli Ancient Street",
                "Evening: Return to hotel"
            ]
        }],

        category: "cultural"
    }, {
        id: 6,
        title: "Guilin Landscape & Li River Bamboo Raft Tour",
        description: "Admire Guilin's magnificent karst landscape and take a traditional bamboo raft ride along the Li River.",
        price: 649,
        duration: "Full Day",
        image: "/images/tour-guilin-li-river.jpg",

        highlights: [
            "Take a traditional bamboo raft ride along the Li River",
            "Admire the 'world's most beautiful landscape' in Guilin",
            "Visit Yangshuo West Street",
            "Experience local ethnic minority culture"
        ],

        itinerary: [{
            day: "Day 1",

            activities: [
                "Morning: Pick up from hotel with private car",
                "Take bamboo raft ride along the Li River's most scenic section",
                "Lunch at local restaurant with farm-style cuisine",
                "Afternoon: Explore Yangshuo West Street",
                "Visit Yinziyan Cave",
                "Evening: Return to hotel"
            ]
        }],

        category: "scenic"
    }, {
        id: 7,
        title: "Hangzhou West Lake Tour",
        description: "Visit the beautiful West Lake and historic temples in Hangzhou, the 'Paradise on Earth'",
        price: 449,
        duration: "Full Day",
        image: "/images/tour-hangzhou-west-lake.jpg",

        highlights: [
            "Take a boat ride on the beautiful West Lake",
            "Visit Longjing tea plantations and learn about tea culture",
            "Taste authentic West Lake Longjing tea",
            "Explore Lingyin Temple"
        ],

        itinerary: [{
            day: "Day 1",

            activities: [
                "Morning: Pick up from hotel with private car",
                "Take a boat ride on West Lake, visiting major attractions",
                "Lunch at lakeside restaurant with Hangzhou cuisine",
                "Afternoon: Visit Longjing tea plantations, learn tea ceremony",
                "Visit Lingyin Temple",
                "Evening: Return to hotel"
            ]
        }],

        category: "gardens"
    }, {
        id: 8,
        title: "Great Wall of China Day Trip",
        description: "Visit the magnificent Mutianyu section of the Great Wall of China, one of the best-preserved sections, with round-trip transportation.",
        price: 549,
        duration: "Full Day",
        image: "/images/tour-great-wall.jpg",

        highlights: [
            "Visit Mutianyu section of the Great Wall with fewer crowds",
            "Enjoy breathtaking mountain views",
            "Experience cable car ride up to the wall",
            "Learn about the wall's history from an expert guide"
        ],

        itinerary: [{
            day: "Day 1",

            activities: [
                "Morning: Early pick up from hotel with private car",
                "Drive to Mutianyu Great Wall (approx 1.5 hours)",
                "Hike along the Great Wall with guide",
                "Lunch at local restaurant near the wall",
                "Afternoon: Optional toboggan ride down",
                "Evening: Return to Beijing"
            ]
        }],

        category: "historical"
    }];

    const serviceFeatures: ServiceFeature[] = [{
        id: 1,
        title: "Professional Guides",
        description: "Expert guides with deep knowledge of Chinese history, culture, and tech industry.",
        icon: "fa-user-tie"
    }, {
        id: 2,
        title: "Private Transportation",
        description: "Comfortable private vehicles with professional drivers for seamless travel.",
        icon: "fa-car"
    }, {
        id: 3,
        title: "Translation Services",
        description: "Fluent English-Chinese interpreters to ensure clear communication.",
        icon: "fa-language"
    }, {
        id: 4,
        title: "Customizable Itineraries",
        description: "Personalized tours tailored to your interests and schedule.",
        icon: "fa-calendar-check"
    }];

    const filteredTours = activeCategory === "all" ? tours : tours.filter(tour => tour.category === activeCategory);

    const handleTourSelect = (tour: Tour) => {
        setSelectedTour(tour);
    };

    const handleBooking = (tour: Tour) => {
        setSelectedTour(tour);
        setShowBookingForm(true);
    };

    return (
        <div className="pt-24 pb-16 px-4">
            {}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true
                }}
                variants={fadeIn}
                className="max-w-7xl mx-auto text-center mb-16">
                <span className="text-red-600 font-medium">Tours</span>
                <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Discover China's Best</h1>
                <></>
            </motion.div>
            {}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true
                }}
                variants={fadeIn}
                className="max-w-7xl mx-auto mb-20 bg-gray-50 rounded-2xl p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {serviceFeatures.map(feature => <motion.div
                        key={feature.id}
                        variants={fadeIn}
                        className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300">
                        <div
                            className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className={`fa-solid ${feature.icon} text-2xl`}></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </motion.div>)}
                </div>
            </motion.div>
            {}
            <></>
            {}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true
                }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map(tour => <motion.div
                    key={tour.id}
                    variants={scaleUp}
                    whileHover={{
                        y: -10
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300
                    }}
                    className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <div className="relative overflow-hidden h-64">
                        <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                        <div
                            className="absolute top-4 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-lg">${tour.price}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="text-xl font-bold mb-1">{tour.title}</h3>
                            <div
                                className="flex items-center text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full inline-block">
                                <i className="fa-solid fa-clock mr-1"></i> {tour.duration}
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 mb-5 line-clamp-3">
                            {tour.description}
                        </p>
                        <div className="flex space-x-2 mb-4">
                            {tour.highlights.slice(0, 3).map((highlight, index) => <span
                                key={index}
                                className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded-full">
                                <i className="fa-solid fa-check-circle mr-1"></i>{highlight.split(" ")[0]}
                            </span>)}
                        </div>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => handleTourSelect(tour)}
                                className="text-red-600 font-medium hover:text-red-700 transition-colors">
                                <i className="fa-solid fa-circle-info mr-1"></i>View Details
                                                                                </button>
                            <button
                                onClick={() => handleBooking(tour)}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">Book Now
                                                                                </button>
                        </div>
                    </div>
                </motion.div>)}
            </motion.div>
            {}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true
                }}
                variants={fadeIn}
                className="max-w-7xl mx-auto mt-20 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mt-2">Premium Travel Experience</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        variants={scaleUp}
                        whileHover={{
                            y: -5
                        }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center shadow-lg">
                        <div
                            className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa-solid fa-car-side text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Private Transportation</h3>
                        <p className="text-gray-600">Comfortable vehicles with professional drivers, ensuring seamless travel between attractions.</p>
                    </motion.div>
                    <motion.div
                        variants={scaleUp}
                        whileHover={{
                            y: -5
                        }}
                        className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 text-center shadow-lg">
                        <div
                            className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa-solid fa-headset text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Expert Guides</h3>
                        <p className="text-gray-600">Knowledgeable guides with deep understanding of Beijing's history, culture and modern development.</p>
                    </motion.div>
                    <motion.div
                        variants={scaleUp}
                        whileHover={{
                            y: -5
                        }}
                        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 text-center shadow-lg">
                        <div
                            className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa-solid fa-language text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Translation Services</h3>
                        <p className="text-gray-600">Professional interpreters to ensure smooth communication during your entire Beijing experience.</p>
                    </motion.div>
                </div>
            </motion.div>
            {}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true
                }}
                variants={fadeIn}
                className="max-w-7xl mx-auto mt-10 mb-20 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                        <h2 className="text-3xl font-bold mb-4">Customize Your Perfect Beijing Experience</h2>
                        <p className="text-red-100 mb-6">Can't find exactly what you're looking for? Our expert team can create a personalized itinerary tailored to your interests, needs, and schedule across China. Our services include private car with driver, professional translation, and knowledgeable guides.
                                                                    </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-white text-red-600 px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Contact for Custom Itinerary
                                                                    </Link>
                    </div>
                    <div className="md:w-1/3">
                        <img
                            src="/images/tour-hangzhou-west-lake.jpg"
                            alt="Custom Tour Planning"
                            className="rounded-xl shadow-lg w-full h-auto border-4 border-white/20" />
                    </div>
                </div>
            </motion.div>
            {}
            {showBookingForm && selectedTour && <BookingForm
                onClose={() => setShowBookingForm(false)}
                serviceType="tour"
                serviceName={selectedTour.title} />}
        </div>
    );
}