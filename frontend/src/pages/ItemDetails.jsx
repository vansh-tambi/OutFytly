import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Ruler, UserCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { fetchProductById } from '../api/productService'; // Import the API service

// Reusable Accordion Component
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-lavender/20 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left text-lavender/80 hover:text-white">
        <span className="font-semibold">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: '16px' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden text-lavender/60 text-sm leading-relaxed"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ItemDetails = () => {
  const { id } = useParams();
  const { dispatch } = useCart();

  // --- NEW: State for live data, loading, and errors ---
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // --- NEW: useEffect to fetch data from the backend ---
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
        if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]); // Refetch if the ID in the URL changes

  const handleAddToCart = () => {
    if (!selectedSize) {
        toast.error("Please select a size.");
        return;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product._id, // Use _id from MongoDB
        title: product.title,
        price: product.rentalPrice,
        image: product.images[0],
        size: selectedSize,
      }
    });
    toast.success(`${product.title} added to cart!`);
  };

  // --- Loading and Error State Handling ---
  if (loading) {
    return <div className="min-h-screen bg-ink flex justify-center items-center text-white">Loading Product...</div>;
  }
  if (error) {
    return <div className="min-h-screen bg-ink flex justify-center items-center text-red-500">Error: {error}</div>;
  }
  if (!product) {
    return (
      <div className="min-h-screen bg-ink text-center py-40">
        <h2 className="text-4xl font-bold text-white">Product Not Found</h2>
        <Link to="/browse" className="mt-8 inline-block bg-primary px-8 py-3 rounded-lg text-white font-semibold">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ink min-h-screen">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* --- Image Gallery --- */}
            <div>
            <AnimatePresence mode="wait">
                <motion.img
                key={selectedImage}
                src={`/${selectedImage}`} // Assuming image paths are relative from the backend
                alt={product.title}
                className="w-full h-auto object-cover rounded-2xl shadow-2xl shadow-plum/50 aspect-square"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                />
            </AnimatePresence>
            <div className="flex gap-4 mt-4">
                {product.images.map((img) => (
                <motion.img
                    key={img}
                    src={`/${img}`}
                    alt={`${product.title} thumbnail`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-1/5 cursor-pointer rounded-lg aspect-square object-cover border-2 transition ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
                    whileHover={{ scale: 1.05 }}
                />
                ))}
            </div>
            </div>

            {/* --- Item Information --- */}
            <div className="text-white">
            <p className="text-primary font-semibold mb-2">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">{product.title}</h1>
            
            <p className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                ₹{product.rentalPrice.toLocaleString()}
                <span className="text-lg font-normal text-lavender/60"> / day</span>
            </p>

            <div className="mb-8">
                <h3 className="font-semibold mb-3 text-lavender flex items-center gap-2"><Ruler size={18} /> Size</h3>
                <div className="flex gap-3">
                {product.sizes.map(size => (
                    <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${selectedSize === size ? 'bg-primary border-primary' : 'bg-ink border-lavender/30 hover:border-lavender'}`}
                    >
                    {size}
                    </button>
                ))}
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button onClick={handleAddToCart} whileTap={{ scale: 0.95 }} className="flex-1 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                <ShoppingCart size={20}/> Add to Cart
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} className="flex-1 bg-lavender text-plum px-8 py-3 rounded-lg font-semibold hover:bg-white transition">
                Rent Now
                </motion.button>
            </div>
            
            <Accordion title="Description">
                <p>{product.description}</p>
            </Accordion>
            <Accordion title="Materials & Care">
                <p>Main: 100% Silk. Lining: 100% Viscose. Professional dry clean only.</p>
            </Accordion>
            </div>
        </div>
        </motion.div>
    </div>
  );
};

export default ItemDetails;