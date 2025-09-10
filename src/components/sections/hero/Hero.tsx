"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
// removed unused import
import { HeroTile } from "@/components/sections/hero/HeroTile";
import { HeroVideo } from "@/components/sections/hero/HeroVideo";
import { siteContent } from "@/data/home";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Cinematic background video */}
      <HeroVideo />
      {/* Ambient corner flares */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(0,212,255,0.12), transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,107,53,0.12), transparent 70%)" }} />
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
            {/* 3D tile on right side */}
            <HeroTile className="justify-self-end w-[200px] sm:w-[260px] lg:w-[360px] sm:mt-2 lg:mr-6" />
          </div>
        </div>
      </div>
    </section>
  );
}


