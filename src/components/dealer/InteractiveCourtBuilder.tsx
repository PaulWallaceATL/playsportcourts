"use client";

import * as React from "react";
import { Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";

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
  // Basketball colors and settings
  basketballCourtColor?: string;
  basketballLaneColor?: string;
  basketballBorderColor?: string;
  basketballRegulation?: string;
  basketballOverhang?: number;
  // Pickleball colors
  pickleballInnerCourtColor?: string;
  pickleballOuterCourtColor?: string;
  pickleballKitchenColor?: string;
  // Shuffleboard colors
  shuffleboardCourtColor?: string;
  shuffleboardShootingAreaColor?: string;
  shuffleboardBorderColor?: string;
  // Tennis colors
  tennisCourtColor?: string;
  tennisServiceBoxColor?: string;
  // Soccer colors
  soccerFieldColor?: string;
  soccerPenaltyBoxColor?: string;
  // Hockey colors
  hockeyIceColor?: string;
  hockeyCreaseColor?: string;
  // Other sport colors
  badmintonCourtColor?: string;
  volleyballCourtColor?: string;
  futsalCourtColor?: string;
  fourSquareColor?: string;
  cornholeColor?: string;
  battersBoxColor?: string;
  // Line painting color
  linePaintingColor?: string;
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
  basketballCourtColor = "Navy Blue",
  basketballLaneColor = "Royal Blue",
  basketballBorderColor = "Orange",
  basketballRegulation = "nba",
  basketballOverhang = 0,
  pickleballInnerCourtColor = "Graphite",
  pickleballOuterCourtColor = "Titanium",
  pickleballKitchenColor = "Royal Blue",
  shuffleboardCourtColor = "Black",
  shuffleboardShootingAreaColor = "Royal Blue",
  shuffleboardBorderColor = "Yellow",
  tennisCourtColor = "Emerald Green",
  tennisServiceBoxColor = "Olive Green",
  soccerFieldColor = "Emerald Green",
  soccerPenaltyBoxColor = "Olive Green",
  hockeyIceColor = "Light Blue",
  hockeyCreaseColor = "Royal Blue",
  badmintonCourtColor = "Emerald Green",
  volleyballCourtColor = "Bright Red",
  futsalCourtColor = "Orange",
  fourSquareColor = "Royal Blue",
  cornholeColor = "Bright Red",
  battersBoxColor = "Titanium",
  linePaintingColor,
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

    // Basketball courts
    if (gameLines.includes("Basketball - Full")) {
      const courtW = Math.min(50, tilesY - 2);
      // Full court requires 95ft minimum, otherwise force half court
      const courtL = tilesX >= 95 ? Math.min(94, tilesX - 2) : Math.min(47, tilesX - 2);
      const isActuallyHalf = tilesX < 95;
      
      newElements.push({
        id: isActuallyHalf ? "basketball-half" : "basketball-full",
        type: isActuallyHalf ? "basketball-half" : "basketball-full",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    if (gameLines.includes("Basketball - Half") && !gameLines.includes("Basketball - Full")) {
      const courtW = Math.min(50, tilesY - 2);
      const courtL = Math.min(47, tilesX - 2);
      newElements.push({
        id: "basketball-half",
        type: "basketball-half",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    // Tennis/Pickleball courts
    if (gameLines.includes("Tennis - Full Court") || gameLines.includes("Tennis - Reduced")) {
      const courtW = gameLines.includes("Tennis - Reduced") ? Math.min(27, tilesY - 2) : Math.min(36, tilesY - 2);
      const courtL = gameLines.includes("Tennis - Reduced") ? Math.min(60, tilesX - 2) : Math.min(78, tilesX - 2);
      newElements.push({
        id: "tennis",
        type: "tennis",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    if (gameLines.includes("Pickleball")) {
      const courtW = Math.min(20, tilesY - 2);
      const courtL = Math.min(44, tilesX - 2);
      newElements.push({
        id: "pickleball",
        type: "pickleball",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    // Volleyball court
    if (gameLines.includes("Volleyball")) {
      const courtW = Math.min(30, tilesY - 2);
      const courtL = Math.min(60, tilesX - 2);
      newElements.push({
        id: "volleyball",
        type: "volleyball",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    // Shuffleboard courts
    if (gameLines.includes("Shuffleboard - Single") || gameLines.includes("Shuffleboard - Double")) {
      const courtW = gameLines.includes("Shuffleboard - Double") ? Math.min(12, tilesY - 2) : Math.min(6, tilesY - 2);
      const courtL = Math.min(52, tilesX - 2);
      newElements.push({
        id: "shuffleboard",
        type: "shuffleboard",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    // Soccer field
    if (gameLines.includes("Soccer")) {
      const courtW = Math.min(50, tilesY - 2);
      const courtL = Math.min(80, tilesX - 2);
      newElements.push({
        id: "soccer",
        type: "soccer",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    // Futsal
    if (gameLines.includes("Futsal - Reduced") || gameLines.includes("Futsal - Regulated")) {
      const isRegulated = gameLines.includes("Futsal - Regulated");
      const courtW = isRegulated ? Math.min(20, tilesY - 2) : Math.min(15, tilesY - 2);
      const courtL = isRegulated ? Math.min(40, tilesX - 2) : Math.min(30, tilesX - 2);
      newElements.push({
        id: "futsal",
        type: "futsal",
        x: Math.floor((tilesX - courtL) / 2),
        y: Math.floor((tilesY - courtW) / 2),
        width: courtL,
        height: courtW,
      });
    }

    // Batters Box
    if (gameLines.includes("Batters Box")) {
      const boxW = 4;
      const boxH = 6;
      // Left box
      newElements.push({
        id: "battersbox1",
        type: "battersbox",
        x: Math.floor(tilesX / 2) - 3 - boxW,
        y: Math.floor(tilesY / 2) - Math.floor(boxH / 2),
        width: boxW,
        height: boxH,
      });
      // Right box
      newElements.push({
        id: "battersbox2",
        type: "battersbox",
        x: Math.floor(tilesX / 2) + 3,
        y: Math.floor(tilesY / 2) - Math.floor(boxH / 2),
        width: boxW,
        height: boxH,
      });
    }

    // Hockey rinks
    if (gameLines.includes("Hockey Regulation")) {
      const rinkW = Math.min(85, tilesY - 2);
      const rinkL = Math.min(200, tilesX - 2);
      newElements.push({
        id: "hockey-reg",
        type: "hockey-regulation",
        x: Math.floor((tilesX - rinkL) / 2),
        y: Math.floor((tilesY - rinkW) / 2),
        width: rinkL,
        height: rinkW,
      });
    }

    if (gameLines.includes("Hockey Crease") && !gameLines.includes("Hockey Regulation")) {
      const rinkW = Math.min(50, tilesY - 2);
      const rinkL = Math.min(100, tilesX - 2);
      newElements.push({
        id: "hockey-crease",
        type: "hockey-crease",
        x: Math.floor((tilesX - rinkL) / 2),
        y: Math.floor((tilesY - rinkW) / 2),
        width: rinkL,
        height: rinkW,
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

  const drawCourt = () => {
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
        draw4Square(ctx, element, tileSize, COLOR_MAP[fourSquareColor], linePaintingColor ? COLOR_MAP[linePaintingColor] : "#FFFFFF");
      } else if (element.type === "hopscotch") {
        drawHopScotch(ctx, element, tileSize);
      } else if (element.type === "cornhole") {
        drawCornhole(ctx, element, tileSize, COLOR_MAP[cornholeColor]);
      } else if (element.type === "badminton") {
        drawBadminton(ctx, element, tileSize, COLOR_MAP[badmintonCourtColor], linePaintingColor ? COLOR_MAP[linePaintingColor] : "#FFFFFF");
      } else if (element.type === "basketball-full" || element.type === "basketball-half") {
        drawBasketball(ctx, element, tileSize, element.type === "basketball-half", {
          courtColor: COLOR_MAP[basketballCourtColor],
          laneColor: COLOR_MAP[basketballLaneColor],
          borderColor: COLOR_MAP[basketballBorderColor],
        }, basketballRegulation, basketballOverhang);
      } else if (element.type === "tennis") {
        drawTennis(ctx, element, tileSize, {
          courtColor: COLOR_MAP[tennisCourtColor],
          serviceBoxColor: COLOR_MAP[tennisServiceBoxColor],
        });
      } else if (element.type === "pickleball") {
        drawPickleball(ctx, element, tileSize, {
          innerColor: COLOR_MAP[pickleballInnerCourtColor],
          outerColor: COLOR_MAP[pickleballOuterCourtColor],
          kitchenColor: COLOR_MAP[pickleballKitchenColor],
        });
      } else if (element.type === "volleyball") {
        drawVolleyball(ctx, element, tileSize, COLOR_MAP[volleyballCourtColor], linePaintingColor ? COLOR_MAP[linePaintingColor] : "#FFFFFF");
      } else if (element.type === "shuffleboard") {
        drawShuffleboard(ctx, element, tileSize, {
          courtColor: COLOR_MAP[shuffleboardCourtColor],
          shootingColor: COLOR_MAP[shuffleboardShootingAreaColor],
          borderColor: COLOR_MAP[shuffleboardBorderColor],
        });
      } else if (element.type === "soccer") {
        drawSoccer(ctx, element, tileSize, {
          fieldColor: COLOR_MAP[soccerFieldColor],
          penaltyBoxColor: COLOR_MAP[soccerPenaltyBoxColor],
        });
      } else if (element.type === "futsal") {
        drawFutsal(ctx, element, tileSize, COLOR_MAP[futsalCourtColor], linePaintingColor ? COLOR_MAP[linePaintingColor] : "#FFFFFF");
      } else if (element.type === "battersbox") {
        drawBattersBox(ctx, element, tileSize, COLOR_MAP[battersBoxColor]);
      } else if (element.type === "hockey-regulation" || element.type === "hockey-crease") {
        drawHockey(ctx, element, tileSize, {
          iceColor: COLOR_MAP[hockeyIceColor],
          creaseColor: COLOR_MAP[hockeyCreaseColor],
        });
      }

      // Highlight selected element
      if (selectedElement === element.id) {
        ctx.strokeStyle = "#00d4ff";
        ctx.lineWidth = 4;
        ctx.setLineDash([8, 4]);
        ctx.strokeRect(
          element.x * tileSize - 2,
          element.y * tileSize - 2,
          element.width * tileSize + 4,
          element.height * tileSize + 4
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
  };

  React.useEffect(() => {
    drawCourt();
  }, [courtLength, courtWidth, baseTileColor, elements, selectedElement, isFullscreen, scale, basketballCourtColor, basketballLaneColor, basketballBorderColor, basketballRegulation, basketballOverhang, pickleballInnerCourtColor, pickleballOuterCourtColor, pickleballKitchenColor, shuffleboardCourtColor, shuffleboardShootingAreaColor, shuffleboardBorderColor, tennisCourtColor, tennisServiceBoxColor, soccerFieldColor, soccerPenaltyBoxColor, hockeyIceColor, hockeyCreaseColor, badmintonCourtColor, volleyballCourtColor, futsalCourtColor, fourSquareColor, cornholeColor, battersBoxColor, linePaintingColor, gameLines]);

  // Handle canvas interactions
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    
    // Get actual canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const tileSize = Math.min(
      canvasWidth / courtLength,
      canvasHeight / courtWidth
    ) * 0.9 * scale;

    const courtPixelWidth = courtLength * tileSize;
    const courtPixelHeight = courtWidth * tileSize;
    const offsetX = (canvasWidth - courtPixelWidth) / 2;
    const offsetY = (canvasHeight - courtPixelHeight) / 2;

    // Scale mouse position to canvas coordinates
    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const tileX = Math.floor((x - offsetX) / tileSize);
    const tileY = Math.floor((y - offsetY) / tileSize);

    // Check if clicking on an element
    // Find all elements at this position
    const clickedElements = elements.filter(el => 
      tileX >= el.x && tileX < el.x + el.width &&
      tileY >= el.y && tileY < el.y + el.height
    );

    // Prioritize smaller elements (4square, cornhole, hopscotch, battersbox)
    // by sorting by area (smallest first)
    const clickedElement = clickedElements.sort((a, b) => 
      (a.width * a.height) - (b.width * b.height)
    )[0];

    // Debug: Check if within court bounds
    if (tileX < 0 || tileX >= Math.ceil(courtLength) || tileY < 0 || tileY >= Math.ceil(courtWidth)) {
      console.log('Click outside court bounds');
      return;
    }

    console.log('Click at tile:', tileX, tileY, 'Elements found:', clickedElements.length);
    
    if (clickedElement) {
      console.log('✓ Selected:', clickedElement.type, clickedElement.id);
      setSelectedElement(clickedElement.id);
      setIsDragging(true);
      setDragStart({ x: tileX - clickedElement.x, y: tileY - clickedElement.y });
      
      // Force immediate redraw to show selection
      drawCourt();
    } else {
      console.log('✗ No element at this position. Elements:', elements.map(e => ({type: e.type, x: e.x, y: e.y, w: e.width, h: e.height})));
      setSelectedElement(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElement) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    
    // Get actual canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const tileSize = Math.min(
      canvasWidth / courtLength,
      canvasHeight / courtWidth
    ) * 0.9 * scale;

    const courtPixelWidth = courtLength * tileSize;
    const courtPixelHeight = courtWidth * tileSize;
    const offsetX = (canvasWidth - courtPixelWidth) / 2;
    const offsetY = (canvasHeight - courtPixelHeight) / 2;

    // Scale mouse position to canvas coordinates
    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const tileX = Math.floor((x - offsetX) / tileSize);
    const tileY = Math.floor((y - offsetY) / tileSize);

    setElements(prev => prev.map(el => {
      if (el.id === selectedElement) {
        // Calculate new position accounting for drag offset
        const newX = tileX - dragStart.x;
        const newY = tileY - dragStart.y;
        
        // Constrain to court bounds
        const constrainedX = Math.max(0, Math.min(newX, Math.ceil(courtLength) - el.width));
        const constrainedY = Math.max(0, Math.min(newY, Math.ceil(courtWidth) - el.height));
        return { ...el, x: constrainedX, y: constrainedY };
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
        const maxWidth = Math.ceil(courtLength) - el.x;
        const maxHeight = Math.ceil(courtWidth) - el.y;
        
        // Keep 4 square as a perfect square and even number
        if (el.type === "4square") {
          const newSize = Math.max(4, el.width + (dWidth !== 0 ? dWidth : dHeight));
          const evenSize = Math.max(4, Math.floor(newSize / 2) * 2);
          const finalSize = Math.min(evenSize, maxWidth, maxHeight);
          return { ...el, width: finalSize, height: finalSize };
        }
        
        // Ensure hopscotch stays 2 tiles wide
        if (el.type === "hopscotch") {
          const newHeight = Math.max(7, Math.min(el.height + dHeight, maxHeight));
          return { ...el, width: 2, height: newHeight };
        }
        
        // Cornhole and batters box can resize
        const newWidth = Math.max(2, Math.min(el.width + dWidth, maxWidth));
        const newHeight = Math.max(2, Math.min(el.height + dHeight, maxHeight));
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
        {selectedElement && elements.find(e => e.id === selectedElement) && (
        <div className="mb-4 p-4 rounded-lg bg-gradient-primary/10 border-2 border-[var(--brand-primary)]/50 animate-in">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[var(--brand-primary)]">
                ✓ {elements.find(e => e.id === selectedElement)?.type.toUpperCase()}
              </span>
              <span className="text-sm text-muted-foreground">
                {elements.find(e => e.id === selectedElement)?.width} × {elements.find(e => e.id === selectedElement)?.height} tiles
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Resize:</span>
              <button
                type="button"
                onClick={() => resizeSelected(-2, 0)}
                className="btn-premium-secondary px-3 py-2 text-sm min-h-[44px]"
              >
                Width -
              </button>
              <button
                type="button"
                onClick={() => resizeSelected(2, 0)}
                className="btn-premium-secondary px-3 py-2 text-sm min-h-[44px]"
              >
                Width +
              </button>
              <button
                type="button"
                onClick={() => resizeSelected(0, -2)}
                className="btn-premium-secondary px-3 py-2 text-sm min-h-[44px]"
              >
                Height -
              </button>
              <button
                type="button"
                onClick={() => resizeSelected(0, 2)}
                className="btn-premium-secondary px-3 py-2 text-sm min-h-[44px]"
              >
                Height +
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Click and drag on the court to move this element
            </p>
          </div>
        </div>
      )}

      <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-border">
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ 
            maxWidth: "100%", 
            cursor: isDragging ? "grabbing" : selectedElement ? "grab" : "pointer",
            touchAction: "none"
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            handleMouseDown(mouseEvent as unknown as React.MouseEvent<HTMLCanvasElement>);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            handleMouseMove(mouseEvent as unknown as React.MouseEvent<HTMLCanvasElement>);
          }}
          onTouchEnd={() => handleMouseUp()}
        />
      </div>

      {/* Debug: Show element positions */}
      {elements.length > 0 && (
        <div className="mt-4 p-3 bg-black/50 rounded text-xs font-mono">
          <div className="text-[var(--brand-primary)] mb-2">Elements ({elements.length}):</div>
          {elements.map((el) => (
            <div key={el.id} className={`${selectedElement === el.id ? 'text-[var(--brand-accent)]' : 'text-muted-foreground'}`}>
              {el.type}: x={el.x}, y={el.y}, w={el.width}, h={el.height}
            </div>
          ))}
        </div>
      )}
      
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
function draw4Square(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number, squareColor: string, lineColor: string) {
  const { x, y, width, height } = element;
  
  // Fill tiles with color
  ctx.fillStyle = squareColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw center lines
  ctx.strokeStyle = lineColor;
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

function drawCornhole(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number, boardColor: string) {
  const { x, y, width, height } = element;
  
  // Fill tiles
  ctx.fillStyle = boardColor;
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

function drawBadminton(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number, courtColor: string, lineColor: string) {
  const { x, y, width, height } = element;
  
  // Fill court tiles
  ctx.fillStyle = courtColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw lines
  ctx.strokeStyle = lineColor;
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

function drawBasketball(
  ctx: CanvasRenderingContext2D, 
  element: GameElement, 
  tileSize: number, 
  isHalfCourt: boolean,
  colors: { courtColor: string; laneColor: string; borderColor: string },
  regulation: string = "nba",
  overhang: number = 0
) {
  const { x, y, width, height } = element;
  
  // Regulation-specific dimensions (in feet/tiles)
  const regulations = {
    nba: { keyWidth: 16, threePoint: 23.75, threePointCorner: 22, freeThrowDist: 15, laneLength: 19 },
    ncaa: { keyWidth: 12, threePoint: 22.15, threePointCorner: 21.65, freeThrowDist: 15, laneLength: 19 },
    highschool: { keyWidth: 12, threePoint: 19.75, threePointCorner: 19.75, freeThrowDist: 15, laneLength: 19 },
  };
  
  const specs = regulations[regulation as keyof typeof regulations] || regulations.nba;
  
  // Base court color
  ctx.fillStyle = colors.courtColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Backboard is 4ft from baseline (regulation), overhang extends forward
  const baselineOffset = overhang; // Overhang pushes baseline inward
  
  // Paint/Lane area - extends from baseline toward center
  // Lane is 19ft long (from baseline), key width varies by regulation
  const laneLength = Math.min(specs.laneLength, Math.floor(width * 0.4)); // How far from baseline (horizontal)
  const laneWidth = Math.min(specs.keyWidth, Math.floor(height * 0.5)); // Width of key (vertical)
  const laneX = baselineOffset; // Start at baseline
  const laneY = Math.floor((height - laneWidth) / 2); // Center vertically
  
  ctx.fillStyle = colors.laneColor;
  
  // Left lane (extends from left baseline toward center)
  for (let ty = laneY; ty < laneY + laneWidth; ty++) {
    for (let tx = laneX; tx < Math.min(laneX + laneLength, width); tx++) {
      if (tx >= 0 && tx < width && ty >= 0 && ty < height) {
        ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
      }
    }
  }
  
  // Right lane (full court only - extends from right baseline toward center)
  if (!isHalfCourt) {
    const rightLaneX = width - laneLength - baselineOffset;
    for (let ty = laneY; ty < laneY + laneWidth; ty++) {
      for (let tx = rightLaneX; tx < width - baselineOffset; tx++) {
        if (tx >= 0 && tx < width && ty >= 0 && ty < height) {
          ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
        }
      }
    }
  }

  // Draw all lines
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;

  // Baselines (adjust for overhang if any)
  if (baselineOffset > 0) {
    ctx.beginPath();
    ctx.moveTo((x + baselineOffset) * tileSize, y * tileSize);
    ctx.lineTo((x + baselineOffset) * tileSize, (y + height) * tileSize);
    if (!isHalfCourt) {
      ctx.moveTo((x + width - baselineOffset) * tileSize, y * tileSize);
      ctx.lineTo((x + width - baselineOffset) * tileSize, (y + height) * tileSize);
    }
    ctx.stroke();
  }

  // Free throw line (no circle)
  const freeThrowPos = baselineOffset + specs.freeThrowDist;
  
  // Left free throw
  if (freeThrowPos < width) {
    // Free throw line
    ctx.beginPath();
    ctx.moveTo((x + freeThrowPos) * tileSize, (y + laneY) * tileSize);
    ctx.lineTo((x + freeThrowPos) * tileSize, (y + laneY + laneWidth) * tileSize);
    ctx.stroke();

    // Lane outline
    ctx.beginPath();
    ctx.rect((x + laneX) * tileSize, (y + laneY) * tileSize, laneLength * tileSize, laneWidth * tileSize);
    ctx.stroke();
  }

  if (!isHalfCourt) {
    // Center line
    const centerTile = Math.floor(width / 2);
    ctx.beginPath();
    ctx.moveTo((x + centerTile) * tileSize, y * tileSize);
    ctx.lineTo((x + centerTile) * tileSize, (y + height) * tileSize);
    ctx.stroke();

    // Center circle (6ft radius)
    ctx.beginPath();
    ctx.arc((x + centerTile) * tileSize, (y + height / 2) * tileSize, 6 * tileSize, 0, Math.PI * 2);
    ctx.stroke();

    // Right free throw
    const rightFreeThrow = width - freeThrowPos;
    const rightLaneX = width - laneLength - baselineOffset;
    if (rightFreeThrow > 0 && rightFreeThrow < width) {
      // Free throw line
      ctx.beginPath();
      ctx.moveTo((x + rightFreeThrow) * tileSize, (y + laneY) * tileSize);
      ctx.lineTo((x + rightFreeThrow) * tileSize, (y + laneY + laneWidth) * tileSize);
      ctx.stroke();

      // Lane outline
      ctx.beginPath();
      ctx.rect((x + rightLaneX) * tileSize, (y + laneY) * tileSize, laneLength * tileSize, laneWidth * tileSize);
      ctx.stroke();
    }
  }

  // 3-POINT LINE (THE ARC)
  // Simple approach: just beyond lane, wraps around smoothly
  const arcX = baselineOffset + laneLength + 4; // 4 tiles beyond lane end
  const arcRadius = 15; // Fixed radius that fits most courts
  
  // Only draw if it fits without hitting center
  if (arcX + arcRadius < (isHalfCourt ? width - 5 : width / 2 - 8)) {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    
    // Left arc
    ctx.beginPath();
    ctx.arc(
      (x + arcX) * tileSize,
      (y + height / 2) * tileSize,
      arcRadius * tileSize,
      -Math.PI / 2,
      Math.PI / 2
    );
    ctx.stroke();
  }

  if (!isHalfCourt && arcX + arcRadius < width / 2 - 8) {
    // Right arc
    const rightArcX = width - arcX;
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(
      (x + rightArcX) * tileSize,
      (y + height / 2) * tileSize,
      arcRadius * tileSize,
      Math.PI / 2,
      (3 * Math.PI) / 2
    );
    ctx.stroke();
  }

  // Court border in border color
  ctx.strokeStyle = colors.borderColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(x * tileSize, y * tileSize, width * tileSize, height * tileSize);
}

function drawPickleball(
  ctx: CanvasRenderingContext2D, 
  element: GameElement, 
  tileSize: number,
  colors: { innerColor: string; outerColor: string; kitchenColor: string }
) {
  const { x, y, width, height } = element;
  
  // Outer court
  ctx.fillStyle = colors.outerColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Kitchen/Non-volley zones (7 feet from net)
  const kitchenDepth = Math.min(7, Math.floor(width * 0.16));
  ctx.fillStyle = colors.kitchenColor;
  
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < kitchenDepth; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
      ctx.fillRect((x + width - kitchenDepth + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw lines
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;

  // Center line (net)
  ctx.beginPath();
  ctx.moveTo((x + width / 2) * tileSize, y * tileSize);
  ctx.lineTo((x + width / 2) * tileSize, (y + height) * tileSize);
  ctx.stroke();

  // Kitchen lines
  ctx.beginPath();
  ctx.moveTo((x + kitchenDepth) * tileSize, y * tileSize);
  ctx.lineTo((x + kitchenDepth) * tileSize, (y + height) * tileSize);
  ctx.moveTo((x + width - kitchenDepth) * tileSize, y * tileSize);
  ctx.lineTo((x + width - kitchenDepth) * tileSize, (y + height) * tileSize);
  ctx.stroke();

  // Sidelines and baselines already defined by court bounds
}

function drawTennis(
  ctx: CanvasRenderingContext2D, 
  element: GameElement, 
  tileSize: number,
  colors: { courtColor: string; serviceBoxColor: string }
) {
  const { x, y, width, height } = element;
  
  // Base court
  ctx.fillStyle = colors.courtColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Service boxes (lighter color)
  const serviceDepth = Math.floor(width * 0.27);
  ctx.fillStyle = colors.serviceBoxColor;
  for (let ty = Math.floor(height * 0.2); ty < Math.floor(height * 0.8); ty++) {
    for (let tx = 0; tx < serviceDepth; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
      ctx.fillRect((x + width - serviceDepth + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw lines
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;

  // Center net line
  ctx.beginPath();
  ctx.moveTo((x + width / 2) * tileSize, y * tileSize);
  ctx.lineTo((x + width / 2) * tileSize, (y + height) * tileSize);
  ctx.stroke();

  // Service lines
  ctx.beginPath();
  ctx.moveTo((x + serviceDepth) * tileSize, y * tileSize);
  ctx.lineTo((x + serviceDepth) * tileSize, (y + height) * tileSize);
  ctx.moveTo((x + width - serviceDepth) * tileSize, y * tileSize);
  ctx.lineTo((x + width - serviceDepth) * tileSize, (y + height) * tileSize);
  ctx.stroke();
}

function drawVolleyball(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number, courtColor: string, lineColor: string) {
  const { x, y, width, height } = element;
  
  // Base court
  ctx.fillStyle = courtColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Attack zones (10% darker than court color)
  const attackLine = Math.floor(width * 0.167); // 10 feet from center
  ctx.fillStyle = courtColor; // Keep same color for now
  
  for (let ty = 0; ty < height; ty++) {
    for (let tx = Math.floor(width / 2) - attackLine; tx < Math.floor(width / 2); tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
    for (let tx = Math.floor(width / 2); tx < Math.floor(width / 2) + attackLine; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw lines
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3;

  // Center line (net)
  ctx.beginPath();
  ctx.moveTo((x + width / 2) * tileSize, y * tileSize);
  ctx.lineTo((x + width / 2) * tileSize, (y + height) * tileSize);
  ctx.stroke();

  // Attack lines
  ctx.beginPath();
  ctx.moveTo((x + width / 2 - attackLine) * tileSize, y * tileSize);
  ctx.lineTo((x + width / 2 - attackLine) * tileSize, (y + height) * tileSize);
  ctx.moveTo((x + width / 2 + attackLine) * tileSize, y * tileSize);
  ctx.lineTo((x + width / 2 + attackLine) * tileSize, (y + height) * tileSize);
  ctx.stroke();
}

function drawShuffleboard(
  ctx: CanvasRenderingContext2D, 
  element: GameElement, 
  tileSize: number,
  colors: { courtColor: string; shootingColor: string; borderColor: string }
) {
  const { x, y, width, height } = element;
  
  // Base court
  ctx.fillStyle = colors.courtColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Shooting areas (6.5 feet from each end)
  const shootingDepth = Math.min(Math.floor(width * 0.125), 7);
  ctx.fillStyle = colors.shootingColor;
  
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < shootingDepth; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
      ctx.fillRect((x + width - shootingDepth + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Scoring triangles
  const scoringStart = shootingDepth;
  const scoringLength = Math.floor(width * 0.115);
  
  // Left scoring zone
  ctx.fillStyle = colors.borderColor;
  for (let i = 0; i < 3; i++) {
    const zoneStart = scoringStart + i * Math.floor(scoringLength / 3);
    const zoneEnd = scoringStart + (i + 1) * Math.floor(scoringLength / 3);
    for (let ty = 0; ty < height; ty++) {
      for (let tx = zoneStart; tx < zoneEnd; tx++) {
        if (tx < width / 2) {
          ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
        }
      }
    }
  }

  // Right scoring zone
  for (let i = 0; i < 3; i++) {
    const zoneStart = width - shootingDepth - scoringLength + i * Math.floor(scoringLength / 3);
    const zoneEnd = width - shootingDepth - scoringLength + (i + 1) * Math.floor(scoringLength / 3);
    for (let ty = 0; ty < height; ty++) {
      for (let tx = zoneStart; tx < zoneEnd; tx++) {
        if (tx >= width / 2) {
          ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
        }
      }
    }
  }

  // Draw scoring zone lines
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  
  for (let i = 1; i <= 3; i++) {
    const lineX = scoringStart + i * Math.floor(scoringLength / 3);
    ctx.beginPath();
    ctx.moveTo((x + lineX) * tileSize, y * tileSize);
    ctx.lineTo((x + lineX) * tileSize, (y + height) * tileSize);
    ctx.stroke();

    const lineXRight = width - shootingDepth - scoringLength + i * Math.floor(scoringLength / 3);
    ctx.beginPath();
    ctx.moveTo((x + lineXRight) * tileSize, y * tileSize);
    ctx.lineTo((x + lineXRight) * tileSize, (y + height) * tileSize);
    ctx.stroke();
  }
}

function drawSoccer(
  ctx: CanvasRenderingContext2D, 
  element: GameElement, 
  tileSize: number,
  colors: { fieldColor: string; penaltyBoxColor: string }
) {
  const { x, y, width, height } = element;
  
  // Base field
  ctx.fillStyle = colors.fieldColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Penalty boxes (16 tiles deep, 20 tiles wide)
  const penaltyDepth = Math.min(16, Math.floor(width * 0.2));
  const penaltyWidth = Math.min(20, Math.floor(height * 0.4));
  const penaltyY = Math.floor((height - penaltyWidth) / 2);
  
  ctx.fillStyle = colors.penaltyBoxColor;
  for (let ty = penaltyY; ty < penaltyY + penaltyWidth; ty++) {
    for (let tx = 0; tx < penaltyDepth; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
      ctx.fillRect((x + width - penaltyDepth + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw lines
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;

  // Center line
  const centerTile = Math.floor(width / 2);
  ctx.beginPath();
  ctx.moveTo((x + centerTile) * tileSize, y * tileSize);
  ctx.lineTo((x + centerTile) * tileSize, (y + height) * tileSize);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc((x + centerTile) * tileSize, (y + height / 2) * tileSize, 10 * tileSize, 0, Math.PI * 2);
  ctx.stroke();
}

function drawFutsal(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number, courtColor: string, lineColor: string) {
  const { x, y, width, height } = element;
  
  // Base court
  ctx.fillStyle = courtColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw lines
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;

  // Center line
  const centerTile = Math.floor(width / 2);
  ctx.beginPath();
  ctx.moveTo((x + centerTile) * tileSize, y * tileSize);
  ctx.lineTo((x + centerTile) * tileSize, (y + height) * tileSize);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc((x + centerTile) * tileSize, (y + height / 2) * tileSize, 3 * tileSize, 0, Math.PI * 2);
  ctx.stroke();
}

function drawBattersBox(ctx: CanvasRenderingContext2D, element: GameElement, tileSize: number, boxColor: string) {
  const { x, y, width, height } = element;
  
  // Fill box tiles
  ctx.fillStyle = boxColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Draw border
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 3;
  ctx.strokeRect(x * tileSize, y * tileSize, width * tileSize, height * tileSize);
}

function drawHockey(
  ctx: CanvasRenderingContext2D,
  element: GameElement,
  tileSize: number,
  colors: { iceColor: string; creaseColor: string }
) {
  const { x, y, width, height } = element;
  const isRegulation = element.type === "hockey-regulation";
  
  // Ice surface
  ctx.fillStyle = colors.iceColor;
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < width; tx++) {
      ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
    }
  }

  // Goal creases (semicircles at each end)
  const creaseRadius = isRegulation ? 6 : 4; // Smaller for crease-only rink
  ctx.fillStyle = colors.creaseColor;
  
  // Left crease
  for (let ty = 0; ty < height; ty++) {
    for (let tx = 0; tx < creaseRadius * 2; tx++) {
      const distFromGoal = Math.sqrt(Math.pow(tx - creaseRadius, 2) + Math.pow(ty - height / 2, 2));
      if (distFromGoal <= creaseRadius && tx >= creaseRadius) {
        ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
      }
    }
  }
  
  // Right crease
  for (let ty = 0; ty < height; ty++) {
    for (let tx = width - creaseRadius * 2; tx < width; tx++) {
      const distFromGoal = Math.sqrt(Math.pow(tx - (width - creaseRadius), 2) + Math.pow(ty - height / 2, 2));
      if (distFromGoal <= creaseRadius && tx <= width - creaseRadius) {
        ctx.fillRect((x + tx) * tileSize, (y + ty) * tileSize, tileSize, tileSize);
      }
    }
  }

  if (isRegulation) {
    // Full regulation markings
    // Center red line
    const centerX = Math.floor(width / 2);
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo((x + centerX) * tileSize, y * tileSize);
    ctx.lineTo((x + centerX) * tileSize, (y + height) * tileSize);
    ctx.stroke();

    // Blue lines (zone lines)
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 3;
    const blueLineLeft = Math.floor(width * 0.25);
    const blueLineRight = Math.floor(width * 0.75);
    
    ctx.beginPath();
    ctx.moveTo((x + blueLineLeft) * tileSize, y * tileSize);
    ctx.lineTo((x + blueLineLeft) * tileSize, (y + height) * tileSize);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo((x + blueLineRight) * tileSize, y * tileSize);
    ctx.lineTo((x + blueLineRight) * tileSize, (y + height) * tileSize);
    ctx.stroke();
  } else {
    // Crease only - just center line
    const centerX = Math.floor(width / 2);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo((x + centerX) * tileSize, y * tileSize);
    ctx.lineTo((x + centerX) * tileSize, (y + height) * tileSize);
    ctx.stroke();
  }

  // Goal creases outline (facing toward the center of rink)
  ctx.strokeStyle = "#FF0000";
  ctx.lineWidth = 2;
  // Left crease (opens to the right)
  ctx.beginPath();
  ctx.arc((x + creaseRadius) * tileSize, (y + height / 2) * tileSize, creaseRadius * tileSize, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
  
  // Right crease (opens to the left)
  ctx.beginPath();
  ctx.arc((x + width - creaseRadius) * tileSize, (y + height / 2) * tileSize, creaseRadius * tileSize, Math.PI / 2, (3 * Math.PI) / 2);
  ctx.stroke();
}

