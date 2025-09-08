// src/pages/Browse.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { fetchProducts } from '../api/productService';
import toast from 'react-hot-toast';

// --- Filter Options ---
const locations = ["All Locations", "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Bhopal"];
const categories = ["All Categories", "Party Wear", "Watches", "Shoes", "Accessories"];
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
];

// --- Filter Sidebar Component ---
const FilterSidebar = ({ filters, setFilters, loading }) => {
    const { keyword, location, category, sortBy } = filters;
    const { setKeyword, setLocation, setCategory, setSortBy } = setFilters;

    return (
        <div className="space-y-6">
            <div>
                <label className="form-label mb-2">Search</label>
                <div className="relative">
                    <input type="text" placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} disabled={loading} className="form-input pl-10" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lavender/50" size={20} />
                </div>
            </div>
            
            <div>
                <label className="form-label mb-2">Category</label>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)} disabled={loading} className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${category === cat ? 'bg-primary text-white font-semibold' : 'hover:bg-plum/50 text-lavender'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="form-label mb-2">Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} disabled={loading} className="form-input">
                    {locations.map(loc => <option key={loc} className="bg-plum">{loc}</option>)}
                </select>
            </div>

            <div>
                <label className="form-label mb-2">Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} disabled={loading} className="form-input">
                    {sortOptions.map(opt => <option key={opt.value} value={opt.value} className="bg-plum">{opt.label}</option>)}
                </select>
            </div>
        </div>
    );
};

// --- Pagination Component ---
const Pagination = ({ page, pages, onPageChange, loading }) => {
  if (pages <= 1) return null;
  return (
    <div className="mt-12 flex justify-center items-center gap-2">
      {[...Array(pages).keys()].map((p) => (
        <button
          key={p + 1}
          onClick={() => onPageChange(p + 1)}
          disabled={loading}
          className={`w-10 h-10 rounded-md transition font-semibold ${page === p + 1 ? 'bg-primary text-white' : 'bg-plum/50 text-lavender hover:bg-primary/50'}`}
        >
          {p + 1}
        </button>
      ))}
    </div>
  );
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
    keyword: searchParams.get('search') || '',
    category: searchParams.get('category')?.replace(/-/g, ' ') || 'All Categories',
    sort: 'relevance',
    location: 'All Locations'
  });

  useEffect(() => {
    // Sync filters from URL to state on initial load
    const categoryFromURL = searchParams.get('category')?.replace(/-/g, ' ');
    const searchFromURL = searchParams.get('search');

    setFilters(prev => ({
        ...prev,
        category: categories.find(c => c.toLowerCase() === categoryFromURL?.toLowerCase()) || 'All Categories',
        keyword: searchFromURL || ''
    }));
    setPagination(p => ({...p, page: 1}));
  }, [searchParams]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      
      const apiParams = {
          page: pagination.page,
          keyword: filters.keyword,
          sort: filters.sort,
          ...(filters.category !== 'All Categories' && { category: filters.category }),
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
    setKeyword: (val) => setSingleFilter('keyword', val),
    setLocation: (val) => setSingleFilter('location', val),
    setCategory: (val) => setSingleFilter('category', val),
    setPrice: (val) => setSingleFilter('price', val),
    setSortBy: (val) => setSingleFilter('sort', val),
  };
  
  return (
    <div className="bg-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
            <motion.h1 initial={{ opacity: 0, y:20 }} animate={{ opacity:1, y:0 }} className="text-4xl font-bold text-white">Explore the Collection</motion.h1>
            <motion.p initial={{ opacity: 0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.2 }} className="text-lavender/70 mt-2">Find your next statement piece from thousands of unique outfits.</motion.p>
        </div>

        <div className="grid lg:grid-cols-4 lg:gap-8">
            <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24 bg-plum/30 p-6 rounded-xl border border-lavender/20">
                    <h3 className="text-2xl font-semibold text-white mb-4">Filters</h3>
                    <FilterSidebar filters={filters} setFilters={filterSetters} loading={loading}/>
                </div>
            </aside>

            <main className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6 lg:hidden">
                    <p className="text-lavender">{!loading && `${products.length} items found`}</p>
                    <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-plum/50 px-4 py-2 rounded-md text-white">
                        <SlidersHorizontal size={18} /> Filters
                    </button>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="w-12 h-12 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-400">
                        <h3 className="text-2xl font-semibold">Could Not Load Products</h3>
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[500px]">
                            <AnimatePresence>
                                {products.map((itemData) => (
                                    <motion.div layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }} key={itemData._id}>
                                        <ItemCard {...itemData} id={itemData._id} price={itemData.rentalPrice} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {products.length === 0 && !loading && (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-semibold text-white">No Items Found</h3>
                                <p className="text-lavender/70 mt-2">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}
                        
                        <Pagination page={pagination.page} pages={pagination.pages} onPageChange={(p) => setPagination(prev => ({...prev, page: p}))} loading={loading} />
                    </>
                )}
            </main>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileFiltersOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFiltersOpen(false)} className="fixed inset-0 bg-black/60 z-50 lg:hidden">
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.3, ease: 'easeInOut' }} onClick={(e) => e.stopPropagation()} className="absolute top-0 left-0 h-full w-full max-w-xs bg-ink border-r border-lavender/20 p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold text-white">Filters</h3>
                        <button onClick={() => setMobileFiltersOpen(false)}><X/></button>
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