import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import Exhibitions from "./pages/Exhibitions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConsultationButton from "./components/ConsultationButton";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  // 初始化主题
  useTheme();
  
  // 添加第三方客服脚本
  useEffect(() => {
    // 移除现有脚本以避免重复加载
    const existingScript = document.getElementById('meiqia-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    // 嵌入美洽客服脚本
    const script = document.createElement('script');
    script.id = 'meiqia-script';
    script.async = true;
    script.src = '//static.meiqia.com/dist/meiqia.js?_=t';
    script.onload = () => {
      // @ts-expect-error - 美洽全局对象
      if (window._MEIQIA) {
        // @ts-expect-error - 美洽全局对象未在TypeScript类型定义中
        window._MEIQIA('entId', '375655'); // 这里使用的是演示ID，您需要替换为自己的美洽企业ID
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/exhibitions" element={<Exhibitions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* 添加404路由以处理未找到的路径 */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
