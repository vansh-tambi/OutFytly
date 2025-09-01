import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ id, title, price, location, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Image */}
      <Link to={`/item/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-ink font-semibold text-lg truncate">{title}</h3>
        <p className="text-plum text-sm mb-2">{location}</p>
        <p className="text-primary font-bold">₹{price} / day</p>

        <Link
          to={`/item/${id}`}
          className="inline-block mt-3 w-full bg-primary text-white text-center py-2 rounded-xl hover:bg-lavender transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
