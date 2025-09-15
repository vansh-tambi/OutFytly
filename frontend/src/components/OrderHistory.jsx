import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMyOrders } from '../api/orderService';
import toast from 'react-hot-toast';

// Helper function to format the date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper to get a color for the status badge
const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-500/20 text-green-400';
    case 'Shipped':
      return 'bg-blue-500/20 text-blue-400';
    case 'Processing':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Cancelled':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchMyOrders();
        setOrders(data);
      } catch (error) {
        toast.error('Could not fetch your order history.');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="w-10 h-10 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold text-white mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-ink rounded-lg border border-lavender/20">
          <h2 className="text-2xl font-semibold text-white">You haven't placed any orders yet.</h2>
          <Link to="/browse">
            <motion.button whileHover={{ scale: 1.05 }} className="mt-6 bg-primary px-6 py-2 rounded-lg font-semibold text-white">
              Start Shopping
            </motion.button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4 pb-4 border-b border-lavender/20">
                <div>
                  <p className="text-sm text-lavender/70">Order ID</p>
                  <p className="font-mono text-white">...{order._id.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-sm text-lavender/70">Date Placed</p>
                  <p className="text-white">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-lavender/70">Total Amount</p>
                  <p className="font-bold text-primary text-lg">₹{order.totalPrice.toLocaleString()}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {order.orderItems.map(item => (
                  item.product && ( // Safely check if product exists
                    <div key={item._id} className="flex items-center gap-4">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.title} 
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-grow">
                        <p className="font-semibold text-white">{item.product.title}</p>
                        <p className="text-sm text-lavender/70">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrderHistory;