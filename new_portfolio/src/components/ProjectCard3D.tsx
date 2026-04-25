"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProjectCard3D({ project, onClick, index }: { project: any, onClick: () => void, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track mouse position on the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse values to physical springs so it feels natural
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map the mouse position to rotation values (e.g. -10deg to 10deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // We want the inner contents to parallax slightly more
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    // Get the bounding rectangle of the card
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
    // Left edge is -0.5, Right edge is 0.5. Top is -0.5, Bottom is 0.5.
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset to center when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Required for 3D children
      }}
      className={`relative group rounded-[2rem] w-full aspect-[4/5] sm:aspect-square md:aspect-[3/4] cursor-pointer 
      ${index === 1 ? 'md:translate-y-12 lg:translate-y-16' : index === 2 ? 'md:translate-y-0 lg:translate-y-32' : ''}`}
    >
      {/* Outer Shell - Static border and backdrop blur for performance */}
      <div className="absolute inset-0 border border-white/10 bg-white/5 backdrop-blur-md rounded-[2rem] overflow-hidden group-hover:border-emerald-500/50 group-hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.4)] transition-colors duration-500">
          
        {/* Deep Parallax Layer: The background image */}
        <motion.div 
            style={{ x: translateX, y: translateY, translateZ: 50, backgroundImage: `url(${project.image})` }}
            className="absolute -inset-8 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60 scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Accent Shadow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#121212] to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Pop-Out Layer: The text content sitting on top (moves aggressively) */}
      <motion.div 
        style={{ translateZ: 80 }}
        className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end pointer-events-none"
      >
        <div className="transform transition-transform duration-500 translate-y-6 group-hover:translate-y-0">
            <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-3 inline-block">
            {project.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight group-hover:text-emerald-50 transition-colors drop-shadow-xl">
            {project.title}
            </h3>
            
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4 pointer-events-none">
            {project.tech.map((t: string, i: number) => (
                <span key={i} className="text-xs font-medium text-gray-300 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm drop-shadow-md">
                {t}
                </span>
            ))}
            </div>

            {/* View Project Button */}
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
            <span>View Project Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
