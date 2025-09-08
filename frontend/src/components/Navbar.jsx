// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Home, Info, Mail, Briefcase, HelpCircle, ArrowRight, Search, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // For login state
import { useCart } from '../context/CartContext';   // For cart item count

// --- Data for Navigation & Dropdowns ---
const navItems = [
    { path: "/", label: "Home", icon: Home, dropdownContent: [{ title: "Homepage", desc: "Return to where it all begins.", href: "/" }] },
    { path: "/browse", label: "Browse", dropdownType: 'mega' },
    { path: "/about", label: "About", icon: Info, dropdownContent: [{ title: "Our Story", desc: "Learn about our mission.", href: "/about" }] },
    { path: "/contact", label: "Contact", icon: Mail, dropdownContent: [{ title: "Contact Us", desc: "Get in touch with our team.", href: "/contact" }] },
    { path: "/careers", label: "Careers", icon: Briefcase, dropdownContent: [{ title: "Join Our Team", desc: "Explore open positions.", href: "/careers" }] },
    { path: "/faq", label: "FAQ", icon: HelpCircle, dropdownContent: [{ title: "Find Answers", desc: "See our frequently asked questions.", href: "/faq" }] },
];
const megaMenuCategories = [
    { name: 'Party Wear', href: '/browse?category=party-wear', image: 'https://images.unsplash.com/photo-1599403485304-4f494f1f5a9e?w=200' },
    { name: 'Watches', href: '/browse?category=watches', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200' },
    { name: 'Shoes', href: '/browse?category=shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?w=200' },
    { name: 'Accessories', href: '/browse?category=accessories', image: 'https://images.unsplash.com/photo-1588444968368-a3159b3b879a?w=200' },
];
const authLinks = [
    { path: "/login", label: "Login" },
    { path: "/account/cart", label: "Cart" },
    { path: "/account/profile", label: "Profile" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // --- LOGIC UPDATE ---
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const { cart } = useCart();         // Get cart items from CartContext
  const isLoggedIn = !!user;         // Check if user object exists to determine login state
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items in cart

  const handleMouseEnter = (label) => setOpenDropdown(label);
  const handleMouseLeave = () => setOpenDropdown(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/browse?category=${encodeURIComponent(searchTerm.trim().toLowerCase())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') { setIsSearchOpen(false); } };
    if (isSearchOpen) { document.body.style.overflow = 'hidden'; window.addEventListener('keydown', handleKeyDown); }
    else { document.body.style.overflow = 'auto'; }
    return () => { window.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = 'auto'; };
  }, [isSearchOpen]);

  const mobileNavLinks = isLoggedIn ? [...navItems.map(i => ({path: i.path, label: i.label})), authLinks[1], authLinks[2]] : [...navItems.map(i => ({path: i.path, label: i.label})), authLinks[0]];
  const navLinkClasses = ({isActive}) => isActive ? "text-primary font-semibold" : "text-white hover:text-primary transition-colors";

  return (
    <>
      <div className="bg-primary text-white text-center text-sm font-semibold p-2">
        Free Shipping On All Orders Above ₹2000!
      </div>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        onMouseLeave={handleMouseLeave}
        className="sticky top-0 z-50 bg-plum/80 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex gap-2 items-center flex-shrink-0">
            <motion.img src="/Logo_OUTFYTLY.png" alt="OutFytly" className="h-9 w-9 rounded-xl object-cover" whileHover={{ rotate: 10, scale: 1.1 }} />
            <motion.span
              className="bg-gradient-to-r from-lavender via-primary to-lavender bg-[length:200%_auto] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            >
              OutFytly
            </motion.span>
          </Link>

          <div className="hidden lg:flex flex-grow justify-center items-center gap-8 relative">
            {navItems.map((item) => (
              <motion.div key={item.label} onMouseEnter={() => handleMouseEnter(item.label)} className="relative py-2">
                <NavLink to={item.path} className={navLinkClasses}>{item.label}</NavLink>
                {location.pathname === item.path && (
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="underline" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <button onClick={() => setIsSearchOpen(true)} className="text-white hover:text-primary transition-colors"><Search size={22} /></button>
            <div className="w-px h-6 bg-lavender/30"></div>
            {isLoggedIn ? (
              <>
                <NavLink to="/account/cart" className="relative text-white hover:text-primary transition-colors">
                  <ShoppingCart size={24} />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </NavLink>
                <NavLink to="/account/profile" className={navLinkClasses}>Profile</NavLink>
                <motion.button onClick={logout} whileHover={{ scale: 1.05 }} className="bg-lavender text-plum px-4 py-2 rounded-md text-sm font-semibold hover:bg-white transition">Logout</motion.button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <NavLink to="/signup" className="bg-primary px-4 py-2 rounded-md font-medium hover:bg-lavender hover:text-plum transition">Signup</NavLink>
                </motion.div>
              </>
            )}
          </div>
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(true)} className="text-2xl text-lavender hover:text-primary"><Search /></button>
            <button onClick={() => setMobileMenuOpen(true)} className="text-3xl text-lavender hover:text-primary"><HiMenuAlt3 /></button>
          </div>
        </div>
        
        <AnimatePresence>
          {openDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-full left-0 w-full bg-plum/95 backdrop-blur-xl shadow-xl border-t border-lavender/10"
            >
              {openDropdown === 'Browse' ? (
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                  {megaMenuCategories.map(cat => (
                    <Link to={cat.href} key={cat.name} className="group text-center" onClick={handleMouseLeave}>
                      <div className="rounded-lg overflow-hidden mb-2 border-2 border-transparent group-hover:border-primary transition-all">
                        <img src={cat.image} alt={cat.name} className="w-full h-32 object-cover" />
                      </div>
                      <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{cat.name}</h4>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="max-w-7xl mx-auto px-6 py-6">
                  {navItems.find(i => i.label === openDropdown)?.dropdownContent.map(content => (
                    <Link to={content.href} key={content.title} className="group flex items-center gap-4 p-3 rounded-md hover:bg-primary/10" onClick={handleMouseLeave}>
                      <div className="bg-primary/20 text-primary p-3 rounded-full">
                        {React.createElement(navItems.find(i => i.label === openDropdown).icon, { size: 22 })}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{content.title}</h4>
                        <p className="text-sm text-lavender/70">{content.desc}</p>
                      </div>
                      <ArrowRight className="ml-auto text-lavender/40 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSearchOpen(false)} className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-lg flex items-start justify-center p-8">
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="search"
                  placeholder="Search for a category e.g. Shoes"
                  className="w-full pl-14 pr-28 py-4 rounded-full bg-plum/50 border border-lavender/30 text-white text-lg placeholder-lavender/60 focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-lavender/50" size={24} />
                <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-14 top-1/2 -translate-y-1/2 text-lavender p-2 rounded-full hover:bg-primary/20"><HiX size={24} /></button>
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-lavender p-2 rounded-full hover:bg-primary/20"><ArrowRight size={24} /></button>
              </form>
              <div className="mt-6 text-center text-lavender/80">
                <p className="font-semibold mb-2">Popular Categories:</p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Link to="/browse?category=party-wear" onClick={() => setIsSearchOpen(false)} className="hover:text-primary">Party Wear</Link>
                  <Link to="/browse?category=watches" onClick={() => setIsSearchOpen(false)} className="hover:text-primary">Watches</Link>
                  <Link to="/browse?category=shoes" onClick={() => setIsSearchOpen(false)} className="hover:text-primary">Shoes</Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-plum/70 backdrop-blur-xl lg:hidden" onClick={() => setMobileMenuOpen(false)}>
                <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="fixed top-0 right-0 h-full w-full max-w-xs bg-ink p-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-xl font-bold text-primary">Menu</h2>
                        <button onClick={() => setMobileMenuOpen(false)} className="text-4xl text-lavender"><HiX /></button>
                    </div>
                    <nav className="flex flex-col items-center gap-8 text-xl flex-grow">
                        {mobileNavLinks.map((link, i) => (
                            <motion.div key={link.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="w-full text-center">
                                <NavLink to={link.path} onClick={() => setMobileMenuOpen(false)} className={({isActive}) => isActive ? "text-primary font-semibold" : "text-white hover:text-primary"}>{link.label}</NavLink>
                            </motion.div>
                        ))}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + mobileNavLinks.length * 0.08 }} className="mt-auto w-full">
                            {isLoggedIn ? (
                                <button onClick={logout} className="w-full py-3 bg-lavender text-plum rounded-md font-semibold">Logout</button>
                            ) : (
                                <NavLink to="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 bg-primary text-white rounded-md font-semibold">Signup</NavLink>
                            )}
                        </motion.div>
                    </nav>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;