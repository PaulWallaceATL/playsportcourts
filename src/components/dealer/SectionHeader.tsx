"use client";
import * as React from "react";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  caption?: string;
  right?: React.ReactNode;
}

export function SectionHeader({ overline, title, caption, right }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {overline && <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{overline}</p>}
        <h2 className="heading-2">{title}</h2>
        {caption && <p className="text-caption mt-1">{caption}</p>}
      </div>
      {right}
    </div>
  );
}
