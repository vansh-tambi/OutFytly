// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-ink text-white py-20 px-6 text-center">
      <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
        Rent. Style. Repeat.
      </h2>
      <p className="text-lg md:text-xl mb-6 text-lavender">
        Find your next outfit or give your fashion a new life ✨
      </p>
      <Link to="/browse" className="bg-lavender text-plum px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
        Explore Outfits
      </Link>
    </section>
  );
};

export default Hero;
