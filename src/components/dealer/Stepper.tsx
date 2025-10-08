"use client";
import * as React from "react";

interface StepperProps {
  steps: string[];
  active: number;
}

export function Stepper({ steps, active }: StepperProps) {
  return (
    <div className="steps">
      {steps.map((_, i) => (
        <div key={i} className={`step ${i <= active ? 'active' : ''}`}><span /></div>
      ))}
    </div>
  );
}
