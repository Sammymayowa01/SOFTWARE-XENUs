"use client";

import React from 'react';

const projects = [
  { 
    id: 1, 
    title: 'Web & Mobile App Development', 
    category: 'Full-Stack Engineering',
    description: 'Engineering bespoke, high-performance applications with a focus on seamless cross-platform synchronization and architectural integrity.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'Flutter'],
    accent: 'from-blue-600/20 to-cyan-400/20'
  },
  { 
    id: 2, 
    title: 'Customer Experience Platform', 
    category: 'UX Transformation',
    description: 'A sophisticated engagement platform designed to optimize the digital touchpoints between global enterprises and their end-users.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'GraphQL', 'Prisma'],
    accent: 'from-purple-600/20 to-blue-400/20'
  },
  { 
    id: 3, 
    title: 'Cloud Migration Suite', 
    category: 'Cloud Infrastructure',
    description: 'Strategic infrastructure modernization utilizing automated migration pathways and containerized cloud-native architectures.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    tags: ['AWS', 'Terraform', 'K8s'],
    accent: 'from-blue-600/20 to-indigo-400/20'
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 bg-[#020817] text-white relative overflow-hidden">
      {/* Subtle Background Texturing */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-blue-500"></span>
            <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">Our Portfolio</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1]">
            Delivering Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Excellence at Scale</span>
          </h2>
          
          <p className="text-slate-400 text-xl font-light leading-relaxed">
            We combine strategic thinking with technical mastery to solve complex challenges for the world's most innovative companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col h-full bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden hover:bg-slate-900/60 transition-all duration-500 backdrop-blur-sm"
            >
              {/* Image & Gradient Overlay */}
              <div className="relative h-72 w-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${project.accent} opacity-40 group-hover:opacity-20 transition-opacity duration-500 z-10`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20" />
                
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute top-6 right-6 z-30">
                  <div className="px-4 py-1.5 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    {project.category}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-blue-400/80">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-10 font-light line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <button className="flex items-center gap-3 text-white font-medium text-sm transition-all">
                    Explore Case Study 
                    <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
                      <span className="text-blue-400 text-xs">→</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Hover Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
