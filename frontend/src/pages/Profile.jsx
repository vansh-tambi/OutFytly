// src/pages/Profile.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

// Mock user data - this would come from your auth context
const currentUser = {
  fullName: 'Vansh Tambi',
  email: 'vanshtambi@gmail.com',
  bio: 'Fashion enthusiast sharing my wardrobe with the world.',
  avatar: 'https://i.pravatar.cc/150?u=vansh',
};

const Profile = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: currentUser
  });

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Updated Profile Data:", data);
    // Add toast notification for success
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold text-white mb-6">Profile Settings</h1>
      <div className="bg-ink p-8 rounded-2xl shadow-lg border border-lavender/20">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-6">
            <img src={currentUser.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
            <div>
              <label htmlFor="avatar-upload" className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/80">
                Change Picture
              </label>
              <input id="avatar-upload" type="file" className="hidden" />
            </div>
          </div>

          <div>
            <label className="form-label">Full Name</label>
            <input {...register('fullName', { required: 'Full name is required' })} className="form-input mt-2" />
            {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="form-label">Email Address</label>
            <input {...register('email')} disabled className="form-input mt-2 bg-plum cursor-not-allowed" />
          </div>
          
          <div>
            <label className="form-label">Bio</label>
            <textarea {...register('bio')} rows="3" className="form-input mt-2" placeholder="Tell us a little about yourself" />
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting} className="bg-lavender text-plum px-6 py-2 rounded-lg font-semibold hover:bg-white transition disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;