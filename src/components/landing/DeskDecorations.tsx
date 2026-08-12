"use client";

import { motion } from "framer-motion";
import { Coffee, Film, Image as ImageIcon } from "lucide-react";

export function DeskDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      
      {/* Coffee Cup Stain & Cup */}
      <motion.div 
        className="absolute top-10 right-10 opacity-30 text-amber-900"
        animate={{ y: [0, -5, 0], rotate: [12, 12, 12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          {/* Coffee Ring Stain */}
          <div className="absolute -inset-4 rounded-full border-[3px] border-amber-900/40 mix-blend-multiply" />
          <Coffee size={64} strokeWidth={1} className="mix-blend-multiply" />
        </div>
      </motion.div>

      {/* Scattered Polaroid / Postcard 1 */}
      <motion.div 
        className="absolute bottom-20 right-32 w-32 h-40 bg-white p-2 pb-8 shadow-lg rotate-[-15deg] border border-gray-100"
        animate={{ y: [0, 8, 0], rotate: [-15, -13, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-full h-full bg-[#E8A07C]/20 border border-black/5 flex items-center justify-center">
          <ImageIcon size={24} className="text-[#B77466]/50" />
        </div>
        <div className="font-logo text-xs text-center mt-2 text-gray-500">Paris '23</div>
        {/* Washi tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#A5AF79]/40 backdrop-blur-sm -rotate-3 mix-blend-multiply" />
      </motion.div>

      {/* Scattered Polaroid 2 */}
      <motion.div 
        className="absolute top-20 right-[40%] w-24 h-28 bg-white p-2 pb-6 shadow-md rotate-[25deg] border border-gray-100"
        animate={{ y: [0, -6, 0], rotate: [25, 27, 25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-full h-full bg-[#827148]/20 border border-black/5" />
        {/* Washi tape */}
        <div className="absolute -bottom-3 -right-2 w-10 h-3 bg-[#9A3F3F]/30 backdrop-blur-sm rotate-12 mix-blend-multiply" />
      </motion.div>

      {/* Film Roll 1 */}
      <motion.div 
        className="absolute bottom-10 left-[60%] text-gray-700 opacity-60 mix-blend-multiply"
        animate={{ y: [0, 5, 0], rotate: [45, 45, 45] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Film size={48} strokeWidth={1} />
        {/* Film strip unrolling */}
        <div className="absolute top-1/2 left-full w-24 h-8 border-y-4 border-l-4 border-dashed border-gray-700/40 -translate-y-1/2 rounded-l-md" />
      </motion.div>
      
      {/* Tiny handwritten note */}
      <motion.div
        className="absolute top-[40%] right-10 rotate-6"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="bg-[#FFEED6]/80 p-3 shadow-sm border border-yellow-900/10 rounded-sm transform origin-top-left">
          <p className="font-logo text-lg text-[#9A3F3F]">Don't forget to smile...</p>
        </div>
      </motion.div>

    </div>
  );
}
