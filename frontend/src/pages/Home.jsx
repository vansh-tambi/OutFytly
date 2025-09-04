// src/pages/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/sections/Hero";
import SectionTitle from "../components/SectionTitle";
import CategoryCard from "../components/CategoryCard";
import ItemCard from "../components/ItemCard";
import CTA from "../components/CTA";
import FAQ from "../components/sections/FAQ";
import HowItWorks from "../components/sections/HowItWorks";
import AppDownload from "../components/sections/AppDownload";
import Contact from "../components/sections/Contact";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Home = () => {
  return (
    <div className="bg-ink text-white">
      {/* Hero */}
      <Hero />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <SectionTitle
          title="Browse by Category"
          subtitle="Find the perfect outfit for every occasion"
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
        >
          <motion.div variants={item}>
            <CategoryCard
              title="Party Wear"
              image="https://picsum.photos/400/300?party"
            />
          </motion.div>
          <motion.div variants={item}>
            <CategoryCard
              title="Watches"
              image="https://picsum.photos/400/300?watch"
            />
          </motion.div>
          <motion.div variants={item}>
            <CategoryCard
              title="Shoes"
              image="https://picsum.photos/400/300?shoes"
            />
          </motion.div>
          <motion.div variants={item}>
            <CategoryCard
              title="Accessories"
              image="https://picsum.photos/400/300?accessories"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Popular Listings */}
      <section className="bg-plum py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Popular Listings"
            subtitle="See what people are renting the most"
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10"
          >
            <motion.div variants={item}>
              <ItemCard
                id="1"
                title="Luxury Suit"
                price="1500"
                location="Delhi"
                image="https://picsum.photos/400/300?suit"
              />
            </motion.div>
            <motion.div variants={item}>
              <ItemCard
                id="2"
                title="Elegant Dress"
                price="1200"
                location="Mumbai"
                image="https://picsum.photos/400/300?dress"
              />
            </motion.div>
            <motion.div variants={item}>
              <ItemCard
                id="3"
                title="Classic Watch"
                price="800"
                location="Bangalore"
                image="https://picsum.photos/400/300?watch"
              />
            </motion.div>
            <motion.div variants={item}>
              <ItemCard
                id="4"
                title="Trendy Shoes"
                price="600"
                location="Hyderabad"
                image="https://picsum.photos/400/300?shoes"
              />
            </motion.div>
          </motion.div>

          {/* See More CTA */}
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:bg-lavender transition"
            >
              View More Outfits
            </motion.button>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <CTA />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ */}
      <FAQ />

      {/* App Download */}
      <AppDownload />

      {/* Contact */}
      <Contact />
    </div>
  );
};

export default Home;
