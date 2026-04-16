"use client";

import React from 'react';
import Image from 'next/image';
import { FaLaptopCode, FaMobileAlt, FaCloud, FaChartLine } from 'react-icons/fa';

const services = [
  {
    title: 'Custom Software Development',
    description: 'Bespoke applications engineered for complex business logic and high scalability.',
    icon: <FaLaptopCode />,
    image: '/Custom Software Development.jpg',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    title: 'Mobile App Development',
    description: 'High-performance iOS and Android applications with native-level user experiences.',
    icon: <FaMobileAlt />,
    image: '/Mobile App Development img.jpg',
    color: 'from-purple-600 to-blue-500'
  },
  {
    title: 'Cloud Solutions & DevOps',
    description: 'Strategic cloud architecture modernization and automated CI/CD pipelines.',
    icon: <FaCloud />,
    image: '/Cloud Solutions & DevOps img.jpeg',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Digital Transformation',
    description: 'Consulting services to guide organizations through digital disruption and optimization.',
    icon: <FaChartLine />,
    image: '/Digital Transformation Consulting img 1.jpg',
    color: 'from-cyan-500 to-blue-600'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#020817] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-blue-500"></span>
            <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">Our Services</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-tight text-white">
            Engineering Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Without Limits</span>
          </h2>
          <p className="text-slate-400 text-xl font-light leading-relaxed">
            We provide specialized engineering services designed to solve the most demanding technical challenges of the modern enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col md:flex-row bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:bg-slate-900/60 transition-all duration-500 backdrop-blur-sm"
            >
              {/* Service Image Section */}
              <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-10 transition-opacity duration-500 z-10`} />
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Service Content Section */}
              <div className="md:w-3/5 p-10 md:p-12 flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light mb-8">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 text-blue-400 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                  Explore Service <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
