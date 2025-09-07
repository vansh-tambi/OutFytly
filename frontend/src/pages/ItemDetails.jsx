// src/pages/ItemDetails.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Ruler, UserCircle, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"; // Import the useCart hook
import toast from "react-hot-toast"; // Import toast

// --- Corrected Data with all necessary properties ---
const allItems = [
    { id: "1", title: "Designer Saree", price: 2000, location: "Mumbai", category: "Party Wear", images: ["https://images.unsplash.com/photo-1623547372431-9549154a15a0?w=600", "https://images.unsplash.com/photo-1583542224773-61878843936a?w=600", "https://images.unsplash.com/photo-1598110753697-3501003666dd?w=600"], description: "A stunning silk saree, perfect for weddings and festive occasions. Intricate embroidery with a modern design.", seller: "Ritu's Boutique" },
    { id: "2", title: "Luxury Heels", price: 900, location: "Delhi", category: "Shoes", images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600", "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600", "https://images.unsplash.com/photo-1590099033615-77535a092429?w=600"], description: "Elegant high heels with a comfortable insole and a timeless design. Made from premium vegan leather.", seller: "Step Up" },
    // ... all other items
];

// ... (Accordion component code remains the same)
const Accordion = ({ title, children }) => { /* ... */ };

const ItemDetails = () => {
  const { id } = useParams();
  const { dispatch } = useCart(); // Get the dispatch function from context
  const item = allItems.find(item => item.id === id);
  
  const [selectedImage, setSelectedImage] = useState(item ? item.images[0] : null);
  const [selectedSize, setSelectedSize] = useState("M");

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.images[0],
        size: selectedSize,
      }
    });
    toast.success(`${item.title} added to cart!`);
  };

  if (!item) { /* ... ("Item Not Found" code remains the same) */ }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* --- Image Gallery (Unchanged) --- */}
        <div>
            {/* ... */}
        </div>
        {/* --- Item Information --- */}
        <div className="text-white">
          {/* ... (All other info remains the same) ... */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.button 
              onClick={handleAddToCart} // Attach the handler here
              whileTap={{ scale: 0.95 }} 
              className="flex-1 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20}/> Add to Cart
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} className="flex-1 bg-lavender text-plum px-8 py-3 rounded-lg font-semibold hover:bg-white transition">
              Rent Now
            </motion.button>
          </div>
          {/* ... (Accordion sections remain the same) ... */}
        </div>
      </div>
    </motion.div>
  );
};

export default ItemDetails;