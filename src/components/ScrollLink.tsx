import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

interface ScrollLinkProps extends LinkProps {
  to: string;
  children: React.ReactNode;
}

/**
 * ScrollLink 组件
 * 点击后自动滚动到页面顶部的 Link 组件
 */
export default function ScrollLink({ to, children, ...props }: ScrollLinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // 如果是外部链接，不处理
    if (to.startsWith('http')) {
      return;
    }

    e.preventDefault();

    // 导航到目标页面
    navigate(to);

    // 滚动到页面顶部
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 平滑滚动
    });
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
