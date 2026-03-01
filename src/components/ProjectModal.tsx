import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectData {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  description: string;
  features?: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Overlay container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl pointer-events-auto flex flex-col relative"
            >
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Cover Image Header */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 pb-6">
                  <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3 inline-block">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12 pt-6 flex flex-col lg:flex-row gap-12">
                
                {/* Main Description */}
                <div className="lg:w-2/3 flex flex-col gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Overview</h4>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {project.features && (
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Key Features</h4>
                      <ul className="space-y-3">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Sidebar Info */}
                <div className="lg:w-1/3 flex flex-col gap-8">
                  
                  {/* Tech Stack */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-sm font-medium text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links Placeholder */}
                  <div className="flex flex-col gap-3">
                    <button className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Live Demo
                    </button>
                    <button className="w-full py-4 rounded-xl bg-white/5 text-white font-bold border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Source Code
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
