// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary via-plum to-ink text-white py-28 px-6 overflow-hidden">
      {/* Decorative Background Blobs */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-10 left-10 w-48 h-48 bg-lavender/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute bottom-10 right-10 w-56 h-56 bg-primary/30 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Rent. <span className="text-lavender">Style.</span> Repeat.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl mb-8 text-gray-200"
        >
          Find your next outfit or give your fashion a new life ✨  
          Rent premium looks. Earn by sharing your wardrobe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link
            to="/browse"
            className="bg-lavender text-plum px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Explore Outfits
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
