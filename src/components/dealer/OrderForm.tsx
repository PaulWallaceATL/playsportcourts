"use client";

import * as React from "react";
import {
  Package,
  Ruler,
  Palette,
  Upload,
  Calculator,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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
  // Sport-specific colors
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

export function OrderForm() {
  const [formData, setFormData] = React.useState<OrderFormData>({
    dealerName: "",
    shippingOption: "address",
    shippingAddress: "",
    projectName: "",
    phone: "",
    tileType: "core",
    courtLength: "",
    courtWidth: "",
    gameLines: [],
    linePainting: false,
    linePaintingColor: COLORS[0].name,
    rampsNeeded: false,
    rampsColor: COLORS[0].name,
    rampsPriority: false,
    logoUpload: false,
    logoHeight: "",
    logoWidth: "",
    basketballOverhang: "0",
    pickleballInnerCourtColor: COLORS[0].name,
    pickleballOuterCourtColor: COLORS[0].name,
    pickleballKitchenColor: COLORS[0].name,
    pickleballRampsColor: COLORS[0].name,
    basketballCourtColor: COLORS[0].name,
    basketballLaneColor: COLORS[0].name,
    basketballBorderColor: COLORS[0].name,
    basketballRampColor: COLORS[0].name,
    shuffleboardCourtColor: COLORS[0].name,
    shuffleboardShootingAreaColor: COLORS[0].name,
    shuffleboardBorderColor: COLORS[0].name,
    shuffleboardRampColor: COLORS[0].name,
  });

  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

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

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const updateFormData = (field: keyof OrderFormData, value: any) => {
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
    <div className="space-y-8">
      {/* Success Message */}
      {submitted && (
        <div className="card-premium border-premium-animated bg-emerald-500/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-emerald-300 mb-1">Order Submitted Successfully!</p>
              <p className="text-sm text-muted-foreground">
                Your order has been received. We'll contact you shortly with next steps.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="card-premium">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-black">
              <Package className="w-5 h-5" />
            </div>
            <h2 className="heading-2">Basic Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-caption block mb-2">
                Dealer Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.dealerName}
                onChange={(e) => updateFormData("dealerName", e.target.value)}
                className="field-input w-full"
                placeholder="Enter dealer name"
              />
            </div>

            <div>
              <label className="text-caption block mb-2">
                Project Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.projectName}
                onChange={(e) => updateFormData("projectName", e.target.value)}
                className="field-input w-full"
                placeholder="Enter project name"
              />
            </div>

            <div>
              <label className="text-caption block mb-2">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="field-input w-full"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="text-caption block mb-2">
                Shipping Option <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shippingOption"
                    value="address"
                    checked={formData.shippingOption === "address"}
                    onChange={(e) => updateFormData("shippingOption", e.target.value)}
                    className="w-4 h-4 text-[var(--brand-primary)]"
                  />
                  <span className="text-sm">Ship to Address</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shippingOption"
                    value="pickup"
                    checked={formData.shippingOption === "pickup"}
                    onChange={(e) => updateFormData("shippingOption", e.target.value)}
                    className="w-4 h-4 text-[var(--brand-primary)]"
                  />
                  <span className="text-sm">Warehouse Pickup</span>
                </label>
              </div>
            </div>

            {formData.shippingOption === "address" && (
              <div className="md:col-span-2">
                <label className="text-caption block mb-2">
                  Shipping Address <span className="text-red-400">*</span>
                </label>
                <textarea
                  required={formData.shippingOption === "address"}
                  value={formData.shippingAddress}
                  onChange={(e) => updateFormData("shippingAddress", e.target.value)}
                  className="field-input w-full min-h-[100px]"
                  placeholder="Enter complete shipping address"
                />
              </div>
            )}
          </div>
        </div>

        {/* Court Specifications */}
        <div className="card-premium">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-black">
              <Ruler className="w-5 h-5" />
            </div>
            <h2 className="heading-2">Court Specifications</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-caption block mb-2">
                Tile Type <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={formData.tileType}
                onChange={(e) => updateFormData("tileType", e.target.value)}
                className="field-input w-full"
              >
                {TILE_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} - ${type.price}/sq ft
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-caption block mb-2">
                Court Dimensions <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.1"
                    value={formData.courtLength}
                    onChange={(e) => updateFormData("courtLength", e.target.value)}
                    className="field-input w-full"
                    placeholder="Length (ft)"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.1"
                    value={formData.courtWidth}
                    onChange={(e) => updateFormData("courtWidth", e.target.value)}
                    className="field-input w-full"
                    placeholder="Width (ft)"
                  />
                </div>
              </div>
              {squareFeet > 0 && (
                <p className="text-sm text-[var(--brand-primary)] mt-2">
                  Total: {squareFeet.toLocaleString()} sq ft
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Game Lines */}
        <div className="card-premium">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-black">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="heading-2">Game Lines</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GAME_LINES.map((line) => (
              <label
                key={line}
                className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-border hover:border-[var(--brand-primary)] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.gameLines.includes(line)}
                  onChange={() => toggleGameLine(line)}
                  className="w-4 h-4 text-[var(--brand-primary)]"
                />
                <span className="text-sm">{line}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Optional Add-ons */}
        <div className="card-premium">
          <h2 className="heading-2 mb-6">Optional Add-ons</h2>

          <div className="space-y-6">
            {/* Line Painting */}
            <div className="p-4 rounded-lg bg-white/[0.02] border border-border">
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={formData.linePainting}
                  onChange={(e) => updateFormData("linePainting", e.target.checked)}
                  className="w-5 h-5 text-[var(--brand-primary)] mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Line Painting</div>
                  <div className="text-sm text-muted-foreground">
                    Professional line painting service (+$0.20/sq ft)
                  </div>
                </div>
                <div className="text-[var(--brand-primary)] font-bold">
                  ${(squareFeet * 0.2).toFixed(2)}
                </div>
              </label>

              {formData.linePainting && (
                <div className="ml-8">
                  <label className="text-caption block mb-2">Line Color</label>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => updateFormData("linePaintingColor", color.name)}
                        className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                          formData.linePaintingColor === color.name
                            ? "border-[var(--brand-primary)] shadow-neon-blue"
                            : "border-border"
                        }`}
                        style={{ background: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{formData.linePaintingColor}</p>
                </div>
              )}
            </div>

            {/* Ramps */}
            <div className="p-4 rounded-lg bg-white/[0.02] border border-border">
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={formData.rampsNeeded}
                  onChange={(e) => updateFormData("rampsNeeded", e.target.checked)}
                  className="w-5 h-5 text-[var(--brand-primary)] mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Ramps Needed</div>
                  <div className="text-sm text-muted-foreground">
                    Edge ramps and corners (+$3.00/sq ft)
                  </div>
                </div>
                <div className="text-[var(--brand-primary)] font-bold">
                  ${(squareFeet * 3).toFixed(2)}
                </div>
              </label>

              {formData.rampsNeeded && (
                <div className="ml-8 space-y-4">
                  <div>
                    <label className="text-caption block mb-2">Ramp Color</label>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
                      {COLORS.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => updateFormData("rampsColor", color.name)}
                          className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                            formData.rampsColor === color.name
                              ? "border-[var(--brand-primary)] shadow-neon-blue"
                              : "border-border"
                          }`}
                          style={{ background: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{formData.rampsColor}</p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rampsPriority}
                      onChange={(e) => updateFormData("rampsPriority", e.target.checked)}
                      className="w-4 h-4 text-[var(--brand-primary)]"
                    />
                    <span className="text-sm">Priority - Connecting with other court</span>
                  </label>
                </div>
              )}
            </div>

            {/* Logo Upload */}
            <div className="p-4 rounded-lg bg-white/[0.02] border border-border">
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={formData.logoUpload}
                  onChange={(e) => updateFormData("logoUpload", e.target.checked)}
                  className="w-5 h-5 text-[var(--brand-primary)] mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Personalized Logo</div>
                  <div className="text-sm text-muted-foreground">
                    Upload custom logo for court center
                  </div>
                </div>
              </label>

              {formData.logoUpload && (
                <div className="ml-8 space-y-4">
                  <div>
                    <label className="text-caption block mb-2">Upload Logo Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                      className="field-input w-full"
                    />
                    {logoFile && (
                      <p className="text-xs text-[var(--brand-primary)] mt-2">
                        Selected: {logoFile.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-caption block mb-2">Height (inches)</label>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={formData.logoHeight}
                        onChange={(e) => updateFormData("logoHeight", e.target.value)}
                        className="field-input w-full"
                        placeholder="24"
                      />
                    </div>
                    <div>
                      <label className="text-caption block mb-2">Width (inches)</label>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={formData.logoWidth}
                        onChange={(e) => updateFormData("logoWidth", e.target.value)}
                        className="field-input w-full"
                        placeholder="36"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sport-Specific Colors */}
        {(showPickleballColors || showBasketballColors || showShuffleboardColors) && (
          <div className="card-premium">
            <h2 className="heading-2 mb-6">Sport-Specific Colors</h2>

            <div className="space-y-8">
              {/* Pickleball/Tennis/Volleyball Colors */}
              {showPickleballColors && (
                <div>
                  <h3 className="font-bold text-lg mb-4 text-[var(--brand-primary)]">
                    Pickleball / Tennis / Volleyball
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ColorSelector
                      label="Inner Court Color"
                      value={formData.pickleballInnerCourtColor}
                      onChange={(color) => updateFormData("pickleballInnerCourtColor", color)}
                    />
                    <ColorSelector
                      label="Outer Court Color"
                      value={formData.pickleballOuterCourtColor}
                      onChange={(color) => updateFormData("pickleballOuterCourtColor", color)}
                    />
                    <ColorSelector
                      label="Kitchen Color"
                      value={formData.pickleballKitchenColor}
                      onChange={(color) => updateFormData("pickleballKitchenColor", color)}
                    />
                    <ColorSelector
                      label="Ramps/Corners Color"
                      value={formData.pickleballRampsColor}
                      onChange={(color) => updateFormData("pickleballRampsColor", color)}
                    />
                  </div>
                </div>
              )}

              {/* Basketball Colors */}
              {showBasketballColors && (
                <div>
                  <h3 className="font-bold text-lg mb-4 text-[var(--brand-primary)]">Basketball</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ColorSelector
                      label="Court Color"
                      value={formData.basketballCourtColor}
                      onChange={(color) => updateFormData("basketballCourtColor", color)}
                    />
                    <ColorSelector
                      label="Lane Color"
                      value={formData.basketballLaneColor}
                      onChange={(color) => updateFormData("basketballLaneColor", color)}
                    />
                    <ColorSelector
                      label="Border Color"
                      value={formData.basketballBorderColor}
                      onChange={(color) => updateFormData("basketballBorderColor", color)}
                    />
                    <ColorSelector
                      label="Ramp Color"
                      value={formData.basketballRampColor}
                      onChange={(color) => updateFormData("basketballRampColor", color)}
                    />
                    <div className="md:col-span-2">
                      <label className="text-caption block mb-2">
                        Backboard Overhang <span className="text-red-400">*</span>
                      </label>
                      <select
                        required
                        value={formData.basketballOverhang}
                        onChange={(e) => updateFormData("basketballOverhang", e.target.value)}
                        className="field-input w-full max-w-xs"
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

              {/* Shuffleboard Colors */}
              {showShuffleboardColors && (
                <div>
                  <h3 className="font-bold text-lg mb-4 text-[var(--brand-primary)]">
                    Shuffleboard
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ColorSelector
                      label="Court Color"
                      value={formData.shuffleboardCourtColor}
                      onChange={(color) => updateFormData("shuffleboardCourtColor", color)}
                    />
                    <ColorSelector
                      label="Shooting Area Color"
                      value={formData.shuffleboardShootingAreaColor}
                      onChange={(color) => updateFormData("shuffleboardShootingAreaColor", color)}
                    />
                    <ColorSelector
                      label="Border Color"
                      value={formData.shuffleboardBorderColor}
                      onChange={(color) => updateFormData("shuffleboardBorderColor", color)}
                    />
                    <ColorSelector
                      label="Ramp/Corners Color"
                      value={formData.shuffleboardRampColor}
                      onChange={(color) => updateFormData("shuffleboardRampColor", color)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Price Summary */}
        {squareFeet > 0 && (
          <div className="card-premium border-premium-animated">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-black">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="heading-2">Price Summary</h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">
                  Base Price ({squareFeet.toLocaleString()} sq ft × $
                  {TILE_TYPES.find((t) => t.id === formData.tileType)?.price})
                </span>
                <span className="font-semibold">${pricing.basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              {formData.linePainting && (
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Line Painting</span>
                  <span className="font-semibold">
                    ${pricing.linePaintingCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              {formData.rampsNeeded && (
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Ramps & Corners</span>
                  <span className="font-semibold">
                    ${pricing.rampsCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 text-xl">
                <span className="font-bold">Total</span>
                <span className="font-bold text-gradient-hero">
                  ${pricing.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              if (confirm("Are you sure you want to reset the form?")) {
                window.location.reload();
              }
            }}
            className="btn-premium-secondary"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={submitting || squareFeet === 0}
            className="btn-premium-primary flex items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Submit Order
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Helper component for color selection
function ColorSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <div>
      <label className="text-caption block mb-2">{label}</label>
      <div className="grid grid-cols-6 gap-2">
        {COLORS.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onChange(color.name)}
            className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
              value === color.name
                ? "border-[var(--brand-primary)] shadow-neon-blue"
                : "border-border"
            }`}
            style={{ background: color.hex }}
            title={color.name}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{value}</p>
    </div>
  );
}

