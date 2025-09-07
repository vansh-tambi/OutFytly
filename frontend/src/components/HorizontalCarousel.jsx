import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizontalCarousel = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkForScrollPosition = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  const scroll = (direction) => {
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkForScrollPosition();
      scrollContainer.addEventListener('scroll', checkForScrollPosition);
      const resizeObserver = new ResizeObserver(checkForScrollPosition);
      resizeObserver.observe(scrollContainer);
      return () => {
        scrollContainer.removeEventListener('scroll', checkForScrollPosition);
        resizeObserver.unobserve(scrollContainer);
      };
    }
  }, [children]);

  return (
    <div className="relative">
      <motion.button
        onClick={() => scroll('left')}
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollLeft ? 1 : 0, x: canScrollLeft ? 0 : -10 }}
        whileHover={{ scale: 1.1, backgroundColor: 'var(--color-primary)' }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-plum/50 backdrop-blur-sm border border-lavender/20 text-white flex items-center justify-center disabled:opacity-0"
        style={{ '--color-primary': '#8A2BE1' }}
        disabled={!canScrollLeft}
      >
        <ChevronLeft />
      </motion.button>
      <div
        ref={scrollContainerRef}
        className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide"
      >
        {children}
      </div>
      <motion.button
        onClick={() => scroll('right')}
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollRight ? 1 : 0, x: canScrollRight ? 0 : 10 }}
        whileHover={{ scale: 1.1, backgroundColor: 'var(--color-primary)' }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-plum/50 backdrop-blur-sm border border-lavender/20 text-white flex items-center justify-center disabled:opacity-0"
        style={{ '--color-primary': '#8A2BE1' }}
        disabled={!canScrollRight}
      >
        <ChevronRight />
      </motion.button>
    </div>
  );
};

export default HorizontalCarousel;