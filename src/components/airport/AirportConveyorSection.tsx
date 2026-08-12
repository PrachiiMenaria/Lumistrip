"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import { Camera, Image as ImageIcon, Sparkles, Wand2, BookHeart } from "lucide-react";

const TRAYS = [
  {
    id: 1,
    title: "Capture",
    icon: <Camera className="w-6 h-6 text-[#49344F]" />,
    content: (
      <div className="absolute inset-0 p-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-32 bg-[#DCCEFF] rounded-xl shadow-lg border border-white/40 flex items-center justify-center -rotate-6">
          <div className="w-16 h-16 rounded-full bg-black/80 flex items-center justify-center shadow-inner">
            <div className="w-8 h-8 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md rotate-12">✨</div>
      </div>
    )
  },
  {
    id: 2,
    title: "Frames",
    icon: <ImageIcon className="w-6 h-6 text-[#49344F]" />,
    content: (
      <div className="absolute inset-0 p-4">
        <div className="absolute top-4 left-4 w-20 h-28 bg-white p-2 pb-8 shadow-md rounded-sm rotate-[8deg]">
          <div className="w-full h-full bg-[#FFE7F1]" />
        </div>
        <div className="absolute bottom-4 right-4 w-32 h-12 bg-black/90 shadow-md rounded-sm -rotate-[4deg] flex gap-2 p-1">
          {[1,2,3,4].map(i => <div key={i} className="flex-1 bg-white/20 rounded-sm" />)}
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Decorate",
    icon: <Sparkles className="w-6 h-6 text-[#49344F]" />,
    content: (
      <div className="absolute inset-0 p-4 flex flex-wrap gap-2 items-center justify-center">
        <div className="w-12 h-4 bg-[#FFD9C2]/80 backdrop-blur-sm shadow-sm rotate-12 absolute top-8 left-8" />
        <div className="text-3xl absolute bottom-8 right-12 rotate-[-15deg]">💖</div>
        <div className="text-2xl absolute top-12 right-8 rotate-[25deg]">⭐</div>
        <div className="w-16 h-4 bg-[#D8F7E4]/80 backdrop-blur-sm shadow-sm -rotate-6 absolute bottom-12 left-12" />
      </div>
    )
  },
  {
    id: 4,
    title: "Filters",
    icon: <Wand2 className="w-6 h-6 text-[#49344F]" />,
    content: (
      <div className="absolute inset-0 p-4">
        <div className="absolute top-6 left-12 w-16 h-24 bg-gradient-to-br from-[#FFE7F1] to-[#FFD9C2] rounded-md shadow-md -rotate-[10deg] border-2 border-white" />
        <div className="absolute top-10 left-20 w-16 h-24 bg-gradient-to-br from-[#DCCEFF] to-[#DDF6FF] rounded-md shadow-md rotate-[5deg] border-2 border-white" />
        <div className="absolute bottom-6 right-8 px-4 py-2 bg-[#FFF4C8] text-[#49344F] font-serif italic text-xs shadow-md rounded-sm rotate-[12deg]">
          Vintage 99'
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Memory Styles",
    icon: <BookHeart className="w-6 h-6 text-[#49344F]" />,
    content: (
      <div className="absolute inset-0 p-4">
        <div className="absolute top-8 left-6 w-28 h-20 bg-[#FFF8F2] rounded-md shadow-md rotate-6 p-2 border-r-2 border-b-2 border-[#49344F]/10 flex flex-col gap-1">
          <div className="w-full h-1/2 bg-[#DDF6FF] rounded-sm" />
          <div className="w-1/2 h-2 bg-[#49344F]/20 rounded-full mt-1" />
          <div className="w-3/4 h-2 bg-[#49344F]/10 rounded-full" />
        </div>
        <div className="absolute bottom-4 right-6 w-20 h-24 bg-white rounded-sm shadow-md -rotate-[8deg] border-l-4 border-[#9A3F3F]" />
      </div>
    )
  }
];

export function AirportConveyorSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const xPos = useMotionValue(0);
  const router = useRouter();

  // Smooth infinite scrolling logic
  useAnimationFrame((time, delta) => {
    if (!isHovered) {
      let next = xPos.get() - (delta * 0.05);
      if (next <= -2400) next = 0;
      xPos.set(next);
    }
  });

  return (
    <section className="relative w-full py-32 overflow-hidden bg-transparent z-10 text-[#49344F]">
      
      {/* Typography Header */}
      <div className="container mx-auto px-6 mb-24 text-center">
        <h2 className="text-4xl md:text-7xl font-serif font-light tracking-tight text-[#49344F]">
          Choose your <i className="italic text-[#FFD9C2]">memory.</i>
        </h2>
        <p className="font-sans font-light text-[#49344F]/70 mt-6 tracking-wide text-lg">
          Every tray unlocks a different way to tell your story.
        </p>
      </div>

      {/* Conveyor Belt Wrapper */}
      <div className="relative w-full h-[350px] flex flex-col justify-center">
        
        {/* Top Concrete/Tile Rail */}
        <div className="absolute top-0 w-full h-8 bg-[#8c8a86] border-y-[4px] border-[#3a3937] flex items-center overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)]">
          {/* Tile gaps */}
          <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_150px,#5a5957_150px,#5a5957_153px)]" />
        </div>

        {/* Metallic Roller Track Background */}
        <div className="absolute top-8 bottom-8 w-full bg-[#1a1a1a] shadow-[inset_0_30px_30px_rgba(0,0,0,0.8),inset_0_-30px_30px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* The Cylindrical Rollers */}
          {/* We use a repeating gradient to simulate the 3D shading of a metal cylinder (dark edge, bright middle, dark edge) and a gap. */}
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg, 
                #111 0px, 
                #444 8px, 
                #b5b5b5 22px, 
                #e5e5e5 28px, 
                #a0a0a0 32px, 
                #333 42px, 
                #111 44px, 
                transparent 44px, 
                transparent 48px
              )`
            }}
          />

          {/* Horizontal dark shadow overlay for depth at the top and bottom of rollers */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
          
          {/* Stray sticker stuck to the rollers */}
          <div className="absolute left-[30%] top-1/2 -translate-y-1/2 rotate-[-15deg] pointer-events-none drop-shadow-md">
            <div className="relative flex items-center justify-center w-24 h-24">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#E08F9B] drop-shadow-sm fill-current absolute">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay rounded-full" />
              <span className="relative z-10 text-white font-serif italic text-sm text-center leading-tight transform -rotate-12 drop-shadow-md">
                secret<br/>socials
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Concrete/Tile Rail */}
        <div className="absolute bottom-0 w-full h-8 bg-[#8c8a86] border-y-[4px] border-[#3a3937] flex items-center overflow-hidden shadow-[inset_0_-4px_10px_rgba(0,0,0,0.2)]">
          {/* Tile gaps */}
          <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_150px,#5a5957_150px,#5a5957_153px)]" />
        </div>

        {/* The Moving Trays */}
        <div className="absolute inset-0 flex items-center cursor-grab active:cursor-grabbing"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
          
          <motion.div 
            className="flex gap-16 px-16"
            style={{ x: xPos }}
            drag="x"
            dragConstraints={{ left: -3000, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsHovered(true)}
            onDragEnd={() => setIsHovered(false)}
          >
            {/* Map twice for seamless loop */}
            {[...TRAYS, ...TRAYS].map((tray, idx) => (
              <motion.div
                key={`${tray.id}-${idx}`}
                data-cursor="button"
                className="hover-target relative flex-shrink-0 w-[320px] h-[220px] cursor-pointer"
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => {
                  if (tray.title === "Capture") {
                    router.push("/capture");
                  } else if (tray.title === "Decorate") {
                    router.push("/decorate");
                  } else if (tray.title === "Frames") {
                    router.push("/frames");
                  } else if (tray.title === "Filters") {
                    router.push("/filters");
                  } else if (tray.title === "Memory Styles") {
                    router.push("/styles");
                  }
                }}
              >
                {/* Bubblegum Pink Plastic Tray Styling */}
                <div className="absolute inset-0 rounded-[30px] bg-[#FFAEC9] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_3px_8px_rgba(255,255,255,0.8),inset_0_-6px_15px_rgba(0,0,0,0.15)] overflow-hidden border border-white/30">
                  
                  {/* Tray inner depression (depth) */}
                  <div className="absolute inset-4 rounded-[20px] bg-[#F793B1] shadow-[inset_0_10px_20px_rgba(0,0,0,0.3),0_1px_3px_rgba(255,255,255,0.6)]">
                    
                    {/* Darker base gradient for extra depth */}
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-black/10 to-transparent" />
                    
                    {/* Flat Lay Content scaled down cleanly */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="transform scale-[0.7] origin-center w-full h-full absolute inset-0">
                        {tray.content}
                      </div>
                    </div>
                  </div>

                  {/* Top Label */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/80 backdrop-blur px-3 py-1 rounded-full shadow-sm z-10">
                    {tray.icon}
                    <span className="font-sans font-medium text-xs tracking-widest uppercase text-[#49344F]">{tray.title}</span>
                  </div>
                </div>

                {/* Subtle metallic reflection sweep on hover could be added via CSS before/after */}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
