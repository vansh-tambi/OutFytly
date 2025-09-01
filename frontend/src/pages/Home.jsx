import React from "react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import CategoryCard from "../components/CategoryCard";
import ItemCard from "../components/ItemCard";

const Home = () => {
  return (
    <div>
      <Hero />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <SectionTitle title="Browse by Category" subtitle="Find the perfect outfit for every occasion" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <CategoryCard title="Party Wear" image="https://picsum.photos/400/300?party" />
          <CategoryCard title="Watches" image="https://picsum.photos/400/300?watch" />
          <CategoryCard title="Shoes" image="https://picsum.photos/400/300?shoes" />
          <CategoryCard title="Accessories" image="https://picsum.photos/400/300?accessories" />
        </div>
      </section>

      {/* Popular Listings */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <SectionTitle title="Popular Listings" subtitle="See what people are renting the most" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          <ItemCard id="1" title="Luxury Suit" price="1500" location="Delhi" image="https://picsum.photos/400/300?suit" />
          <ItemCard id="2" title="Elegant Dress" price="1200" location="Mumbai" image="https://picsum.photos/400/300?dress" />
          <ItemCard id="3" title="Classic Watch" price="800" location="Bangalore" image="https://picsum.photos/400/300?watch" />
          <ItemCard id="4" title="Trendy Shoes" price="600" location="Hyderabad" image="https://picsum.photos/400/300?shoes" />
        </div>
      </section>
    </div>
  );
};

export default Home;
