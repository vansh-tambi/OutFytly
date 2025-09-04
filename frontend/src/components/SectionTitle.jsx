// src/components/common/SectionTitle.jsx
import React from "react";
import { motion } from "framer-motion";

const SectionTitle = ({ title, subtitle, align = "center", dark = false }) => {
  return (
    <div className={`mb-10 text-${align}`}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`text-3xl font-bold ${
          dark ? "text-ink" : "text-white"
        } mb-3`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className={`max-w-2xl mx-auto text-base ${
            dark ? "text-gray-600" : "text-gray-300"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
