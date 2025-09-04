import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-ink to-primary text-white py-20 px-6 text-center rounded-2xl my-16"
    >
      <h2 className="text-4xl font-bold mb-4">Upgrade Your Style Today</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200">
        Discover handpicked outfits that fit your vibe. Join OutFytly now and
        redefine your wardrobe with premium rentals.
      </p>
      <Link
        to="/browse"
        className="bg-lavender text-plum px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary transition"
      >
        Start Browsing
      </Link>
    </motion.section>
  );
};

export default CTA;
