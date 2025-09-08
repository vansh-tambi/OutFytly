import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { forgotPassword } = useAuth();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const successMessage = await forgotPassword(data.email);
      setMessage(successMessage);
      toast.success(successMessage);
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <AuthLayout title="Forgot Password 🤔" subtitle="Enter your email and we'll send you a link to reset your password.">
      {message ? (
        <p className="text-center text-green-400">{message}</p>
      ) : (
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold transition disabled:bg-primary/50"
          >
            {isSubmitting ? "Sending Link..." : "Send Reset Link"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;