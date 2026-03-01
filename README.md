# Harshit Kumar Mehta | Portfolio 2.0 ✨

> A high-end, scrollytelling personal portfolio website built with Next.js, Framer Motion, and HTML5 Canvas. Designed to showcase expertise in Generative AI, LLMs, and Full-Stack Development through an immersive, interactive tracking experience.

<div align="center">
  <img src="./public/sequence/frame_100_delay-0.041s.png" alt="Hero Section Scrollytelling" width="100%" />
</div>

## 🚀 Key Features

### 1. **Scrollytelling Image Sequence** (`ScrollyCanvas.tsx`)

The centerpiece of the site is a sticky, 192-frame 3D render sequence that scrubs seamlessly as you scroll down the page.

- **Performance Optimized**: Uses progressive, batch-based loading with `Promise.all` and a closest-frame dual-search fallback to ensure 60fps rendering without blocking the main UI thread.
- **Throttled Rendering**: `requestAnimationFrame` isolates the canvas draws from scroll events, eliminating input lag.

### 2. **Immersive 3D Project Cards** (`Projects.tsx` & `ProjectCard3D.tsx`)

A stunning "Selected Works" section featuring a 3-column grid of projects.

- **True 3D Perspective**: Cards react to mouse movements using physical spring physics (`framer-motion`), tilting and shifting on the X and Y axes.
- **Deep Parallax Layers**: The inner image layer and the floating text layers sit at different `translateZ` depths, popping out dynamically when hovered.

<div align="center">
  <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" width="30%" alt="Project 1" />
  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" width="30%" alt="Project 2" />
  <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" width="30%" alt="Project 3" />
</div>

### 3. **Dynamic Preloader** (`Preloader.tsx`)

A synchronous and beautiful loading screen that prevents scroll until the core `ScrollyCanvas` assets are downloaded, featuring complex SVG ring animations to engage the user during load times.

### 4. **Interactive Background Spotlights** (`Overlay.tsx`)

Smooth, magnetic-like spotlight gradients that follow the user's cursor across the dark mode UI, providing a high-end glowing finish to text and backgrounds.

### 5. **Integrated AI Assistant** (`Chatbot.tsx`)

A custom-built chatbot widget anchored to the screen to answer questions and present contact details efficiently.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Directory, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + HTML5 Canvas API
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)
- **Language**: TypeScript

## ⚙️ Performance Focus

Despite the heavy visual load, the site is precision-engineered for speed:

1. **Pass-Based Loading**: Loads every 12th frame, then 6th, then 3rd to immediately give the user a rough scrollable timeline while backfilling the high-def frames silently.
2. **Context Alpha**: `getContext("2d", { alpha: false })` maximizes GPU drawing efficiency.
3. **No-Loop Dependencies**: Strict isolation of React state tracking keeps `useEffect` triggers separated from scroll progression.

## 💻 Getting Started

Clone the repository and run the development server:

```bash
git clone https://github.com/hkmehta28/Portfolio2.0.git
cd new_portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Repository Structure

- `src/app/page.tsx` - Main layout bringing all components together.
- `src/components/ScrollyCanvas.tsx` - Core scrollytelling logic and image drawing.
- `src/components/ProjectCard3D.tsx` - Mouse-tracked 3D interaction logic for project showcases.
- `public/sequence/` - Directory housing the 192 continuous image frames.

> Built by [Harshit Kumar Mehta] - Generative AI Engineer
