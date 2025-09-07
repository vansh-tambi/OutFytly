// src/components/layouts/StaticPageLayout.jsx
import React from 'react';
import { motion } from 'framer-motion';

const StaticPageLayout = ({ title, subtitle, children }) => {
  return (
    <div className="bg-ink min-h-screen">
      {/* --- Hero Section --- */}
      <div className="text-center py-24 px-6 bg-gradient-to-b from-plum to-ink">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-lavender/80 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-4xl mx-auto px-6 pb-20 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="bg-plum/30 p-8 sm:p-10 rounded-2xl border border-lavender/20 text-lavender/80 leading-relaxed space-y-4"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default StaticPageLayout;