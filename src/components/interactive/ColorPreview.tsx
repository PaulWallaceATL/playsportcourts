"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TileColorOption } from "@/types";

interface ColorPreviewProps {
  title?: string;
  baseImage?: string;
  colors: TileColorOption[];
  initialPrimary?: string;
  initialSecondary?: string;
}

export function ColorPreview({ title, baseImage = "/window.svg", colors, initialPrimary, initialSecondary }: ColorPreviewProps) {
  const [primary, setPrimary] = React.useState<string>(initialPrimary ?? colors[0]?.hex ?? "#2563eb");
  const [secondary, setSecondary] = React.useState<string>(initialSecondary ?? colors[1]?.hex ?? "#0ea5e9");

  return (
    <div className="grid gap-3">
      {title && <p className="text-sm font-medium">{title}</p>}
      <div className="relative aspect-[16/9] overflow-hidden rounded-md border">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)` }} />
        <Image src={baseImage} alt="Tile preview" fill priority className="object-contain mix-blend-multiply" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c.hex}
              type="button"
              aria-label={`${c.name} primary`}
              title={`${c.name} (primary)`}
              onClick={() => setPrimary(c.hex)}
              className={cn(
                "h-7 w-7 rounded-full ring-2 ring-transparent transition focus:outline-none focus:ring-2",
                primary === c.hex ? "ring-[var(--primary)]" : "hover:ring-foreground/30"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">/</span>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={`sec-${c.hex}`}
              type="button"
              aria-label={`${c.name} secondary`}
              title={`${c.name} (secondary)`}
              onClick={() => setSecondary(c.hex)}
              className={cn(
                "h-7 w-7 rounded-full ring-2 ring-transparent transition focus:outline-none focus:ring-2",
                secondary === c.hex ? "ring-[var(--accent)]" : "hover:ring-foreground/30"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


