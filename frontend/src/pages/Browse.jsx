// src/pages/Browse.jsx
import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import SectionTitle from "../components/SectionTitle";
import { motion } from "framer-motion";

const Browse = () => {
  const [location, setLocation] = useState("All Locations");
  const [category, setCategory] = useState("All Categories");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-ink min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Browse Outfits"
          subtitle="Filter and find your perfect outfit"
        />

        {/* Filters */}
        <div className="bg-plum text-white p-6 rounded-xl shadow-lg mb-10 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex gap-4 flex-wrap">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 rounded-lg bg-ink border border-lavender text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Locations</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-ink border border-lavender text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Categories</option>
              <option>Party Wear</option>
              <option>Watches</option>
              <option>Shoes</option>
              <option>Accessories</option>
            </select>
          </div>

          <button className="bg-primary hover:bg-lavender px-5 py-2 rounded-lg text-white font-semibold transition">
            Apply Filters
          </button>
        </div>

        {/* Item Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={item}>
            <ItemCard
              id="1"
              title="Designer Saree"
              price="2000"
              location="Mumbai"
              image="https://picsum.photos/400/300?saree"
            />
          </motion.div>
          <motion.div variants={item}>
            <ItemCard
              id="2"
              title="Luxury Heels"
              price="900"
              location="Delhi"
              image="https://picsum.photos/400/300?heels"
            />
          </motion.div>
          <motion.div variants={item}>
            <ItemCard
              id="3"
              title="Formal Blazer"
              price="1500"
              location="Bangalore"
              image="https://picsum.photos/400/300?blazer"
            />
          </motion.div>
          <motion.div variants={item}>
            <ItemCard
              id="4"
              title="Smart Watch"
              price="700"
              location="Hyderabad"
              image="https://picsum.photos/400/300?watch"
            />
          </motion.div>
        </motion.div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:bg-lavender transition"
          >
            Load More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Browse;
