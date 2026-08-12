"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, Sparkles, Image as ImageIcon, Type, Palette, ChevronLeft, RefreshCw, X, Plus, Minus, UploadCloud } from "lucide-react";

// Types
type DraggableType = {
  id: string;
  type: "sticker" | "text";
  content: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  font?: string;
  color?: string;
};

// Data Constants
const FRAMES = [
  { id: "classic", name: "Classic", padding: "p-4 pb-16", bg: "bg-white", border: "border border-gray-200" },
  { id: "polaroid", name: "Polaroid", padding: "p-6 pb-24", bg: "bg-[#fcfaf8]", border: "border-none shadow-md" },
  { id: "film", name: "Film Strip", padding: "p-4 py-8", bg: "bg-black", border: "border-x-8 border-dashed border-gray-800" },
  { id: "passport", name: "Passport", padding: "p-2", bg: "bg-[#e8f1f5]", border: "border border-[#b0c4de]" },
  { id: "retro", name: "Retro", padding: "p-5 pb-20", bg: "bg-[#ffefd5]", border: "border-2 border-[#d2b48c]" },
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

const FONTS = [
  { id: "font-serif", name: "Editorial", class: "font-serif italic" },
  { id: "font-sans", name: "Modern", class: "font-sans font-bold uppercase tracking-widest" },
  { id: "handwritten", name: "Handwritten", class: "font-serif italic tracking-tight" },
];

function DraggableItemView({ item, onUpdate, onRemove }: { item: DraggableType, onUpdate: (id: string, updates: Partial<DraggableType>) => void, onRemove: (id: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleRotate = () => onUpdate(item.id, { rotation: item.rotation + 15 });
  const handleScaleUp = () => onUpdate(item.id, { scale: item.scale + 0.1 });
  const handleScaleDown = () => onUpdate(item.id, { scale: Math.max(0.2, item.scale - 0.1) });

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute z-40 flex items-center justify-center group"
      style={{ top: '50%', left: '50%', x: item.x, y: item.y, rotate: item.rotation, scale: item.scale, marginTop: '-24px', marginLeft: '-24px' }}
    >
      {/* Floating Toolbar */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center gap-1 px-2 py-1.5 pointer-events-auto border border-[#49344F]/10">
        <button onClick={handleRotate} className="p-1.5 text-[#49344F] hover:bg-[#FF9EBB]/20 rounded-full transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
        <button onClick={handleScaleDown} className="p-1.5 text-[#49344F] hover:bg-[#FF9EBB]/20 rounded-full transition-colors"><Minus className="w-3.5 h-3.5" /></button>
        <button onClick={handleScaleUp} className="p-1.5 text-[#49344F] hover:bg-[#FF9EBB]/20 rounded-full transition-colors"><Plus className="w-3.5 h-3.5" /></button>
        <div className="w-px h-4 bg-[#49344F]/10 mx-1" />
        <button onClick={() => onRemove(item.id)} className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"><X className="w-3.5 h-3.5" /></button>
      </div>

      {item.type === "sticker" ? (
        <img src={item.content} alt="Sticker" className="w-16 h-16 object-contain pointer-events-none drop-shadow-sm cursor-grab active:cursor-grabbing mix-blend-multiply" draggable={false} />
      ) : (
        isEditing ? (
          <input
            autoFocus
            defaultValue={item.content}
            onBlur={(e) => {
              setIsEditing(false);
              onUpdate(item.id, { content: e.target.value });
            }}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
            className={`bg-white/80 outline-none border border-[#FF9EBB] rounded-md px-3 py-1 text-2xl text-center min-w-[150px] shadow-sm ${item.font}`}
            style={{ color: item.color || '#49344F' }}
          />
        ) : (
          <div 
            onDoubleClick={() => setIsEditing(true)}
            className={`cursor-grab active:cursor-grabbing text-center min-w-[100px] drop-shadow-sm whitespace-nowrap px-4 py-2 text-2xl ${item.font}`}
            style={{ color: item.color || '#49344F' }}
          >
            {item.content}
          </div>
        )
      )}
    </motion.div>
  );
}

export default function DecoratePage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [layoutId, setLayoutId] = useState<number>(3);
  const stripRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activePanel, setActivePanel] = useState<string>("stickers");
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [items, setItems] = useState<DraggableType[]>([]);
  const [stickerCategories, setStickerCategories] = useState([{ name: "My Stickers", items: [] as string[] }]);

  useEffect(() => {
    // Dynamically fetch stickers from the folder
    fetch('/api/stickers')
      .then(res => res.json())
      .then(data => {
        if (data.stickers && data.stickers.length > 0) {
          setStickerCategories([{ name: "My Stickers", items: data.stickers }]);
        }
      })
      .catch(err => console.error("Failed to fetch custom stickers", err));
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const addItem = (type: "sticker" | "text", content: string, font?: string) => {
    setItems([...items, {
      id: `item-${Date.now()}`,
      type,
      content,
      x: 0,
      y: 0,
      scale: 1,
      rotation: type === "sticker" ? Math.random() * 20 - 10 : 0,
      font,
      color: '#49344F'
    }]);
  };

  const updateItem = (id: string, updates: Partial<DraggableType>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeItem = (id: string) => setItems(items.filter(i => i.id !== id));

  const downloadImage = async () => {
    if (!stripRef.current) return;
    try {
      const htmlToImage = await import('html-to-image');
      const dataUrl = await htmlToImage.toJpeg(stripRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `lumistrip-decorate-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      alert("Please run 'npm install html-to-image' in your terminal to enable downloading!");
    }
  };

  return (
    <main className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden bg-[#FFF8F2]">
      
      {/* LEFT: CANVAS AREA (70%) */}
      <section className="relative flex-1 h-full flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto z-10 transition-colors duration-500">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full text-[#49344F] font-serif italic shadow-sm hover:bg-white transition-all z-20">
          <ChevronLeft className="w-4 h-4" /> Back Home
        </Link>

        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center max-w-md">
            <div className="w-24 h-24 bg-[#FF9EBB]/20 rounded-full flex items-center justify-center mb-6 text-[#FF9EBB]">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h2 className="font-serif italic text-4xl text-[#49344F] mb-4">Decorate Your Memories</h2>
            <p className="font-sans text-[#49344F]/60 mb-8">Upload photos from your device to start creating beautiful custom polaroids and photo strips.</p>
            <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 bg-[#49344F] text-[#FFF8F2] rounded-full font-serif italic text-xl tracking-wide flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <Plus className="w-5 h-5" /> Select Photos
            </button>
            <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          </div>
        ) : (
          <motion.div 
            ref={stripRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`relative flex flex-col items-center gap-3 md:gap-4 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${selectedFrame.padding} ${selectedFrame.border}`}
            style={{ width: '260px', backgroundColor: selectedBg.color, ...(selectedBg.style || {}) }}
          >
            {photos.slice(0, layoutId).map((photo, i) => (
              <div key={i} className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden shadow-inner">
                <img src={photo} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}

            {/* Draggable Items Overlay */}
            {items.map(item => (
              <DraggableItemView key={item.id} item={item} onUpdate={updateItem} onRemove={removeItem} />
            ))}
            
          </motion.div>
        )}
      </section>

      {/* RIGHT: EDITING TOOLS (30%) */}
      <section className="relative w-full md:w-[400px] h-full bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] flex flex-col z-20">
        <div className="p-8 pb-4 shrink-0 flex justify-between items-start">
          <div>
            <h1 className="font-serif italic text-3xl text-[#49344F] tracking-tight">Decoration Hub</h1>
            <p className="font-sans text-xs uppercase tracking-widest text-[#49344F]/50 mt-2">Stickers & Elements</p>
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

          {/* BACKGROUNDS */}
          <div className="bg-[#FFF8F2] rounded-2xl overflow-hidden border border-[#49344F]/5 transition-all shrink-0">
            <button onClick={() => setActivePanel(activePanel === "backgrounds" ? "" : "backgrounds")} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="w-8 h-8 rounded-full bg-[#FF9EBB]/20 flex items-center justify-center text-[#FF9EBB]"><Palette className="w-4 h-4" /></div>
              <span className="font-serif italic text-xl text-[#49344F]">Background</span>
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

          {/* STICKERS */}
          <div className="bg-[#FFF8F2] rounded-2xl overflow-hidden border border-[#49344F]/5 transition-all shrink-0">
            <button onClick={() => setActivePanel(activePanel === "stickers" ? "" : "stickers")} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="w-8 h-8 rounded-full bg-[#FF9EBB]/20 flex items-center justify-center text-[#FF9EBB]"><Sparkles className="w-4 h-4" /></div>
              <span className="font-serif italic text-xl text-[#49344F]">Stickers</span>
            </button>
            <AnimatePresence>
              {activePanel === "stickers" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 flex flex-col gap-4">
                    {stickerCategories.map(category => (
                      <div key={category.name}>
                        <span className="text-[10px] uppercase tracking-widest text-[#49344F]/50 font-sans mb-2 block">{category.name}</span>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {category.items.map((imgPath, i) => (
                            <button key={i} onClick={() => addItem("sticker", imgPath)} className="hover:scale-110 transition-transform p-1 bg-white rounded-md shadow-sm border border-[#49344F]/10 shrink-0">
                              <img src={imgPath} alt="Sticker" className="w-10 h-10 object-contain" />
                            </button>
                          ))}
                          {category.items.length === 0 && <span className="text-xs text-gray-400">No stickers found</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TEXT */}
          <div className="bg-[#FFF8F2] rounded-2xl overflow-hidden border border-[#49344F]/5 transition-all shrink-0">
            <button onClick={() => setActivePanel(activePanel === "text" ? "" : "text")} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="w-8 h-8 rounded-full bg-[#FF9EBB]/20 flex items-center justify-center text-[#FF9EBB]"><Type className="w-4 h-4" /></div>
              <span className="font-serif italic text-xl text-[#49344F]">Text</span>
            </button>
            <AnimatePresence>
              {activePanel === "text" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 flex flex-col gap-2">
                    {FONTS.map(font => (
                      <button key={font.id} onClick={() => addItem("text", "Double click to edit", font.class)} className={`w-full py-3 px-4 rounded-xl border border-[#49344F]/10 bg-white hover:bg-[#FF9EBB]/10 hover:border-[#FF9EBB]/30 transition-colors text-left text-[#49344F] ${font.class}`}>
                        Add {font.name} Text
                      </button>
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
