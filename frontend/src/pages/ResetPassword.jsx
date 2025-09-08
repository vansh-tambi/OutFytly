import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
  const { resetPassword } = useAuth();
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const newPassword = watch("password");

  const onSubmit = async (data) => {
    try {
      const successMessage = await resetPassword(token, data.password);
      toast.success(successMessage);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2s
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <AuthLayout title="Reset Your Password 🔑" subtitle="Choose a new, strong password.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("password", { required: "New password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
            type="password"
            placeholder="New Password"
            className="form-input"
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
        <div>
          <input
            {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === newPassword || "Passwords do not match" })}
            type="password"
            placeholder="Confirm New Password"
            className="form-input"
          />
          {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold transition disabled:bg-primary/50"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;