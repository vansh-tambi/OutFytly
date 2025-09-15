// src/components/WishlistView.jsx
import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getWishlist } from '../api/wishlistService'; // ✅ 1. Import the API service
import toast from 'react-hot-toast';

const WishlistView = () => {
  // ✅ 2. Add state for full wishlist items and loading status
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 3. Fetch the populated wishlist data when the component mounts
  useEffect(() => {
    const loadWishlistItems = async () => {
      try {
        setLoading(true);
        const { data } = await getWishlist(); // Fetches the full product objects
        setWishlistItems(data);
      } catch (error) {
        toast.error("Could not load your wishlist.");
      } finally {
        setLoading(false);
      }
    };

    loadWishlistItems();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="w-10 h-10 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
      </div>
    );
  }
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold text-white mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-ink rounded-lg border border-lavender/20">
          <h2 className="text-2xl font-semibold text-white">Your wishlist is empty.</h2>
          <p className="text-lavender/70 mt-2">Heart some items to see them here!</p>
          <Link to="/browse">
            <motion.button whileHover={{ scale: 1.05 }} className="mt-6 bg-primary px-6 py-2 rounded-lg font-semibold text-white">
              Start Browsing
            </motion.button>
          </Link>
        </div>
      ) : (
        // ✅ 4. Map over the full product data and render ItemCards
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map(item => (
            <ItemCard key={item._id} {...item} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default WishlistView;