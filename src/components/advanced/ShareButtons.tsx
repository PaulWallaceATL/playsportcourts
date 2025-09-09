"use client";

import * as React from "react";

export function ShareButtons({ title }: { title: string }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const text = encodeURIComponent(title);
  const url = encodeURIComponent(shareUrl);
  const targets = [
    { label: "X", href: `https://twitter.com/intent/tweet?text=${text}&url=${url}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}` },
  ];
  return (
    <div className="flex items-center gap-3">
      {targets.map(t => (
        <a key={t.label} className="text-sm underline hover:text-[var(--primary)]" href={t.href} target="_blank" rel="noopener noreferrer">{t.label}</a>
      ))}
      <button className="text-sm underline" onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy link</button>
    </div>
  );
}


