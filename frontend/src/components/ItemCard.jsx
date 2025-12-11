import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Heart, ShoppingCart, MinusCircle } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getThumbnailUrl } from '../utils/imageUtils';

const ItemCard = React.memo(({ _id, title, rentalPrice, images, category, user }) => {
  const { toggleWishlistItem, isItemInWishlist, isToggling: isWishlistLoading } = useWishlist();
  const { cart, removeItem } = useCart();
  const navigate = useNavigate();
  
  const isInWishlist = isItemInWishlist(_id);
  
  // Find if any variant (any size) of this product is in the cart
  const itemInCart = cart.items?.find(item => item.product?._id === _id);

  const imageUrl = images && images.length > 0
    ? getThumbnailUrl(images[0])
    : 'https://via.placeholder.com/300x300.png?text=No+Image';

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
    <div
      className="relative bg-ink text-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-primary/30 hover:-translate-y-1 transition-transform duration-200 ease-out flex flex-col w-full"
    >
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
          aria-label="Toggle Wishlist"
        >
          <Heart
            size={20}
            className={`transition-colors ${isInWishlist ? 'text-red-500 fill-current' : 'text-white'}`}
          />
        </button>

        <button
          onClick={handleCartClick}
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white active:scale-95 transition-transform"
          aria-label={itemInCart ? "Remove from cart" : "View to add to cart"}
        >
          {itemInCart ? <MinusCircle size={20} className="text-red-400" /> : <ShoppingCart size={20} />}
        </button>
      </div>
      
      <Link to={`/item/${_id}`} className="block overflow-hidden aspect-square">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <p className="text-xs sm:text-sm text-primary mb-1 capitalize">{category}</p>
        <h3 className="text-base sm:text-lg font-semibold truncate text-lavender/90" title={title}>
          {title}
        </h3>
        
        {user?.name && (
          <div className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm mt-1 mb-2">
            <MapPin size={12} />
            <span>Listed by {user.name}</span>
          </div>
        )}
        
        <div className="flex-grow"></div>
        
        <p className="text-white font-bold text-lg sm:text-xl mt-2">
          ₹{rentalPrice.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-gray-400">/ day</span>
        </p>

        <Link to={`/item/${_id}`} className="block mt-3">
          <button
            className="w-full bg-primary/90 text-white text-center py-2.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-primary hover:scale-105 active:scale-95 transition-all"
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
});

ItemCard.displayName = 'ItemCard';

export default ItemCard;