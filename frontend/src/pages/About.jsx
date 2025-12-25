import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sparkles, Users, Wind, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
    { name: 'Vansh Tambi', role: 'Founder & Full Stack Developer', avatar: 'https://i.pravatar.cc/150?u=jane2', bio: 'Building the future of sustainable fashion, one line of code at a time.' },
    { name: 'Jane Doe', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?u=vansh1', bio: 'Crafting beautiful, intuitive experiences that make style accessible to everyone.' },
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
            <div className="relative text-center py-24 px-6 bg-gradient-to-b from-plum to-ink">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6 }} 
                    className="text-4xl md:text-5xl font-bold text-white"
                >
                    Fashion for a <span className="text-primary">Better Future.</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.2 }} 
                    className="text-lavender/80 mt-4 max-w-3xl mx-auto text-lg"
                >
                    OutFytly isn't just a marketplace. We're a movement towards a more sustainable and stylish world.
                </motion.p>
            </div>

            {/* --- The Storytelling Timeline --- */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-lavender">
                        Our Journey
                    </h2>
                    <div className="relative">
                        {/* The vertical line is hidden on mobile */}
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 h-full w-0.5 bg-lavender/20"></div>
                        
                        {timelineEvents.map((event, i) => {
                            const Icon = event.icon;
                            return (
                                <div key={i} className="relative mb-12 flex items-center md:min-h-[180px]">
                                    {/* On mobile, content is on the right. On desktop, it alternates. */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.4 }}
                                        transition={{ duration: 0.7 }}
                                        className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right md:ml-auto'}`}
                                    >
                                        <div className={`p-6 rounded-lg bg-plum/50 border border-lavender/20 ${i % 2 === 0 ? 'md:ml-8' : 'md:mr-8'} ml-12`}>
                                            <h3 className="text-2xl font-bold text-primary mb-2">{event.title}</h3>
                                            <p className="text-lavender/80">{event.text}</p>
                                        </div>
                                    </motion.div>
                                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 bg-ink p-3 rounded-full border-2 border-primary shadow-md">
                                        <Icon className="text-primary" size={22} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- Interactive Team Showcase --- */}
            <section className="py-20 bg-gradient-to-t from-plum/50 to-ink">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: false }} 
                        className="text-3xl md:text-4xl font-bold text-white text-center mb-10"
                    >
                        The People Behind the Passion
                    </motion.h2>
                    
                    {/* ✅ FIX: This is now a responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-plum p-6 rounded-2xl shadow-lg text-center border border-lavender/20"
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