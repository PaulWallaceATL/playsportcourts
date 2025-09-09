import Link from "next/link";
import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { garageTiles } from "@/data/products";

export default function GarageTilesIndexPage() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-gradient-primary text-glow">Garage Tiles</h1>
      <p className="mt-2 text-body text-muted-foreground">Premium Swisstrax-style tiles for garages and showrooms.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {garageTiles.map((p) => (
          <Link key={p.slug} href={`/garage-tiles/${p.slug}`} className="glass-card gradient-border-anim p-4 hover-lift">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md">
              <Placeholder />
            </div>
            <h3 className="heading-3 mt-3">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
            <p className="mt-2 text-sm"><span className="font-semibold">From:</span> ${p.price.toFixed(2)} {p.pricePerUnitLabel}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}


