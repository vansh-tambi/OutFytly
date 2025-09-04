// src/components/sections/FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How does OutFytly work?",
    a: "Browse outfits, rent or buy them directly, and get them delivered at your doorstep.",
  },
  {
    q: "Do I need a subscription?",
    a: "No. You can buy/rent without a subscription. But premium plans give better visibility to sellers.",
  },
  {
    q: "Can I return rented clothes?",
    a: "Yes, you can return rented items within the specified period as per seller’s policy.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 bg-ink text-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          ❓ Frequently Asked{" "}
          <span className="text-lavender">Questions</span>
        </motion.h2>

        {/* FAQ Items */}
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-700 py-4"
          >
            {/* Question */}
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full text-left flex justify-between items-center text-lg font-medium hover:text-lavender transition"
            >
              {faq.q}
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-lavender text-xl font-bold"
              >
                {openIndex === index ? "−" : "+"}
              </motion.span>
            </button>

            {/* Answer with animation */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-2 text-gray-300 leading-relaxed"
                >
                  {faq.a}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
