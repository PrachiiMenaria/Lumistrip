"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <div className="relative w-8 h-8 drop-shadow-md">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Button */}
          <rect x="6" y="8" width="4" height="2" fill="#2a2a2a" />
          {/* Main Body */}
          <rect x="4" y="10" width="24" height="16" rx="2" fill="#d0c8b0" />
          {/* Black Top Section */}
          <path d="M4 12 C4 10.8954 4.89543 10 6 10 H26 C27.1046 10 28 10.8954 28 12 V16 H4 V12 Z" fill="#2a2a2a" />
          {/* Flash */}
          <rect x="22" y="12" width="4" height="2" rx="1" fill="#e0e0e0" />
          {/* Lens Base Ring */}
          <circle cx="16" cy="18" r="7" fill="#2a2a2a" />
          {/* Lens Outer */}
          <circle cx="16" cy="18" r="6" fill="#4a5043" />
          {/* Lens Inner Glass */}
          <circle cx="16" cy="18" r="4" fill="#a4b092" />
          {/* Lens Highlight */}
          <circle cx="17.5" cy="16.5" r="1.5" fill="#2a2a2a" />
          {/* Bottom shadow edge */}
          <rect x="4" y="24" width="24" height="2" rx="1" fill="#1a1a1a" opacity="0.3" />
        </svg>
      </div>
    </motion.div>
  );
}
