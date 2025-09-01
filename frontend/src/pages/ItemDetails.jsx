import React from "react";
import { useParams, Link } from "react-router-dom";

const mockItems = {
  1: { title: "Luxury Suit", price: 1500, location: "Delhi", description: "Perfect for weddings and formal events.", image: "https://picsum.photos/600/400?suit" },
  2: { title: "Elegant Dress", price: 1200, location: "Mumbai", description: "Beautiful dress for evening parties.", image: "https://picsum.photos/600/400?dress" },
  3: { title: "Classic Watch", price: 800, location: "Bangalore", description: "Timeless style with modern elegance.", image: "https://picsum.photos/600/400?watch" },
  4: { title: "Trendy Shoes", price: 600, location: "Hyderabad", description: "Comfortable and stylish for all-day wear.", image: "https://picsum.photos/600/400?shoes" },
};

const ItemDetails = () => {
  const { id } = useParams();
  const item = mockItems[id];

  if (!item) return <p className="text-center mt-20 text-xl">Item not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-ink">{item.title}</h2>
          <p className="text-plum mt-2">{item.location}</p>
          <p className="text-primary font-bold text-2xl mt-4">₹{item.price} / day</p>
          <p className="mt-6 text-gray-700">{item.description}</p>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-lavender transition">
            Rent Now
          </button>
          <Link to="/browse" className="px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition">
            Back to Browse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
