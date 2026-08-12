"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart, Sparkles, Paperclip, Film } from "lucide-react";

// Inline SVGs to avoid dependency issues
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// Magnetic Button Component
function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="inline-flex items-center justify-center px-8 py-3 bg-[#FF9EBB] text-white rounded-full font-sans font-medium tracking-wide shadow-[0_4px_14px_rgba(255,158,187,0.4)] hover:shadow-[0_6px_20px_rgba(255,158,187,0.6)] transition-shadow duration-300 z-10"
    >
      {children}
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-[#FFF8F2] flex flex-col justify-between overflow-hidden py-16 px-6 md:px-24">
      {/* --- DECORATIONS --- */}
      {/* Paperclip top left */}
      <div className="absolute top-12 left-12 md:left-24 rotate-[-15deg] opacity-60 pointer-events-none">
        <Paperclip strokeWidth={1} className="w-10 h-10 text-[#a0a0a0]" />
      </div>

      {/* Tiny stars right */}
      <div className="absolute top-24 right-16 md:right-32 rotate-[10deg] opacity-40 pointer-events-none">
        <Sparkles strokeWidth={1.5} className="w-6 h-6 text-[#FF9EBB]" />
      </div>

      {/* Film strip bottom right */}
      <div className="absolute bottom-16 right-12 md:right-24 rotate-[25deg] opacity-20 pointer-events-none">
        <Film strokeWidth={1} className="w-12 h-12 text-[#49344F]" />
      </div>
      
      {/* Subtle ribbon edge simulation top */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#49344F10_10px,#49344F10_20px)]" />
      {/* ------------------- */}

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-10 pt-8"
      >
        <h2 className="font-serif italic text-3xl md:text-5xl text-[#49344F] tracking-tight mb-6">
          Every great memory starts with a click.
        </h2>
        
        <p className="font-sans text-base md:text-lg text-[#49344F]/70 mb-8">
          Let's create something beautiful together.
        </p>

        <MagneticButton href="mailto:menariaprachi0@gmail.com">
          Contact Me
        </MagneticButton>
      </motion.div>

      {/* Bottom Layout */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full flex flex-col md:flex-row justify-between items-end mt-24 z-10 gap-12 md:gap-0"
      >
        
        {/* Social Links */}
        <div className="flex flex-col gap-3">
          <SocialLink href="https://github.com/PrachiiMenaria" icon={<GithubIcon className="w-4 h-4" />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/prachi-menaria-074259345" icon={<LinkedinIcon className="w-4 h-4" />} label="LinkedIn" />
          <SocialLink href="mailto:menariaprachi0@gmail.com" icon={<Mail className="w-4 h-4" />} label="Email" />
        </div>

        {/* Center Logo */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-16 flex flex-col items-center">
          <h1 className="font-serif text-2xl tracking-tight text-[#49344F]">
            LumiStrip
          </h1>
        </div>

        {/* Bottom Line Info */}
        <div className="flex flex-col items-start md:items-end gap-1.5 text-[#49344F]/60 font-sans text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            Made with 
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Heart className="w-3 h-3 fill-[#FF9EBB] text-[#FF9EBB]" />
            </motion.div>
            by Prachi Menaria
          </div>
          <span>&copy; 2026 LumiStrip</span>
        </div>

      </motion.div>
    </footer>
  );
}

// Reusable Social Link Component
function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <motion.a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex items-center gap-3 p-1 text-[#49344F] opacity-80 hover:opacity-100"
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {icon}
      <span className="font-serif italic text-lg tracking-wide">{label}</span>
      {/* Elegant smooth underline */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#49344F] group-hover:w-full transition-all duration-300 ease-out" />
    </motion.a>
  );
}
