import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Heart, ShoppingCart, MinusCircle } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getThumbnailUrl, getPlaceholderUrl } from '../utils/imageUtils';

const ItemCard = React.memo(({ _id, title, rentalPrice, images, category, user }) => {
  const { toggleWishlistItem, isItemInWishlist, isToggling: isWishlistLoading } = useWishlist();
  const { cart, removeItem } = useCart();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isInWishlist = isItemInWishlist(_id);
  
  // Find if any variant (any size) of this product is in the cart
  const itemInCart = cart.items?.find(item => item.product?._id === _id);

  const imageUrl = images && images.length > 0
    ? getThumbnailUrl(images[0])
    : 'https://via.placeholder.com/300x300.png?text=No+Image';
  
  const placeholderUrl = images && images.length > 0
    ? getPlaceholderUrl(images[0])
    : 'https://via.placeholder.com/50x50.png?text=No+Image';

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlistLoading) return;
    toggleWishlistItem(_id);
  };
  
  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (itemInCart) {
      // If the item is in the cart, remove it.
      // Note: This removes all quantities/sizes of this product.
      removeItem(itemInCart._id); 
    } else {
      // If not in the cart, navigate to the details page to select size/dates
      navigate(`/item/${_id}`);
    }
  };

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 40, scale: 0.95 },
        whileInView: { opacity: 1, y: 0, scale: 1 }
      }}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative bg-ink text-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-primary/30 transition-shadow duration-300 flex flex-col w-full card-hover"
    >
      <motion.div 
        className="absolute top-3 right-3 z-10 flex flex-col gap-2"
        variants={{
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 }
        }}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Toggle Wishlist"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={isInWishlist ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              size={20}
              className={`transition-colors ${isInWishlist ? 'text-red-500 fill-current' : 'text-white'}`}
            />
          </motion.div>
        </motion.button>

        <motion.button
          onClick={handleCartClick}
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white transition-all"
          aria-label={itemInCart ? "Remove from cart" : "View to add to cart"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {itemInCart ? <MinusCircle size={20} className="text-red-400" /> : <ShoppingCart size={20} />}
        </motion.button>
      </motion.div>
      
      <Link to={`/item/${_id}`} className="block overflow-hidden aspect-square relative">
        {/* Blurred placeholder */}
        {!imageLoaded && (
          <motion.img
            src={placeholderUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
            aria-hidden="true"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        {/* Main image */}
        <motion.img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </Link>
      
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <motion.p 
          className="text-xs sm:text-sm text-primary mb-1 capitalize"
          variants={{
            initial: { opacity: 0, x: -10 },
            whileInView: { opacity: 1, x: 0 }
          }}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {category}
        </motion.p>
        <motion.h3 
          className="text-base sm:text-lg font-semibold truncate text-lavender/90" 
          title={title}
          variants={{
            initial: { opacity: 0, x: -10 },
            whileInView: { opacity: 1, x: 0 }
          }}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        
        {user?.name && (
          <motion.div 
            className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm mt-1 mb-2"
            variants={{
              initial: { opacity: 0, x: -10 },
              whileInView: { opacity: 1, x: 0 }
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <MapPin size={12} />
            <span>Listed by {user.name}</span>
          </motion.div>
        )}
        
        <div className="flex-grow"></div>
        
        <motion.p 
          className="text-white font-bold text-lg sm:text-xl mt-2"
          variants={{
            initial: { opacity: 0, y: 10 },
            whileInView: { opacity: 1, y: 0 }
          }}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          ₹{rentalPrice.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-gray-400">/ day</span>
        </motion.p>

        <Link to={`/item/${_id}`} className="block mt-3">
          <motion.button
            className="w-full bg-primary/90 text-white text-center py-2.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-primary transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
});

ItemCard.displayName = 'ItemCard';

export default ItemCard;