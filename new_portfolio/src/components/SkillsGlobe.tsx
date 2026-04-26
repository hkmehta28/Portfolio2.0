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

    let isMounted = true;
    const initTagCloud = async () => {
      try {
        const TagCloudModule = await import('TagCloud');
        const TagCloud = TagCloudModule.default || TagCloudModule;
        
        if (!isMounted || !containerRef.current) return;
        
        const container = containerRef.current;
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

        // @ts-ignore
        (TagCloud as any)(container, SKILLS, options);

        const styleTags = () => {
          const items = container.querySelectorAll('.tagcloud--item');
          items.forEach((item) => {
            const text = item.textContent;
            const isCore = ["Python", "React.js", "Node.js", "LangChain", "OpenAI", "TypeScript", "RAG"].includes(text || "");
            
            item.className = 'tagcloud--item cursor-pointer font-medium transition-colors duration-300';
            
            if (isCore) {
              item.classList.add('text-emerald-400', 'font-bold', 'hover:text-emerald-300', 'drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]');
            } else {
              item.classList.add('text-gray-400', 'hover:text-white');
            }
          });
        };

        setTimeout(styleTags, 100);
      } catch (e) {
        console.error("TagCloud failed to load", e);
      }
    };
    
    initTagCloud();



    return () => {
      isMounted = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = ''; // Cleanup on unmount
      }
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
