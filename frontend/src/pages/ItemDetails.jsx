import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Ruler, ShoppingCart, PlusCircle, Star, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { fetchProductById, createProductReview } from '../api/productService';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

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

// Add Review Form Component
const AddReviewForm = ({ productId, onReviewAdded }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await createProductReview(productId, { rating: Number(data.rating), comment: data.comment });
            toast.success("Review submitted!");
            reset();
            if (onReviewAdded) onReviewAdded();
        } catch (error) {
            toast.error(error.toString());
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-plum/30 p-4 rounded-lg space-y-3 my-6">
            <h4 className="font-semibold text-white">Leave a Review</h4>
            <div>
                <label className="form-label text-sm">Your Rating</label>
                <select {...register("rating", { required: "Rating is required" })} className="form-input mt-1">
                    <option value="">Select...</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                </select>
                {errors.rating && <p className="form-error">{errors.rating.message}</p>}
            </div>
            <div>
                <label className="form-label text-sm">Your Comment</label>
                <textarea {...register("comment", { required: "A comment is required" })} rows="3" placeholder="Tell us what you think..." className="form-input mt-1"></textarea>
                {errors.comment && <p className="form-error">{errors.comment.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};


const ItemDetails = () => {
  const { id } = useParams();
  const { cart, addItem, updateQuantity } = useCart();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dateRange, setDateRange] = useState();

  const sizeRequiredCategories = ["Party Wear", "Casual Wear", "Formal Wear", "Shoes"];

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

  useEffect(() => {
    getProduct();
  }, [id]);

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
    if (!dateRange || !dateRange.from || !dateRange.to) {
      toast.error("Please select a rental period.");
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
          quantity: 1,
          startDate: dateRange.from,
          endDate: dateRange.to,
        });
      }
    } catch (error) {
      console.error("Cart action failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRentNow = async () => {
    if (sizeRequiredCategories.includes(product.category) && !selectedSize) {
      toast.error("Please select a size before renting.");
      return;
    }
    if (!dateRange || !dateRange.from || !dateRange.to) {
      toast.error("Please select a rental period.");
      return;
    }
    
    const itemToRent = {
      product: product,
      size: selectedSize || 'Standard',
      quantity: 1,
      startDate: dateRange.from,
      endDate: dateRange.to,
    };
    
    if (!existingCartItem) {
      setIsProcessing(true);
      try {
        await addItem({ 
          product: product._id, 
          size: selectedSize || 'Standard', 
          quantity: 1,
          startDate: dateRange.from,
          endDate: dateRange.to
        });
      } catch (error) {
        console.error("Failed to add item before renting:", error);
        setIsProcessing(false);
        return;
      }
      setIsProcessing(false);
    }
    
    navigate('/checkout', { state: { rentNowItem: itemToRent } });
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
            
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className={i < Math.round(product.averageRating) ? "text-yellow-400 fill-current" : "text-gray-600"} />
                    ))}
                </div>
                <span className="text-lavender/80">({product.reviews.length} reviews)</span>
            </div>

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
            
            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-lavender flex items-center gap-2"><Calendar size={18} /> Rental Period</h3>
              <div className="bg-plum/30 p-2 rounded-lg flex justify-center">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                  disabled={{ before: new Date() }}
                  footer={
                    dateRange?.from && dateRange?.to && (
                      <p className="text-center text-primary font-semibold mt-2">
                        Selected: {format(dateRange.from, 'PPP')} to {format(dateRange.to, 'PPP')}
                      </p>
                    )
                  }
                />
              </div>
            </div>
            
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
              <motion.button 
                onClick={handleRentNow}
                disabled={isProcessing}
                whileTap={{ scale: isProcessing ? 1 : 0.95 }} 
                className="flex-1 bg-lavender text-plum px-8 py-3 rounded-lg font-semibold hover:bg-white transition disabled:opacity-50"
              >
                Rent Now
              </motion.button>
            </div>
            
            <Accordion title="Description">
              <p>{product.description}</p>
            </Accordion>
            <Accordion title="Materials & Care">
              <p>Main: 100% Silk. Lining: 100% Viscose. Professional dry clean only.</p>
            </Accordion>
            
            <div className="mt-8 border-t border-lavender/20 pt-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Reviews ({product.reviews.length})</h3>
                
                <AddReviewForm productId={product._id} onReviewAdded={getProduct} />

                <div className="mt-6 space-y-6">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map(review => (
                            <div key={review._id} className="flex gap-4">
                                <img 
                                    src={review.user?.avatar || `https://ui-avatars.com/api/?name=${review.user?.name}&background=8A2BE1&color=fff`} 
                                    alt={review.user?.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-white">{review.user?.name || 'Anonymous'}</p>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-600"} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-lavender/70 text-sm mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    <p className="text-lavender/90 mt-2">{review.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-lavender/70">No reviews yet. Be the first to leave one!</p>
                    )}
                </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ItemDetails;