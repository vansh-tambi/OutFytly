// src/components/sections/FAQ.jsx
import React, { useState } from "react";

const faqs = [
  {
    q: "How does OutFytly work?",
    a: "Browse outfits, rent or buy them directly, and get them delivered at your doorstep.",
  },
  {
    q: "Do I need a subscription?",
    a: "No. You can buy/rent without a subscription. But premium plans give better visibility to sellers.",
  },
  {
    q: "Can I return rented clothes?",
    a: "Yes, you can return rented items within the specified period as per seller’s policy.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 bg-white text-ink">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">❓ Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 py-4"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left flex justify-between items-center text-lg font-medium"
            >
              {faq.q}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <p className="mt-2 text-gray-600">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
