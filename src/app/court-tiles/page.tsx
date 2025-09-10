import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import { courtTiles } from "@/data/products";

export default function CourtTilesIndexPage() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-gradient-primary text-glow">Court Tiles</h1>
      <p className="mt-2 text-body text-muted-foreground">Explore outdoor tiles for courts and multi-sport applications.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courtTiles.map((p) => (
          <Link key={p.slug} href={`/court-tiles/${p.slug}`} className="glass-card p-4 hover-lift">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white/5">
              <span className="absolute right-2 top-2 rounded-full bg-black/60 text-white text-xs px-2 py-0.5">${p.price.toFixed(2)} {p.pricePerUnitLabel}</span>
            </div>
            <h3 className="heading-3 mt-3">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}


