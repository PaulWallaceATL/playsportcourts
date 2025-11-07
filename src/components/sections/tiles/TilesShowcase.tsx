"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Star } from "lucide-react";

const TILES = [
  {
    id: "core",
    name: "Core",
    price: 5.95,
    thickness: "0.75\"",
    warranty: "10 Years",
    description: "Premium performance for residential courts",
    features: ["Impact Absorption", "UV Resistant", "Easy Install"],
  },
  {
    id: "true",
    name: "True",
    price: 5.95,
    thickness: "0.875\"",
    warranty: "15 Years",
    description: "Professional grade for commercial use",
    features: ["Shock Absorption", "Superior Drainage", "Pro Grade"],
  },
  {
    id: "x",
    name: "X",
    price: 7.50,
    thickness: "1\"",
    warranty: "Lifetime",
    description: "Ultimate performance for elite athletes",
    features: ["Maximum Absorption", "Tournament Certified", "Pro Response"],
    isPro: true,
  },
];

const COLORS = [
  { name: "Graphite", hex: "#2C2C2C" },
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Orange", hex: "#F97316" },
];

export function TilesShowcase() {
  const [selectedColors, setSelectedColors] = React.useState<Record<string, string>>({
    core: COLORS[0].hex,
    true: COLORS[0].hex,
    x: COLORS[1].hex,
  });

  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <div className="text-center mb-12">
        <h2 className="heading-2 text-gradient-hero mb-3">Our Court Tiles</h2>
        <p className="text-body text-muted-foreground max-w-2xl mx-auto">
          Premium 12" × 12" modular tiles. Choose your performance level.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        {TILES.map((tile) => {
          const currentColor = selectedColors[tile.id];
          
          return (
            <div key={tile.id} className="card-premium group hover:scale-[1.02] transition-all">
              {/* Color Preview */}
              <div className="relative aspect-square rounded-lg overflow-hidden mb-6">
                <div 
                  className="absolute inset-0 transition-all duration-500"
                  style={{ backgroundColor: currentColor }}
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDAgTCA0MCAwIEwgNDAgNDAgTCAwIDQwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-40" />
                
                {tile.isPro && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-[var(--brand-accent)]/50">
                      <Star className="w-3.5 h-3.5 text-[var(--brand-accent)] fill-[var(--brand-accent)]" />
                      <span className="text-xs font-bold text-[var(--brand-accent)]">PRO</span>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 right-4">
                  <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-white/20">
                    <span className="text-2xl font-bold text-gradient-hero">${tile.price}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="heading-3 mb-1">{tile.name} Tile</h3>
                  <p className="text-sm text-muted-foreground">{tile.description}</p>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Thickness: </span>
                    <span className="font-semibold">{tile.thickness}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Warranty: </span>
                    <span className="font-semibold">{tile.warranty}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-1.5">
                  {tile.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Color Selector */}
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Select Color</div>
                  <div className="flex gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColors(prev => ({ ...prev, [tile.id]: color.hex }))}
                        className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                          currentColor === color.hex
                            ? "border-white shadow-neon-blue"
                            : "border-border"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/dealer-portal"
                  className="btn-premium-primary w-full flex items-center justify-center gap-2 text-sm"
                >
                  Order {tile.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

