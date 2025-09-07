// src/components/sections/BlogSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: '5 Wardrobe Essentials for a Timeless Look',
    desc: 'Discover the key pieces that will keep you stylish and versatile through every season.',
    img: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=500',
    date: 'September 5, 2025',
    tags: ['Style', 'Essentials'],
  },
  {
    id: 2,
    title: 'A Guide to Styling Bold, Vibrant Colors',
    desc: 'Learn how to confidently mix and match vibrant tones without clashing, creating stunning outfits.',
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    date: 'September 2, 2025',
    tags: ['Guide', 'Colors'],
  },
  {
    id: 3,
    title: 'The Top Streetwear Trends You Can’t Miss',
    desc: 'From oversized silhouettes to graphic tees, here are the freshest looks dominating street fashion.',
    img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500',
    date: 'August 28, 2025',
    tags: ['Streetwear', 'Trends'],
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 px-6 bg-ink">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          From Our <span className="text-primary">Style Blog</span> ✍️
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <Link to={`/blog/${blog.id}`} key={blog.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="bg-plum/30 rounded-xl overflow-hidden group border border-lavender/20 h-full flex flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{blog.title}</h3>
                  <p className="text-lavender/70 text-sm mb-4 flex-grow">{blog.desc}</p>
                  <div className="flex items-center justify-between text-xs text-lavender/50 mt-auto">
                    <span>{blog.date}</span>
                    <div className="flex items-center gap-1 font-semibold text-primary/80 group-hover:text-primary transition-colors">
                      Read More <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;