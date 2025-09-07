// src/pages/AccountPage.jsx
import React from 'react'; // Corrected this line
import { NavLink, Outlet } from 'react-router-dom';
import { User, ShoppingBag, LayoutGrid, Settings } from 'lucide-react';

const accountLinks = [
  { path: '/account/profile', label: 'Profile Settings', icon: User },
  { path: '/account/orders', label: 'Order History', icon: ShoppingBag },
  { path: '/account/dashboard', label: 'Seller Dashboard', icon: LayoutGrid },
  { path: '/account/settings', label: 'Account Settings', icon: Settings },
];

const AccountPage = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-lavender/80 ${
      isActive ? 'bg-primary/20 text-white font-semibold' : 'hover:bg-plum hover:text-white'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="md:grid md:grid-cols-12 md:gap-8 lg:gap-12">
        {/* --- Sidebar Navigation --- */}
        <aside className="md:col-span-3 lg:col-span-2 mb-8 md:mb-0">
          <nav className="space-y-2">
            {accountLinks.map(({ path, label, icon: Icon }) => (
              <NavLink key={path} to={path} className={navLinkClasses} end>
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="md:col-span-9 lg:col-span-10">
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </div>
  );
};

export default AccountPage;