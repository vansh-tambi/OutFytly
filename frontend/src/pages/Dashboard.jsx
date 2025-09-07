// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { UploadCloud, Trash2 } from 'lucide-react';
// import ConfirmationModal from '../components/ConfirmationModal'; // We'll create this next

const Dashboard = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [listings, setListings] = useState([
    { id: 1, name: "Luxury Suit", price: 1500, image: 'https://images.unsplash.com/photo-1593032583849-5db2699a0e63?w=500' },
    { id: 2, name: "Classic Watch", price: 800, image: 'https://images.unsplash.com/photo-1620625442228-5654a81b3929?w=500' },
  ]);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState(null);

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newItem = {
      id: listings.length + 3,
      name: data.title,
      price: data.price,
      image: 'https://images.unsplash.com/photo-1578939654256-636c7a456105?w=500' // Placeholder
    };
    setListings([...listings, newItem]);
    console.log("New Item:", data);
    reset();
  };
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold text-white mb-6">Seller Dashboard</h1>
      
      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Card Example */}
        <div className="bg-ink p-6 rounded-xl border border-lavender/20">
          <h3 className="text-lavender/70 text-sm font-medium">Total Earnings</h3>
          <p className="text-3xl font-bold text-white mt-2">₹12,500</p>
        </div>
        <div className="bg-ink p-6 rounded-xl border border-lavender/20">
          <h3 className="text-lavender/70 text-sm font-medium">Active Listings</h3>
          <p className="text-3xl font-bold text-white mt-2">{listings.length}</p>
        </div>
        <div className="bg-ink p-6 rounded-xl border border-lavender/20">
          <h3 className="text-lavender/70 text-sm font-medium">Items Rented</h3>
          <p className="text-3xl font-bold text-white mt-2">32</p>
        </div>
      </div>

      {/* --- Upload Item Form --- */}
      <div className="bg-ink p-8 rounded-2xl shadow-lg border border-lavender/20 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-lavender flex items-center gap-3"><UploadCloud /> List a New Item</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <input {...register("title", { required: "Title is required" })} placeholder="Title" className="form-input" />
            {errors.title && <p className="form-error">{errors.title.message}</p>}
          </div>
          <div className="md:col-span-2">
            <textarea {...register("description")} placeholder="Description" rows="4" className="form-input" />
          </div>
          <div>
            <input {...register("price", { required: "Price is required", valueAsNumber: true })} type="number" placeholder="Price (₹)" className="form-input" />
            {errors.price && <p className="form-error">{errors.price.message}</p>}
          </div>
          <div>
            <input {...register("images", { required: "At least one image is required" })} type="file" multiple className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30" />
            {errors.images && <p className="form-error">{errors.images.message}</p>}
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/80 transition">Upload Item</button>
          </div>
        </form>
      </div>

      {/* --- Manage Listings --- */}
      <div className="bg-ink p-8 rounded-2xl shadow-lg border border-lavender/20">
        <h2 className="text-2xl font-semibold mb-6 text-lavender">My Listings</h2>
        <div className="space-y-4">
          {listings.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-plum/50 p-3 rounded-lg">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
              <div className="flex-grow">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-primary">₹{item.price}</p>
              </div>
              <button className="p-2 rounded-md hover:bg-red-500/20 text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;