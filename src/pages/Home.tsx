import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { toast } from "sonner";

interface Exhibition {
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

export default function Home() {
    const [upcomingExhibitions, setUpcomingExhibitions] = useState<Exhibition[]>([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    useEffect(() => {
        const exhibitions: Exhibition[] = [
            {
                id: 1,
                title: "Beijing Smart City Expo",
                date: "January 12-14, 2026",
                location: "China National Convention Center, Beijing",
                description: "Leading exhibition showcasing smart city technologies, IoT, AI applications for urban management and sustainability.",
                highlights: ["Smart infrastructure solutions", "AI-powered urban management systems", "Sustainable city technologies"],
                image: "/images/hero-bg.svg",
                registrationLink: "#",
                startDate: new Date(2026, 0, 12)
            },
            {
                id: 2,
                title: "Guangzhou International Digital Economy Expo",
                date: "February 20-22, 2026",
                location: "China Import and Export Fair Complex, Guangzhou",
                description: "Major event focusing on digital economy development, e-commerce innovations, and AI-driven business transformation.",
                highlights: ["Digital transformation strategies", "AI in e-commerce", "Blockchain applications"],
                image: "/images/hero-bg.svg",
                registrationLink: "#",
                startDate: new Date(2026, 1, 20)
            },
            {
                id: 3,
                title: "Shanghai AI & Robotics Expo",
                date: "March 15-17, 2026",
                location: "Shanghai New International Expo Center",
                description: "Focus on the latest advancements in artificial intelligence, robotics, automation and their industrial applications.",
                highlights: ["Service and industrial robotics demonstrations", "AI algorithms and platforms", "Automation solutions"],
                image: "/images/hero-bg.svg",
                registrationLink: "#",
                startDate: new Date(2026, 2, 15)
            },
            {
                id: 4,
                title: "China Cybersecurity & Information Technology Expo",
                date: "April 8-10, 2026",
                location: "Chongqing International Expo Center",
                description: "Leading exhibition for cybersecurity technologies, data protection solutions, and IT security management systems.",
                highlights: ["Network security solutions", "Data privacy protection technologies"],
                image: "/images/hero-bg.svg",
                registrationLink: "#",
                startDate: new Date(2026, 3, 8)
            },
            {
                id: 5,
                title: "China Big Data Expo",
                date: "May 26-28, 2026",
                location: "Guiyang International Convention and Exhibition Center",
                description: "Major event focusing on big data, cloud computing, and AI technologies with international participation.",
                highlights: ["Big data and cloud computing innovations", "AI integration in various industries"],
                image: "/images/hero-bg.svg",
                registrationLink: "#",
                startDate: new Date(2026, 4, 26)
            },
            {
                id: 6,
                title: "China International Software & Information Service Fair",
                date: "June 15-17, 2026",
                location: "Dalian World Expo Center",
                description: "Major event for software development, information services, and digital transformation with focus on AI software solutions.",
                highlights: ["AI software development platforms", "Cloud computing and big data solutions"],
                image: "/images/hero-bg.svg",
                registrationLink: "#",
                startDate: new Date(2026, 5, 15)
            }
        ];

        const currentDate = new Date();
        const futureExhibitions = exhibitions.filter(ex => (ex.startDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24) >= -7);
        let filtered = futureExhibitions;

        if (futureExhibitions.length < 4) {
            const needed = 4 - futureExhibitions.length;
            const additional = exhibitions.filter(ex => !futureExhibitions.some(f => f.id === ex.id)).sort((a, b) => a.startDate.getTime() - b.startDate.getTime()).slice(0, needed);
            filtered = [...futureExhibitions, ...additional].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        }

        filtered.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        setUpcomingExhibitions(filtered);
    }, []);

    const handleRegister = (exhibition: Exhibition) => {
        setSelectedExhibition(exhibition);
        setShowBookingForm(true);
    };

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative h-[80vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 z-10"></div>
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
                    <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6"></motion.div>
                    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl">Tech Guide in China - Your Gateway to IT & AI Exhibitions</motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="text-lg md:text-xl mb-8 max-w-2xl">Professional guidance for international visitors to China's leading IT and AI exhibitions, with additional tailored Beijing tour services.</motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="flex flex-col sm:flex-row gap-4">
                        <Link to="/exhibitions" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Explore Exhibitions</Link>
                        <Link to="/tours" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all">China Tours</Link>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
                        <span className="text-red-600 font-medium">OUR SERVICES</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Comprehensive Solutions for Your Stay in China</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We provide all the support you need to make your visit to China memorable and successful</p>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-building text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">IT & AI Exhibition Support</h3>
                            <p className="text-gray-600">Professional guidance for China's leading technology exhibitions with expert insights.</p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-map-location-dot text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Beijing Tours</h3>
                            <p className="text-gray-600">Expert-led tours of Beijing's iconic landmarks with professional translation services.</p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-calendar-check text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Custom Itineraries</h3>
                            <p className="text-gray-600">Personalized travel plans tailored to your interests, needs, and schedule.</p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-car text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Transport & Logistics</h3>
                            <p className="text-gray-600">Premium transportation services with professional drivers and comfortable vehicles.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Exhibitions */}
            <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                            <span className="text-red-600 font-medium">UPCOMING EXHIBITIONS</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2">IT & AI Trade Shows in China</h2>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-4 md:mt-0">
                            <Link to="/exhibitions" className="text-red-600 font-medium flex items-center">View All Exhibitions <i className="fa-solid fa-arrow-right ml-2"></i></Link>
                        </motion.div>
                    </div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
                        {upcomingExhibitions.slice(0, 4).map((exhibition) => (
                            <motion.div key={exhibition.id} variants={fadeIn} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="md:w-1/4 h-48 md:h-auto bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                                        <i className="fa-solid fa-calendar-days text-white text-4xl"></i>
                                    </div>
                                    <div className="md:w-3/4 p-6">
                                        <h3 className="text-xl font-bold mb-2 hover:text-red-600 transition-colors">{exhibition.title}</h3>
                                        <div className="flex items-center text-sm text-red-600 mb-3">
                                            <i className="fa-solid fa-calendar-days mr-2"></i>
                                            <span>{exhibition.date}</span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{exhibition.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {exhibition.highlights.map((highlight, idx) => (
                                                <span key={idx} className="inline-flex items-center text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                                    <i className="fa-solid fa-circle-check text-green-500 mr-1"></i>
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 md:justify-between md:items-center">
                                            <div className="text-sm text-gray-500">
                                                <i className="fa-solid fa-clock mr-1"></i>
                                                <span>Starts in {Math.floor((exhibition.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={() => handleRegister(exhibition)} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">Register Now</button>
                                                <button onClick={() => toast.success("Added to calendar!")} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                                                    <i className="fa-solid fa-calendar-plus mr-1"></i>Add to Calendar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Tours Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                            <span className="text-red-600 font-medium">EXPLORE CHINA</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2">Discover China's Best</h2>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-4 md:mt-0">
                            <Link to="/tours" className="text-red-600 font-medium flex items-center">View All Tours <i className="fa-solid fa-arrow-right ml-2"></i></Link>
                        </motion.div>
                    </div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div variants={fadeIn} className="group">
                            <div className="relative overflow-hidden rounded-xl mb-4">
                                <div className="h-64 bg-gradient-to-br from-red-400 to-red-500"></div>
                                <div className="absolute top-4 left-4 bg-white text-sm px-3 py-1 rounded-full">BESTSELLER</div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Historical & Cultural Tour</h3>
                            <p className="text-gray-600 mb-4">Explore Beijing's iconic landmarks including Forbidden City, Tiananmen Square, and Temple of Heaven.</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-xl font-bold text-red-600">$499</span>
                                    <span className="text-gray-500 text-sm">/ per person</span>
                                </div>
                                <Link to="/tours" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors">Book Now</Link>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeIn} className="group">
                            <div className="relative overflow-hidden rounded-xl mb-4">
                                <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-600"></div>
                                <div className="absolute top-4 left-4 bg-white text-sm px-3 py-1 rounded-full">MODERN</div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Modern City Tour</h3>
                            <p className="text-gray-600 mb-4">Experience contemporary Beijing with visits to Olympic Park, CCTV Tower, and vibrant shopping districts.</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-xl font-bold text-red-600">$399</span>
                                    <span className="text-gray-500 text-sm">/ per person</span>
                                </div>
                                <Link to="/tours" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors">Book Now</Link>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeIn} className="group">
                            <div className="relative overflow-hidden rounded-xl mb-4">
                                <div className="h-64 bg-gradient-to-br from-purple-500 to-purple-600"></div>
                                <div className="absolute top-4 left-4 bg-white text-sm px-3 py-1 rounded-full">ROYAL</div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Royal Gardens Tour</h3>
                            <p className="text-gray-600 mb-4">Visit exquisite imperial gardens such as Summer Palace and Yuanmingyuan.</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-xl font-bold text-red-600">$449</span>
                                    <span className="text-gray-500 text-sm">/ per person</span>
                                </div>
                                <Link to="/tours" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors">Book Now</Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
                        <span className="text-red-600 font-medium">ABOUT US</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Meet Our Expert Founders</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">With deep expertise in China's tech industry and years of professional experience, our founders are dedicated to providing exceptional service.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-3xl font-bold">B</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Bowen Zhang</h3>
                            <p className="text-gray-600 text-center max-w-lg">With many years of experience in IT and internet industry, Bowen Zhang has extensive knowledge of China's technology companies and exhibitions across the country. His expertise ensures clients receive the most insightful guidance during their visit.</p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-3xl font-bold">Y</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Yoyo Guan</h3>
                            <p className="text-gray-600 text-center max-w-lg">With extensive experience in Fortune 500 IT companies, Yoyo Guan brings deep expertise in chip and battery technology. Her technical background and understanding of China's tech ecosystem provide valuable insights for clients attending technology exhibitions.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What Our Clients Say</h2>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-yellow-400 mb-4">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <p className="text-gray-600 italic mb-6">"The exhibition support was exceptional - knowledgeable, professional, and tailored to our specific needs. Zhang Bowen's insights into China's tech industry were invaluable for our business expansion plans."</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white text-xl font-bold">D</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">David Miller</h4>
                                    <p className="text-gray-500 text-sm">CTO, TechInnovate Inc.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-yellow-400 mb-4">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <p className="text-gray-600 italic mb-6">"Guan Yue's technical background made our visit to AI exhibition truly insightful. Her translation services were excellent, and customized tour of Beijing's tech hubs exceeded our expectations."</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white text-xl font-bold">S</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">Sarah Johnson</h4>
                                    <p className="text-gray-500 text-sm">Research Director, AI Labs</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-yellow-400 mb-4">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star-half-stroke"></i>
                            </div>
                            <p className="text-gray-600 italic mb-6">"From airport pickup to exhibition navigation and city tours, everything was handled seamlessly. The team's knowledge of both China's tech industry and cultural landmarks made our trip both productive and enjoyable."</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white text-xl font-bold">M</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">Michael Chen</h4>
                                    <p className="text-gray-500 text-sm">Business Development Manager</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-red-600 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xlxl md:text-4xl font-bold mb-6">Ready to Explore China's Tech Scene?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">Let our expert team guide you through China's premier IT and AI exhibitions, with customized support tailored to your business needs.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="bg-white text-red-600 px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Contact Us</Link>
                        <Link to="/exhibitions" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all">View Exhibitions</Link>
                    </div>
                </div>
            </section>

            {/* Booking Form Modal */}
            {showBookingForm && selectedExhibition && (
                <BookingForm onClose={() => setShowBookingForm(false)} serviceType="exhibition" serviceName={selectedExhibition.title} />
            )}
        </div>
    );
}
