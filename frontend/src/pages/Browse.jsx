// src/pages/Browse.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react'; // Removed Search icon
import { fetchProducts } from '../api/productService';
import toast from 'react-hot-toast';
import indianCities from '../data/indian-cities.json'; 

// --- Filter Options ---
const locations = ["All Locations", ...new Set(indianCities.map(city => city.name).sort())];
const categories = ["All Categories", "Party Wear", "Watches", "Shoes", "Accessories", "Casual Wear", "Formal Wear"]; // Added missing categories
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
];

// --- Filter Sidebar Component ---
const FilterSidebar = ({ filters, setFilters, loading }) => {
    // Removed keyword and setKeyword
    const { location, category, sortBy } = filters;
    const { setLocation, setCategory, setSortBy } = setFilters;

    return (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
            {/* SEARCH INPUT HAS BEEN REMOVED */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
                <label className="form-label mb-2">Category</label>
                <div className="space-y-2">
                    {categories.map((cat, index) => (
                        <motion.button 
                          key={cat} 
                          onClick={() => setCategory(cat)} 
                          disabled={loading} 
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${category === cat ? 'bg-primary text-white font-semibold' : 'hover:bg-plum/50 text-lavender'}`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
                <label className="form-label mb-2">Location</label>
                <motion.select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  disabled={loading} 
                  className="form-input"
                  whileFocus={{ borderColor: '#8A2BE2' }}
                >
                    {locations.map(loc => <option key={loc} value={loc} className="bg-plum">{loc}</option>)}
                </motion.select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
                <label className="form-label mb-2">Sort By</label>
                <motion.select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  disabled={loading} 
                  className="form-input"
                  whileFocus={{ borderColor: '#8A2BE2' }}
                >
                    {sortOptions.map(opt => <option key={opt.value} value={opt.value} className="bg-plum">{opt.label}</option>)}
                </motion.select>
            </motion.div>
        </motion.div>
    );
};

// --- Pagination Component (is correct and unchanged) ---
const Pagination = ({ page, pages, onPageChange, loading }) => {
    // ...
};


// --- Main Browse Component ---
const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  const [filters, setFilters] = useState({
    // Removed keyword from default state
    category: searchParams.get('category')?.replace(/-/g, ' ') || 'All Categories',
    sort: 'relevance',
    location: 'All Locations'
  });

  useEffect(() => {
    const categoryFromURL = searchParams.get('category')?.replace(/-/g, ' ');
    // Removed searchFromURL
    setFilters(prev => ({
        ...prev,
        category: categories.find(c => c.toLowerCase() === categoryFromURL?.toLowerCase()) || 'All Categories',
    }));
    setPagination(p => ({...p, page: 1}));
  }, [searchParams]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      
      const apiParams = {
          page: pagination.page,
          // keyword removed from apiParams
          sort: filters.sort,
          ...(filters.category !== 'All Categories' && { category: filters.category }),
          ...(filters.location !== 'All Locations' && { location: filters.location }),
      };

      try {
        const data = await fetchProducts(apiParams);
        setProducts(data.products);
        setPagination({ page: data.page, pages: data.pages });
      } catch (err) {
        setError(err.toString());
        toast.error("Could not fetch products.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [filters, pagination.page]);

  const setSingleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const filterSetters = {
    // setKeyword removed
    setLocation: (val) => setSingleFilter('location', val),
    setCategory: (val) => setSingleFilter('category', val),
    setSortBy: (val) => setSingleFilter('sort', val),
  };
  
  return (
    <div className="bg-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white"
            >
              Explore the Collection
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lavender/70 mt-2"
            >
              Find your next statement piece from thousands of unique outfits.
            </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-4 lg:gap-8">
            <motion.aside 
              className="hidden lg:block lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="sticky top-24 bg-plum/30 p-6 rounded-xl border border-lavender/20">
                    <h3 className="text-2xl font-semibold text-white mb-4">Filters</h3>
                    <FilterSidebar filters={filters} setFilters={filterSetters} loading={loading}/>
                </div>
            </motion.aside>

            <main className="lg:col-span-3">
                <motion.div 
                  className="flex justify-between items-center mb-6 lg:hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <p className="text-lavender">{!loading && `${products.length > 0 ? `${products.length} items found` : ''}`}</p>
                    <motion.button 
                      onClick={() => setMobileFiltersOpen(true)} 
                      className="flex items-center gap-2 bg-plum/50 px-4 py-2 rounded-md text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                        <SlidersHorizontal size={18} /> Filters
                    </motion.button>
                </motion.div>
                
                {loading ? (
                    <motion.div 
                      className="flex justify-center items-center h-96"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                        <motion.div 
                          className="w-12 h-12 rounded-full border-4 border-t-primary border-lavender/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                    </motion.div>
                ) : error ? (
                    <motion.div 
                      className="text-center py-20 text-red-400"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-2xl font-semibold">Could Not Load Products</h3>
                        <p>{error}</p>
                    </motion.div>
                ) : (
                    <>
                        <motion.div 
                          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[500px]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                            {products.map((itemData, index) => (
                                <motion.div
                                  key={itemData._id}
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, amount: 0.1 }}
                                  transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                  <ItemCard {...itemData} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {products.length === 0 && !loading && (
                            <motion.div 
                              className="text-center py-20"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-white">No Items Found</h3>
                                <p className="text-lavender/70 mt-2">Try adjusting your filters to find what you're looking for.</p>
                            </motion.div>
                        )}
                        
                        <Pagination page={pagination.page} pages={pagination.pages} onPageChange={(p) => setPagination(prev => ({...prev, page: p}))} loading={loading} />
                    </>
                )}
            </main>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div 
            onClick={() => setMobileFiltersOpen(false)} 
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute top-0 left-0 h-full w-full max-w-xs bg-ink border-r border-lavender/20 p-6 overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white">Filters</h3>
                <motion.button 
                  onClick={() => setMobileFiltersOpen(false)}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X/>
                </motion.button>
              </div>
              <FilterSidebar filters={filters} setFilters={filterSetters} loading={loading} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Browse;