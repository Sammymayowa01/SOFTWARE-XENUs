"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import NetworkAnimation from '../components/animations/NetworkAnimation';

interface Slide {
  id: number;
  tagline: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
  };
}

// Order: img3, img1, img2, img4
const slides: Slide[] = [
  {
    id: 3,
    tagline: "Modern Infrastructure",
    title: "Robust, Secure, and",
    highlight: "Indefinitely Scalable",
    description: "Architecting high-performance systems designed to handle modern workloads while maintaining the highest security standards.",
    image: "/software img 2.jpg",
    primaryCTA: { text: "Cloud Strategy", link: "#services" },
    secondaryCTA: { text: "View Portfolio" }
  },
  {
    id: 1,
    tagline: "Custom Software Solutions",
    title: "Engineering the Future of",
    highlight: "Digital Enterprise",
    description: "We build scalable, cloud-native applications that drive operational efficiency and market-leading innovation for global businesses.",
    image: "/hero-professional.jpg",
    primaryCTA: { text: "Start Your Project", link: "#contact" },
    secondaryCTA: { text: "Our Expertise" }
  },
  {
    id: 2,
    tagline: "Artificial Intelligence",
    title: "Transforming Data into",
    highlight: "Actionable Intelligence",
    description: "Leverage cutting-edge AI and machine learning models to automate complex workflows and uncover deep business insights.",
    image: "/software img 1.jpg",
    primaryCTA: { text: "Explore AI Solutions", link: "#services" },
    secondaryCTA: { text: "Case Studies" }
  },
  {
    id: 4,
    tagline: "Global Tech Partner",
    title: "Your Vision, Our",
    highlight: "Technical Excellence",
    description: "Bridging the gap between ambitious ideas and reality with world-class engineering teams dedicated to your long-term success.",
    image: "/software img 3.jpg",
    primaryCTA: { text: "Partner With Us", link: "#contact" },
    secondaryCTA: { text: "Our Expertise" }
  }
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered) {
      autoplayRef.current = setInterval(nextSlide, 6000);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isHovered, nextSlide]);

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.12,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  const imageVariants = {
    initial: { scale: 1.08 },
    animate: { 
      scale: 1,
      transition: { duration: 6, ease: "linear" }
    }
  };

  return (
    <section 
      id="home"
      className="relative w-full h-screen min-h-[650px] overflow-hidden bg-[#0A1A2F] flex items-center justify-center text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div 
              variants={imageVariants}
              initial="initial"
              animate="animate"
              className="relative w-full h-full"
            >
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                fill
                priority
                className="object-cover object-center grayscale-[0.05]"
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-[#0A1A2F]/65 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F]/40 via-transparent to-[#0A1A2F]/40 z-10" />
          </div>

          {/* Animation Overlay */}
          <div className="absolute inset-0 z-[15] opacity-15 pointer-events-none">
            <NetworkAnimation />
          </div>

          {/* Centered Content Container */}
          <div className="relative z-20 w-full container mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center">
            <div className="max-w-4xl">
              <motion.div
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="mb-6 flex items-center justify-center gap-5"
              >
                <div className="w-10 h-[1px] bg-electric-blue/60" />
                <span className="text-electric-blue text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] leading-none">
                  {slides[currentIndex].tagline}
                </span>
                <div className="w-10 h-[1px] bg-electric-blue/60" />
              </motion.div>

              <motion.h1
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold text-white leading-[1.15] mb-8 tracking-tight"
              >
                {slides[currentIndex].title} <br />
                <span className="text-white font-extralight italic opacity-90 block mt-2">
                   {slides[currentIndex].highlight}
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-sm md:text-lg lg:text-xl text-light-grey/80 max-w-2xl mx-auto mb-12 leading-[1.8] font-light tracking-wide"
              >
                {slides[currentIndex].description}
              </motion.p>

              <motion.div
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-6 items-center justify-center"
              >
                <a 
                  href={slides[currentIndex].primaryCTA.link}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-electric-blue text-white text-base md:text-lg font-semibold rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_15px_35px_rgba(29,78,216,0.3)]"
                >
                  <span className="relative z-10 tracking-wider">{slides[currentIndex].primaryCTA.text}</span>
                  <ArrowRight size={20} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                  <div className="absolute inset-0 translate-y-full bg-accent-blue transition-transform duration-500 group-hover:translate-y-0" />
                </a>
                
                {slides[currentIndex].secondaryCTA && (
                  <button className="group inline-flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white text-base md:text-lg font-medium rounded-sm backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/30">
                    <span className="tracking-wide">{slides[currentIndex].secondaryCTA.text}</span>
                    <div className="w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-4 ml-1" />
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Centered Pagination Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative p-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-700 ease-out",
              currentIndex === index 
                ? "bg-electric-blue scale-[1.5] shadow-[0_0_12px_rgba(29,78,216,0.8)]" 
                : "bg-white/20 group-hover:bg-white/40"
            )} />
            
            {currentIndex === index && (
              <svg className="absolute inset-0 w-6 h-6 -m-[2.25px] -rotate-90">
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="transparent"
                  className="text-electric-blue/50"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A1A2F] to-transparent pointer-events-none z-30 opacity-90" />
    </section>
  );
};

export default Hero;
