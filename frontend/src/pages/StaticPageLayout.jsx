import React from "react";
import { motion } from "framer-motion";

const StaticPageLayout = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-plum mb-6 text-center">
        {title}
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6 text-gray-700 leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};

export default StaticPageLayout;
