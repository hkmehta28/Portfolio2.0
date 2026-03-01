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
      
      // Step 2: Loop sequentially and load frames in the background without blocking the UI
      for (let i = 1; i < totalFrames; i++) {
        if (isCancelled) break;
        await loadSingleFrame(i);
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

    // Search backwards for the most recent loaded frame
    for (let i = targetIndex; i >= 0; i--) {
        if (imagesRef.current[i]) {
            imgToDraw = imagesRef.current[i];
            actualDrawIndex = i;
            break;
        }
    }
    
    // If we scroll so fast we beat Frame 0, search forwards as an absolute fallback
    if (!imgToDraw) {
        for (let i = targetIndex + 1; i < totalFrames; i++) {
            if (imagesRef.current[i]) {
                imgToDraw = imagesRef.current[i];
                actualDrawIndex = i;
                break;
            }
        }
    }

    if (!imgToDraw) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  // Update canvas when scroll changes
  useMotionValueEvent(currentIndex, "change", (latest) => {
    const targetIndex = Math.round(latest);
    // Don't try to redraw if we know we already just drew this exact frame index
    if (targetIndex !== lastRenderedIndex.current) {
      requestAnimationFrame(() => {
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
