"use client";

import React, { useEffect, useRef } from "react";

const SKILLS = [
  "Python", "JavaScript", "TypeScript", "C#", "SQL",
  "React.js", "Next.js", "Node.js", "Express.js", ".NET",
  "LangChain", "OpenAI", "Hugging Face", "Pinecone", "ChromaDB",
  "Git", "Docker", "PostgreSQL", "MongoDB", "Framer",
  "Tailwind CSS", "REST APIs", "Vector Search", "RAG", "LLMs"
];

export function SkillsGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let TagCloud: any;
    try {
      // We use require here to only load it on the client side
      // since TagCloud needs the DOM to work.
      TagCloud = require('TagCloud');
    } catch (e) {
      console.error("TagCloud failed to load", e);
      return;
    }

    const container = containerRef.current;
    
    // Clear any existing instances to avoid duplicates in React strict mode
    container.innerHTML = '';

    const options = {
      radius: window.innerWidth < 768 ? 150 : 250,
      maxSpeed: 'fast',
      initSpeed: 'normal',
      direction: 135, // Angle
      keep: true, // Keep rotating when cursor leaves
      useContainerInlineStyles: true,
      useItemInlineStyles: true,
    };

    // Initialize TagCloud
    TagCloud(container, SKILLS, options);

    // Style the generated tags directly via DOM manipulation
    // since the library injects raw spans
    const styleTags = () => {
      const items = container.querySelectorAll('.tagcloud--item');
      items.forEach((item) => {
        const text = item.textContent;
        // Core AI/Eng skills get Emerald, others get Grey/White
        const isCore = ["Python", "React.js", "Node.js", "LangChain", "OpenAI", "TypeScript", "RAG"].includes(text || "");
        
        // Remove existing classes just in case
        item.className = 'tagcloud--item cursor-pointer font-medium transition-colors duration-300';
        
        if (isCore) {
          item.classList.add('text-emerald-400', 'font-bold', 'hover:text-emerald-300', 'drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]');
        } else {
          item.classList.add('text-gray-400', 'hover:text-white');
        }
      });
    };

    // We need a slight delay for the TagCloud library to render the DOM elements
    setTimeout(styleTags, 100);

    return () => {
      container.innerHTML = ''; // Cleanup on unmount
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-8">
      {/* Container for the 3D Sphere */}
      <div 
        ref={containerRef} 
        className="text-lg md:text-xl font-mono"
        style={{
          color: 'transparent', // The library wraps things weirdly, so we style the children
        }}
      />

      {/* Inject some global CSS specifically for the TagCloud positioning, as the library relies on it */}
      <style dangerouslySetInnerHTML={{__html: `
        .tagcloud {
          font-family: inherit;
          margin: 0 auto;
        }
        .tagcloud--item {
          padding: 2px 4px;
          border-radius: 4px;
        }
        .tagcloud--item:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
      `}} />
    </div>
  );
}
