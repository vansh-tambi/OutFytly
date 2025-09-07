// src/components/sections/HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Truck, Undo2 } from "lucide-react";

const steps = [
  { id: 1, title: "Browse & Discover", desc: "Explore thousands of unique outfits, shoes, and accessories from closets near you.", icon: Search },
  { id: 2, title: "Rent or Buy", desc: "Select your items, choose your dates, and complete your order with our secure payment system.", icon: ShoppingCart },
  { id: 3, title: "Receive Your Order", desc: "Your chosen outfit is delivered right to your doorstep, ready to wear for your special occasion.", icon: Truck },
  { id: 4, title: "Return with Ease", desc: "After your event, simply place the rented items in the pre-paid return bag and drop them off.", icon: Undo2 },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          How OutFytly Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-lavender/70 mb-12 max-w-2xl mx-auto"
        >
          A simple, seamless experience from start to finish.
        </motion.p>
        
        {/* Grid container with connecting line pseudo-element */}
        <div className="relative grid md:grid-cols-4 gap-8 md:gap-6">
          {/* The connecting line - visible only on desktop */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 w-full h-px bg-lavender/20"></div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ delay: i * 0.2, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="relative z-10 p-6 bg-plum rounded-xl shadow-lg border border-lavender/20 hover:shadow-primary/20 hover:border-lavender/50 transition-all"
              >
                <div className="mb-4 bg-primary/20 text-primary w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-lavender/70 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;