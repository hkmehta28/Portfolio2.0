"use client";

import React from "react";
import { motion } from "framer-motion";

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative bg-[#121212] py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        <div className="flex flex-col md:flex-row gap-16 justify-between items-start">
          
          {/* Left Side: Text and CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2"
          >
            <h2 className="text-sm font-bold text-emerald-500 mb-6 tracking-widest uppercase">
              Contact
            </h2>
            <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              Let's build the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">future</span> together.
            </h3>
            <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed max-w-lg">
              I'm always open to discussing product design work or partnership opportunities. Reach out and let's craft something beautiful.
            </p>

            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hkmehta2874@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:bg-emerald-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Start a Conversation
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </motion.div>

          {/* Right Side: Contact Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 relative"
          >
            
            {/* Email Card */}
            <motion.a
              variants={itemVariants}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hkmehta2874@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-[2rem] p-8 border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] flex flex-col items-start gap-4"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h4 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-1">Email</h4>
                <p className="text-white font-medium text-lg leading-tight group-hover:text-emerald-400 transition-colors break-all">hkmehta2874@gmail.com</p>
              </div>
            </motion.a>

            {/* Phone Card */}
            <motion.a
              variants={itemVariants}
              href="tel:+918360449335"
              className="group relative rounded-[2rem] p-8 border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] flex flex-col items-start gap-4 sm:mt-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                </div>
                <h4 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-1">Phone</h4>
                <p className="text-white font-medium text-lg leading-tight group-hover:text-emerald-400 transition-colors whitespace-nowrap">+91 8360449335</p>
              </div>
            </motion.a>

            {/* GitHub Card */}
            <motion.a
              variants={itemVariants}
              href="https://github.com/hkmehta28"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-[2rem] p-8 border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] flex flex-col items-start gap-4"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <h4 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-1">GitHub</h4>
                <p className="text-white font-medium text-lg leading-tight group-hover:text-emerald-400 transition-colors">@hkmehta28</p>
              </div>
            </motion.a>

            {/* LinkedIn Card */}
            <motion.a
              variants={itemVariants}
              href="https://linkedin.com/in/harshit-kumar-mehta-617830219"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-[2rem] p-8 border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] flex flex-col items-start gap-4 sm:mt-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <h4 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-1">Network</h4>
                <p className="text-white font-medium text-lg leading-tight group-hover:text-emerald-400 transition-colors">LinkedIn</p>
              </div>
            </motion.a>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
