import api from './axiosConfig';

export const getCart = async () => {
  const { data } = await api.get('/api/cart');
  return data;
};

export const addItemToCart = async (itemData) => {
  const { data } = await api.post('/api/cart', itemData);
  return data;
};

export const updateItemQuantity = async (itemId, quantity) => {
  const { data } = await api.put(`/api/cart/${itemId}`, { quantity });
  return data;
};

export const removeItemFromCart = async (itemId) => {
  const { data } = await api.delete(`/api/cart/${itemId}`);
  return data;
};

// ✅ ADD THIS FUNCTION
export const clearCart = async () => {
  const { data } = await api.delete('/api/cart');
  return data;
};