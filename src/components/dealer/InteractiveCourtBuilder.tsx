"use client";

import * as React from "react";
import { Maximize2, Minimize2, Move, ZoomIn, ZoomOut } from "lucide-react";

interface GameElement {
  id: string;
  type: string;
  x: number; // in tiles
  y: number; // in tiles
  width: number; // in tiles
  height: number; // in tiles
  colors?: Record<string, string>;
}

interface InteractiveCourtBuilderProps {
  courtLength: number; // in feet (tiles)
  courtWidth: number; // in feet (tiles)
  gameLines: string[];
  baseTileColor: string;
  onElementsChange?: (elements: GameElement[]) => void;
}

const COLOR_MAP: Record<string, string> = {
  "Black": "#000000",
  "Graphite": "#2C2C2C",
  "Titanium": "#6B7280",
  "Navy Blue": "#1E3A8A",
  "Royal Blue": "#2563EB",
  "Light Blue": "#60A5FA",
  "Emerald Green": "#10B981",
  "Olive Green": "#84CC16",
  "Bright Red": "#EF4444",
  "Orange": "#F97316",
  "Yellow": "#FDE047",
};

export function InteractiveCourtBuilder({
  courtLength,
  courtWidth,
  gameLines,
  baseTileColor,
  onElementsChange,
}: InteractiveCourtBuilderProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [scale, setScale] = React.useState(1);

  // Game elements that can be positioned/resized
  const [elements, setElements] = React.useState<GameElement[]>([]);

  // Initialize elements based on game lines
  React.useEffect(() => {
    const newElements: GameElement[] = [];
    const tilesX = Math.ceil(courtLength);
    const tilesY = Math.ceil(courtWidth);

    // 4 Square - default 8x8 tiles in center
    if (gameLines.includes("4 Square")) {
      const size = Math.min(8, Math.floor(tilesX / 2), Math.floor(tilesY / 2));
      newElements.push({
        id: "4square",
        type: "4square",
        x: Math.floor((tilesX - size) / 2),
        y: Math.floor((tilesY - size) / 2),
        width: size,
        height: size,
      });
    }

    // Hop Scotch - 2 tiles wide, 7 tiles tall
    if (gameLines.includes("Hop Scotch")) {
      newElements.push({
        id: "hopscotch",
        type: "hopscotch",
        x: Math.floor(tilesX / 2) - 1,
        y: Math.floor(tilesY * 0.2),
        width: 2,
        height: 7,
      });
    }

    // Cornhole boards
    if (gameLines.includes("Cornhole")) {
      const boardWidth = 4;
      const boardHeight = 2;
      const spacing = Math.floor(tilesX * 0.4);
      
      newElements.push({
        id: "cornhole1",
        type: "cornhole",
        x: Math.floor(tilesX / 2 - spacing / 2 - boardWidth),
        y: Math.floor(tilesY / 2 - 1),
        width: boardWidth,
        height: boardHeight,
      });

      newElements.push({
        id: "cornhole2",
        type: "cornhole",
        x: Math.floor(tilesX / 2 + spacing / 2),
        y: Math.floor(tilesY / 2 - 1),
        width: boardWidth,
        height: boardHeight,
      });
    }

    // Badminton court - 20ft x 44ft
    if (gameLines.includes("Badminton")) {
      const courtW = Math.min(20, tilesY - 2);
      const courtL = Math.min(44, tilesX - 2);
      newElements.push({
        id: "badminton",
        type: "badminton",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    setElements(newElements);
  }, [gameLines, courtLength, courtWidth]);

  // Notify parent of element changes
  React.useEffect(() => {
    if (onElementsChange) {
      onElementsChange(elements);
    }
  }, [elements, onElementsChange]);

  const drawCourt = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || courtLength === 0 || courtWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate canvas size and tile size
    const maxWidth = isFullscreen ? 1200 : 800;
    const maxHeight = isFullscreen ? 800 : 500;
    
    const tileSize = Math.min(
      maxWidth / courtLength,
      maxHeight / courtWidth
    ) * 0.9 * scale;

    const courtPixelWidth = courtLength * tileSize;
    const courtPixelHeight = courtWidth * tileSize;
    const offsetX = (maxWidth - courtPixelWidth) / 2;
    const offsetY = (maxHeight - courtPixelHeight) / 2;

    canvas.width = maxWidth;
    canvas.height = maxHeight;

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(offsetX, offsetY);

    // Draw base tiles
    const tilesX = Math.ceil(courtLength);
    const tilesY = Math.ceil(courtWidth);
    const baseColor = COLOR_MAP[baseTileColor];

    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        ctx.fillStyle = baseColor;
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    // Draw game elements on tiles
    elements.forEach(element => {
      if (element.type === "4square") {
        draw4Square(ctx, element, tileSize);
      } else if (element.type === "hopscotch") {
        drawHopScotch(ctx, element, tileSize);
      } else if (element.type === "cornhole") {
        drawCornhole(ctx, element, tileSize);
      } else if (element.type === "badminton") {
        drawBadminton(ctx, element, tileSize);
      }

      // Highlight selected element
      if (selectedElement === element.id) {
        ctx.strokeStyle = "#00d4ff";
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(
          element.x * tileSize,
          element.y * tileSize,
          element.width * tileSize,
          element.height * tileSize
        );
        ctx.setLineDash([]);
      }
    });

    // Draw grid lines on top
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 1.5;
    for (let x = 0; x <= tilesX; x++) {
      ctx.beginPath();
      ctx.moveTo(x * tileSize, 0);
      ctx.lineTo(x * tileSize, courtPixelHeight);
      ctx.stroke();
    }
    for (let y = 0; y <= tilesY; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * tileSize);
      ctx.lineTo(courtPixelWidth, y * tileSize);
      ctx.stroke();
    }

    // Draw outer border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, courtPixelWidth, courtPixelHeight);

    // Draw dimensions
    ctx.fillStyle = "#60A5FA";
    ctx.font = "14px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`${courtLength} ft`, courtPixelWidth / 2, -10);
    ctx.save();
    ctx.translate(-20, courtPixelHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${courtWidth} ft`, 0, 0);
    ctx.restore();

    // Draw tile count
    ctx.font = "16px system-ui";
    ctx.fillStyle = "#F97316";
    ctx.textAlign = "left";
    ctx.fillText(
      `${(courtLength * courtWidth).toLocaleString()} sq ft (${tilesX * tilesY} tiles)`,
      20,
      30
    );

    ctx.restore();
  }, [courtLength, courtWidth, baseTileColor, elements, selectedElement, isFullscreen, scale]);

  React.useEffect(() => {
    drawCourt();
  }, [drawCourt]);

  // Handle canvas interactions
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const maxWidth = isFullscreen ? 1200 : 800;
    const maxHeight = isFullscreen ? 800 : 500;
    
    const tileSize = Math.min(
      maxWidth / courtLength,
      maxHeight / courtWidth
    ) * 0.9 * scale;

    const courtPixelWidth = courtLength * tileSize;
    const courtPixelHeight = courtWidth * tileSize;
    const offsetX = (maxWidth - courtPixelWidth) / 2;
    const offsetY = (maxHeight - courtPixelHeight) / 2;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tileX = Math.floor((x - offsetX) / tileSize);
    const tileY = Math.floor((y - offsetY) / tileSize);

    // Check if clicking on an element
    const clickedElement = elements.find(el => 
      tileX >= el.x && tileX < el.x + el.width &&
      tileY >= el.y && tileY < el.y + el.height
    );

    setSelectedElement(clickedElement?.id || null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedElement) return;
    setIsDragging(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElement) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const maxWidth = isFullscreen ? 1200 : 800;
    const maxHeight = isFullscreen ? 800 : 500;
    
    const tileSize = Math.min(
      maxWidth / courtLength,
      maxHeight / courtWidth
    ) * 0.9 * scale;

    const courtPixelWidth = courtLength * tileSize;
    const courtPixelHeight = courtWidth * tileSize;
    const offsetX = (maxWidth - courtPixelWidth) / 2;
    const offsetY = (maxHeight - courtPixelHeight) / 2;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tileX = Math.floor((x - offsetX) / tileSize);
    const tileY = Math.floor((y - offsetY) / tileSize);

    setElements(prev => prev.map(el => {
      if (el.id === selectedElement) {
        // Constrain to court bounds
        const newX = Math.max(0, Math.min(tileX, Math.ceil(courtLength) - el.width));
        const newY = Math.max(0, Math.min(tileY, Math.ceil(courtWidth) - el.height));
        return { ...el, x: newX, y: newY };
      }
      return el;
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resizeSelected = (dWidth: number, dHeight: number) => {
    if (!selectedElement) return;
    
    setElements(prev => prev.map(el => {
      if (el.id === selectedElement) {
        const newWidth = Math.max(2, Math.min(el.width + dWidth, Math.ceil(courtLength) - el.x));
        const newHeight = Math.max(2, Math.min(el.height + dHeight, Math.ceil(courtWidth) - el.y));
        
        // Keep 4 square as a square
        if (el.type === "4square") {
          const size = Math.max(newWidth, newHeight);
          return { ...el, width: size, height: size };
        }
        
        return { ...el, width: newWidth, height: newHeight };
      }
      return el;
    }));
  };

  if (courtLength === 0 || courtWidth === 0) {
    return (
      <div className="card-premium flex items-center justify-center min-h-[300px]">
        <div className="text-center text-muted-foreground">
          <p className="text-lg mb-2">Interactive Court Builder</p>
          <p className="text-sm">Enter court dimensions to start designing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-premium">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">Interactive Court Builder</h3>
          {selectedElement && (
            <p className="text-xs text-muted-foreground">
              Selected: {elements.find(e => e.id === selectedElement)?.type} - Click and drag to move
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScale(s => Math.min(s + 0.1, 2))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn-premium-secondary flex items-center gap-2 text-sm"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4" />
                Collapse
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                Expand
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resize Controls */}
      {selectedElement && (
        <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-border">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Resize:</span>
            <button
              type="button"
              onClick={() => resizeSelected(-1, 0)}
              className="px-2 py-1 hover:bg-white/10 rounded"
            >
              W-
            </button>
            <button
              type="button"
              onClick={() => resizeSelected(1, 0)}
              className="px-2 py-1 hover:bg-white/10 rounded"
            >
              W+
            </button>
            <button
              type="button"
              onClick={() => resizeSelected(0, -1)}
              className="px-2 py-1 hover:bg-white/10 rounded"
            >
              H-
            </button>
            <button
              type="button"
              onClick={() => resizeSelected(0, 1)}
              className="px-2 py-1 hover:bg-white/10 rounded"
            >
              H+
            </button>
            <span className="text-xs text-muted-foreground ml-2">
              {elements.find(e => e.id === selectedElement)?.width} × {elements.find(e => e.id === selectedElement)?.height} tiles
            </span>
          </div>
        </div>
      )}

      <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-border cursor-move">
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ maxWidth: "100%" }}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      {gameLines.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {gameLines.map((line) => (
            <span key={line} className="sport-badge text-xs">
              {line}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Drawing functions that work with tile grid
function draw4Square(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number) {
  const { x, y, width, height } = element;
  
  // Fill tiles with color
  ctx.fillStyle = "#2563EB"; // Royal Blue
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw center lines
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 3;
  ctx.beginPath();
  // Vertical center
  ctx.moveTo((x + width / 2) * tileSize, y * tileSize);
  ctx.lineTo((x + width / 2) * tileSize, (y + height) * tileSize);
  // Horizontal center
  ctx.moveTo(x * tileSize, (y + height / 2) * tileSize);
  ctx.lineTo((x + width) * tileSize, (y + height / 2) * tileSize);
  ctx.stroke();
}

function drawHopScotch(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number) {
  const { x, y } = element;
  const colors = ["#EF4444", "#F97316", "#FDE047", "#10B981", "#2563EB", "#8B5CF6", "#EC4899"];
  
  // Draw 7 squares
  for (let i = 0; i < 7; i++) {
    const tx = i % 2 === 0 ? x : x + 1;
    const ty = y + Math.floor(i / 2);
    
    ctx.fillStyle = colors[i];
    ctx.fillRect(tx * tileSize, ty * tileSize, tileSize, tileSize);
    
    // Draw number
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `${tileSize * 0.5}px bold system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      (i + 1).toString(),
      (tx + 0.5) * tileSize,
      (ty + 0.5) * tileSize
    );
  }
}

function drawCornhole(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number) {
  const { x, y, width, height } = element;
  
  // Fill tiles
  ctx.fillStyle = "#EF4444"; // Bright Red
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw hole
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(
    (x + width / 2) * tileSize,
    (y + height * 0.6) * tileSize,
    tileSize * 0.3,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function drawBadminton(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number) {
  const { x, y, width, height } = element;
  
  // Fill court tiles
  ctx.fillStyle = "#10B981"; // Emerald Green
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw lines
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;

  // Center line
  ctx.beginPath();
  ctx.moveTo((x + width / 2) * tileSize, y * tileSize);
  ctx.lineTo((x + width / 2) * tileSize, (y + height) * tileSize);
  ctx.stroke();

  // Service lines
  const serviceLine = width * 0.24;
  ctx.beginPath();
  ctx.moveTo((x + serviceLine) * tileSize, y * tileSize);
  ctx.lineTo((x + serviceLine) * tileSize, (y + height) * tileSize);
  ctx.moveTo((x + width - serviceLine) * tileSize, y * tileSize);
  ctx.lineTo((x + width - serviceLine) * tileSize, (y + height) * tileSize);
  ctx.stroke();
}

