// src/components/sections/Newsletter.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    // Simulate an API call to your newsletter service
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Newsletter Subscription:', data);
    
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000); // Reset after 5 seconds
  };

  return (
    <section className="py-20 bg-plum text-white text-center">
      <div className="max-w-2xl mx-auto px-6">
        <motion.h2
          variants={{
            initial: { opacity: 0, y: -20 },
            whileInView: { opacity: 1, y: 0 }
          }}
          initial="initial"
          whileInView="whileInView"
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-3xl font-bold mb-3"
        >
          Stay In The <span className="gradient-text">Loop!</span> 💌
        </motion.h2>
        <motion.p
          variants={{
            initial: { opacity: 0 },
            whileInView: { opacity: 1 }
          }}
          initial="initial"
          whileInView="whileInView"
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-lavender/70 mb-8 max-w-md mx-auto"
        >
          Subscribe to our newsletter for the latest collections, exclusive deals, and style inspiration.
        </motion.p>
        
        {isSuccess ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 font-semibold"
          >
            Thanks for subscribing!
          </motion.p>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: false }}
            className="max-w-lg mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                type="email"
                placeholder="Enter your email"
                className="form-input flex-grow" // Reusing our consistent form style
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="px-6 py-3 bg-primary rounded-xl font-semibold hover:bg-primary/80 transition flex items-center justify-center gap-2 disabled:bg-primary/50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </div>
            {errors.email && <p className="form-error text-left mt-2">Please enter a valid email address.</p>}
          </motion.form>
        )}
      </div>
    </section>
  );
};
export default Newsletter;