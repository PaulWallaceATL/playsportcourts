import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/sections/hero/HeroVideo";

export const metadata: Metadata = {
  title: "Court Tiles",
  description: "Premium modular court tiles - Core, True, and X. Professional-grade performance for all sports.",
};

const TILES = [
  {
    id: "core",
    name: "Core Tile",
    price: 5.95,
    thickness: "0.75\"",
    warranty: "10 Years",
    features: ["Superior Impact Absorption", "UV Resistant", "All-Weather", "Easy Installation"],
    bestFor: "Residential & Multi-Sport",
    description: "Premium interlocking tile with exceptional durability"
  },
  {
    id: "true",
    name: "True Tile",
    price: 5.95,
    thickness: "0.875\"",
    warranty: "15 Years",
    features: ["Enhanced Shock Absorption", "Superior Drainage", "Professional Grade", "Weather Resistant"],
    bestFor: "Commercial & High-Traffic",
    description: "Professional-grade tile for elite performance"
  },
  {
    id: "x",
    name: "X Tile",
    price: 7.50,
    thickness: "1\"",
    warranty: "Lifetime",
    features: ["Maximum Absorption", "Lateral Forgiveness", "Pro Ball Response", "Tournament Certified"],
    bestFor: "Tournament & Elite Performance",
    description: "Ultimate performance for championship play",
    isPro: true
  }
];

export default function CourtTilesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <HeroVideo />
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8" style={{ minHeight: "35vh" }}>
          <div className="grid items-center gap-6 lg:grid-cols-2 pad-section">
            <div className="text-foreground anim-slide-up">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">PlaySport Courts</p>
              <h1 className="heading-1 text-gradient-hero text-glow-strong">Court Tiles</h1>
              <p className="mt-3 text-body-lg text-muted-foreground max-w-prose">
                High‑performance modular tiles engineered for outdoor play. Choose from our three premium options.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button size="lg" className="cta-pulse" asChild>
                  <a href="#tiles">View Tiles</a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/dealer-portal">Order Form</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiles Grid */}
      <section id="tiles" className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 text-white mb-8">Our Court Tiles</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TILES.map((tile) => (
            <div key={tile.id} className="card-premium hover:scale-[1.02] transition-all">
              {/* Tile Preview */}
              <div className="relative aspect-square bg-gradient-to-br from-white/5 to-white/10 rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                {tile.isPro && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/50">
                      <Star className="w-4 h-4 text-[var(--brand-accent)] fill-[var(--brand-accent)]" />
                      <span className="text-sm font-bold text-[var(--brand-accent)]">PRO</span>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className="px-4 py-2 rounded-full bg-gradient-primary text-black text-lg font-bold">
                    ${tile.price}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="heading-3 mb-2">{tile.name}</h3>
                  <p className="text-sm text-muted-foreground">{tile.description}</p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-white/[0.02] border border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Thickness</div>
                    <div className="font-bold">{tile.thickness}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Warranty</div>
                    <div className="font-bold">{tile.warranty}</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">Features</div>
                  <ul className="space-y-2">
                    {tile.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">Best For</div>
                  <div className="sport-badge">{tile.bestFor}</div>
                </div>

                {/* CTA */}
                <Button className="w-full" asChild>
                  <Link href="/dealer-portal">Order Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="card-premium">
          <h2 className="heading-2 mb-6">Compare Our Tiles</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4">Feature</th>
                  <th className="text-center p-4">Core</th>
                  <th className="text-center p-4">True</th>
                  <th className="text-center p-4">X</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4">Price/sq ft</td>
                  <td className="text-center p-4 font-bold">$5.95</td>
                  <td className="text-center p-4 font-bold">$5.95</td>
                  <td className="text-center p-4 font-bold text-[var(--brand-accent)]">$7.50</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Thickness</td>
                  <td className="text-center p-4">0.75&quot;</td>
                  <td className="text-center p-4">0.875&quot;</td>
                  <td className="text-center p-4">1&quot;</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Warranty</td>
                  <td className="text-center p-4">10 Years</td>
                  <td className="text-center p-4">15 Years</td>
                  <td className="text-center p-4">Lifetime</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Performance</td>
                  <td className="text-center p-4">Good</td>
                  <td className="text-center p-4">Better</td>
                  <td className="text-center p-4 text-[var(--brand-accent)]">Best</td>
                </tr>
                <tr>
                  <td className="p-4">Ideal Use</td>
                  <td className="text-center p-4">Residential</td>
                  <td className="text-center p-4">Commercial</td>
                  <td className="text-center p-4">Tournament</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
