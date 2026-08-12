"use client";

import { motion } from "framer-motion";
import { Star, Heart, Paperclip, Sparkles } from "lucide-react";

export function ServingDome() {
  return (
    <div className="relative w-[400px] h-[500px] flex flex-col items-center justify-end">
      
      {/* --- Floating Decorative Elements --- */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <motion.div animate={{ y: [0, -10, 0], rotate: [10, -5, 10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[10%] text-yellow-400 drop-shadow-sm">
          <Star size={24} fill="currentColor" />
        </motion.div>
        
        <motion.div animate={{ y: [0, 8, 0], rotate: [-15, 5, -15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[15%] right-[15%] text-[#B77466] drop-shadow-sm">
          <Heart size={20} fill="currentColor" />
        </motion.div>

        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[40%] right-[5%] text-[#E8A07C] drop-shadow-sm">
          <Sparkles size={28} />
        </motion.div>

        <motion.div animate={{ y: [0, 5, 0], rotate: [45, 55, 45] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[40%] left-[5%] text-gray-400 drop-shadow-sm">
          <Paperclip size={24} />
        </motion.div>

        {/* Tiny Polaroid */}
        <motion.div animate={{ y: [0, -12, 0], x: [0, 5, 0], rotate: [-10, -12, -10] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[30%] left-0 w-16 h-20 bg-white p-1 pb-4 shadow-lg border border-gray-100 rounded-sm">
          <div className="w-full h-full bg-[#E8A07C]/30" />
        </motion.div>
        
        {/* Tiny Folder */}
        <motion.div animate={{ y: [0, 8, 0], rotate: [15, 18, 15] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute bottom-[35%] right-[0%] w-14 h-10 bg-[#A5AF79] shadow-md rounded-sm border-t-8 border-[#827148]" />
      </div>

      {/* --- Lifted Glass Dome --- */}
      <motion.div 
        className="absolute bottom-20 z-20 w-[320px] h-[320px] rounded-t-[160px] rounded-b-xl border border-white/40 shadow-[inset_0_0_50px_rgba(255,255,255,0.5),_0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-[2px] bg-gradient-to-tr from-white/10 via-white/5 to-white/30 flex flex-col items-center"
        animate={{ y: [-40, -50, -40], rotate: [-2, 1, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Dome handle */}
        <div className="absolute -top-8 w-12 h-8 rounded-t-full bg-gradient-to-b from-white/80 to-white/30 border border-white/50 shadow-sm" />
        
        {/* Dome glare */}
        <div className="absolute top-10 left-10 w-20 h-40 bg-white/20 rounded-full blur-xl transform -rotate-45" />
      </motion.div>

      {/* --- Lavender Instax Camera (Inside) --- */}
      <div className="absolute bottom-16 z-10 w-48 h-64 bg-[#d8c3e5] rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2),_inset_0_5px_15px_rgba(255,255,255,0.6)] border border-[#c1a8d4] flex flex-col items-center pt-8">
        {/* Viewfinder */}
        <div className="absolute top-6 right-6 w-8 h-10 bg-black/80 rounded-md border-2 border-gray-700 flex items-center justify-center shadow-inner">
           <div className="w-4 h-6 bg-blue-900/50 rounded-sm" />
        </div>
        
        {/* Flash */}
        <div className="absolute top-8 left-6 w-6 h-6 bg-white rounded-full border border-gray-300 shadow-inner flex items-center justify-center">
           <div className="w-3 h-3 bg-yellow-100 rounded-full blur-[1px]" />
        </div>

        {/* Shutter Button */}
        <div className="absolute top-24 right-4 w-6 h-6 bg-[#bfa3d1] rounded-full shadow-[inset_0_-2px_5px_rgba(0,0,0,0.2)] border border-[#a282b8]" />

        {/* Main Lens */}
        <div className="w-32 h-32 mt-12 bg-gray-200 rounded-full border-[6px] border-[#c1a8d4] shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-300 flex items-center justify-center relative overflow-hidden shadow-inner">
            {/* Glass */}
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-900 to-black rounded-full shadow-inner relative">
              <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-white/50 blur-[1px]" />
            </div>
          </div>
        </div>

        {/* Photo exit slot */}
        <div className="absolute top-0 w-32 h-2 bg-gray-800 rounded-b-md border-t border-gray-900 shadow-inner" />
      </div>

      {/* --- Silver Serving Tray (Bottom) --- */}
      <div className="relative z-0 w-[380px] h-20 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400 rounded-[100%] shadow-[0_30px_40px_rgba(0,0,0,0.15),_inset_0_-5px_10px_rgba(255,255,255,0.8)] border border-gray-300 flex items-center justify-center">
         {/* Inner tray depression */}
         <div className="w-[90%] h-[70%] bg-gradient-to-t from-gray-300 to-gray-200 rounded-[100%] border border-gray-400/30 shadow-[inset_0_10px_20px_rgba(0,0,0,0.1)]" />
      </div>

    </div>
  );
}
