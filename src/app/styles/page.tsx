"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, ChevronLeft, UploadCloud, Plus, Type, LayoutTemplate } from "lucide-react";

// --- The 10 Aesthetic Memory Templates ---
const TEMPLATES = [
  {
    id: "playlist",
    name: "The Playlist",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[350px] bg-[#121212] p-6 rounded-3xl shadow-2xl flex flex-col text-white font-sans">
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg mb-6">
          <img src={photo} className="w-full h-full object-cover" alt="Album Art" />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold truncate max-w-[240px]">{title}</h3>
            <p className="text-white/60 text-sm truncate max-w-[240px]">{subtitle}</p>
          </div>
          <div className="text-green-500 text-2xl">♥</div>
        </div>
        {/* Fake Timeline */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-2">
          <div className="w-1/3 h-full bg-white rounded-full relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-white/50 mb-6">
          <span>1:24</span>
          <span>-2:15</span>
        </div>
        {/* Fake Controls */}
        <div className="flex justify-center items-center gap-6 text-white">
          <span className="text-xl">⏮</span>
          <span className="text-4xl bg-white text-black rounded-full w-14 h-14 flex items-center justify-center pl-1">▶</span>
          <span className="text-xl">⏭</span>
        </div>
      </div>
    )
  },
  {
    id: "cinema",
    name: "Cinema Ticket",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[400px] bg-[#F4EBD9] p-4 rounded-md shadow-2xl flex border-2 border-dashed border-[#8B2635] text-[#8B2635] font-mono relative overflow-hidden">
        {/* Ticket cutouts */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#1E1E1E] rounded-full"></div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#1E1E1E] rounded-full"></div>
        
        <div className="w-2/3 border-r-2 border-dashed border-[#8B2635] pr-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-1 text-center">Admit One</h2>
          <p className="text-xs uppercase mb-3 text-center opacity-80">{subtitle}</p>
          <div className="w-full aspect-[4/3] border-4 border-[#8B2635] p-1 bg-white mb-3">
            <img src={photo} className="w-full h-full object-cover grayscale sepia-[0.5]" alt="Movie Scene" />
          </div>
          <h3 className="text-lg font-bold text-center truncate w-full uppercase">{title}</h3>
        </div>
        <div className="w-1/3 pl-4 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold uppercase mb-4 rotate-90 whitespace-nowrap">Cinema</h2>
          <div className="w-full h-24 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e9/UPC-A-036000291452.svg')] bg-contain bg-no-repeat bg-center opacity-70"></div>
          <p className="text-[10px] mt-2">No. 004934</p>
        </div>
      </div>
    )
  },
  {
    id: "receipt",
    name: "Midnight Receipt",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[300px] bg-white p-6 shadow-2xl text-black font-mono text-sm" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), 95% 100%, 90% calc(100% - 10px), 85% 100%, 80% calc(100% - 10px), 75% 100%, 70% calc(100% - 10px), 65% 100%, 60% calc(100% - 10px), 55% 100%, 50% calc(100% - 10px), 45% 100%, 40% calc(100% - 10px), 35% 100%, 30% calc(100% - 10px), 25% 100%, 20% calc(100% - 10px), 15% 100%, 10% calc(100% - 10px), 5% 100%, 0 calc(100% - 10px))" }}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold uppercase">{title}</h2>
          <p className="text-xs uppercase">{subtitle}</p>
          <p className="text-xs mt-1">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="w-full aspect-[3/4] bg-black p-1 mb-6">
          <img src={photo} className="w-full h-full object-cover grayscale contrast-125" alt="Receipt Photo" />
        </div>
        <div className="border-t border-dashed border-black pt-4 pb-4">
          <div className="flex justify-between mb-1"><span>MEMORIES</span><span>PRICELESS</span></div>
          <div className="flex justify-between mb-1"><span>VIBES</span><span>100%</span></div>
          <div className="flex justify-between"><span>AESTHETIC</span><span>MAX</span></div>
        </div>
        <div className="border-t-2 border-black pt-4 text-center pb-8">
          <p className="font-bold text-lg mb-2">TOTAL: ∞</p>
          <p className="text-xs">THANK YOU FOR VISITING</p>
        </div>
      </div>
    )
  },
  {
    id: "scrapbook",
    name: "Scrapbook Journal",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[380px] h-[480px] bg-[#fdfbf7] p-8 shadow-2xl relative" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e5e5e5 28px)" }}>
        {/* Washi Tape */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#e8dcc4]/80 backdrop-blur-sm -rotate-3 z-10 shadow-sm" style={{ clipPath: "polygon(5% 0, 95% 0, 100% 10%, 95% 20%, 100% 30%, 95% 40%, 100% 50%, 95% 60%, 100% 70%, 95% 80%, 100% 90%, 95% 100%, 5% 100%, 0 90%, 5% 80%, 0 70%, 5% 60%, 0 50%, 5% 40%, 0 30%, 5% 20%, 0 10%)" }}></div>
        
        <div className="w-full aspect-[4/5] bg-white p-3 shadow-md border border-gray-100 rotate-2 mt-4 relative">
          <img src={photo} className="w-full h-full object-cover sepia-[0.2]" alt="Scrapbook" />
        </div>
        
        <div className="mt-6 -rotate-1">
          <h3 className="font-serif italic text-3xl text-slate-800">{title}</h3>
          <p className="font-serif text-slate-500 mt-2 text-sm leading-relaxed">{subtitle}</p>
        </div>
      </div>
    )
  },
  {
    id: "mac",
    name: "Retro Mac OS",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] bg-[#c0c0c0] shadow-[2px_2px_0px_#000000] border-2 border-white border-r-black border-b-black p-[2px] font-sans">
        {/* Title Bar */}
        <div className="bg-[#000080] h-6 flex items-center justify-between px-2 text-white font-bold text-xs tracking-wider">
          <span>{title}.jpg</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-[#c0c0c0] shadow-[inset_1px_1px_0px_#ffffff,_inset_-1px_-1px_0px_#000000]"></div>
            <div className="w-3 h-3 bg-[#c0c0c0] shadow-[inset_1px_1px_0px_#ffffff,_inset_-1px_-1px_0px_#000000]"></div>
          </div>
        </div>
        {/* Content */}
        <div className="bg-white m-1 border-2 border-black border-t-gray-400 border-l-gray-400 p-4">
          <div className="w-full aspect-video border border-gray-300 mb-4 bg-gray-100 flex items-center justify-center p-1">
             <img src={photo} className="w-full h-full object-cover saturate-[0.8] contrast-125" alt="Mac Window" />
          </div>
          <p className="text-center font-mono text-sm text-black">{subtitle}</p>
        </div>
      </div>
    )
  },
  {
    id: "instagram",
    name: "Insta Post",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[360px] bg-white border border-gray-200 rounded-sm shadow-xl font-sans text-black">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 overflow-hidden"><img src={photo} className="w-full h-full object-cover blur-sm"/></div>
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">{title}</p>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
          <span className="text-gray-600 font-bold tracking-widest mb-2">...</span>
        </div>
        {/* Photo */}
        <div className="w-full aspect-square bg-gray-100">
          <img src={photo} className="w-full h-full object-cover" alt="Insta Post" />
        </div>
        {/* Footer */}
        <div className="p-3">
          <div className="flex gap-4 mb-2">
            <span className="text-2xl">♡</span>
            <span className="text-2xl">💬</span>
            <span className="text-2xl">➤</span>
          </div>
          <p className="text-sm font-bold mb-1">Liked by 1,492 others</p>
          <p className="text-sm"><span className="font-bold mr-2">{title}</span>{subtitle}</p>
          <p className="text-xs text-gray-400 uppercase mt-2 tracking-wide">2 HOURS AGO</p>
        </div>
      </div>
    )
  },
  {
    id: "polaroid-stack",
    name: "Polaroid Stack",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="relative w-[340px] h-[400px]">
        {/* Back polaroid (fake) */}
        <div className="absolute top-4 left-4 w-full h-full bg-[#f4f4f4] p-4 pb-20 shadow-xl border border-gray-200 rotate-6 flex flex-col justify-between">
           <div className="w-full flex-1 bg-gray-300"></div>
        </div>
        {/* Front polaroid */}
        <div className="absolute top-0 left-0 w-full h-full bg-white p-4 pb-20 shadow-2xl border border-gray-100 -rotate-3 flex flex-col justify-between z-10 transition-transform hover:rotate-0">
          <div className="w-full flex-1 bg-gray-100 mb-4 overflow-hidden shadow-inner">
             <img src={photo} className="w-full h-full object-cover contrast-110 saturate-110" alt="Polaroid Stack" />
          </div>
          <div className="text-center font-serif">
            <p className="text-2xl text-slate-800 font-bold mb-1">{title}</p>
            <p className="text-sm text-slate-500 italic">{subtitle}</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "cd-cover",
    name: "CD Cover",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[380px] aspect-square bg-black shadow-[0_0_40px_rgba(255,255,255,0.2)] p-1 relative group overflow-hidden">
        {/* Plastic case edge effect */}
        <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-gray-600 via-gray-300 to-transparent opacity-40 z-20 pointer-events-none"></div>
        
        <div className="w-full h-full relative z-10">
          <img src={photo} className="w-full h-full object-cover" alt="CD Cover" />
          {/* Parental Advisory */}
          <div className="absolute bottom-4 right-4 bg-white px-2 py-1 border border-black flex flex-col items-center justify-center font-sans tracking-tighter w-24">
            <span className="text-[7px] font-bold border-b border-black w-full text-center pb-[1px]">PARENTAL</span>
            <span className="text-[10px] font-black uppercase">Advisory</span>
            <span className="text-[7px] font-bold border-t border-black w-full text-center pt-[1px]">EXPLICIT CONTENT</span>
          </div>
          {/* Typography */}
          <div className="absolute top-6 left-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-1">{title}</h1>
            <h2 className="text-xl font-bold tracking-widest uppercase opacity-80">{subtitle}</h2>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "notebook",
    name: "Grid Notebook",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[360px] bg-[#faf9f6] p-6 shadow-2xl relative overflow-hidden text-[#1d1d1b]" style={{ backgroundImage: "linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
        {/* Spiral holes */}
        <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
          {[...Array(12)].map((_,i) => <div key={i} className="w-4 h-4 rounded-full bg-[#1E1E1E] shadow-inner"></div>)}
        </div>
        
        <div className="pl-8 pt-4 pb-12">
          <h2 className="font-serif italic text-3xl text-blue-800 mb-2">{title}</h2>
          <p className="font-sans text-sm text-gray-500 mb-6 bg-yellow-200 inline-block px-1 rotate-1">{subtitle}</p>
          
          <div className="w-full aspect-[4/3] bg-white p-2 shadow-[2px_2px_0px_#000] border-2 border-black -rotate-2 relative group">
             {/* Doodle stars */}
             <div className="absolute -top-4 -right-4 text-2xl text-red-500 rotate-12">★</div>
             <div className="absolute -bottom-3 -left-3 text-xl text-blue-500 -rotate-12">★</div>
             <img src={photo} className="w-full h-full object-cover grayscale" alt="Notebook" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: "vhs",
    name: "VHS Tape",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] aspect-video bg-black shadow-2xl relative overflow-hidden font-mono text-white text-xl">
        <img src={photo} className="w-full h-full object-cover saturate-[1.5] contrast-[1.2] blur-[1px]" alt="VHS" />
        
        {/* RGB Glitch Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,255,0,0.2) 3px, rgba(255,0,0,0.2) 4px)" }}></div>
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        
        {/* UI Elements */}
        <div className="absolute top-6 left-8 font-bold drop-shadow-[2px_2px_0px_black] uppercase flex items-center gap-3">
          <span className="text-3xl tracking-widest text-white">PLAY</span>
          <span className="text-2xl text-green-400">►</span>
        </div>
        
        <div className="absolute bottom-6 left-8 drop-shadow-[2px_2px_0px_black]">
          <p className="text-2xl text-yellow-300 tracking-widest">{title}</p>
          <p className="text-lg tracking-widest mt-1 opacity-80">{subtitle}</p>
        </div>
        
        <div className="absolute bottom-6 right-8 text-right drop-shadow-[2px_2px_0px_black]">
          <p className="text-xl">AM 12:43</p>
          <p className="text-lg opacity-80">OCT 14 1998</p>
        </div>
      </div>
    )
  },
  {
    id: "vogue",
    name: "Vogue Cover",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-white p-6 pt-24 pb-12 border border-gray-200 shadow-2xl relative flex flex-col">
        <div className="absolute top-4 left-0 w-full text-center text-[70px] font-serif tracking-tighter mix-blend-difference text-white z-20 pointer-events-none leading-none uppercase">{title || 'VOGUE'}</div>
        <div className="absolute bottom-6 left-6 text-[10px] font-serif z-20 mix-blend-difference text-white w-24 leading-tight uppercase">LIMITED EDITION<br/>VOL. 49</div>
        <div className="absolute bottom-6 right-6 text-[10px] font-serif z-20 mix-blend-difference text-white text-right leading-tight tracking-widest uppercase">{subtitle || 'FASHION & STYLE'}</div>
        <div className="flex-1 w-full min-h-0 bg-gray-100 flex flex-col relative overflow-hidden">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover" alt="Vogue Cover" />
        </div>
      </div>
    )
  },
  {
    id: "dark-floral",
    name: "Dark Floral",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-[#4a0d16] p-8 border-2 border-[#2a080c] shadow-2xl relative flex flex-col">
        <div className="absolute -top-6 -left-6 text-7xl drop-shadow-xl rotate-12 z-20">🌺</div>
        <div className="absolute -bottom-6 -right-6 text-7xl drop-shadow-xl -rotate-12 z-20">🌹</div>
        <div className="absolute top-1/2 -right-4 text-5xl drop-shadow-xl rotate-45 z-20">🥀</div>
        <div className="flex-1 w-full min-h-0 bg-[#e8dcc4] p-2 border-2 border-[#8B2635] shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover" alt="Dark Floral" />
           <div className="absolute bottom-4 left-0 w-full text-center font-serif italic text-white mix-blend-difference text-2xl drop-shadow-md z-10">{title}</div>
        </div>
      </div>
    )
  },
  {
    id: "vintage-script",
    name: "Vintage Script",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-[#f4ebd9] p-8 border border-[#d4c5b0] shadow-xl relative flex flex-col" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 20px, rgba(0,0,0,0.05) 21px)' }}>
        <div className="absolute top-4 left-4 font-serif italic text-2xl text-black/20 -rotate-12 pointer-events-none">{title || 'Dear Diary,'}</div>
        <div className="flex-1 w-full min-h-0 bg-white p-2 shadow-md border border-gray-200 rotate-1 flex flex-col relative overflow-hidden mt-8 mb-4">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover sepia-[0.3]" alt="Vintage Script" />
        </div>
        <div className="text-right font-serif italic text-black/40 text-sm mt-2">{subtitle}</div>
      </div>
    )
  },
  {
    id: "torn-edge",
    name: "Torn Paper",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-[#e6d5b8] p-6 shadow-2xl flex flex-col" style={{ clipPath: "polygon(1% 2%, 98% 0%, 100% 97%, 3% 100%, 0% 50%)" }}>
        <div className="flex-1 w-full min-h-0 bg-white p-3 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] border border-black flex flex-col relative overflow-hidden">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover grayscale" alt="Torn Paper" />
           <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-mono uppercase font-bold">{title}</div>
           <div className="absolute bottom-2 right-2 bg-white text-black px-2 py-1 text-xs border border-black font-mono uppercase font-bold">{subtitle}</div>
        </div>
      </div>
    )
  },
  {
    id: "film-strip",
    name: "Film Strip",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[300px] h-[600px] bg-[#111] p-4 px-10 border-none shadow-2xl rounded-sm relative flex flex-col">
        <div className="absolute top-0 left-2 w-4 h-full" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, white 0px, white 12px, transparent 12px, transparent 24px)' }}></div>
        <div className="absolute top-0 right-2 w-4 h-full" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, white 0px, white 12px, transparent 12px, transparent 24px)' }}></div>
        
        <div className="flex-1 w-full min-h-0 bg-white shadow-inner flex flex-col relative overflow-hidden mb-2">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover saturate-[1.2]" alt="Film Strip 1" />
        </div>
        <div className="flex-1 w-full min-h-0 bg-white shadow-inner flex flex-col relative overflow-hidden mb-2">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover saturate-[1.2]" alt="Film Strip 2" style={{ objectPosition: 'center 25%' }} />
        </div>
        <div className="flex-1 w-full min-h-0 bg-white shadow-inner flex flex-col relative overflow-hidden">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover saturate-[1.2]" alt="Film Strip 3" style={{ objectPosition: 'center 75%' }} />
           <div className="absolute bottom-1 right-1 text-[#fbc531] text-[10px] font-mono font-bold drop-shadow-md">{title}</div>
        </div>
      </div>
    )
  },
  {
    id: "burned-edge",
    name: "Burned Edge",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-[#c19a6b] p-8 border-[12px] border-[#4a3525] shadow-inner rounded-sm flex flex-col relative">
        <div className="flex-1 w-full min-h-0 bg-[#fdfbf7] p-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border border-[#8c7355] flex flex-col relative overflow-hidden">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover sepia-[0.6] contrast-[1.1]" alt="Burned Edge" />
        </div>
        <div className="absolute bottom-10 left-0 w-full text-center text-4xl font-serif italic text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">{title}</div>
        <div className="absolute bottom-4 left-0 w-full text-center text-xs font-sans tracking-[0.2em] uppercase text-[#4a3525] font-bold z-10">{subtitle}</div>
      </div>
    )
  },
  {
    id: "romantic-lace",
    name: "Romantic Lace",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-white p-8 border-[16px] border-double border-[#ffc0cb] shadow-lg rounded-2xl flex flex-col relative">
        <div className="flex-1 w-full min-h-0 bg-gray-50 shadow-sm border border-pink-100 rounded-lg overflow-hidden flex flex-col relative">
           <div className="absolute top-2 left-2 text-2xl drop-shadow-sm z-20">🎀</div>
           <img src={photo} className="flex-1 w-full min-h-0 object-cover" alt="Romantic Lace" />
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-pink-200 text-pink-500 font-serif italic text-lg shadow-sm whitespace-nowrap z-10">{title}</div>
        </div>
      </div>
    )
  },
  {
    id: "minimalist-art",
    name: "Minimalist Art",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-[#fcfcfc] p-8 pb-32 border border-gray-200 shadow-2xl flex flex-col relative">
        <div className="flex-1 w-full min-h-0 bg-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover saturate-[0.8] contrast-[1.1]" alt="Minimalist Art" />
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-full">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gray-400 truncate w-3/4 text-center">{subtitle || 'Gallery Exhibition'}</span>
          <span className="font-serif italic text-sm text-gray-800 truncate w-3/4 text-center">{title || 'LumiStrip Curated Collection'}</span>
        </div>
      </div>
    )
  },
  {
    id: "y2k-cyber",
    name: "Y2K Cyber",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-gradient-to-tr from-cyan-300 via-purple-300 to-pink-300 p-6 border-4 border-white shadow-[0_0_30px_rgba(0,255,255,0.6)] rounded-xl flex flex-col relative">
        <div className="absolute -top-4 -right-4 text-4xl drop-shadow-[0_0_10px_white] z-20 animate-pulse">✨</div>
        <div className="absolute -bottom-4 -left-4 text-4xl drop-shadow-[0_0_10px_white] z-20 animate-pulse">💿</div>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white font-bold text-3xl italic tracking-widest drop-shadow-[2px_2px_0px_#ec4899] z-20 uppercase whitespace-nowrap">{title}</div>
        <div className="flex-1 w-full min-h-0 bg-white p-1 border-2 border-fuchsia-500 rounded-md shadow-inner flex flex-col relative overflow-hidden mt-12 mb-4">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover saturate-[1.5] contrast-[1.2]" alt="Y2K Cyber" />
        </div>
        <div className="text-center font-mono text-xs font-bold text-white tracking-widest drop-shadow-[1px_1px_0px_#ec4899] uppercase">{subtitle}</div>
      </div>
    )
  },
  {
    id: "kawaii-cloud",
    name: "Kawaii Cloud",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-[#e0f7fa] p-6 border-4 border-dashed border-[#80deea] shadow-lg rounded-3xl flex flex-col relative">
        <div className="absolute -top-6 left-4 text-6xl drop-shadow-md z-20">☁️</div>
        <div className="absolute top-1/2 -right-8 text-5xl drop-shadow-md z-20">🌈</div>
        <div className="absolute -bottom-4 left-1/2 text-4xl drop-shadow-md z-20">✨</div>
        <div className="flex-1 w-full min-h-0 bg-white p-2 rounded-2xl border-2 border-[#b2ebf2] flex flex-col relative overflow-hidden mb-6">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover rounded-xl" alt="Kawaii Cloud" />
        </div>
        <div className="text-center w-full">
          <p className="font-sans font-bold text-lg text-cyan-600 mb-1">{title}</p>
          <p className="font-sans text-xs text-cyan-400">{subtitle}</p>
        </div>
      </div>
    )
  },
  {
    id: "grunge",
    name: "Grunge Collage",
    render: (photo: string, title: string, subtitle: string) => (
      <div className="w-[420px] h-[594px] bg-[#222] p-6 border-4 border-black shadow-2xl flex flex-col relative" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #222 0px, #222 10px, #2a2a2a 10px, #2a2a2a 20px)' }}>
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20"></div>
        
        <div className="absolute top-8 right-8 bg-red-600 text-white font-bold px-3 py-1 -rotate-6 z-20 font-mono text-xl border-2 border-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase">{title}</div>
        
        <div className="flex-1 w-full min-h-0 bg-white p-2 rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,1)] border-2 border-black flex flex-col relative overflow-hidden mt-6 mb-12 z-10">
           <img src={photo} className="flex-1 w-full min-h-0 object-cover grayscale contrast-[1.2]" alt="Grunge Collage" />
        </div>
        
        <div className="absolute bottom-6 left-6 bg-white text-black px-2 py-1 font-mono text-xs border border-black z-20 font-bold uppercase">{subtitle}</div>
      </div>
    )
  }
];

export default function StylesPage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activePanel, setActivePanel] = useState<string>("templates");
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  
  // Custom Text State
  const [customTitle, setCustomTitle] = useState("Summer Memories");
  const [customSubtitle, setCustomSubtitle] = useState("LumiStrip Curated");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Just take the first photo for styles (single photo wrapper)
      const newPhoto = URL.createObjectURL(e.target.files[0]);
      setPhotos([newPhoto]);
    }
  };

  const downloadImage = async () => {
    if (!stripRef.current) return;
    try {
      const htmlToImage = await import('html-to-image');
      const dataUrl = await htmlToImage.toPng(stripRef.current, { quality: 1.0, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `lumistrip-style-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      alert("Please run 'npm install html-to-image' in your terminal to enable downloading!");
    }
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-[#1E1E1E]">
      
      {/* LEFT: CANVAS AREA */}
      <div 
        data-lenis-prevent
        className="flex-1 h-full overflow-y-auto overflow-x-hidden relative flex flex-col items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20"
      >
        <div className="w-full min-h-full py-24 flex flex-col items-center justify-center">
          <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-serif italic shadow-sm hover:bg-white/20 transition-all z-50">
            <ChevronLeft className="w-4 h-4" /> Back Home
          </Link>

          {/* Global File Input */}
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />

          {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center max-w-md mt-24">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/50">
                <UploadCloud className="w-10 h-10" />
              </div>
              <h2 className="font-serif italic text-4xl text-white mb-4">Memory Styles</h2>
              <p className="font-sans text-white/50 mb-8">Upload a photo to wrap it in fully coded, highly aesthetic scrapbooking templates.</p>
              <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 bg-white text-black rounded-full font-serif italic text-xl tracking-wide flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1">
                <Plus className="w-5 h-5" /> Select Photo
              </button>
            </div>
          ) : (
            <motion.div 
              ref={stripRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative transition-all duration-500"
            >
              {selectedTemplate.render(photos[0], customTitle, customSubtitle)}
            </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT: EDITING TOOLS */}
      <section className="relative w-full md:w-[420px] flex-1 md:flex-none md:h-full bg-[#121212] border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col z-20 text-white overflow-hidden">
        <div className="p-4 md:p-8 pb-4 shrink-0 flex justify-between items-start">
          <div>
            <h1 className="font-serif italic text-3xl tracking-tight">Memory Styles</h1>
            <p className="font-sans text-xs uppercase tracking-widest text-white/50 mt-2">Aesthetic Wrappers</p>
          </div>
          {photos.length > 0 && (
             <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors" title="Change Photo">
               <UploadCloud className="w-5 h-5" />
             </button>
          )}
        </div>

        {/* Accordion Menu */}
        <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          
          {/* TEXT CUSTOMIZATION */}
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 transition-all shrink-0">
            <button onClick={() => setActivePanel(activePanel === "text" ? "" : "text")} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"><Type className="w-4 h-4" /></div>
              <span className="font-serif italic text-xl text-white">Custom Text</span>
            </button>
            <AnimatePresence>
              {activePanel === "text" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 flex flex-col gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">Primary Title</label>
                      <input 
                        type="text" 
                        value={customTitle} 
                        onChange={(e) => setCustomTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white font-sans focus:outline-none focus:border-white/50 transition-colors"
                        maxLength={40}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">Subtitle / Vibe</label>
                      <input 
                        type="text" 
                        value={customSubtitle} 
                        onChange={(e) => setCustomSubtitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white font-sans focus:outline-none focus:border-white/50 transition-colors"
                        maxLength={40}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TEMPLATES */}
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 transition-all shrink-0">
            <button onClick={() => setActivePanel(activePanel === "templates" ? "" : "templates")} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"><LayoutTemplate className="w-4 h-4" /></div>
              <span className="font-serif italic text-xl text-white">Choose Template</span>
            </button>
            <AnimatePresence>
              {activePanel === "templates" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                    {TEMPLATES.map(template => (
                      <button 
                        key={template.id} 
                        onClick={() => setSelectedTemplate(template)} 
                        className={`py-3 px-2 rounded-xl text-xs font-sans tracking-wide transition-all border ${selectedTemplate.id === template.id ? 'bg-white text-black border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent text-white/70 border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* CTA BUTTON */}
        <div className="p-6 bg-[#121212] border-t border-white/10 shrink-0">
          <motion.button 
            onClick={downloadImage} 
            whileHover={{ scale: 1.02, y: -2 }} 
            whileTap={{ scale: 0.98 }} 
            disabled={photos.length === 0} 
            className={`w-full py-5 bg-white text-black rounded-2xl font-serif italic text-xl tracking-wide flex items-center justify-center gap-3 transition-shadow ${photos.length > 0 ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'opacity-50 cursor-not-allowed'}`}
          >
            <Download className="w-5 h-5" /> Download Aesthetic
          </motion.button>
        </div>
      </section>
    </main>
  );
}
