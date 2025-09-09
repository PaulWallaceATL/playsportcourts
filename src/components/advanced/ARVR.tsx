"use client";

import * as React from "react";

export function ARButton({ modelUrl }: { modelUrl?: string }) {
  const supported = typeof window !== "undefined" && ("xr" in navigator || /Android|iPhone/.test(navigator.userAgent));
  if (!supported) return null;
  return (
    <a href={modelUrl ?? "#"} className="text-sm underline hover:text-[var(--primary)]" aria-disabled={!modelUrl}>
      View in AR
    </a>
  );
}

export function VRButton({ onOpen }: { onOpen?: () => void }) {
  const supported = typeof window !== "undefined" && "xr" in navigator;
  if (!supported) return null;
  return (
    <button className="text-sm underline hover:text-[var(--primary)]" onClick={onOpen}>Enter VR</button>
  );
}


