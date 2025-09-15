import api from './axiosConfig';

export const getDashboardStats = async () => {
  try {
    const { data } = await api.get('/api/admin/stats');
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await api.get('/api/admin/users');
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`/api/admin/users/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await api.get('/api/admin/orders');
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}`, { status });
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};  

export const deleteProductByAdmin = async (id) => {
    const { data } = await api.delete(`/api/admin/products/${id}`);
    return data;
};