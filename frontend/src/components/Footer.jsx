import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-ink via-plum to-ink text-lavender pt-12 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white">OutFytly</h2>
          <p className="mt-3 text-sm text-lavender/80 leading-relaxed">
            Rent. Wear. Slay.  
            Your go-to platform for premium outfits and accessories, available for rent or purchase.
          </p>
          <div className="mt-6 flex gap-4 text-2xl">
            <a href="#" className="hover:text-primary transition"><FaInstagram /></a>
            <a href="#" className="hover:text-primary transition"><FaFacebook /></a>
            <a href="#" className="hover:text-primary transition"><FaTwitter /></a>
            <a href="#" className="hover:text-primary transition"><FaLinkedin /></a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/browse" className="hover:text-white transition">Browse Outfits</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
            <li><Link to="/returns" className="hover:text-white transition">Returns & Refunds</Link></li>
          </ul>
        </motion.div>

        {/* Explore More */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dashboard" className="hover:text-white transition">My Dashboard</Link></li>
            <li><Link to="/profile" className="hover:text-white transition">My Profile</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">My Cart</Link></li>
            <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
          </ul>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white font-semibold mb-4">Stay in the Loop</h3>
          <p className="text-sm text-lavender/80 mb-3">
            Get updates on new arrivals, exclusive offers, and style inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-lg bg-ink text-white border border-lavender/40 focus:ring-2 focus:ring-primary outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-lavender transition"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="border-t border-lavender/30 mt-10 pt-5 text-center text-xs text-lavender/70"
      >
        © {new Date().getFullYear()} <span className="font-semibold text-white">OutFytly</span>. All rights reserved.  
        <br /> Designed with ❤️ for fashion lovers.
      </motion.div>
    </footer>
  );
};

export default Footer;
