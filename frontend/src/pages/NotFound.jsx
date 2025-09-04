// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center h-[85vh] text-center px-6"
    >
      <motion.h1
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-7xl font-extrabold text-primary mb-4"
      >
        404
      </motion.h1>
      <h2 className="text-2xl font-semibold text-ink mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        Looks like this page dressed up and left the party. Let’s get you back
        to the fashion floor.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-lavender hover:text-plum transition"
      >
        Back to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
