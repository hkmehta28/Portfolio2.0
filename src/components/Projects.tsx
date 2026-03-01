"use client";

import React, { useState } from "react";
import { ProjectModal, ProjectData } from "./ProjectModal";
import { ProjectCard3D } from "./ProjectCard3D";

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: "Intelligent Document Q&A System",
    category: "RAG-Based LLM Application",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
    tech: ["LangChain", "Pinecone", "OpenAI"],
    description: "A highly scalable Retrieval-Augmented Generation (RAG) application enabling users to converse intimately with their private documents. It leverages semantic search to retrieve the most relevant context vectors, injecting them into the LLM prompt for accurate, hallucination-free answers.",
    features: [
      "Vector embeddings generated via advanced OpenAI models",
      "Extremely fast semantic similarity search utilizing Pinecone",
      "Intelligent document chunking and preprocessing pipeline",
      "Conversational memory buffer for handling complex follow-up questions"
    ]
  },
  {
    id: 2,
    title: "Conversational AI & Summarization",
    category: "LLM Pipeline & App",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    tech: ["Python", "Streamlit", "GPT APIs"],
    description: "An end-to-end AI pipeline explicitly designed to ingest massive payloads of long-form text (such as transcripts, corporate reports, or massive articles) and produce structured, concise summaries. Wrapped in a stunning Streamlit interface, it allows non-technical users to quickly glean insights from complex data.",
    features: [
      "Dynamic and customizable summary lengths and formatting options",
      "Interactive Q&A component querying strictly over the summarized text context",
      "Clean, modern, highly responsive Streamlit dashboard interface",
      "Meticulously optimized prompt engineering to maximize token efficiency"
    ]
  },
  {
    id: 3,
    title: "Online Food Ordering System",
    category: "Full-Stack Web App",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop",
    tech: ["React.js", "Node.js", "PostgreSQL"],
    description: "A comprehensive e-commerce platform tailored specifically for complex food delivery architectures. Built iteratively with a robust relational database schema, it handles everything from secure user authentication to dynamic shopping cart management and real-time order tracking.",
    features: [
      "Secure JWT-based user authentication and strict route authorization",
      "Redux-powered dynamic shopping cart with real-time total calculation",
      "PostgreSQL database integration for reliable order history and menu storage",
      "Responsive React UI infused with modern, fluid styling"
    ]
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <section className="bg-[#121212] pt-32 pb-16 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold text-emerald-500 mb-4 tracking-widest uppercase">
              Portfolio
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Selected Works
            </h3>
          </div>
          <p className="text-gray-400 text-lg max-w-sm font-light">
            A showcase of my recent academic and personal projects focused on AI and full-stack development.
          </p>
        </div>

        {/* Projects Grid (With 3D Perspective) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1500px" }}>
          {PROJECTS.map((project, index) => (
            <ProjectCard3D 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      {/* Render the Modal Component */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={selectedProject !== null} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
