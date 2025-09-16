import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizontalCarousel = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Checks if scrolling is possible in either direction
  const checkForScrollPosition = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const isScrollable = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  // Scrolls the container left or right
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Effect to add and remove scroll/resize listeners
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
      {/* Scroll Buttons: Hidden on mobile, visible on desktop */}
      <motion.button
        onClick={() => scroll('left')}
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollLeft ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-plum/50 backdrop-blur-sm border border-lavender/20 text-white items-center justify-center disabled:opacity-0 disabled:cursor-default hidden md:flex"
        disabled={!canScrollLeft}
        aria-label="Scroll Left"
      >
        <ChevronLeft />
      </motion.button>

      {/* ✅ THE FIX: This container is now responsive.
        - Default: A grid that stacks items
        - md: (desktop): A flex container that scrolls horizontally
      */}
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-6 md:overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {children}
      </div>

      <motion.button
        onClick={() => scroll('right')}
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollRight ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-plum/50 backdrop-blur-sm border border-lavender/20 text-white items-center justify-center disabled:opacity-0 disabled:cursor-default hidden md:flex"
        disabled={!canScrollRight}
        aria-label="Scroll Right"
      >
        <ChevronRight />
      </motion.button>
    </div>
  );
};

export default HorizontalCarousel;