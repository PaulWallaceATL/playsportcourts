import { Hero } from "@/components/sections/hero/Hero";
import { Solutions } from "@/components/sections/sports/Solutions";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";
import Link from "next/link";
import Image from "next/image";
import { courtTiles, garageTiles } from "@/data/products";
import { Counters } from "@/components/interactive/Counters";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* Garage Tiles Slideshow (simple autoplay swap) */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 mb-4">Garage Tiles</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {garageTiles.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/garage-tiles/${p.slug}`} className="glass-card gradient-border-anim p-4 hover-lift">
              <div className="relative aspect-[16/10]">
                <Image src={p.heroImage} alt={p.name} fill className="object-contain" />
              </div>
              <p className="mt-2 font-medium">{p.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sports Applications Grid */}
      <Solutions />

      {/* Resurfacing CTA */}
      <Resurfacing />
    </div>
  );
}
