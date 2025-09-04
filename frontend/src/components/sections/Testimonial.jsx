// src/components/sections/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  { id: 1, name: "Aarav Sharma", text: "OutFytly has completely changed my shopping experience. Love the quality!" },
  { id: 2, name: "Priya Mehta", text: "Super stylish collection, fast delivery, and smooth browsing. Totally recommend!" },
  { id: 3, name: "Rahul Verma", text: "Best fashion marketplace. The UI is so smooth and products are top-notch." },
];

const Testimonials = () => {
  return (
    <section className="py-14 bg-lavender text-ink">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition"
            >
              <p className="text-gray-600 italic mb-3">“{t.text}”</p>
              <h3 className="font-semibold text-primary">{t.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;