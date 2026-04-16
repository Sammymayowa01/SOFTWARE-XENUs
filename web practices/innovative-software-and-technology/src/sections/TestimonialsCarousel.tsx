"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    text: "Excellent service and timely delivery.",
    author: "John D.",
    role: "CEO, TechFlow",
    color: "from-blue-600 to-cyan-500"
  },
  {
    text: "Professional and detail-oriented team.",
    author: "Sarah K.",
    role: "Project Manager, Innovate AI",
    color: "from-purple-600 to-blue-500"
  },
  {
    text: "They built exactly what we needed.",
    author: "Michael A.",
    role: "CTO, Future Systems",
    color: "from-blue-500 to-indigo-600"
  },
  {
    text: "The technical expertise shown was top-notch.",
    author: "Emily R.",
    role: "Director, CloudScale",
    color: "from-cyan-500 to-blue-600"
  },
  {
    text: "Transformed our vision into a robust reality.",
    author: "David L.",
    role: "Founder, StartupX",
    color: "from-indigo-600 to-purple-500"
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(1); // Default to 1 for mobile-first/SSR
  const [mounted, setMounted] = useState(false);

  // Update items to show based on screen size
  useEffect(() => {
    setMounted(true);
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const next = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5500);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  // Logic to get visible testimonials based on current index and itemsToShow
  const getVisibleTestimonials = () => {
    if (!mounted) return testimonials.slice(0, 1); // Only show one on SSR
    
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      visible.push(testimonials[(index + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section id="testimonials" className="py-32 bg-[#020817] relative overflow-hidden">
      {/* Background patterns matching other sections */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      
      {/* Background decoration glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-blue-500"></span>
            <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">Testimonials</span>
            <span className="w-12 h-[1px] bg-blue-500"></span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white mb-8">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Clients Say</span>
          </h2>
          <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto">
            We take pride in delivering excellence. Here is what some of our valued clients have to say about their experience with us.
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex flex-col md:flex-row gap-8 min-h-[400px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {getVisibleTestimonials().map((testimonial, i) => (
                <motion.div
                  key={`${testimonial.author}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 flex flex-col bg-slate-900/40 border border-slate-800 p-10 md:p-12 rounded-[2.5rem] backdrop-blur-md hover:bg-slate-900/60 transition-all duration-500 group relative shadow-2xl"
                >
                  <div className="absolute top-10 right-10 text-blue-500/10 group-hover:text-blue-500/20 transition-colors duration-500">
                    <FaQuoteLeft size={48} />
                  </div>
                  
                  <div className="mb-10 relative z-10">
                    <p className="text-slate-300 text-xl leading-relaxed font-light italic">
                      "{testimonial.text}"
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-5 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <h4 className="text-white text-lg font-bold group-hover:text-blue-400 transition-colors duration-300">
                        {testimonial.author}
                      </h4>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-4 mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 transition-all duration-500 rounded-full ${
                  index === i 
                    ? 'w-12 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                    : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
