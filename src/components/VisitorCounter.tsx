import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 记录访问
    fetch('/api/visitor')
      .then(res => res.json())
      .then(data => {
        if (data.count) {
          setVisitorCount(data.count);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch visitor count:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-eye text-red-500 text-xl"></i>
          <div>
            <div className="text-xs text-gray-500">访客统计</div>
            <div className="text-sm text-gray-400">加载中...</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <i className="fa-solid fa-eye text-red-500 text-2xl"></i>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
          />
        </div>
        <div>
          <div className="text-xs text-gray-500">网站访问量</div>
          <div className="text-2xl font-bold text-gray-800">
            {visitorCount.toLocaleString('en-US')}
            <span className="text-sm text-gray-500 font-normal ml-1">次</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
