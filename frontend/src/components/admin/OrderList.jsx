import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api/adminService';
import toast from 'react-hot-toast';

// Helper to get a color for the status badge
const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'bg-green-500/20 text-green-400';
    case 'Shipped': return 'bg-blue-500/20 text-blue-400';
    case 'Processing': return 'bg-yellow-500/20 text-yellow-400';
    case 'Cancelled': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};


const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
        const data = await getAllOrders();
        setOrders(data);
    } catch (error) {
        toast.error("Could not fetch orders.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
        await updateOrderStatus(orderId, newStatus);
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        toast.success("Order status updated!");
    } catch (error) {
        toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center p-10">
            <div className="w-10 h-10 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="bg-plum/30 p-4 sm:p-6 rounded-xl border border-lavender/20">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Orders ({orders.length})</h2>
      
      {/* --- Mobile Card View --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {orders.map(order => (
          <div key={order._id} className="bg-ink p-4 rounded-lg border border-lavender/20 space-y-3">
              <div>
                  <p className="text-xs text-lavender/70 font-mono">ID: ...{order._id.slice(-6)}</p>
                  <p className="font-semibold text-white">{order.user?.name || 'N/A'}</p>
              </div>
              <p><span className="text-lavender/70">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><span className="text-lavender/70">Total:</span> ₹{order.totalPrice.toLocaleString()}</p>
              <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="form-input !py-1 text-sm"
              >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
              </select>
          </div>
        ))}
      </div>

      {/* --- Desktop Table View --- */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-lavender/20">
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-lavender/10 text-lavender/90">
                <td className="p-3 text-sm font-mono">...{order._id.slice(-6)}</td>
                <td className="p-3 font-semibold text-white">{order.user?.name || 'N/A'}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3">₹{order.totalPrice.toLocaleString()}</td>
                <td className="p-3">
                    <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`form-input !py-1 !px-2 text-sm w-36 ${getStatusColor(order.status)}`}
                    >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;