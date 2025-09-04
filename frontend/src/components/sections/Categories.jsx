/* eslint-disable no-unused-vars */
// src/components/sections/Categories.jsx
import React from "react";
import { motion } from "framer-motion";

const categories = [
  { id: 1, name: "Men", image: "/images/men.jpg" },
  { id: 2, name: "Women", image: "/images/women.jpg" },
  { id: 3, name: "Kids", image: "/images/kids.jpg" },
  { id: 4, name: "Accessories", image: "/images/accessories.jpg" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Categories = () => {
  return (
    <section className="py-14 bg-gradient-to-r from-plum via-ink to-primary text-white relative overflow-hidden">
      {/* subtle blob bg */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-cover bg-center opacity-10"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Shop by <span className="text-lavender">Category</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-lavender/20 hover:border-lavender/50"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition flex items-center justify-center">
                <p className="text-lg md:text-xl font-semibold tracking-wide group-hover:scale-110 transform transition">
                  {cat.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
