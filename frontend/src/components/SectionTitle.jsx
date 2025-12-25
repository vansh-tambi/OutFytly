// src/components/common/SectionTitle.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  // Map align prop to full Tailwind classes to ensure they are always included in the build
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`mb-12 flex flex-col ${alignmentClasses[align]}`}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-white mb-3"
      >
        {title}
      </motion.h2>

      {/* --- Decorative Accent Line --- */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-20 h-1 bg-primary rounded-full"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className={`max-w-2xl text-base lg:text-lg text-lavender/70 mt-4`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;