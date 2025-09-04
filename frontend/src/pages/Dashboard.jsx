// src/pages/Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-plum/5 via-primary/5 to-ink/5 min-h-screen">
      {/* Title */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-ink"
      >
        Seller Dashboard
      </motion.h1>

      {/* Upload New Item */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/95 p-6 rounded-xl shadow-lg border border-lavender/20 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4 text-plum">Upload New Item</h2>
        <form className="grid gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
          />
          <textarea
            placeholder="Description"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
            rows="4"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
          />
          <input
            type="file"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
          />
          <button className="bg-gradient-to-r from-primary to-ink text-white px-6 py-3 rounded-lg hover:scale-105 transition">
            Upload Item
          </button>
        </form>
      </motion.div>

      {/* Manage Listings */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/95 p-6 rounded-xl shadow-lg border border-lavender/20"
      >
        <h2 className="text-xl font-semibold mb-4 text-plum">My Listings</h2>
        <ul className="space-y-4">
          <motion.li
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex justify-between items-center border-b pb-3"
          >
            <span className="font-medium">Luxury Suit - ₹1500</span>
            <div className="flex gap-3 text-sm">
              <button className="px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                Edit
              </button>
              <button className="px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition">
                Delete
              </button>
            </div>
          </motion.li>

          <motion.li
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex justify-between items-center border-b pb-3"
          >
            <span className="font-medium">Classic Watch - ₹800</span>
            <div className="flex gap-3 text-sm">
              <button className="px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                Edit
              </button>
              <button className="px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition">
                Delete
              </button>
            </div>
          </motion.li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Dashboard;
