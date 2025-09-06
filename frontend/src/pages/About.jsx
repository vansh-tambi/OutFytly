import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-ink text-white"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-plum via-ink to-primary py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-lavender"
        >
          About Us 💜
        </motion.h1>
        <p className="text-gray-200 mt-4 max-w-3xl mx-auto">
          At <span className="text-primary font-semibold">Rent. Style. Repeat.</span>, 
          we believe fashion should be stylish, affordable, and sustainable.  
          Our mission is to bring you designer wear without the price tag and environmental guilt.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-plum p-8 rounded-2xl shadow-lg border-l-4 border-lavender"
        >
          <h2 className="text-2xl font-semibold text-lavender mb-3">
            🌱 Our Mission
          </h2>
          <p className="text-gray-100">
            We aim to reduce fashion waste by promoting a culture of renting 
            rather than buying. We make luxury fashion accessible while supporting 
            eco-friendly choices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-primary p-8 rounded-2xl shadow-lg border-l-4 border-lavender"
        >
          <h2 className="text-2xl font-semibold text-white mb-3">
            🚀 Our Vision
          </h2>
          <p className="text-gray-100">
            To revolutionize the way people experience fashion by building a 
            community where sustainability meets style, and luxury becomes 
            accessible to all.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-r from-ink via-plum to-ink py-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-lavender text-center mb-10"
        >
          Meet Our Team 🤝
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Vansh Tambi", role: "Founder & Full Stack Dev" },
            { name: "Vansh Tambi", role: "UI/UX Designer" },
            { name: "Vansh Tambi", role: "Operations & Logistics" },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-plum p-6 rounded-2xl shadow-lg text-center border-t-4 border-lavender"
            >
              <div className="w-20 h-20 mx-auto bg-lavender rounded-full mb-4 shadow-md"></div>
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-gray-200">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
