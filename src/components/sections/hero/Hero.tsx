"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { HeroTile } from "@/components/sections/hero/HeroTile";
import { HeroVideo } from "@/components/sections/hero/HeroVideo";
import { siteContent } from "@/data/home";
import { TileCourt, TileGarage, Palette } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden min-h-[90vh] flex items-center">
      {/* Cinematic background video */}
      <HeroVideo />
      
      {/* Enhanced mesh overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--mesh-premium)" }} />
      
      {/* Ambient corner flares - enhanced */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full opacity-60" style={{ background: "radial-gradient(closest-side, rgba(0,212,255,0.15), transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[640px] h-[640px] rounded-full opacity-60" style={{ background: "radial-gradient(closest-side, rgba(251,146,60,0.15), transparent 70%)" }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-40" style={{ background: "radial-gradient(closest-side, rgba(167,139,250,0.10), transparent 75%)" }} />
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left: headline + CTA */}
          <div className="text-foreground anim-slide-up">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">PlaySport Atlanta</p>
            <h1 className="heading-display text-gradient-hero text-glow-strong">
              {siteContent.hero.title}
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground max-w-prose">{siteContent.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {siteContent.hero.ctas.map((c, i) => (
                <Button key={c.label} size="lg" variant={c.variant as ButtonProps["variant"]} className={i === 0 ? "cta-pulse" : undefined} asChild>
                  <Link href={c.href}>{c.label}</Link>
                </Button>
              ))}
              <Button variant="ghost" asChild>
                <a href="#sports" aria-label="Scroll to sports applications">Explore Sports →</a>
              </Button>
            </div>

            {/* Quick action bar */}
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/court-tiles" className="quick-pill" aria-label="Browse court tiles">
                <TileCourt size={18} /> Court Tiles
              </Link>
              <Link href="/garage-tiles" className="quick-pill" aria-label="Browse garage tiles">
                <TileGarage size={18} /> Garage Tiles
              </Link>
              <Link href="#" className="quick-pill" aria-label="Open color designer">
                <Palette size={18} /> Try Colors
              </Link>
            </div>
          </div>

        {/* Right: 3D tile aligned opposite the text */}
        <div className="relative justify-self-end">
          <HeroTile className="w-[220px] sm:w-[260px] lg:w-[420px]" />

          {/* Interaction lure: encourages users to play with the tile */}
          <div className="pointer-events-none absolute -right-1 sm:right-2 top-4 hero-interact">
            <div className="ring" />
            <div className="label" aria-hidden>
              <svg className="hand" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 12v-1c0-1.657 1.343-3 3-3m0 0V6a1 1 0 1 1 2 0v2m-2 0h2m0 0V6a1 1 0 1 1 2 0v2m0 0h2m0 0V7a1 1 0 1 1 2 0v5c0 3.866-3.134 7-7 7h-1.5c-1.657 0-3-1.343-3-3V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Drag to spin</span>
            </div>
          </div>
        </div>
        </div>

        {/* Trust metrics row below, full width - enhanced */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-4xl">
          {siteContent.hero.trust.map((t) => (
            <div key={t.label} className="group">
              <div className="mb-1 flex items-baseline gap-2">
                <p className="text-4xl font-black text-gradient-hero">{t.value}</p>
                <span className="text-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  +
                </span>
              </div>
              <p className="text-caption text-muted-foreground">{t.label}</p>
              <div className="mt-2 h-1 w-16 bg-gradient-primary rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="mt-10">
          <a href="#sports" className="scroll-cue inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">Scroll to sports
            <span aria-hidden className="inline-block h-3 w-3 border-b border-r rotate-45" />
          </a>
        </div>
      </div>
    </section>
  );
}


