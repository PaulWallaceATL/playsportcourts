"use client";

import * as React from "react";
import { X, FileText, Download, Printer } from "lucide-react";

interface TileBreakdown {
  color: string;
  quantity: number;
  pricePerTile: number;
  total: number;
}

interface OrderSummaryProps {
  formData: {
    dealerName: string;
    projectName: string;
    phone: string;
    shippingOption: "address" | "pickup";
    shippingAddress: string;
    tileType: string;
    baseTileColor: string;
    courtLength: string;
    courtWidth: string;
    gameLines: string[];
    linePainting: boolean;
    linePaintingColor: string;
    rampsNeeded: boolean;
    rampsColor: string;
    rampsPriority: boolean;
    logoUpload: boolean;
    logoHeight: string;
    logoWidth: string;
    basketballOverhang?: string;
    pickleballInnerCourtColor: string;
    pickleballOuterCourtColor: string;
    pickleballKitchenColor: string;
    basketballCourtColor: string;
    basketballLaneColor: string;
    basketballBorderColor: string;
    shuffleboardCourtColor: string;
    shuffleboardShootingAreaColor: string;
    shuffleboardBorderColor: string;
  };
  pricing: {
    basePrice: number;
    linePaintingCost: number;
    rampsCost: number;
    total: number;
  };
  squareFeet: number;
  onClose: () => void;
}

const TILE_PRICES = {
  core: 5.95,
  true: 5.95,
  x: 7.5,
};

export function OrderSummary({ formData, pricing, squareFeet, onClose }: OrderSummaryProps) {
  const totalTiles = Math.ceil(squareFeet);
  const tilePrice = TILE_PRICES[formData.tileType as keyof typeof TILE_PRICES];

  // Calculate tile breakdown by color
  const tileBreakdown = React.useMemo(() => {
    const breakdown: Record<string, number> = {};
    
    // Base tiles
    breakdown[formData.baseTileColor] = (breakdown[formData.baseTileColor] || 0) + totalTiles;

    // Sport-specific color tiles would override some base tiles
    // For simplicity, we're showing the breakdown as configured
    // In a real system, you'd calculate exact tile counts per color zone

    // Convert to array and calculate totals
    return Object.entries(breakdown).map(([color, quantity]) => ({
      color,
      quantity,
      pricePerTile: tilePrice,
      total: quantity * tilePrice,
    }));
  }, [formData.baseTileColor, totalTiles, tilePrice]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text summary
    const summary = generateTextSummary();
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `order-summary-${formData.projectName.replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateTextSummary = () => {
    return `
PLAYSPORT COURTS - ORDER SUMMARY
================================

PROJECT INFORMATION
-------------------
Dealer: ${formData.dealerName}
Project Name: ${formData.projectName}
Phone: ${formData.phone}
Shipping: ${formData.shippingOption === "address" ? `Ship to Address\n${formData.shippingAddress}` : "Warehouse Pickup"}

COURT SPECIFICATIONS
--------------------
Tile Type: ${formData.tileType.toUpperCase()}
Base Tile Color: ${formData.baseTileColor}
Dimensions: ${formData.courtLength} ft × ${formData.courtWidth} ft
Total Area: ${squareFeet.toLocaleString()} sq ft
Total Tiles: ${totalTiles.toLocaleString()} tiles (12" × 12")

TILE BREAKDOWN
--------------
${tileBreakdown.map(tile => `${tile.color}: ${tile.quantity} tiles @ $${tile.pricePerTile}/tile = $${tile.total.toFixed(2)}`).join('\n')}

GAME LINES
----------
${formData.gameLines.length > 0 ? formData.gameLines.map(line => `• ${line}`).join('\n') : 'None selected'}

OPTIONAL ADD-ONS
----------------
${formData.linePainting ? `✓ Line Painting (${formData.linePaintingColor}) - $${pricing.linePaintingCost.toFixed(2)}` : '✗ Line Painting'}
${formData.rampsNeeded ? `✓ Ramps & Corners (${formData.rampsColor})${formData.rampsPriority ? ' - Priority' : ''} - $${pricing.rampsCost.toFixed(2)}` : '✗ Ramps & Corners'}
${formData.logoUpload ? `✓ Custom Logo (${formData.logoHeight}" × ${formData.logoWidth}")` : '✗ Custom Logo'}

SPORT-SPECIFIC COLORS
---------------------
${formData.gameLines.some(l => ["Pickleball", "Tennis - Full Court", "Tennis - Reduced", "Volleyball"].includes(l)) ? `
Pickleball/Tennis/Volleyball:
  • Inner Court: ${formData.pickleballInnerCourtColor}
  • Outer Court: ${formData.pickleballOuterCourtColor}
  • Kitchen: ${formData.pickleballKitchenColor}
` : ''}
${formData.gameLines.some(l => ["Basketball - Full", "Basketball - Half"].includes(l)) ? `
Basketball:
  • Court: ${formData.basketballCourtColor}
  • Lane: ${formData.basketballLaneColor}
  • Border: ${formData.basketballBorderColor}
  ${formData.basketballOverhang ? `• Backboard Overhang: ${formData.basketballOverhang} ft` : ''}
` : ''}
${formData.gameLines.some(l => ["Shuffleboard - Single", "Shuffleboard - Double"].includes(l)) ? `
Shuffleboard:
  • Court: ${formData.shuffleboardCourtColor}
  • Shooting Area: ${formData.shuffleboardShootingAreaColor}
  • Border: ${formData.shuffleboardBorderColor}
` : ''}

PRICING SUMMARY
---------------
Base Tiles: $${pricing.basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${formData.linePainting ? `Line Painting: $${pricing.linePaintingCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}
${formData.rampsNeeded ? `Ramps & Corners: $${pricing.rampsCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}
-------------------
TOTAL: $${pricing.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

Generated: ${new Date().toLocaleString()}
    `.trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden card-premium border-premium-animated">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-black">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="heading-2">Order Summary</h2>
              <p className="text-sm text-muted-foreground">{formData.projectName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="btn-premium-secondary flex items-center gap-2 text-sm"
              title="Download as text file"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handlePrint}
              className="btn-premium-secondary flex items-center gap-2 text-sm"
              title="Print summary"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6" style={{ maxHeight: "calc(90vh - 100px)" }}>
          {/* Project Info */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)] mb-3">
              Project Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Dealer:</span>
                <span className="ml-2 font-semibold">{formData.dealerName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <span className="ml-2 font-semibold">{formData.phone}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="ml-2 font-semibold">
                  {formData.shippingOption === "address" ? "Ship to Address" : "Warehouse Pickup"}
                </span>
                {formData.shippingOption === "address" && (
                  <div className="mt-1 ml-2 text-muted-foreground">{formData.shippingAddress}</div>
                )}
              </div>
            </div>
          </div>

          {/* Court Specifications */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)] mb-3">
              Court Specifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Tile Type:</span>
                <span className="ml-2 font-semibold">{formData.tileType.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Base Color:</span>
                <span className="ml-2 font-semibold">{formData.baseTileColor}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="ml-2 font-semibold">{formData.courtLength} ft × {formData.courtWidth} ft</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Area:</span>
                <span className="ml-2 font-semibold">{squareFeet.toLocaleString()} sq ft</span>
              </div>
            </div>
          </div>

          {/* Tile Breakdown */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)] mb-3">
              Tile Breakdown
            </h3>
            <div className="space-y-2">
              {tileBreakdown.map((tile) => (
                <div key={tile.color} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded border-2 border-white/20" style={{ backgroundColor: getColorHex(tile.color) }} />
                    <div>
                      <div className="font-semibold">{tile.color}</div>
                      <div className="text-xs text-muted-foreground">{tile.quantity.toLocaleString()} tiles (12" × 12")</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${tile.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-xs text-muted-foreground">${tile.pricePerTile}/tile</div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-white/10 font-bold">
                <span>Total Tiles:</span>
                <span>{totalTiles.toLocaleString()} tiles</span>
              </div>
            </div>
          </div>

          {/* Game Lines */}
          {formData.gameLines.length > 0 && (
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)] mb-3">
                Game Lines ({formData.gameLines.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.gameLines.map((line) => (
                  <span key={line} className="sport-badge">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Optional Add-ons */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)] mb-3">
              Optional Add-ons
            </h3>
            <div className="space-y-2 text-sm">
              <div className={`flex items-center justify-between p-3 rounded-lg ${formData.linePainting ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/[0.02] border border-border opacity-50'}`}>
                <div>
                  <div className="font-semibold">Line Painting</div>
                  {formData.linePainting && (
                    <div className="text-xs text-muted-foreground">Color: {formData.linePaintingColor}</div>
                  )}
                </div>
                <div className="font-semibold">
                  {formData.linePainting ? `$${pricing.linePaintingCost.toFixed(2)}` : '—'}
                </div>
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${formData.rampsNeeded ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/[0.02] border border-border opacity-50'}`}>
                <div>
                  <div className="font-semibold">Ramps & Corners</div>
                  {formData.rampsNeeded && (
                    <div className="text-xs text-muted-foreground">
                      Color: {formData.rampsColor}
                      {formData.rampsPriority && ' • Priority'}
                    </div>
                  )}
                </div>
                <div className="font-semibold">
                  {formData.rampsNeeded ? `$${pricing.rampsCost.toFixed(2)}` : '—'}
                </div>
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${formData.logoUpload ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/[0.02] border border-border opacity-50'}`}>
                <div>
                  <div className="font-semibold">Custom Logo</div>
                  {formData.logoUpload && (
                    <div className="text-xs text-muted-foreground">
                      Size: {formData.logoHeight}" × {formData.logoWidth}"
                    </div>
                  )}
                </div>
                <div className="font-semibold">
                  {formData.logoUpload ? 'Included' : '—'}
                </div>
              </div>
            </div>
          </div>

          {/* Sport Colors */}
          {(formData.gameLines.some(l => ["Pickleball", "Tennis - Full Court", "Tennis - Reduced", "Volleyball"].includes(l)) ||
            formData.gameLines.some(l => ["Basketball - Full", "Basketball - Half"].includes(l)) ||
            formData.gameLines.some(l => ["Shuffleboard - Single", "Shuffleboard - Double"].includes(l))) && (
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)] mb-3">
                Sport-Specific Colors
              </h3>
              <div className="space-y-4 text-sm">
                {formData.gameLines.some(l => ["Pickleball", "Tennis - Full Court", "Tennis - Reduced", "Volleyball"].includes(l)) && (
                  <div>
                    <div className="font-semibold text-purple-400 mb-2">Pickleball/Tennis/Volleyball</div>
                    <div className="grid grid-cols-2 gap-2">
                      <ColorDisplay label="Inner Court" color={formData.pickleballInnerCourtColor} />
                      <ColorDisplay label="Outer Court" color={formData.pickleballOuterCourtColor} />
                      <ColorDisplay label="Kitchen" color={formData.pickleballKitchenColor} />
                    </div>
                  </div>
                )}

                {formData.gameLines.some(l => ["Basketball - Full", "Basketball - Half"].includes(l)) && (
                  <div>
                    <div className="font-semibold text-orange-400 mb-2">Basketball</div>
                    <div className="grid grid-cols-2 gap-2">
                      <ColorDisplay label="Court" color={formData.basketballCourtColor} />
                      <ColorDisplay label="Lane" color={formData.basketballLaneColor} />
                      <ColorDisplay label="Border" color={formData.basketballBorderColor} />
                      {formData.basketballOverhang && (
                        <div className="col-span-2 text-xs text-muted-foreground">
                          Backboard Overhang: {formData.basketballOverhang} ft
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {formData.gameLines.some(l => ["Shuffleboard - Single", "Shuffleboard - Double"].includes(l)) && (
                  <div>
                    <div className="font-semibold text-yellow-400 mb-2">Shuffleboard</div>
                    <div className="grid grid-cols-2 gap-2">
                      <ColorDisplay label="Court" color={formData.shuffleboardCourtColor} />
                      <ColorDisplay label="Shooting Area" color={formData.shuffleboardShootingAreaColor} />
                      <ColorDisplay label="Border" color={formData.shuffleboardBorderColor} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="p-6 rounded-lg bg-gradient-primary/10 border border-[var(--brand-primary)]/30">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)] mb-4">
              Price Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Tiles ({totalTiles} tiles)</span>
                <span className="font-semibold">${pricing.basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              {formData.linePainting && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Line Painting</span>
                  <span className="font-semibold">${pricing.linePaintingCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
              {formData.rampsNeeded && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ramps & Corners</span>
                  <span className="font-semibold">${pricing.rampsCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-white/10 text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-gradient-hero">${pricing.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorDisplay({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded border-2 border-white/20" style={{ backgroundColor: getColorHex(color) }} />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xs font-semibold">{color}</div>
      </div>
    </div>
  );
}

function getColorHex(colorName: string): string {
  const colors: Record<string, string> = {
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
    "White": "#FFFFFF",
  };
  return colors[colorName] || "#808080";
}

