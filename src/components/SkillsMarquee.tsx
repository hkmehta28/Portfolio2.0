"use client";

import React from "react";
import { motion } from "framer-motion";

const TECH_ROW_1 = [
  "Python", "React.js", "LangChain", "Node.js", "PostgreSQL",
  "OpenAI API", "Hugging Face", "Pinecone", "ChromaDB", "LlamaIndex",
  "Python", "React.js", "LangChain", "Node.js", "PostgreSQL", 
  "OpenAI API", "Hugging Face", "Pinecone", "ChromaDB", "LlamaIndex"
];

const TECH_ROW_2 = [
  "JavaScript", "TypeScript", "C#", ".NET", "Express.js",
  "SQL", "Git", "Docker", "Framer Motion", "Tailwind CSS",
  "JavaScript", "TypeScript", "C#", ".NET", "Express.js",
  "SQL", "Git", "Docker", "Framer Motion", "Tailwind CSS"
];

const TECH_ROW_3 = [
  "Vector Search", "RAG Pipeline", "LLM Deployment", "Semantic Search", "Prompt Engineering",
  "REST APIs", "Full-stack Architecture", "Machine Learning", "Data Pipelines",
  "Vector Search", "RAG Pipeline", "LLM Deployment", "Semantic Search", "Prompt Engineering",
  "REST APIs", "Full-stack Architecture", "Machine Learning", "Data Pipelines"
];

export function SkillsMarquee() {
  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col justify-center gap-6 overflow-hidden py-8">
      
      {/* Gradient Fades for the edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Moves Left */}
      <div className="flex w-[200%] gap-4 pr-4 border-y border-white/5 py-3 bg-white/5 backdrop-blur-sm -rotate-2 scale-105">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
          className="flex flex-shrink-0 gap-4"
        >
          {TECH_ROW_1.map((tech, i) => (
            <span 
              key={i} 
              className="px-6 py-3 rounded-xl bg-[#1a1a1a] border border-emerald-500/20 text-emerald-300 font-bold whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.05)] text-lg"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Moves Right */}
      <div className="flex w-[200%] gap-4 pr-4 ml-[-50%]">
        <motion.div
          animate={{ x: [-1035, 0] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
          className="flex flex-shrink-0 gap-4"
        >
          {TECH_ROW_2.map((tech, i) => (
            <span 
              key={i} 
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium whitespace-nowrap hover:bg-white/10 transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 3 - Moves Left, slightly different rotation/styling */}
      <div className="flex w-[200%] gap-4 pr-4 border-y border-white/5 py-3 bg-white/5 backdrop-blur-sm rotate-2 scale-105 mt-2">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="flex flex-shrink-0 gap-4"
        >
          {TECH_ROW_3.map((tech, i) => (
            <span 
              key={i} 
              className="px-5 py-2.5 rounded-xl border border-dashed border-gray-600 text-gray-400 font-mono whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
