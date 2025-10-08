"use client";
import * as React from "react";

const benefits = [
  { t: "Customizable", d: "Pick tiles, colors, and layouts tailored to the space." },
  { t: "Durable", d: "Protects against impact and chemicals for years." },
  { t: "Covers Imperfections", d: "Hide stained or cracked floors quickly." },
  { t: "Warranty-Backed", d: "Industry-leading coverage for peace of mind." },
  { t: "Fast Install", d: "Finish in hours—not days—with minimal prep." },
];

export function BenefitsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {benefits.map(({ t, d }) => (
        <div key={t} className="rounded-lg border border-border p-4 hover-lift">
          <p className="font-semibold">{t}</p>
          <p className="text-body mt-1 text-muted-foreground">{d}</p>
        </div>
      ))}
    </div>
  );
}
