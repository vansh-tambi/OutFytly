// src/pages/Signup.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { motion } from 'framer-motion';

const Signup = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    // On success, you would typically redirect
    // navigate('/login');
  };

  return (
    <AuthLayout title="Create Your Account 🚀" subtitle="Join the community and start your fashion journey.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("fullName", { required: "Full name is required" })}
            type="text"
            placeholder="Full Name"
            className="form-input"
          />
          {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
        </div>
        <div>
          <input
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }})}
            type="email"
            placeholder="Email Address"
            className="form-input"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" }})}
            type="password"
            placeholder="Password"
            className="form-input"
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
        <div>
          <input
            {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === password || "Passwords do not match" })}
            type="password"
            placeholder="Confirm Password"
            className="form-input"
          />
          {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition disabled:bg-primary/50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </motion.button>
      </form>

      <p className="text-center mt-6 text-lavender/70">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;