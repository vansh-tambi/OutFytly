import React from "react";
import { motion } from "framer-motion";

const brands = [
  "/brands/nike.png",
  "/brands/adidas.png",
  "/brands/zara.png",
  "/brands/hm.png",
];

const Brands = () => {
  return (
    <section className="py-16 bg-ink text-white text-center">
      <h2 className="text-2xl font-semibold mb-10">
        Trusted by Top Fashion Brands
      </h2>
      <div className="flex justify-center gap-16 flex-wrap">
        {brands.map((logo, i) => (
          <motion.img
            key={i}
            src={logo}
            alt="brand"
            className="h-14 grayscale hover:grayscale-0 transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    </section>
  );
};

export default Brands;
