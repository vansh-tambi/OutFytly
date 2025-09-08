// src/pages/Refund.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Undo2, Banknote, Shuffle } from 'lucide-react';
import StaticPageLayout from '../layouts/StaticPageLayout';

const policyTabs = [
  {
    id: 'returns',
    label: 'Returns',
    icon: Undo2,
    content: [
      "To be eligible for a return, your item must be in the same condition that you received it: unworn, unused, with all original tags attached, and in its original packaging.",
      "All return requests must be initiated within 3 days of the delivery date by contacting our support team with your order number and a clear description of the issue."
    ]
  },
  {
    id: 'refunds',
    label: 'Refunds',
    icon: Banknote,
    content: [
      "Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund.",
      "If approved, your refund will be processed automatically to your original method of payment within 7-10 business days."
    ]
  },
  {
    id: 'exchanges',
    label: 'Exchanges',
    icon: Shuffle,
    content: [
      "We only offer exchanges for items that are defective, damaged, or if you received the wrong item or size.",
      "If you need to exchange an item, please contact our support team immediately upon receipt of your order to arrange the exchange process."
    ]
  }
];

const Refund = () => {
  const [activeTab, setActiveTab] = useState(policyTabs[0].id);
  const activeContent = policyTabs.find(tab => tab.id === activeTab);

  return (
    <StaticPageLayout
      title="Return & Refund Policy 🔄"
      subtitle="We want you to love every outfit. Here’s how we handle returns and refunds to ensure your experience is smooth and hassle-free."
    >
      <div className="space-y-6">
        {/* --- Interactive Tab Buttons --- */}
        <div className="relative flex border-b border-lavender/20">
          {policyTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 p-4 text-sm font-semibold transition-colors ${
                activeTab === tab.id ? 'text-primary' : 'text-lavender/70 hover:text-white'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div layoutId="active-policy-pill" className="absolute inset-0 border-b-2 border-primary" />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <tab.icon size={16} /> {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* --- Animated Content Panel --- */}
        <div className="mt-6 min-h-[150px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="space-y-4 text-lavender/80 leading-relaxed text-sm">
                        {activeContent.content.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default Refund;