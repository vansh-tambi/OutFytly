// src/components/sections/Newsletter.jsx
import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-14 bg-plum text-white text-center">
      <div className="max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-3"
        >
          Stay Updated!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-200 mb-5"
        >
          Subscribe to our newsletter for the latest collections & offers.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input type="email" placeholder="Enter your email" className="px-4 py-3 rounded-xl w-full sm:w-auto flex-grow text-ink focus:outline-none"/>
          <button className="px-6 py-3 bg-primary rounded-xl hover:bg-lavender transition">
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};
export default Newsletter;