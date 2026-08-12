"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const FOLDERS = [
  { id: 2, title: "Filters", color: "#C65A42", textColor: "#F3EEDD", tabPos: "76%", tabWidth: "16%" }, // Cherry (Rust)
  { id: 3, title: "Decorate", color: "#ADC2BD", textColor: "#3A4A46", tabPos: "52%", tabWidth: "18%" }, // Carolina (Mint)
  { id: 4, title: "Frames", color: "#547387", textColor: "#F3EEDD", tabPos: "28%", tabWidth: "16%" }, // Steel (Blue)
  { id: 5, title: "Capture", color: "#F3EEDD", textColor: "#547387", tabPos: "0%", tabWidth: "16%" }, // Beige (Cream)
];

const BG_COLOR = "#2D2D2D";

export function FeatureArchiveSection() {
  const [hoveredFolder, setHoveredFolder] = useState<number | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<number>(FOLDERS[3].id); // Front folder default
  const router = useRouter();

  const activeIdx = FOLDERS.findIndex(f => f.id === activeFolderId);

  // Calculates the physical depth order so the active folder is always in front (highest depth)
  // and the remaining folders maintain their relative order behind it.
  const getDepth = (idx: number, active: number) => {
    if (idx === active) return FOLDERS.length - 1; 
    if (idx > active) return idx - 1; 
    return idx; 
  };

  return (
    <section className="relative w-full min-h-[80vh] py-16 flex justify-center items-end overflow-hidden z-20 border-t border-black/10" style={{ backgroundColor: BG_COLOR }}>
      
      {/* Decorative BG Typography */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none opacity-5">
        <h2 className="text-[7vw] font-serif italic tracking-tighter leading-none whitespace-nowrap text-white">
          A word on archival of our features
        </h2>
      </div>

      <div className="relative w-full max-w-3xl h-[450px] flex items-end justify-center px-4 md:px-12 perspective-[1000px] mb-12">
        {FOLDERS.map((folder, idx) => {
          
          const depth = getDepth(idx, activeIdx);
          const zIndex = depth * 10;
          
          // Negative offset pushes the folders UP. 
          // Lower depth (back folders) are pushed higher up so their tabs stick out!
          const baseOffset = -((FOLDERS.length - 1 - depth) * 40); 
          
          const isHovered = hoveredFolder === folder.id;
          const isActive = activeFolderId === folder.id;
          
          // Hover slightly lifts the folder (further negative Y) if it's not already active
          const yOffset = (isHovered && !isActive) ? baseOffset - 15 : baseOffset;

          return (
            <motion.a
              href="#"
              key={folder.id}
              onClick={(e) => {
                e.preventDefault();
                if (isActive && folder.title === "Capture") {
                  router.push("/capture");
                } else {
                  setActiveFolderId(folder.id);
                }
              }}
              className="absolute bottom-0 w-full block drop-shadow-[0_-5px_15px_rgba(0,0,0,0.2)] cursor-pointer"
              style={{ zIndex, height: '280px' }}
              initial={{ y: baseOffset }}
              animate={{ 
                y: yOffset, 
                rotateX: isActive ? 0 : 2, // Non-active folders lean slightly back
                scale: isActive ? 1.02 : 1
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onMouseEnter={() => setHoveredFolder(folder.id)}
              onMouseLeave={() => setHoveredFolder(null)}
            >
              
              {/* Folder Tab with seamless CSS fillets */}
              <div 
                className="absolute top-0 h-8 rounded-t-[10px] flex items-center justify-center pointer-events-none"
                style={{ 
                  backgroundColor: folder.color, 
                  left: folder.tabPos, 
                  width: folder.tabWidth, 
                  transform: "translateY(-98%)" // precise positioning to hide seam
                }}
              >
                {/* Left Fillet (Inverted Corner) */}
                <div 
                  className="absolute bottom-0 right-full w-4 h-4 bg-transparent"
                  style={{ 
                    borderBottomRightRadius: '16px', 
                    boxShadow: `8px 8px 0 0 ${folder.color}`
                  }}
                />
                
                {/* Right Fillet (Inverted Corner) */}
                <div 
                  className="absolute bottom-0 left-full w-4 h-4 bg-transparent"
                  style={{ 
                    borderBottomLeftRadius: '16px', 
                    boxShadow: `-8px 8px 0 0 ${folder.color}`
                  }}
                />

                {/* Tab Label */}
                <span 
                  className="font-serif text-sm tracking-wide capitalize"
                  style={{ color: folder.textColor }}
                >
                  {folder.title}
                </span>
              </div>

              {/* Folder Body */}
              <div 
                className="w-full h-full rounded-xl relative overflow-hidden"
                style={{ backgroundColor: folder.color }}
              >
                {/* Subtle top edge highlight */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 pointer-events-none rounded-t-xl" />

                {/* Dynamic Content when Active */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  {idx === 3 ? (
                    /* Front Folder Specific Typography (Beige Folder) */
                    <div className="absolute inset-0 p-6 flex flex-col justify-end transform scale-[0.65] origin-bottom-left">
                      
                      {/* Top Right Logo Area */}
                      <div className="absolute top-8 right-8 flex flex-col items-center">
                        <h3 className="font-serif text-5xl tracking-tight text-[#3A3937]">LUMI</h3>
                        <span className="font-sans text-xs uppercase tracking-widest text-[#3A3937]/70 mt-1">Design Studio</span>
                      </div>

                      {/* Bottom Left Grid Graphic */}
                      <div className="absolute bottom-16 left-16 w-64 h-24 border border-[#D5A9A0]/40 flex items-center justify-center">
                        {/* CSS Grid Pattern */}
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,rgba(213,169,160,0.2)_19px,rgba(213,169,160,0.2)_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,rgba(213,169,160,0.2)_19px,rgba(213,169,160,0.2)_20px)]" />
                        
                        {/* Elegant Script Typography */}
                        <span className="font-serif italic text-5xl text-[#3A3937] drop-shadow-sm z-10 -ml-8">archive</span>
                      </div>
                    </div>
                  ) : (
                    /* Generic Active Folder Content */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="font-serif italic text-6xl tracking-tighter" style={{ color: folder.textColor, opacity: 0.2 }}>
                        {folder.title}
                      </h3>
                    </div>
                  )}
                </motion.div>

              </div>

            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
