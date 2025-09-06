import React from "react";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-16"
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Terms & Conditions 📜</h1>
      <p className="text-center mb-10 max-w-3xl mx-auto">
        By using <span className="text-primary font-semibold">Rent. Style. Repeat.</span>, 
        you agree to follow our guidelines. Please read carefully before proceeding.
      </p>

      <div className="bg-lavender p-8 rounded-2xl shadow-lg space-y-5">
        <h2 className="text-xl font-semibold text-ink">Usage</h2>
        <p className="text-gray-700">All rentals are subject to availability. Items must be returned in good condition.</p>

        <h2 className="text-xl font-semibold text-ink">Liability</h2>
        <p className="text-gray-700">Users are responsible for damages, delays, or misuse of rented items.</p>

        <h2 className="text-xl font-semibold text-ink">Updates</h2>
        <p className="text-gray-700">We may update these terms anytime. Stay informed by checking this page regularly.</p>
      </div>
    </motion.div>
  );
};

export default Terms;
