// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Core Component Imports ---
import Hero from '../components/sections/Hero';
import SectionTitle from '../components/SectionTitle';
import ItemCard from '../components/ItemCard';
import HorizontalCarousel from '../components/HorizontalCarousel';
import HowItWorks from '../components/sections/HowItWorks';
import Testimonials from '../components/sections/Testimonial';
import Brands from '../components/Brands';
import CTA from '../components/CTA';

// --- Swiper.js Imports (Corrected) ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

// --- Icon Imports ---
import { Wind, Infinity, Users, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Data ---
const categories = [
    { title: "Party Wear", image: "https://images.unsplash.com/photo-1599403485304-4f494f1f5a9e?w=500" },
    { title: "Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500" },
    { title: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ab?w=500" },
    { title: "Accessories", image: "https://images.unsplash.com/photo-1588444968368-a3159b3b879a?w=500" },
    { title: "Casual Wear", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500" },
    { title: "Formal Wear", image: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=500" },
];
const popularItems = [
    { id: "1", title: "Luxury Suit", price: "1500", location: "Delhi", image: "https://images.unsplash.com/photo-1593032583849-5db2699a0e63?w=500" },
    { id: "2", title: "Elegant Dress", price: "1200", location: "Mumbai", image: "https://images.unsplash.com/photo-1595500479312-d98f7a6f363c?w=500" },
    { id: "3", title: "Classic Watch", price: "800", location: "Bangalore", image: "https://images.unsplash.com/photo-1620625442228-5654a81b3929?w=500" },
    { id: "4", title: "Trendy Shoes", price: "600", location: "Hyderabad", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500" },
];
const whyChooseUs = [
    { icon: Wind, title: 'Sustainable Style', description: 'Reduce fashion waste by renting instead of buying. Look good while doing good for the planet.' },
    { icon: Infinity, title: 'Limitless Wardrobe', description: 'Access thousands of designer outfits for a fraction of the retail price.' },
    { icon: Users, title: 'Join the Community', description: 'Become part of a forward-thinking community that values style and sustainability.' },
];

const Home = () => {
    return (
        <div className="bg-ink text-white">
            <Hero />

            {/* --- "Shop By Category" Section with 3D Card Stack --- */}
            <section className="py-24 px-6 bg-gradient-to-b from-ink to-plum">
                <div className="max-w-5xl mx-auto">
                    <SectionTitle title="A Category for Every Story" subtitle="Discover curated collections that perfectly match your unique style and occasion." />
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="relative mt-12"
                    >
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            centeredSlides={true}
                            loop={true}
                            modules={[EffectCards, Navigation, Autoplay]}
                            navigation={{ nextEl: '.swiper-button-next-cat', prevEl: '.swiper-button-prev-cat' }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            className="!w-full max-w-sm h-96"
                        >
                            {categories.map((category) => (
                                <SwiperSlide key={category.title} className="!rounded-2xl !overflow-hidden shadow-2xl shadow-plum/50">
                                    <Link to={`/browse?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                        <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                            <h3 className="text-white text-3xl font-bold">{category.title}</h3>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-button-prev-cat absolute top-1/2 -translate-y-1/2 left-0 sm:-left-20 z-10 p-2 rounded-full bg-primary/50 hover:bg-primary transition-colors cursor-pointer">
                            <ChevronLeft className="text-white w-6 h-6" />
                        </div>
                        <div className="swiper-button-next-cat absolute top-1/2 -translate-y-1/2 right-0 sm:-right-20 z-10 p-2 rounded-full bg-primary/50 hover:bg-primary transition-colors cursor-pointer">
                            <ChevronRight className="text-white w-6 h-6" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- "Why Choose Us?" Section --- */}
            <section className="py-24 px-6">
                 <div className="max-w-5xl mx-auto">
                    <SectionTitle title="A Smarter Way to Style" subtitle="Experience fashion that's better for your wallet and the planet." />
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {whyChooseUs.map((item, i) => (
                            <motion.div key={item.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: i * 0.15 }} className="text-center p-6">
                                <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-lavender/70 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                 </div>
            </section>

            {/* --- "Trending Now" Section with Custom Carousel --- */}
            <section className="py-24 px-6 bg-plum/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
                            <SectionTitle align="left" title="Trending Now" subtitle="Discover the most popular outfits and accessories currently being rented and loved by our community." />
                            <Link to="/browse">
                                <motion.button whileHover={{ scale: 1.05 }} className="mt-4 bg-primary px-6 py-2 rounded-lg font-semibold text-white">
                                    Explore All
                                </motion.button>
                            </Link>
                        </motion.div>
                        <div className="lg:col-span-2">
                             <HorizontalCarousel>
                                {popularItems.map((p_item) => (
                                    <div key={p_item.id} className="flex-shrink-0 w-72">
                                        <ItemCard {...p_item} />
                                    </div>
                                ))}
                            </HorizontalCarousel>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* --- Final Assembled Sections --- */}
            <HowItWorks />
            <Testimonials />
            <Brands />
            <CTA />
        </div>
    );
};

export default Home;