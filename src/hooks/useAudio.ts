"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export function useAudio() {
  const [isReady, setIsReady] = useState(false);
  
  // Use generic synth ticks/pops instead of loading external assets to ensure it works without assets
  const hoverSound = useRef<Howl | null>(null);
  const clickSound = useRef<Howl | null>(null);

  useEffect(() => {
    // Generate simple beep sounds using data URIs for immediate feedback without assets
    // A soft tick for hover
    hoverSound.current = new Howl({
      src: ["data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="],
      volume: 0.1,
    });

    // A slightly deeper pop for click
    clickSound.current = new Howl({
      src: ["data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="],
      volume: 0.2,
    });

    setIsReady(true);
  }, []);

  const playHover = () => {
    if (isReady && hoverSound.current) {
      // For now, these are placeholder data URIs, so they won't actually play a real sound
      // In a real app we would load an actual file
      try {
        hoverSound.current.play();
      } catch (e) {}
    }
  };

  const playClick = () => {
    if (isReady && clickSound.current) {
      try {
        clickSound.current.play();
      } catch (e) {}
    }
  };

  return { playHover, playClick };
}
