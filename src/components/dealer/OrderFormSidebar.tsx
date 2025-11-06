"use client";

import * as React from "react";
import {
  Package,
  Ruler,
  Palette,
  Calculator,
  CheckCircle,
  X,
  Send,
  FileText,
} from "lucide-react";
import { CourtVisualizer } from "./CourtVisualizer";
import { OrderSummary } from "./OrderSummary";

// Available tile types with pricing
const TILE_TYPES = [
  { id: "core", name: "Core", price: 5.95 },
  { id: "true", name: "True", price: 5.95 },
  { id: "x", name: "X", price: 7.5 },
] as const;

// Available game lines
const GAME_LINES = [
  "4 Square",
  "Badminton",
  "Basketball - Full",
  "Basketball - Half",
  "Batters Box",
  "Cornhole",
  "Futsal - Reduced",
  "Futsal - Regulated",
  "Hockey Crease",
  "Hockey Regulation",
  "Hop Scotch",
  "Pickleball",
  "Shuffleboard - Single",
  "Shuffleboard - Double",
  "Soccer",
  "Tennis - Full Court",
  "Tennis - Reduced",
  "Volleyball",
] as const;

// Available colors
const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Graphite", hex: "#2C2C2C" },
  { name: "Titanium", hex: "#6B7280" },
  { name: "Navy Blue", hex: "#1E3A8A" },
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Light Blue", hex: "#60A5FA" },
  { name: "Emerald Green", hex: "#10B981" },
  { name: "Olive Green", hex: "#84CC16" },
  { name: "Bright Red", hex: "#EF4444" },
  { name: "Orange", hex: "#F97316" },
  { name: "Yellow", hex: "#FDE047" },
] as const;

interface OrderFormData {
  dealerName: string;
  shippingOption: "address" | "pickup";
  shippingAddress: string;
  projectName: string;
  phone: string;
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
  basketballOverhang: string;
  pickleballInnerCourtColor: string;
  pickleballOuterCourtColor: string;
  pickleballKitchenColor: string;
  pickleballRampsColor: string;
  basketballCourtColor: string;
  basketballLaneColor: string;
  basketballBorderColor: string;
  basketballRampColor: string;
  shuffleboardCourtColor: string;
  shuffleboardShootingAreaColor: string;
  shuffleboardBorderColor: string;
  shuffleboardRampColor: string;
}

export function OrderFormSidebar() {
  const [formData, setFormData] = React.useState<OrderFormData>({
    dealerName: "",
    shippingOption: "address",
    shippingAddress: "",
    projectName: "",
    phone: "",
    tileType: "core",
    baseTileColor: "Graphite",
    courtLength: "",
    courtWidth: "",
    gameLines: [],
    linePainting: false,
    linePaintingColor: "White",
    rampsNeeded: false,
    rampsColor: COLORS[0].name,
    rampsPriority: false,
    logoUpload: false,
    logoHeight: "",
    logoWidth: "",
    basketballOverhang: "0",
    pickleballInnerCourtColor: "Graphite",
    pickleballOuterCourtColor: "Titanium",
    pickleballKitchenColor: "Royal Blue",
    pickleballRampsColor: COLORS[0].name,
    basketballCourtColor: "Graphite",
    basketballLaneColor: "Royal Blue",
    basketballBorderColor: "Orange",
    basketballRampColor: COLORS[0].name,
    shuffleboardCourtColor: COLORS[0].name,
    shuffleboardShootingAreaColor: COLORS[4].name,
    shuffleboardBorderColor: COLORS[10].name,
    shuffleboardRampColor: COLORS[0].name,
  });

  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [showSummary, setShowSummary] = React.useState(false);

  // Calculate total square footage
  const squareFeet = React.useMemo(() => {
    const length = parseFloat(formData.courtLength) || 0;
    const width = parseFloat(formData.courtWidth) || 0;
    return length * width;
  }, [formData.courtLength, formData.courtWidth]);

  // Calculate pricing
  const pricing = React.useMemo(() => {
    const tileType = TILE_TYPES.find((t) => t.id === formData.tileType);
    const basePrice = squareFeet * (tileType?.price || 0);
    const linePaintingCost = formData.linePainting ? squareFeet * 0.2 : 0;
    const rampsCost = formData.rampsNeeded ? squareFeet * 3 : 0;
    const total = basePrice + linePaintingCost + rampsCost;

    return {
      basePrice,
      linePaintingCost,
      rampsCost,
      total,
    };
  }, [squareFeet, formData.tileType, formData.linePainting, formData.rampsNeeded]);

  // Determine which sport-specific color sections to show
  const showPickleballColors = React.useMemo(
    () =>
      formData.gameLines.some((line) =>
        ["Pickleball", "Tennis - Full Court", "Tennis - Reduced", "Volleyball"].includes(line)
      ),
    [formData.gameLines]
  );

  const showBasketballColors = React.useMemo(
    () =>
      formData.gameLines.some((line) =>
        ["Basketball - Full", "Basketball - Half"].includes(line)
      ),
    [formData.gameLines]
  );

  const showShuffleboardColors = React.useMemo(
    () =>
      formData.gameLines.some((line) =>
        ["Shuffleboard - Single", "Shuffleboard - Double"].includes(line)
      ),
    [formData.gameLines]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Order submitted:", { formData, logoFile, pricing });
    setSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const updateFormData = (field: keyof OrderFormData, value: string | number | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGameLine = (line: string) => {
    setFormData((prev) => ({
      ...prev,
      gameLines: prev.gameLines.includes(line)
        ? prev.gameLines.filter((l) => l !== line)
        : [...prev.gameLines, line],
    }));
  };

  return (
    <>
      {/* Order Summary Modal */}
      {showSummary && (
        <OrderSummary
          formData={formData}
          pricing={pricing}
          squareFeet={squareFeet}
          onClose={() => setShowSummary(false)}
        />
      )}

      <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar - Scrollable Form */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-[420px]" : "w-0"
        } flex-shrink-0`}
      >
        <div className={`h-full ${sidebarOpen ? "" : "hidden"}`}>
          <div className="h-full flex flex-col card-premium">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <h2 className="heading-3">Order Configuration</h2>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)]">
                  Basic Information
                </h3>
                
                <div>
                  <label className="text-xs block mb-1.5">Dealer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.dealerName}
                    onChange={(e) => updateFormData("dealerName", e.target.value)}
                    className="field-input w-full text-sm"
                    placeholder="Enter dealer name"
                  />
                </div>

                <div>
                  <label className="text-xs block mb-1.5">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => updateFormData("projectName", e.target.value)}
                    className="field-input w-full text-sm"
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label className="text-xs block mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="field-input w-full text-sm"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="text-xs block mb-1.5">Shipping Option *</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="shippingOption"
                        value="address"
                        checked={formData.shippingOption === "address"}
                        onChange={(e) => updateFormData("shippingOption", e.target.value)}
                        className="w-4 h-4"
                      />
                      Ship to Address
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="shippingOption"
                        value="pickup"
                        checked={formData.shippingOption === "pickup"}
                        onChange={(e) => updateFormData("shippingOption", e.target.value)}
                        className="w-4 h-4"
                      />
                      Warehouse Pickup
                    </label>
                  </div>
                </div>

                {formData.shippingOption === "address" && (
                  <div>
                    <label className="text-xs block mb-1.5">Shipping Address *</label>
                    <textarea
                      required={formData.shippingOption === "address"}
                      value={formData.shippingAddress}
                      onChange={(e) => updateFormData("shippingAddress", e.target.value)}
                      className="field-input w-full min-h-[80px] text-sm"
                      placeholder="Enter complete shipping address"
                    />
                  </div>
                )}
              </div>

              {/* Court Specs */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)]">
                  Court Specifications
                </h3>

                <div>
                  <label className="text-xs block mb-1.5">Tile Type *</label>
                  <select
                    required
                    value={formData.tileType}
                    onChange={(e) => updateFormData("tileType", e.target.value)}
                    className="field-input w-full text-sm"
                  >
                    {TILE_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name} - ${type.price}/sq ft
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs block mb-1.5">Base Tile Color *</label>
                  <ColorSelector
                    value={formData.baseTileColor}
                    onChange={(color) => updateFormData("baseTileColor", color)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs block mb-1.5">Length (ft) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.1"
                      value={formData.courtLength}
                      onChange={(e) => updateFormData("courtLength", e.target.value)}
                      className="field-input w-full text-sm"
                      placeholder="Length"
                    />
                  </div>
                  <div>
                    <label className="text-xs block mb-1.5">Width (ft) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.1"
                      value={formData.courtWidth}
                      onChange={(e) => updateFormData("courtWidth", e.target.value)}
                      className="field-input w-full text-sm"
                      placeholder="Width"
                    />
                  </div>
                </div>
                {squareFeet > 0 && (
                  <p className="text-xs text-[var(--brand-primary)]">
                    Total: {squareFeet.toLocaleString()} sq ft ({Math.ceil(squareFeet)} tiles)
                  </p>
                )}
              </div>

              {/* Game Lines */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)]">
                  Game Lines
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {GAME_LINES.map((line) => (
                    <label
                      key={line}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-border hover:border-[var(--brand-primary)] transition-colors text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={formData.gameLines.includes(line)}
                        onChange={() => toggleGameLine(line)}
                        className="w-3.5 h-3.5"
                      />
                      {line}
                    </label>
                  ))}
                </div>
              </div>

              {/* Optional Add-ons */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)]">
                  Optional Add-ons
                </h3>

                <label className="flex items-start gap-2 cursor-pointer p-3 rounded-lg bg-white/[0.02] border border-border hover:border-[var(--brand-primary)] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.linePainting}
                    onChange={(e) => updateFormData("linePainting", e.target.checked)}
                    className="w-4 h-4 mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-semibold mb-1">Line Painting (+$0.20/sq ft)</div>
                    {formData.linePainting && (
                      <ColorSelector
                        value={formData.linePaintingColor}
                        onChange={(color) => updateFormData("linePaintingColor", color)}
                      />
                    )}
                  </div>
                </label>

                <label className="flex items-start gap-2 cursor-pointer p-3 rounded-lg bg-white/[0.02] border border-border hover:border-[var(--brand-primary)] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.rampsNeeded}
                    onChange={(e) => updateFormData("rampsNeeded", e.target.checked)}
                    className="w-4 h-4 mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-semibold mb-1">Ramps & Corners (+$3.00/sq ft)</div>
                    {formData.rampsNeeded && (
                      <div className="space-y-2 mt-2">
                        <ColorSelector
                          value={formData.rampsColor}
                          onChange={(color) => updateFormData("rampsColor", color)}
                        />
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.rampsPriority}
                            onChange={(e) => updateFormData("rampsPriority", e.target.checked)}
                            className="w-3.5 h-3.5"
                          />
                          Priority - Connecting with other court
                        </label>
                      </div>
                    )}
                  </div>
                </label>

                <label className="flex items-start gap-2 cursor-pointer p-3 rounded-lg bg-white/[0.02] border border-border hover:border-[var(--brand-primary)] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.logoUpload}
                    onChange={(e) => updateFormData("logoUpload", e.target.checked)}
                    className="w-4 h-4 mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-semibold mb-1">Personalized Logo</div>
                    {formData.logoUpload && (
                      <div className="space-y-2 mt-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                          className="field-input w-full text-xs"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            min="1"
                            step="0.1"
                            value={formData.logoHeight}
                            onChange={(e) => updateFormData("logoHeight", e.target.value)}
                            className="field-input w-full text-xs"
                            placeholder="Height (in)"
                          />
                          <input
                            type="number"
                            min="1"
                            step="0.1"
                            value={formData.logoWidth}
                            onChange={(e) => updateFormData("logoWidth", e.target.value)}
                            className="field-input w-full text-xs"
                            placeholder="Width (in)"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Sport Colors */}
              {(showPickleballColors || showBasketballColors || showShuffleboardColors) && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)]">
                    Sport Colors
                  </h3>

                  {showPickleballColors && (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-purple-400">Pickleball/Tennis/Volleyball</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs block mb-1">Inner Court</label>
                          <ColorSelector
                            value={formData.pickleballInnerCourtColor}
                            onChange={(color) => updateFormData("pickleballInnerCourtColor", color)}
                          />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">Outer Court</label>
                          <ColorSelector
                            value={formData.pickleballOuterCourtColor}
                            onChange={(color) => updateFormData("pickleballOuterCourtColor", color)}
                          />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">Kitchen</label>
                          <ColorSelector
                            value={formData.pickleballKitchenColor}
                            onChange={(color) => updateFormData("pickleballKitchenColor", color)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {showBasketballColors && (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-orange-400">Basketball</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs block mb-1">Court Color</label>
                          <ColorSelector
                            value={formData.basketballCourtColor}
                            onChange={(color) => updateFormData("basketballCourtColor", color)}
                          />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">Lane Color</label>
                          <ColorSelector
                            value={formData.basketballLaneColor}
                            onChange={(color) => updateFormData("basketballLaneColor", color)}
                          />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">Border Color</label>
                          <ColorSelector
                            value={formData.basketballBorderColor}
                            onChange={(color) => updateFormData("basketballBorderColor", color)}
                          />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">Backboard Overhang *</label>
                          <select
                            required
                            value={formData.basketballOverhang}
                            onChange={(e) => updateFormData("basketballOverhang", e.target.value)}
                            className="field-input w-full text-xs"
                          >
                            {[0, 1, 2, 3, 4, 5].map((ft) => (
                              <option key={ft} value={ft}>
                                {ft} ft
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {showShuffleboardColors && (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-yellow-400">Shuffleboard</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs block mb-1">Court Color</label>
                          <ColorSelector
                            value={formData.shuffleboardCourtColor}
                            onChange={(color) => updateFormData("shuffleboardCourtColor", color)}
                          />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">Shooting Area</label>
                          <ColorSelector
                            value={formData.shuffleboardShootingAreaColor}
                            onChange={(color) => updateFormData("shuffleboardShootingAreaColor", color)}
                          />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">Border Color</label>
                          <ColorSelector
                            value={formData.shuffleboardBorderColor}
                            onChange={(color) => updateFormData("shuffleboardBorderColor", color)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Price Summary */}
              {squareFeet > 0 && (
                <div className="space-y-3 p-4 rounded-lg bg-gradient-primary/10 border border-[var(--brand-primary)]/30">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--brand-primary)]">
                    Price Summary
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Price</span>
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
                        <span className="text-muted-foreground">Ramps</span>
                        <span className="font-semibold">${pricing.rampsCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-white/10 text-base">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-gradient-hero">${pricing.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Action Buttons - Sticky at bottom */}
            <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={() => setShowSummary(true)}
                disabled={squareFeet === 0}
                className="btn-premium-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                <FileText className="w-4 h-4" />
                View Order Summary
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitting || squareFeet === 0}
                className="btn-premium-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="btn-premium-secondary h-fit sticky top-4"
        >
          <Package className="w-5 h-5" />
        </button>
      )}

      {/* Main Content - Court Visualizer */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Success Message */}
        {submitted && (
          <div className="card-premium border-premium-animated bg-emerald-500/10 animate-in">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-emerald-300 mb-1">Order Submitted Successfully!</p>
                <p className="text-sm text-muted-foreground">
                  Your order has been received. We&apos;ll contact you shortly with next steps.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Court Visualizer - Takes all remaining space */}
        <div className="flex-1">
          {squareFeet > 0 ? (
            <CourtVisualizer
              courtLength={parseFloat(formData.courtLength) || 0}
              courtWidth={parseFloat(formData.courtWidth) || 0}
              gameLines={formData.gameLines}
              baseTileColor={formData.baseTileColor}
              pickleballInnerCourtColor={formData.pickleballInnerCourtColor}
              pickleballOuterCourtColor={formData.pickleballOuterCourtColor}
              pickleballKitchenColor={formData.pickleballKitchenColor}
              basketballCourtColor={formData.basketballCourtColor}
              basketballLaneColor={formData.basketballLaneColor}
              basketballBorderColor={formData.basketballBorderColor}
              shuffleboardCourtColor={formData.shuffleboardCourtColor}
              shuffleboardShootingAreaColor={formData.shuffleboardShootingAreaColor}
              shuffleboardBorderColor={formData.shuffleboardBorderColor}
              linePaintingColor={formData.linePainting ? formData.linePaintingColor : undefined}
            />
          ) : (
            <div className="h-full card-premium flex items-center justify-center">
              <div className="text-center">
                <Ruler className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="heading-3 mb-2">Ready to Design Your Court?</h3>
                <p className="text-muted-foreground">
                  Enter court dimensions in the sidebar to see your live preview
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

// Helper component for color selection
function ColorSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-11 gap-1">
        {COLORS.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onChange(color.name)}
            className={`aspect-square rounded border-2 transition-all hover:scale-110 ${
              value === color.name
                ? "border-[var(--brand-primary)] shadow-neon-blue scale-110"
                : "border-border"
            }`}
            style={{ background: color.hex }}
            title={color.name}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{value}</p>
    </div>
  );
}

