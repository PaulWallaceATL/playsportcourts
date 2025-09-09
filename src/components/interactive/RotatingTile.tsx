"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RotatingTileProps {
  className?: string;
  size?: number; // px
}

export function RotatingTile({ className, size = 220 }: RotatingTileProps) {
  return (
    <div
      className={cn("relative mx-auto", className)}
      style={{ width: size, height: size, perspective: 900 }}
      aria-hidden
    >
      <div
        className="relative h-full w-full rounded-md"
        style={{
          transformStyle: "preserve-3d",
          animation: "tile-rotate 14s linear infinite",
        }}
      >
        {/* Top surface */}
        <div
          className="absolute inset-0 rounded-md border"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 18%, #000) 0%, rgba(255,255,255,0.06) 100%)",
            borderColor: "rgba(255,255,255,0.15)",
            transform: "rotateX(12deg) rotateY(-24deg) translateZ(18px)",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        />
        {/* Edge */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            transform: "rotateX(12deg) rotateY(-24deg)",
            boxShadow: "0 0 0 18px rgba(0,0,0,0.2) inset",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.25))",
            filter: "blur(0.2px)",
          }}
        />
        {/* Base shadow */}
        <div
          className="absolute -bottom-8 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0.45), transparent 70%)",
            transform: "translateZ(0)",
            filter: "blur(8px)",
          }}
        />
      </div>
    </div>
  );
}


