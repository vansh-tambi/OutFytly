import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, Package, ShoppingCart, LayoutDashboard } from 'lucide-react';
import AdminStats from '../components/admin/AdminStats'; // ✅ 1. Import the stats component

const AdminDashboard = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-primary text-white font-semibold'
        : 'text-lavender/80 hover:bg-plum/50 hover:text-white'
    }`;

  return (
    <div className="bg-ink min-h-screen text-white p-4 sm:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 max-w-7xl mx-auto">Admin Panel</h1>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 items-start">
        <aside className="md:col-span-1 bg-plum/30 p-4 rounded-xl border border-lavender/20">
          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/dashboard" end className={navLinkClass}><LayoutDashboard size={20} /><span>Dashboard</span></NavLink>
            <NavLink to="/admin/dashboard/users" className={navLinkClass}><Users size={20} /><span>Users</span></NavLink>
            <NavLink to="/admin/dashboard/products" className={navLinkClass}><Package size={20} /><span>Products</span></NavLink> {/* ✅ 2. Add Products link */}
            <NavLink to="/admin/dashboard/orders" className={navLinkClass}><ShoppingCart size={20} /><span>Orders</span></NavLink>
          </nav>
        </aside>
        <main className="md:col-span-3">
          {/* ✅ 3. Display the stats above the main content */}
          <AdminStats />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;