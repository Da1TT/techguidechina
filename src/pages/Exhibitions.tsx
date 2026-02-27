import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';
import { Exhibition, upcomingExhibitions, getUpcomingExhibitions } from '../data/exhibitions-upcoming';

export default function Exhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  useEffect(() => {
    // Load exhibitions
    const upcoming = getUpcomingExhibitions();
    setExhibitions(upcomingExhibitions);
    setFilteredExhibitions(upcomingExhibitions);
    setLoading(false);
  }, []);

  // Filter exhibitions
  useEffect(() => {
    let filtered = exhibitions;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ex) =>
          ex.title.toLowerCase().includes(query) ||
          ex.description.toLowerCase().includes(query) ||
          ex.location.toLowerCase().includes(query) ||
          ex.keyExhibitors.some((e) => e.toLowerCase().includes(query))
      );
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter((ex) => ex.location.includes(selectedLocation));
    }

    if (selectedIndustry !== 'All') {
      // This would require adding industry tags to exhibitions
      // For now, we'll filter by keywords in description
      filtered = filtered.filter((ex) =>
        ex.description.toLowerCase().includes(selectedIndustry.toLowerCase())
      );
    }

    setFilteredExhibitions(filtered);
  }, [searchQuery, selectedLocation, selectedIndustry, exhibitions]);

  const locations = ['All', 'Shanghai', 'Beijing', 'Shenzhen', 'Hangzhou'];
  const industries = ['All', 'AI', 'IoT', 'Consumer Electronics', 'Semiconductor', 'Robotics'];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO */}
      <SEO
        title="Upcoming IT & AI Exhibitions in China | 2025-2026 Calendar"
        description="Discover China's top IT and AI exhibitions including WAIC, CES Asia, and more. Find exhibition dates, locations, key exhibitors, and professional support services."
        keywords="China exhibitions 2025, WAIC 2025, CES Asia, AI conferences China, tech exhibitions Shanghai"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              2025-2026 Calendar
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
              Upcoming IT & AI Exhibitions in China
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Discover the most important technology exhibitions in China. From AI conferences to consumer electronics shows, find the perfect event for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search exhibitions, exhibitors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="All">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Industry Filter */}
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="All">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredExhibitions.length} of {exhibitions.length} exhibitions
          </div>
        </div>
      </section>

      {/* Exhibitions Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : filteredExhibitions.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-search text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No exhibitions found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredExhibitions.map((exhibition) => (
                <motion.div
                  key={exhibition.id}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <LazyImage
                      src={exhibition.image}
                      alt={exhibition.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                        {exhibition.status === 'upcoming' ? 'Upcoming' : 'Ongoing'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {exhibition.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {exhibition.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-calendar text-red-600"></i>
                        <span>{exhibition.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot text-red-600"></i>
                        <span>{exhibition.location}</span>
                      </div>
                    </div>

                    {/* Key Highlights Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exhibition.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/exhibitions/${exhibition.id}`}
                      className="block w-full bg-red-600 text-white text-center py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg text-white/90 mb-8">
            We regularly update our exhibition database. Contact us to get notified about upcoming events or request information about specific exhibitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-red-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <button
              onClick={() => toast.success('You will be notified about new exhibitions!')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Get Updates
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
