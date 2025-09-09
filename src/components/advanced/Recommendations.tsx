"use client";

import * as React from "react";
import Link from "next/link";
import { TileProduct } from "@/types";

export interface RecommendInput {
  primarySport: string;
  surface: "concrete" | "asphalt" | "indoors" | "unknown";
  budget: "value" | "balanced" | "premium";
  noiseSensitive?: boolean;
  lowMaintenance?: boolean;
}

function score(product: TileProduct, input: RecommendInput): number {
  let s = 0;
  if (product.compatibleSports.includes(input.primarySport)) s += 5;
  if (input.budget === "premium" && product.price > 6) s += 2;
  if (input.budget === "value" && product.price <= 5) s += 2;
  if (input.lowMaintenance) s += product.specs.features.some(f => /maintenance|durab|uv|drain/i.test(f)) ? 1 : 0;
  if (input.surface === "indoors" && product.kind === "garage") s += 1;
  return s;
}

export function Recommendations({
  products,
  input,
  limit = 3,
}: {
  products: TileProduct[];
  input: RecommendInput;
  limit?: number;
}) {
  const ranked = React.useMemo(() =>
    [...products]
      .map(p => ({ p, s: score(p, input) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, limit), [products, input, limit]);

  return (
    <div className="glass-card p-6">
      <h3 className="heading-3">Recommended for you</h3>
      <p className="text-sm text-muted-foreground mt-1">Based on sport, budget, and upkeep preferences.</p>
      <ul className="mt-4 grid gap-3">
        {ranked.map(({ p }) => (
          <li key={p.slug} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">${p.price.toFixed(2)} {p.pricePerUnitLabel}</p>
            </div>
            <Link className="text-sm underline hover:text-[var(--primary)]" href={`/${p.kind === "garage" ? "garage-tiles" : "court-tiles"}/${p.slug}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


