import Link from "next/link";
import Image from "next/image";
import { courtTiles } from "@/data/products";
import { RotatingTile } from "@/components/interactive/RotatingTile";

export default function CourtTilesIndexPage() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-white">Court Tiles</h1>
      <p className="mt-2 text-body text-muted-foreground">Explore outdoor tiles for courts and multi-sport applications.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courtTiles.map((p) => {
          const ph = p.heroImage.endsWith("/file.svg") || p.heroImage.endsWith("/window.svg") || p.heroImage.endsWith("/globe.svg") || p.heroImage.endsWith("/next.svg");
          return (
            <Link key={p.slug} href={`/court-tiles/${p.slug}`} className="glass-dark glass-border p-4 hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-gradient-primary bg-mesh-soft">
                {ph ? (
                  <div className="absolute inset-0 grid place-items-center">
                    <RotatingTile size={180} />
                  </div>
                ) : (
                  <Image src={p.heroImage} alt={p.name} fill className="object-contain p-4" />
                )}
                <span className="absolute right-2 top-2 rounded-full bg-black/70 text-white text-xs px-2 py-0.5">${p.price.toFixed(2)} {p.pricePerUnitLabel}</span>
              </div>
              <h3 className="heading-3 mt-3">{p.name}</h3>
              <p className="text-xs mt-1 flex flex-wrap gap-1">
                {p.bestFor.slice(0,3).map(s => (<span key={s} className="px-2 py-0.5 rounded-full bg-foreground/5 border">{s}</span>))}
              </p>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
              <span className="mt-3 inline-block text-sm underline">View details</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


