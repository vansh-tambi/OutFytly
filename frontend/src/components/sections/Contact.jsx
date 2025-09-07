// src/components/sections/Contact.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfoCard = ({ icon: Icon, title, detail, href }) => (
    <motion.a 
        href={href} 
        whileHover={{ y: -5, scale: 1.03 }}
        className="flex items-start gap-4 p-6 bg-plum/40 rounded-lg border border-lavender/20"
    >
        <div className="bg-primary/20 text-primary p-3 rounded-full">
            <Icon size={24} />
        </div>
        <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-lavender/70">{detail}</p>
        </div>
    </motion.a>
);

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Contact Form Data:', data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="py-24 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          <p className="text-lavender/70 mt-4 max-w-2xl mx-auto">
            Have questions, feedback, or a partnership proposal? We'd love to hear from you. Choose your preferred method to connect with us.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* --- Left Column: Contact Info --- */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
            >
                <ContactInfoCard icon={Mail} title="Email Us" detail="support@outfytly.com" href="mailto:support@outfytly.com" />
                <ContactInfoCard icon={Phone} title="Call Us" detail="+91-6378-140738" href="tel:+916378140738" />
                <ContactInfoCard icon={MapPin} title="Our Location" detail="Bhopal, Madhya Pradesh, India" href="#" />
            </motion.div>

            {/* --- Right Column: Contact Form --- */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="bg-plum/30 p-8 rounded-2xl border border-lavender/20"
            >
                {isSuccess ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                        <div className="bg-green-500/10 text-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                           ✅
                        </div>
                        <h3 className="font-semibold text-xl text-white">Message Sent!</h3>
                        <p className="text-lavender/70 mt-2">Thanks for reaching out. We'll get back to you shortly.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <h3 className="text-2xl font-semibold text-white mb-2">Send us a Message</h3>
                        <div>
                            <input {...register("name", { required: "Your name is required" })} type="text" placeholder="Your Name" className="form-input"/>
                            {errors.name && <p className="form-error">{errors.name.message}</p>}
                        </div>
                        <div>
                            <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" } })} type="email" placeholder="Your Email" className="form-input"/>
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
                        </div>
                        <div>
                            <textarea {...register("message", { required: "A message is required" })} rows="5" placeholder="Your Message" className="form-input"/>
                            {errors.message && <p className="form-error">{errors.message.message}</p>}
                        </div>
                        <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition disabled:bg-primary/50">
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </form>
                )}
            </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Contact;