"use client";
import * as React from "react";

interface Step { title: string; description: string; }
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-xl surface-elevated p-4">
          <div className="text-2xl font-extrabold mb-1">{String(i+1).padStart(2,'0')}</div>
          <p className="font-semibold">{s.title}</p>
          <p className="text-caption mt-1">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}


