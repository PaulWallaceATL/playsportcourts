"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/home";

export function Hero() {
  return (
    <section className="relative isolate gradient-overlay contain-content">
      {/* Background image placeholder; replace with video if available */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary animate-gradient" />
        <div className="absolute inset-0 bg-mesh-soft" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_400px_at_50%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {/* Particles */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="absolute w-1 h-1 rounded-full bg-white/40 shadow-neon-blue"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animation: `float${i%3} 8s ease-in-out infinite` }} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="max-w-3xl text-white anim-slide-up">
          <h1 className="heading-display text-neon text-glow-strong hover-weight-smooth glitch">{siteContent.hero.title}</h1>
          <p className="mt-4 text-body-lg text-white/95 drop-cap reveal-up">{siteContent.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {siteContent.hero.ctas.map((c) => (
              <Button key={c.label} size="lg" variant="glass" className="shadow-neon-blue glass-hover glass-active" asChild>
                <Link href={c.href}>{c.label}</Link>
              </Button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 text-white/90">
            {siteContent.hero.trust.map((t) => (
              <div key={t.label}>
                <p className="text-3xl font-bold">{t.value}</p>
                <p className="text-caption">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


