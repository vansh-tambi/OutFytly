import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-lavender font-semibold border-b-2 border-lavender"
      : "text-white hover:text-lavender transition duration-300";

  // later replace with actual auth check
  const isLoggedIn = false;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-gradient-to-r from-plum via-ink to-plum text-white px-6 py-4 shadow-md flex justify-between items-center"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold flex gap-2 tracking-wide items-center hover:scale-105 transition"
      >
        <motion.img
          src="/Logo_OUTFYTLY.png"
          alt="OutFytly"
          className="h-9 w-9 rounded-xl object-cover"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <span className="bg-gradient-to-r from-lavender to-primary bg-clip-text text-transparent">
          OutFytly
        </span>
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 bg-lavender text-plum px-3 py-1 rounded-md hover:bg-primary hover:text-white transition"
            >
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navLinkClasses}>
              Login
            </NavLink>
            <motion.div whileHover={{ scale: 1.05 }}>
              <NavLink
                to="/signup"
                className="bg-primary px-4 py-1.5 rounded-md font-medium hover:bg-lavender hover:text-plum transition"
              >
                Signup
              </NavLink>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
