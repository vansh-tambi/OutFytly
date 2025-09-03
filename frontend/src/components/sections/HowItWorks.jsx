// src/components/sections/HowItWorks.jsx
import React from "react";

const steps = [
  { id: 1, title: "Browse", desc: "Explore thousands of outfits, shoes, and accessories near you." },
  { id: 2, title: "Select", desc: "Add items to your cart to rent or buy with secure payment." },
  { id: 3, title: "Get Delivered", desc: "Your chosen outfit arrives quickly at your doorstep." },
  { id: 4, title: "Return (if rented)", desc: "Easily return rented items as per schedule." },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">✨ How OutFytly Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="p-6 bg-plum rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-2xl font-bold mb-3 text-lavender">{step.id}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
