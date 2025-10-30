"use client";

import * as React from "react";
import { PRODUCT_CATALOG, ProductId } from "@/lib/stripe";
import { Plus, Check, Info } from "lucide-react";

interface ProductCatalogProps {
  onAddToCart: (productId: ProductId, color: string, quantity: number) => void;
}

export function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  const [quantities, setQuantities] = React.useState<Record<string, number>>({});
  const [selectedColors, setSelectedColors] = React.useState<Record<string, string>>({});
  const [addedItems, setAddedItems] = React.useState<Set<string>>(new Set());

  const handleAddToCart = (productId: ProductId) => {
    const quantity = quantities[productId] || 100;
    const color = selectedColors[productId] || PRODUCT_CATALOG[productId].colors[0];
    
    onAddToCart(productId, color, quantity);
    
    // Show success animation
    setAddedItems(prev => new Set(prev).add(productId));
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 2000);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(PRODUCT_CATALOG).map(([id, product]) => {
        const productId = id as ProductId;
        const isAdded = addedItems.has(productId);
        
        return (
          <div
            key={id}
            className="glass-dark rounded-xl overflow-hidden hover-lift transition-all group"
          >
            {/* Product Image Placeholder */}
            <div className="relative aspect-video bg-gradient-primary overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <div className="text-6xl font-bold">{product.name.charAt(0)}</div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="sport-badge glass-dark">{product.features[0]}</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="mb-3">
                <h3 className="heading-3 mb-1">{product.name}</h3>
                <p className="text-caption text-muted-foreground">{product.description}</p>
              </div>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gradient-hero">
                  ${product.pricePerSqFt}
                </span>
                <span className="text-caption">per sq ft</span>
              </div>

              {/* Features */}
              <div className="mb-4 flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span key={feature} className="sport-badge text-xs">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Color Selection */}
              <div className="mb-4">
                <label className="text-caption block mb-2">Select Color</label>
                <div className="grid grid-cols-6 gap-2">
                  {product.colors.map((color, idx) => {
                    const isSelected = selectedColors[productId] === color;
                    const colorMap: Record<number, string> = {
                      0: "hsl(220, 80%, 50%)", // Blue
                      1: "hsl(0, 80%, 50%)",   // Red
                      2: "hsl(140, 60%, 40%)", // Green
                      3: "hsl(0, 0%, 15%)",    // Black
                      4: "hsl(0, 0%, 95%)",    // White
                      5: "hsl(30, 90%, 55%)",  // Orange
                    };
                    
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColors({ ...selectedColors, [productId]: color })}
                        className={`relative aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                          isSelected ? "border-[var(--brand-primary)] shadow-neon-blue" : "border-border"
                        }`}
                        style={{ background: colorMap[idx] }}
                        title={color}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white drop-shadow-lg" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedColors[productId] || product.colors[0]}
                </p>
              </div>

              {/* Quantity Input */}
              <div className="mb-4">
                <label className="text-caption block mb-2">Square Feet</label>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={quantities[productId] || 100}
                  onChange={(e) => setQuantities({ ...quantities, [productId]: parseInt(e.target.value) || 0 })}
                  className="field-input w-full"
                  placeholder="100"
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(productId)}
                disabled={isAdded}
                className={`btn-neon glass-dark rounded-lg px-4 py-3 w-full text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  isAdded ? "bg-emerald-500/20 border-emerald-500/40" : ""
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

