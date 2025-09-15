// src/components/ItemCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';      // ✅ 1. Import Heart icon
import { useWishlist } from '../context/WishlistContext'; // ✅ 1. Import Wishlist context

const ItemCard = ({ _id, title, rentalPrice, images, category, user }) => {
  // ✅ 2. Get wishlist functions and check if this item is in the wishlist
  const { toggleWishlistItem, isItemInWishlist } = useWishlist();
  const isInWishlist = isItemInWishlist(_id);

  const imageUrl = images && images.length > 0
    ? images[0]
    : 'https://via.placeholder.com/300x300.png?text=No+Image';

  // ✅ 3. Create a handler to toggle the item in the wishlist
  const handleWishlistToggle = (e) => {
    e.preventDefault(); // Prevent the link from navigating
    e.stopPropagation(); // Stop the event from bubbling up
    toggleWishlistItem(_id);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-ink text-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-primary/30 flex flex-col"
    >
      {/* ✅ 4. Add the Wishlist Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm"
        aria-label="Toggle Wishlist"
      >
        <Heart 
          size={20} 
          className={`transition-colors ${isInWishlist ? 'text-red-500 fill-current' : 'text-white'}`} 
        />
      </motion.button>
      
      <Link to={`/item/${_id}`} className="block overflow-hidden aspect-square">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <p className="text-sm text-primary mb-1 capitalize">{category}</p>
        <h3 className="text-lg font-semibold truncate text-lavender/90" title={title}>
          {title}
        </h3>
        
        {user?.name && (
          <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1 mb-3">
            <MapPin size={14} />
            <span>Listed by {user.name}</span>
          </div>
        )}
        
        <div className="flex-grow"></div>
        
        <p className="text-white font-bold text-xl mt-2">
          ₹{rentalPrice.toLocaleString()} <span className="text-sm font-normal text-gray-400">/ day</span>
        </p>

        <Link to={`/item/${_id}`} className="block mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full bg-primary/90 text-white text-center py-2.5 rounded-lg font-semibold hover:bg-primary transition-colors"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ItemCard;