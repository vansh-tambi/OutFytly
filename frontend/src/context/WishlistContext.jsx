import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { addToWishlist, removeFromWishlist, getWishlist } from '../api/wishlistService';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // For initial page load
  const [isToggling, setIsToggling] = useState(false); // For button clicks
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        setLoading(true); // Use the main loading state for the initial fetch
        try {
          const { data } = await getWishlist();
          const wishlistIds = data.map(item => item._id);
          setWishlist(wishlistIds);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        } finally {
          setLoading(false); // ✅ FIX: Set loading to false after the fetch is complete
        }
      } else {
        setWishlist([]);
        setLoading(false);
      }
    };
    loadWishlist();
  }, [user]);

  const isItemInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const toggleWishlistItem = async (productId) => {
    if (isToggling) return; // Prevent multiple clicks
    setIsToggling(true);
    const inWishlist = isItemInWishlist(productId);
    try {
      if (inWishlist) {
        await removeFromWishlist(productId);
        setWishlist(prev => prev.filter(id => id !== productId));
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(productId);
        setWishlist(prev => [...prev, productId]);
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      toast.error('Could not update wishlist.');
    } finally {
      setIsToggling(false);
    }
  };
  
  // Expose the 'isToggling' state for the button to use
  return (
    <WishlistContext.Provider value={{ wishlist, loading, isToggling, toggleWishlistItem, isItemInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};