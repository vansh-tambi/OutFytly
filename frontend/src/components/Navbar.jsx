// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

// --- Data for Navigation Links ---
const mainNavLinks = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/faq", label: "FAQ" },
    { path: "/careers", label: "Careers" },
    { path: "/help", label: "Help" },
];
const authNavLinks = [{ path: "/login", label: "Login" }];
const userNavLinks = [
    { path: "/account/cart", label: "Cart" }, // Updated path for consistency
    { path: "/account/profile", label: "Profile" },
    { path: "/account/dashboard", label: "Dashboard" },
];
const megaMenuCategories = [
    { name: 'Party Wear', href: '/browse?category=party-wear', image: 'https://images.unsplash.com/photo-1599403485304-4f494f1f5a9e?w=200' },
    { name: 'Watches', href: '/browse?category=watches', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200' },
    { name: 'Shoes', href: '/browse?category=shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?w=200' },
    { name: 'Accessories', href: '/browse?category=accessories', image: 'https://images.unsplash.com/photo-1588444968368-a3159b3b879a?w=200' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = false; // This would come from your auth context
  
  const mobileLinks = isLoggedIn ? [...mainNavLinks, ...userNavLinks] : [...mainNavLinks, ...authNavLinks];
  const navLinkClasses = ({ isActive }) => isActive ? "text-primary font-semibold" : "text-white hover:text-primary transition-colors";


  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-plum/80 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex gap-2 items-center flex-shrink-0">
                <motion.img src="/Logo_OUTFYTLY.png" alt="OutFytly" className="h-9 w-9 rounded-xl object-cover" whileHover={{ rotate: 10, scale: 1.1 }} />
                <span className="bg-gradient-to-r from-lavender to-primary bg-clip-text text-transparent">OutFytly</span>
            </Link>

            <div className="hidden lg:flex flex-grow justify-center items-center gap-8 relative">
                {mainNavLinks.map((link) => (
                    <div key={link.label} onMouseEnter={() => link.label === 'Browse' && setIsMegaMenuOpen(true)} onMouseLeave={() => link.label === 'Browse' && setIsMegaMenuOpen(false)} className="relative py-2">
                        <NavLink to={link.path} className={navLinkClasses}>
                           {link.label}
                        </NavLink>
                        {location.pathname === link.path && (
                            <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="underline" />
                        )}
                    </div>
                ))}
            </div>

            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                {isLoggedIn ? (
                    <>
                        {userNavLinks.map((link) => (
                            <NavLink key={link.path} to={link.path} className={navLinkClasses}>{link.label}</NavLink>
                        ))}
                        <motion.button whileHover={{ scale: 1.05 }} className="bg-lavender text-plum px-4 py-2 rounded-md text-sm font-semibold hover:bg-white transition">Logout</motion.button>
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

            <div className="lg:hidden">
                <button onClick={() => setMobileMenuOpen(true)} className="text-3xl text-lavender hover:text-primary"><HiMenuAlt3 /></button>
            </div>
        </div>

        <AnimatePresence>
            {isMegaMenuOpen && (
                <motion.div
                    onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="absolute top-full left-0 w-full bg-plum/90 backdrop-blur-lg shadow-xl border-t border-lavender/10"
                >
                    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {megaMenuCategories.map(cat => (
                            <Link to={cat.href} key={cat.name} className="group text-center" onClick={() => setIsMegaMenuOpen(false)}>
                                <div className="rounded-lg overflow-hidden mb-2 border-2 border-transparent group-hover:border-primary transition-all">
                                    <img src={cat.image} alt={cat.name} className="w-full h-32 object-cover" />
                                </div>
                                <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{cat.name}</h4>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-plum/70 backdrop-blur-xl lg:hidden" onClick={() => setMobileMenuOpen(false)}>
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-full max-w-xs bg-ink p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold text-primary">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="text-4xl text-lavender"><HiX /></button>
              </div>

              <nav className="flex flex-col items-center gap-8 text-xl">
                {mobileLinks.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="w-full text-center">
                    <NavLink to={link.path} onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>{link.label}</NavLink>
                  </motion.div>
                ))}
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + mobileLinks.length * 0.08 }} className="mt-8 w-full">
                  {isLoggedIn ? (
                     <button className="w-full py-2 bg-lavender text-plum rounded-md">Logout</button>
                  ) : (
                     <NavLink to="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 bg-primary text-white rounded-md">Signup</NavLink>
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