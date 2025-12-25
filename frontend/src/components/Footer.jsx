// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// --- Data for Footer Links ---
const linkData = {
  quickLinks: [
    { path: "/browse", label: "Browse" },
    { path: "/about", label: "About Us" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
  ],
  supportLinks: [
    { path: "/faq", label: "FAQs" },
    { path: "/help", label: "Help Center" },
    { path: "/terms", label: "Terms of Service" },
    { path: "/privacy", label: "Privacy Policy" },
    { path: "/returns", label: "Refund Policy" },
  ],
};

// --- Reusable Component for Link Columns (with animation) ---
const FooterLinkColumn = ({ title, links, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.6, delay: delay }}
  >
    <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">{title}</h3>
    <ul className="space-y-3 text-sm">
      {links.map((link, index) => (
        <motion.li 
          key={link.path}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: delay + 0.05 + index * 0.05 }}
        >
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={link.path} className="text-lavender/70 hover:text-white hover:underline transition">
              {link.label}
            </Link>
          </motion.div>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

// --- Back to Top Button Component ---
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-6 right-6 z-50 bg-primary/80 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary"
                >
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowUp size={24} />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

const Footer = () => {
  const { register, handleSubmit, formState: { isSubmitting, isSubmitSuccessful }, reset } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Newsletter Signup:", data);
    reset();
  };

  return (
    <>
      <div className="bg-ink">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path fill="#201825" fillOpacity="1" d="M0,64L80,85.3C160,107,320,149,480,149.3C640,149,800,107,960,80C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>
      <footer className="bg-plum text-lavender pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="sm:col-span-2 lg:col-span-2"
            >
              <Link to="/" className="text-3xl font-bold flex gap-2 items-center text-white mb-4">
                <img src="/Logo_OUTFYTLY.png" alt="OutFytly" className="h-10 w-10 rounded-xl object-cover" />
                OutFytly
              </Link>
              <p className="text-lavender/70 mb-6 pr-8">Rent. Wear. Slay. Your go-to platform for premium fashion.</p>
              <div className="flex gap-4 text-2xl">
                <motion.a whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" className="hover:text-primary transition"><FaInstagram /></motion.a>
                <motion.a whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" className="hover:text-primary transition"><FaFacebook /></motion.a>
                <motion.a whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" className="hover:text-primary transition"><FaTwitter /></motion.a>
                <motion.a whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" className="hover:text-primary transition"><FaLinkedin /></motion.a>
              </div>
            </motion.div>

            <FooterLinkColumn title="Quick Links" links={linkData.quickLinks} delay={0.1} />
            <FooterLinkColumn title="Support" links={linkData.supportLinks} delay={0.2} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sm:col-span-2 lg:col-span-1"
            >
                <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Stay in the Loop</h3>
                <p className="text-sm text-lavender/70 mb-4">Get updates on new arrivals, exclusive offers, and style inspiration.</p>
                {isSubmitSuccessful ? (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 font-semibold">Thank you for subscribing!</motion.p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row lg:flex-col gap-2">
                        <input {...register("email", { required: true })} type="email" placeholder="Your email" className="form-input flex-1" />
                        <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.05 }} className="px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-lavender hover:text-plum transition disabled:bg-primary/50">
                            {isSubmitting ? "..." : "Subscribe"}
                        </motion.button>
                    </form>
                )}
            </motion.div>
          </div>
          
          <div className="pt-8 border-t border-lavender/20 text-center text-xs text-lavender/70">
            © {new Date().getFullYear()} <span className="font-semibold text-white">OutFytly</span>. All rights reserved.
          </div>
        </div>
      </footer>
      <BackToTopButton />
    </>
  );
};
export default Footer;