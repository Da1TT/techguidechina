import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import BookingForm from '../components/BookingForm';
import { Tour, tours } from '../data/tours-new';

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'details'>('overview');

  useEffect(() => {
    if (id) {
      const found = tours.find((t) => t.id === id);
      if (found) {
        setTour(found);
      } else {
        navigate('/tours');
      }
    }
    setLoading(false);
  }, [id, navigate]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Tour Not Found</h1>
        <p className="text-gray-600 mb-8">The tour you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/tours')}
          className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
        >
          View All Tours
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO */}
      <SEO
        title={`${tour.title} | Tech Guide in China`}
        description={tour.description}
        keywords={`${tour.city} tour, China travel, ${tour.theme}, IT industry tour`}
        image={tour.images[0]}
      />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {tour.theme}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {tour.title}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mb-6">
                {tour.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-calendar"></i>
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{tour.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-users"></i>
                  <span>Max {tour.maxGroupSize} people</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            {(['overview', 'itinerary', 'details'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {tour.description}
                  </p>

                  <h3 className="text-xl font-bold mb-3">Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {tour.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="fa-solid fa-star text-yellow-500 mt-1"></i>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold mb-3">Who This Tour Is For</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tour.targetAudience.map((audience, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-3">Best Time to Visit</h3>
                  <p className="text-gray-600 mb-4">
                    {tour.bestSeason.join(', ')}
                  </p>
                </motion.div>
              )}

              {activeTab === 'itinerary' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
                  <div className="space-y-6">
                    {tour.itinerary.map((day, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                            {day.day}
                          </span>
                          <h3 className="text-lg font-bold">{day.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{day.description}</p>
                        
                        <div className="space-y-2">
                          {day.activities.map((activity, actIdx) => (
                            <div key={actIdx} className="flex items-start gap-2">
                              <i className="fa-solid fa-check text-green-500 mt-1"></i>
                              <span className="text-gray-700">{activity}</span>
                            </div>
                          ))}
                        </div>

                        {(day.meals.breakfast || day.meals.lunch || day.meals.dinner) && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Meals: </span>
                              {[
                                day.meals.breakfast && `Breakfast: ${day.meals.breakfast}`,
                                day.meals.lunch && `Lunch: ${day.meals.lunch}`,
                                day.meals.dinner && `Dinner: ${day.meals.dinner}`
                              ].filter(Boolean).join(' | ')}
                            </p>
                          </div>
                        )}

                        {day.accommodation && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Accommodation: </span>
                              {day.accommodation}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Tour Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold mb-3 text-green-700">
                        <i className="fa-solid fa-check-circle mr-2"></i>
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <i className="fa-solid fa-check text-green-500 mt-1 text-sm"></i>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold mb-3 text-red-700">
                        <i className="fa-solid fa-times-circle mr-2"></i>
                        What's Not Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.excluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <i className="fa-solid fa-times text-red-500 mt-1 text-sm"></i>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-bold mb-4 text-blue-800">
                      <i className="fa-solid fa-info-circle mr-2"></i>
                      Important Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Difficulty Level</h4>
                        <p className="text-gray-600">{tour.difficulty} - Suitable for most travelers</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Group Size</h4>
                        <p className="text-gray-600">Maximum {tour.maxGroupSize} people</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Best Season</h4>
                        <p className="text-gray-600">{tour.bestSeason.join(', ')}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Theme</h4>
                        <p className="text-gray-600">{tour.theme}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">
                      <i className="fa-solid fa-tag mr-2"></i>
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tour.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-red-600">
                        ${tour.price.base.toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        per {tour.price.perPerson ? 'person' : 'group'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-calendar text-red-600 w-5"></i>
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-users text-red-600 w-5"></i>
                      <span>Max {tour.maxGroupSize} people</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-star text-red-600 w-5"></i>
                      <span>{tour.difficulty} difficulty</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors mb-3"
                  >
                    Book Now
                  </button>

                  <button
                    onClick={() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Contact for Custom Tour
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Deposit: ${tour.price.deposit} per person to secure booking
                  </p>
                </div>

                {/* Why Book With Us */}
                <div className="bg-gray-50 rounded-xl p-6 mt-6">
                  <h3 className="font-bold mb-4">Why Book With Us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
                      <span>Local experts with deep knowledge</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
                      <span>24/7 support during your trip</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
                      <span>Best price guarantee</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
                      <span>Flexible cancellation policy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-white/90 mb-8">
            Book your {tour.title} today and experience the best of China with our expert guides.
          </p>
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-white text-red-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book This Tour
          </button>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          serviceType="tour"
          serviceName={tour.title}
        />
      )}
    </div>
  );
}
