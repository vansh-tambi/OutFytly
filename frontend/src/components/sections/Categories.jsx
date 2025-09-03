// src/components/sections/Categories.jsx
import React from "react";

const categories = [
  { id: 1, name: "Men", image: "/images/men.jpg" },
  { id: 2, name: "Women", image: "/images/women.jpg" },
  { id: 3, name: "Kids", image: "/images/kids.jpg" },
  { id: 4, name: "Accessories", image: "/images/accessories.jpg" },
];

const Categories = () => {
  return (
    <section className="py-16 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <p className="text-lg font-semibold">{cat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
