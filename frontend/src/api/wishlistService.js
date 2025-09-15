import api from "./axiosConfig";

// Add a product to the wishlist
export const addToWishlist = (productId) => {
  return api.post(`/api/users/wishlist/${productId}`);
};

// Remove a product from the wishlist
export const removeFromWishlist = (productId) => {
  return api.delete(`/api/users/wishlist/${productId}`);
};

// Get all wishlist items
export const getWishlist = () => {
  return api.get('/api/users/wishlist');
};