// src/pages/Careers.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Wind,
  Rocket,
  Users,
  PartyPopper,
  Building,
  Globe,
} from "lucide-react";

const allJobOpenings = [
  { title: "Frontend Developer (React)", location: "Bhopal", type: "Full-time", slug: "frontend-developer" },
  { title: "UI/UX Designer", location: "Remote", type: "Full-time", slug: "ui-ux-designer" },
  { title: "Logistics Manager", location: "Bhopal", type: "Full-time", slug: "logistics-manager" },
  { title: "Marketing & Social Media Specialist", location: "Remote", type: "Part-time", slug: "marketing-specialist" },
  { title: "Backend Developer (Node.js)", location: "Bhopal", type: "Full-time", slug: "backend-developer" },
  { title: "Data Analyst", location: "Remote", type: "Contract", slug: "data-analyst" },
];

const perks = [
  { title: "Work for Impact", description: "Be a part of the sustainable fashion revolution.", icon: Wind },
  { title: "Grow With Us", description: "Excel in your career at a fast-paced, growing startup.", icon: Rocket },
  { title: "Great Culture", description: "Enjoy an inclusive, collaborative, and creative environment.", icon: Users },
  { title: "Fun & Perks", description: "Benefit from fun team activities, flexible hours, and more.", icon: PartyPopper },
];

const containerVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14 } },
};

// ✅ Optimization: Moved static array outside the component to prevent re-creation on renders.
const filters = ["All", "Bhopal", "Remote"];

const Careers = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredJobs = useMemo(() => {
    if (activeFilter === "All") return allJobOpenings;
    return allJobOpenings.filter((job) => job.location === activeFilter);
  }, [activeFilter]);

  return (
    <motion.div
      className="bg-ink text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* --- Hero Section --- */}
      <div className="relative text-center py-24 px-6 bg-gradient-to-b from-plum to-ink overflow-hidden"> {/* 🔽 Optimized: py-28 -> py-24 */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(138,43,225,0.1),rgba(255,255,255,0))]"></div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10"
        >
          Shape the Future of Fashion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-lavender/80 max-w-3xl mx-auto relative z-10"
        >
          We're looking for passionate, creative individuals to join our revolution. Find your place at OutFytly.
        </motion.p>
      </div>

      {/* --- Why Work With Us? --- */}
      <section className="py-16 px-6"> {/* 🔽 Optimized: py-20 -> py-16 */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-lavender"> {/* 🔽 Optimized: Corrected and refined margin */}
            A Culture of Innovation & Style
          </h2>
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <motion.div 
                  key={perk.title} 
                  variants={itemVariant} 
                  className="text-center p-4"
                  whileHover={{ y: -6, transition: { duration: 0.2 } }} // ✅ Optimization: Added hover effect
                >
                  <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-primary/20">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{perk.title}</h3>
                  <p className="text-lavender/70 text-sm">{perk.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- Open Positions --- */}
      <section className="py-16 px-6 bg-plum/30"> {/* 🔽 Optimized: py-20 -> py-16 */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-lavender"> {/* 🔽 Optimized: mb-8 -> mb-6 */}
            Open Positions
          </h2>

          <div className="relative flex justify-center gap-2 mb-8 p-1 bg-ink/50 rounded-full"> {/* 🔽 Optimized: mb-10 -> mb-8, gap-4 -> gap-2 */}
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors z-10 ${
                  activeFilter === filter ? "text-white" : "text-lavender hover:text-white"
                }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="active-filter-pill-careers"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  />
                )}
                <span className="relative">{filter}</span>
              </button>
            ))}
          </div>

          <motion.div layout transition={{ duration: 0.4 }} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  layout="position"
                  key={job.slug}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ type: 'tween', ease: 'circOut', duration: 0.4 }} // ✅ Optimization: Smoother animation
                >
                  <Link
                    to={`/careers/${job.slug}`}
                    className="block p-6 bg-ink rounded-xl border border-lavender/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-lavender/60 mt-2">
                          <span className="flex items-center gap-1.5">
                            {job.location === "Remote" ? <Globe size={14} /> : <Building size={14} />}
                            {job.location}
                          </span>
                          <span>&bull;</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex-shrink-0 text-primary flex items-center gap-2 font-semibold">
                        View Opening{" "}
                        <ArrowRight
                          size={18}
                          className="transform transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Careers;