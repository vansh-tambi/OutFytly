import React from "react";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-16"
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy 🔒</h1>
      <p className="text-center mb-10 max-w-3xl mx-auto">
        Your privacy is important to us. Here’s how we handle your information.
      </p>

      <div className="bg-lavender p-8 rounded-2xl shadow-lg space-y-5">
        <h2 className="text-xl font-semibold text-ink">Data Collection</h2>
        <p className="text-gray-700">We collect your details only to provide services and ensure smooth deliveries.</p>

        <h2 className="text-xl font-semibold text-ink">Security</h2>
        <p className="text-gray-700">We use encryption and secure storage to protect your data.</p>

        <h2 className="text-xl font-semibold text-ink">Third Parties</h2>
        <p className="text-gray-700">Your data is never shared with third parties without your consent.</p>
      </div>
    </motion.div>
  );
};

export default Privacy;
