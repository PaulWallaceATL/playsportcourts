import type { Metadata } from "next";
import Link from "next/link";
import { courtTiles } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/sections/hero/HeroVideo";

export const metadata: Metadata = {
  title: "Court Tiles",
  description: "Premium modular court tiles for basketball, tennis, pickleball, and multi-sport applications. Professional-grade performance.",
};

export default function CourtTilesIndexPage() {
  return (
    <div>
      {/* Page hero: matches homepage vibe, compact height */}
      <section className="relative isolate overflow-hidden">
        <HeroVideo />
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8" style={{ minHeight: "35vh" }}>
          <div className="grid items-center gap-6 lg:grid-cols-2 pad-section">
            <div className="text-foreground anim-slide-up">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">PlaySport Atlanta</p>
              <h1 className="heading-1 text-gradient-hero text-glow-strong">Court Tiles</h1>
              <p className="mt-3 text-body-lg text-muted-foreground max-w-prose">High‑performance modular tiles engineered for outdoor play. Built for speed, safety, and serious game time.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button size="lg" className="cta-pulse" asChild>
                  <a href="#tiles">Compare Tiles</a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/#sports" className="quick-pill">Basketball</Link>
                <Link href="/#sports" className="quick-pill">Pickleball</Link>
                <Link href="/#sports" className="quick-pill">Multi‑Sport</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tile grid */}
      <section id="tiles" className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 text-white">Explore Tiles</h2>
        <p className="mt-2 text-body text-muted-foreground">Choose the surface that fits your sport and budget.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courtTiles
            .sort((a, b) => {
              const order = ["TRUE Tile", "CORE Tile", "X COURT Tile", "Versa Court Game Tile"];
              return order.indexOf(a.name) - order.indexOf(b.name);
            })
            .map((p) => (
            <ProductCard key={p.slug} href={`/court-tiles/${p.slug}`} name={p.name} price={`$${p.price.toFixed(2)} ${p.pricePerUnitLabel}`} image={p.heroImage} />
          ))}
        </div>
      </section>
    </div>
  );
}


