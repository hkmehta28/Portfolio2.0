"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export function ScrollyCanvas({ totalFrames = 6 }: { totalFrames?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // This matches the exact naming pattern inside public/sequence
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/sequence/frame_${paddedIndex}_delay-0.041s.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [totalFrames]);

  // Render function implementing object-fit: cover
  const renderFrame = (index: number) => {
    if (!images[index] || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (img.complete && img.naturalHeight !== 0) {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

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
      ctx.drawImage(img, xOffset, yOffset, renderWidth, renderHeight);
    }
  };

  // Track the last rendered frame to prevent duplicate draw calls for the same image index
  const lastRenderedIndex = useRef(-1);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // On resize, force a render
        lastRenderedIndex.current = -1; 
        renderFrame(Math.round(currentIndex.get()));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener("resize", handleResize);
  }, [images, currentIndex]);

  // Update canvas when scroll changes
  useMotionValueEvent(currentIndex, "change", (latest) => {
    const nextIndex = Math.round(latest);
    if (nextIndex !== lastRenderedIndex.current) {
      // Use requestAnimationFrame for smoother painting on mobile and slow devices
      requestAnimationFrame(() => {
        renderFrame(nextIndex);
        lastRenderedIndex.current = nextIndex;
      });
    }
  });

  // Re-render when images are loaded to show the first frame immediately
  useEffect(() => {
    if (images.length > 0) {
      images[0].onload = () => renderFrame(0);
    }
  }, [images]);

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
