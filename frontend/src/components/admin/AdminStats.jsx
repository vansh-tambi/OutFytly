// src/components/admin/AdminStats.jsx
import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../api/adminService';
import { Users, ShoppingCart, DollarSign } from 'lucide-react';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
        <h3 className="text-lavender/70 text-sm font-medium flex items-center gap-2"><Users size={16} /> Total Users</h3>
        <p className="text-3xl font-bold text-white mt-2">{stats?.totalUsers ?? '...'}</p>
      </div>
      <div className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
        <h3 className="text-lavender/70 text-sm font-medium flex items-center gap-2"><ShoppingCart size={16} /> Total Orders</h3>
        <p className="text-3xl font-bold text-white mt-2">{stats?.totalOrders ?? '...'}</p>
      </div>
      <div className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
        <h3 className="text-lavender/70 text-sm font-medium flex items-center gap-2"><DollarSign size={16} /> Total Revenue</h3>
        <p className="text-3xl font-bold text-white mt-2">₹{stats ? stats.totalRevenue.toLocaleString() : '...'}</p>
      </div>
    </div>
  );
};

export default AdminStats;