// src/pages/AccountPage.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, Heart, ShoppingBag, UploadCloud } from 'lucide-react'; // ✅ 1. Import the icon

const AccountPage = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-primary text-white font-semibold'
        : 'text-lavender/80 hover:bg-plum/50 hover:text-white'
    }`;

  return (
    <div className="bg-ink min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 items-start">
        {/* --- Sidebar Navigation --- */}
        <aside className="md:col-span-1 bg-plum/30 p-4 rounded-xl border border-lavender/20">
          <nav className="flex flex-col gap-2">
            <NavLink to="/account/profile" className={navLinkClass}>
              <User size={20} />
              <span>Profile Settings</span>
            </NavLink>
            <NavLink to="/account/wishlist" className={navLinkClass}>
              <Heart size={20} />
              <span>My Wishlist</span>
            </NavLink>
            <NavLink to="/account/orders" className={navLinkClass}>
              <ShoppingBag size={20} />
              <span>Order History</span>
            </NavLink>
            
            {/* ✅ 2. Add the Seller Dashboard link here */}
            <div className="my-2 border-t border-lavender/20"></div> {/* Optional separator */}
            <NavLink to="/account/dashboard" className={navLinkClass}>
              <UploadCloud size={20} />
              <span>Seller Dashboard</span>
            </NavLink>

          </nav>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="md:col-span-3">
          {/* Nested routes will be rendered here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountPage;