import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQueries'; 
import Hero from '../components/sections/Hero';
import SectionTitle from '../components/SectionTitle';
import ItemCard from '../components/ItemCard';
import HorizontalCarousel from '../components/HorizontalCarousel';
import HowItWorks from '../components/sections/HowItWorks';
import Testimonials from '../components/sections/Testimonial';
import Brands from '../components/Brands';
import CTA from '../components/CTA';
import { fetchProducts } from '../api/productService';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import { Wind, Infinity, Users, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Static Data ---
const categories = [
    { title: "Watches", image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Accessories", image: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=2082&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Casual Wear", image: "https://images.unsplash.com/photo-1716004360220-213371f51df1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Party Wear", image: "https://images.unsplash.com/photo-1723016347027-39d37df73f18?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Formal Wear", image: "https://images.unsplash.com/photo-1593765762957-d8d876a1beeb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const whyChooseUs = [
    { icon: Wind, title: 'Sustainable Style', description: 'Reduce fashion waste by renting instead of buying. Look good while doing good for the planet.' },
    { icon: Infinity, title: 'Limitless Wardrobe', description: 'Access thousands of designer outfits for a fraction of the retail price.' },
    { icon: Users, title: 'Join the Community', description: 'Become part of a forward-thinking community that values style and sustainability.' },
];

const Home = () => {
    const [popularItems, setPopularItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        const getPopularItems = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts({ sort: 'newest', limit: 8 });
                setPopularItems(data.products);
            } catch (err) {
                setError('Could not load items.');
                toast.error('Could not load popular items.');
            } finally {
                setLoading(false);
            }
        };
        getPopularItems();
    }, []);

    return (
        <div className="bg-ink text-white">
            <Hero />

            <section className="py-24 px-6 bg-gradient-to-b from-ink to-plum overflow-hidden">
              <div className="max-w-5xl mx-auto">
                <SectionTitle 
                  title="A Category for Every Story" 
                  subtitle="Discover curated collections that perfectly match your unique style and occasion." 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8 }}
                  animate={{ y: [0, -8, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
                  className="relative mt-12 group"
                >
                  <div className="relative max-w-sm mx-auto flex items-center justify-center">
                    <div className="swiper-button-prev-cat z-10 p-2 rounded-full bg-primary/50 hover:bg-primary transition-colors cursor-pointer hidden sm:block mr-8">
                        <ChevronLeft className="text-white w-6 h-6" />
                    </div>
                    <Swiper
                        speed={800}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        effect={'cards'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        initialSlide={0}
                        modules={[EffectCards, Navigation, Autoplay]}
                        navigation={{ nextEl: '.swiper-button-next-cat', prevEl: '.swiper-button-prev-cat' }}
                        className="!w-72 md:!w-80 h-96"
                    >
                        {categories.map((category) => (
                            <SwiperSlide key={category.title} className="!rounded-2xl !overflow-hidden shadow-2xl shadow-plum/50">
                                <Link to="/browse">
                                    <img src={category.image} alt={category.title} loading='lazy' className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                        <h3 className="text-white text-3xl font-bold">{category.title}</h3>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-next-cat z-10 p-2 rounded-full bg-primary/50 hover:bg-primary transition-colors cursor-pointer hidden sm:block ml-8">
                        <ChevronRight className="text-white w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
            
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

            <section className="py-24 px-6 bg-plum/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
                            <SectionTitle align="left" title="Trending Now" subtitle="Discover the most popular outfits and accessories currently being rented." />
                            <Link to="/browse">
                                <motion.button whileHover={{ scale: 1.05 }} className="mt-4 bg-primary px-6 py-2 rounded-lg font-semibold text-white">
                                    Explore All
                                </motion.button>
                            </Link>
                        </motion.div>
                        <div className="lg:col-span-2">
                            {loading ? (
                                <div className="flex justify-center items-center h-72">
                                    <div className="w-10 h-10 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-400 p-8 bg-plum/20 rounded-lg">{error}</div>
                            ) : (
                                isDesktop ? (
                                    <HorizontalCarousel>
                                        {popularItems.map((p_item) => (
                                            <div key={p_item._id} className="w-72 flex-shrink-0 snap-center">
                                                <ItemCard {...p_item} />
                                            </div>
                                        ))}
                                    </HorizontalCarousel>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {popularItems.slice(0, 4).map((p_item) => (
                                            <ItemCard key={p_item._id} {...p_item} />
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>
            
            <HowItWorks />
            <Testimonials />
            <Brands />
            <CTA />
        </div>
    );
};

export default Home;