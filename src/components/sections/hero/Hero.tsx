"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/home";

export function Hero() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-spotlight" />
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="max-w-3xl text-foreground anim-slide-up">
          <h1 className="heading-display text-gradient-hero text-glow-strong">{siteContent.hero.title}</h1>
          <p className="mt-4 text-body-lg text-muted-foreground">{siteContent.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {siteContent.hero.ctas.map((c) => (
              <Button key={c.label} size="lg" variant={c.variant === "accent" ? "default" : "outline"} asChild>
                <Link href={c.href}>{c.label}</Link>
              </Button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {siteContent.hero.trust.map((t) => (
              <div key={t.label}>
                <p className="text-3xl font-bold text-foreground">{t.value}</p>
                <p className="text-caption">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


