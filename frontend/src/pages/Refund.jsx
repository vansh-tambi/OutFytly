import React from "react";
import { motion } from "framer-motion";

const Refund = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-16"
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Return & Refund Policy 🔄</h1>
      <p className="text-center mb-10 max-w-3xl mx-auto">
        Hassle-free returns to make your experience smooth.
      </p>

      <div className="bg-lavender p-8 rounded-2xl shadow-lg space-y-5">
        <h2 className="text-xl font-semibold text-ink">Returns</h2>
        <p className="text-gray-700">Items must be returned within 3 days of delivery in their original condition.</p>

        <h2 className="text-xl font-semibold text-ink">Refunds</h2>
        <p className="text-gray-700">Refunds are processed within 7 working days after inspection.</p>

        <h2 className="text-xl font-semibold text-ink">Exchanges</h2>
        <p className="text-gray-700">Exchanges allowed only if size or item mismatch occurs.</p>
      </div>
    </motion.div>
  );
};

export default Refund;
