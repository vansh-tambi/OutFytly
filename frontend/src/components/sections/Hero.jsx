// src/components/sections/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  // General 3D rotation for the entire container
  const rotateX = useTransform(y, [0, 400], [15, -15]);
  const rotateY = useTransform(x, [0, 400], [-15, 15]);

  // Individual card translations for a richer, more sensitive effect
  const card1X = useTransform(x, [0, 400], [40, -40]); 
  const card1Y = useTransform(y, [0, 400], [40, -40]); 
  
  const card2X = useTransform(x, [0, 400], [-35, 35]);
  const card2Y = useTransform(y, [0, 400], [-35, 35]);

  const card3X = useTransform(x, [0, 400], [-45, 45]);
  const card3Y = useTransform(y, [0, 400], [25, -25]);

  const card4X = useTransform(x, [0, 400], [30, -30]);
  const card4Y = useTransform(y, [0, 400], [-20, 20]);


  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const sentence = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const word = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <section className="relative bg-ink text-white" onMouseMove={handleMouse}>
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* --- Left Column: Headline & CTA --- */}
        <div className="relative z-20 text-center lg:text-left">
          <motion.h1 variants={sentence} initial="hidden" animate="show" className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {"Rent. Style. Repeat.".split(" ").map((char, i) => (
              <motion.span key={i} variants={word} className="inline-block mr-4">
                {char === "Style." ? <span className="text-primary">{char}</span> : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="text-lg md:text-xl mb-10 text-lavender/80 max-w-xl mx-auto lg:mx-0">
            Access an endless wardrobe of premium looks. Rent designer outfits, or earn by sharing your own style with our community.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }}>
            <Link to="/browse">
              <motion.button whileHover={{ scale: 1.05, y: -3, boxShadow: "0px 10px 30px rgba(138, 43, 225, 0.4)" }} whileTap={{ scale: 0.95 }} className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg inline-flex items-center gap-2">
                Explore Collection <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* --- Right Column: 4-Card Interactive Image Stack --- */}
        <motion.div 
            className="hidden lg:block relative h-96 w-full"
            style={{ perspective: 1200 }}
        >
          {/* Card 4 (Back-most) */}
          <motion.div style={{ rotateX, rotateY, x: card4X, y: card4Y, rotateZ: -10 }} className="absolute top-10 right-0 w-64 h-80 rounded-2xl shadow-2xl overflow-hidden border-2 border-plum/50 z-0">
             <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" alt="Fashion 4" />
          </motion.div>
          {/* Card 3 */}
          <motion.div style={{ rotateX, rotateY, x: card3X, y: card3Y, rotateZ: 5 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 rounded-2xl shadow-2xl overflow-hidden border-2 border-plum/50 z-10">
             <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=500" alt="Fashion 3" />
          </motion.div>
          {/* Card 1 */}
          <motion.div style={{ rotateX, rotateY, x: card1X, y: card1Y, rotateZ: -6 }} className="absolute top-0 left-0 w-80 h-[400px] rounded-2xl shadow-2xl overflow-hidden border-2 border-plum/50 z-20">
             <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" alt="Fashion 1" />
          </motion.div>
          {/* Card 2 (Front-most) */}
          <motion.div style={{ rotateX, rotateY, x: card2X, y: card2Y, rotateZ: 8 }} className="absolute bottom-0 right-0 w-72 h-80 rounded-2xl shadow-2xl overflow-hidden border-4 border-plum/50 z-30">
             <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500" alt="Fashion 2" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(138,43,225,0.15),rgba(255,255,255,0))]"></div>
    </section>
  );
};

export default Hero;