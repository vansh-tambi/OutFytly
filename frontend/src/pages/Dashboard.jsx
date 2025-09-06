import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-ink via-ink/95 to-plum/90 min-h-screen">
      {/* Title */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center text-lavender"
      >
        Seller Dashboard
      </motion.h1>

      {/* Upload New Item */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-br from-plum/40 to-primary/40 p-8 rounded-2xl shadow-xl border border-lavender/30 mb-12"
      >
        <h2 className="text-2xl font-semibold mb-6 text-lavender">
          📤 Upload New Item
        </h2>
        <form className="grid gap-5">
          <input
            type="text"
            placeholder="Title"
            className="p-3 bg-ink/40 text-white border border-lavender/40 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none placeholder:text-lavender/60"
          />
          <textarea
            placeholder="Description"
            rows="4"
            className="p-3 bg-ink/40 text-white border border-lavender/40 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none placeholder:text-lavender/60"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            className="p-3 bg-ink/40 text-white border border-lavender/40 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none placeholder:text-lavender/60"
          />
          <input
            type="file"
            className="p-3 bg-ink/40 text-white border border-lavender/40 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none file:cursor-pointer"
          />
          <button className="bg-gradient-to-r from-primary to-plum text-white px-6 py-3 rounded-lg font-medium hover:scale-105 hover:shadow-lg transition">
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
        className="bg-gradient-to-tr from-ink/70 to-ink/50 p-8 rounded-2xl shadow-xl border border-lavender/30"
      >
        <h2 className="text-2xl font-semibold mb-6 text-lavender">
          📦 My Listings
        </h2>
        <ul className="space-y-5">
          {[
            { id: 1, name: "Luxury Suit", price: 1500 },
            { id: 2, name: "Classic Watch", price: 800 },
          ].map((item, i) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
              className="flex justify-between items-center bg-gradient-to-r from-plum/30 to-primary/20 p-4 rounded-xl border border-lavender/30"
            >
              <span className="font-medium text-white">
                {item.name} - ₹{item.price}
              </span>
              <div className="flex gap-3 text-sm">
                <button className="px-4 py-1.5 rounded-lg bg-primary/30 text-white hover:bg-primary/50 transition">
                  Edit
                </button>
                <button className="px-4 py-1.5 rounded-lg bg-plum/30 text-white hover:bg-plum/50 transition">
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Dashboard;
