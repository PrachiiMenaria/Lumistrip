"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackgroundText = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] w-full flex items-center justify-center overflow-hidden bg-[#FFEED6] pt-16 z-10"
    >
      {/* Oversized Background Typography */}
      <motion.div 
        style={{ y: yBackgroundText }}
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0 mix-blend-multiply"
      >
        <h1 className="font-heading text-[15vw] md:text-[20vw] leading-none font-bold text-[#E8A07C] opacity-[0.15] tracking-tighter uppercase whitespace-nowrap">
          Nostalgia
        </h1>
      </motion.div>

      <div className="container max-w-screen-2xl mx-auto px-4 md:px-8 h-full flex flex-col justify-center relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-5 space-y-12 z-30 pt-20 lg:pt-0">
            
            <div className="space-y-6 relative">
              <div className="inline-block relative">
                 <h2 className="font-logo text-3xl md:text-5xl text-[#9A3F3F] transform -rotate-6 origin-bottom-left inline-block absolute -top-8 -left-4">LumiStrip</h2>
                 <h1 className="font-heading text-7xl md:text-8xl lg:text-[100px] font-bold text-[#2d2a26] leading-[0.9] tracking-tighter mix-blend-multiply">
                   Digital<br />
                   <span className="text-[#827148] italic font-medium">Memory</span><br />
                   Box.
                 </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-[#827148] leading-snug max-w-md font-body font-light relative z-10">
                A premium photo booth experience inspired by the magic of instant film.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-20">
              <button className="group relative px-10 py-5 bg-transparent outline-none interactive-hover">
                 <div className="absolute inset-0 bg-[#A5AF79] rounded-sm transform -rotate-1 transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-105 shadow-md border border-[#827148]/30" />
                 <div className="absolute inset-0 bg-[#FFEED6] rounded-sm transform rotate-1 transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-105 shadow-sm border border-[#A5AF79]/50" />
                 <span className="relative z-10 font-mono font-medium uppercase tracking-[0.2em] text-sm text-[#9A3F3F] flex items-center gap-2">
                   Start Rolling
                 </span>
              </button>
              
              <div className="font-logo text-[#B77466] text-xl -rotate-3">
                 *click to capture
              </div>
            </div>
            
          </div>

          {/* Right Column: 3D Scene Container */}
          <div className="lg:col-span-7 h-[600px] lg:h-[800px] w-full relative z-20">
             {/* The 3D Canvas will be injected here. For now, a placeholder to maintain layout structure. */}
             <div className="w-full h-full border border-dashed border-[#B77466]/20 rounded-3xl flex items-center justify-center bg-[#FCCC73]/5">
               <span className="font-mono text-xs text-[#827148] uppercase tracking-widest">3D Canvas Loading...</span>
             </div>
          </div>
          
        </div>
      </div>

      {/* Scrolling Marquee Tape */}
      <div className="absolute bottom-10 -left-10 right-0 w-[120%] rotate-2 z-40 bg-[#FD9D5D] py-3 shadow-lg border-y-2 border-[#D04E6C]/30 mix-blend-multiply overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="font-mono text-sm uppercase tracking-[0.3em] text-[#9A3F3F] font-bold mx-8">
                PREMIUM DIGITAL SCRAPBOOK 
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FFEED6]" />
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
