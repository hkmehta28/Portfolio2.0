"use client";

import React from "react";
import { HoverTiltCard } from "./HoverTiltCard";
import { motion } from "framer-motion";

export function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-4 mb-12"
      >
        <h2 className="text-sm font-bold text-emerald-500 tracking-widest uppercase">
          Education
        </h2>
        <div className="h-px bg-gradient-to-r from-emerald-500/50 to-transparent flex-1" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative ml-4 md:ml-6 space-y-12"
      >
        {/* Glow Line behind the timeline */}
        <div className="absolute top-0 bottom-0 left-[-3px] w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-500/20 to-transparent" />
        
        {/* Timeline Item 1 */}
        <motion.div variants={itemVariants} className="relative pl-10 md:pl-16 group cursor-default">
          {/* Glowing Animated Dot */}
          <div className="absolute left-[-9px] top-6 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#121212] flex items-center justify-center transition-all duration-500 group-hover:scale-150 group-hover:bg-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.8)]">
             <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Card */}
          <HoverTiltCard className="relative bg-black/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/[0.04] group-hover:border-emerald-500/30 group-hover:shadow-[0_15px_40px_-15px_rgba(16,185,129,0.2)] overflow-hidden">
            {/* Subtle Gradient Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
            
            <div className="relative z-10 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-emerald-50 transition-colors">
                  B.E. Computer Science & Engineering
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg flex items-center gap-2 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Chandigarh University – Chandigarh, India
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <span className="inline-block px-5 py-2 rounded-full bg-emerald-500 text-white border border-emerald-500/50 font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  Jun 2026
                </span>
              </div>
            </div>
          </HoverTiltCard>
        </motion.div>

        {/* Timeline Item 2 */}
        <motion.div variants={itemVariants} className="relative pl-10 md:pl-16 group cursor-default">
          <div className="absolute left-[-9px] top-6 w-3 h-3 rounded-full bg-emerald-500/40 ring-4 ring-[#121212] transition-all duration-500 group-hover:scale-150 group-hover:bg-emerald-400 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(16,185,129,0.8)]">
             <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <HoverTiltCard className="relative bg-black/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/[0.04] group-hover:border-emerald-500/30 group-hover:shadow-[0_15px_40px_-15px_rgba(16,185,129,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
            <div className="relative z-10 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-emerald-50 transition-colors">
                  Class XII
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg flex items-center gap-2 mt-2">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9z" clipRule="evenodd" />
                  </svg>
                  Jawaharlal Nehru Memorial Senior Secondary School
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold tracking-wider uppercase transition-all duration-300 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50 group-hover:text-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  Apr 2022
                </span>
              </div>
            </div>
          </HoverTiltCard>
        </motion.div>

        {/* Timeline Item 3 */}
        <motion.div variants={itemVariants} className="relative pl-10 md:pl-16 group cursor-default">
          <div className="absolute left-[-9px] top-6 w-3 h-3 rounded-full bg-emerald-500/40 ring-4 ring-[#121212] transition-all duration-500 group-hover:scale-150 group-hover:bg-emerald-400 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(16,185,129,0.8)]">
             <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <HoverTiltCard className="relative bg-black/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/[0.04] group-hover:border-emerald-500/30 group-hover:shadow-[0_15px_40px_-15px_rgba(16,185,129,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
            <div className="relative z-10 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-emerald-50 transition-colors">
                  Class X
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg flex items-center gap-2 mt-2">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9z" clipRule="evenodd" />
                  </svg>
                  De Nobili School, Maithon
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold tracking-wider uppercase transition-all duration-300 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50 group-hover:text-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  Mar 2020
                </span>
              </div>
            </div>
          </HoverTiltCard>
        </motion.div>

      </motion.div>
    </div>
  );
}

