import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ItemCard = ({ id, title, price, location, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-ink text-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl"
    >
      {/* Image */}
      <Link to={`/item/${id}`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={image}
          alt={title}
          className="w-full h-56 object-cover transition-transform"
        />
      </Link>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-gray-300 text-sm mb-2">{location}</p>
        <p className="text-primary font-bold">₹{price} / day</p>

        <Link
          to={`/item/${id}`}
          className="inline-block mt-4 w-full bg-primary text-white text-center py-2 rounded-xl font-semibold hover:bg-lavender hover:text-plum transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ItemCard;
