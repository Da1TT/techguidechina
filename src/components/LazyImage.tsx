import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  threshold?: number;
  fade?: boolean;
}

export default function LazyImage({ 
  threshold = 0.1, 
  fade = true,
  className = "",
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <motion.img
      ref={imgRef}
      src={isInView ? props.src : undefined}
      alt={props.alt}
      className={className}
      loading="lazy"
      initial={fade ? { opacity: 0 } : undefined}
      animate={fade && isLoaded ? { opacity: 1 } : undefined}
      transition={fade ? { duration: 0.3 } : undefined}
      onLoad={handleLoad}
      {...(fade ? { style: { ...props.style, minHeight: '200px' } } : {})}
      {...props}
    />
  );
}
