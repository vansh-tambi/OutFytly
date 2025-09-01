// src/components/Brands.jsx
import React from "react";

const brands = [
  "/brands/nike.png",
  "/brands/adidas.png",
  "/brands/zara.png",
  "/brands/hm.png",
];

const Brands = () => {
  return (
    <section className="py-12 bg-ink text-white text-center">
      <h2 className="text-xl font-semibold mb-8">Trusted by Top Fashion Brands</h2>
      <div className="flex justify-center gap-12 flex-wrap">
        {brands.map((logo, i) => (
          <img key={i} src={logo} alt="brand" className="h-12 grayscale hover:grayscale-0 transition" />
        ))}
      </div>
    </section>
  );
};

export default Brands;
