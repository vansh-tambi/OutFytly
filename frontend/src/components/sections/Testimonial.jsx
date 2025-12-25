// src/components/sections/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
  { id: 1, name: 'Aarav Sharma', location: 'Delhi', text: 'OutFytly has completely changed my shopping experience. The quality of the outfits is amazing, and the entire process is incredibly smooth. Love it!', avatar: 'https://i.pravatar.cc/150?u=aarav', rating: 5 },
  { id: 2, name: 'Priya Mehta', location: 'Mumbai', text: 'I found the perfect dress for a wedding in minutes! Super stylish collection, fast delivery, and a beautiful user interface. Totally recommend!', avatar: 'https://i.pravatar.cc/150?u=priya', rating: 5 },
  { id: 3, name: 'Rahul Verma', location: 'Bangalore', text: "As someone who lists clothes, this is the best fashion marketplace I've used. The seller dashboard is easy to navigate and my items get rented out quickly.", avatar: 'https://i.pravatar.cc/150?u=rahul', rating: 5 },
  { id: 4, name: 'Ananya Iyer', location: 'Hyderabad', text: "The variety is unmatched and the sustainability aspect makes me feel good about my choices. A fantastic platform!", avatar: 'https://i.pravatar.cc/150?u=ananya', rating: 5 },
  { id: 5, name: 'Vikram Singh', location: 'Pune', text: 'Excellent platform with great customer service. I appreciate the easy refund policy and the wide range of products available.', avatar: 'https://i.pravatar.cc/150?u=vikram', rating: 5 },
  { id: 6, name: 'Neha Gupta', location: 'Chennai', text: 'Best fashion rental experience ever! The quality is consistent and the prices are very reasonable. Keep up the great work!', avatar: 'https://i.pravatar.cc/150?u=neha', rating: 5 },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-1 text-yellow-500">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} size={16} fill="currentColor" />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-24 bg-ink overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          variants={{
            initial: { opacity: 0, y: -20 },
            whileInView: { opacity: 1, y: 0 }
          }}
          initial="initial"
          whileInView="whileInView"
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-white"
        >
          💬 What Our <span className="gradient-text">Community</span> Says
        </motion.h2>

        <div className="relative group">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
            pagination={{ clickable: true, el: '.swiper-pagination' }}
            navigation={{ nextEl: '.custom-swiper-next', prevEl: '.custom-swiper-prev' }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="!pb-16"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={t.id} className="!w-full max-w-lg select-none">
                <motion.div 
                  variants={{
                    initial: { opacity: 0, scale: 0.9 },
                    whileInView: { opacity: 1, scale: 1 }
                  }}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-xl shadow-lg p-8 text-left border-primary/30 h-full flex flex-col glow-hover">
                  <Quote className="text-primary/50 mb-4" size={32} />
                  <p className="text-lavender/80 italic mb-6 leading-relaxed flex-grow">"{t.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/50" />
                    <div>
                      <h3 className="font-semibold text-white text-lg">{t.name}</h3>
                      <p className="text-sm text-lavender/60">{t.location}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="custom-swiper-prev absolute top-1/2 -translate-y-1/2 left-0 sm:left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-primary border border-white/30 cursor-pointer opacity-0 group-hover:opacity-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-white" size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="custom-swiper-next absolute top-1/2 -translate-y-1/2 right-0 sm:right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-primary border border-white/30 cursor-pointer opacity-0 group-hover:opacity-100"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-white" size={16} />
          </motion.button>

          {/* Pagination dots */}
          <div className="swiper-pagination !bottom-0 !relative mt-8"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
