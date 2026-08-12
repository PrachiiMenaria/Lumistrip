"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, Image as ImageIcon, Palette, ChevronLeft, UploadCloud, Plus } from "lucide-react";

// Data Constants
const FRAMES = [
  { id: "classic", name: "Classic", padding: "p-6 pb-20", bg: "bg-white", border: "border border-gray-200", layoutClass: "flex flex-col gap-4 h-full", photoWrapperClass: "flex-1 w-full min-h-0 bg-gray-100 shadow-inner" },
  { id: "polaroid", name: "Polaroid", padding: "p-8 pb-32", bg: "bg-[#fcfaf8]", border: "border-none shadow-md", layoutClass: "flex flex-col gap-6 h-full", photoWrapperClass: "flex-1 w-full min-h-0 bg-gray-100 shadow-inner" },
  { id: "washi", name: "Washi Tape", padding: "p-6 pb-16", bg: "bg-[#FFF8F2]", border: "border border-[#E8A07C]/40 shadow-sm relative", layoutClass: "flex flex-col gap-5 h-full", photoWrapperClass: "flex-1 w-full min-h-0 bg-gray-100 shadow-inner", extra: <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#A5AF79]/40 backdrop-blur-sm -rotate-2 mix-blend-multiply z-10" /> },
  { 
    id: "camera", 
    name: "Y2K Camera", 
    padding: "p-6 pr-24 pl-8 py-8", 
    bg: "bg-gradient-to-br from-[#E0E5EC] to-[#9BA4B5]", 
    border: "border-4 border-[#7A869A] rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.3)]",
    layoutClass: "flex flex-col gap-4 h-full w-full",
    photoWrapperClass: "flex-1 w-full min-h-0 border-8 border-black rounded-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]",
    extra: (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {/* D-Pad */}
        <div className="w-10 h-10 rounded-full bg-[#7A869A] border-b-2 border-r-2 border-[#5C677D] flex items-center justify-center shadow-inner">
          <div className="w-4 h-4 rounded-full bg-[#E0E5EC] shadow-sm"></div>
        </div>
        {/* Buttons */}
        <div className="w-6 h-6 rounded-full bg-[#7A869A] border-b-2 border-[#5C677D] ml-2"></div>
        <div className="w-6 h-6 rounded-full bg-[#7A869A] border-b-2 border-[#5C677D] ml-2"></div>
      </div>
    )
  },
  {
    id: "gingham",
    name: "Pink Coquette",
    padding: "p-8 pb-28",
    bg: "bg-white",
    border: "border-2 border-[#FF9EBB]/40 shadow-[0_10px_30px_rgba(255,158,187,0.2)]",
    style: {
      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,158,187,0.15) 10px, rgba(255,158,187,0.15) 20px), repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,158,187,0.15) 10px, rgba(255,158,187,0.15) 20px)"
    },
    layoutClass: "flex flex-col gap-5 h-full",
    photoWrapperClass: "flex-1 w-full min-h-0 bg-gray-100 shadow-inner",
    extra: <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-serif italic text-[#FF9EBB] font-bold text-xl drop-shadow-sm whitespace-nowrap">sweet memories</div>
  },
  {
    id: "grid-21",
    name: "Main Character",
    padding: "p-4",
    bg: "bg-black",
    border: "border-none shadow-2xl rounded-3xl",
    layoutClass: "grid grid-cols-3 grid-rows-7 gap-2 h-full",
    maxPhotos: 21,
    photoWrapperClass: "w-full h-full p-1 pb-4 bg-white border border-gray-200 shadow-sm",
    photoDecoration: <div className="absolute bottom-1 right-1 text-[8px] text-red-500">❤</div>
  },
  {
    id: "grid-12",
    name: "Photo Dump",
    padding: "p-5",
    bg: "bg-[#f4f0ec]",
    border: "border-none shadow-2xl rounded-2xl",
    layoutClass: "grid grid-cols-3 grid-rows-4 gap-3 h-full",
    maxPhotos: 12,
    photoWrapperClass: "w-full h-full p-1.5 pb-5 bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]",
    photoDecoration: <div className="absolute bottom-1 right-1.5 text-[10px] text-black">✧</div>
  },
  {
    id: "grid-9",
    name: "Aesthetic Era",
    padding: "p-5",
    bg: "bg-[#FF9EBB]/20",
    border: "border-2 border-[#FF9EBB] shadow-2xl rounded-2xl",
    layoutClass: "grid grid-cols-3 grid-rows-3 gap-3 h-full",
    maxPhotos: 9,
    photoWrapperClass: "w-full h-full p-2 pb-6 bg-white border border-gray-200 shadow-sm",
    photoDecoration: <div className="absolute bottom-1.5 right-2 text-xs text-red-500">❤</div>
  },
  {
    id: "grid-6",
    name: "Vibes Only",
    padding: "p-6",
    bg: "bg-white",
    border: "border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl",
    layoutClass: "grid grid-cols-2 grid-rows-3 gap-4 h-full",
    maxPhotos: 6,
    photoWrapperClass: "w-full h-full p-2.5 pb-8 bg-white border-2 border-black flex flex-col",
    photoDecoration: <div className="absolute bottom-2 right-2 text-sm text-black">★</div>
  }
];

const BACKGROUNDS = [
  { id: "cream", color: "#FFF8F2", name: "Cream" },
  { id: "blush", color: "#FF9EBB", name: "Blush Pink" },
  { id: "butter", color: "#FFF4C2", name: "Butter Yellow" },
  { id: "lavender", color: "#E6E6FA", name: "Lavender" },
  { id: "babyblue", color: "#B0E0E6", name: "Baby Blue" },
  { id: "mint", color: "#98FF98", name: "Mint" },
  { id: "checkerboard", color: "transparent", name: "Checkerboard", style: { backgroundImage: 'linear-gradient(45deg, #e5e5e5 25%, transparent 25%), linear-gradient(-45deg, #e5e5e5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e5e5 75%), linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' } }
];

export default function FramesPage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [layoutId, setLayoutId] = useState<number>(3); // Default max photos for strip
  const stripRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activePanel, setActivePanel] = useState<string>("frames");
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);

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
      link.download = `lumistrip-frames-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      alert("Please run 'npm install html-to-image' in your terminal to enable downloading!");
    }
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-[#FFF8F2]">
      
      {/* LEFT: CANVAS AREA */}
      <div 
        data-lenis-prevent
        className="flex-1 h-full overflow-y-auto overflow-x-hidden relative"
        style={{ backgroundColor: selectedBg.color, ...(selectedBg.style || {}) }}
      >
        <div className="w-full min-h-full py-24 flex flex-col items-center">
          <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full text-[#49344F] font-serif italic shadow-sm hover:bg-white transition-all z-50">
            <ChevronLeft className="w-4 h-4" /> Back Home
          </Link>

          {/* Global File Input to ensure the + button always works */}
          <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />

          {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center max-w-md mt-24">
              <div className="w-24 h-24 bg-[#FF9EBB]/20 rounded-full flex items-center justify-center mb-6 text-[#FF9EBB]">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h2 className="font-serif italic text-4xl text-[#49344F] mb-4">Frame Your Memories</h2>
            <p className="font-sans text-[#49344F]/60 mb-8">Upload photos to add beautiful custom borders, polaroid frames, and more.</p>
            <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 bg-[#49344F] text-[#FFF8F2] rounded-full font-serif italic text-xl tracking-wide flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <Plus className="w-5 h-5" /> Select Photos
            </button>
          </div>
        ) : (
          <motion.div 
            ref={stripRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`relative transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${selectedFrame.padding} ${selectedFrame.bg} ${selectedFrame.border} ${selectedFrame.layoutClass}`}
            style={{ width: '420px', height: '594px', ...(selectedFrame.style || {}) }}
          >
            {/* Some frames have extra elements like tape */}
            {selectedFrame.extra}

            {photos.slice(0, selectedFrame.maxPhotos || layoutId).map((photo, i) => (
              <div key={i} className={`relative overflow-hidden flex flex-col ${selectedFrame.photoWrapperClass}`}>
                <img src={photo} alt={`Photo ${i+1}`} className="flex-1 w-full min-h-0 object-cover" />
                {selectedFrame.photoDecoration}
              </div>
            ))}
          </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT: EDITING TOOLS */}
      <section className="w-full md:w-[400px] shrink-0 h-full bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] flex flex-col z-20">
        <div className="p-8 pb-4 shrink-0 flex justify-between items-start">
          <div>
            <h1 className="font-serif italic text-3xl text-[#49344F] tracking-tight">Frame Studio</h1>
            <p className="font-sans text-xs uppercase tracking-widest text-[#49344F]/50 mt-2">Borders & Layouts</p>
          </div>
          {photos.length > 0 && (
             <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-[#49344F]/5 hover:bg-[#49344F]/10 rounded-full text-[#49344F] transition-colors" title="Upload more">
               <Plus className="w-5 h-5" />
             </button>
          )}
        </div>

        {/* Accordion Menu */}
        <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          
          {/* FRAMES */}
          <div className="bg-[#FFF8F2] rounded-2xl overflow-hidden border border-[#49344F]/5 transition-all shrink-0">
            <button onClick={() => setActivePanel(activePanel === "frames" ? "" : "frames")} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="w-8 h-8 rounded-full bg-[#FF9EBB]/20 flex items-center justify-center text-[#FF9EBB]"><ImageIcon className="w-4 h-4" /></div>
              <span className="font-serif italic text-xl text-[#49344F]">Frames</span>
            </button>
            <AnimatePresence>
              {activePanel === "frames" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 grid grid-cols-2 gap-3">
                    {FRAMES.map(frame => (
                      <button key={frame.id} onClick={() => setSelectedFrame(frame)} className={`py-3 px-2 rounded-xl border text-sm font-sans tracking-wide transition-all ${selectedFrame.id === frame.id ? 'bg-[#FF9EBB] text-white border-transparent shadow-md' : 'bg-white text-[#49344F] border-[#49344F]/10 hover:border-[#FF9EBB]/50'}`}>
                        {frame.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BACKGROUNDS (Only useful for Transparent/Polaroid frames) */}
          <div className="bg-[#FFF8F2] rounded-2xl overflow-hidden border border-[#49344F]/5 transition-all shrink-0">
            <button onClick={() => setActivePanel(activePanel === "backgrounds" ? "" : "backgrounds")} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="w-8 h-8 rounded-full bg-[#FF9EBB]/20 flex items-center justify-center text-[#FF9EBB]"><Palette className="w-4 h-4" /></div>
              <span className="font-serif italic text-xl text-[#49344F]">Wall Background</span>
            </button>
            <AnimatePresence>
              {activePanel === "backgrounds" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 flex flex-wrap gap-3">
                    {BACKGROUNDS.map(bg => (
                      <button key={bg.id} onClick={() => setSelectedBg(bg)} className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${selectedBg.id === bg.id ? 'border-[#49344F] scale-110 shadow-md' : 'border-black/5'}`} style={{ backgroundColor: bg.color, ...(bg.style || {}) }} title={bg.name} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="p-6 bg-white/50 border-t border-black/5 shrink-0">
          <motion.button onClick={downloadImage} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} disabled={photos.length === 0} className={`w-full py-5 bg-[#49344F] text-[#FFF8F2] rounded-2xl font-serif italic text-xl tracking-wide flex items-center justify-center gap-3 transition-shadow ${photos.length > 0 ? 'shadow-[0_10px_20px_rgba(73,52,79,0.2)] hover:shadow-[0_15px_30px_rgba(73,52,79,0.3)]' : 'opacity-50 cursor-not-allowed'}`}>
            <Download className="w-5 h-5" /> Save My Memories
          </motion.button>
        </div>
      </section>
    </main>
  );
}
