"use client";

import * as React from "react";
import { Maximize2, Minimize2 } from "lucide-react";

interface CourtVisualizerProps {
  courtLength: number; // in feet
  courtWidth: number; // in feet
  gameLines: string[];
  // Color props for different sports
  pickleballInnerCourtColor?: string;
  pickleballOuterCourtColor?: string;
  pickleballKitchenColor?: string;
  basketballCourtColor?: string;
  basketballLaneColor?: string;
  basketballBorderColor?: string;
  shuffleboardCourtColor?: string;
  shuffleboardShootingAreaColor?: string;
  shuffleboardBorderColor?: string;
  linePaintingColor?: string;
}

// Color mapping
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

export function CourtVisualizer({
  courtLength,
  courtWidth,
  gameLines,
  pickleballInnerCourtColor = "Royal Blue",
  pickleballOuterCourtColor = "Emerald Green",
  pickleballKitchenColor = "Navy Blue",
  basketballCourtColor = "Navy Blue",
  basketballLaneColor = "Royal Blue",
  basketballBorderColor = "Orange",
  shuffleboardCourtColor = "Black",
  shuffleboardShootingAreaColor = "Royal Blue",
  shuffleboardBorderColor = "Yellow",
  linePaintingColor = "White",
}: CourtVisualizerProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Determine primary sport type
  const hasPickleball = gameLines.some(line => 
    ["Pickleball", "Tennis - Full Court", "Tennis - Reduced", "Volleyball"].includes(line)
  );
  const hasBasketball = gameLines.some(line => 
    ["Basketball - Full", "Basketball - Half"].includes(line)
  );
  const hasShuffleboard = gameLines.some(line => 
    ["Shuffleboard - Single", "Shuffleboard - Double"].includes(line)
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || courtLength === 0 || courtWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const maxWidth = isFullscreen ? 1200 : 800;
    const maxHeight = isFullscreen ? 800 : 500;
    
    // Calculate scale to fit the court
    const scale = Math.min(
      maxWidth / courtLength,
      maxHeight / courtWidth
    ) * 0.9; // 90% to leave some padding

    canvas.width = maxWidth;
    canvas.height = maxHeight;

    // Center the court
    const courtPixelWidth = courtLength * scale;
    const courtPixelHeight = courtWidth * scale;
    const offsetX = (maxWidth - courtPixelWidth) / 2;
    const offsetY = (maxHeight - courtPixelHeight) / 2;

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid background (tiles)
    ctx.save();
    ctx.translate(offsetX, offsetY);

    // Calculate number of tiles (each tile is 1ft x 1ft / 12" x 12")
    const tilesX = Math.ceil(courtLength);
    const tilesY = Math.ceil(courtWidth);
    const tileSize = scale; // Each tile is scale pixels

    // Draw base court color based on sport
    let baseColor = COLOR_MAP[pickleballOuterCourtColor];
    if (hasBasketball && !hasPickleball) {
      baseColor = COLOR_MAP[basketballCourtColor];
    } else if (hasShuffleboard && !hasPickleball && !hasBasketball) {
      baseColor = COLOR_MAP[shuffleboardCourtColor];
    }

    // Fill entire court with base color
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, courtPixelWidth, courtPixelHeight);

    // Draw tile grid lines (subtle)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
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

    // Draw sport-specific markings
    if (hasPickleball) {
      drawPickleballCourt(ctx, courtPixelWidth, courtPixelHeight, {
        innerColor: COLOR_MAP[pickleballInnerCourtColor],
        outerColor: COLOR_MAP[pickleballOuterCourtColor],
        kitchenColor: COLOR_MAP[pickleballKitchenColor],
        lineColor: linePaintingColor === "White" ? "#ffffff" : COLOR_MAP[linePaintingColor] || "#ffffff",
      });
    }

    if (hasBasketball) {
      drawBasketballCourt(ctx, courtPixelWidth, courtPixelHeight, {
        courtColor: COLOR_MAP[basketballCourtColor],
        laneColor: COLOR_MAP[basketballLaneColor],
        borderColor: COLOR_MAP[basketballBorderColor],
        lineColor: linePaintingColor === "White" ? "#ffffff" : COLOR_MAP[linePaintingColor] || "#ffffff",
      });
    }

    if (hasShuffleboard) {
      drawShuffleboardCourt(ctx, courtPixelWidth, courtPixelHeight, {
        courtColor: COLOR_MAP[shuffleboardCourtColor],
        shootingColor: COLOR_MAP[shuffleboardShootingAreaColor],
        borderColor: COLOR_MAP[shuffleboardBorderColor],
        lineColor: linePaintingColor === "White" ? "#ffffff" : COLOR_MAP[linePaintingColor] || "#ffffff",
      });
    }

    // Draw other game lines
    drawOtherGameLines(ctx, courtPixelWidth, courtPixelHeight, gameLines, 
      linePaintingColor === "White" ? "#ffffff" : COLOR_MAP[linePaintingColor] || "#ffffff"
    );

    // Draw border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, courtPixelWidth, courtPixelHeight);

    ctx.restore();

    // Draw dimensions
    ctx.fillStyle = "#60A5FA";
    ctx.font = "14px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(
      `${courtLength} ft`,
      offsetX + courtPixelWidth / 2,
      offsetY - 10
    );
    ctx.save();
    ctx.translate(offsetX - 20, offsetY + courtPixelHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${courtWidth} ft`, 0, 0);
    ctx.restore();

    // Draw square footage
    ctx.font = "16px system-ui";
    ctx.fillStyle = "#F97316";
    ctx.textAlign = "left";
    ctx.fillText(
      `${(courtLength * courtWidth).toLocaleString()} sq ft (${tilesX * tilesY} tiles)`,
      20,
      30
    );

  }, [
    courtLength,
    courtWidth,
    gameLines,
    pickleballInnerCourtColor,
    pickleballOuterCourtColor,
    pickleballKitchenColor,
    basketballCourtColor,
    basketballLaneColor,
    basketballBorderColor,
    shuffleboardCourtColor,
    shuffleboardShootingAreaColor,
    shuffleboardBorderColor,
    linePaintingColor,
    isFullscreen,
    hasPickleball,
    hasBasketball,
    hasShuffleboard,
  ]);

  if (courtLength === 0 || courtWidth === 0) {
    return (
      <div className="card-premium flex items-center justify-center min-h-[300px]">
        <div className="text-center text-muted-foreground">
          <p className="text-lg mb-2">Court Preview</p>
          <p className="text-sm">Enter court dimensions to see live preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-premium">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Live Court Preview</h3>
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
      <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-border">
        <canvas
          ref={canvasRef}
          className="w-full h-auto pointer-events-none"
          style={{ maxWidth: "100%", touchAction: "none" }}
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

// Helper functions to draw specific court types
function drawPickleballCourt(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: { innerColor: string; outerColor: string; kitchenColor: string; lineColor: string }
) {
  const standardWidth = 20; // 20 feet wide
  const standardLength = 44; // 44 feet long
  const scale = Math.min(width / standardLength, height / standardWidth);

  const courtWidth = standardWidth * scale;
  const courtLength = standardLength * scale;
  const offsetX = (width - courtLength) / 2;
  const offsetY = (height - courtWidth) / 2;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Inner court (playing area)
  ctx.fillStyle = colors.innerColor;
  ctx.fillRect(0, 0, courtLength, courtWidth);

  // Kitchen/Non-volley zones
  const kitchenDepth = 7 * scale; // 7 feet from net
  ctx.fillStyle = colors.kitchenColor;
  ctx.fillRect(0, 0, kitchenDepth, courtWidth);
  ctx.fillRect(courtLength - kitchenDepth, 0, kitchenDepth, courtWidth);

  // Draw lines
  ctx.strokeStyle = colors.lineColor;
  ctx.lineWidth = 2;

  // Centerline
  ctx.beginPath();
  ctx.moveTo(courtLength / 2, 0);
  ctx.lineTo(courtLength / 2, courtWidth);
  ctx.stroke();

  // Service boxes
  ctx.beginPath();
  ctx.moveTo(0, courtWidth / 2);
  ctx.lineTo(courtLength, courtWidth / 2);
  ctx.stroke();

  // Kitchen lines
  ctx.beginPath();
  ctx.moveTo(kitchenDepth, 0);
  ctx.lineTo(kitchenDepth, courtWidth);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(courtLength - kitchenDepth, 0);
  ctx.lineTo(courtLength - kitchenDepth, courtWidth);
  ctx.stroke();

  // Outer boundary
  ctx.strokeRect(0, 0, courtLength, courtWidth);

  ctx.restore();
}

function drawBasketballCourt(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: { courtColor: string; laneColor: string; borderColor: string; lineColor: string }
) {
  const standardWidth = 50; // 50 feet wide (full court)
  const standardLength = 94; // 94 feet long (full court)
  const scale = Math.min(width / standardLength, height / standardWidth) * 0.9;

  const courtWidth = standardWidth * scale;
  const courtLength = standardLength * scale;
  const offsetX = (width - courtLength) / 2;
  const offsetY = (height - courtWidth) / 2;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Main court
  ctx.fillStyle = colors.courtColor;
  ctx.fillRect(0, 0, courtLength, courtWidth);

  // Paint/Lane areas
  const laneWidth = 12 * scale;
  const laneLength = 19 * scale;
  ctx.fillStyle = colors.laneColor;
  ctx.fillRect(0, (courtWidth - laneWidth) / 2, laneLength, laneWidth);
  ctx.fillRect(courtLength - laneLength, (courtWidth - laneWidth) / 2, laneLength, laneWidth);

  // Draw lines
  ctx.strokeStyle = colors.lineColor;
  ctx.lineWidth = 2;

  // Centerline
  ctx.beginPath();
  ctx.moveTo(courtLength / 2, 0);
  ctx.lineTo(courtLength / 2, courtWidth);
  ctx.stroke();

  // Center circle
  const centerRadius = 6 * scale;
  ctx.beginPath();
  ctx.arc(courtLength / 2, courtWidth / 2, centerRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Free throw circles
  const freeThrowRadius = 6 * scale;
  ctx.beginPath();
  ctx.arc(laneLength, courtWidth / 2, freeThrowRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(courtLength - laneLength, courtWidth / 2, freeThrowRadius, 0, Math.PI * 2);
  ctx.stroke();

  // 3-point lines (simplified)
  const threePointRadius = 23.75 * scale;
  ctx.beginPath();
  ctx.arc(0, courtWidth / 2, threePointRadius, -Math.PI / 2.5, Math.PI / 2.5);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(courtLength, courtWidth / 2, threePointRadius, Math.PI - Math.PI / 2.5, Math.PI + Math.PI / 2.5);
  ctx.stroke();

  // Outer boundary
  ctx.strokeStyle = colors.borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, courtLength, courtWidth);

  ctx.restore();
}

function drawShuffleboardCourt(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: { courtColor: string; shootingColor: string; borderColor: string; lineColor: string }
) {
  const standardWidth = 6; // 6 feet wide
  const standardLength = 52; // 52 feet long
  const scale = Math.min(width / standardLength, height / standardWidth);

  const courtWidth = standardWidth * scale;
  const courtLength = standardLength * scale;
  const offsetX = (width - courtLength) / 2;
  const offsetY = (height - courtWidth) / 2;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Main court
  ctx.fillStyle = colors.courtColor;
  ctx.fillRect(0, 0, courtLength, courtWidth);

  // Shooting areas
  const shootingLength = 6.5 * scale;
  ctx.fillStyle = colors.shootingColor;
  ctx.fillRect(0, 0, shootingLength, courtWidth);
  ctx.fillRect(courtLength - shootingLength, 0, shootingLength, courtWidth);

  // Draw scoring triangles (simplified)
  ctx.strokeStyle = colors.lineColor;
  ctx.lineWidth = 2;

  // Scoring zones
  const scoringStart = 6.5 * scale;
  const scoringLength = 6 * scale;

  for (let i = 0; i < 3; i++) {
    const x = scoringStart + i * (scoringLength / 3);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, courtWidth);
    ctx.stroke();

    const xEnd = scoringStart + scoringLength - i * (scoringLength / 3);
    ctx.beginPath();
    ctx.moveTo(courtLength - xEnd, 0);
    ctx.lineTo(courtLength - xEnd, courtWidth);
    ctx.stroke();
  }

  // Border
  ctx.strokeStyle = colors.borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, courtLength, courtWidth);

  ctx.restore();
}

function drawOtherGameLines(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gameLines: string[],
  lineColor: string
) {
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);

  // Draw simplified markings for other sports
  if (gameLines.includes("Volleyball")) {
    // Volleyball net line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
  }

  if (gameLines.includes("Badminton")) {
    // Badminton court (simplified)
    const courtWidth = Math.min(width, height) * 0.3;
    const courtLength = Math.min(width, height) * 0.6;
    const x = (width - courtLength) / 2;
    const y = (height - courtWidth) / 2;
    ctx.strokeRect(x, y, courtLength, courtWidth);
  }

  ctx.setLineDash([]);
}

