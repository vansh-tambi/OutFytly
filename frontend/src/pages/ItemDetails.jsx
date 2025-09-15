// src/pages/ItemDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Ruler, ShoppingCart, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { fetchProductById } from '../api/productService';

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
  const { cart, addItem, updateQuantity } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const sizeRequiredCategories = ["Party Wear", "Casual Wear", "Formal Wear", "Shoes"];

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
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
        toast.error("Could not load product details.");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  // Determine the correct size to look for in the cart
  const sizeToFindInCart = (product && sizeRequiredCategories.includes(product.category))
    ? selectedSize
    : 'Standard';

  const existingCartItem = cart.items?.find(
    item => item.product?._id === id && item.size === sizeToFindInCart
  );

  const handleCartAction = async () => {
    if (sizeRequiredCategories.includes(product.category) && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    setIsProcessing(true);

    try {
      if (existingCartItem) {
        await updateQuantity(existingCartItem._id, existingCartItem.quantity + 1);
        toast.success('Quantity updated in cart!');
      } else {
        await addItem({ 
          product: product._id, 
          size: selectedSize || 'Standard', 
          quantity: 1 
        });
      }
    } catch (error) {
      console.error("Cart action failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-ink flex justify-center items-center text-white">Loading Product...</div>;
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
          <div>
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={selectedImage}
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
                  src={img}
                  alt={`${product.title} thumbnail`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-1/5 cursor-pointer rounded-lg aspect-square object-cover border-2 transition ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </div>

          <div className="text-white">
            <p className="text-primary font-semibold mb-2">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">{product.title}</h1>
            
            <p className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              ₹{product.rentalPrice.toLocaleString()}
              <span className="text-lg font-normal text-lavender/60"> / day</span>
            </p>

            {sizeRequiredCategories.includes(product.category) && (
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-lavender flex items-center gap-2"><Ruler size={18} /> Size</h3>
                <div className="flex gap-3 flex-wrap">
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
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button 
                onClick={handleCartAction} 
                disabled={isProcessing}
                whileTap={{ scale: isProcessing ? 1 : 0.95 }} 
                className="flex-1 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {existingCartItem ? <PlusCircle size={20}/> : <ShoppingCart size={20}/>}
                {isProcessing 
                  ? 'Processing...' 
                  : existingCartItem 
                    ? 'Add One More' 
                    : 'Add to Cart'
                }
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