// src/api/productService.js
import api from "./axiosConfig";

// Fetch a list of all products based on filters
export const fetchProducts = async (params) => {
  try {
    const { data } = await api.get("/api/products", { params });
    return data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

// Fetch a single product by its ID
export const fetchProductById = async (id) => {
  try {
    const { data } = await api.get(`/api/products/${id}`);
    return data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

// Fetch only the listings for the logged-in user
export const fetchMyListings = async () => {
  try {
    const { data } = await api.get("/api/products/my-listings");
    return data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    // ✅ THE FIX IS HERE: The manual headers object has been removed.
    const { data } = await api.post("/api/products", productData);
    return data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await api.delete(`/api/products/${id}`);
    return data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};