import { useEffect } from "react";

// 自定义钩子用于加载第三方客服脚本
export default function ConsultationButton() {
  useEffect(() => {
    // 确保脚本只加载一次
    if (document.getElementById('meiqia-script')) return;
    
    // 加载美洽客服脚本
    const script = document.createElement('script');
    script.id = 'meiqia-script';
    script.async = true;
    script.src = '//static.meiqia.com/dist/meiqia.js?_=t';
    script.onload = () => {
      // @ts-expect-error - 美洽全局对象
      if (window._MEIQIA) {
        // @ts-expect-error - 美洽全局对象未在TypeScript类型定义中
        window._MEIQIA('entId', '375655'); // 演示ID，用户需要替换为自己的企业ID
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      script.remove();
    };
  }, []);

  // 这个组件不需要渲染任何内容，因为客服按钮由美洽脚本自动生成
  return null;
}