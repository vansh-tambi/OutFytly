// src/pages/ItemDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <img
          src={`https://picsum.photos/600/500?random=${id}`}
          alt="Item"
          className="rounded-lg shadow-md"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Luxury Outfit #{id}</h1>
          <p className="text-gray-600 mb-6">
            Perfect for parties, weddings, and special occasions. High-quality
            fabric and premium design.
          </p>
          <p className="text-2xl font-semibold text-primary mb-4">₹1500</p>
          <p className="mb-6">📍 Location: Delhi</p>
          <div className="flex gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-ink transition">
              Rent Now
            </button>
            <button className="bg-lavender text-plum px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
