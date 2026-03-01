"use client";

import React from "react";
import { SkillsGlobe } from "./SkillsGlobe";
import { motion } from "framer-motion";

export function About() {
  return (
    <section className="bg-[#121212] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Element */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-emerald-500 mb-2 tracking-widest uppercase"
          >
            About Me
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Intelligence.</span>
          </motion.h3>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          
          {/* Card 1: Core Bio (Large, spans 2 columns, 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 row-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden group custom-scrollbar"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
            
            <h4 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider text-emerald-400">The Journey</h4>
            <div className="space-y-4 md:space-y-6 text-gray-400 leading-relaxed text-[15px] md:text-lg font-light">
              <p>
                As a final-year CS undergrad and <span className="text-white font-medium">Generative AI Engineer</span>, I architect complex systems around <span className="text-emerald-400 font-medium">Large Language Models (LLMs)</span> and <span className="text-white font-medium">Retrieval-Augmented Generation (RAG)</span> pipelines. My focus is entirely on building AI applications that are accurate, efficient, and hallucination-free.
              </p>
              <p>
                I specialize in bridging the gap between raw machine intelligence and intuitive user experiences. By combining robust full-stack engineering (<span className="text-white italic">React, Next.js, Node</span>) with cutting-edge vector databases (<span className="text-white italic">Pinecone, ChromaDB</span>), I create end-to-end pipelines that allow AI to interact responsibly with massive datasets.
              </p>
              <p>
                My core philosophy: <span className="text-emerald-300 font-medium tracking-wide">elegant engineering solves complex problems.</span>
              </p>
            </div>
          </motion.div>

          {/* Card 2: The 3D Skills Globe (Tall, spans 1 col, 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 lg:col-span-2 row-span-2 bg-black/40 border border-white/10 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center p-6 group hover:border-emerald-500/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_60%)] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
            
            <div className="absolute top-6 left-8 z-10 pointer-events-none">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Technical Arsenal</span>
            </div>

            <div className="w-full h-full flex items-center justify-center -mt-8">
              {/* Scale it down slightly to fit the bento box */}
              <div className="scale-90 md:scale-100">
                <SkillsGlobe />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Philosophy / Quote (Wide, spans 2 cols, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-center"
          >
            <svg className="w-8 h-8 text-emerald-500/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl text-gray-300 font-light italic leading-relaxed">
              "Driven to build scalable, production-ready AI applications that solve complex real-world challenges through elegant engineering."
            </p>
          </motion.div>

          {/* Card 4: Quick Stat / Focus Area (Small, 1 col, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 lg:col-span-1 row-span-1 bg-white/5 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-between group hover:bg-emerald-500/10 transition-all duration-300 hover:-translate-y-1"
          >
             <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Primary Focus</h4>
             <div>
                <span className="text-3xl md:text-4xl font-bold text-white block mb-2">RAG Architecture</span>
                <span className="text-xs md:text-sm text-gray-400 font-medium tracking-wide">Retrieval-Augmented Generation</span>
             </div>
          </motion.div>

          {/* Card 5: Experience/Education Marker (Small, 1 col, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 lg:col-span-1 row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
          >
             <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Education</h4>
             <div>
                <span className="text-3xl md:text-4xl font-bold text-white block mb-2">B.Tech CS</span>
                <span className="text-xs md:text-sm text-gray-400 font-medium tracking-wide">Final Year Undergraduate</span>
             </div>
          </motion.div>

          {/* Card 6: Current Project/Status (Wide spans all 4 cols, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-3 lg:col-span-4 row-span-1 bg-gradient-to-r from-emerald-500/10 to-transparent backdrop-blur-md border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-center"
          >
             <div className="flex items-center gap-4 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Current Status</h4>
             </div>
             <p className="text-lg md:text-xl text-white font-medium">Currently building highly-scalable LLM applications and actively seeking <span className="text-emerald-300">New Software Engineering Roles</span>.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
