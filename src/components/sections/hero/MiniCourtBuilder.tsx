"use client";

import * as React from "react";
import Link from "next/link";

export function MiniCourtBuilder({ className = "" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [hovering, setHovering] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 420;
    canvas.width = size;
    canvas.height = size;

    let animationId: number;
    let hoverIntensity = 0;

    const animate = () => {
      // Smooth hover transition
      hoverIntensity += (hovering ? 1 : -1) * 0.05;
      hoverIntensity = Math.max(0, Math.min(1, hoverIntensity));

      // Clear
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, size, size);

      // Court dimensions
      const tileSize = 20;
      const courtWidth = 16 * tileSize; // 16 tiles wide
      const courtHeight = 10 * tileSize; // 10 tiles tall
      const offsetX = (size - courtWidth) / 2;
      const offsetY = (size - courtHeight) / 2;

      // Define colors (premium palette)
      const baseColor = "#2C2C2C"; // Graphite
      const laneColor = "#2563EB"; // Royal Blue
      const lineColor = "#FFFFFF"; // White

      // Draw tiles
      for (let y = 0; y < courtHeight / tileSize; y++) {
        for (let x = 0; x < courtWidth / tileSize; x++) {
          const tileX = offsetX + x * tileSize;
          const tileY = offsetY + y * tileSize;
          
          // Determine if this is a lane tile (simple basketball key)
          const isLane = x < 4 && y >= 3 && y <= 6; // Left lane
          
          // Base color with hover effect
          let color = isLane ? laneColor : baseColor;
          
          // Hover glow effect
          if (hovering) {
            const dist = Math.sqrt(
              Math.pow(tileX - mousePos.x, 2) + Math.pow(tileY - mousePos.y, 2)
            );
            const glow = Math.max(0, 1 - dist / 150) * hoverIntensity;
            if (glow > 0) {
              color = isLane 
                ? `rgba(37, 99, 235, ${0.8 + glow * 0.2})`
                : `rgba(44, 44, 44, ${1 + glow * 0.3})`;
            }
          }
          
          ctx.fillStyle = color;
          ctx.fillRect(tileX, tileY, tileSize - 1, tileSize - 1);
        }
      }

      // Draw grid lines
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= courtWidth / tileSize; x++) {
        ctx.beginPath();
        ctx.moveTo(offsetX + x * tileSize, offsetY);
        ctx.lineTo(offsetX + x * tileSize, offsetY + courtHeight);
        ctx.stroke();
      }
      for (let y = 0; y <= courtHeight / tileSize; y++) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + y * tileSize);
        ctx.lineTo(offsetX + courtWidth, offsetY + y * tileSize);
        ctx.stroke();
      }

      // Basketball court lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      
      // Lane outline
      ctx.strokeRect(offsetX, offsetY + 3 * tileSize, 4 * tileSize, 4 * tileSize);
      
      // Free throw line
      ctx.beginPath();
      ctx.moveTo(offsetX + 3 * tileSize, offsetY + 3 * tileSize);
      ctx.lineTo(offsetX + 3 * tileSize, offsetY + 7 * tileSize);
      ctx.stroke();
      
      // Center circle
      ctx.beginPath();
      ctx.arc(offsetX + courtWidth / 2, offsetY + courtHeight / 2, tileSize * 1.5, 0, Math.PI * 2);
      ctx.stroke();
      
      // Center line
      ctx.beginPath();
      ctx.moveTo(offsetX + courtWidth / 2, offsetY);
      ctx.lineTo(offsetX + courtWidth / 2, offsetY + courtHeight);
      ctx.stroke();

      // Border
      ctx.strokeStyle = hovering ? "#00d4ff" : "#06b6d4";
      ctx.lineWidth = 3;
      ctx.strokeRect(offsetX, offsetY, courtWidth, courtHeight);

      // Glow effect when hovering
      if (hoverIntensity > 0) {
        ctx.shadowBlur = 20 * hoverIntensity;
        ctx.shadowColor = "#00d4ff";
        ctx.strokeRect(offsetX, offsetY, courtWidth, courtHeight);
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [hovering, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    });
  };

  return (
    <Link href="/dealer-portal" className={className}>
      <div className="relative group cursor-pointer">
        <canvas
          ref={canvasRef}
          className="w-full h-auto rounded-xl shadow-2xl transition-transform group-hover:scale-[1.02]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMouseMove}
          style={{ maxWidth: "100%" }}
        />
        <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full bg-gradient-primary text-black text-sm font-bold shadow-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
          Click to Build →
        </div>
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-xs text-white">
          <div className="font-semibold mb-1">16 × 10 ft Court</div>
          <div className="text-[var(--brand-primary)]">160 tiles (12&quot; × 12&quot;)</div>
        </div>
      </div>
    </Link>
  );
}
