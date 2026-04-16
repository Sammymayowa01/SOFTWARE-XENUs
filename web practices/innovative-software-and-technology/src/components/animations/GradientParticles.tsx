"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GradientParticles: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-radial-gradient from-electric-blue/20 to-transparent blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-radial-gradient from-accent-blue/15 to-transparent blur-[100px]"
      />
      
      {/* Floating Particles - Client side only to avoid Hydration Mismatch */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: (i * 7) % 100 + "%", 
            y: (i * 13) % 100 + "%", 
            opacity: 0.2
          }}
          animate={{
            y: ["-10%", "110%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 15 + (i % 5),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
        />
      ))}
    </div>
  );
};

export default GradientParticles;
