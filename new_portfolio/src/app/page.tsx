import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Certifications } from "@/components/Certifications";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Chatbot } from "@/components/Chatbot";
import { Preloader } from "@/components/Preloader";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-emerald-500/30 selection:text-white">
      <Preloader />
      <section className="relative w-full">
        {/* 
          totalFrames should equal the length of image sequence.
          Currently our folder has 192 frames for the complete sequence. 
          If you update the sequence length, modify totalFrames.
        */}
        <ScrollyCanvas totalFrames={192} />
        <Overlay />
      </section>
      
      <About />
      <Projects />
      
      <section className="bg-[#121212] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <Education />
          <Certifications />
        </div>
      </section>

      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
