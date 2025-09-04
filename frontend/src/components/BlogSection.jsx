import React from "react";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Top 5 Wardrobe Essentials for 2025",
    desc: "Timeless pieces every closet needs to stay trendy and versatile.",
    img: "https://source.unsplash.com/400x300/?fashion,style",
  },
  {
    id: 2,
    title: "How to Style Bold Colors",
    desc: "A simple guide to mix vibrant tones without overdoing it.",
    img: "https://source.unsplash.com/400x300/?clothes,outfit",
  },
  {
    id: 3,
    title: "Streetwear Trends You Can’t Miss",
    desc: "The freshest looks dominating 2025 street fashion.",
    img: "https://source.unsplash.com/400x300/?streetwear,fashion",
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-plum">
        Fashion Insights
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <img src={blog.img} alt={blog.title} className="h-52 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-ink">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.desc}</p>
              <button className="mt-5 text-primary font-medium hover:underline">
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
