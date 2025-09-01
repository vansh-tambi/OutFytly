import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-plum text-lavender py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">OutFytly</h2>
          <p className="mt-3 text-sm text-lavender/80">
            Rent. Wear. Slay.  
            Your go-to platform for premium outfits and accessories on rent or sale.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/browse" className="hover:text-white transition">Browse Outfits</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-primary transition"><FaInstagram /></a>
            <a href="#" className="hover:text-primary transition"><FaFacebook /></a>
            <a href="#" className="hover:text-primary transition"><FaTwitter /></a>
            <a href="#" className="hover:text-primary transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-lavender/30 mt-8 pt-4 text-center text-xs text-lavender/70">
        © {new Date().getFullYear()} OutFytly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
