import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { UploadCloud, Trash2 } from "lucide-react";
import {
  createProduct,
  fetchMyListings,
  deleteProduct,
} from "../api/productService";
import { fetchDashboardStats } from "../api/userService";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";

// --- Data for Form Inputs ---
const categories = [
  "Party Wear",
  "Watches",
  "Shoes",
  "Accessories",
  "Casual Wear",
  "Formal Wear",
];
const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const shoeSizes = ["6", "7", "8", "9", "10", "11", "12"];
const clothingCategories = ["Party Wear", "Casual Wear", "Formal Wear"];

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const selectedCategory = watch("category");

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalEarnings: 0, itemsRented: 0 });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [listingsData, statsData] = await Promise.all([
        fetchMyListings(),
        fetchDashboardStats(),
      ]);
      setListings(listingsData);
      setStats(statsData);
    } catch (error) {
      toast.error("Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("rentalPrice", data.rentalPrice);
      formData.append("category", data.category);

      // ✅ FIX: Handle both single (string) and multiple (array) size selections
      if (data.sizes) {
        if (Array.isArray(data.sizes)) {
          // For checkboxes (like shoes) which return an array
          formData.append("sizes", data.sizes.join(","));
        } else {
          // For radio buttons (like clothes) which return a string
          formData.append("sizes", data.sizes);
        }
      }

      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }

      await createProduct(formData);
      toast.success("Product listed successfully!");
      reset();
      loadDashboardData();
    } catch (error) {
      toast.error(error.message || "An unknown error occurred.");
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(itemToDelete._id);
      toast.success("Item deleted successfully!");
      setListings((prev) =>
        prev.filter((item) => item._id !== itemToDelete._id)
      );
      const statsData = await fetchDashboardStats();
      setStats(statsData);
      setItemToDelete(null);
    } catch (error) {
      toast.error(error.message || "Could not delete item.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-6">Seller Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-ink p-6 rounded-xl border border-lavender/20">
            <h3 className="text-lavender/70 text-sm font-medium">Total Earnings</h3>
            <p className="text-3xl font-bold text-white mt-2">
              ₹{loading ? "..." : stats.totalEarnings.toLocaleString()}
            </p>
          </div>
          <div className="bg-ink p-6 rounded-xl border border-lavender/20">
            <h3 className="text-lavender/70 text-sm font-medium">Active Listings</h3>
            <p className="text-3xl font-bold text-white mt-2">
              {loading ? "..." : listings.length}
            </p>
          </div>
          <div className="bg-ink p-6 rounded-xl border border-lavender/20">
            <h3 className="text-lavender/70 text-sm font-medium">Items Rented</h3>
            <p className="text-3xl font-bold text-white mt-2">
              {loading ? "..." : stats.itemsRented}
            </p>
          </div>
        </div>

        <div className="bg-ink p-8 rounded-2xl shadow-lg border border-lavender/20 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-lavender flex items-center gap-3">
            <UploadCloud /> List a New Item
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g. Elegant Silk Saree"
                  className="form-input mt-2"
                />
                {errors.title && <p className="form-error">{errors.title.message}</p>}
              </div>
              <div>
                <label className="form-label">Rental Price (₹)</label>
                <input
                  {...register("rentalPrice", {
                    required: "Price is required",
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="e.g. 1500"
                  className="form-input mt-2"
                />
                {errors.rentalPrice && <p className="form-error">{errors.rentalPrice.message}</p>}
              </div>
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Describe your item..."
                rows="4"
                className="form-input mt-2"
              />
              {errors.description && <p className="form-error">{errors.description.message}</p>}
            </div>
            <div>
              <label className="form-label">Category</label>
              <select {...register("category", { required: "Category is required" })} className="form-input mt-2">
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="form-error">{errors.category.message}</p>}
            </div>

            {clothingCategories.includes(selectedCategory) && (
              <div>
                <label className="form-label">Available Size</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2">
                  {clothingSizes.map((size) => (
                    <label key={size} className="flex items-center justify-center gap-2 p-3 rounded-md bg-plum/50 has-[:checked]:bg-primary/30 border border-transparent has-[:checked]:border-primary transition cursor-pointer">
                      <input
                        type="radio" // ✅ FIX: Changed to radio buttons
                        {...register("sizes", { required: "A size is required" })}
                        value={size}
                        className="h-4 w-4 rounded-full bg-ink border-lavender/50 text-primary focus:ring-primary"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
                {errors.sizes && <p className="form-error">{errors.sizes.message}</p>}
              </div>
            )}

            {selectedCategory === "Shoes" && (
              <div>
                <label className="form-label">Available Sizes (UK)</label>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mt-2">
                  {shoeSizes.map((size) => (
                    <label key={size} className="flex items-center justify-center gap-2 p-3 rounded-md bg-plum/50 has-[:checked]:bg-primary/30 border border-transparent has-[:checked]:border-primary transition cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("sizes", { required: "Select at least one size" })}
                        value={size}
                        className="h-4 w-4 rounded bg-ink border-lavender/50 text-primary focus:ring-primary"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
                {errors.sizes && <p className="form-error">{errors.sizes.message}</p>}
              </div>
            )}

            <div>
              <label className="form-label">Images (up to 5)</label>
              <input
                {...register("images", { required: "At least one image is required" })}
                type="file"
                multiple
                accept="image/*,.webp"
                className="form-input mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
              />
              {errors.images && <p className="form-error">{errors.images.message}</p>}
            </div>
            
            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting} className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/80 transition disabled:opacity-50">
                {isSubmitting ? "Listing Item..." : "List Your Item"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-ink p-8 rounded-2xl shadow-lg border border-lavender/20">
          <h2 className="text-2xl font-semibold mb-6 text-lavender">My Listings</h2>
          <div className="space-y-4">
            {loading ? ( <p className="text-lavender/70 text-center">Loading your listings...</p> ) : 
            listings.length > 0 ? (
              listings.map((item) => (
                <div key={item._id} className="flex items-center gap-4 bg-plum/50 p-3 rounded-lg">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-primary">₹{item.rentalPrice}</p>
                  </div>
                  <button onClick={() => setItemToDelete(item)} className="p-2 rounded-md hover:bg-red-500/20 text-red-400 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-lavender/70 text-center py-4">You haven't listed any items yet.</p>
            )}
          </div>
        </div>
      </motion.div>

      <ConfirmationModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Listing?"
        message={`Are you sure you want to permanently delete "${itemToDelete?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default Dashboard;