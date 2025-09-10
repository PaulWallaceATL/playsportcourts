import Link from "next/link";
import { garageTiles } from "@/data/products";

export default function GarageTilesIndexPage() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-gradient-primary text-glow">Garage Tiles</h1>
      <p className="mt-2 text-body text-muted-foreground">Premium Swisstrax-style tiles for garages and showrooms.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {garageTiles.map((p) => (
          <Link key={p.slug} href={`/garage-tiles/${p.slug}`} className="glass-card p-4 hover-lift">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white">
              <img src={p.heroImage} alt="" className="absolute inset-0 h-full w-full object-contain" />
              <span className="absolute right-2 top-2 rounded-full bg-black/70 text-white text-xs px-2 py-0.5">${p.price.toFixed(2)} {p.pricePerUnitLabel}</span>
            </div>
            <h3 className="heading-3 mt-3">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
            <span className="mt-3 inline-block text-sm underline">View details</span>
          </Link>
        ))}
      </div>
    </section>
  );
}


