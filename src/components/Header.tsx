import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for header with null safety
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Navigation links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/exhibitions", label: "Exhibitions" },
    { path: "/tours", label: "China Tours" },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-md py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
            {/* Logo */}
             <Link to="/" className="flex items-center">
               {/* 全新中国风logo设计 */}
               <div className="relative mr-3 group">
                 {/* 主体红色印章元素 */}
                 <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-yellow-500/30 relative overflow-hidden">
                   {/* 科技感圆环背景 */}
                   <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-500/50 animate-spin-slow"></div>
                   {/* 中心TGC文字 */}
                   <span className="font-bold text-xl tracking-wider relative z-10">TGC</span>
                   {/* 装饰性科技线条 */}
                   <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-yellow-500 opacity-80"></div>
                   <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-yellow-500 opacity-80"></div>
                 </div>
                 {/* 悬浮效果：金色光芒 */}
                 <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 opacity-0 blur-sm group-hover:opacity-70 transition duration-300"></div>
               </div>
               {/* 品牌名称 - 现代与传统融合的字体设计 */}
               <span className={cn("font-bold text-2xl", isScrolled ? "text-gray-900" : "text-gray-900")}>
                 <span className="text-red-600">Tech</span><span className="text-gray-800">Guide</span>
                 <span className="text-sm font-medium ml-1 bg-red-100 text-red-800 px-2 py-0.5 rounded-md">in China</span>
               </span>
             </Link>

           {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors duration-200 hover:text-red-600",
                  isScrolled ? "text-gray-700" : "text-gray-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn("text-2xl", isScrolled ? "text-gray-900" : "text-gray-900")}
            >
              <i className={`fa-solid ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-4 py-5 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-gray-700 hover:text-red-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            

          </div>
        </motion.div>
      )}
    </header>
  );
}