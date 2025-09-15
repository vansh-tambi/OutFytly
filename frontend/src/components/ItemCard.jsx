import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const ItemCard = ({ _id, title, rentalPrice, images, category, user }) => {
  // ✅ 1. Get the 'isToggling' state from the context
  const { toggleWishlistItem, isItemInWishlist, isToggling } = useWishlist();
  const isInWishlist = isItemInWishlist(_id);

  const imageUrl = images && images.length > 0
    ? images[0]
    : 'https://via.placeholder.com/300x300.png?text=No+Image';

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isToggling) return; // Prevent action if already processing
    toggleWishlistItem(_id);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-ink text-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-primary/30 flex flex-col"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleWishlistToggle}
        disabled={isToggling} // ✅ 2. Disable the button when toggling
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
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