"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/home";

export function Hero() {
  return (
    <section className="relative isolate gradient-overlay">
      {/* Background image placeholder; replace with video if available */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary animate-gradient" />
        <div className="absolute inset-0 bg-mesh-soft" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="max-w-3xl text-white anim-slide-up">
          <h1 className="heading-display text-gradient-hero text-glow-strong hover-weight-smooth">{siteContent.hero.title}</h1>
          <p className="mt-4 text-body-lg text-white/95 drop-cap reveal-up">{siteContent.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {siteContent.hero.ctas.map((c) => (
              <Button key={c.label} size="lg" variant={(c as { variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "accent" | "gradient" }).variant} asChild>
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


