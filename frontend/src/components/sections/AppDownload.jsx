// src/components/sections/AppDownload.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa"; // Using react-icons for scalability

// A reusable button component for the stores
const StoreButton = ({ href, icon: Icon, storeName }) => (
  <a href={href} className="bg-black/80 backdrop-blur-sm px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 hover:bg-black transition-all transform">
    <Icon size={24} className="text-white" />
    <div>
      <p className="text-xs text-gray-300 leading-none">GET IT ON</p>
      <p className="text-white font-semibold text-lg leading-tight">{storeName}</p>
    </div>
  </a>
);

const AppDownload = () => {
  return (
    <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
      {/* --- Animated Decorative Blobs --- */}
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-16 -right-16 w-64 h-64 bg-lavender/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -top-16 -left-16 w-64 h-64 bg-plum/20 rounded-full blur-3xl"
      />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2
          variants={{
            initial: { opacity: 0, y: -30 },
            whileInView: { opacity: 1, y: 0 }
          }}
          initial="initial"
          whileInView="whileInView"
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          📱 Shop Smarter with the <span className="gradient-text">OutFytly App</span>
        </motion.h2>
        <motion.p
          variants={{
            initial: { opacity: 0 },
            whileInView: { opacity: 1 }
          }}
          initial="initial"
          whileInView="whileInView"
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-lg text-lavender mb-8 max-w-2xl mx-auto"
        >
          Get exclusive deals, faster checkout, and outfit recommendations tailored just for you.
        </motion.p>
        <motion.div
          variants={{
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 }
          }}
          initial="initial"
          whileInView="whileInView"
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          // This ensures buttons stack on small screens and go side-by-side on larger ones
          className="flex flex-col sm:flex-row justify-center items-center gap-5"
        >
          <StoreButton href="#" icon={FaGooglePlay} storeName="Google Play" />
          <StoreButton href="#" icon={FaApple} storeName="App Store" />
        </motion.div>
      </div>
    </section>
  );
};

export default AppDownload;