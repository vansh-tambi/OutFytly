// src/pages/Checkout.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const cartItems = [
    { id: 1, title: "Luxury Suit", price: 1500 },
    { id: 2, title: "Elegant Dress", price: 1200 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <h1 className="text-4xl font-bold mb-10 text-lavender">Checkout 🛍️</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Left: Shipping + Payment */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 bg-lavender rounded-2xl shadow-lg p-8 space-y-8"
        >
          {/* Shipping Details */}
<div>
  <h2 className="text-2xl font-semibold mb-6 text-ink">
    Shipping Details
  </h2>
  <form className="grid gap-4">
    <input
      type="text"
      placeholder="Full Name"
      className="p-3 rounded-lg border border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none"
    />
    <input
      type="email"
      placeholder="Email Address"
      className="p-3 rounded-lg border border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none"
    />
    <input
      type="text"
      placeholder="Phone Number"
      className="p-3 rounded-lg border border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none"
    />
    <textarea
      placeholder="Shipping Address"
      rows="4"
      className="p-3 rounded-lg border border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none"
    ></textarea>
  </form>
</div>

{/* Payment Method */}
<div>
  <h2 className="text-2xl font-semibold mb-6 text-ink">
    Payment Method
  </h2>
  <div className="space-y-4">
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="payment"
        value="card"
        checked={paymentMethod === "card"}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="form-radio w-5 h-5 accent-primary"
      />
      <span className="text-ink text-lg font-medium">💳 Credit / Debit Card</span>
    </label>

    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="payment"
        value="upi"
        checked={paymentMethod === "upi"}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="form-radio w-5 h-5 accent-primary"
      />
      <span className="text-ink text-lg font-medium">📱 UPI</span>
    </label>

    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="payment"
        value="cod"
        checked={paymentMethod === "cod"}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="form-radio w-5 h-5 accent-primary"
      />
      <span className="text-ink text-lg font-medium">🚚 Cash on Delivery</span>
    </label>
  </div>

  {/* Conditional Payment Inputs */}
  {paymentMethod === "card" && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 grid gap-4"
    >
      <input
        type="text"
        placeholder="Card Number"
        className="p-3 rounded-lg border border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          className="p-3 rounded-lg border border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none"
        />
        <input
          type="text"
          placeholder="CVV"
          className="p-3 rounded-lg border border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none"
        />
      </div>
    </motion.div>
  )}

  {paymentMethod === "upi" && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6"
    >
      <input
        type="text"
        placeholder="Enter UPI ID"
        className="p-3 rounded-lg border border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none w-full"
      />
    </motion.div>
  )}
</div>

        </motion.div>

        {/* Right: Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-ink text-white rounded-2xl shadow-lg p-8 h-fit"
        >
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between border-b border-white/20 pb-2"
              >
                <span>{item.title}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="mt-8 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-lavender hover:text-plum transition">
            ✅ Place Order
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Checkout;
