import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop 组件
 * 在路由变化时自动滚动到页面顶部
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 使用 requestAnimationFrame 确保在 DOM 更新后执行
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // 平滑滚动
      });
    });
  }, [pathname]);

  return null; // 这个组件不渲染任何内容
}
