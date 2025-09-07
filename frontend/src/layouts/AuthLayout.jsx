// src/components/layouts/AuthLayout.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-plum to-ink p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-ink p-6 sm:p-8 rounded-2xl shadow-2xl shadow-plum/50 w-full max-w-md border border-lavender/20"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="text-lavender/70 mt-2">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;