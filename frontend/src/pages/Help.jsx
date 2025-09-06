import React from "react";
import { motion } from "framer-motion";

const Help = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-16"
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Help & Support 🙋</h1>
      <p className="text-center mb-10 max-w-3xl mx-auto">
        Need assistance? We’re here for you. Explore FAQs or reach out directly.
      </p>

      <div className="bg-lavender p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-xl font-semibold text-ink">Contact Support</h2>
        <p className="text-gray-700">📧 Email us at: support@rentstylerepeat.com</p>
        <p className="text-gray-700">📞 Call us: +91-98765-43210</p>
        <p className="text-gray-700">💬 Live chat available on weekdays 9AM - 8PM.</p>
      </div>
    </motion.div>
  );
};

export default Help;
