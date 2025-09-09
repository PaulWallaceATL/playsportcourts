"use client";

import * as React from "react";

export interface CostCalculatorProps {
  basePrice: number; // per sq ft or per tile
}

export function CostCalculator({ basePrice }: CostCalculatorProps) {
  const [length, setLength] = React.useState(30);
  const [width, setWidth] = React.useState(50);
  const [paintLines, setPaintLines] = React.useState(false);
  const [logo, setLogo] = React.useState(false);
  const area = length * width;
  const accessories = (paintLines ? 0.35 : 0) + (logo ? 0.6 : 0);
  const price = (basePrice + accessories) * area;
  const low = price * 0.9;
  const high = price * 1.15;

  return (
    <div className="glass-card p-6">
      <h3 className="heading-3">Cost Calculator</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">Length (ft)
          <input type="number" className="w-full mt-1 input" value={length} onChange={(e) => setLength(parseFloat(e.target.value || "0"))} />
        </label>
        <label className="text-sm">Width (ft)
          <input type="number" className="w-full mt-1 input" value={width} onChange={(e) => setWidth(parseFloat(e.target.value || "0"))} />
        </label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={paintLines} onChange={(e) => setPaintLines(e.target.checked)} /> Court lines</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={logo} onChange={(e) => setLogo(e.target.checked)} /> Custom logo</label>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">Estimated materials</p>
        <p className="text-lg font-semibold">${low.toLocaleString()} – ${high.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground mt-1">Estimate based on {area.toLocaleString()} sq ft at ${(basePrice + accessories).toFixed(2)}/sq ft. Labor, base prep, taxes, and shipping excluded.</p>
      </div>
    </div>
  );
}


