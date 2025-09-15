import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { createOrder } from '../api/orderService';
import { createPaymentOrder, verifyPayment } from '../api/paymentService';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Checkout = () => {
  // ✅ 1. Get 'clearCart' from the context, instead of 'dispatch'
  const { cart, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const rentNowItem = location.state?.rentNowItem;

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
    },
  });

  const itemsToCheckout = rentNowItem ? [rentNowItem] : (cart?.items || []);
  const subtotal = itemsToCheckout.reduce((sum, item) => sum + (item.product?.rentalPrice || 0) * item.quantity, 0);
  const shipping = itemsToCheckout.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (formData) => {
    const orderDetails = {
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      paymentMethod: formData.paymentMethod,
      orderItems: itemsToCheckout.map(i => ({
        product: i.product._id,
        size: i.size,
        quantity: i.quantity,
        price: i.product.rentalPrice,
        seller: i.product.user,
      })),
      totalPrice: total,
    };
    
    if (paymentMethod === 'UPI' || paymentMethod === 'Card') {
      await handleOnlinePayment(orderDetails);
    } else {
      await placeOrder(orderDetails);
    }
  };

  const placeOrder = async (orderDetails) => {
    try {
      await createOrder(orderDetails);
      toast.success("Order placed successfully!");
      if (!rentNowItem) {
        // ✅ 2. Call the 'clearCart' function from the context
        clearCart();
      }
      navigate('/account/orders');
    } catch (error) {
      toast.error(error.message || 'Failed to place order.');
    }
  };
  
  const handleOnlinePayment = async (orderDetails) => {
    try {
        const { data: razorpayOrder } = await createPaymentOrder(total);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: razorpayOrder.amount,
            currency: "INR",
            name: "OutFytly",
            description: "Rental Transaction",
            order_id: razorpayOrder.orderId,
            handler: async function (response) {
                const verificationData = {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                };
                const { data: verificationResult } = await verifyPayment(verificationData);
                if (verificationResult.success) {
                    await placeOrder({...orderDetails, paymentDetails: verificationData });
                } else {
                    toast.error("Payment verification failed. Please try again.");
                }
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: orderDetails.shippingAddress.phone,
            },
            theme: { color: "#8A2BE2" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        toast.error("Could not initiate payment.");
    }
  };
  
  useEffect(() => {
    if (!rentNowItem && itemsToCheckout.length === 0) {
      navigate('/cart');
    }
  }, [itemsToCheckout, rentNowItem, navigate]);

  return (
    <div className="bg-ink min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold mb-10">Checkout</motion.h1>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* --- LEFT: Shipping & Payment --- */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 bg-plum/30 p-8 rounded-xl border border-lavender/20 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Full Name</label>
                <input {...register("fullName", { required: "Full name is required" })} className="form-input mt-2" />
                {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="form-label">Email</label>
                <input {...register("email", { required: "Email is required" })} type="email" className="form-input mt-2" />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <input {...register("phone", { required: "Phone number is required" })} type="tel" className="form-input mt-2" />
              {errors.phone && <p className="form-error">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="form-label">Full Address</label>
              <textarea {...register("address", { required: "Address is required" })} rows="3" className="form-input mt-2"></textarea>
              {errors.address && <p className="form-error">{errors.address.message}</p>}
            </div>

            <h2 className="text-2xl font-semibold pt-6 border-t border-lavender/20">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-md bg-plum/50 has-[:checked]:bg-primary/30 border border-transparent has-[:checked]:border-primary transition">
                <input type="radio" {...register("paymentMethod", { required: "Please select a payment method" })} value="COD" className="h-4 w-4 bg-ink border-lavender/50 text-primary focus:ring-primary" />
                <span>Cash on Delivery (COD)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-md bg-plum/50 has-[:checked]:bg-primary/30 border border-transparent has-[:checked]:border-primary transition">
                <input type="radio" {...register("paymentMethod", { required: "Please select a payment method" })} value="UPI" className="h-4 w-4 bg-ink border-lavender/50 text-primary focus:ring-primary" />
                <span>UPI / Card (Online)</span>
              </label>
              {errors.paymentMethod && <p className="form-error">{errors.paymentMethod.message}</p>}
            </div>

            <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.03 }} className="w-full mt-6 bg-primary px-6 py-3 rounded-lg font-semibold text-white disabled:opacity-50">
              {isSubmitting ? 'Placing Order...' : `Place Order (₹${total.toLocaleString()})`}
            </motion.button>
          </form>

          {/* --- RIGHT: Order Summary --- */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {itemsToCheckout.map(item => (
                  <div key={item.product._id + item.size} className="flex gap-4">
                    <img src={item.product.images[0]} alt={item.product.title} className="w-16 h-16 rounded-md object-cover" />
                    <div className="flex-grow">
                      <p className="font-semibold text-white">{item.product.title}</p>
                      <p className="text-sm text-lavender/70">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-white">₹{(item.product.rentalPrice * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-lavender/20 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-lavender/80"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-lavender/80"><span>Shipping</span><span>₹{shipping.toLocaleString()}</span></div>
                <div className="border-t border-lavender/20 my-2"></div>
                <div className="flex justify-between text-xl font-bold text-white"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;