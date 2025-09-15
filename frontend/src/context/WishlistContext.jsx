import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { addToWishlist, removeFromWishlist, getWishlist } from '../api/wishlistService';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);

  // Load the wishlist when the user logs in
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          const { data } = await getWishlist();
          // The API returns full product objects, but we only need their IDs for our state
          const wishlistIds = data.map(item => item._id);
          setWishlist(wishlistIds);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        }
      } else {
        // Clear wishlist on logout
        setWishlist([]);
      }
    };
    loadWishlist();
  }, [user]);

  // Check if an item is in the wishlist
  const isItemInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  // The main function to add or remove an item
  const toggleWishlistItem = async (productId) => {
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
      console.error("Failed to toggle wishlist item", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlistItem, isItemInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};