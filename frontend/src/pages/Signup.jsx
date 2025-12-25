// src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import CityAutocomplete from '../components/CityAutocomplete'; // ✅ 1. Import the new component

const carouselImages = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800',
];

const Signup = () => {
  // ✅ 2. Destructure 'setValue' from useForm
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm();
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const password = watch("password");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ 4. Update onSubmit to send the entire data object
  const onSubmit = async (data) => {
    try {
      // Pass the whole data object, which now includes 'location'
      await signup(data); 
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink p-4">
      <div className="relative flex w-full max-w-4xl min-h-[650px] bg-plum/50 rounded-2xl shadow-2xl shadow-plum/50 overflow-hidden border border-lavender/20">
        
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

        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12">
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link to="/" className="text-2xl font-bold flex gap-2 items-center text-white mb-6">
                <img src="/Logo_OUTFYTLY.png" alt="OutFytly" className="h-9 w-9 rounded-xl object-cover" />
                <span>OutFytly</span>
              </Link>
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Create Your Account 🚀
            </motion.h2>
            <motion.p 
              className="text-lavender/70 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Join the community and start your fashion journey.
            </motion.p>
            
            <motion.form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <motion.input 
                  {...register("fullName", { required: "Full name is required" })} 
                  type="text" 
                  placeholder="Full Name" 
                  className="form-input"
                  whileFocus={{ borderColor: '#8A2BE2', boxShadow: '0 0 0 3px rgba(138, 43, 226, 0.1)' }}
                  transition={{ duration: 0.2 }}
                />
                {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <CityAutocomplete 
                  register={register}
                  setValue={setValue}
                  error={errors.location}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <motion.input 
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }})} 
                  type="email" 
                  placeholder="Email Address" 
                  className="form-input"
                  whileFocus={{ borderColor: '#8A2BE2', boxShadow: '0 0 0 3px rgba(138, 43, 226, 0.1)' }}
                  transition={{ duration: 0.2 }}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </motion.div>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.input 
                  {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" }})} 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password" 
                  className="form-input"
                  whileFocus={{ borderColor: '#8A2BE2', boxShadow: '0 0 0 3px rgba(138, 43, 226, 0.1)' }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lavender/60 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
                {errors.password && <p className="form-error">{errors.password.message}</p>}
              </motion.div>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                <motion.input 
                  {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === password || "Passwords do not match" })} 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  placeholder="Confirm Password" 
                  className="form-input"
                  whileFocus={{ borderColor: '#8A2BE2', boxShadow: '0 0 0 3px rgba(138, 43, 226, 0.1)' }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lavender/60 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
              </motion.div>

              <motion.button 
                type="submit" 
                disabled={isSubmitting} 
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }} 
                whileTap={{ scale: 0.97 }}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition disabled:bg-primary/50"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </motion.button>
            </motion.form>

            <motion.p 
              className="text-center mt-6 text-lavender/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline">Login</Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;