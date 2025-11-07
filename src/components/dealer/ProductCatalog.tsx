"use client";

import * as React from "react";
import { Check, Star } from "lucide-react";

const TILE_PRODUCTS = [
  {
    id: "core",
    name: "Core Tile",
    price: 5.95,
    priceUnit: "per sq ft",
    description: "Premium interlocking sport court tile with exceptional durability and performance.",
    features: [
      "Superior Impact Absorption",
      "UV Resistant",
      "All-Weather Performance",
      "Easy Installation",
      "10-Year Warranty"
    ],
    colors: ["Black", "Graphite", "Titanium", "Navy Blue", "Royal Blue", "Light Blue", "Emerald Green", "Olive Green", "Bright Red", "Orange", "Yellow"],
    specifications: {
      size: "12&quot; × 12&quot; × 0.75&quot;",
      material: "High-Performance Polypropylene",
      weight: "0.5 lbs per tile",
      coverage: "1 sq ft per tile"
    },
    bestFor: ["Residential Courts", "Light Commercial", "Multi-Sport"]
  },
  {
    id: "true",
    name: "True Tile",
    price: 5.95,
    priceUnit: "per sq ft",
    description: "Professional-grade modular tile engineered for elite performance and longevity.",
    features: [
      "Enhanced Shock Absorption",
      "Superior Drainage System",
      "UV & Weather Resistant",
      "Professional Grade",
      "15-Year Warranty"
    ],
    colors: ["Black", "Graphite", "Titanium", "Navy Blue", "Royal Blue", "Light Blue", "Emerald Green", "Olive Green", "Bright Red", "Orange", "Yellow"],
    specifications: {
      size: "12&quot; × 12&quot; × 0.875&quot;",
      material: "Advanced Copolymer Blend",
      weight: "0.6 lbs per tile",
      coverage: "1 sq ft per tile"
    },
    bestFor: ["Commercial Facilities", "High-Traffic Areas", "Professional Courts"]
  },
  {
    id: "x",
    name: "X Tile",
    price: 7.50,
    priceUnit: "per sq ft",
    description: "Ultimate performance tile with revolutionary design for championship-level play.",
    features: [
      "Maximum Shock Absorption",
      "Advanced Lateral Forgiveness",
      "Pro-Level Ball Response",
      "Tournament Certified",
      "Lifetime Warranty"
    ],
    colors: ["Black", "Graphite", "Titanium", "Navy Blue", "Royal Blue", "Light Blue", "Emerald Green", "Olive Green", "Bright Red", "Orange", "Yellow"],
    specifications: {
      size: "12&quot; × 12&quot; × 1&quot;",
      material: "Premium Performance Composite",
      weight: "0.7 lbs per tile",
      coverage: "1 sq ft per tile"
    },
    bestFor: ["Tournament Venues", "Elite Athletes", "Maximum Performance"]
  }
];

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

export function ProductCatalog() {
  const [selectedProducts, setSelectedProducts] = React.useState<Record<string, string>>({});

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {TILE_PRODUCTS.map((product) => {
          const selectedColor = selectedProducts[product.id] || product.colors[0];
          
          return (
            <div
              key={product.id}
              className="card-premium hover:scale-[1.02] transition-all"
            >
              {/* Product Image/Color Preview */}
              <div className="relative aspect-square bg-gradient-to-br from-white/5 to-white/10 rounded-lg overflow-hidden mb-6">
                <div 
                  className="absolute inset-0 transition-colors"
                  style={{ backgroundColor: COLOR_MAP[selectedColor] }}
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-gradient-primary text-black text-sm font-bold">
                    ${product.price}
                  </div>
                </div>
                {product.id === "x" && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/50">
                      <Star className="w-3 h-3 text-[var(--brand-accent)] fill-[var(--brand-accent)]" />
                      <span className="text-xs font-bold text-[var(--brand-accent)]">PRO</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="heading-3 mb-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-gradient-hero">${product.price}</span>
                    <span className="text-sm text-muted-foreground">{product.priceUnit}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                {/* Features */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">Features</div>
                  <ul className="space-y-1.5">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-[var(--brand-primary)] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">Specifications</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-muted-foreground">Size</div>
                      <div className="font-semibold">{product.specifications.size}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Weight</div>
                      <div className="font-semibold">{product.specifications.weight}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-muted-foreground">Material</div>
                      <div className="font-semibold">{product.specifications.material}</div>
                    </div>
                  </div>
                </div>

                {/* Best For */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">Best For</div>
                  <div className="flex flex-wrap gap-2">
                    {product.bestFor.map((use, idx) => (
                      <span key={idx} className="sport-badge text-xs">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                    Available Colors ({product.colors.length})
                  </div>
                  <div className="grid grid-cols-11 gap-1.5 mb-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedProducts({ ...selectedProducts, [product.id]: color })}
                        className={`aspect-square rounded border-2 transition-all hover:scale-110 ${
                          selectedColor === color
                            ? "border-[var(--brand-primary)] shadow-neon-blue scale-110"
                            : "border-border"
                        }`}
                        style={{ background: COLOR_MAP[color] }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <div className="flex items-center justify-center">
                            <Check className="w-3 h-3 text-white drop-shadow-lg" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedColor}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="card-premium">
        <h2 className="heading-2 mb-6">Product Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-semibold">Feature</th>
                <th className="text-center p-4 text-sm font-semibold">Core</th>
                <th className="text-center p-4 text-sm font-semibold">True</th>
                <th className="text-center p-4 text-sm font-semibold">X</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/10">
                <td className="p-4">Price per sq ft</td>
                <td className="text-center p-4 font-bold">$5.95</td>
                <td className="text-center p-4 font-bold">$5.95</td>
                <td className="text-center p-4 font-bold text-[var(--brand-accent)]">$7.50</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Thickness</td>
                <td className="text-center p-4">0.75"</td>
                <td className="text-center p-4">0.875"</td>
                <td className="text-center p-4 font-bold">1"</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Warranty</td>
                <td className="text-center p-4">10 Years</td>
                <td className="text-center p-4">15 Years</td>
                <td className="text-center p-4 font-bold">Lifetime</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Impact Absorption</td>
                <td className="text-center p-4">Good</td>
                <td className="text-center p-4">Better</td>
                <td className="text-center p-4 font-bold text-[var(--brand-accent)]">Best</td>
              </tr>
              <tr>
                <td className="p-4">Ideal Use</td>
                <td className="text-center p-4">Residential</td>
                <td className="text-center p-4">Commercial</td>
                <td className="text-center p-4 font-bold">Tournament</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
