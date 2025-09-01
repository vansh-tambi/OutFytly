// src/components/BlogSection.jsx
import React from "react";

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
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-plum">
        Fashion Insights
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img src={blog.img} alt={blog.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-ink">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.desc}</p>
              <button className="mt-4 text-primary font-medium hover:underline">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
