"use client";

import * as React from "react";
import { Palette, RotateCcw } from "lucide-react";

type CourtType = "basketball" | "tennis" | "pickleball";

const COLORS = [
  { name: "Graphite", hex: "#2C2C2C" },
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Orange", hex: "#F97316" },
];

export function MiniCourtBuilder({ className = "" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [courtType, setCourtType] = React.useState<CourtType>("basketball");
  const [baseColor, setBaseColor] = React.useState(COLORS[0].hex);
  const [accentColor, setAccentColor] = React.useState(COLORS[1].hex);
  const [dragElement, setDragElement] = React.useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

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
    const courtWidth = 16 * tileSize;
    const courtHeight = 10 * tileSize;
    const offsetX = (size - courtWidth) / 2;
    const offsetY = (size - courtHeight) / 2;

    // Draw base tiles
    for (let y = 0; y < courtHeight / tileSize; y++) {
      for (let x = 0; x < courtWidth / tileSize; x++) {
        ctx.fillStyle = baseColor;
        ctx.fillRect(
          offsetX + x * tileSize,
          offsetY + y * tileSize,
          tileSize - 1,
          tileSize - 1
        );
      }
    }

    // Draw court-specific markings
    if (courtType === "basketball") {
      // Lane tiles
      ctx.fillStyle = accentColor;
      for (let y = 3; y <= 6; y++) {
        for (let x = 0; x < 4; x++) {
          ctx.fillRect(
            offsetX + x * tileSize,
            offsetY + y * tileSize,
            tileSize - 1,
            tileSize - 1
          );
        }
      }

      // Lines
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;

      // Lane outline
      ctx.strokeRect(offsetX, offsetY + 3 * tileSize, 4 * tileSize, 4 * tileSize);

      // Center line
      ctx.beginPath();
      ctx.moveTo(offsetX + courtWidth / 2, offsetY);
      ctx.lineTo(offsetX + courtWidth / 2, offsetY + courtHeight);
      ctx.stroke();

      // Center circle
      ctx.beginPath();
      ctx.arc(offsetX + courtWidth / 2, offsetY + courtHeight / 2, tileSize * 1.5, 0, Math.PI * 2);
      ctx.stroke();
    } else if (courtType === "tennis") {
      // Service boxes
      ctx.fillStyle = accentColor;
      for (let y = 2; y <= 7; y++) {
        for (let x = 0; x < 3; x++) {
          ctx.fillRect(offsetX + x * tileSize, offsetY + y * tileSize, tileSize - 1, tileSize - 1);
        }
      }

      // Lines
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;

      // Net
      ctx.beginPath();
      ctx.moveTo(offsetX + courtWidth / 2, offsetY);
      ctx.lineTo(offsetX + courtWidth / 2, offsetY + courtHeight);
      ctx.stroke();

      // Service lines
      ctx.strokeRect(offsetX, offsetY + 2 * tileSize, 3 * tileSize, 6 * tileSize);
    } else if (courtType === "pickleball") {
      // Kitchen zones
      ctx.fillStyle = accentColor;
      for (let y = 0; y < courtHeight / tileSize; y++) {
        for (let x = 0; x < 2; x++) {
          ctx.fillRect(offsetX + x * tileSize, offsetY + y * tileSize, tileSize - 1, tileSize - 1);
          ctx.fillRect(offsetX + (courtWidth / tileSize - 2 + x) * tileSize, offsetY + y * tileSize, tileSize - 1, tileSize - 1);
        }
      }

      // Lines
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;

      // Center
      ctx.beginPath();
      ctx.moveTo(offsetX + courtWidth / 2, offsetY);
      ctx.lineTo(offsetX + courtWidth / 2, offsetY + courtHeight);
      ctx.stroke();

      // Kitchen lines
      ctx.beginPath();
      ctx.moveTo(offsetX + 2 * tileSize, offsetY);
      ctx.lineTo(offsetX + 2 * tileSize, offsetY + courtHeight);
      ctx.moveTo(offsetX + courtWidth - 2 * tileSize, offsetY);
      ctx.lineTo(offsetX + courtWidth - 2 * tileSize, offsetY + courtHeight);
      ctx.stroke();
    }

    // Draggable element (4 square)
    if (dragElement) {
      ctx.fillStyle = "#F97316"; // Orange
      const elementSize = 4 * tileSize;
      ctx.fillRect(dragElement.x, dragElement.y, elementSize, elementSize);

      // Grid lines on element
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dragElement.x + elementSize / 2, dragElement.y);
      ctx.lineTo(dragElement.x + elementSize / 2, dragElement.y + elementSize);
      ctx.moveTo(dragElement.x, dragElement.y + elementSize / 2);
      ctx.lineTo(dragElement.x + elementSize, dragElement.y + elementSize / 2);
      ctx.stroke();

      // Selection border
      ctx.strokeStyle = "#00d4ff";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(dragElement.x, dragElement.y, elementSize, elementSize);
      ctx.setLineDash([]);
    }

    // Grid lines
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

    // Border
    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 3;
    ctx.strokeRect(offsetX, offsetY, courtWidth, courtHeight);
  }, [courtType, baseColor, accentColor, dragElement]);

  React.useEffect(() => {
    drawCourt();
  }, [drawCourt]);

  // Initialize draggable element
  React.useEffect(() => {
    const size = 420;
    const tileSize = 20;
    const courtWidth = 16 * tileSize;
    const courtHeight = 10 * tileSize;
    const offsetX = (size - courtWidth) / 2;
    const offsetY = (size - courtHeight) / 2;
    
    setDragElement({
      x: offsetX + 6 * tileSize,
      y: offsetY + 3 * tileSize,
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragElement) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    
    const elementSize = 80;
    if (
      x >= dragElement.x &&
      x <= dragElement.x + elementSize &&
      y >= dragElement.y &&
      y <= dragElement.y + elementSize
    ) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragElement) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    
    const size = 420;
    const tileSize = 20;
    const courtWidth = 16 * tileSize;
    const courtHeight = 10 * tileSize;
    const offsetX = (size - courtWidth) / 2;
    const offsetY = (size - courtHeight) / 2;
    const elementSize = 80;
    
    // Constrain to court and snap to grid
    const tileX = Math.floor((x - offsetX) / tileSize) * tileSize;
    const tileY = Math.floor((y - offsetY) / tileSize) * tileSize;
    
    setDragElement({
      x: Math.max(offsetX, Math.min(offsetX + courtWidth - elementSize, offsetX + tileX)),
      y: Math.max(offsetY, Math.min(offsetY + courtHeight - elementSize, offsetY + tileY)),
    });
  };

  return (
    <div className={className}>
      <div className="relative">
        {/* Controls */}
        <div className="absolute -top-12 left-0 right-0 flex justify-center gap-2 z-10">
          <button
            onClick={() => setCourtType("basketball")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              courtType === "basketball"
                ? "bg-gradient-primary text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Basketball
          </button>
          <button
            onClick={() => setCourtType("tennis")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              courtType === "tennis"
                ? "bg-gradient-primary text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Tennis
          </button>
          <button
            onClick={() => setCourtType("pickleball")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              courtType === "pickleball"
                ? "bg-gradient-primary text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Pickleball
          </button>
        </div>

        <canvas
          ref={canvasRef}
          className="w-full h-auto rounded-xl shadow-2xl cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          style={{ maxWidth: "100%" }}
        />

        {/* Color Controls */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => setBaseColor(color.hex)}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                baseColor === color.hex
                  ? "border-white shadow-neon-blue"
                  : "border-white/30"
              }`}
              style={{ backgroundColor: color.hex }}
              title={`Base: ${color.name}`}
            />
          ))}
        </div>

        {/* Accent Color */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Palette className="w-4 h-4 text-white/60" />
          {COLORS.slice(1).map((color) => (
            <button
              key={color.hex}
              onClick={() => setAccentColor(color.hex)}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                accentColor === color.hex
                  ? "border-white shadow-neon-blue"
                  : "border-white/30"
              }`}
              style={{ backgroundColor: color.hex }}
              title={`Accent: ${color.name}`}
            />
          ))}
        </div>

        {/* Info Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-xs text-white">
          <div className="font-semibold mb-1">Interactive Demo</div>
          <div className="text-[var(--brand-primary)]">Drag the orange square</div>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            const size = 420;
            const tileSize = 20;
            const courtWidth = 16 * tileSize;
            const courtHeight = 10 * tileSize;
            const offsetX = (size - courtWidth) / 2;
            const offsetY = (size - courtHeight) / 2;
            setDragElement({
              x: offsetX + 6 * tileSize,
              y: offsetY + 3 * tileSize,
            });
          }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
