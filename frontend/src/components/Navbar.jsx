import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-lavender font-semibold border-b-2 border-lavender"
      : "text-white hover:text-lavender transition";

  // later you’ll replace this with real auth check
  const isLoggedIn = false;

  return (
    <nav className="bg-plum text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold flex gap-2 tracking-wide">
        <img
          src="/Logo_OUTFYTLY.png"
          alt="OutFytly"
          className="h-9 w-9 rounded-xl object-cover"
        />
        OutFytly
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <NavLink to="/" className={navLinkClasses}>
          Home
        </NavLink>
        <NavLink to="/browse" className={navLinkClasses}>
          Browse
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/cart" className={navLinkClasses}>
              Cart
            </NavLink>
            <NavLink to="/profile" className={navLinkClasses}>
              Profile
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClasses}>
              Dashboard
            </NavLink>
            <button className="ml-4 bg-lavender text-plum px-3 py-1 rounded-md hover:bg-primary transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navLinkClasses}>
              Login
            </NavLink>
            <NavLink to="/signup" className={navLinkClasses}>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
