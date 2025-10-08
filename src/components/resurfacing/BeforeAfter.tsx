"use client";
import * as React from "react";

interface BeforeAfterProps { before: string; after: string; }

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [pos, setPos] = React.useState(50);
  return (
    <div className="relative overflow-hidden rounded-xl shadow-layered">
      <img src={after} alt="After" className="block w-full h-auto" />
      <div className="absolute inset-0" style={{ width: `${pos}%`, overflow: "hidden" }}>
        <img src={before} alt="Before" className="block w-full h-auto" />
      </div>
      <input aria-label="Slide to compare" type="range" min={0} max={100} value={pos} onChange={(e)=>setPos(parseInt(e.target.value))} className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/2" />
    </div>
  );
}


