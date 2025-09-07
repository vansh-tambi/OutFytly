// src/components/ItemCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react"; // A nice icon for location

// A simple utility to format the price with commas
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

const ItemCard = ({ id, title, price, location, image }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-ink text-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-primary/30"
    >
      <Link to={`/item/${id}`} className="block overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-52 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-semibold truncate text-lavender/90">{title}</h3>
        
        <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1 mb-3">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        
        <p className="text-primary font-bold text-xl">
          ₹{formatPrice(price)} <span className="text-sm font-normal text-gray-400">/ day</span>
        </p>

        <Link to={`/item/${id}`} className="block mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full bg-primary/90 text-white text-center py-2.5 rounded-lg font-semibold hover:bg-primary transition-colors"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ItemCard;