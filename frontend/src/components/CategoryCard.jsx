import React from "react";

const CategoryCard = ({ title, image }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-plum/80 to-transparent flex items-end">
        <h3 className="text-white text-lg font-semibold px-4 pb-3">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
