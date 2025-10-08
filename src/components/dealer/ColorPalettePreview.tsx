"use client";
import * as React from "react";

export function ColorPalettePreview({ colors = [] as string[] }) {
  const palette = colors.length ? colors : ["#0a0a0a","#6b7280","#1e3a8a","#2563eb","#dc2626","#16a34a","#eab308","#ffffff"];
  return (
    <div className="grid grid-cols-8 gap-1">
      {palette.map((c, i) => (
        <span key={i} title={c} className="h-5 w-5 rounded-full border" style={{ background: c, borderColor: "rgba(255,255,255,0.2)" }} />
      ))}
    </div>
  );
}
