// src/pages/Browse.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';

// --- Mock Data & Options ---
const allItems = [
    { id: "1", title: "Designer Saree", price: 2000, location: "Mumbai", category: "Party Wear", image: "https://images.unsplash.com/photo-1727430228383-aa1fb59db8bf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "2", title: "Luxury Heels", price: 900, location: "Delhi", category: "Shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500" },
    { id: "3", title: "Formal Blazer", price: 1500, location: "Bangalore", category: "Party Wear", image: "https://images.unsplash.com/photo-1723063640943-2b7b4379e1ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "4", title: "Smart Watch", price: 700, location: "Hyderabad", category: "Watches", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "5", title: "Leather Handbag", price: 1100, location: "Delhi", category: "Accessories", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500" },
    { id: "6", title: "Running Sneakers", price: 850, location: "Mumbai", category: "Shoes", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500" },
    { id: "7", title: "Gold Bracelet", price: 1800, location: "Bangalore", category: "Accessories", image: "https://images.unsplash.com/photo-1689397136362-dce64e557fcc?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "8", title: "Aviator Sunglasses", price: 400, location: "Hyderabad", category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500" },
    { id: "9", title: "Classic Tuxedo", price: 2500, location: "Delhi", category: "Party Wear", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500" },
    { id: "10", title: "Chronograph Watch", price: 3000, location: "Mumbai", category: "Watches", image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=500" },
    { id: "11", title: "Leather Boots", price: 1600, location: "Bangalore", category: "Shoes", image: "https://images.unsplash.com/photo-1534233650908-b471f2350922?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "12", title: "Evening Gown", price: 2200, location: "Hyderabad", category: "Party Wear", image: "https://images.unsplash.com/photo-1631291887694-0bd5d4d610be?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];
const locations = ["All Locations", "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Bhopal"];
const categories = ["All Categories", "Party Wear", "Watches", "Shoes", "Accessories"];
const sortOptions = [ { value: "relevance", label: "Relevance" }, { value: "price-asc", label: "Price: Low to High" }, { value: "price-desc", label: "Price: High to Low" }];
const ITEMS_PER_PAGE = 8;


const FilterSidebar = ({ filters, setFilters }) => {
    const { searchTerm, location, category, price, sortBy } = filters;
    const { setSearchTerm, setLocation, setCategory, setPrice, setSortBy } = setFilters;

    return (
        <div className="space-y-6">
            <div>
                <label className="form-label mb-2">Search</label>
                <div className="relative">
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-input pl-10" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lavender/50" size={20} />
                </div>
            </div>
            
            <div>
                <label className="form-label mb-2">Category</label>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)} className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${category === cat ? 'bg-primary text-white font-semibold' : 'hover:bg-plum/50 text-lavender'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="price" className="form-label flex justify-between mb-2">
                    <span>Price</span> <span className="text-white">up to ₹{price.toLocaleString()}</span>
                </label>
                <input id="price" type="range" min="400" max="3000" step="50" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-2 bg-ink rounded-lg cursor-pointer accent-primary" />
            </div>

            <div>
                <label className="form-label mb-2">Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-input">
                    {locations.map(loc => <option key={loc} className="bg-plum">{loc}</option>)}
                </select>
            </div>

            <div>
                <label className="form-label mb-2">Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-input">
                    {sortOptions.map(opt => <option key={opt.value} value={opt.value} className="bg-plum">{opt.label}</option>)}
                </select>
            </div>
        </div>
    );
};


const Browse = () => {
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    searchTerm: '',
    location: 'All Locations',
    category: searchParams.get('category')?.replace(/-/g, ' ') || 'All Categories',
    price: 3000,
    sortBy: 'relevance',
  });

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const categoryFromURL = searchParams.get('category')?.replace(/-/g, ' ');
    if (categoryFromURL) {
      const matchingCategory = categories.find(c => c.toLowerCase() === categoryFromURL.toLowerCase());
      if (matchingCategory && filters.category !== matchingCategory) {
        setFilters(prevFilters => ({ ...prevFilters, category: matchingCategory }));
      }
    } else if (filters.category !== 'All Categories') {
      setFilters(prevFilters => ({ ...prevFilters, category: 'All Categories' }));
    }
  }, [searchParams]);


  const filteredItems = useMemo(() => {
    let items = allItems
      .filter(item => item.price <= filters.price)
      .filter(item => filters.category === 'All Categories' || item.category === filters.category)
      .filter(item => filters.location === 'All Locations' || item.location === filters.location)
      .filter(item => item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()));

    const sortedItems = [...items];
    switch (filters.sortBy) {
      case 'price-asc': sortedItems.sort((a, b) => a.price - b.price); break;
      case 'price-desc': sortedItems.sort((a, b) => b.price - a.price); break;
      default: break;
    }
    return sortedItems;
  }, [filters]);

  const setSingleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filterSetters = {
    setSearchTerm: (val) => setSingleFilter('searchTerm', val),
    setLocation: (val) => setSingleFilter('location', val),
    setCategory: (val) => setSingleFilter('category', val),
    setPrice: (val) => setSingleFilter('price', val),
    setSortBy: (val) => setSingleFilter('sortBy', val),
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
                    <FilterSidebar filters={filters} setFilters={filterSetters} />
                </div>
            </aside>

            <main className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6 lg:hidden">
                    <p className="text-lavender">{filteredItems.length} items found</p>
                    <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-plum/50 px-4 py-2 rounded-md text-white">
                        <SlidersHorizontal size={18} /> Filters
                    </button>
                </div>

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredItems.slice(0, visibleCount).map((itemData) => (
                            <motion.div layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }} key={itemData.id}>
                                <ItemCard {...itemData} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-12 text-center">
                    {filteredItems.length === 0 ? (
                        <div className="py-12">
                            <h3 className="text-2xl font-semibold text-white">No Items Found</h3>
                            <p className="text-lavender/70 mt-2">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    ) : (
                        visibleCount < filteredItems.length && (
                            <motion.button
                                onClick={() => setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE)}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-primary/90 transition"
                            >
                                Load More
                            </motion.button>
                        )
                    )}
                </div>
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
                    <FilterSidebar filters={filters} setFilters={filterSetters} />
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Browse;