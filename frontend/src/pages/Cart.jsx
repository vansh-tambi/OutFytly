import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleRemove = (id, size) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
  };

  const handleQuantityChange = (id, size, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="bg-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white mb-10"
        >
          🛒 Your Shopping Cart
        </motion.h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-plum/30 rounded-lg">
            <h2 className="text-2xl font-semibold text-white">Your cart is empty.</h2>
            <p className="text-lavender/70 mt-2">Looks like you haven't added anything yet!</p>
            <Link to="/browse">
              <motion.button whileHover={{ scale: 1.05 }} className="mt-6 bg-primary px-6 py-2 rounded-lg font-semibold text-white">
                Start Shopping
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* --- Cart Items --- */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                    className="flex items-start gap-4 bg-plum/50 p-4 rounded-xl border border-lavender/20"
                  >
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-lavender/70">Size: {item.size}</p>
                      <p className="text-primary font-semibold mt-1">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full">
                       <div className="flex items-center gap-2 bg-ink px-2 py-1 rounded-md">
                         <button onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)} className="text-lavender"><Minus size={16}/></button>
                         <span className="font-bold text-white w-4 text-center">{item.quantity}</span>
                         <button onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)} className="text-lavender"><Plus size={16}/></button>
                       </div>
                       <button onClick={() => handleRemove(item.id, item.size)} className="text-red-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm">
                         <Trash2 size={14} /> Remove
                       </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- Order Summary --- */}
            <div className="lg:col-span-1 sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-plum/50 p-6 rounded-xl border border-lavender/20"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-3 text-lavender/80">
                  <div className="flex justify-between"><span>Subtotal</span> <span className="text-white">₹{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Shipping</span> <span className="text-white">₹{shipping.toLocaleString()}</span></div>
                  <div className="border-t border-lavender/20 my-2"></div>
                  <div className="flex justify-between text-xl font-bold text-white"><span>Total</span> <span>₹{total.toLocaleString()}</span></div>
                </div>
                <Link to="/checkout">
                  <motion.button whileHover={{ scale: 1.03 }} className="w-full mt-6 bg-primary px-6 py-3 rounded-lg font-semibold text-white">
                    Proceed to Checkout
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;