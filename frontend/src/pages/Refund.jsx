// src/pages/Refund.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Undo2, Banknote, Shuffle } from 'lucide-react'; // Icons for each section

// A reusable component for each policy section
const PolicySection = ({ title, icon: Icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <Icon className="text-primary" size={28} />
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
    <div className="space-y-4 text-lavender/80 leading-relaxed border-l-2 border-primary/20 pl-6 ml-3.5">
      {children}
    </div>
  </div>
);

const Refund = () => {
  return (
    <div className="bg-ink min-h-screen">
      {/* --- Hero Section --- */}
      <div className="text-center py-24 px-6 bg-gradient-to-b from-plum to-ink">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Return & Refund Policy 🔄
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-lg text-lavender/80 max-w-3xl mx-auto"
        >
          We want you to love every outfit. Here’s how we handle returns and refunds to ensure your experience is smooth and hassle-free.
        </motion.p>
      </div>

      {/* --- Policy Content --- */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-plum/30 p-8 sm:p-10 rounded-2xl border border-lavender/20"
        >
          <p className="text-sm text-lavender/60 mb-8">Last Updated: September 8, 2025</p>

          <PolicySection title="Returns" icon={Undo2}>
            <p>
              To be eligible for a return, your item must be in the same condition that you received it: unworn, unused, with all original tags attached, and in its original packaging. All return requests must be initiated within **3 days** of the delivery date.
            </p>
            <p>
              To start a return, please contact our support team with your order number and a clear description of the issue.
            </p>
          </PolicySection>

          <PolicySection title="Refunds" icon={Banknote}>
            <p>
              Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed automatically to your original method of payment within **7-10 business days**.
            </p>
          </PolicySection>
          
          <PolicySection title="Exchanges" icon={Shuffle}>
            <p>
              We only offer exchanges for items that are defective, damaged, or if you received the wrong item or size. If you need to exchange an item, please contact our support team immediately upon receipt of your order.
            </p>
          </PolicySection>
        </motion.div>
      </div>
    </div>
  );
};

export default Refund;