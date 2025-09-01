import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ItemCard from "../components/ItemCard";

const mockItems = [
  { id: 1, title: "Luxury Suit", price: 1500, location: "Delhi", image: "https://picsum.photos/400/300?suit" },
  { id: 2, title: "Elegant Dress", price: 1200, location: "Mumbai", image: "https://picsum.photos/400/300?dress" },
  { id: 3, title: "Classic Watch", price: 800, location: "Bangalore", image: "https://picsum.photos/400/300?watch" },
  { id: 4, title: "Trendy Shoes", price: 600, location: "Hyderabad", image: "https://picsum.photos/400/300?shoes" },
];

const Browse = () => {
  const [search, setSearch] = useState("");

  const filteredItems = mockItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SectionTitle
        title="Browse All Outfits"
        subtitle="Filter through thousands of rentals and find your style"
      />

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search outfits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <ItemCard key={item.id} {...item} />)
        ) : (
          <p className="text-center col-span-full text-plum text-lg">No items found</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
