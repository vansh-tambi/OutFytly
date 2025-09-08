import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const getUserFromStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('userInfo')) || null;
    } catch (error) {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());

  useEffect(() => {
    setUser(getUserFromStorage());
  }, []);

  const signup = async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const { data } = await axios.post('/api/auth/forgot-password', { email });
      return data.message;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const { data } = await axios.put(`/api/auth/reset-password/${token}`, { password });
      return data.message;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const value = {
    user,
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // ✅ CORRECTED THIS LINE
};

export const useAuth = () => {
  return useContext(AuthContext);
};