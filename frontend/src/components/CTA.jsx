// src/components/CTA.jsx
import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-primary text-white py-16 px-6 text-center rounded-2xl my-12">
      <h2 className="text-3xl font-bold mb-4">Upgrade Your Style Today</h2>
      <p className="text-lg mb-6">
        Discover handpicked outfits that fit your vibe. Join OutFytly now and redefine your wardrobe.
      </p>
      <Link
        to="/browse"
        className="bg-lavender text-plum px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary transition"
      >
        Start Browsing
      </Link>
    </section>
  );
};

export default CTA;
