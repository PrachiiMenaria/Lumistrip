"use client";

import { motion } from "framer-motion";

const FOLDERS = [
  { id: 1, title: "Summer '26", subtitle: "Beaches & Sunsets", color: "bg-[#A5AF79]", tabColor: "bg-[#827148]" },
  { id: 2, title: "Graduation", subtitle: "Class of 2026", color: "bg-[#E8A07C]", tabColor: "bg-[#B77466]" },
  { id: 3, title: "Europe Trip", subtitle: "Rome & Paris", color: "bg-[#FFEED6]", tabColor: "bg-[#FCCC73]" },
  { id: 4, title: "Coffee Dates", subtitle: "Polaroids", color: "bg-[#9A3F3F]", tabColor: "bg-[#2d2a26]", textLight: true },
  { id: 5, title: "Concerts", subtitle: "Live Music", color: "bg-[#B77466]", tabColor: "bg-[#9A3F3F]" },
  { id: 6, title: "Studio Sessions", subtitle: "Portraits", color: "bg-[#FD9D5D]", tabColor: "bg-[#FD6B5D]" }
];

export function MemoryCabinetSection() {
  return (
    <section className="relative w-full py-32 bg-[#FFEED6]">
      <div className="container max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4 max-w-lg">
            <h2 className="font-heading text-5xl md:text-6xl text-[#2d2a26]">Memory Cabinet</h2>
            <p className="font-body text-[#827148] text-lg">Browse your neatly organized collections, carefully preserved for future nostalgia.</p>
          </div>
          <button className="font-mono text-sm uppercase tracking-widest text-[#B77466] border-b border-[#B77466] pb-1 hover:text-[#9A3F3F] hover:border-[#9A3F3F] transition-colors interactive-hover">
            View All Archives
          </button>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FOLDERS.map((folder) => (
            <motion.div 
              key={folder.id}
              whileHover={{ y: -10, rotate: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative group interactive-hover cursor-pointer"
            >
              {/* Folder Tab */}
              <div className={`absolute -top-4 left-4 w-32 h-6 ${folder.tabColor} rounded-t-lg shadow-sm`}></div>
              
              {/* Folder Body */}
              <div className={`relative w-full aspect-[4/3] ${folder.color} rounded-xl rounded-tl-none shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-black/5 p-8 flex flex-col justify-end overflow-hidden`}>
                
                {/* Paper texture overlay on folder */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0,_rgba(0,0,0,0.02)_100%)] pointer-events-none" />
                
                <div className="relative z-10">
                  <h3 className={`font-heading text-3xl mb-1 ${folder.textLight ? 'text-white' : 'text-[#2d2a26]'}`}>
                    {folder.title}
                  </h3>
                  <p className={`font-logo text-xl ${folder.textLight ? 'text-white/80' : 'text-[#827148]'}`}>
                    {folder.subtitle}
                  </p>
                </div>

                {/* Decorative elastic band / string */}
                <div className="absolute top-0 bottom-0 right-12 w-1 bg-black/10 shadow-sm" />
                <div className="absolute top-1/2 right-10 w-5 h-5 rounded-full bg-white/20 border border-black/10 -translate-y-1/2 backdrop-blur-sm" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
