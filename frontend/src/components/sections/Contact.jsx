// src/components/sections/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <section className="py-16 bg-white text-ink">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">📩 Get in Touch</h2>
        <p className="text-center text-gray-600 mb-10">
          Have questions or feedback? We'd love to hear from you.
        </p>
        <form className="grid gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          />
          <button className="bg-primary text-white py-3 rounded-lg font-semibold hover:bg-ink transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
