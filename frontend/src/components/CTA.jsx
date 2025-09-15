// src/components/CTA.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Wind, Infinity, Users } from 'lucide-react';

const keyFeatures = [
    {
        icon: Wind,
        title: "Sustainable Style",
        description: "Join the movement to reduce fashion waste. Renting is a smarter choice for the planet."
    },
    {
        icon: Infinity,
        title: "Limitless Wardrobe",
        description: "Access thousands of unique, high-end pieces for any occasion without the commitment of buying."
    },
    {
        icon: Users,
        title: "Vibrant Community",
        description: "Connect with fellow fashion lovers, share your style, and earn from your own closet."
    }
];

const CTA = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section 
      ref={sectionRef} 
      className="relative max-w-7xl mx-auto px-4 sm:px-6 my-24 h-[600px] md:h-[500px] rounded-2xl overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1578939654256-636c7a456105?w=1200)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: y
        }} 
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />

      <div className="relative z-20 h-full grid md:grid-cols-2 gap-8 items-center">
        {/* --- Left Column: Main CTA --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl p-8 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Ready to Redefine Your Wardrobe?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-lavender/80">
            Join a community where style meets sustainability. Discover unique pieces and give your own fashion a new life.
          </p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
  <Link to="/signup">
    <motion.button 
      whileHover={{ scale: 1.05, y: -3, boxShadow: "0px 10px 30px rgba(138, 43, 225, 0.4)" }} 
      whileTap={{ scale: 0.95 }} 
      className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg inline-flex items-center gap-2"
    >
      Join OutFytly Now <ArrowRight size={20} />
    </motion.button>
  </Link>
</motion.div>
        </motion.div>

        {/* --- Right Column: Key Feature Highlights --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hidden md:flex flex-col gap-6 p-8"
        >
          {keyFeatures.map((feature, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                className="flex items-start gap-4 bg-plum/30 backdrop-blur-sm p-4 rounded-xl border border-lavender/20"
             >
                <div className="bg-primary/20 text-primary p-3 rounded-full">
                    <feature.icon size={24} />
                </div>
                <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-lavender/70 text-sm">{feature.description}</p>
                </div>
             </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;