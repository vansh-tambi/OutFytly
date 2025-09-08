import api from './axiosConfig'; // Our configured axios instance

// Fetch a list of products based on filters
export const fetchProducts = async (params) => {
  try {
    const { data } = await api.get('/api/products', { params });
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