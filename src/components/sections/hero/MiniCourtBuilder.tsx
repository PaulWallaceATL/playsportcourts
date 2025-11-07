"use client";

import * as React from "react";

export function MiniCourtBuilder({ className = "" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const size = 400;
    canvas.width = size;
    canvas.height = size;

    // Animation
    let frame = 0;
    
    const animate = () => {
      frame++;
      
      // Clear
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, size, size);

      // Draw a simple basketball court
      const courtWidth = 300;
      const courtHeight = 200;
      const offsetX = (size - courtWidth) / 2;
      const offsetY = (size - courtHeight) / 2;

      // Court tiles (animated color cycle)
      const tileSize = 20;
      const hue = (frame * 0.5) % 360;
      
      for (let y = 0; y < courtHeight / tileSize; y++) {
        for (let x = 0; x < courtWidth / tileSize; x++) {
          const tileHue = (hue + x * 10 + y * 10) % 360;
          ctx.fillStyle = `hsl(${tileHue}, 70%, 50%)`;
          ctx.fillRect(
            offsetX + x * tileSize,
            offsetY + y * tileSize,
            tileSize - 1,
            tileSize - 1
          );
        }
      }

      // Basketball key (animated)
      const keyWidth = 60;
      const keyHeight = 40;
      const keyX = offsetX + 20;
      const keyY = offsetY + (courtHeight - keyHeight) / 2;
      
      ctx.fillStyle = `hsla(${hue + 180}, 80%, 60%, 0.3)`;
      ctx.fillRect(keyX, keyY, keyWidth, keyHeight);

      // Center circle
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(offsetX + courtWidth / 2, offsetY + courtHeight / 2, 30, 0, Math.PI * 2);
      ctx.stroke();

      // Border
      ctx.strokeStyle = "#00d4ff";
      ctx.lineWidth = 3;
      ctx.strokeRect(offsetX, offsetY, courtWidth, courtHeight);

      // Grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
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

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-xl shadow-2xl"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}

