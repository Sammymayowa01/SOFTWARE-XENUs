"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { navLinks } from '@/constants';
import Logo from './Logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 top-0 transition-all duration-500 border-b ${
        scrolled 
          ? "bg-slate-950/80 backdrop-blur-xl border-slate-800 py-3" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <motion.a 
          href="#home" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Logo className="w-10 h-10 relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              Software <span className="text-blue-500">Nexus</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-slate-500 mt-1">Precision Engineering</span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={`#${link.id}`}
                  className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors duration-300 relative group/link"
                >
                  {link.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-950 border-slate-800 p-0 w-full sm:max-w-xs">
              <div className="flex flex-col h-full p-10">
                <div className="flex items-center gap-3 mb-16">
                  <Logo className="w-8 h-8" />
                  <span className="text-xl font-bold text-white">Nexus</span>
                </div>
                
                <ul className="flex flex-col gap-8">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <SheetClose asChild>
                        <a 
                          href={`#${link.id}`}
                          className="text-2xl font-bold text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          {link.title}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <SheetClose asChild>
                    <a 
                      href="#contact"
                      className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center"
                    >
                      Get Started
                    </a>
                  </SheetClose>
                  <p className="text-center text-slate-600 text-xs mt-8 uppercase tracking-widest">
                    &copy; 2026 Software Nexus
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
