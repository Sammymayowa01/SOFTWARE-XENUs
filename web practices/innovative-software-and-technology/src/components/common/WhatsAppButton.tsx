"use client";

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = "2348139214035"; 
  const message = encodeURIComponent("Hello I'm interested in your services");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-[60]"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none" />
        
        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-8 h-8 relative z-10" />
        
        {/* Tooltip */}
        <span className="absolute right-16 bg-slate-900 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-slate-800">
          Chat with us
        </span>
      </a>
    </motion.div>
  );
}
