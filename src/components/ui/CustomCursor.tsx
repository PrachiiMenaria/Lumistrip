"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { Camera } from "lucide-react";

export function CustomCursor() {
  const [isActive, setIsActive] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 200, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over an interactive element
      if (target.closest('button, a, [role="button"], input, .interactive-hover')) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window === "undefined") return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] text-[#B77466] drop-shadow-md"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
        rotate: isActive ? -10 : 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-[#B77466]/20">
        <Camera size={20} strokeWidth={2} />
      </div>
    </motion.div>
  );
}
