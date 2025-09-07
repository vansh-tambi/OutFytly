// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast'; // Import Toaster

const MainLayout = () => {
  return (
    <div className="bg-ink text-lavender min-h-screen flex flex-col">
      {/* --- Toaster for site-wide notifications --- */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#201825', // plum
            color: '#BEA0D3', // lavender
            border: '1px solid #8A2BE1', // primary
          },
        }}
      />
      
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;