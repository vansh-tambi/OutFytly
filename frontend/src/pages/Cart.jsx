import React from "react";
import { Link } from "react-router-dom";

const mockCart = [
  { id: 1, title: "Luxury Suit", price: 1500, image: "https://picsum.photos/200/200?suit" },
  { id: 2, title: "Elegant Dress", price: 1200, image: "https://picsum.photos/200/200?dress" },
];

const Cart = () => {
  const total = mockCart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-ink">Your Cart</h2>

      {mockCart.length > 0 ? (
        <>
          <div className="grid gap-6 mt-8">
            {mockCart.map((item) => (
              <div key={item.id} className="flex items-center gap-6 bg-white p-4 rounded-xl shadow">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-primary font-bold">₹{item.price}</p>
                </div>
                <button className="text-red-500 hover:underline">Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ₹{total}</p>
            <button className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-ink transition">
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="mt-6 text-lg">Your cart is empty. <Link to="/browse" className="text-primary hover:underline">Browse items</Link></p>
      )}
    </div>
  );
};

export default Cart;
