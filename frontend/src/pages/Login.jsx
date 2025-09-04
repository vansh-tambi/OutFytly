// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-ink px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-gradient-to-br from-plum to-ink p-8 rounded-2xl shadow-xl w-full max-w-md border border-lavender/30"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Login to continue renting and exploring outfits
        </p>

        {/* Form */}
        <form className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-ink text-white border border-lavender/40 focus:ring-2 focus:ring-primary outline-none"
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-ink text-white border border-lavender/40 focus:ring-2 focus:ring-primary outline-none"
          />
          <div className="flex justify-between items-center text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" /> Remember me
            </label>
            <Link to="/forgot-password" className="hover:text-lavender">
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-lavender transition"
          >
            Login
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center justify-center gap-2 bg-white text-ink py-2.5 rounded-lg shadow-md font-medium hover:bg-gray-200"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className="h-5 w-5" />
            Continue with Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center justify-center gap-2 bg-[#1877f2] text-white py-2.5 rounded-lg shadow-md font-medium hover:bg-[#0f65d4]"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="h-5 w-5" />
            Continue with Facebook
          </motion.button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
