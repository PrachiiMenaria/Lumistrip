"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

export default function OverlayUI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useAudio();

  useEffect(() => {
    // Entrance animations
    const ctx = gsap.context(() => {
      // Fade in header and nav
      gsap.fromTo("header", 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      
      // Stagger in editorial text blocks
      gsap.fromTo(".editorial-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );
      
      // Marquee animation
      if (marqueeRef.current) {
        const w = marqueeRef.current.clientWidth;
        gsap.to(marqueeRef.current, {
          x: -w / 2,
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between overflow-hidden text-[#49344F]">
      {/* Background oversized typography */}
      <div className="absolute top-0 right-0 p-12 pointer-events-none opacity-[0.04] mix-blend-multiply select-none">
        <h1 className="text-[20vw] font-serif italic tracking-tighter leading-none whitespace-nowrap">
          LUMISTRIP
        </h1>
      </div>

      {/* Header */}
      <header className="p-4 md:p-12 flex justify-between items-start pointer-events-auto z-20">
        <div className="flex flex-col" data-cursor="camera">
          <span className="text-3xl font-serif font-semibold tracking-tight text-[#49344F]">LumiStrip</span>
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#49344F]/60 mt-2">
            Curated Memory Box
          </span>
        </div>
        
        <nav className="flex gap-4 md:gap-12 items-center text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#49344F]">
          {["Story", "Gallery"].map((item) => (
            <a 
              key={item} 
              href="#" 
              data-cursor="link"
              className="hover-target relative overflow-hidden group flex items-center h-6"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                {item}
              </span>
              <span className="absolute top-0 left-0 h-full flex items-center inline-block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0 text-[#B77466]">
                {item}
              </span>
            </a>
          ))}
        </nav>
      </header>

      {/* Floating editorial texts */}
      <div className="editorial-text absolute top-[15%] md:top-[35%] left-6 md:left-24 max-w-[350px] pointer-events-auto z-20" data-cursor="stickers">
        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] mb-4 text-[#49344F]/50">01 / The Concept</p>
        <h2 className="text-4xl md:text-6xl font-serif font-light mb-6 leading-[1.1] text-[#49344F] tracking-tight">
          Capture the <br/><span className="font-sans font-medium text-[#FFD9C2] bg-[#49344F] px-2 -ml-2 rounded-sm rotate-1 inline-block">fleeting</span> moments.
        </h2>
        <p className="text-sm leading-relaxed font-sans text-[#49344F]/80 font-light max-w-[280px]">
          An homage to the tangible. A digital experience that feels inherently physical, bridging the gap between pixels and paper.
        </p>
      </div>

      <div className="editorial-text absolute bottom-24 md:bottom-32 right-6 md:right-24 max-w-[200px] text-right pointer-events-auto z-20">
        <div className="rotate-90 origin-right translate-x-full">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-[#49344F]/40 whitespace-nowrap">
            Limited Edition / 2026
          </p>
        </div>
      </div>

      {/* Marquee Footer */}
      <footer className="w-full border-t border-[#49344F]/10 bg-[#FFF8F2]/40 backdrop-blur-md pointer-events-auto overflow-hidden py-4 flex items-center z-20">
        <div className="flex whitespace-nowrap" ref={marqueeRef}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center text-3xl font-sans font-medium uppercase px-4 tracking-widest text-[#49344F]">
              <span>KEEP TODAY FOREVER</span>
              <span className="mx-8 text-[#FFD9C2] font-serif italic text-4xl">✦</span>
              <span>PHOTO STRIPS</span>
              <span className="mx-8 text-[#DCCEFF] font-serif italic text-4xl">✦</span>
              <span className="font-serif italic text-4xl">SCRAPBOOK MEMORIES</span>
              <span className="mx-8 text-[#D8F7E4] font-serif italic text-4xl">✦</span>
              <span>FILM MAGIC</span>
              <span className="mx-8 text-[#FFD9C2] font-serif italic text-4xl">✦</span>
              <span>INSTANT JOY</span>
              <span className="mx-8 text-[#DCCEFF] font-serif italic text-4xl">✦</span>
              <span className="font-serif italic text-4xl">MADE WITH LOVE</span>
              <span className="mx-8 text-[#D8F7E4] font-serif italic text-4xl">✦</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
