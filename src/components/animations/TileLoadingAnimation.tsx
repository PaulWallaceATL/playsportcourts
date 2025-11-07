"use client";

import * as React from "react";

export function TileLoadingAnimation() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Hide loading after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 second animation (slower)

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  // Create a grid representing 12"×12" tiles
  const gridSize = 16; // 16x16 grid (cleaner, represents court layout)
  const tiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  // Actual colors we offer
  const tileColors = [
    "#000000", // Black
    "#2C2C2C", // Graphite
    "#6B7280", // Titanium
    "#1E3A8A", // Navy Blue
    "#2563EB", // Royal Blue
    "#60A5FA", // Light Blue
    "#10B981", // Emerald Green
    "#84CC16", // Olive Green
    "#EF4444", // Bright Red
    "#F97316", // Orange
    "#FDE047", // Yellow
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid" style={{ 
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}>
        {tiles.map((i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const delay = (row + col) * 0.04; // Slower diagonal wave (was 0.02)
          
          // Use actual tile colors we offer
          const color = tileColors[Math.floor(Math.random() * tileColors.length)];
          
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

      {/* Center Logo */}
      <div className="relative z-10 text-center animate-fade-in" style={{ animationDelay: "1.5s" }}>
        <div className="mb-4">
          <div className="inline-block w-28 h-28 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-neon-blue animate-pulse">
            <span className="text-5xl font-black text-black">PS</span>
          </div>
        </div>
        <h1 className="text-5xl font-black text-white mb-2 animate-slide-up" style={{ animationDelay: "1.8s" }}>
          PlaySport Courts
        </h1>
        <div className="text-xl font-bold text-gradient-hero mb-3 animate-slide-up" style={{ animationDelay: "2s" }}>
          12&quot; × 12&quot; Premium Court Tiles
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "2.2s" }}>
          <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)] animate-pulse" />
          <span>Assembling your court</span>
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
          animation: tileSlide 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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

