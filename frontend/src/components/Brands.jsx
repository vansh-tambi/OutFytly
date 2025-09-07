// src/components/sections/Brands.jsx
import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { src: '/nike.png', alt: 'Nike' },
  { src: '/adidas.png', alt: 'Adidas' },
  { src: '/zara.png', alt: 'Zara' },
  { src: '/hnm.png', alt: 'H&M' },
  { src: '/gucii.png', alt: 'Gucci' },
  { src: '/parada.png', alt: 'Prada' },
];

// Animation variants (unchanged)
const containerVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 15 } },
};

const Brands = () => {
  return (
    <section className="py-24 bg-ink">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl font-bold text-white mb-3">
              Featured In Our Collection
            </h2>
            <p className="text-lavender/70 max-w-2xl mx-auto mb-12">
              We partner with the world's leading fashion brands to bring you an unparalleled collection of premium and designer wear.
            </p>
        </motion.div>
        
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.alt}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.05, boxShadow: "0px 10px 20px rgba(138, 43, 225, 0.2)" }}
              className="group bg-plum/30 backdrop-blur-sm p-6 rounded-xl flex items-center justify-center aspect-square border border-lavender/20 transition-colors hover:border-primary/50"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                // --- THE FIX ---
                // invert makes black logos white.
                // It starts grayscale and becomes full color (but still inverted) on hover.
                className="h-10 sm:h-12 w-auto invert grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;