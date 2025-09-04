// src/components/sections/HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Browse", desc: "Explore thousands of outfits, shoes, and accessories near you." },
  { id: 2, title: "Select", desc: "Add items to your cart to rent or buy with secure payment." },
  { id: 3, title: "Get Delivered", desc: "Your chosen outfit arrives quickly at your doorstep." },
  { id: 4, title: "Return", desc: "Easily return rented items as per schedule." },
];

const HowItWorks = () => {
  return (
    <section className="py-14 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8"
        >
          ✨ How OutFytly Works
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-5 bg-plum rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-2xl font-bold mb-2 text-lavender">{step.id}</div>
              <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;