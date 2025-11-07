"use client";

import * as React from "react";
import { Palette, RefreshCw } from "lucide-react";

const COLORS = [
  { name: "Graphite", hex: "#2C2C2C" },
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Orange", hex: "#F97316" },
  { name: "Titanium", hex: "#6B7280" },
];

export function MiniCourtBuilder({ className = "" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [baseColor, setBaseColor] = React.useState("#2C2C2C"); // Graphite
  const [laneColor, setLaneColor] = React.useState("#2563EB"); // Royal Blue
  const [hovering, setHovering] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const drawCourt = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 420;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, size, size);

    const tileSize = 20;
    const courtWidth = 16 * tileSize; // 16 tiles
    const courtHeight = 11 * tileSize; // 11 tiles
    const offsetX = (size - courtWidth) / 2;
    const offsetY = (size - courtHeight) / 2;

    // Draw base tiles with subtle hover effect
    for (let y = 0; y < courtHeight / tileSize; y++) {
      for (let x = 0; x < courtWidth / tileSize; x++) {
        const tileX = offsetX + x * tileSize;
        const tileY = offsetY + y * tileSize;
        
        const color = baseColor;
        
        // Hover glow
        if (hovering) {
          const dist = Math.sqrt(
            Math.pow(tileX + tileSize / 2 - mousePos.x, 2) +
            Math.pow(tileY + tileSize / 2 - mousePos.y, 2)
          );
          if (dist < 60) {
            const intensity = 1 - dist / 60;
            ctx.shadowBlur = 10 * intensity;
            ctx.shadowColor = "#00d4ff";
          } else {
            ctx.shadowBlur = 0;
          }
        }
        
        ctx.fillStyle = color;
        ctx.fillRect(tileX, tileY, tileSize - 1, tileSize - 1);
        ctx.shadowBlur = 0;
      }
    }

    // Draw basketball court markings
    // Left lane (4 tiles wide, centered vertically)
      ctx.fillStyle = laneColor;
      for (let y = 4; y <= 7; y++) {
        for (let x = 0; x < 4; x++) {
          ctx.fillRect(offsetX + x * tileSize, offsetY + y * tileSize, tileSize - 1, tileSize - 1);
        }
      }
      
      // Right lane
      for (let y = 4; y <= 7; y++) {
        for (let x = 12; x < 16; x++) {
          ctx.fillRect(offsetX + x * tileSize, offsetY + y * tileSize, tileSize - 1, tileSize - 1);
        }
      }

      // Court lines
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      
      // Center line
      ctx.beginPath();
      ctx.moveTo(offsetX + courtWidth / 2, offsetY);
      ctx.lineTo(offsetX + courtWidth / 2, offsetY + courtHeight);
      ctx.stroke();
      
      // Center circle
      ctx.beginPath();
      ctx.arc(offsetX + courtWidth / 2, offsetY + courtHeight / 2, 25, 0, Math.PI * 2);
      ctx.stroke();
      
      // Lane outlines
      ctx.strokeRect(offsetX, offsetY + 4 * tileSize, 4 * tileSize, 4 * tileSize);
      ctx.strokeRect(offsetX + 12 * tileSize, offsetY + 4 * tileSize, 4 * tileSize, 4 * tileSize);
      
      // Free throw lines
      ctx.beginPath();
      ctx.moveTo(offsetX + 3 * tileSize, offsetY + 4 * tileSize);
      ctx.lineTo(offsetX + 3 * tileSize, offsetY + 8 * tileSize);
      ctx.moveTo(offsetX + 13 * tileSize, offsetY + 4 * tileSize);
      ctx.lineTo(offsetX + 13 * tileSize, offsetY + 8 * tileSize);
      ctx.stroke();

    // Grid lines on top
    ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
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

    // Border with hover glow
    ctx.strokeStyle = hovering ? "#00d4ff" : "#06b6d4";
    ctx.lineWidth = 3;
    if (hovering) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00d4ff";
    }
    ctx.strokeRect(offsetX, offsetY, courtWidth, courtHeight);
    ctx.shadowBlur = 0;

  }, [baseColor, laneColor, hovering, mousePos]);

  React.useEffect(() => {
    const animationId = requestAnimationFrame(drawCourt);
    return () => cancelAnimationFrame(animationId);
  }, [drawCourt]);

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
    <div className={className}>
      <div className="relative">
        <div className="relative rounded-xl overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-auto"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
            style={{ maxWidth: "100%", display: "block" }}
          />
        </div>

        {/* Color Controls */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-white/60" />
            <span className="text-xs text-white/60">Base:</span>
            <div className="flex gap-1.5">
              {COLORS.slice(0, 3).map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setBaseColor(color.hex)}
                  className={`w-7 h-7 rounded-md border-2 transition-all hover:scale-110 ${
                    baseColor === color.hex
                      ? "border-white shadow-neon-blue"
                      : "border-white/20"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">Accent:</span>
            <div className="flex gap-1.5">
              {COLORS.slice(1, 5).map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setLaneColor(color.hex)}
                  className={`w-7 h-7 rounded-md border-2 transition-all hover:scale-110 ${
                    laneColor === color.hex
                      ? "border-white shadow-neon-blue"
                      : "border-white/20"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setBaseColor("#2C2C2C");
              setLaneColor("#2563EB");
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            title="Reset Colors"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Info Text */}
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-white mb-1">
            Basketball Court Preview
          </p>
          <p className="text-xs text-muted-foreground">
            Full court with painted lanes and center circle
          </p>
          <p className="text-xs text-[var(--brand-primary)] mt-2">
            Hover to see glow effect • Click colors to customize
          </p>
        </div>
      </div>
    </div>
  );
}
