// src/pages/ItemDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const ItemDetails = () => {
  const { id } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src={`https://picsum.photos/600/500?random=${id}`}
          alt="Item"
          className="rounded-2xl shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">Luxury Outfit #{id}</h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            A premium designer outfit crafted with elegance. Perfect for
            weddings, parties, and celebrations. Durable fabric with a stylish
            modern cut.
          </p>
          <p className="text-3xl font-semibold text-primary mb-4">₹1500</p>
          <p className="mb-6 text-gray-600">📍 Location: Delhi</p>
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-ink transition"
            >
              Rent Now
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-lavender text-plum px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemDetails;
