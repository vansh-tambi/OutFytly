// src/components/sections/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    text: "OutFytly has completely changed my shopping experience. Love the quality!",
  },
  {
    id: 2,
    name: "Priya Mehta",
    text: "Super stylish collection, fast delivery, and smooth browsing. Totally recommend!",
  },
  {
    id: 3,
    name: "Rahul Verma",
    text: "Best fashion marketplace. The UI is so smooth and products are top-notch.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-lavender text-ink">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <p className="text-gray-600 italic mb-4">“{t.text}”</p>
              <h3 className="font-semibold text-primary">{t.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
