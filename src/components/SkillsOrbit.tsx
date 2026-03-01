"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  "Python", "JavaScript", "TypeScript", "C#", "SQL",
  "React.js", "Next.js", "Node.js", "Express.js", ".NET",
  "LangChain", "OpenAI API", "Hugging Face", "Pinecone", "ChromaDB",
  "Git", "Docker", "PostgreSQL", "MongoDB", "Framer Motion",
  "Tailwind CSS", "REST APIs", "Vector Search", "RAG", "LLMs"
];

export function SkillsOrbit() {
  // Generate random positions and animation properties for each skill
  const floatingSkills = useMemo(() => {
    return SKILLS.map((skill) => {
      // Random position within a 3D-like space (x, y coords as percentages)
      const randomX = Math.random() * 80 + 10; // 10% to 90%
      const randomY = Math.random() * 80 + 10; // 10% to 90%
      
      // Randomize animation delays and durations to make it look organic
      const duration = Math.random() * 10 + 15; // 15-25 seconds per full orbit
      const delay = Math.random() * -20; // Start at random points in the animation

      // Determine size/importance (makes some skills bigger)
      const isCore = ["Python", "React.js", "Node.js", "LangChain", "OpenAI API", "TypeScript"].includes(skill);
      
      return {
        text: skill,
        x: randomX,
        y: randomY,
        duration,
        delay,
        isCore,
      };
    });
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] border border-white/5 bg-black/40 rounded-[2rem] overflow-hidden flex items-center justify-center">
      
      {/* Background radial gradient to give depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Central "Core" element */}
      <div className="absolute z-10 w-32 h-32 md:w-48 md:h-48 rounded-full border border-emerald-500/30 flex items-center justify-center bg-black/60 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-emerald-500/20 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,1)]" />
        </div>
      </div>

      {/* Floating Skills */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {floatingSkills.map((skill, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-auto cursor-default"
            style={{ 
              left: `${skill.x}%`, 
              top: `${skill.y}%`,
            }}
            animate={{
              y: ["-20px", "20px", "-20px"],
              x: ["-10px", "10px", "-10px"],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: skill.duration,
              delay: skill.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div 
              className={`
                px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110 hover:z-30 whitespace-nowrap
                ${skill.isCore 
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] md:text-lg' 
                  : 'bg-white/5 border-white/10 text-gray-400 font-medium md:text-sm hover:text-white hover:border-white/30 hover:bg-white/10'
                }
              `}
            >
              {skill.text}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
