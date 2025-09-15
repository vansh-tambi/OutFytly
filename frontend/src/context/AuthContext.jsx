// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';
import api from '../api/axiosConfig';

export const AuthContext = createContext();

const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('userInfo')) || null;
  } catch (error) {
    console.error("Could not parse user info from localStorage", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());

  // ✅ THE FIX IS HERE
  const signup = async (formData) => {
    // 1. Accept a single 'formData' object
    const { fullName, email, password, location } = formData;

    // 2. Send the correct fields to the backend API (fullName is mapped to name)
    const { data } = await api.post('/api/auth/register', { 
      name: fullName, 
      email, 
      password, 
      location 
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const forgotPassword = async (email) => {
    const { data } = await api.post('/api/auth/forgot-password', { email });
    return data.message;
  };

  const resetPassword = async (token, password) => {
    const { data } = await api.put(`/api/auth/reset-password/${token}`, { password });
    return data.message;
  };

  const updateUserProfile = async (profileData) => {
    const { data } = await api.put('/api/users/profile', profileData);
    const currentUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const updatedUserInfo = { ...currentUserInfo, ...data };
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    setUser(updatedUserInfo);
    return updatedUserInfo;
  };

  const value = {
    user,
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};