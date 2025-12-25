import React,{useState, useEffect, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Home, Info, Mail, Briefcase, HelpCircle, ArrowRight, ShoppingCart, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../api/productService';

// --- Data for Navigation & Dropdowns ---
const navItems = [
    { path: "/", label: "Home", icon: Home, dropdownContent: [{ title: "Homepage", desc: "Return to where it all begins.", href: "/" }] },
    { path: "/browse", label: "Browse", dropdownType: 'mega' },
    { path: "/about", label: "About", icon: Info, dropdownContent: [{ title: "Our Story", desc: "Learn about our mission.", href: "/about" }] },
    { path: "/contact", label: "Contact", icon: Mail, dropdownContent: [{ title: "Contact Us", desc: "Get in touch with our team.", href: "/contact" }] },
    { path: "/careers", label: "Careers", icon: Briefcase, dropdownContent: [{ title: "Join Our Team", desc: "Explore open positions.", href: "/careers" }] },
    { path: "/faq", label: "FAQ", icon: HelpCircle, dropdownContent: [{ title: "Find Answers", desc: "See our frequently asked questions.", href: "/faq" }] },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  
  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const { cart } = useCart();
  const itemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  
  const [browsePreviewItems, setBrowsePreviewItems] = useState([]);

  useEffect(() => {
    const getPreviewItems = async () => {
      try {
        const data = await fetchProducts({ limit: 4, sort: 'newest' });
        // ✅ THE FIX: Ensure we only ever use a maximum of 4 items
        setBrowsePreviewItems(data.products.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch navbar preview items:", error);
      }
    };
    getPreviewItems();
  }, []);

  const handleMouseEnter = (label) => setOpenDropdown(label);
  const handleMouseLeave = () => setOpenDropdown(null);

  const mobileNavLinks = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];
  
  if (isLoggedIn) {
    if (user.isAdmin) {
      mobileNavLinks.push({ path: "/admin/dashboard", label: "Admin Panel" });
    }
    mobileNavLinks.push({ path: "/cart", label: "Cart" });
    mobileNavLinks.push({ path: "/account/profile", label: "My Account" });
  } else {
    mobileNavLinks.push({ path: "/login", label: "Login" });
  }

  const navLinkClasses = ({isActive}) => isActive ? "text-primary font-semibold" : "text-white hover:text-primary transition-colors";

  return (
    <>
      <div className="bg-gradient-to-r from-primary via-primary-light to-accent-pink text-white text-center text-sm font-semibold p-2">
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
              className="gradient-text animate-gradient"
              style={{
                backgroundImage: 'linear-gradient(90deg, var(--color-lavender), var(--color-primary), var(--color-lavender))',
                backgroundSize: '200% auto'
              }}
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
            {isLoggedIn ? (
              <>
                {user.isAdmin && (
                    <NavLink to="/admin/dashboard" className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-semibold">
                        <ShieldCheck size={20} />
                        Admin
                    </NavLink>
                )}
                <NavLink to="/cart" className="relative text-white hover:text-primary transition-colors">
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
                  {browsePreviewItems.length > 0 ? browsePreviewItems.map(item => (
                    <Link to="/browse" key={item._id} className="group text-center" onClick={handleMouseLeave}>
                      <div className="rounded-lg overflow-hidden mb-2 border-2 border-transparent group-hover:border-primary transition-all">
                        <img src={item.images[0]} alt={item.title} className="w-full h-32 object-cover" />
                      </div>
                      <h4 className="font-semibold text-white group-hover:text-primary transition-colors truncate">{item.title}</h4>
                    </Link>
                  )) : <p className="text-lavender/70 col-span-full text-center">Loading latest items...</p>}
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
                                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full py-3 bg-lavender text-plum rounded-md font-semibold">Logout</button>
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