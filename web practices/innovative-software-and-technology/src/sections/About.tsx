"use client";

import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 bg-light-grey text-dark-grey relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-navy-blue text-center mb-16"
        >
          About <span className="text-electric-blue">Software Nexus</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative group"
          >
            <div className="absolute -inset-4 bg-electric-blue/10 rounded-3xl blur-2xl group-hover:bg-electric-blue/20 transition-all duration-500" />
            <img
              src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Team Collaborating"
              className="rounded-2xl shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          <div className="lg:w-1/2 text-lg leading-relaxed text-gray-700">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              At <span className="font-bold text-navy-blue">Software Nexus</span>, we are a collective of passionate innovators, dedicated to crafting
              transformative software solutions. Our team comprises highly skilled engineers,
              visionary designers, and strategic consultants, all united by a common goal:
              to deliver unparalleled value through technology.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              Founded on the principle of partnership, we believe that the most successful
              solutions emerge from deep collaboration. We immerse ourselves in your challenges,
              understand your aspirations, and work hand-in-hand to build scalable, resilient,
              and future-proof systems.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Our commitment extends beyond code; it encompasses a steadfast dedication to quality,
              transparency, and the ultimate success of your business. As your trusted technology partner,
              we guide you through every phase of your digital journey.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;