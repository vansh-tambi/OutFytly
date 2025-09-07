// src/pages/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { motion } from 'framer-motion';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    // On success, you would typically redirect
    // navigate('/');
  };

  return (
    <AuthLayout title="Welcome Back 👋" subtitle="Login to continue your fashion journey.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email Address"
            className="form-input"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="form-input"
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
        <div className="flex justify-between items-center text-sm text-lavender/70">
          <label className="flex items-center gap-2 select-none">
            <input type="checkbox" {...register("rememberMe")} className="h-4 w-4 rounded bg-ink border-lavender/50 text-primary focus:ring-primary" />
            Remember me
          </label>
          <Link to="/forgot-password" className="hover:text-primary transition">
            Forgot Password?
          </Link>
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition disabled:bg-primary/50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging In..." : "Login"}
        </motion.button>
      </form>

      <p className="text-center mt-6 text-lavender/70">
        Don't have an account?{' '}
        <Link to="/signup" className="font-semibold text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;