"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Camera as CameraIcon, RefreshCcw, ArrowRight } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";

// Layout choices
const LAYOUTS = [
  { id: 1, title: "Mini Roll", subtitle: "1 Photo", grid: 1 },
  { id: 2, title: "Classic Roll", subtitle: "2 Photos", grid: 2 },
  { id: 3, title: "Memory Roll", subtitle: "3 Photos", grid: 3 },
  { id: 4, title: "Story Roll", subtitle: "4 Photos", grid: 4 },
  { id: 5, title: "Party Roll", subtitle: "5 Photos", grid: 5 },
];

// Magnetic Button Component specific to the Shutter
function MagneticShutterButton({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden px-12 md:px-16 py-5 bg-[#49344F] text-[#FFF8F2] rounded-full font-serif italic text-xl md:text-2xl tracking-wide shadow-[0_10px_30px_rgba(73,52,79,0.3)] hover:shadow-[0_15px_40px_rgba(73,52,79,0.4)] transition-shadow group w-full md:w-auto"
    >
      <div className="absolute inset-0 border-2 border-white/10 rounded-full scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out" />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}

export default function CaptureStudio() {
  const router = useRouter();
  const { videoRef, startCamera, stopCamera, isStreaming, permissionDenied, error } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedLayoutId, setSelectedLayoutId] = useState(3);
  const selectedLayout = LAYOUTS.find(l => l.id === selectedLayoutId)!;

  // Session State Machine
  // idle -> starting -> counting -> flashing -> reviewing -> (loop back to counting OR complete)
  type SessionState = 'idle' | 'preparing' | 'starting' | 'counting' | 'flashing' | 'reviewing' | 'completed';
  const [sessionState, setSessionState] = useState<SessionState>('idle');

  const [countdown, setCountdown] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  // Mouse Parallax for the camera
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-800, 800], [8, -8]);
  const rotateY = useTransform(x, [-800, 800], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleStartSession = () => {
    setSessionState('preparing');
    setPhotos([]);

    // Wait a short delay to show the beautiful preparation screen before the browser blocks the thread with the permission prompt
    setTimeout(async () => {
      const success = await startCamera();

      if (success) {
        setSessionState('counting');
        setCountdown(3);
      } else {
        setSessionState('idle');
      }
    }, 1200);
  };

  const handleRetake = () => {
    setPhotos([]);
    setSessionState('counting');
    setCountdown(3);
  };

  const cancelSession = () => {
    stopCamera();
    setPhotos([]);
    setSessionState('idle');
    setCountdown(null);
  };

  const takePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/jpeg", 0.9);
      setPhotos(prev => [...prev, imageUrl]);
    }

    try {
      const audio = new Audio("/shutter.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => { });
    } catch (e) { }

  }, [videoRef]);

  // Session Loop Logic
  useEffect(() => {
    if (sessionState === 'counting' && countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Trigger Flash
        setSessionState('flashing');
        takePhoto();

        // After physical flash finishes
        setTimeout(() => {
          setSessionState('reviewing');
        }, 150);
      }
    }

    if (sessionState === 'reviewing') {
      // Show the captured frame for a bit, then proceed
      const timer = setTimeout(() => {
        if (photos.length < selectedLayout.grid) {
          // Take next photo
          setSessionState('counting');
          setCountdown(3);
        } else {
          // Finished!
          setSessionState('completed');
          stopCamera();
        }
      }, 2000); // Wait 2 seconds to view photo

      return () => clearTimeout(timer);
    }

  }, [sessionState, countdown, photos.length, selectedLayout.grid, takePhoto, stopCamera]);


  const currentPhotoIndex = sessionState === 'completed' ? photos.length : photos.length + 1;
  const showReviewFrame = sessionState === 'reviewing' || sessionState === 'completed';
  const latestPhoto = photos[photos.length - 1];

  return (
    <main
      className="relative w-full min-h-screen bg-[#FFF8F2] flex flex-col overflow-x-hidden selection:bg-[#FF9EBB]/30"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hidden canvas for capturing frames */}
      <canvas ref={canvasRef} className="hidden" />

      {/* HEADER */}
      <header className="relative w-full flex justify-between items-center px-8 md:px-12 py-8 z-30">
        <Link
          href="/"
          onClick={cancelSession}
          className="font-serif italic text-xl text-[#49344F] opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2"
        >
          <span>&larr;</span> {sessionState === 'idle' ? 'Back' : 'Cancel'}
        </Link>
        <div className="flex flex-col items-end">
          <h1 className="font-serif text-2xl md:text-3xl text-[#49344F] tracking-tight">Capture Studio</h1>
          <span className="font-sans text-xs tracking-widest uppercase text-[#49344F]/50 mt-1">
            {sessionState !== 'idle' ? `Photo ${Math.min(currentPhotoIndex, selectedLayout.grid)} of ${selectedLayout.grid}` : "Every memory starts with a click."}
          </span>
        </div>
      </header>

      {/* TWO COLUMN LAYOUT */}
      <div className="flex-1 w-full flex flex-col lg:flex-row pb-6">

        {/* LEFT COLUMN: HERO CAMERA */}
        <section className="relative w-full lg:w-[50%] min-h-[40vh] lg:min-h-[80vh] flex items-center justify-center z-10 px-4 md:px-8">
          <motion.div
            className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-[4/3] flex items-center justify-center"
            style={{ rotateX, rotateY, perspective: 1200 }}
            animate={{
              y: [0, -8, 0],
              x: sessionState === 'flashing' ? [0, -3, 3, -2, 2, 0] : 0 // Mechanical shutter shake
            }}
            transition={{
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              x: { duration: 0.15 } // Fast shake
            }}
          >
            {/* Soft Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,158,187,0.6)_0%,_transparent_70%)] opacity-50 rounded-full scale-[1.5] pointer-events-none" />

            {/* Realistic Shadow */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-[radial-gradient(ellipse,_rgba(0,0,0,0.3)_0%,_transparent_70%)] rounded-[100%]" />

            {/* Sparkles (Hide when capturing) */}
            <AnimatePresence>
              {sessionState === 'idle' && (
                <>
                  <motion.div
                    className="absolute top-1/4 -left-8 text-[#FF9EBB] opacity-60"
                    initial={{ opacity: 0 }} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }} exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}
                  >
                    <Sparkles className="w-8 h-8" strokeWidth={1} />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-1/3 -right-4 text-[#FF9EBB] opacity-60"
                    initial={{ opacity: 0 }} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4], rotate: [0, 10, 0] }} exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                  >
                    <Sparkles className="w-10 h-10" strokeWidth={1} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Camera PNG */}
            <img
              src="/camera.png"
              alt="Vintage Photo Booth Camera"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.2)]"
            />

            {/* PHYSICAL FLASH MODULE (Positioned upper-left of camera body) */}
            <AnimatePresence>
              {sessionState === 'flashing' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 2 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                  className="absolute z-30 pointer-events-none"
                  style={{ top: "15%", left: "20%" }}
                >
                  <div className="w-4 h-2 bg-white rounded-sm shadow-[0_0_80px_40px_rgba(255,255,255,1)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,1)_0%,_transparent_70%)] scale-[6]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* LCD SCREEN */}
            <div
              className="absolute z-20 flex items-center justify-center overflow-hidden rounded-[2px] bg-[#111]"
              style={{
                top: "27%",
                left: "10.26%",
                width: "54.5%",
                height: "54.70%",
                boxShadow: "inset 0 10px 400px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.3)"
              }}
            >
              {/* LIVE WEBCAM FEED */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] transition-opacity duration-300 ${(isStreaming || sessionState === 'counting') ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />

              {/* FROZEN CAPTURED IMAGE */}
              <AnimatePresence>
                {showReviewFrame && latestPhoto && (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={latestPhoto}
                    alt="Captured"
                    className="absolute inset-0 w-full h-full object-cover scale-x-[-1] z-10"
                  />
                )}
              </AnimatePresence>

              {/* SCREEN FLASH OVERLAY */}
              <AnimatePresence>
                {sessionState === 'flashing' && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-white z-20"
                  />
                )}
              </AnimatePresence>

              {/* LENS REFLECTION SWEEP */}
              <AnimatePresence>
                {showReviewFrame && latestPhoto && (
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: 0.3 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 z-20 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* PERMANENT Y2K GLOSSY SCREEN REFLECTION */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent z-30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-white/5 -rotate-45 translate-x-[50%] -translate-y-[50%] z-30 pointer-events-none" />

              {/* IDLE STATE */}
              {(sessionState === 'idle' || sessionState === 'preparing') && !isStreaming && (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-[#FFF8F2]/5 p-2 text-center border border-white/10 rounded-sm">
                  <span className="font-serif italic text-white/80 text-xs md:text-lg drop-shadow-sm leading-tight">
                    Your memories<br />begin here.
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* RIGHT COLUMN: SELECTION PANEL OR COMPLETE */}
        <section className="relative w-full lg:w-[50%] flex flex-col justify-center px-4 md:px-12 z-20 mt-8 lg:mt-0">

          <AnimatePresence mode="wait">
            {sessionState === 'completed' ? (

              // COMPLETED STATE
              <motion.div
                key="completed"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="max-w-lg mx-auto w-full flex flex-col items-center lg:items-start gap-6"
              >
                <div className="text-center lg:text-left">
                  <h2 className="font-serif italic text-3xl md:text-4xl text-[#49344F] tracking-tight mb-2">Beautifully Captured!</h2>
                  <p className="font-sans text-[#49344F]/70 text-sm md:text-base">You've successfully captured {photos.length} photos.</p>
                </div>

                <div className="flex gap-4 w-full">
                  <button onClick={handleRetake} className="flex-1 flex items-center justify-center gap-2 py-4 border border-[#49344F]/20 text-[#49344F] hover:bg-[#49344F]/5 rounded-xl font-sans text-xs tracking-widest uppercase transition-colors">
                    <RefreshCcw className="w-4 h-4" />
                    Retake All
                  </button>
                  <button 
                    onClick={() => {
                      sessionStorage.setItem("lumistrip_photos", JSON.stringify(photos));
                      sessionStorage.setItem("lumistrip_layout", selectedLayoutId.toString());
                      router.push("/edit");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FF9EBB] text-white hover:bg-[#ff8dae] shadow-[0_10px_20px_rgba(255,158,187,0.3)] rounded-xl font-sans text-xs font-semibold tracking-widest uppercase transition-all"
                  >
                    Proceed
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

            ) : (

              // IDLE / ACTIVE STATE
              <motion.div
                key="idle"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className={`max-w-lg mx-auto w-full flex flex-col gap-4 md:gap-6 transition-opacity duration-300 ${sessionState !== 'idle' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
              >
                {/* Headers */}
                <div className="text-center lg:text-left">
                  <h2 className="font-serif italic text-3xl md:text-4xl text-[#49344F] tracking-tight mb-2">Choose Your Roll</h2>
                  <p className="font-sans text-[#49344F]/70 text-sm md:text-base">Pick how many memories you'd like to capture today.</p>
                </div>

                {/* Film Roll Grid */}
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-2">
                  {LAYOUTS.map((layout) => {
                    const isSelected = selectedLayoutId === layout.id;

                    return (
                      <button
                        key={layout.id}
                        onClick={() => setSelectedLayoutId(layout.id)}
                        className="group relative flex flex-col items-center gap-4 outline-none"
                      >
                        {/* Film Strip Preview Card */}
                        <motion.div
                          className={`relative w-full aspect-[2/3] rounded-lg border-2 flex flex-col items-center py-4 px-2 gap-2 overflow-hidden transition-colors duration-300 ${isSelected
                            ? "bg-white border-[#FF9EBB] shadow-[0_10px_30px_rgba(255,158,187,0.25)]"
                            : "bg-[#FFF8F2] border-[#49344F]/10 shadow-sm group-hover:shadow-md group-hover:border-[#49344F]/20"
                            }`}
                          whileHover={{ y: -5 }}
                          animate={{ scale: isSelected ? 1.02 : 1, y: isSelected ? -5 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <div className="absolute top-0 left-1 bottom-0 w-1.5 bg-[repeating-linear-gradient(180deg,transparent,transparent_6px,rgba(73,52,79,0.1)_6px,rgba(73,52,79,0.1)_10px)]" />
                          <div className="absolute top-0 right-1 bottom-0 w-1.5 bg-[repeating-linear-gradient(180deg,transparent,transparent_6px,rgba(73,52,79,0.1)_6px,rgba(73,52,79,0.1)_10px)]" />

                          <div className="relative w-[75%] h-full flex flex-col justify-center gap-1.5 z-10">
                            {Array.from({ length: layout.grid }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-full rounded-[2px] transition-all duration-300 border border-black/5 ${isSelected ? "bg-[#FF9EBB]/20" : "bg-black/5"}`}
                                style={{ flex: 1 }}
                              />
                            ))}
                          </div>
                        </motion.div>

                        <div className="flex flex-col items-center gap-0.5">
                          <span className={`font-serif italic text-sm md:text-base transition-colors duration-300 ${isSelected ? "text-[#FF9EBB]" : "text-[#49344F]"}`}>
                            {layout.title}
                          </span>
                          <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-widest text-[#49344F]/50">
                            {layout.subtitle}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Primary Button */}
                <div className="mt-4 flex justify-center lg:justify-start w-full">
                  <MagneticShutterButton onClick={handleStartSession}>
                    {sessionState === 'starting' ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      "Start Capture"
                    )}
                  </MagneticShutterButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </section>

      </div>

      {/* COUNTDOWN OVERLAY */}
      <AnimatePresence>
        {sessionState === 'counting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF8F2]/95 backdrop-blur-md"
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {countdown !== null && countdown > 0 && (
                  <motion.h1
                    key={countdown}
                    initial={{ scale: 0.5, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="font-serif italic text-[25vw] leading-none text-[#FF9EBB] drop-shadow-sm"
                  >
                    {countdown}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREPARATION OVERLAY */}
      <AnimatePresence>
        {sessionState === 'preparing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFF8F2] p-6 text-center"
          >
            {/* Soft background glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.5, 0.3] }} 
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-[80vw] max-w-[600px] aspect-square bg-[radial-gradient(circle,_rgba(255,158,187,0.8)_0%,_transparent_70%)] rounded-full opacity-30"
                />
              </div>

            <div className="relative z-10 flex flex-col items-center gap-8 max-w-md">
              {/* Lens Animation */}
              <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-full border border-[#49344F]/10 bg-white shadow-xl flex items-center justify-center"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-[2px] border-dashed border-[#49344F]/20"
                  />
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute w-8 h-8 bg-[#49344F] rounded-full flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-white/20 rounded-full absolute top-1.5 left-1.5" />
                  </motion.div>
                </motion.div>
                
                {/* Floating sparkles */}
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="absolute -top-4 -right-4 text-[#FF9EBB]"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-2 -left-4 text-[#FF9EBB]"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-serif italic text-3xl md:text-4xl text-[#49344F] tracking-tight"
                >
                  Getting your camera ready...
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-sans text-[#49344F]/70 text-sm md:text-base leading-relaxed"
                >
                  We'll only use your camera while you're taking photos.<br/>
                  Nothing is uploaded or stored.
                </motion.p>
              </div>

              {/* Soft loading bar */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-48 h-1 bg-[#49344F]/10 rounded-full overflow-hidden mt-4"
              >
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-[#FF9EBB] rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERMISSION DENIED OVERLAY */}
      <AnimatePresence>
        {sessionState === 'idle' && permissionDenied && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFF8F2] p-6 text-center"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <motion.div 
                className="w-[80vw] max-w-[600px] aspect-square bg-[radial-gradient(circle,_rgba(73,52,79,1)_0%,_transparent_70%)] rounded-full opacity-10"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 max-w-md">
              {/* Friendly Illustration */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#FF9EBB]/10 rounded-full animate-pulse" />
                <motion.div 
                  animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative text-[#49344F]/40"
                >
                  <CameraIcon strokeWidth={1} className="w-16 h-16" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FFF8F2] rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-lg">🔒</span>
                  </div>
                </motion.div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-3">
                <h2 className="font-serif italic text-3xl md:text-4xl text-[#49344F] tracking-tight whitespace-pre-line">
                  {error?.includes("localhost") 
                    ? "Insecure Connection\nDetected" 
                    : "Camera access is required\nto capture your memories."}
                </h2>
                <p className="font-sans text-[#49344F]/70 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                  {error?.includes("localhost")
                    ? "Browsers block cameras on network IPs like the one in your URL bar. Switch to localhost to safely enable the camera."
                    : "Please allow camera access in your browser settings to continue."}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 w-full mt-4">
                <Link href="/" className="flex-1 flex items-center justify-center py-4 border border-[#49344F]/20 text-[#49344F] hover:bg-[#49344F]/5 rounded-xl font-sans text-xs tracking-widest uppercase transition-colors">
                  Return
                </Link>
                {error?.includes("localhost") ? (
                  <button 
                    onClick={() => { window.location.href = "http://localhost:3000/capture"; }}
                    className="flex-1 py-4 bg-[#FF9EBB] text-white hover:bg-[#ff8dae] shadow-[0_10px_20px_rgba(255,158,187,0.3)] rounded-xl font-sans text-xs font-semibold tracking-widest uppercase transition-all"
                  >
                    Use Localhost
                  </button>
                ) : (
                  <button 
                    onClick={handleStartSession}
                    className="flex-1 py-4 bg-[#FF9EBB] text-white hover:bg-[#ff8dae] shadow-[0_10px_20px_rgba(255,158,187,0.3)] rounded-xl font-sans text-xs font-semibold tracking-widest uppercase transition-all"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
