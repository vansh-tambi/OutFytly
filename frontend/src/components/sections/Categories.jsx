// src/components/sections/Categories.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Women', image: 'https://images.unsplash.com/photo-1581044777550-4cfa6ce24628?w=500', size: 'large' },
  { name: 'Men', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500', size: 'small' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', size: 'small' },
  { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?w=500', size: 'small' },
  { name: 'Kids', image: 'https://images.unsplash.com/photo-1519238263530-99bdd1965342?w=500', size: 'small' },
];

const containerVariant = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariant = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
};

const CategoryCard = ({ name, image, size }) => {
  const isLarge = size === 'large';
  return (
    <Link 
      to={`/browse?category=${name.toLowerCase()}`} 
      className={`
        relative rounded-2xl overflow-hidden shadow-2xl shadow-plum/50 group border-2 border-transparent hover:border-primary transition-all
        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
      `}
    >
      <motion.div variants={itemVariant} whileHover={{ scale: 1.05 }} className="h-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h3 className={`font-bold text-white ${isLarge ? 'text-4xl' : 'text-2xl'}`}>{name}</h3>
          <div className="flex items-center gap-2 text-primary font-semibold mt-2 opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Shop Now <ArrowRight size={18} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};


const Categories = () => {
  return (
    <section className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
            variants={{
              initial: { opacity: 0, y: -20 },
              whileInView: { opacity: 1, y: 0 }
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Curated for Your Style
          </h2>
          <p className="text-lavender/70 mt-3 max-w-2xl mx-auto">
            From statement pieces to everyday essentials, discover collections that tell your story.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-6 h-[600px]"
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;