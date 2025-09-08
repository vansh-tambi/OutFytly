// src/pages/Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // ✅ IMPORT
import toast from 'react-hot-toast'; // ✅ IMPORT
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const carouselImages = [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
];

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ GET LOGIN FUNCTION
  const [showPassword, setShowPassword] = useState(false); // ✅ STATE FOR PASSWORD VISIBILITY

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to homepage on success
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="relative flex w-full max-w-4xl h-[600px] bg-plum/50 rounded-2xl shadow-2xl shadow-plum/50 overflow-hidden border border-lavender/20">
        
        {/* --- Left Column: Image Carousel --- */}
        <div className="hidden lg:block w-1/2 relative">
           <Swiper
             modules={[Autoplay, EffectFade]}
             effect="fade"
             loop={true}
             autoplay={{ delay: 3000, disableOnInteraction: false }}
             className="w-full h-full"
           >
             {carouselImages.map((src, i) => (
                <SwiperSlide key={i}>
                    <img src={src} alt={`Fashion image ${i+1}`} className="w-full h-full object-cover" />
                </SwiperSlide>
             ))}
           </Swiper>
           <div className="absolute inset-0 bg-gradient-to-t from-plum via-plum/50 to-transparent"></div>
        </div>

        {/* --- Right Column: Login Form --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12">
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <Link to="/" className="text-2xl font-bold flex gap-2 items-center text-white mb-8">
                <img src="/Logo_OUTFYTLY.png" alt="OutFytly" className="h-9 w-9 rounded-xl object-cover" />
                <span>OutFytly</span>
              </Link>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back 👋</h2>
              <p className="text-lavender/70 mb-8">Login to continue your fashion journey.</p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email Address" className="form-input"/>
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div className="relative">
                  <input
                    {...register("password", { required: "Password is required" })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="form-input"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-lavender/60 hover:text-white">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && <p className="form-error">{errors.password.message}</p>}
                </div>
                <div className="flex justify-between items-center text-sm text-lavender/70">
                  <label className="flex items-center gap-2 select-none">
                    <input type="checkbox" {...register("rememberMe")} className="h-4 w-4 rounded bg-ink border-lavender/50 text-primary focus:ring-primary" />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="hover:text-primary transition">Forgot Password?</Link>
                </div>
                <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: isSubmitting ? 1 : 1.03 }} className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition disabled:bg-primary/50">
                  {isSubmitting ? "Logging In..." : "Login"}
                </motion.button>
              </form>

              <p className="text-center mt-6 text-lavender/70">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-primary hover:underline">Sign Up</Link>
              </p>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;