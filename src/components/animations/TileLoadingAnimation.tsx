"use client";

import * as React from "react";

export function TileLoadingAnimation() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Hide loading after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 second animation

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  // Create a grid of tiles
  const gridSize = 20; // 20x20 grid
  const tiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid" style={{ 
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}>
        {tiles.map((i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const delay = (row + col) * 0.02; // Diagonal wave effect
          
          // Random colors for tiles
          const colors = [
            "#2563EB", // Royal Blue
            "#10B981", // Emerald Green  
            "#F97316", // Orange
            "#EF4444", // Red
            "#6B7280", // Gray
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
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
      <div className="relative z-10 text-center animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className="mb-4">
          <div className="inline-block w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-neon-blue animate-pulse">
            <span className="text-4xl font-black text-black">PS</span>
          </div>
        </div>
        <h1 className="text-4xl font-black text-white mb-2 animate-slide-up" style={{ animationDelay: "1.2s" }}>
          PlaySport Courts
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "1.4s" }}>
          <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)] animate-pulse" />
          <span>Building your experience</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes tileSlide {
          0% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
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
          animation: tileSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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

