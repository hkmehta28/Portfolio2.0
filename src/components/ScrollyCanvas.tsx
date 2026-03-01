"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export function ScrollyCanvas({ 
  totalFrames = 6,
  onLoadProgress
}: { 
  totalFrames?: number;
  onLoadProgress?: (progress: number, isComplete: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Store all loaded image elements in a mutable ref instead of React state to prevent 192 re-renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Progressive image loading (Apple/Stripe technique)
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const loadSingleFrame = async (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const paddedIndex = index.toString().padStart(3, '0');
        const src = `/sequence/frame_${paddedIndex}_delay-0.041s.png`;
        const img = new Image();
        img.src = src;

        img.onload = async () => {
          try {
            await img.decode();
            if (!isCancelled) {
               imagesRef.current[index] = img;
               loadedCount++;
               if (onLoadProgress) {
                 // Calculate progress % but ensure the preloader fully hides once Frame 0 is done
                 const progress = (loadedCount / totalFrames) * 100;
                 if (index === 0) {
                     // The moment Frame 0 is loaded, tell the parent the site is ready to interact with
                     onLoadProgress(100, true);
                     // Render immediately so frame 0 paints before scroll
                     requestAnimationFrame(() => renderFrame(0));
                 } else {
                     onLoadProgress(progress, false); // Still loading others quietly in background
                 }
               }
            }
            resolve(img);
          } catch (e) {
            resolve(null);
          }
        };
        img.onerror = () => resolve(null);
      });
    };

    const loadSequence = async () => {
      // Step 1: Force load the initial frame so the canvas isn't blank
      await loadSingleFrame(0);
      
      // Step 2: Progressive loading for smoother scrollytelling
      const passes = [
        // Pass 1: Every 12th frame (quick rough scrub)
        Array.from({length: Math.ceil(totalFrames / 12)}, (_, i) => i * 12).filter(i => i !== 0 && i < totalFrames),
        // Pass 2: Every 6th frame
        Array.from({length: Math.ceil(totalFrames / 6)}, (_, i) => i * 6).filter(i => i % 12 !== 0 && i < totalFrames),
        // Pass 3: Every 3rd frame
        Array.from({length: Math.ceil(totalFrames / 3)}, (_, i) => i * 3).filter(i => i % 6 !== 0 && i < totalFrames),
        // Pass 4: The rest
        Array.from({length: totalFrames}, (_, i) => i).filter(i => i % 3 !== 0 && i !== 0 && i < totalFrames),
      ];

      for (const pass of passes) {
        if (isCancelled) break;
        const batchSize = 6;
        for (let i = 0; i < pass.length; i += batchSize) {
          if (isCancelled) break;
          const batch = pass.slice(i, i + batchSize);
          await Promise.all(batch.map(idx => loadSingleFrame(idx)));
        }
      }
    };

    // Reset array on remount
    imagesRef.current = new Array(totalFrames).fill(null);
    loadSequence();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, onLoadProgress]);

  // Render function with Closest-Frame Fallback
  const renderFrame = (targetIndex: number) => {
    if (!canvasRef.current) return;
    
    // Find the closest loaded frame looking backward, then forward
    let imgToDraw = null;
    let actualDrawIndex = -1;

    let offset = 0;
    while (offset < totalFrames) {
        // Search backwards
        if (targetIndex - offset >= 0 && imagesRef.current[targetIndex - offset]) {
            imgToDraw = imagesRef.current[targetIndex - offset];
            actualDrawIndex = targetIndex - offset;
            break;
        }
        // Search forwards if no backwards frame is found within this offset
        if (targetIndex + offset < totalFrames && imagesRef.current[targetIndex + offset]) {
            imgToDraw = imagesRef.current[targetIndex + offset];
            actualDrawIndex = targetIndex + offset;
            break;
        }
        offset++;
    }

    if (!imgToDraw) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    if (imgToDraw.complete && imgToDraw.naturalHeight !== 0) {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = imgToDraw.width / imgToDraw.height;

      let renderWidth, renderHeight, xOffset, yOffset;

      if (canvasRatio > imgRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        xOffset = 0;
        yOffset = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        xOffset = (canvas.width - renderWidth) / 2;
        yOffset = 0;
      }

      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgToDraw, xOffset, yOffset, renderWidth, renderHeight);
      
      // Sync our tracker cache with what was actually drawn
      lastRenderedIndex.current = actualDrawIndex;
    }
  };

  // Track the last rendered frame to prevent duplicate draw calls
  const lastRenderedIndex = useRef(-1);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // On resize, force a render based on the current scroll value
        lastRenderedIndex.current = -1; 
        renderFrame(Math.round(currentIndex.get()));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]); // Removed 'images' from dependency array since they are refs now

  // Track the rAF to prevent multiple queued renders
  const rafId = useRef<number | null>(null);

  // Update canvas when scroll changes
  useMotionValueEvent(currentIndex, "change", (latest) => {
    const targetIndex = Math.round(latest);
    // Don't try to redraw if we know we already just drew this exact frame index
    if (targetIndex !== lastRenderedIndex.current) {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(() => {
        renderFrame(targetIndex);
      });
    }
  });

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {/* Subtle Vignette for Video Feel and Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212] opacity-80" />
      </div>
    </div>
  );
}
