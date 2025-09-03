// src/components/sections/Newsletter.jsx
import React from "react";

const Newsletter = () => {
  return (
    <section className="py-16 bg-plum text-white text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
        <p className="text-gray-300 mb-6">
          Subscribe to our newsletter for the latest collections & offers.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl w-full sm:w-auto flex-grow text-ink focus:outline-none"
          />
          <button className="px-6 py-3 bg-primary rounded-xl hover:bg-lavender transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
