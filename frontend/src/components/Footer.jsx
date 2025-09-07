// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const linkData = { /* ... your links data ... */ };

const Footer = () => {
    return (
        <>
            {/* --- Wavy Divider --- */}
            <div className="bg-ink">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
                    <path fill="#201825" fillOpacity="1" d="M0,64L80,85.3C160,107,320,149,480,149.3C640,149,800,107,960,80C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </div>
            <footer className="bg-plum text-lavender pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    {/* --- Main Section: Brand & Newsletter --- */}
                    <div className="grid md:grid-cols-2 gap-10 mb-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">OutFytly</h2>
                            <p className="text-lavender/70 mb-4">Rent. Wear. Slay. Your go-to platform for premium fashion.</p>
                            <div className="flex gap-4 text-2xl">
                                <motion.a whileHover={{ y: -3, scale: 1.1 }} href="#" className="hover:text-primary transition"><FaInstagram /></motion.a>
                                <motion.a whileHover={{ y: -3, scale: 1.1 }} href="#" className="hover:text-primary transition"><FaFacebook /></motion.a>
                                <motion.a whileHover={{ y: -3, scale: 1.1 }} href="#" className="hover:text-primary transition"><FaTwitter /></motion.a>
                                <motion.a whileHover={{ y: -3, scale: 1.1 }} href="#" className="hover:text-primary transition"><FaLinkedin /></motion.a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3">Stay in the Loop</h3>
                            <p className="text-sm text-lavender/70 mb-4">Get updates on new arrivals, exclusive offers, and style inspiration.</p>
                            <form className="flex gap-2">
                                <input type="email" placeholder="Your email" className="form-input flex-1" />
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-lavender hover:text-plum transition">
                                    Subscribe
                                </motion.button>
                            </form>
                        </div>
                    </div>
                    {/* --- Link Columns --- */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-lavender/20">
                        {/* Map your FooterLinkColumn here */}
                    </div>
                    {/* --- Bottom Line --- */}
                    <div className="pt-8 text-center text-xs text-lavender/70">
                         © {new Date().getFullYear()} <span className="font-semibold text-white">OutFytly</span>. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;