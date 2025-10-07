"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { RotatingTile } from "@/components/interactive/RotatingTile";

const ThreeTile = dynamic(() => import("@/components/interactive/ThreeTile").then(m => m.ThreeTile), { ssr: false });

interface HeroTileProps {
  className?: string;
}

export function HeroTile({ className }: HeroTileProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [supportsMotion, setSupportsMotion] = React.useState(true);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [parallaxY] = React.useState(0);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSupportsMotion(!mq.matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onPointerMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || !supportsMotion) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
    // Move glow hotspot
    el.style.setProperty("--mx", `${Math.max(0, Math.min(100, (px + 0.5) * 100))}%`);
    el.style.setProperty("--my", `${Math.max(0, Math.min(100, (py + 0.5) * 100))}%`);
  }

  function onPointerLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("relative select-none will-transform", className)}
      style={{
        transform: `perspective(1000px) translateY(${parallaxY}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 300ms ease",
      }}
      aria-hidden
    >
      {/* Subtle glow & cursor hotspot */}
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-neon-blue" />
      <div
        className="pointer-events-none absolute -inset-6 rounded-2xl"
        style={{
          background:
            "radial-gradient(220px 120px at var(--mx,50%) var(--my,50%), rgba(0,212,255,0.18), transparent 60%)",
          filter: "blur(8px)",
          opacity: 0.8,
        }}
      />
      {/* 3D tile or lightweight fallback */}
      <div className="relative" style={{ height: 220 }}>
        {isVisible ? <ThreeTile height={220} /> : <RotatingTile size={220} />}
      </div>
    </div>
  );
}


