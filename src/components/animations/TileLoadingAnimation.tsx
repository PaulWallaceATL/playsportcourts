"use client";

import * as React from "react";
import { PlaySportLogo } from "@/components/ui/PlaySportLogo";

export function TileLoadingAnimation() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Hide loading after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500); // 5.5 second animation

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  // Sophisticated minimal grid
  const gridSize = 10; // 10x10 grid (even cleaner, more refined)
  const tiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  // Sophisticated monochromatic palette with subtle accent
  const tileColors = [
    "#1a1a1a", // Deep black (80%)
    "#2C2C2C", // Graphite (15%)
    "#06b6d4", // Cyan accent (5%)
  ];
  
  // Weight the colors for sophistication
  const getColor = () => {
    const rand = Math.random();
    if (rand < 0.8) return tileColors[0]; // 80% deep black
    if (rand < 0.95) return tileColors[1]; // 15% graphite
    return tileColors[2]; // 5% cyan accent
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid" style={{ 
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}>
        {tiles.map((i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const delay = (row + col) * 0.1; // Slower, more deliberate wave
          
          // Sophisticated weighted color selection
          const color = getColor();
          
          return (
            <div
              key={i}
              className="tile-animate"
              style={{
                backgroundColor: color,
                animationDelay: `${delay}s`,
                opacity: 0.8,
              }}
            />
          );
        })}
      </div>

      {/* Center Content - Sophisticated */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center animate-fade-in" style={{ animationDelay: "2s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-40 animate-pulse" />
            <PlaySportLogo size={140} className="text-black relative" />
          </div>
        </div>
        
        {/* Brand Name */}
        <h1 className="text-6xl font-black text-white mb-3 tracking-tight animate-slide-up" style={{ animationDelay: "2.3s" }}>
          PlaySport Courts
        </h1>
        
        {/* Tagline */}
        <div className="text-2xl font-light text-white/80 mb-6 animate-slide-up" style={{ animationDelay: "2.5s" }}>
          Premium Modular Court Tiles
        </div>
        
        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "2.7s" }}>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gradient-primary animate-pulse" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 rounded-full bg-gradient-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-gradient-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes tileSlide {
          0% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.05) rotate(0deg);
            opacity: 0.9;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.9;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .tile-animate {
          animation: tileSlide 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

