"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Define opacity and y-transforms for each section based on scroll progress
  
  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -200]);

  // Section 2: 25% to 45% (peaks at 35%)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: 50% to 80% (peaks at 65%)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
      
      {/* Interactive Global Spotlight */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 hidden md:block"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(16,185,129,0.15), transparent 40%)`
          )
        }}
      />

      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-5 py-1.5 border border-emerald-500/30 rounded-full bg-emerald-500/10 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <span className="text-emerald-400 text-xs font-bold tracking-[0.25em] uppercase">
              AI Developer
            </span>
          </motion.div>

          {/* Staggered Name Reveal */}
          <div className="overflow-hidden mb-2">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[9rem] font-extrabold text-white tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] leading-[1.1]"
            >
              Harshit Kumar
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[9rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-tighter drop-shadow-2xl leading-tight"
            >
              Mehta
            </motion.h1>
          </div>

          {/* Animated Glow Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
            <p className="relative text-lg md:text-2xl text-white tracking-widest font-medium backdrop-blur-xl bg-[#121212]/80 px-8 py-3 rounded-full border border-white/10 uppercase">
              Generative AI Engineer
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-3"
          >
            <span className="text-xs text-gray-400 uppercase tracking-[0.3em] font-medium">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-emerald-500/50 to-transparent relative overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent"
                 animate={{ y: ["-100%", "200%"] }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
               />
            </div>
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center justify-start px-8 md:px-16 lg:px-32"
        >
          <div className="max-w-3xl p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl border border-white/10 bg-black/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              I build scalable
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                AI systems.
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-transparent mt-8 rounded-full" />
            <p className="text-gray-400 mt-6 text-xl md:text-2xl font-light">
              Engineering end-to-end intelligent pipelines for the future of software.
            </p>
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-end px-8 md:px-16 lg:px-32"
        >
          <div className="max-w-3xl p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl border border-white/10 bg-black/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col items-end text-right">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Specializing in
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-cyan-400">
                LLMs & RAG.
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-l from-emerald-500 to-transparent mt-8 rounded-full" />
            <p className="text-gray-400 mt-6 text-xl md:text-2xl font-light">
              Transforming complex data into seamless conversational experiences.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
