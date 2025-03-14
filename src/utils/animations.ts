
import { useEffect, useState } from 'react';

// Animation variants for framer-motion-like effects with CSS
export const fadeIn = {
  initial: 'opacity-0',
  animate: 'opacity-100 transition-opacity duration-500',
  exit: 'opacity-0 transition-opacity duration-300'
};

export const slideUp = {
  initial: 'opacity-0 translate-y-8',
  animate: 'opacity-100 translate-y-0 transition-all duration-500',
  exit: 'opacity-0 translate-y-4 transition-all duration-300'
};

export const slideDown = {
  initial: 'opacity-0 -translate-y-8',
  animate: 'opacity-100 translate-y-0 transition-all duration-500',
  exit: 'opacity-0 -translate-y-4 transition-all duration-300'
};

export const scaleIn = {
  initial: 'opacity-0 scale-95',
  animate: 'opacity-100 scale-100 transition-all duration-500',
  exit: 'opacity-0 scale-95 transition-all duration-300'
};

// Hook for revealing elements on scroll
export function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return [setRef, isVisible];
}

// Hook for staggered animations
export function useStaggered(count: number, staggerDelay: number = 100) {
  const [items, setItems] = useState<boolean[]>([]);

  useEffect(() => {
    const newItems: boolean[] = Array(count).fill(false);
    
    const timeouts = newItems.map((_, index) => {
      return setTimeout(() => {
        setItems(prevItems => {
          const newItems = [...prevItems];
          newItems[index] = true;
          return newItems;
        });
      }, index * staggerDelay);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [count, staggerDelay]);

  return items;
}

// Use this to apply animations to elements based on scroll position
export function useParallax(speed: number = 0.1) {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return {
    y: offset * speed,
    style: { transform: `translateY(${offset * speed}px)` }
  };
}
