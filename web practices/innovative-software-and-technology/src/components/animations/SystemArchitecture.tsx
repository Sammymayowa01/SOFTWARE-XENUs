"use client";

import React from 'react';
import { motion } from 'framer-motion';

const SystemArchitecture: React.FC = () => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center bg-navy-blue/5 rounded-xl overflow-hidden border border-electric-blue/10">
      <div className="relative w-48 h-48">
        {/* Central Core */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 m-auto w-16 h-16 bg-electric-blue rounded-lg shadow-[0_0_20px_rgba(29,78,216,0.5)] z-10"
        />

        {/* Orbiting Modules */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, Math.cos((i * 90 * Math.PI) / 180) * 60],
              y: [0, Math.sin((i * 90 * Math.PI) / 180) * 60],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute inset-0 m-auto w-8 h-8 bg-accent-blue/30 border border-accent-blue rounded-md backdrop-blur-sm"
          />
        ))}

        {/* Connecting Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full">
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${50 + Math.cos((i * 90 * Math.PI) / 180) * 30}%`}
              y2={`${50 + Math.sin((i * 90 * Math.PI) / 180) * 30}%`}
              stroke="rgba(59, 130, 246, 0.4)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.2, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
        </svg>

        {/* Data Pulses */}
        <motion.div
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 m-auto w-16 h-16 border-2 border-accent-blue rounded-lg"
        />
      </div>
      
      {/* Floating Code Snippets (Visual only) */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 opacity-20">
        <div className="h-1 w-12 bg-white rounded-full" />
        <div className="h-1 w-8 bg-white rounded-full" />
        <div className="h-1 w-10 bg-white rounded-full" />
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1 opacity-20 items-end">
        <div className="h-1 w-10 bg-white rounded-full" />
        <div className="h-1 w-12 bg-white rounded-full" />
        <div className="h-1 w-8 bg-white rounded-full" />
      </div>
    </div>
  );
};

export default SystemArchitecture;
