// src/components/sections/AppDownload.jsx
import React from "react";
import { motion } from "framer-motion";

const AppDownload = () => {
  return (
    <section className="py-14 bg-primary text-white text-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          📱 Shop Smarter with the OutFytly App
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-lavender mb-6 max-w-2xl mx-auto"
        >
          Get exclusive deals, faster checkout, and outfit recommendations tailored just for you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-5"
        >
          <a href="#" className="bg-black px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 transition">
            <img src="/google-play.png" alt="Google Play" className="h-6" />
            <span className="text-white font-medium">Google Play</span>
          </a>
          <a href="#" className="bg-black px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 transition">
            <img src="/app-store.png" alt="App Store" className="h-6" />
            <span className="text-white font-medium">App Store</span>
          </a>
        </motion.div>
      </div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-lavender opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-plum opacity-20 rounded-full blur-3xl"></div>
    </section>
  );
};
export default AppDownload;