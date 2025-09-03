// src/pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = [
    { id: 1, title: "Luxury Suit", price: 1500, image: "https://picsum.photos/200/150?suit" },
    { id: 2, title: "Elegant Dress", price: 1200, image: "https://picsum.photos/200/150?dress" },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-6 border-b pb-4">
              <img src={item.image} alt={item.title} className="w-28 h-20 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <button className="text-red-500 hover:underline">Remove</button>
            </div>
          ))}

          {/* Total + Checkout */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-xl font-bold">Total: ₹{total}</p>
            <Link
              to="/checkout"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-ink transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
