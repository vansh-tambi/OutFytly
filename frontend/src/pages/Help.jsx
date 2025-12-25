// src/pages/Help.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, LifeBuoy, DollarSign, Truck, User, ArrowRight } from 'lucide-react';

const helpTopics = [
  { icon: LifeBuoy, title: 'Getting Started', description: 'Learn the basics of renting and listing on OutFytly.', link: '/faq#getting-started' },
  { icon: DollarSign, title: 'Payments & Pricing', description: 'Find answers about our commission rates, payouts, and secure payments.', link: '/faq#payments' },
  { icon: Truck, title: 'Shipping & Returns', description: 'Understand our policies on delivery, tracking, and returns.', link: '/faq#shipping' },
  { icon: User, title: 'Managing Your Account', description: 'Get help with profile settings, verification, and notifications.', link: '/account/profile' },
];

// Animation variants for smoother staggering
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};


const Help = () => {
  return (
    <div className="bg-ink min-h-screen">
      {/* --- Hero Section --- */}
      <div className="text-center py-24 px-6 bg-gradient-to-b from-plum to-ink">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-4xl md:text-5xl font-bold text-white mb-4">
          How can we help? 🙋
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }} className="relative mt-8 max-w-2xl mx-auto">
          <input type="search" placeholder="Search for answers..." className="w-full pl-12 pr-4 py-4 rounded-full bg-plum/50 border border-lavender/30 text-white placeholder-lavender/60 focus:outline-none focus:ring-2 focus:ring-primary"/>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lavender/50" size={22} />
        </motion.div>
      </div>

      {/* --- Help Topics Section --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-lavender">Browse Help Topics</h2>
          <motion.div 
            variants={containerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {helpTopics.map((topic) => {
              const Icon = topic.icon; // THE FIX: Assign to a capitalized variable
              return (
                <motion.div key={topic.title} variants={itemVariant}>
                  <Link to={topic.link} className="block p-6 bg-plum/30 rounded-xl border border-lavender/20 hover:border-primary hover:bg-plum/50 transition-colors group h-full">
                    <div className="bg-primary/10 text-primary w-14 h-14 rounded-full flex items-center justify-center mb-4">
                      <Icon size={28} /> {/* Use the capitalized variable here */}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{topic.title}</h3>
                    <p className="text-lavender/70 text-sm mb-4">{topic.description}</p>
                    <div className="flex items-center gap-1 font-semibold text-primary/80 group-hover:text-primary transition-colors mt-auto">
                      Learn More <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- Contact Support Section --- */}
      <section className="px-6 pb-20">
         <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/20 to-plum/20 p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-lavender/70 mb-6">Our support team is available to assist you. Reach out to us directly.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-lavender font-medium">
               <a href="mailto:support@outfytly.com" className="hover:text-primary transition-colors">📧 support@outfytly.com</a>
               <a href="tel:+916378140738" className="hover:text-primary transition-colors">📞 +91-6378-140738</a>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Help;