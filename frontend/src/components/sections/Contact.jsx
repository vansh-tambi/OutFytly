// src/components/sections/Contact.jsx
import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="py-12 bg-ink text-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-4"
        >
          📩 Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-gray-300 mb-8"
        >
          Have questions or feedback? We'd love to hear from you.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-5"
        >
          <input type="text" placeholder="Your Name" className="p-4 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-primary outline-none"/>
          <input type="email" placeholder="Your Email" className="p-4 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-primary outline-none"/>
          <textarea rows="5" placeholder="Your Message" className="p-4 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-primary outline-none"/>
          <button className="bg-primary text-white py-3 rounded-lg font-semibold hover:bg-lavender transition">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};
export default Contact;
