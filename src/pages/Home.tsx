import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import LazyImage from "../components/LazyImage";
import { toast } from "sonner";
import { exhibitions as allExhibitions, Exhibition } from "../data/exhibitions";
import { tours as allTours, Tour } from "../data/tours";

export default function Home() {
    const [upcomingExhibitions, setUpcomingExhibitions] = useState<Exhibition[]>([]);
    const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
    const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
    const [showFloatingCTA, setShowFloatingCTA] = useState(false);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    // Show floating CTA after scrolling past hero section
    useEffect(() => {
        const handleScroll = () => {
            setShowFloatingCTA(window.scrollY > window.innerHeight * 0.6);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Get exhibitions sorted by date and show first 4 upcoming ones
        const sortedExhibitions = [...allExhibitions].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        const currentDate = new Date();

        // Get future exhibitions (within 7 days past to future)
        const futureExhibitions = sortedExhibitions.filter(ex =>
            (ex.startDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24) >= -7
        );

        let filtered = futureExhibitions;

        // If we have fewer than 4 future exhibitions, add past ones to reach 4
        if (futureExhibitions.length < 4) {
            const needed = 4 - futureExhibitions.length;
            const additional = sortedExhibitions
                .filter(ex => !futureExhibitions.some(f => f.id === ex.id))
                .slice(0, needed);
            filtered = [...futureExhibitions, ...additional];
        }

        setUpcomingExhibitions(filtered);

        // Set featured tours (first 3)
        setFeaturedTours(allTours.slice(0, 3));
    }, []);

    const handleRegister = (exhibition: Exhibition) => {
        setSelectedExhibition(exhibition);
        setShowBookingForm(true);
    };

    const handleTourBooking = (tour: Tour) => {
        setSelectedTour(tour);
        setShowBookingForm(true);
    };

    return (
        <div className="font-sans">
            {/* Hero Section - Exhibition Focused */}
            <section className="relative h-[80vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 z-10"></div>
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
                    <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6">
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Trusted by 500+ International Exhibitors</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl">Your Expert Exhibition Guide in China</motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="text-lg md:text-xl mb-8 max-w-2xl">Professional translation, logistics support, and business guidance for US & European companies attending China's leading IT & AI exhibitions. 24/7 English support.</motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => setShowBookingForm(true)} className="bg-white hover:bg-gray-100 text-red-600 px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Get Exhibition Service</button>
                        <Link to="/exhibitions" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all">View Upcoming Exhibitions</Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }} className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Professional Translation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Airport Pickup & Logistics</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Business Networking</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section - Exhibition Focused */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
                        <span className="text-red-600 font-medium">OUR EXHIBITION SERVICES</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Complete Support for Your Exhibition Visit</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Everything you need for a successful exhibition experience in China, from arrival to departure</p>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow relative">
                            <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">MOST POPULAR</div>
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-language text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Professional Translation</h3>
                            <p className="text-gray-600">Expert Chinese-English translation for meetings, negotiations, and exhibition materials.</p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-plane-arrival text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Airport Pickup & Drop-off</h3>
                            <p className="text-gray-600">Meet and greet at airport with private vehicle transfer to your hotel or exhibition venue.</p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-handshake text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Business Networking</h3>
                            <p className="text-gray-600">Introductions to Chinese tech companies and potential business partners.</p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-hotel text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Hotel & Accommodation</h3>
                            <p className="text-gray-600">Premium hotel recommendations and booking assistance near exhibition venues.</p>
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
                                    <div className="md:w-1/4">
                                        <LazyImage 
                                            src={exhibition.image} 
                                            alt={exhibition.title} 
                                            className="h-64 md:h-full w-full object-cover rounded-lg"
                                        />
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
                                        <div className="flex flex-col sm:flex-row与其他 gap-3 md:justify-between md:items-center">
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

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredTours.map((tour) => (
                            <motion.div key={tour.id} variants={fadeIn} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xlx transition-all">
                                <div className="relative overflow-hidden mb-4">
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {tour.badge && (
                                        <div className="absolute top-4 left-4 bg-white text-sm px-3 py-1 rounded-full">
                                            {tour.badge}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">{tour.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{tour.description}</p>
                                    <button
                                        onClick={() => handleTourBooking(tour)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-full transition-colors w-full"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
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
                            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white">
                                <img src="/team/bowen-zhang.jpg" alt="Bowen Zhang" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Bowen Zhang</h3>
                            <p className="text-gray-600 text-center max-w-lg">With many years of experience in IT and internet industry, Bowen Zhang has extensive knowledge of China's technology companies and exhibitions across the country. His expertise ensures clients receive the most insightful guidance during their visit.</p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white">
                                <img src="/team/yoyo-guan.jpg" alt="Yoyo Guan" className="w-full h-full object-cover" />
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Succeed at China's Top Exhibitions?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">Get expert translation, logistics support, and business networking assistance for your next exhibition in China. We support US & European companies every step of the way.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => setShowBookingForm(true)} className="bg-white text-red-600 px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Get Free Consultation</button>
                        <Link to="/exhibitions" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all">View Exhibitions</Link>
                    </div>
                </div>
            </section>

            {/* Floating CTA Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: showFloatingCTA ? 1 : 0, scale: showFloatingCTA ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setShowBookingForm(true)}
                className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:scale-105 hidden md:flex"
            >
                <i className="fa-solid fa-comments"></i>
                <span className="font-medium">Get Exhibition Service</span>
            </motion.button>

            {/* Booking Form Modal */}
            {showBookingForm && selectedExhibition && (
                <BookingForm onClose={() => setShowBookingForm(false)} serviceType="exhibition" serviceName={selectedExhibition.title} />
            )}
            {showBookingForm && selectedTour && !selectedExhibition && (
                <BookingForm onClose={() => setShowBookingForm(false)} serviceType="tour" serviceName={selectedTour.title} />
            )}
            {showBookingForm && !selectedExhibition && !selectedTour && (
                <BookingForm onClose={() => setShowBookingForm(false)} serviceType="exhibition" serviceName="Exhibition Service" />
            )}
        </div>
    );
}
