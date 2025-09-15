import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api/adminService';
import toast from 'react-hot-toast';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrders().then(setOrders);
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

  return (
    <div className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* ... Table headers ... */}
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-lavender/10">
                <td className="p-3 text-sm font-mono">...{order._id.slice(-6)}</td>
                <td className="p-3">{order.user?.name || 'N/A'}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3">₹{order.totalPrice.toLocaleString()}</td>
                <td className="p-3">
                    <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="form-input !py-1"
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