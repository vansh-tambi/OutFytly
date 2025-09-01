// src/components/FAQ.jsx
import React, { useState } from "react";

const faqs = [
  { q: "How does OutFytly work?", a: "Browse outfits, add to cart, and get them delivered to your doorstep." },
  { q: "Do you offer returns?", a: "Yes, hassle-free 7-day returns are available on most items." },
  { q: "Is there a subscription plan?", a: "We’re launching exclusive monthly style boxes soon!" },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-plum">FAQs</h2>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-300 py-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between text-left font-medium text-lg text-ink"
            >
              {faq.q}
              <span>{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && <p className="mt-2 text-gray-600">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
