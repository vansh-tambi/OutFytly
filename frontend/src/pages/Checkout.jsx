// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  
  const paymentMethod = watch("paymentMethod", "card"); // Watch the paymentMethod radio button

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const onSubmit = async (data) => {
    // Simulate API call to place the order
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Order Submitted:", {
      shippingDetails: data,
      orderItems: cart,
      totalAmount: total,
    });
    // On success, redirect to an order confirmation page (or show a success modal)
    // For now, let's just log and maybe clear the cart
    navigate('/order-confirmation'); // You would create this new page
  };

  if (cart.length === 0) {
    return (
        <div className="text-center py-40 min-h-screen">
          <h2 className="text-3xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-lavender/70 mt-4">You can't proceed to checkout without any items.</p>
          <Link to="/browse" className="mt-8 inline-block bg-primary px-8 py-3 rounded-lg text-white font-semibold">
            Continue Shopping
          </Link>
        </div>
    );
  }

  return (
    <div className="bg-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-10">
            Checkout 🛍️
        </motion.h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8 items-start">
          {/* --- Left Column: Shipping & Payment --- */}
          <div className="lg:col-span-2 bg-plum/30 p-6 sm:p-8 rounded-xl border border-lavender/20 space-y-8">
            {/* Shipping Details */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <input {...register("fullName", { required: "Full name is required" })} placeholder="Full Name" className="form-input"/>
                  {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                </div>
                <div>
                  <input {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })} placeholder="Email Address" className="form-input"/>
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div>
                  <input {...register("phone", { required: "Phone number is required" })} type="tel" placeholder="Phone Number" className="form-input"/>
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <textarea {...register("address", { required: "Shipping address is required" })} placeholder="Shipping Address" rows="3" className="form-input"></textarea>
                  {errors.address && <p className="form-error">{errors.address.message}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Payment Method</h2>
              <div className="space-y-4">
                {['card', 'upi', 'cod'].map(method => (
                  <label key={method} className="flex items-center gap-3 p-4 rounded-lg bg-ink border border-lavender/30 has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors">
                    <input type="radio" {...register("paymentMethod")} value={method} defaultChecked={method === 'card'} className="w-5 h-5 accent-primary"/>
                    <span className="text-white font-medium capitalize">
                      {method === 'card' ? '💳 Credit / Debit Card' : method === 'upi' ? '📱 UPI' : '🚚 Cash on Delivery'}
                    </span>
                  </label>
                ))}
              </div>
              
              {/* Conditional Payment Inputs */}
              <AnimatePresence>
                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-4 overflow-hidden">
                    <input {...register("cardNumber")} placeholder="Card Number" className="form-input"/>
                    <div className="grid grid-cols-2 gap-4">
                      <input {...register("expiryDate")} placeholder="Expiry (MM/YY)" className="form-input"/>
                      <input {...register("cvv")} placeholder="CVV" className="form-input"/>
                    </div>
                  </motion.div>
                )}
                {paymentMethod === 'upi' && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 overflow-hidden">
                     <input {...register("upiId")} placeholder="Enter UPI ID" className="form-input"/>
                   </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* --- Right Column: Order Summary --- */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
              <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-lavender/80">
                    <span>{item.title} (x{item.quantity})</span>
                    <span className="text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-lavender/20 my-4"></div>
              <div className="space-y-2">
                <div className="flex justify-between text-lavender/80"><span>Subtotal</span> <span className="text-white">₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-lavender/80"><span>Shipping</span> <span className="text-white">₹{shipping}</span></div>
                <div className="border-t border-lavender/20 my-2"></div>
                <div className="flex justify-between text-xl font-bold text-white"><span>Total</span> <span>₹{total.toLocaleString()}</span></div>
              </div>
              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.03 }} className="w-full mt-6 bg-primary px-6 py-3 rounded-lg font-semibold text-white disabled:bg-primary/50">
                {isSubmitting ? 'Placing Order...' : '✅ Place Order'}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;