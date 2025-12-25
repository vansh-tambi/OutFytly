import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect scroll direction and trigger animations
 * Returns { direction, isScrolling } where direction is 'up' or 'down'
 */
export const useScrollDirection = () => {
  const [direction, setDirection] = useState('down');
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current) {
        setDirection('down');
      } else if (currentScrollY < lastScrollYRef.current) {
        setDirection('up');
      }

      lastScrollYRef.current = currentScrollY;
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set scrolling to false after user stops scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return { direction, isScrolling };
};
