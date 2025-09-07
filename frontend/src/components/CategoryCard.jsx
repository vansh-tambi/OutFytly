// src/components/CategoryCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryCard = ({ title, image }) => {
  return (
    // The entire card is now a clickable link
    <Link to={`/browse?category=${title.toLowerCase()}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-48 sm:h-56"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-4">
          <motion.h3 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white text-lg font-semibold transition-transform duration-300 group-hover:translate-y-[-4px]"
          >
            {title}
          </motion.h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;