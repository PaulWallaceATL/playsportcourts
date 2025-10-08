"use client";
import * as React from "react";

export function StatBar() {
  const stats = [
    { label: "Dealers Active", value: "48" },
    { label: "Avg. Lead Time", value: "3-5 days" },
    { label: "Tiles in Catalog", value: "120+" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 rounded-xl surface-elevated p-4">
      {stats.map(s => (
        <div key={s.label}>
          <p className="text-2xl font-bold">{s.value}</p>
          <p className="text-caption">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
