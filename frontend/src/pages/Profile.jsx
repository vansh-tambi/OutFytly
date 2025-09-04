// src/pages/Profile.jsx
import React from "react";
import { motion } from "framer-motion";

const rentals = [
  { id: 1, name: "Luxury Suit", date: "Jan 2025", type: "Rented" },
  { id: 2, name: "Classic Watch", date: "Dec 2024", type: "Purchased" },
];

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <h1 className="text-4xl font-extrabold text-primary mb-8">My Profile</h1>
      <div className="bg-ink text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">Vansh Tambi</h2>
        <p className="text-gray-300 mb-6">📧 vansh@example.com</p>
        <h3 className="font-semibold text-lg mb-3">My Rentals</h3>
        <div className="space-y-4">
          {rentals.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-plum/20 p-4 rounded-lg flex justify-between items-center"
            >
              <span>{item.name} - {item.type} on {item.date}</span>
              <button className="bg-primary px-4 py-2 rounded-lg text-sm hover:bg-lavender hover:text-plum transition">
                View
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
