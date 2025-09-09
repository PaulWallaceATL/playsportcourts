"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TileColorOption } from "@/types";

interface ColorPreviewProps {
  title?: string;
  baseImage?: string;
  colors: TileColorOption[];
  initial?: string;
}

export function ColorPreview({ title, baseImage = "/window.svg", colors, initial }: ColorPreviewProps) {
  const [selected, setSelected] = React.useState<string>(initial ?? colors[0]?.hex ?? "#2563eb");

  return (
    <div className="grid gap-3">
      {title && <p className="text-sm font-medium">{title}</p>}
      <div className="relative aspect-[16/9] overflow-hidden rounded-md border">
        <div className="absolute inset-0" style={{ backgroundColor: selected }} />
        <Image src={baseImage} alt="Tile preview" fill priority className="object-contain mix-blend-multiply" />
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c.hex}
            type="button"
            aria-label={c.name}
            title={c.name}
            onClick={() => setSelected(c.hex)}
            className={cn(
              "h-7 w-7 rounded-full ring-2 ring-transparent transition focus:outline-none focus:ring-2",
              selected === c.hex ? "ring-[var(--primary)]" : "hover:ring-foreground/30"
            )}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  );
}


