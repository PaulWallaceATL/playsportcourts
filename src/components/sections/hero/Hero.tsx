"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { RotatingTile } from "@/components/interactive/RotatingTile";
import { siteContent } from "@/data/home";

export function Hero() {
  return (
    <section className="relative isolate">
      {/* Cinematic background video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* If a video is present, it will show; otherwise fall back to solid brand backdrop */}
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src="/hero-courts.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--background)]" />
      </div>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="max-w-3xl text-foreground anim-slide-up">
          <h1 className="heading-display text-white">{siteContent.hero.title}</h1>
          <p className="mt-4 text-body-lg text-muted-foreground">{siteContent.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {siteContent.hero.ctas.map((c, i) => (
              <Button key={c.label} size="lg" variant={c.variant as ButtonProps["variant"]} className={i === 0 ? "cta-pulse" : undefined} asChild>
                <Link href={c.href}>{c.label}</Link>
              </Button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 items-end">
            {siteContent.hero.trust.map((t) => (
              <div key={t.label}>
                <p className="text-3xl font-bold text-foreground">{t.value}</p>
                <p className="text-caption">{t.label}</p>
              </div>
            ))}
            {/* 3D rotating tile */}
            <div className="hidden lg:block justify-self-end">
              <RotatingTile />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


