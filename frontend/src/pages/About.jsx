// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Wind, Users, Sparkles, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
    { name: 'Vansh Tambi', role: 'Founder & Full Stack Developer', avatar: 'https://i.pravatar.cc/150?u=vansh1', bio: 'Building the future of sustainable fashion, one line of code at a time.' },
    { name: 'Jane Doe', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?u=jane2', bio: 'Crafting beautiful, intuitive experiences that make style accessible to everyone.' },
    { name: 'John Smith', role: 'Operations & Logistics', avatar: 'https://i.pravatar.cc/150?u=john3', bio: 'Ensuring every outfit gets to you flawlessly, from our closet to yours.' },
    { name: 'Aisha Khan', role: 'Community Manager', avatar: 'https://i.pravatar.cc/150?u=aisha4', bio: 'Connecting fashion lovers and building a community passionate about sustainability.' },
];

const timelineEvents = [
    { icon: Sparkles, title: 'The Spark', text: 'Born from a simple idea: What if we could access a limitless wardrobe without the waste? OutFytly began as a mission to make fashion circular.' },
    { icon: Wind, title: 'Our Commitment to Sustainability', text: 'We built our platform on the core principle of sustainability. Every rental reduces fashion waste and promotes a healthier planet.' },
    { icon: Users, title: 'Building a Community', text: 'We launched and quickly grew a passionate community of renters and sellers, all united by a love for style and a desire for change.' },
    { icon: Eye, title: 'A Vision for the Future', text: 'Our goal is to be the global leader in fashion rental, revolutionizing how the world experiences style through technology and community.' },
];

const About = () => {
    return (
        <div className="bg-ink text-white overflow-hidden">
            {/* --- Hero Section --- */}
            <div className="relative text-center py-32 px-6 bg-gradient-to-b from-plum to-ink">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-white">
                    Fashion for a <span className="text-primary">Better Future.</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lavender/80 mt-6 max-w-3xl mx-auto text-lg">
                    OutFytly isn't just a marketplace. We're a movement towards a more sustainable and stylish world.
                </motion.p>
            </div>

            {/* --- The Storytelling Timeline --- */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-lavender">Our Journey</h2>
                    <div className="relative">
                        {/* The vertical line */}
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-lavender/20"></div>

                        {timelineEvents.map((event, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.8 }}
                                className="relative mb-16"
                            >
                                <div className={`flex items-center ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                    <div className="flex-1">
                                        <div className={`p-6 rounded-lg bg-plum/50 border border-lavender/20 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                            <h3 className="text-2xl font-bold text-primary mb-2">{event.title}</h3>
                                            <p className="text-lavender/80">{event.text}</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 bg-ink p-2 rounded-full border-2 border-primary">
                                        <event.icon className="text-primary" size={24} />
                                    </div>
                                    <div className="flex-1"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Interactive Team Showcase (Horizontal Scroll) --- */}
            <section className="py-24 bg-gradient-to-t from-plum/50 to-ink">
                <div className="max-w-7xl mx-auto">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                        The People Behind the Passion
                    </motion.h2>
                    <div className="flex gap-8 p-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-plum/50">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex-shrink-0 w-72 snap-center bg-plum p-6 rounded-2xl shadow-lg text-center border border-lavender/20"
                            >
                                <img src={member.avatar} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md border-2 border-primary/50" />
                                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                                <p className="text-sm text-lavender/70 mt-2 italic">"{member.bio}"</p>
                                <div className="flex justify-center gap-4 mt-4 text-lavender/60">
                                    <a href="#" className="hover:text-primary"><Linkedin size={20} /></a>
                                    <a href="#" className="hover:text-primary"><Twitter size={20} /></a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;