"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    // Simulate progress counting up visually
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Hold at 90% until actual load completes
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 150);

    const completeLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      }, 800); // Small delay so user sees 100% before it fades out
    };

    if (document.readyState === "complete") {
      // If already loaded
      completeLoading();
    } else {
      // Wait for window load
      window.addEventListener("load", completeLoading);
    }

    // Safety fallback: Force load after 4 seconds regardless
    const fallbackTimer = setTimeout(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          completeLoading();
        }
        return prevProgress;
      });
    }, 4000);

    return () => {
      window.removeEventListener("load", completeLoading);
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212] backdrop-blur-3xl"
        >
          {/* Logo / Animation Cluster */}
          <div className="relative flex items-center justify-center mb-12">
            {/* Outer ring */}
             <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute w-40 h-40 rounded-full border-t-[3px] border-r-[1px] border-emerald-500/50"
            />
            {/* Middle ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute w-32 h-32 rounded-full border-b-[3px] border-l-[1px] border-cyan-400/50"
            />
            {/* Inner ring */}
             <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border-t-[2px] border-white/20"
            />
            {/* Center dot pulsing */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
            />
          </div>

          {/* Loading Text and Progress Bar */}
          <div className="text-center w-64">
            <h2 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-[0.3em] uppercase mb-4 shadow-sm">
              Initializing
            </h2>
            
            {/* Container for progress bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                 animate={{ width: `${Math.min(100, progress)}%` }}
                 transition={{ ease: "easeOut", duration: 0.3 }}
               />
               <motion.div 
                 className="absolute top-0 left-0 w-full h-full bg-white/20"
                 animate={{ x: ["-100%", "100%"] }}
                 transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
               />
            </div>
            
            <motion.p 
              className="text-gray-400 text-xs font-mono mt-3 tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              {Math.min(100, progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
