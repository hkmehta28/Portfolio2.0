"use client";

import React from "react";
import { HoverTiltCard } from "./HoverTiltCard";
import { motion } from "framer-motion";

export function Certifications() {
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
        <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase">
          Certifications
        </h2>
        <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-6"
      >
        
        {/* Certification Item 1 */}
        <motion.div variants={itemVariants}>
          <HoverTiltCard className="group relative bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-cyan-500/30 hover:shadow-[0_10px_40px_-15px_rgba(6,182,212,0.15)] overflow-hidden">
            {/* Card Left Accent Line */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors duration-500" />
            
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 pl-2">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">
                  LangChain Mastery: Build GenAI Apps
                </h3>
                <p className="text-cyan-400 mb-4 font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.5 4.5A.75.75 0 0111.25 3h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM8.25 6A.75.75 0 019 5.25h9a.75.75 0 010 1.5H9A.75.75 0 018.25 6zM6 8.25A.75.75 0 016.75 7.5h13.5a.75.75 0 010 1.5H6.75A.75.75 0 016 8.25z" clipRule="evenodd" />
                    <path d="M4.5 10.5a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5v6.5a4.5 4.5 0 01-4.5 4.5h-12A4.5 4.5 0 011.5 17v-6.5zm5.02 1.346a.75.75 0 00-1.04 1.008l1.455 1.5-1.455 1.5a.75.75 0 001.04 1.008l2-2.064a.75.75 0 000-1.008l-2-2.064zm1.517 3.328a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5h-2.25a.75.75 0 01-.75-.75z" />
                  </svg>
                  Udemy
                </p>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Built LLM-powered applications using LangChain, OpenAI API, Pinecone (Vector Database), and Retrieval-Augmented Generation (RAG).
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                  Feb 2026
                </span>
              </div>
            </div>
          </HoverTiltCard>
        </motion.div>

        {/* Certification Item 2 */}
        <motion.div variants={itemVariants}>
          <HoverTiltCard className="group relative bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-cyan-500/30 hover:shadow-[0_10px_40px_-15px_rgba(6,182,212,0.15)] overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 pl-2">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">
                  .NET Full-Stack Development Program
                </h3>
                <p className="text-cyan-400 mb-4 font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.5 4.5A.75.75 0 0111.25 3h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM8.25 6A.75.75 0 019 5.25h9a.75.75 0 010 1.5H9A.75.75 0 018.25 6zM6 8.25A.75.75 0 016.75 7.5h13.5a.75.75 0 010 1.5H6.75A.75.75 0 016 8.25z" clipRule="evenodd" />
                    <path d="M4.5 10.5a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5v6.5a4.5 4.5 0 01-4.5 4.5h-12A4.5 4.5 0 011.5 17v-6.5zm5.02 1.346a.75.75 0 00-1.04 1.008l1.455 1.5-1.455 1.5a.75.75 0 001.04 1.008l2-2.064a.75.75 0 000-1.008l-2-2.064zm1.517 3.328a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5h-2.25a.75.75 0 01-.75-.75z" />
                  </svg>
                  Wipro TalentNext
                </p>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Developed full-stack applications using C#, ASP.NET, JavaScript, SQL, and RESTful APIs with a focus on backend architecture.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                  Oct 2025
                </span>
              </div>
            </div>
          </HoverTiltCard>
        </motion.div>
        
        {/* Certification Item 3 */}
        <motion.div variants={itemVariants}>
          <HoverTiltCard className="group relative bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-cyan-500/30 hover:shadow-[0_10px_40px_-15px_rgba(6,182,212,0.15)] overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 pl-2">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">
                  Full-Stack Web Developer Course
                </h3>
                <p className="text-cyan-400 mb-4 font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.5 4.5A.75.75 0 0111.25 3h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM8.25 6A.75.75 0 019 5.25h9a.75.75 0 010 1.5H9A.75.75 0 018.25 6zM6 8.25A.75.75 0 016.75 7.5h13.5a.75.75 0 010 1.5H6.75A.75.75 0 016 8.25z" clipRule="evenodd" />
                    <path d="M4.5 10.5a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5v6.5a4.5 4.5 0 01-4.5 4.5h-12A4.5 4.5 0 011.5 17v-6.5zm5.02 1.346a.75.75 0 00-1.04 1.008l1.455 1.5-1.455 1.5a.75.75 0 001.04 1.008l2-2.064a.75.75 0 000-1.008l-2-2.064zm1.517 3.328a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5h-2.25a.75.75 0 01-.75-.75z" />
                  </svg>
                  Udemy
                </p>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Implemented frontend and backend systems using React.js, Node.js, Express.js, PostgreSQL, and JWT-based authentication.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                  Jan 2025
                </span>
              </div>
            </div>
          </HoverTiltCard>
        </motion.div>

      </motion.div>
    </div>
  );
}
