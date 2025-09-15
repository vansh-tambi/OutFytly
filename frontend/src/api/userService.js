// src/api/userService.js
import api from "./axiosConfig";

export const fetchDashboardStats = async () => {
  try {
    const { data } = await api.get("/api/users/dashboard-stats");
    return data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};