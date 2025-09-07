// src/pages/Careers.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Wind, Rocket, Users, PartyPopper } from 'lucide-react';

const jobOpenings = [
  {
    title: 'Frontend Developer (React)',
    location: 'Bhopal, India',
    type: 'Full-time',
    slug: 'frontend-developer',
  },
  {
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Full-time',
    slug: 'ui-ux-designer',
  },
  {
    title: 'Logistics Manager',
    location: 'Bhopal, India',
    type: 'Full-time',
    slug: 'logistics-manager',
  },
  {
    title: 'Marketing & Social Media Specialist',
    location: 'Remote',
    type: 'Part-time',
    slug: 'marketing-specialist',
  },
];

const perks = [
  {
    title: 'Work for Impact',
    description: 'Be a part of the sustainable fashion revolution.',
    icon: Wind,
  },
  {
    title: 'Grow With Us',
    description: 'Excel in your career at a fast-paced, growing startup.',
    icon: Rocket,
  },
  {
    title: 'Great Culture',
    description: 'Enjoy an inclusive, collaborative, and creative environment.',
    icon: Users,
  },
  {
    title: 'Fun & Perks',
    description: 'Benefit from fun team activities, flexible hours, and more.',
    icon: PartyPopper,
  },
];

// Animation variants for smoother staggering
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};


const Careers = () => {
  return (
    <div className="bg-ink text-white">
      {/* --- Hero Section --- */}
      <div className="text-center py-24 px-6 bg-gradient-to-b from-plum to-ink">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-4xl md:text-5xl font-bold text-white mb-4">
          Join Our Team 💼
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }} className="text-lg text-lavender/80 max-w-3xl mx-auto">
          Help us build the future of sustainable fashion. We're looking for passionate, creative individuals to join our revolution.
        </motion.p>
      </div>

      {/* --- Why Work With Us? --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-lavender">Why Work With Us?</h2>
          <motion.div 
            variants={containerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {perks.map((perk) => {
              const Icon = perk.icon; // THE FIX: Assign to a capitalized variable
              return (
                <motion.div key={perk.title} variants={itemVariant} className="text-center">
                  <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} /> {/* Use the capitalized variable here */}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{perk.title}</h3>
                  <p className="text-lavender/70">{perk.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- Open Positions --- */}
      <section className="py-20 px-6 bg-plum/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-lavender">Open Positions</h2>
          <motion.div 
            variants={containerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {jobOpenings.map((job) => (
              <motion.div key={job.slug} variants={itemVariant}>
                <Link to={`/careers/${job.slug}`} className="block p-6 bg-ink rounded-xl border border-lavender/20 hover:border-primary hover:bg-plum/50 transition-colors group">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-lavender/60 mt-2">
                        <span className="flex items-center gap-1.5"><MapPin size={14}/> {job.location}</span>
                        <span>&bull;</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-primary flex items-center gap-2 font-semibold">
                      Apply Now <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;