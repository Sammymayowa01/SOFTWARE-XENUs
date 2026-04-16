"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFoundClient() {
  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5" />
      
      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl md:text-[140px] font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-6 leading-none">
            404
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Page Not Found
          </h2>
          
          <p className="text-lg text-slate-400 mb-8 font-light">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-colors shadow-lg"
            >
              Go to Home
            </Link>
            <Link 
              href="/#contact"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-colors border border-slate-700"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
