"use client";

import * as React from "react";
import { RotateCcw, Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

type SportType = "basketball" | "pickleball" | "tennis" | "multi-sport" | "shuffleboard" | "volleyball";

interface CourtDesigner3DProps {
  sport: SportType;
}

const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Graphite", hex: "#2C2C2C" },
  { name: "Titanium", hex: "#6B7280" },
  { name: "Navy Blue", hex: "#1E3A8A" },
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Light Blue", hex: "#60A5FA" },
  { name: "Emerald Green", hex: "#10B981" },
  { name: "Olive Green", hex: "#84CC16" },
  { name: "Bright Red", hex: "#EF4444" },
  { name: "Orange", hex: "#F97316" },
  { name: "Yellow", hex: "#FDE047" },
];

export function CourtDesigner3D({ sport }: CourtDesigner3DProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = React.useState({ x: 30, y: 45 }); // 3D rotation angles
  const [targetRotation, setTargetRotation] = React.useState({ x: 30, y: 45 }); // Smooth interpolation target
  const [zoom, setZoom] = React.useState(1);
  const [isDragging, setIsDragging] = React.useState(false);
  const [lastMouse, setLastMouse] = React.useState({ x: 0, y: 0 });
  const animationRef = React.useRef<number | undefined>(undefined);
  
  // Court customization
  const [baseColor, setBaseColor] = React.useState("#2C2C2C");
  const [accentColor, setAccentColor] = React.useState("#2563EB");
  const [lineColor, setLineColor] = React.useState("#FFFFFF");
  const [dimensions, setDimensions] = React.useState({ length: 94, width: 50 }); // Basketball default

  // Smooth interpolation for rotation
  React.useEffect(() => {
    const animate = () => {
      setRotation(current => ({
        x: current.x + (targetRotation.x - current.x) * 0.15, // Smooth lerp
        y: current.y + (targetRotation.y - current.y) * 0.15,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetRotation]);

  const draw3DCourt = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Anti-aliasing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Background with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(1, "#050505");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // 3D projection setup
    const centerX = 400;
    const centerY = 300;
    const scale = 3 * zoom;
    
    // Convert angles to radians with smooth values
    const rotX = (rotation.x * Math.PI) / 180;
    const rotY = (rotation.y * Math.PI) / 180;

    // Project 3D point to 2D
    const project = (x: number, y: number, z: number) => {
      // Rotate around Y axis
      const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
      const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
      
      // Rotate around X axis
      const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
      
      // Perspective projection
      const perspective = 500;
      const projScale = perspective / (perspective + z2);
      
      return {
        x: centerX + x1 * scale * projScale,
        y: centerY - y1 * scale * projScale,
        z: z2
      };
    };

    // Court dimensions in feet (scaled for visualization)
    const courtLength = dimensions.length;
    const courtWidth = dimensions.width;
    const tileSize = 1; // 1 foot per tile

    // Draw court base (tiles)
    for (let z = -courtLength / 2; z < courtLength / 2; z += tileSize * 4) {
      for (let x = -courtWidth / 2; x < courtWidth / 2; x += tileSize * 4) {
        const corners = [
          project(x, 0, z),
          project(x + tileSize * 4, 0, z),
          project(x + tileSize * 4, 0, z + tileSize * 4),
          project(x, 0, z + tileSize * 4),
        ];

        // Sort by z for proper rendering
        const avgZ = corners.reduce((sum, c) => sum + c.z, 0) / 4;
        
        // Determine tile color based on court markings
        let color = baseColor;
        
        if (sport === "basketball") {
          // Paint/lane areas
          if ((Math.abs(z) < courtLength * 0.2 && Math.abs(x) < courtWidth * 0.16) ||
              (Math.abs(z - courtLength * 0.38) < courtLength * 0.2 && Math.abs(x) < courtWidth * 0.16)) {
            color = accentColor;
          }
        } else if (sport === "pickleball") {
          // Kitchen zones
          if (Math.abs(z) < 7 || Math.abs(z) > courtLength / 2 - 7) {
            color = accentColor;
          }
        } else if (sport === "tennis") {
          // Service boxes
          if (Math.abs(x) > courtWidth * 0.3 && Math.abs(z) < courtLength * 0.4) {
            color = accentColor;
          }
        }

        // Shading based on z-depth
        const brightness = 1 - (avgZ / 200) * 0.3;
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0.6, brightness);

        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        corners.forEach(c => ctx.lineTo(c.x, c.y));
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        // Grid lines
        ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Draw court lines in 3D
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;

    if (sport === "basketball") {
      // Center line
      const c1 = project(0, 0.1, -courtLength / 2);
      const c2 = project(0, 0.1, courtLength / 2);
      ctx.beginPath();
      ctx.moveTo(c1.x, c1.y);
      ctx.lineTo(c2.x, c2.y);
      ctx.stroke();

      // Center circle
      const segments = 32;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const px = Math.cos(angle) * 6;
        const pz = Math.sin(angle) * 6;
        const p = project(px, 0.1, pz);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // Court border
    ctx.strokeStyle = "#00d4ff";
    ctx.lineWidth = 3;
    const border = [
      project(-courtWidth / 2, 0, -courtLength / 2),
      project(courtWidth / 2, 0, -courtLength / 2),
      project(courtWidth / 2, 0, courtLength / 2),
      project(-courtWidth / 2, 0, courtLength / 2),
    ];
    ctx.beginPath();
    ctx.moveTo(border[0].x, border[0].y);
    border.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.stroke();

  }, [sport, rotation, zoom, baseColor, accentColor, lineColor, dimensions]);

  React.useEffect(() => {
    let frameId: number;
    const animate = () => {
      draw3DCourt();
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [draw3DCourt]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    // Update target rotation for smooth interpolation
    setTargetRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.3)), // Slower, smoother
      y: prev.y + deltaX * 0.3,
    }));
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-8">
      {/* 3D Viewport */}
      <div className="space-y-4">
        <div className="card-premium">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-3">3D Court Preview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
                <button
                  onClick={() => {
                    setRotation({ x: 30, y: 45 });
                    setTargetRotation({ x: 30, y: 45 });
                    setZoom(1);
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  title="Reset View"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
            </div>
          </div>

          <div className="relative bg-black rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-auto cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              style={{ touchAction: "none" }}
            />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-xs text-white">
              Drag to rotate • Scroll to zoom
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="card-premium">
          <h3 className="font-bold mb-4">Export Your Design</h3>
          <div className="flex gap-3">
            <button className="btn-premium-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Image
            </button>
            <button className="btn-premium-primary flex items-center gap-2">
              <Maximize2 className="w-4 h-4" />
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {/* Controls Sidebar */}
      <div className="space-y-6">
        {/* Dimensions */}
        <div className="card-premium">
          <h3 className="font-bold mb-4">Court Dimensions</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm block mb-2">Length (ft)</label>
              <input
                type="number"
                value={dimensions.length}
                onChange={(e) => setDimensions(prev => ({ ...prev, length: parseInt(e.target.value) || 0 }))}
                className="field-input w-full"
              />
            </div>
            <div>
              <label className="text-sm block mb-2">Width (ft)</label>
              <input
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                className="field-input w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Total: {dimensions.length * dimensions.width} sq ft ({dimensions.length * dimensions.width} tiles)
            </p>
          </div>
        </div>

        {/* Base Color */}
        <div className="card-premium">
          <h3 className="font-bold mb-4">Base Tile Color</h3>
          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.hex}
                onClick={() => setBaseColor(color.hex)}
                className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                  baseColor === color.hex
                    ? "border-white shadow-neon-blue"
                    : "border-border"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {COLORS.find(c => c.hex === baseColor)?.name}
          </p>
        </div>

        {/* Accent Color */}
        <div className="card-premium">
          <h3 className="font-bold mb-4">Accent Color</h3>
          <p className="text-xs text-muted-foreground mb-3">
            {sport === "basketball" && "Lane/Key color"}
            {sport === "pickleball" && "Kitchen zone color"}
            {sport === "tennis" && "Service box color"}
            {sport === "volleyball" && "Attack zone color"}
            {sport === "shuffleboard" && "Shooting area color"}
            {sport === "multi-sport" && "Zone color"}
          </p>
          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.hex}
                onClick={() => setAccentColor(color.hex)}
                className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                  accentColor === color.hex
                    ? "border-white shadow-neon-blue"
                    : "border-border"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {COLORS.find(c => c.hex === accentColor)?.name}
          </p>
        </div>

        {/* Line Color */}
        <div className="card-premium">
          <h3 className="font-bold mb-4">Line Color</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setLineColor("#FFFFFF")}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
                lineColor === "#FFFFFF"
                  ? "bg-gradient-primary text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              White
            </button>
            <button
              onClick={() => setLineColor("#FDE047")}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
                lineColor === "#FDE047"
                  ? "bg-gradient-primary text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              Yellow
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="card-premium bg-gradient-primary/10 border-[var(--brand-primary)]/30">
          <h3 className="font-bold mb-3">Design Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sport:</span>
              <span className="font-semibold capitalize">{sport.replace("-", " ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size:</span>
              <span className="font-semibold">{dimensions.length} × {dimensions.width} ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tiles:</span>
              <span className="font-semibold">{dimensions.length * dimensions.width}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Color:</span>
              <span className="font-semibold">{COLORS.find(c => c.hex === baseColor)?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

