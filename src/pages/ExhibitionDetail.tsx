import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import BookingForm from '../components/BookingForm';
import { Exhibition, upcomingExhibitions } from '../data/exhibitions-upcoming';
import { toast } from 'sonner';

export default function ExhibitionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    if (id) {
      const found = upcomingExhibitions.find((ex) => ex.id === id);
      if (found) {
        setExhibition(found);
      } else {
        navigate('/exhibitions');
      }
    }
    setLoading(false);
  }, [id, navigate]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!exhibition) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Exhibition Not Found</h1>
        <p className="text-gray-600 mb-8">The exhibition you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/exhibitions')}
          className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
        >
          View All Exhibitions
        </button>
      </div>
    );
  }

  const daysUntilStart = Math.ceil(
    (exhibition.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* SEO */}
      <SEO
        title={`${exhibition.title} | Tech Guide in China`}
        description={exhibition.description}
        keywords={`${exhibition.name}, China exhibition, tech expo, IT conference, ${exhibition.location}`}
        image={exhibition.image}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {exhibition.status === 'upcoming' ? 'Upcoming' : 'Ongoing'}
              </span>
              {daysUntilStart > 0 && (
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                  Starts in {daysUntilStart} days
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{exhibition.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl mb-6">{exhibition.description}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i className="fa-solid fa-calendar"></i>
                <span>{exhibition.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i className="fa-solid fa-location-dot"></i>
                <span>{exhibition.venue}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i className="fa-solid fa-globe"></i>
                <span>{exhibition.website}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Value Proposition */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-red-800 mb-4">
                  <i className="fa-solid fa-handshake mr-2"></i>
                  Why Attend This Exhibition?
                </h2>
                <ul className="space-y-3">
                  {exhibition.valueProposition.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-red-900">
                      <i className="fa-solid fa-check-circle text-green-600 mt-1"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Exhibition Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exhibition.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                    >
                      <i className="fa-solid fa-star text-yellow-500 mt-1"></i>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Exhibitors */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Key Exhibitors</h2>
                <div className="flex flex-wrap gap-2">
                  {exhibition.keyExhibitors.map((company, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 hover:bg-red-50 text-gray-800 px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer border border-gray-200"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Networking Opportunities */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Networking Opportunities</h2>
                <div className="space-y-3">
                  {exhibition.networkingOpportunities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                      <i className="fa-solid fa-users text-red-600"></i>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Conference Program */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="text-2xl font-bold mb-4">Conference Program</h2>
                <div className="space-y-2">
                  {exhibition.conferenceProgram.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <i className="fa-solid fa-microphone text-red-600 mt-1"></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-calendar text-red-600"></i>
                      <span>{exhibition.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-clock text-red-600"></i>
                      <span>9:00 AM - 6:00 PM Daily</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-location-dot text-red-600"></i>
                      <span>{exhibition.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-ticket text-red-600"></i>
                      <span>{exhibition.visitorRegistration}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Need Help Attending?</h3>
                  <p className="text-sm text-white/90 mb-4">
                    We provide professional exhibition support including translation, logistics, and business networking assistance.
                  </p>
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-white text-red-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Get Support
                  </button>
                </div>

                {/* Related Exhibitions */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold mb-4">Other Exhibitions</h3>
                  <div className="space-y-3">
                    {upcomingExhibitions
                      .filter((ex) => ex.id !== exhibition.id)
                      .slice(0, 3)
                      .map((ex) => (
                        <Link
                          key={ex.id}
                          to={`/exhibitions/${ex.id}`}
                          className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <img
                            src={ex.image}
                            alt={ex.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {ex.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{ex.date}</p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Attend {exhibition.name}?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let us help you make the most of this exhibition. From pre-event planning to on-site support and post-event follow-up, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-white text-red-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Exhibition Support
            </button>
            <a
              href={exhibition.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Visit Official Website
            </a>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          serviceType="exhibition"
          serviceName={exhibition.title}
        />
      )}
    </div>
  );
}
