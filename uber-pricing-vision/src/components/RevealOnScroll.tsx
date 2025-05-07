
import { useEffect, useRef, ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

export function RevealOnScroll({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.classList.add('active');
            }
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
