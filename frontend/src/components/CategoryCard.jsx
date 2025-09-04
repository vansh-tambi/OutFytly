import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ title, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
        <h3 className="text-white text-lg font-semibold px-5 pb-4">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
