// src/pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const cartItems = [
    { id: 1, title: "Luxury Suit", price: 1500, image: "https://picsum.photos/200/150?suit" },
    { id: 2, title: "Elegant Dress", price: 1200, image: "https://picsum.photos/200/150?dress" },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-6 bg-white p-4 rounded-xl shadow"
            >
              <img src={item.image} alt={item.title} className="w-28 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <button className="text-red-500 hover:underline">Remove</button>
            </motion.div>
          ))}

          <div className="flex justify-between items-center bg-ink text-white p-6 rounded-xl shadow-lg">
            <p className="text-2xl font-bold">Total: ₹{total}</p>
            <Link
              to="/checkout"
              className="bg-primary px-8 py-3 rounded-lg font-medium hover:bg-lavender hover:text-plum transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
