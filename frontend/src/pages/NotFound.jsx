// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    // We set the min-height to account for the navbar
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center px-6 bg-ink text-white overflow-hidden">
      {/* --- Animated Background Shape --- */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-plum/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-lavender/10 to-plum/10 rounded-full blur-3xl"
      />
      
      <div className="relative z-10">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
          className="text-7xl md:text-9xl font-extrabold text-primary mb-4"
        >
          404
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-3"
        >
          Page Not Found
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lavender/70 mb-8 max-w-md"
        >
          Looks like this page dressed up and left the party. Let’s get you back to the fashion floor.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/80 transition-colors"
          >
            <Home size={18}/>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;