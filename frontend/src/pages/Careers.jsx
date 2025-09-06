import React from "react";
import { motion } from "framer-motion";

const Careers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-16"
    >
      <h1 className="text-4xl font-bold text-lavender mb-6 text-center">Careers 💼</h1>
      <p className="text-lavender text-center mb-10 max-w-3xl mx-auto">
        Join <span className="text-primary font-semibold">Rent. Style. Repeat. </span> 
        and be part of the sustainable fashion revolution.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Openings */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-lavender p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-ink mb-4">Open Positions</h2>
          <ul className="space-y-3 text-gray-700">
            <li>👩‍💻 Frontend Developer (React)</li>
            <li>🎨 UI/UX Designer</li>
            <li>📦 Logistics Manager</li>
            <li>📱 Marketing & Social Media Specialist</li>
          </ul>
        </motion.div>

        {/* Culture */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-lavender p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-ink mb-4">Why Work With Us?</h2>
          <ul className="space-y-3 text-gray-700">
            <li>🌱 Work for sustainability & impact</li>
            <li>🚀 Grow with a fast-paced startup</li>
            <li>🤝 Inclusive & collaborative culture</li>
            <li>🎉 Fun team activities & perks</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Careers;
