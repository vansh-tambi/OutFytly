// src/components/sections/FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, User, Box, Shield, Banknote } from "lucide-react";

const faqs = [
  {
    q: "How does OutFytly work?",
    a: "OutFytly is a peer-to-peer platform. You can browse outfits listed by others, rent or buy them directly, and get them delivered. You can also list your own clothes to earn money.",
    icon: HelpCircle,
  },
  {
    q: "Do I need an account to browse?",
    a: "You can browse our entire collection without an account! However, to rent, buy, or list an item, you'll need to create a free OutFytly account. This helps us ensure a safe and secure community.",
    icon: User,
  },
  {
    q: "What is the return policy?",
    a: "Each seller sets their own policy. We require all items to be returnable within 3 days if they do not match the description or are damaged. Please check the individual item's policy before purchasing.",
    icon: Box,
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. All transactions are processed through Stripe, a certified PCI Service Provider Level 1. We do not store your credit card information on our servers.",
    icon: Shield,
  },
  {
    q: "How do I get paid as a seller?",
    a: "Once a rental or sale is successfully completed, the funds (minus our platform commission) are transferred to your linked bank account within 3-5 business days.",
    icon: Banknote,
  }, 
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  // --- FIX IS HERE ---
  // 1. Assign the active icon to a capitalized variable
  const ActiveIcon = faqs[activeIndex].icon;

  return (
    <section className="py-24 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="text-lavender/70 mt-3 max-w-2xl mx-auto">
            Have a question? We've got answers. If you don't see your question here, feel free to contact us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* --- Left Column: Question Navigation --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-1 space-y-4"
          >
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full p-4 rounded-lg text-left transition-colors duration-300 relative flex items-center gap-4 ${
                  activeIndex === index
                    ? "bg-primary/20 text-white"
                    : "bg-plum/30 hover:bg-plum/60 text-lavender"
                }`}
              >
                <faq.icon className={activeIndex === index ? "text-primary" : "text-lavender/70"} size={24} />
                <span className="font-semibold">{faq.q}</span>
                {activeIndex === index && (
                    <motion.div layoutId="active-faq-indicator" className="absolute -left-2 top-0 bottom-0 w-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </motion.div>

          {/* --- Right Column: Answer Display --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 bg-plum/30 p-8 rounded-2xl border border-lavender/20 min-h-[300px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-4 mb-4">
                    {/* --- FIX IS HERE --- */}
                    {/* 2. Use the capitalized variable as the component */}
                    <ActiveIcon className="text-primary" size={32}/>
                    <h3 className="text-2xl font-bold text-white">
                      {faqs[activeIndex].q}
                    </h3>
                </div>
                <p className="text-lavender/80 leading-relaxed">
                  {faqs[activeIndex].a}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;