"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AirportTraySection() {
  const trayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The tray slides in slightly as it enters the viewport
      gsap.from(trayRef.current, {
        y: 100,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trayRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[120vh] w-full bg-[#f4ece3] flex justify-center pt-32 overflow-hidden border-t-2 border-dashed border-[#b7a896]/30">
      
      {/* Background airport noise/decor */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
         <div className="w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0,_#000_100%)] mix-blend-multiply" />
      </div>

      <div className="container max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <div className="text-center space-y-4 mb-24">
           <h2 className="font-heading text-4xl text-[#2d2a26]">Security Checkpoint</h2>
           <p className="font-mono text-sm text-[#827148] uppercase tracking-widest">Please place all memories in the tray</p>
        </div>

        {/* Airport Security Tray */}
        <div 
          ref={trayRef}
          className="relative w-full max-w-2xl h-80 bg-gradient-to-b from-[#e5e5e5] to-[#c7c7c7] rounded-3xl border-8 border-[#a3a3a3] shadow-[inset_0_-20px_40px_rgba(0,0,0,0.1),_0_20px_40px_rgba(0,0,0,0.2)] flex items-center justify-center transform perspective-1000 rotateX-[10deg]"
        >
          {/* Tray inner texture */}
          <div className="absolute inset-4 rounded-xl border-2 border-dashed border-gray-400/30" />
          
          <div className="absolute bottom-6 font-mono text-xs text-gray-500 uppercase tracking-widest bg-gray-200/50 px-4 py-1 rounded-full mix-blend-multiply">
            Tray 004 - LumiStrip
          </div>

          {/* The camera from the hero section will visually land in this area due to GSAP y-translation */}
        </div>
      </div>
    </section>
  );
}
