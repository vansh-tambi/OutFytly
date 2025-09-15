import api from './axiosConfig';

export const fetchMyOrders = async () => {
  try {
    const { data } = await api.get('/api/orders/myorders');
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};