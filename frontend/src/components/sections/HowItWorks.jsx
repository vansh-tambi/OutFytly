import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Truck, Undo2 } from "lucide-react";

const steps = [
  { id: 1, title: "Browse & Discover", desc: "Explore thousands of unique outfits from closets near you.", icon: Search, image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500" },
  { id: 2, title: "Rent or Buy", desc: "Select your items and complete your order with our secure payment system.", icon: ShoppingCart, image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500" },
  { id: 3, title: "Receive Your Order", desc: "Your chosen outfit arrives at your doorstep, ready for your special occasion.", icon: Truck, image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500" },
  { id: 4, title: "Return with Ease", desc: "After your event, simply place rented items in the pre-paid return bag and drop them off.", icon: Undo2, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500" },
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ NEW: Automatically cycle through the steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 5000); // Change step every 5 seconds

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-ink text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">How OutFytly Works</h2>
          <p className="text-lg text-lavender/70 mt-4 max-w-2xl mx-auto">A simple, seamless experience from start to finish.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeIndex === index;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-full p-5 rounded-xl text-left transition-all duration-300 flex items-center gap-4 z-10 ${
                    isActive
                      ? "bg-plum/50 text-white shadow-lg"
                      : "bg-plum/20 hover:bg-plum/40 text-lavender"
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="active-step-indicator" className="absolute inset-0 bg-primary/10 rounded-xl border border-primary" />
                  )}
                  <div className={`relative z-10 transition-colors ${isActive ? "text-primary" : "text-lavender/70"}`}>
                    <Icon size={24} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-semibold text-white text-lg">{step.title}</h3>
                    <p className={`text-sm transition-colors ${isActive ? "text-lavender/80" : "text-lavender/60"}`}>{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-plum/50"
          >
            <AnimatePresence>
              <motion.img
                key={activeIndex}
                src={steps[activeIndex].image}
                alt={steps[activeIndex].title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;