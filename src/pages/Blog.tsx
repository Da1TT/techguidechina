import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Blog post data
interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  contentPath: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "shanghai-exhibition-guide",
    title: "2026 上海展会参展指南：美国、欧洲参展商必备攻略",
    description: "全面的上海展会参展指南，涵盖签证、住宿、交通、商务礼仪和其他方面，帮助国际参展商成功参展。",
    date: "2026年2月16日",
    readTime: "8分钟阅读",
    image: "https://images.unsplash.com/photo-1504419653502-9846d43b401a?w=800",
    category: "参展指南",
    contentPath: "/blog/2026-02-16-shanghai-exhibition-guide.md"
  },
  {
    id: "canton-fair-tips",
    title: "参加广州广交会的5个实用技巧",
    description: "掌握广交会的精髓，从提前注册、制定计划到谈判技巧和会后跟进，最大化您的参展效果。",
    date: "2026年2月16日",
    readTime: "5分钟阅读",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    category: "展会技巧",
    contentPath: "/blog/2026-02-16-canton-fair-tips.md"
  },
  {
    id: "faq",
    title: "常见问题 FAQ - 展会服务",
    description: "关于签证、服务内容、价格、住宿、语言和预订的20个常见问题解答，帮助您快速了解我们的服务。",
    date: "2026年2月16日",
    readTime: "10分钟阅读",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    category: "服务说明",
    contentPath: "/blog/FAQ.md"
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  
  const categories = ["全部", "参展指南", "展会技巧", "服务说明"];
  
  const filteredPosts = selectedCategory === "全部" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            展会指南与资讯
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            带给美国和欧洲参展商的实用指南、技巧和资讯，帮助您在中国展会上取得成功。
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 py-6 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map(post => (
              <motion.div
                key={post.id}
                variants={fadeIn}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  <a
                    href={post.contentPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
                  >
                    阅读全文
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">该分类下暂无文章</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl font-bold mb-6"
          >
            需要专业的展会支持？
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            我们提供专业的翻译、接送、商务陪同等服务，帮助您在中国展会上取得成功。
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Link
              to="/contact"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              联系我们
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
