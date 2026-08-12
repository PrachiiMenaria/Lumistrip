"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, ChevronLeft, UploadCloud, Plus, Sparkles } from "lucide-react";

// The 25 Aesthetic Filters
const FILTERS = [
  { id: "normal", name: "Normal", filter: "none", overlay: "" },
  { id: "polaroid", name: "Polaroid", filter: "contrast(1.1) brightness(1.1) sepia(0.3) hue-rotate(-10deg)", overlay: "bg-orange-500/10 mix-blend-color" },
  { id: "disposable", name: "Disposable", filter: "contrast(1.3) saturate(1.2) brightness(1.05)", overlay: "bg-blue-500/10 mix-blend-overlay" },
  { id: "cinematic", name: "Cinematic", filter: "contrast(1.2) saturate(0.8) brightness(0.9)", overlay: "bg-black/10 mix-blend-multiply" },
  { id: "vintage90s", name: "Vintage 90s", filter: "sepia(0.6) contrast(0.9) brightness(1.1)", overlay: "bg-yellow-600/10 mix-blend-multiply" },
  { id: "bwfilm", name: "B&W Film", filter: "grayscale(1) contrast(1.4) brightness(0.9)", overlay: "" },
  { id: "faded", name: "Faded Monochrome", filter: "grayscale(1) contrast(0.8) brightness(1.2)", overlay: "" },
  { id: "cyberpunk", name: "Cyberpunk", filter: "saturate(2) contrast(1.2) hue-rotate(30deg)", overlay: "bg-pink-500/10 mix-blend-color" },
  { id: "cottagecore", name: "Cottagecore", filter: "sepia(0.3) saturate(0.9) contrast(0.9) brightness(1.1)", overlay: "bg-green-100/20 mix-blend-soft-light" },
  { id: "dreamy", name: "Dreamy", filter: "blur(1px) brightness(1.2) contrast(0.9)", overlay: "bg-pink-200/20 mix-blend-screen" },
  { id: "darkacademia", name: "Dark Academia", filter: "sepia(0.4) contrast(1.2) brightness(0.8)", overlay: "bg-[#4a3b32]/30 mix-blend-multiply" },
  { id: "y2k", name: "Y2K Flash", filter: "contrast(1.4) saturate(1.5) brightness(1.2)", overlay: "bg-white/10 mix-blend-overlay" },
  { id: "goldenhour", name: "Golden Hour", filter: "sepia(0.4) saturate(1.3) contrast(1.1)", overlay: "bg-orange-400/20 mix-blend-overlay" },
  { id: "coolmint", name: "Cool Mint", filter: "saturate(0.8) contrast(1.1)", overlay: "bg-teal-400/20 mix-blend-soft-light" },
  { id: "indiekid", name: "Indie Kid", filter: "saturate(1.8) contrast(1.3)", overlay: "bg-yellow-300/10 mix-blend-color" },
  { id: "moody", name: "Moody", filter: "saturate(0.6) contrast(1.3) brightness(0.8)", overlay: "bg-blue-900/20 mix-blend-overlay" },
  { id: "sunkissed", name: "Sun-Kissed", filter: "brightness(1.15) contrast(1.05) saturate(1.1)", overlay: "bg-yellow-200/20 mix-blend-soft-light" },
  { id: "lofi", name: "Lo-Fi", filter: "contrast(1.5) saturate(1.1) sepia(0.2)", overlay: "bg-black/10 mix-blend-multiply" },
  { id: "retropop", name: "Retro Pop", filter: "hue-rotate(90deg) saturate(1.5) contrast(1.1)", overlay: "" },
  { id: "washedout", name: "Washed Out", filter: "contrast(0.7) saturate(0.7) brightness(1.1)", overlay: "" },
  { id: "nostalgia", name: "Nostalgia", filter: "sepia(0.8) contrast(0.8) brightness(1.1)", overlay: "bg-orange-800/10 mix-blend-multiply" },
  { id: "infrared", name: "Infrared", filter: "invert(0.8) hue-rotate(180deg) saturate(2)", overlay: "" },
  { id: "midnight", name: "Midnight", filter: "contrast(1.2) brightness(0.7) saturate(0.8)", overlay: "bg-blue-800/30 mix-blend-multiply" },
  { id: "pastel", name: "Pastel", filter: "contrast(0.8) brightness(1.2) saturate(0.9)", overlay: "bg-pink-100/20 mix-blend-soft-light" },
  { id: "sepiaclassic", name: "Sepia Classic", filter: "sepia(1) contrast(1.1)", overlay: "bg-amber-900/10 mix-blend-multiply" }
];

export default function FiltersPage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activePanel, setActivePanel] = useState<string>("filters");
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const downloadImage = async () => {
    if (!stripRef.current) return;
    try {
      const htmlToImage = await import('html-to-image');
      const dataUrl = await htmlToImage.toJpeg(stripRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `lumistrip-filter-${Date.now()}.jpg`;
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
        className="flex-1 h-full overflow-y-auto overflow-x-hidden relative"
      >
        <div className="w-full min-h-full py-24 flex flex-col items-center justify-center">
          <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-serif italic shadow-sm hover:bg-white/20 transition-all z-50">
            <ChevronLeft className="w-4 h-4" /> Back Home
          </Link>

          {/* Global File Input to ensure the + button always works */}
          <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />

          {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center max-w-md mt-24">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/50">
                <UploadCloud className="w-10 h-10" />
              </div>
              <h2 className="font-serif italic text-4xl text-white mb-4">Aesthetic Filters</h2>
              <p className="font-sans text-white/50 mb-8">Upload your photos to apply 25 unique, high-quality aesthetic filters.</p>
              <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 bg-white text-black rounded-full font-serif italic text-xl tracking-wide flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1">
                <Plus className="w-5 h-5" /> Select Photos
              </button>
            </div>
          ) : (
            <motion.div 
              ref={stripRef}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative flex flex-col gap-4 p-8 bg-transparent"
            >
              {photos.map((photo, i) => (
                <div key={i} className="relative w-full max-w-md mx-auto bg-white p-4 shadow-2xl rounded-sm">
                  <div className="relative w-full overflow-hidden bg-gray-100">
                    <img 
                      src={photo} 
                      alt={`Filtered ${i+1}`} 
                      className="w-full h-auto object-contain transition-all duration-300 ease-in-out" 
                      style={{ filter: selectedFilter.filter }} 
                    />
                    {/* The Color/Blend Overlay */}
                    {selectedFilter.overlay && (
                      <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ease-in-out ${selectedFilter.overlay}`} />
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT: EDITING TOOLS */}
      <section className="relative w-full md:w-[400px] flex-1 md:flex-none md:h-full bg-[#121212] border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col z-20 text-white overflow-hidden">
        <div className="p-4 md:p-8 pb-4 shrink-0 flex justify-between items-start">
          <div>
            <h1 className="font-serif italic text-3xl tracking-tight">Filters</h1>
            <p className="font-sans text-xs uppercase tracking-widest text-white/50 mt-2">Vibes & Aesthetics</p>
          </div>
          {photos.length > 0 && (
             <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors" title="Upload more">
               <Plus className="w-5 h-5" />
             </button>
          )}
        </div>

        {/* Accordion Menu */}
        <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 transition-all shrink-0">
            <button onClick={() => setActivePanel(activePanel === "filters" ? "" : "filters")} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
              <span className="font-serif italic text-xl text-white">Select Filter</span>
            </button>
            <AnimatePresence>
              {activePanel === "filters" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                    {FILTERS.map(filter => (
                      <button 
                        key={filter.id} 
                        onClick={() => setSelectedFilter(filter)} 
                        className={`py-3 px-2 rounded-xl text-xs font-sans tracking-wide transition-all border ${selectedFilter.id === filter.id ? 'bg-white text-black border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent text-white/70 border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                      >
                        {filter.name}
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
            <Download className="w-5 h-5" /> Save Filtered Photo
          </motion.button>
        </div>
      </section>
    </main>
  );
}
