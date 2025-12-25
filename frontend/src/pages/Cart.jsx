import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, loading, removeItem, updateQuantity } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex justify-center items-center">
        <motion.div 
          className="w-12 h-12 rounded-full border-4 border-t-primary border-lavender/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  const items = cart?.items || [];
  const validItems = items.filter(item => item.product); // Filter out deleted products
  const subtotal = validItems.reduce((sum, item) => sum + (item.product?.rentalPrice || 0) * item.quantity, 0);
  const shipping = validItems.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-ink min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white mb-10"
        >
          🛒 Your Shopping Cart
        </motion.h1>

        {validItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-plum/30 rounded-lg"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              📦
            </motion.div>
            <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
            <p className="text-lavender/70 mt-2">Looks like you haven't added anything yet!</p>
            <Link to="/browse">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-primary px-6 py-2 rounded-lg font-semibold"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {validItems.map((item) => {
                  const imageUrl = item.product.images && item.product.images.length > 0
                    ? item.product.images[0]
                    : 'https://via.placeholder.com/150';

                  return (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-4 bg-plum/50 p-4 rounded-xl border border-lavender/20 hover:border-lavender/40 transition-colors"
                    >
                      <motion.img 
                        src={imageUrl}
                        alt={item.product.title} 
                        className="w-24 h-24 object-cover rounded-lg" 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div className="flex-grow">
                        <motion.h3 
                          className="font-semibold text-white"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {item.product.title}
                        </motion.h3>
                        <motion.p 
                          className="text-sm text-lavender/70"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          Size: {item.size}
                        </motion.p>
                        <motion.p 
                          className="text-primary font-semibold mt-1"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          ₹{item.product.rentalPrice.toLocaleString()}
                        </motion.p>
                      </div>
                      <div className="flex flex-col items-end justify-between h-24">
                        <div className="flex items-center gap-2 bg-ink px-2 py-1 rounded-md">
                          <motion.button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                            className="text-lavender"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus size={16}/>
                          </motion.button>
                          <motion.span 
                            className="font-bold text-white w-4 text-center"
                            key={item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                            className="text-lavender"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus size={16}/>
                          </motion.button>
                        </div>
                        <motion.button 
                          onClick={() => removeItem(item._id)} 
                          className="text-red-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 size={14} /> Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            <div className="lg:col-span-1 sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-plum/50 p-6 rounded-xl border border-lavender/20"
                >
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Order Summary
                  </motion.h2>
                  <div className="space-y-3 text-lavender/80">
                    <motion.div 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <span>Subtotal</span> 
                      <span className="text-white">₹{subtotal.toLocaleString()}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span>Shipping</span> 
                      <span className="text-white">₹{shipping.toLocaleString()}</span>
                    </motion.div>
                    <motion.div 
                      className="border-t border-lavender/20 my-2"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.45 }}
                    />
                    <motion.div 
                      className="flex justify-between text-xl font-bold text-white"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span>Total</span> 
                      <span>₹{total.toLocaleString()}</span>
                    </motion.div>
                  </div>
                  <Link to="/checkout">
                    <motion.button 
                      whileHover={{ scale: 1.03 }} 
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-6 bg-primary px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:bg-primary/90"
                    >
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