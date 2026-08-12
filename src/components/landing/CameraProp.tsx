"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function CameraProp() {
  const lensRef = useRef<HTMLDivElement>(null);

  // A subtle mouse move effect to shift the glare on the lens
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lensRef.current) return;
      const rect = lensRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the lens center
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Move the glare slightly based on mouse
      const maxMove = 15;
      const moveX = (x / window.innerWidth) * maxMove;
      const moveY = (y / window.innerHeight) * maxMove;
      
      lensRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="relative w-72 h-48 md:w-96 md:h-64 drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] group"
      animate={{
        y: [-10, 10, -10],
        rotateZ: [-1, 1, -1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Camera Body */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f2ece4] to-[#ded6cb] rounded-2xl border-4 border-[#b5a999] shadow-inner overflow-hidden transition-transform duration-500 group-hover:scale-105">
        
        {/* Leather texture wrap middle part */}
        <div className="absolute inset-y-0 left-[15%] right-[15%] bg-[#2d2a26] opacity-95">
          {/* subtle noise on the leather */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        </div>

        {/* Viewfinder & Flash section */}
        <div className="absolute top-4 left-6 w-10 h-6 bg-black rounded-sm border-2 border-gray-600 flex items-center justify-center">
          <div className="w-6 h-3 bg-gradient-to-tr from-blue-900 to-blue-400 rounded-sm" />
        </div>
        
        <div className="absolute top-4 right-6 w-16 h-8 bg-gray-200 rounded-md border-2 border-gray-400 flex flex-col gap-1 p-1">
           {/* flash tube */}
           <div className="w-full h-full bg-white rounded-sm border border-gray-300 shadow-inner" />
        </div>

        {/* Shutter Button */}
        <div className="absolute -top-3 left-10 w-8 h-4 bg-silver bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-lg border-2 border-b-0 border-gray-500" />
        
        {/* Red Accent Dot (Fujifilm style) */}
        <div className="absolute top-14 left-[20%] w-3 h-3 bg-red-500 rounded-full shadow-sm" />

        {/* Main Lens Mount */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-44 md:h-44 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full border-4 border-gray-400 flex items-center justify-center shadow-2xl">
          
          {/* Inner Lens Barrel */}
          <div className="w-[85%] h-[85%] bg-black rounded-full border-4 border-gray-600 flex items-center justify-center relative overflow-hidden">
            
            {/* The Glass Lens */}
            <div className="w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-900 via-purple-800 to-black relative shadow-inner border border-gray-800">
              
              {/* Dynamic Glare container */}
              <div ref={lensRef} className="absolute inset-0 pointer-events-none">
                {/* Main Glare */}
                <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-white/40 blur-[2px]" />
                {/* Secondary Glare */}
                <div className="absolute bottom-[20%] right-[15%] w-[15%] h-[15%] rounded-full bg-blue-300/30 blur-[1px]" />
                {/* Outer Ring Glare */}
                <div className="absolute top-[5%] left-[5%] right-[5%] bottom-[5%] rounded-full border border-white/20" />
              </div>
            </div>
            
            {/* Lens text detailing */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-45 opacity-50">
               <path id="curve" fill="transparent" d="M 10 50 A 40 40 0 1 1 90 50" />
               <text width="100" className="text-[6px] fill-white font-mono uppercase tracking-widest">
                 <textPath href="#curve">LumiStrip LENS • 35mm F/2.8</textPath>
               </text>
            </svg>
          </div>
        </div>
        
        {/* Grip detail */}
        <div className="absolute top-8 bottom-8 right-8 w-6 bg-gradient-to-r from-transparent to-black/30 rounded-full opacity-50" />
        
      </div>
      
      {/* Real shadow on the desk (detached from the camera body slightly to sell the float) */}
      <div className="absolute -bottom-8 left-[10%] right-[10%] h-4 bg-black/20 blur-xl rounded-full mix-blend-multiply" />
    </motion.div>
  );
}
